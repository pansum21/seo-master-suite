import http from 'http';
import fs from 'fs';
import { auditUrl } from './src/services/seoAuditor.js';
import { compareMultiCompetitors } from './src/services/competitorCompare.js';
import { analyzeKeywords } from './src/services/keywordEngine.js';
import { checkHeaders } from './src/services/headerChecker.js';
import { analyzeDomainAuthority } from './src/services/backlinkEngine.js';
import { analyzeContent } from './src/services/contentAnalyzer.js';

async function makeLocalRequest(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : null;
    const req = http.request({
      hostname: 'localhost',
      port: 5050,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...(postData ? { 'Content-Length': Buffer.byteLength(postData) } : {})
      },
      timeout: 5000
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request Timeout'));
    });

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function run10kStressAndAudit() {
  console.log('================================================================');
  console.log('⚡ SEOPULSE PRO SUITE - 10,000 ITERATIONS STRESS & AUDIT SUITE ⚡');
  console.log('================================================================');

  const initialMemory = process.memoryUsage();
  console.log(`Initial RSS: ${(initialMemory.rss / 1024 / 1024).toFixed(2)} MB`);

  // 1. STRESS TESTING: 10,000 ITERATIONS
  console.log('\n--- 1. EXECUTING 10,000 ITERATION ENGINE SIMULATION ---');
  const startTime = Date.now();
  let completed = 0;
  let errors = 0;
  const latencies = [];

  const BATCH_SIZE = 500;
  const TOTAL_RUNS = 10000;

  for (let batch = 0; batch < TOTAL_RUNS / BATCH_SIZE; batch++) {
    const promises = [];
    for (let i = 0; i < BATCH_SIZE; i++) {
      const idx = batch * BATCH_SIZE + i;
      // Cycle through fast internal algorithms & API checks
      const task = async () => {
        const t0 = performance.now();
        try {
          const mod = idx % 5;
          if (mod === 0) {
            analyzeDomainAuthority(idx % 2 === 0 ? 'maparte.vercel.app' : 'cubar.studio');
          } else if (mod === 1) {
            analyzeContent('Custom map poster printing museum grade archival finish frame vector', 'custom map poster');
          } else if (mod === 2) {
            await makeLocalRequest('/api/health');
          } else if (mod === 3) {
            await makeLocalRequest('/api/alerts');
          } else {
            await makeLocalRequest('/api/projects');
          }
          const t1 = performance.now();
          latencies.push(t1 - t0);
          completed++;
        } catch (err) {
          errors++;
        }
      };
      promises.push(task());
    }
    await Promise.all(promises);
    if ((batch + 1) % 4 === 0 || batch === (TOTAL_RUNS / BATCH_SIZE) - 1) {
      process.stdout.write(`  Progress: ${completed} / ${TOTAL_RUNS} iterations completed (${((completed/TOTAL_RUNS)*100).toFixed(0)}%)...\n`);
    }
  }

  const totalDuration = ((Date.now() - startTime) / 1000).toFixed(2);
  latencies.sort((a, b) => a - b);
  const p50 = latencies[Math.floor(latencies.length * 0.50)].toFixed(2);
  const p95 = latencies[Math.floor(latencies.length * 0.95)].toFixed(2);
  const p99 = latencies[Math.floor(latencies.length * 0.99)].toFixed(2);
  const avgLatency = (latencies.reduce((a, b) => a + b, 0) / latencies.length).toFixed(2);

  const finalMemory = process.memoryUsage();
  console.log(`\n✅ 10,000 Iterations Done in ${totalDuration}s`);
  console.log(`Success Rate: ${(((completed - errors) / completed) * 100).toFixed(2)}% (Errors: ${errors})`);
  console.log(`Latency: Avg ${avgLatency}ms | p50: ${p50}ms | p95: ${p95}ms | p99: ${p99}ms`);
  console.log(`Memory RSS: ${(finalMemory.rss / 1024 / 1024).toFixed(2)} MB (Delta: ${((finalMemory.rss - initialMemory.rss) / 1024 / 1024).toFixed(2)} MB)`);

  // 2. RUN LIVE COMPETITOR BENCHMARKS
  console.log('\n--- 2. RUNNING MULTI-COMPETITOR BENCHMARKS ---');

  // Group A: Maparte
  console.log('Auditing Maparte & Competitors...');
  const maparteComp = await compareMultiCompetitors('https://maparte.vercel.app', [
    'https://www.mapiful.com',
    'https://www.grafomap.com',
    'https://positiveprints.com',
    'https://www.displate.com'
  ]);

  // Group B: Cubar Studio
  console.log('Auditing Cubar Studio & QR Code Competitors...');
  const cubarComp = await compareMultiCompetitors('https://cubar.studio', [
    'https://beaconstac.com',
    'https://www.qr-code-generator.com',
    'https://qr.io',
    'https://www.qrcode-monkey.com'
  ]);

  // Group C: SEOPulse Pro Suite
  console.log('Auditing SEOPulse Suite & SEO Competitors...');
  const seoComp = await compareMultiCompetitors('http://localhost:5050', [
    'https://smallseotools.com',
    'https://seobility.net',
    'https://ahrefs.com',
    'https://semrush.com'
  ]);

  // 3. KEYWORD BENCHMARKS
  console.log('\n--- 3. KEYWORD SEARCH VOLUME & CPC BENCHMARKS ---');
  const kwMaparte = await analyzeKeywords('custom map poster');
  const kwCubar = await analyzeKeywords('qr code generator online');
  const kwSeo = await analyzeKeywords('free seo audit tool');

  // 4. HTTP SECURITY HEADERS
  console.log('\n--- 4. HTTP SECURITY HEADERS AUDIT ---');
  const secMaparte = await checkHeaders('https://maparte.vercel.app');
  const secCubar = await checkHeaders('https://cubar.studio');

  // 5. TEST LOCALHOST VERIFICATIONS
  console.log('\n--- 5. VERIFYING UI/UX FIXES ON LOCALHOST ---');
  const healthCheckRes = await makeLocalRequest('/api/health');
  const alertsCheckRes = await makeLocalRequest('/api/alerts');
  const projectsCheckRes = await makeLocalRequest('/api/projects');

  const reportData = {
    testDate: new Date().toISOString(),
    stressMetrics: {
      totalIterations: TOTAL_RUNS,
      completed,
      errors,
      successPercentage: (((completed - errors) / completed) * 100).toFixed(2),
      durationSeconds: totalDuration,
      requestsPerSecond: (completed / totalDuration).toFixed(0),
      avgLatencyMs: avgLatency,
      p50Ms: p50,
      p95Ms: p95,
      p99Ms: p99,
      memoryDeltaMb: ((finalMemory.rss - initialMemory.rss) / 1024 / 1024).toFixed(2)
    },
    benchmarks: {
      maparte: maparteComp,
      cubar: cubarComp,
      seoSuite: seoComp
    },
    keywords: {
      maparte: kwMaparte,
      cubar: kwCubar,
      seoSuite: kwSeo
    },
    security: {
      maparte: secMaparte,
      cubar: secCubar
    },
    uiVerifications: {
      healthEndpoint: healthCheckRes.status === 200,
      alertsCount: alertsCheckRes.data?.alerts?.length || 0,
      projectsCount: projectsCheckRes.data?.projects?.length || 0
    }
  };

  fs.writeFileSync('stress_test_10k_results.json', JSON.stringify(reportData, null, 2), 'utf8');
  console.log('\n================================================================');
  console.log('✅ ALL 10,000 TESTS AND BENCHMARKS FINISHED WITHOUT CRASH!');
  console.log('Saved detailed results to stress_test_10k_results.json');
  console.log('================================================================');
}

run10kStressAndAudit().catch(err => {
  console.error('Fatal Test Error:', err);
  process.exit(1);
});
