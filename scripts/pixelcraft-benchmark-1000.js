import fs from 'fs';
import { auditUrl } from '../src/services/seoAuditor.js';

const TARGET_URL = 'https://pixelcraftprostudio.vercel.app';
const COMPETITORS = [
  { name: 'Photopea', url: 'https://www.photopea.com' },
  { name: 'Piskel', url: 'https://www.piskelapp.com' },
  { name: 'Canva', url: 'https://canva.com' },
  { name: 'Pixilart', url: 'https://www.pixilart.com' },
  { name: 'Coolors', url: 'https://coolors.co' }
];

async function main() {
  console.log('================================================================');
  console.log('⚡ STARTING PIXELCRAFT PRO STUDIO 500-RUN & COMPETITOR BENCHMARK');
  console.log('   Target: ' + TARGET_URL);
  console.log('================================================================\n');

  // Step 1: Deep Real-Time Audit on Target Site
  console.log('🔍 [1/3] Running deep live on-page SEO audit on PixelCraft Studio...');
  const targetAudit = await auditUrl(TARGET_URL);
  console.log(`   ✓ PixelCraft Studio Audit Complete | Score: ${targetAudit.metrics?.score}/100 | Load Time: ${targetAudit.metrics?.loadTimeMs}ms`);

  // Step 2: Deep Audits on Competitors
  console.log('\n🔍 [2/3] Auditing Top 5 Industry Design Competitors...');
  const competitorAudits = [];
  for (const comp of COMPETITORS) {
    try {
      console.log(`   Auditing ${comp.name} (${comp.url})...`);
      const compAudit = await auditUrl(comp.url);
      competitorAudits.push({
        name: comp.name,
        url: comp.url,
        score: compAudit.metrics?.score || 0,
        loadTimeMs: compAudit.metrics?.loadTimeMs || 0,
        pageSizeKb: compAudit.metrics?.pageSizeKb || 0,
        h1Count: compAudit.headings?.h1?.length || 0,
        wordCount: compAudit.metrics?.wordCount || 0,
        warningsCount: compAudit.audit?.warnings?.length || 0,
        criticalCount: compAudit.audit?.critical?.length || 0,
        audit: compAudit
      });
      console.log(`   ✓ ${comp.name}: Score ${compAudit.metrics?.score}/100 | Time: ${compAudit.metrics?.loadTimeMs}ms`);
    } catch (err) {
      console.error(`   ✗ ${comp.name} Error: ${err.message}`);
    }
  }

  // Step 3: 500-Run High-Volume Statistical Stress & Latency Test on PixelCraft Studio
  console.log('\n⚡ [3/3] Executing 500-Run Live Latency & Stability Sampling on PixelCraft Studio...');
  const TOTAL_RUNS = 500;
  const CONCURRENCY = 10;
  const latencies = [];
  let successful = 0;
  let failed = 0;
  const statusCodes = {};

  const chunks = [];
  for (let i = 0; i < TOTAL_RUNS; i += CONCURRENCY) {
    const chunk = Array.from({ length: Math.min(CONCURRENCY, TOTAL_RUNS - i) }, (_, idx) => i + idx + 1);
    chunks.push(chunk);
  }

  const startTime = Date.now();

  for (let c = 0; c < chunks.length; c++) {
    const batch = chunks[c];
    await Promise.all(
      batch.map(async (runId) => {
        const reqStart = Date.now();
        try {
          const res = await fetch(TARGET_URL, {
            headers: {
              'User-Agent': `PixelCraftStressTester/1.0 (Run ${runId})`
            },
            signal: AbortSignal.timeout(10000)
          });
          const latency = Date.now() - reqStart;
          latencies.push(latency);
          statusCodes[res.status] = (statusCodes[res.status] || 0) + 1;
          if (res.ok) {
            successful++;
          } else {
            failed++;
          }
        } catch (err) {
          failed++;
          statusCodes['TIMEOUT_OR_ERR'] = (statusCodes['TIMEOUT_OR_ERR'] || 0) + 1;
        }
      })
    );
    if ((c + 1) % 10 === 0 || c === chunks.length - 1) {
      const progress = Math.round(((c + 1) / chunks.length) * 100);
      process.stdout.write(`   Progress: ${progress}% (${(c + 1) * CONCURRENCY}/${TOTAL_RUNS} runs completed)...\r`);
    }
  }

  const totalTimeSec = ((Date.now() - startTime) / 1000).toFixed(2);
  latencies.sort((a, b) => a - b);

  const minLatency = latencies[0] || 0;
  const maxLatency = latencies[latencies.length - 1] || 0;
  const avgLatency = Math.round(latencies.reduce((a, b) => a + b, 0) / (latencies.length || 1));
  const p50 = latencies[Math.floor(latencies.length * 0.5)] || 0;
  const p95 = latencies[Math.floor(latencies.length * 0.95)] || 0;
  const p99 = latencies[Math.floor(latencies.length * 0.99)] || 0;

  console.log(`\n\n🎉 500-Run Benchmark Completed in ${totalTimeSec}s!`);
  console.log(`   Success: ${successful}/${TOTAL_RUNS} (Uptime: ${((successful / TOTAL_RUNS) * 100).toFixed(1)}%)`);
  console.log(`   Average Latency: ${avgLatency}ms | P50: ${p50}ms | P95: ${p95}ms | P99: ${p99}ms | Min: ${minLatency}ms | Max: ${maxLatency}ms`);

  const results = {
    timestamp: new Date().toISOString(),
    target: {
      url: TARGET_URL,
      score: targetAudit.metrics?.score,
      loadTimeMs: targetAudit.metrics?.loadTimeMs,
      pageSizeKb: targetAudit.metrics?.pageSizeKb,
      wordCount: targetAudit.metrics?.wordCount,
      headings: targetAudit.headings,
      audit: targetAudit.audit
    },
    competitors: competitorAudits,
    stressTest500: {
      totalRuns: TOTAL_RUNS,
      totalTimeSec: parseFloat(totalTimeSec),
      successful,
      failed,
      uptimePercentage: ((successful / TOTAL_RUNS) * 100).toFixed(2),
      statusCodes,
      latency: {
        min: minLatency,
        max: maxLatency,
        avg: avgLatency,
        p50,
        p95,
        p99
      }
    }
  };

  const outputPath = './pixelcraft_benchmark_results.json';
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\n📁 Report saved successfully to: ${outputPath}\n`);
}

main().catch(console.error);
