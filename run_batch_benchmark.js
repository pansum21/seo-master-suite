import fs from 'fs';

const TARGET_SITES = [
  // E-Commerce & Map Poster Competitors
  'https://maparte.vercel.app',
  'https://www.mapiful.com',
  'https://www.grafomap.com',
  'https://positiveprints.com',
  'https://www.displate.com',
  'https://www.society6.com',
  'https://www.redbubble.com',
  
  // Top SaaS & Developer Tools
  'https://github.com',
  'https://vercel.com',
  'https://stripe.com',
  'https://supabase.com',
  'https://cloudflare.com',
  'https://linear.app',
  'https://notion.so',
  'https://figma.com',
  'https://resend.com',

  // Tech & Media Publications
  'https://techcrunch.com',
  'https://theverge.com',
  'https://wired.com',
  'https://dev.to',
  'https://medium.com',
  'https://hackernews.com',

  // Leading Indian Tech Startups
  'https://zerodha.com',
  'https://razorpay.com',
  'https://cred.club',
  'https://zomato.com',
  'https://swiggy.com',

  // High-Volume Global Websites
  'https://unsplash.com',
  'https://wikipedia.org',
  'https://reddit.com',
  'https://stackoverflow.com',
  'https://canva.com',
  'https://pinterest.com'
];

async function runBenchmark() {
  console.log(`Starting real-world SEO Suite stress-test on ${TARGET_SITES.length} live websites...`);
  const benchmarkData = [];

  for (let i = 0; i < TARGET_SITES.length; i++) {
    const url = TARGET_SITES[i];
    console.log(`[${i + 1}/${TARGET_SITES.length}] Auditing ${url}...`);
    const start = Date.now();

    try {
      const res = await fetch('http://localhost:5050/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
        signal: AbortSignal.timeout(12000)
      });

      const data = await res.json();

      if (data.success) {
        const item = {
          domain: data.hostname,
          url: data.url,
          score: data.metrics.score,
          loadTimeMs: data.metrics.loadTimeMs,
          wordCount: data.metrics.wordCount,
          h1Count: data.headings.h1?.length || 0,
          h1Text: data.headings.h1?.[0]?.slice(0, 40) || '(No H1)',
          imagesTotal: data.images.total,
          missingAlt: data.images.missingAlt,
          altCoveragePct: data.images.total > 0 ? Math.round(((data.images.total - data.images.missingAlt) / data.images.total) * 100) : 100,
          isHttps: data.metrics.isHttps,
          hasCanonical: !!data.meta.canonical,
          hasRobots: data.technical.robotsTxt?.exists || false,
          hasSitemap: data.technical.sitemapXml?.exists || false,
          durationTotalMs: Date.now() - start
        };
        benchmarkData.push(item);
        console.log(`  ✓ ${data.hostname} - Score: ${item.score}/100, TTFB: ${item.loadTimeMs}ms, Alt Cov: ${item.altCoveragePct}%`);
      } else {
        console.log(`  ✗ ${url} - Error: ${data.error}`);
      }
    } catch (err) {
      console.log(`  ✗ ${url} - Request Failed: ${err.message}`);
    }
  }

  // Save to JSON
  fs.writeFileSync('benchmark_results.json', JSON.stringify(benchmarkData, null, 2), 'utf-8');
  console.log(`\nAll tests completed! Saved ${benchmarkData.length} records to benchmark_results.json.`);

  // Generate Summary Stats
  const avgScore = Math.round(benchmarkData.reduce((a, b) => a + b.score, 0) / benchmarkData.length);
  const avgSpeed = Math.round(benchmarkData.reduce((a, b) => a + b.loadTimeMs, 0) / benchmarkData.length);
  const missingH1Total = benchmarkData.filter(b => b.h1Count === 0).length;
  const missingAltAvg = Math.round(benchmarkData.reduce((a, b) => a + b.missingAlt, 0) / benchmarkData.length);

  console.log(`=== BENCHMARK SUMMARY ===`);
  console.log(`Websites Audited: ${benchmarkData.length}`);
  console.log(`Average SEO Score: ${avgScore}/100`);
  console.log(`Average Server Latency (TTFB): ${avgSpeed}ms`);
  console.log(`Sites Missing <h1>: ${missingH1Total} of ${benchmarkData.length}`);
  console.log(`Avg Missing Alt Tags per Site: ${missingAltAvg}`);
}

runBenchmark().catch(console.error);
