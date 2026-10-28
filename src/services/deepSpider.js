import * as cheerio from 'cheerio';
import { fetchPublicUrl } from './urlSafety.js';

/**
 * SEOPulse Pro Deep Site Spider (Screaming Frog Mode)
 * Autonomous BFS Link-to-Link Web Crawler with Concurrency & Broken Link Detection
 */

// Extensions and protocols to ignore during HTML page crawling
const IGNORED_EXTENSIONS = new Set([
  '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico',
  '.pdf', '.zip', '.tar', '.gz', '.rar', '.7z',
  '.mp3', '.mp4', '.avi', '.mov', '.webm', '.wav',
  '.css', '.js', '.json', '.xml', '.txt', '.woff', '.woff2', '.ttf', '.eot'
]);

/**
 * Normalizes URL and removes hash/fragments
 */
function normalizeUrl(rawUrl) {
  try {
    const u = new URL(rawUrl);
    u.hash = ''; // Remove fragment
    // Remove trailing slash for consistency (unless it's just root path '/')
    if (u.pathname.length > 1 && u.pathname.endsWith('/')) {
      u.pathname = u.pathname.slice(0, -1);
    }
    return u.toString();
  } catch {
    return null;
  }
}

/**
 * Checks if a URL is eligible for HTML crawling
 */
function isEligiblePage(urlObj, baseHost) {
  if (!urlObj) return false;
  // Must be http or https
  if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') return false;
  // Must belong to same hostname or www variation
  const host = urlObj.hostname.replace(/^www\./i, '');
  const targetHost = baseHost.replace(/^www\./i, '');
  if (host !== targetHost) return false;

  // Check extension
  const pathname = urlObj.pathname.toLowerCase();
  for (const ext of IGNORED_EXTENSIONS) {
    if (pathname.endsWith(ext)) return false;
  }

  return true;
}

/**
 * Crawls a single page and extracts metadata & internal links
 */
async function auditSinglePage(url, referrer = 'Seed URL', depth = 0) {
  const startTime = Date.now();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetchPublicUrl(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'SEOPulsePro-Spider/3.0 (+https://seopulse.local; Screaming-Frog-Audit-Bot)',
        'Accept': 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      },
    });
    clearTimeout(timeoutId);

    const latencyMs = Date.now() - startTime;
    const contentType = res.headers.get('content-type') || '';
    const status = res.status;

    // If not HTML or failed status
    if (status >= 400) {
      return {
        url,
        status,
        latencyMs,
        contentType,
        depth,
        referrer,
        isBroken: true,
        error: `HTTP ${status}`,
        title: '',
        metaDesc: '',
        h1: '',
        wordCount: 0,
        internalLinks: []
      };
    }

    if (!contentType.includes('text/html') && !contentType.includes('application/xhtml')) {
      return {
        url,
        status,
        latencyMs,
        contentType,
        depth,
        referrer,
        isBroken: false,
        title: '(Non-HTML Asset)',
        metaDesc: '',
        h1: '',
        wordCount: 0,
        internalLinks: []
      };
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    const title = $('title').first().text().trim() || '';
    const metaDesc = $('meta[name="description" i]').attr('content')?.trim() || '';
    const h1 = $('h1').first().text().trim() || '';

    // Word count calculation
    $('script, style, noscript, svg, iframe').remove();
    const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
    const words = bodyText.toLowerCase().match(/\b[a-z0-9_\u0900-\u097F]{2,}\b/g) || [];
    const wordCount = words.length;

    // Extract all internal links
    const internalLinks = new Set();
    const parsedOrigin = new URL(url);

    $('a[href]').each((_, el) => {
      const rawHref = $(el).attr('href')?.trim();
      if (!rawHref) return;
      if (rawHref.startsWith('#') || rawHref.startsWith('javascript:') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) return;

      try {
        const resolved = new URL(rawHref, url);
        if (isEligiblePage(resolved, parsedOrigin.hostname)) {
          const clean = normalizeUrl(resolved.toString());
          if (clean) internalLinks.add(clean);
        }
      } catch {
        // Invalid URL, skip
      }
    });

    return {
      url,
      status,
      latencyMs,
      contentType,
      depth,
      referrer,
      isBroken: false,
      title,
      titleLength: title.length,
      metaDesc,
      descLength: metaDesc.length,
      h1,
      wordCount,
      internalLinksCount: internalLinks.size,
      internalLinks: Array.from(internalLinks)
    };
  } catch (err) {
    clearTimeout(timeoutId);
    return {
      url,
      status: 0,
      latencyMs: Date.now() - startTime,
      depth,
      referrer,
      isBroken: true,
      error: err.name === 'AbortError' ? 'Connection Timeout (12s)' : err.message,
      title: '',
      metaDesc: '',
      h1: '',
      wordCount: 0,
      internalLinks: []
    };
  }
}

