/**
 * Automated Multi-Tool Audit for maparte.vercel.app
 */

const BASE_URL = 'http://localhost:5050';
const TARGET = 'https://maparte.vercel.app';

async function auditSite() {
  console.log(`Starting Full 16-Tool Audit for ${TARGET}...\n`);
  const report = {};

  try {
    // 1. Tool 01: Site Health Auditor
    console.log('Running Tool 01: Site Health Auditor...');
    const resAudit = await fetch(`${BASE_URL}/api/audit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: TARGET })
    });
    report.healthAudit = await resAudit.json();
    console.log(`✓ Health Score: ${report.healthAudit.metrics?.score}/100, Load Time: ${report.healthAudit.metrics?.loadTimeMs}ms`);

    // 2. Tool 07: HTTP Headers & Security
    console.log('Running Tool 07: HTTP Headers & Security...');
    const resHeaders = await fetch(`${BASE_URL}/api/headers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: TARGET })
    });
    report.headersSecurity = await resHeaders.json();
    console.log(`✓ Security Score: ${report.headersSecurity.securityScore}/100`);

    // 3. Tool 11: Readability & Content Analysis
    console.log('Running Tool 11: Content & Readability Analysis...');
    const resReadability = await fetch(`${BASE_URL}/api/readability`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: report.healthAudit.metrics?.sampleText || 'Maparte custom map poster and wall art creator',
        targetKeyword: 'map poster'
      })
    });
    report.readability = await resReadability.json();
    console.log(`✓ Word Count: ${report.readability.wordCount}, Flesch Score: ${report.readability.fleschReadingEase}`);

    // 4. Tool 13: Deep Spider Crawl (BFS Screaming Frog Mode)
    console.log('Running Tool 13: Deep BFS Spider Crawler...');
    const resSpider = await fetch(`${BASE_URL}/api/spider/crawl`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: TARGET, maxPages: 15, maxDepth: 2 })
    });
    report.deepSpider = await resSpider.json();
    console.log(`✓ Spider Crawled: ${report.deepSpider.totalCrawled} pages, Dead Links: ${report.deepSpider.issues?.deadLinks?.length || 0}`);

    // 5. Tool 14: Google Core Web Vitals & Lighthouse
    console.log('Running Tool 14: Core Web Vitals & PageSpeed...');
    const resLighthouse = await fetch(`${BASE_URL}/api/lighthouse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: TARGET, strategy: 'mobile' })
    });
    report.lighthouse = await resLighthouse.json();
    console.log(`✓ Lighthouse Performance: ${report.lighthouse.performanceScore}/100, LCP: ${report.lighthouse.metrics?.lcp}, CLS: ${report.lighthouse.metrics?.cls}`);

    // 6. Tool 15: Backlink & Domain Authority Engine
    console.log('Running Tool 15: Backlinks & Domain Authority Engine...');
    const resBacklinks = await fetch(`${BASE_URL}/api/backlinks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: TARGET })
    });
    report.backlinks = await resBacklinks.json();
    console.log(`✓ Domain Authority (DA): ${report.backlinks.da}/100, Spam Score: ${report.backlinks.spamScore}`);

    // 7. Tool 16: Google Search Console Performance Studio
    console.log('Running Tool 16: Google Search Console Performance Studio...');
    const resGsc = await fetch(`${BASE_URL}/api/gsc/data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain: TARGET, dateRange: '28d' })
    });
    report.gsc = await resGsc.json();
    console.log(`✓ 28D Clicks: ${report.gsc.summary?.totalClicks}, Impressions: ${report.gsc.summary?.totalImpressions}`);

    console.log('\n--- AUDIT SUMMARY COMPLETE ---');
    console.log(JSON.stringify({
      score: report.healthAudit.metrics?.score,
      loadTimeMs: report.healthAudit.metrics?.loadTimeMs,
      issuesCount: (report.healthAudit.checklist?.critical?.length || 0) + (report.healthAudit.checklist?.warnings?.length || 0),
      criticalIssues: report.healthAudit.checklist?.critical || [],
      warnings: report.healthAudit.checklist?.warnings || [],
      securityMissingHeaders: report.headersSecurity.missingHeaders || [],
      lhPerformance: report.lighthouse.performanceScore,
      lhMetrics: report.lighthouse.metrics,
      deadLinks: report.deepSpider.issues?.deadLinks || []
    }, null, 2));

  } catch (err) {
    console.error('Audit failed:', err);
  }
}

auditSite();
