import * as cheerio from 'cheerio';

/**
 * Deep On-Page SEO Auditor
 * Analyzes any live URL and produces comprehensive metrics,
 * heading hierarchy, keyword density, technical signals, and an algorithmic Health Score.
 */
export async function auditUrl(rawUrl) {
  let targetUrl = rawUrl.trim();
  if (!/^https?:\/\//i.test(targetUrl)) {
    targetUrl = 'https://' + targetUrl;
  }

  const parsedUrl = new URL(targetUrl);
  const startTime = Date.now();

  // 1. Fetch Page with realistic User-Agent
  let response;
  let html = '';
  let loadTimeMs = 0;
  let isHttps = parsedUrl.protocol === 'https:';
  let httpStatus = 0;
  let headers = {};

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    response = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 SEOPulseBot/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9,hi;q=0.8'
      },
      redirect: 'follow'
    });

    clearTimeout(timeout);
    loadTimeMs = Date.now() - startTime;
    httpStatus = response.status;
    html = await response.text();

    response.headers.forEach((val, key) => {
      headers[key.toLowerCase()] = val;
    });
  } catch (err) {
    return {
      success: false,
      url: targetUrl,
      error: `Failed to fetch URL: ${err.message}`
    };
  }

  // 2. Parse DOM with Cheerio
  const $ = cheerio.load(html);

  // 3. Metadata Analysis
  const title = $('title').first().text().trim() || '';
  const metaDescription = $('meta[name="description" i]').attr('content')?.trim() || '';
  const metaKeywords = $('meta[name="keywords" i]').attr('content')?.trim() || '';
  const canonical = $('link[rel="canonical" i]').attr('href')?.trim() || '';
  const robotsMeta = $('meta[name="robots" i]').attr('content')?.trim() || '';
  const viewport = $('meta[name="viewport" i]').attr('content')?.trim() || '';
  const charset = $('meta[charset]').attr('charset') || $('meta[http-equiv="Content-Type" i]').attr('content') || '';
  const htmlLang = $('html').attr('lang')?.trim() || '';
  const favicon = $('link[rel*="icon" i]').attr('href') || '/favicon.ico';

  // 4. OpenGraph & Social Cards
  const og = {
    title: $('meta[property="og:title" i]').attr('content') || '',
    description: $('meta[property="og:description" i]').attr('content') || '',
    image: $('meta[property="og:image" i]').attr('content') || '',
    url: $('meta[property="og:url" i]').attr('content') || '',
    type: $('meta[property="og:type" i]').attr('content') || ''
  };

  const twitter = {
    card: $('meta[name="twitter:card" i]').attr('content') || '',
    title: $('meta[name="twitter:title" i]').attr('content') || '',
    description: $('meta[name="twitter:description" i]').attr('content') || '',
    image: $('meta[name="twitter:image" i]').attr('content') || ''
  };

  // Structured Data (JSON-LD)
  const jsonLdSchemas = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const content = $(el).text();
      const parsed = JSON.parse(content);
      const type = parsed['@type'] || (Array.isArray(parsed['@graph']) ? parsed['@graph'].map(g => g['@type']).join(', ') : 'Custom Schema');
      jsonLdSchemas.push({ type, raw: parsed });
    } catch {}
  });

  // 5. Headings Hierarchy
  const headings = {
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: []
  };

  for (let i = 1; i <= 6; i++) {
    $(`h${i}`).each((_, el) => {
      const text = $(el).text().trim().replace(/\s+/g, ' ');
      if (text) headings[`h${i}`].push(text);
    });
  }

  // 6. Text & Content Analysis
  // Remove scripts, styles, noscript, svg, nav, footer for clean content analysis
  $('script, style, noscript, svg, iframe').remove();
  const rawBodyText = $('body').text().replace(/\s+/g, ' ').trim();
  const words = rawBodyText.toLowerCase().match(/\b[a-z0-9_\u0900-\u097F]{2,}\b/g) || [];
  const wordCount = words.length;
  const readingTimeMin = Math.ceil(wordCount / 200);

  // Keyword Density (Top 10 words)
  const stopWords = new Set([
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he',
    'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or',
    'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about',
    'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know',
    'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than',
    'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two',
    'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give',
    'day', 'most', 'us', 'is', 'are', 'was', 'were', 'has', 'had', 'been'
  ]);

  const freqMap = {};
  words.forEach(w => {
    if (!stopWords.has(w) && w.length > 2) {
      freqMap[w] = (freqMap[w] || 0) + 1;
    }
  });

  const topKeywords = Object.entries(freqMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([keyword, count]) => ({
      keyword,
      count,
      density: wordCount > 0 ? ((count / wordCount) * 100).toFixed(2) : '0',
      inTitle: title.toLowerCase().includes(keyword),
      inH1: headings.h1.some(h => h.toLowerCase().includes(keyword)),
      inMeta: metaDescription.toLowerCase().includes(keyword)
    }));

  // 7. Images Audit
  const images = [];
  $('img').each((_, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src') || '';
    const alt = $(el).attr('alt');
    const width = $(el).attr('width');
    const height = $(el).attr('height');
    const loading = $(el).attr('loading');

    images.push({
      src: src.slice(0, 120),
      hasAlt: typeof alt === 'string' && alt.trim().length > 0,
      alt: alt || '',
      hasDimensions: !!(width && height),
      isLazy: loading === 'lazy'
    });
  });

  const totalImages = images.length;
  const missingAltCount = images.filter(img => !img.hasAlt).length;

  // 8. Links Audit
  const links = {
    internal: [],
    external: [],
    empty: 0,
    dofollow: 0,
    nofollow: 0
  };

  $('a').each((_, el) => {
    const href = $(el).attr('href')?.trim();
    const text = $(el).text().trim().replace(/\s+/g, ' ');
    const rel = $(el).attr('rel') || '';
    const isNofollow = /nofollow/i.test(rel);

    if (isNofollow) links.nofollow++;
    else links.dofollow++;

    if (!href || href === '#' || href.startsWith('javascript:')) {
      links.empty++;
      return;
    }

    try {
      const fullUrl = new URL(href, targetUrl);
      const isInternal = fullUrl.hostname === parsedUrl.hostname;
      const linkObj = {
        href: fullUrl.href,
        text: text.slice(0, 50) || '(No Anchor Text)',
        rel
      };

      if (isInternal) {
        if (links.internal.length < 50) links.internal.push(linkObj);
      } else {
        if (links.external.length < 50) links.external.push(linkObj);
      }
    } catch {}
  });

  // 9. Check robots.txt & sitemap.xml presence
  const technicalDiscovery = await checkTechnicalFiles(parsedUrl.origin);

  // 10. Algorithmic Health Score & Issues Computation
  const { score, critical, warnings, passed, recommendations } = computeSeoScore({
    isHttps,
    loadTimeMs,
    httpStatus,
    title,
    metaDescription,
    canonical,
    robotsMeta,
    viewport,
    headings,
    wordCount,
    totalImages,
    missingAltCount,
    links,
    og,
    twitter,
    jsonLdSchemas,
    robotsTxt: technicalDiscovery.robotsTxt,
    sitemapXml: technicalDiscovery.sitemapXml
  });

  return {
    success: true,
    url: targetUrl,
    hostname: parsedUrl.hostname,
    auditedAt: new Date().toISOString(),
    metrics: {
      score,
      loadTimeMs,
      pageSizeKb: (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1),
      httpStatus,
      isHttps,
      wordCount,
      readingTimeMin,
      sampleText: (rawBodyText || '').slice(0, 1500)
    },
    meta: {
      title,
      titleLength: title.length,
      metaDescription,
      descLength: metaDescription.length,
      canonical,
      robotsMeta,
      viewport,
      charset,
      htmlLang,
      favicon
    },
    headings,
    keywords: topKeywords,
    images: {
      total: totalImages,
      missingAlt: missingAltCount,
      list: images.slice(0, 15)
    },
    links: {
      total: links.internal.length + links.external.length + links.empty,
      internalCount: links.internal.length,
      externalCount: links.external.length,
      emptyCount: links.empty,
      dofollow: links.dofollow,
      nofollow: links.nofollow,
      sampleInternal: links.internal.slice(0, 10),
      sampleExternal: links.external.slice(0, 10)
    },
    social: {
      og,
      twitter,
      schemas: jsonLdSchemas
    },
    technical: technicalDiscovery,
    audit: {
      score,
      critical,
      warnings,
      passed,
      recommendations
    }
  };
}

