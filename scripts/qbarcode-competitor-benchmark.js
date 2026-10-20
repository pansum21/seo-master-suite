import fs from 'fs';

const BASE_URL = 'http://localhost:5050';
const MY_SITE = 'https://qbarcode.vercel.app';

const COMPETITORS = [
  { name: 'QRCode Monkey', url: 'https://www.qrcode-monkey.com' },
  { name: 'QR Code Generator (Bitly)', url: 'https://www.qr-code-generator.com' },
  { name: 'ME-QR', url: 'https://me-qr.com' },
  { name: 'TEC-IT Barcode Studio', url: 'https://barcode.tec-it.com' },
  { name: 'Online Barcode Generator', url: 'https://online-barcode-generator.net' },
  { name: 'BarcodesInc Generator', url: 'https://www.barcodesinc.com/generator/index.php' },
  { name: 'Uniqode (Beaconstac)', url: 'https://uniqode.com/qr-code-generator' },
  { name: 'QR.io', url: 'https://qr.io' },
  { name: 'Flowcode', url: 'https://www.flowcode.com' },
  { name: 'The QR Code Generator', url: 'https://the-qrcode-generator.com' },
  { name: 'Scanova', url: 'https://scanova.io' }
];

async function runBenchmark() {
  console.log('⚡ Starting QBar Code Studio VS Competitors SEO Benchmark...');
  
  // 1. Audit My Site
  console.log(`\n[1] Auditing Target Site: ${MY_SITE}...`);
  const myAuditRes = await fetch(`${BASE_URL}/api/audit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: MY_SITE })
  });
  const myAudit = await myAuditRes.json();

  // Backlinks / Authority for My Site
  console.log(`[1b] Checking Authority for: ${MY_SITE}...`);
  const myAuthRes = await fetch(`${BASE_URL}/api/backlinks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: MY_SITE })
  });
  const myAuth = await myAuthRes.json();

  const competitorResults = [];

  // 2. Audit each competitor
  for (const comp of COMPETITORS) {
    console.log(`\nAuditing Competitor: ${comp.name} (${comp.url})...`);
    try {
      const auditRes = await fetch(`${BASE_URL}/api/audit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: comp.url }),
        signal: AbortSignal.timeout(15000)
      });
      const auditData = await auditRes.json();

      let authData = {};
      try {
        const authRes = await fetch(`${BASE_URL}/api/backlinks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: comp.url }),
          signal: AbortSignal.timeout(10000)
        });
        authData = await authRes.json();
      } catch (e) {
        console.warn(`Authority check failed for ${comp.url}: ${e.message}`);
      }

      // Head to Head compare
      let compareData = {};
      try {
        const compRes = await fetch(`${BASE_URL}/api/compare`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url1: MY_SITE, url2: comp.url }),
          signal: AbortSignal.timeout(15000)
        });
        compareData = await compRes.json();
      } catch (e) {
        console.warn(`Compare failed for ${comp.url}: ${e.message}`);
      }

      competitorResults.push({
        name: comp.name,
        url: comp.url,
        audit: auditData,
        auth: authData,
        compare: compareData
      });
      console.log(`  ✓ ${comp.name} processed: Score ${auditData.metrics?.score || 'N/A'}`);
    } catch (err) {
      console.log(`  ✗ ${comp.name} failed: ${err.message}`);
      competitorResults.push({
        name: comp.name,
        url: comp.url,
        error: err.message
      });
    }
  }

  const finalOutput = {
    target: {
      url: MY_SITE,
      audit: myAudit,
      auth: myAuth
    },
    competitors: competitorResults,
    timestamp: new Date().toISOString()
  };

  fs.writeFileSync('qbarcode_benchmark_report.json', JSON.stringify(finalOutput, null, 2), 'utf-8');
  console.log('\n======================================================');
  console.log('✅ BENCHMARK COMPLETE! Saved to qbarcode_benchmark_report.json');
  console.log('======================================================');
}

runBenchmark().catch(console.error);