/**
 * Concurrent Breadth-First-Search (BFS) Site Crawler
 */
export async function crawlSiteDeep(startUrl, options = {}) {
  const maxPages = Math.min(parseInt(options.maxPages || 40, 10), 100);
  const maxDepth = Math.min(parseInt(options.maxDepth || 3, 10), 4);
  const concurrency = 4;

  const initialClean = normalizeUrl(startUrl);
  if (!initialClean) {
    throw new Error('Invalid start URL provided for deep crawl.');
  }

  const parsedBase = new URL(initialClean);
  const baseHost = parsedBase.hostname;

  const queue = [{ url: initialClean, referrer: 'Homepage / Seed', depth: 0 }];
  const visited = new Set();
  const queued = new Set([initialClean]);
  const results = [];

  while (queue.length > 0 && results.length < maxPages) {
    // Take a batch up to concurrency limit
    const batch = queue.splice(0, Math.min(concurrency, maxPages - results.length));

    const promises = batch.map(async item => {
      visited.add(item.url);
      const audit = await auditSinglePage(item.url, item.referrer, item.depth);
      results.push(audit);

      // If page has internal links and we haven't reached maxDepth, enqueue new ones
      if (!audit.isBroken && item.depth < maxDepth && audit.internalLinks) {
        for (const link of audit.internalLinks) {
          if (!visited.has(link) && !queued.has(link) && (queued.size < maxPages * 2)) {
            queued.add(link);
            queue.push({
              url: link,
              referrer: item.url,
              depth: item.depth + 1
            });
          }
        }
      }
    });

    await Promise.all(promises);
  }

  // Calculate Metrics & Aggregations
  const totalCrawled = results.length;
  const brokenLinks = results.filter(r => r.isBroken || r.status >= 400 || r.status === 0);
  const passedPages = results.filter(r => !r.isBroken && r.status === 200);

  // Duplicate Title Detection
  const titleGroups = {};
  results.forEach(r => {
    if (r.title && r.title.length > 0) {
      if (!titleGroups[r.title]) titleGroups[r.title] = [];
      titleGroups[r.title].push(r.url);
    }
  });
  const duplicateTitles = Object.entries(titleGroups)
    .filter(([_, urls]) => urls.length > 1)
    .map(([title, urls]) => ({ title, count: urls.length, urls }));

  // Missing Descriptions
  const missingDescriptions = results.filter(r => !r.isBroken && (!r.metaDesc || r.metaDesc.length === 0));

  // Thin Content (< 250 words)
  const thinContentPages = results.filter(r => !r.isBroken && r.wordCount < 250);

  // Average Latency
  const avgLatency = results.length > 0
    ? Math.round(results.reduce((sum, r) => sum + (r.latencyMs || 0), 0) / results.length)
    : 0;

  return {
    success: true,
    mode: 'deep-spider',
    startUrl: initialClean,
    domain: baseHost,
    crawledAt: new Date().toISOString(),
    summary: {
      totalCrawled,
      totalDiscovered: queued.size,
      brokenCount: brokenLinks.length,
      duplicateTitleGroups: duplicateTitles.length,
      missingDescCount: missingDescriptions.length,
      thinContentCount: thinContentPages.length,
      avgLatencyMs: avgLatency
    },
    brokenLinks: brokenLinks.map(b => ({
      url: b.url,
      status: b.status,
      error: b.error,
      foundOnPage: b.referrer,
      depth: b.depth
    })),
    duplicateTitles,
    pages: results.map(r => ({
      url: r.url,
      status: r.status,
      latencyMs: r.latencyMs,
      depth: r.depth,
      referrer: r.referrer,
      title: r.title,
      titleLength: r.titleLength || 0,
      metaDesc: r.metaDesc,
      descLength: r.descLength || 0,
      h1: r.h1,
      wordCount: r.wordCount,
      isBroken: r.isBroken,
      issues: [
        ...(r.isBroken ? [`Broken (${r.error || r.status})`] : []),
        ...(r.status === 200 && (!r.title || r.title.length < 15) ? ['Title too short / missing'] : []),
        ...(r.status === 200 && r.titleLength > 60 ? ['Title exceeds 60 chars'] : []),
        ...(r.status === 200 && (!r.metaDesc || r.metaDesc.length < 50) ? ['Meta description missing'] : []),
        ...(r.status === 200 && r.wordCount < 250 ? ['Thin content (<250 words)'] : []),
        ...(r.latencyMs > 1000 ? ['High latency (>1000ms)'] : [])
      ]
    }))
  };
}