/**
 * Probes domain root for robots.txt and sitemap.xml
 */
async function checkTechnicalFiles(origin) {
  const result = {
    robotsTxt: { exists: false, url: `${origin}/robots.txt`, status: 0 },
    sitemapXml: { exists: false, url: `${origin}/sitemap.xml`, status: 0 }
  };

  try {
    const robotsRes = await fetch(`${origin}/robots.txt`, { method: 'HEAD', timeout: 4000 });
    result.robotsTxt.status = robotsRes.status;
    result.robotsTxt.exists = robotsRes.status === 200;
  } catch {}

  try {
    const sitemapRes = await fetch(`${origin}/sitemap.xml`, { method: 'HEAD', timeout: 4000 });
    result.sitemapXml.status = sitemapRes.status;
    result.sitemapXml.exists = sitemapRes.status === 200;
  } catch {}

  return result;
}

/**
 * Score Calculator Engine
 */
function computeSeoScore(data) {
  let score = 100;
  const critical = [];
  const warnings = [];
  const passed = [];
  const recommendations = [];

  // 1. SSL / HTTPS
  if (data.isHttps) {
    passed.push({ title: 'SSL / HTTPS Active', desc: 'Website uses secure encrypted HTTPS protocol.' });
  } else {
    score -= 15;
    critical.push({ title: 'Missing SSL / HTTPS', desc: 'Site is served over insecure HTTP. Google flags this in search results.' });
    recommendations.push('Install a free SSL certificate (e.g. Let’s Encrypt or Cloudflare) and enforce HTTPS 301 redirects.');
  }

  // 2. HTTP Status
  if (data.httpStatus === 200) {
    passed.push({ title: 'HTTP 200 OK Status', desc: 'The page returned a successful HTTP 200 response.' });
  } else {
    score -= 20;
    critical.push({ title: `Unexpected HTTP Status: ${data.httpStatus}`, desc: `Page returned HTTP code ${data.httpStatus} instead of 200 OK.` });
  }

  // 3. Title Tag
  if (!data.title) {
    score -= 15;
    critical.push({ title: 'Missing <title> Tag', desc: 'Title tag is missing. This is the single most critical on-page ranking factor.' });
    recommendations.push('Add a descriptive <title> tag (50-60 characters) containing your primary target keyword.');
  } else if (data.title.length < 30) {
    score -= 6;
    warnings.push({ title: 'Title Tag is Too Short', desc: `Title is only ${data.title.length} characters. Optimal is 50-60 characters.` });
    recommendations.push(`Expand title "${data.title}" with brand name or secondary keyword for better click-through rate.`);
  } else if (data.title.length > 60) {
    score -= 5;
    warnings.push({ title: 'Title Tag is Too Long', desc: `Title is ${data.title.length} characters. It will get truncated in Google search results (>600px).` });
    recommendations.push('Shorten the title to under 60 characters so Google does not cut it off.');
  } else {
    passed.push({ title: 'Title Tag Length Optimal', desc: `Title length (${data.title.length} chars) fits Google’s SERP display limits perfectly.` });
  }

  // 4. Meta Description
  if (!data.metaDescription) {
    score -= 10;
    warnings.push({ title: 'Missing Meta Description', desc: 'No meta description found. Search engines will automatically generate snippets.' });
    recommendations.push('Write a compelling meta description between 150-160 characters with a clear call-to-action.');
  } else if (data.metaDescription.length < 70) {
    score -= 4;
    warnings.push({ title: 'Meta Description is Too Short', desc: `Description is ${data.metaDescription.length} chars. Optimal is 150-160.` });
  } else if (data.metaDescription.length > 165) {
    score -= 4;
    warnings.push({ title: 'Meta Description is Too Long', desc: `Description is ${data.metaDescription.length} chars and may truncate on mobile.` });
  } else {
    passed.push({ title: 'Meta Description Optimal', desc: `Description length (${data.metaDescription.length} chars) is within the recommended 120-160 range.` });
  }

  // 5. H1 Headings
  const h1Count = data.headings.h1.length;
  if (h1Count === 0) {
    score -= 12;
    critical.push({ title: 'Missing <h1> Heading', desc: 'No H1 heading found on the page. Search bots rely on H1 to understand page hierarchy.' });
    recommendations.push('Add exactly one <h1> tag representing the primary subject of your page.');
  } else if (h1Count > 1) {
    score -= 5;
    warnings.push({ title: `Multiple <h1> Headings (${h1Count} Found)`, desc: 'Having more than one H1 dilutes topic authority and can confuse search crawlers.' });
    recommendations.push('Keep only one main <h1> and convert secondary headers into <h2>.');
  } else {
    passed.push({ title: 'Single <h1> Tag Present', desc: `Found 1 primary H1: "${data.headings.h1[0].slice(0, 50)}..."` });
  }

  // 6. Canonical Tag
  if (data.canonical) {
    passed.push({ title: 'Canonical Tag Configured', desc: `Canonical URL: ${data.canonical.slice(0, 60)}` });
  } else {
    score -= 6;
    warnings.push({ title: 'Missing Canonical Tag', desc: 'No <link rel="canonical"> found. Risk of duplicate content penalties across http/https or parameters.' });
    recommendations.push('Add a self-referencing canonical tag to prevent duplicate content indexing.');
  }

  // 7. Mobile Viewport
  if (data.viewport) {
    passed.push({ title: 'Mobile Viewport Present', desc: 'Viewport meta tag is set for responsive mobile rendering.' });
  } else {
    score -= 12;
    critical.push({ title: 'Missing Mobile Viewport Tag', desc: 'Page lacks mobile viewport declaration and will fail Google Mobile-Friendly tests.' });
  }

  // 8. Word Count
  if (data.wordCount < 250) {
    score -= 8;
    warnings.push({ title: 'Thin Content Warning', desc: `Found only ${data.wordCount} words. Pages under 300 words struggle to rank on Google.` });
    recommendations.push('Add more helpful, original content answering user questions to exceed at least 600+ words.');
  } else {
    passed.push({ title: 'Substantial Content Length', desc: `Page contains ${data.wordCount} words (~${Math.ceil(data.wordCount / 200)} min read).` });
  }

  // 9. Image Alt Attributes
  if (data.totalImages > 0) {
    if (data.missingAltCount === 0) {
      passed.push({ title: 'All Images Have Alt Text', desc: `All ${data.totalImages} images have accessibility & SEO alt attributes.` });
    } else {
      score -= Math.min(10, data.missingAltCount * 2);
      warnings.push({ title: `${data.missingAltCount} of ${data.totalImages} Images Missing Alt Text`, desc: 'Images without alt attributes hurt accessibility and image search ranking.' });
      recommendations.push('Add descriptive alt text to all missing images.');
    }
  }

  // 10. Social Meta Tags (OpenGraph)
  if (data.og.title && data.og.image) {
    passed.push({ title: 'OpenGraph Tags Configured', desc: 'Facebook & LinkedIn rich social share preview cards are enabled.' });
  } else {
    score -= 4;
    warnings.push({ title: 'Incomplete OpenGraph Tags', desc: 'Missing og:title or og:image. Shared links on social media will look blank.' });
    recommendations.push('Add og:title, og:description, and a 1200x630px og:image.');
  }

  // 11. Schema Structured Data
  if (data.jsonLdSchemas.length > 0) {
    passed.push({ title: 'Structured Data (Schema.org) Detected', desc: `Found ${data.jsonLdSchemas.length} JSON-LD schemas: ${data.jsonLdSchemas.map(s => s.type).join(', ')}` });
  } else {
    score -= 4;
    warnings.push({ title: 'No JSON-LD Schema Markup Found', desc: 'Structured data enhances search listings with rich snippets, stars, and FAQs.' });
    recommendations.push('Implement JSON-LD Schema markup (Organization, WebSite, Article or FAQ).');
  }

  // 12. Technical Files
  if (data.robotsTxt.exists) {
    passed.push({ title: 'robots.txt Found', desc: 'Crawler directives file is accessible.' });
  } else {
    score -= 3;
    warnings.push({ title: 'robots.txt Not Found (404)', desc: 'Search engine crawlers check /robots.txt before indexing.' });
  }

  if (data.sitemapXml.exists) {
    passed.push({ title: 'sitemap.xml Detected', desc: 'XML sitemap is accessible at root.' });
  } else {
    score -= 3;
    warnings.push({ title: 'sitemap.xml Not Found at Root', desc: 'XML sitemap helps search engines discover all your indexed pages.' });
  }

  // Clamp score between 10 and 100
  score = Math.max(12, Math.min(100, score));

  return {
    score,
    critical,
    warnings,
    passed,
    recommendations
  };
}
