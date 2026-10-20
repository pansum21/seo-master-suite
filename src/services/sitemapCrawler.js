import * as cheerio from 'cheerio';

/**
 * Multi-Page Sitemap Crawler
 * Fetches sitemap.xml for any domain, parses URLs, and concurrently audits multiple pages.
 * @param {string} domainOrSitemapUrl
 * @param {number} maxPages - Default 15 pages
 * @returns {Promise<Object>}
 */
export async function crawlSitemap(domainOrSitemapUrl, maxPages = 15) {
  let target = domainOrSitemapUrl.trim();
  if (!/^https?:\/\//i.test(target)) {
    target = 'https://' + target;
  }

  const parsedUrl = new URL(target);
  let sitemapUrl = target;
  if (!target.endsWith('.xml')) {
    sitemapUrl = `${parsedUrl.origin}/sitemap.xml`;
  }

  const startTime = Date.now();
  let discoveredUrls = [];
  let sitemapDomainMismatch = false;

  try {
    const res = await fetch(sitemapUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 SEOPulseSpider/2.0'
      },
      signal: AbortSignal.timeout(10000)
    });

    if (res.ok) {
      const xmlText = await res.text();
      const $ = cheerio.load(xmlText, { xmlMode: true });

      // Look for standard <loc> inside <url> or <sitemap>
      $('loc').each((_, el) => {
        const u = $(el).text().trim();
        if (u && !discoveredUrls.includes(u) && !u.endsWith('.xml')) {
          discoveredUrls.push(u);
        }
      });
    }
  } catch (err) {
    console.warn(`[Sitemap Crawler] Could not fetch ${sitemapUrl}: ${err.message}`);
  }

  // Fallback if no sitemap.xml exists: crawl origin home page to extract internal links!
  if (discoveredUrls.length === 0) {
    try {
      const homeRes = await fetch(parsedUrl.origin, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 SEOPulseSpider/2.0'
        },
        signal: AbortSignal.timeout(8000)
      });
      if (homeRes.ok) {
        const html = await homeRes.text();
        const $ = cheerio.load(html);
        discoveredUrls.push(parsedUrl.origin);

        $('a[href]').each((_, el) => {
          const href = $(el).attr('href')?.trim();
          if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
            try {
              const abs = new URL(href, parsedUrl.origin).href;
              if (abs.startsWith(parsedUrl.origin) && !discoveredUrls.includes(abs)) {
                discoveredUrls.push(abs);
              }
            } catch {}
          }
        });
      }
    } catch {}
  }

  if (discoveredUrls.length === 0) {
    discoveredUrls = [parsedUrl.origin];
  }

  // Check if sitemap URLs point to an unresolvable or different domain
  if (discoveredUrls.length > 0) {
    const firstUrl = discoveredUrls[0];
    try {
      const firstParsed = new URL(firstUrl);
      if (firstParsed.origin !== parsedUrl.origin) {
        sitemapDomainMismatch = true;
      }
    } catch {}
  }

  // Cap URLs to process
  const urlsToAudit = discoveredUrls.slice(0, maxPages);

  // Concurrently audit pages (batch size 4 to prevent server saturation)
  const auditedPages = [];
  const batchSize = 4;

  for (let i = 0; i < urlsToAudit.length; i += batchSize) {
    const chunk = urlsToAudit.slice(i, i + batchSize);
    const chunkResults = await Promise.all(
      chunk.map(async (u) => {
        let finalFetchUrl = u;
        let pageStart = Date.now();
        let pageRes = null;

        // Try direct fetch
        try {
          pageRes = await fetch(finalFetchUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 SEOPulseSpider/2.0'
            },
            signal: AbortSignal.timeout(7000),
            redirect: 'follow'
          });
        } catch (firstErr) {
          // If first fetch failed and there's a domain mismatch, fallback to testing on input origin!
          if (sitemapDomainMismatch) {
            try {
              const relativePath = new URL(u).pathname;
              finalFetchUrl = new URL(relativePath, parsedUrl.origin).href;
              pageRes = await fetch(finalFetchUrl, {
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 SEOPulseSpider/2.0'
                },
                signal: AbortSignal.timeout(7000),
                redirect: 'follow'
              });
            } catch {}
          }
        }

        const durationMs = Date.now() - pageStart;

        if (!pageRes || !pageRes.ok) {
          return {
            url: u,
            actualUrl: finalFetchUrl,
            status: pageRes ? pageRes.status : 0,
            statusText: pageRes ? pageRes.statusText : 'DNS / Connection Failed',
            durationMs,
            score: 0,
            title: '(Unreachable / DNS Error)',
            metaDesc: sitemapDomainMismatch ? `Sitemap points to ${u}, which does not resolve.` : 'Failed to connect.',
            h1Count: 0,
            totalImages: 0,
            missingAlt: 0,
            canonical: '',
            hasCanonical: false,
            isHealthy: false
          };
        }

        try {
          const status = pageRes.status;
          const html = await pageRes.text();
          const $ = cheerio.load(html);

          const title = $('title').first().text().trim() || '(Missing Title)';
          const metaDesc = $('meta[name="description" i]').attr('content')?.trim() || '(Missing Description)';
          const h1Count = $('h1').length;
          const h1Text = $('h1').first().text().trim() || '(No H1)';
          const totalImages = $('img').length;
          const missingAlt = $('img:not([alt]), img[alt=""]').length;
          const canonical = $('link[rel="canonical" i]').attr('href')?.trim() || '';

          // Calculate single-page score
          let pageScore = 100;
          if (status !== 200) pageScore -= 50;
          if (!title || title === '(Missing Title)') pageScore -= 20;
          else if (title.length > 60 || title.length < 30) pageScore -= 5;
          if (!metaDesc || metaDesc === '(Missing Description)') pageScore -= 15;
          if (h1Count === 0) pageScore -= 15;
          else if (h1Count > 1) pageScore -= 5;
          if (missingAlt > 0) pageScore -= Math.min(10, missingAlt * 2);
          if (!canonical) pageScore -= 5;
          if (durationMs > 1000) pageScore -= 10;
          pageScore = Math.max(10, Math.min(100, pageScore));

          return {
            url: u,
            actualUrl: finalFetchUrl,
            status,
            statusText: pageRes.statusText,
            durationMs,
            score: pageScore,
            title,
            titleLength: title.length,
            metaDesc,
            descLength: metaDesc.length,
            h1Count,
            h1Text,
            totalImages,
            missingAlt,
            canonical,
            hasCanonical: !!canonical,
            isHealthy: status === 200 && h1Count === 1 && pageScore >= 75
          };
        } catch (err) {
          return {
            url: u,
            actualUrl: finalFetchUrl,
            status: 0,
            statusText: 'Parse Error',
            durationMs,
            score: 0,
            title: '(Parse Error)',
            metaDesc: err.message,
            h1Count: 0,
            totalImages: 0,
            missingAlt: 0,
            canonical: '',
            hasCanonical: false,
            isHealthy: false
          };
        }
      })
    );
    auditedPages.push(...chunkResults);
  }

  // Aggregate Site-Wide Statistics
  const totalAudited = auditedPages.length;
  const avgScore = totalAudited > 0 ? Math.round(auditedPages.reduce((acc, p) => acc + p.score, 0) / totalAudited) : 0;
  const avgSpeed = totalAudited > 0 ? Math.round(auditedPages.reduce((acc, p) => acc + p.durationMs, 0) / totalAudited) : 0;
  const brokenLinks = auditedPages.filter(p => p.status >= 400 || p.status === 0);
  const missingH1Pages = auditedPages.filter(p => p.h1Count === 0);
  const missingMetaPages = auditedPages.filter(p => p.metaDesc === '(Missing Description)');
  const missingAltTotal = auditedPages.reduce((acc, p) => acc + p.missingAlt, 0);

  // Check for duplicate titles across pages
  const titleMap = {};
  auditedPages.forEach(p => {
    if (p.title && p.title !== '(Missing Title)' && !p.title.startsWith('(')) {
      titleMap[p.title] = (titleMap[p.title] || 0) + 1;
    }
  });
  const duplicateTitles = Object.entries(titleMap).filter(([_, count]) => count > 1).map(([t, c]) => ({ title: t, count: c }));

  return {
    success: true,
    domain: parsedUrl.origin,
    sitemapUrl,
    sitemapDomainMismatch,
    totalDiscovered: discoveredUrls.length,
    totalAudited,
    crawlDurationMs: Date.now() - startTime,
    siteHealthScore: avgScore,
    avgSpeedMs: avgSpeed,
    summary: {
      healthyPagesCount: auditedPages.filter(p => p.isHealthy).length,
      brokenLinksCount: brokenLinks.length,
      missingH1Count: missingH1Pages.length,
      missingMetaCount: missingMetaPages.length,
      totalMissingAlt: missingAltTotal,
      duplicateTitlesCount: duplicateTitles.length
    },
    duplicateTitles,
    pages: auditedPages
  };
}
