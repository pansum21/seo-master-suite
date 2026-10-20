/**
 * 1000-Run Endurance Stress & Stability Test
 * Tests all 16 SEO Master Suite endpoints under heavy load
 */

const BASE_URL = 'http://localhost:5050';

async function runEnduranceTest() {
  console.log('====================================================');
  console.log('⚡ STARTING 1,000-REQUEST ENDURANCE STRESS TEST');
  console.log('   Target Server: ' + BASE_URL);
  console.log('====================================================\n');

  const initialMem = process.memoryUsage();
  const startTime = Date.now();

  const testPayloads = [
    { name: '1. Health Check (GET /)', url: `${BASE_URL}/`, method: 'GET' },
    { name: '2. Site Health Auditor (/api/audit)', url: `${BASE_URL}/api/audit`, method: 'POST', body: { url: 'https://example.com' } },
    { name: '3. Keyword Explorer (/api/keywords)', url: `${BASE_URL}/api/keywords`, method: 'POST', body: { keyword: 'seo audit studio' } },
    { name: '4. Gemini AI Assistant (/api/ai/optimize)', url: `${BASE_URL}/api/ai/optimize`, method: 'POST', body: { type: 'title', query: 'map poster wall art' } },
    { name: '5. Competitor Showdown (/api/compare)', url: `${BASE_URL}/api/compare`, method: 'POST', body: { url1: 'https://example.com', url2: 'https://example.org' } },
    { name: '6. Robots & Sitemap (/api/robots-sitemap)', url: `${BASE_URL}/api/robots-sitemap`, method: 'POST', body: { domain: 'https://maparte.vercel.app' } },
    { name: '7. HTTP Headers (/api/headers)', url: `${BASE_URL}/api/headers`, method: 'POST', body: { url: 'https://maparte.vercel.app' } },
    { name: '8. Readability Engine (/api/readability)', url: `${BASE_URL}/api/readability`, method: 'POST', body: { text: 'Maparte is an open source custom map poster designer and wall art generator for travelers and artists.', targetKeyword: 'map poster' } },
    { name: '9. Projects Listing (/api/projects)', url: `${BASE_URL}/api/projects`, method: 'GET' },
    { name: '10. Projects Creation (/api/projects)', url: `${BASE_URL}/api/projects`, method: 'POST', body: { name: 'Stress Test Client', url: 'https://example.com/test' } },
    { name: '11. Backlink Engine (/api/backlinks)', url: `${BASE_URL}/api/backlinks`, method: 'POST', body: { url: 'https://maparte.vercel.app' } },
    { name: '12. GSC Status (/api/gsc/status)', url: `${BASE_URL}/api/gsc/status`, method: 'GET' },
    { name: '13. GSC Data (/api/gsc/data)', url: `${BASE_URL}/api/gsc/data`, method: 'POST', body: { domain: 'https://maparte.vercel.app', dateRange: '28d' } },
    { name: '14. Alerts Listing (/api/alerts)', url: `${BASE_URL}/api/alerts`, method: 'GET' },
    { name: '15. Deep Spider Crawl (/api/spider/crawl)', url: `${BASE_URL}/api/spider/crawl`, method: 'POST', body: { url: 'https://example.com', maxPages: 2, maxDepth: 1 } },
    { name: '16. PageSpeed & Vitals (/api/lighthouse)', url: `${BASE_URL}/api/lighthouse`, method: 'POST', body: { url: 'https://example.com', strategy: 'mobile' } }
  ];

  const TOTAL_RUNS = 1000;
  const CONCURRENCY = 10;
  let completed = 0;
  let successful = 0;
  let failed = 0;
  const latencies = [];
  const endpointErrors = {};

  const queue = Array.from({ length: TOTAL_RUNS }, (_, idx) => {
    const payload = testPayloads[idx % testPayloads.length];
    return { id: idx + 1, ...payload };
  });

  async function worker(items) {
    for (const item of items) {
      const reqStart = Date.now();
      try {
        const opts = {
          method: item.method,
          headers: { 'Content-Type': 'application/json' }
        };
        if (item.body) opts.body = JSON.stringify(item.body);

        const res = await fetch(item.url, opts);
        const reqLatency = Date.now() - reqStart;
        latencies.push(reqLatency);

        if (res.ok) {
          successful++;
        } else {
          failed++;
          endpointErrors[item.name] = (endpointErrors[item.name] || 0) + 1;
        }
      } catch (err) {
        failed++;
        endpointErrors[item.name] = (endpointErrors[item.name] || 0) + 1;
      }
      completed++;
      if (completed % 100 === 0 || completed === TOTAL_RUNS) {
        process.stdout.write(`Progress: ${completed}/${TOTAL_RUNS} requests completed (${successful} ok, ${failed} failed)...\r`);
      }
    }
  }

  // Partition queue among workers
  const chunks = Array.from({ length: CONCURRENCY }, () => []);
  queue.forEach((item, idx) => chunks[idx % CONCURRENCY].push(item));

  await Promise.all(chunks.map(chunk => worker(chunk)));

  const totalTimeSec = ((Date.now() - startTime) / 1000).toFixed(2);
  const finalMem = process.memoryUsage();

  latencies.sort((a, b) => a - b);
  const minLatency = latencies[0] || 0;
  const maxLatency = latencies[latencies.length - 1] || 0;
  const avgLatency = (latencies.reduce((a, b) => a + b, 0) / (latencies.length || 1)).toFixed(1);
  const p95Latency = latencies[Math.floor(latencies.length * 0.95)] || 0;

  console.log('\n\n====================================================');
  console.log('🏁 1,000-RUN ENDURANCE TEST COMPLETED');
  console.log('====================================================');
  console.log(`• Total Requests Dispatched : ${TOTAL_RUNS}`);
  console.log(`• Successful (2xx / OK)     : ${successful}`);
  console.log(`• Failed (Non-2xx / Errors) : ${failed}`);
  console.log(`• Error Rate                : ${((failed / TOTAL_RUNS) * 100).toFixed(2)}%`);
  console.log(`• Total Elapsed Time        : ${totalTimeSec} seconds`);
  console.log(`• Throughput (RPS)          : ${(TOTAL_RUNS / parseFloat(totalTimeSec)).toFixed(1)} req/sec`);
  console.log(`• Min Latency               : ${minLatency} ms`);
  console.log(`• Avg Latency               : ${avgLatency} ms`);
  console.log(`• P95 Latency               : ${p95Latency} ms`);
  console.log(`• Max Latency               : ${maxLatency} ms`);
  console.log('----------------------------------------------------');
  console.log(`• Heap Memory Before        : ${(initialMem.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  console.log(`• Heap Memory After         : ${(finalMem.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  console.log(`• RSS Memory Change         : ${((finalMem.rss - initialMem.rss) / 1024 / 1024).toFixed(2)} MB`);
  console.log('----------------------------------------------------');

  if (Object.keys(endpointErrors).length > 0) {
    console.log('⚠️ Endpoint Failure Breakdown:');
    Object.entries(endpointErrors).forEach(([ep, count]) => {
      console.log(`   - ${ep}: ${count} errors`);
    });
  } else {
    console.log('✅ ZERO ERRORS: All 1,000 requests processed flawlessly without server crashes!');
  }
  console.log('====================================================\n');
}

runEnduranceTest();
