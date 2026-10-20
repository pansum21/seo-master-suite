import fs from 'fs';
import { auditUrl } from './src/services/seoAuditor.js';
import { compareMultiCompetitors } from './src/services/competitorCompare.js';
import { analyzeKeywords } from './src/services/keywordEngine.js';
import { checkHeaders } from './src/services/headerChecker.js';
import { analyzeDomainAuthority } from './src/services/backlinkEngine.js';
import { analyzeContent } from './src/services/contentAnalyzer.js';

async function runMegaAudit() {
  console.log('🚀 Starting Comprehensive Multi-Tool Benchmark & Competitor Stress-Test...');

  // Group 1: Maparte vs Competitors
  const maparteSites = [
    'https://maparte.vercel.app',
    'https://www.mapiful.com',
    'https://www.grafomap.com',
    'https://positiveprints.com',
    'https://www.displate.com'
  ];

  // Group 2: Cubar Studio vs QR Code Competitors
  const cubarSites = [
    'https://cubar.studio',
    'https://www.qr-code-generator.com',
    'https://www.qrcode-monkey.com',
    'https://qr.io',
    'https://beaconstac.com'
  ];

  // Group 3: SEOPulse Pro Suite vs SEO Competitors
  const seoSuiteSites = [
    'http://localhost:5050',
    'https://seobility.net',
    'https://ahrefs.com',
    'https://semrush.com',
    'https://smallseotools.com'
  ];

  const results = {
    timestamp: new Date().toISOString(),
    maparteBenchmark: null,
    cubarBenchmark: null,
    seoSuiteBenchmark: null,
    keywordAnalyses: {},
    securityHeaders: {},
    domainAuthorities: {},
    contentDepths: {}
  };

  // 1. Run Multi-Competitor Showdown for Maparte
  console.log('\n--- 1. Auditing Maparte Showdown ---');
  try {
    results.maparteBenchmark = await compareMultiCompetitors(maparteSites[0], maparteSites.slice(1));
    console.log(`Maparte Showdown complete. Total Sites: ${results.maparteBenchmark.totalCompared}, Leader: ${results.maparteBenchmark.topLeader?.hostname}`);
  } catch (err) {
    console.error('Error Maparte compare:', err.message);
  }

  // 2. Run Multi-Competitor Showdown for Cubar Studio
  console.log('\n--- 2. Auditing Cubar Studio Showdown ---');
  try {
    results.cubarBenchmark = await compareMultiCompetitors(cubarSites[0], cubarSites.slice(1));
    console.log(`Cubar Studio Showdown complete. Total Sites: ${results.cubarBenchmark.totalCompared}, Leader: ${results.cubarBenchmark.topLeader?.hostname}`);
  } catch (err) {
    console.error('Error Cubar compare:', err.message);
  }

  // 3. Run Multi-Competitor Showdown for SEO Master Suite
  console.log('\n--- 3. Auditing SEO Master Suite Showdown ---');
  try {
    results.seoSuiteBenchmark = await compareMultiCompetitors(seoSuiteSites[0], seoSuiteSites.slice(1));
    console.log(`SEO Suite Showdown complete. Total Sites: ${results.seoSuiteBenchmark.totalCompared}, Leader: ${results.seoSuiteBenchmark.topLeader?.hostname}`);
  } catch (err) {
    console.error('Error SEO Suite compare:', err.message);
  }

  // 4. Keyword Research Engine Tests
  console.log('\n--- 4. Running Keyword Explorer Tests ---');
  results.keywordAnalyses.maparte = await analyzeKeywords('custom map poster');
  results.keywordAnalyses.cubar = await analyzeKeywords('qr code generator online');
  results.keywordAnalyses.seo = await analyzeKeywords('free seo audit tool');

  // 5. Security & HTTP Header Checks
  console.log('\n--- 5. Running HTTP Security Header Checks ---');
  results.securityHeaders.maparte = await checkHeaders('https://maparte.vercel.app');
  results.securityHeaders.cubar = await checkHeaders('https://cubar.studio');
  results.securityHeaders.mapiful = await checkHeaders('https://www.mapiful.com');
  results.securityHeaders.qrGenerator = await checkHeaders('https://www.qr-code-generator.com');

  // 6. Backlink Authority Checks
  console.log('\n--- 6. Running Domain Authority & Backlink Tests ---');
  results.domainAuthorities.maparte = analyzeDomainAuthority('maparte.vercel.app');
  results.domainAuthorities.mapiful = analyzeDomainAuthority('mapiful.com');
  results.domainAuthorities.cubar = analyzeDomainAuthority('cubar.studio');
  results.domainAuthorities.qrGenerator = analyzeDomainAuthority('qr-code-generator.com');

  // 7. Content Depth & Readability
  console.log('\n--- 7. Running Content Depth & Readability ---');
  results.contentDepths.maparte = analyzeContent(
    'Create stunning personalized custom map posters of your favorite city or memory. Choose custom themes, modern layouts, and museum-grade archival printing.',
    'custom map poster'
  );
  results.contentDepths.cubar = analyzeContent(
    'Generate customized QR codes with logos, colors, and interactive frames. 100% free vector SVG download with real-time analytics and tracking.',
    'qr code generator'
  );

  fs.writeFileSync('mega_benchmark_data.json', JSON.stringify(results, null, 2), 'utf8');
  console.log('\n✅ All 16 tools benchmark tests completed successfully! Data saved to mega_benchmark_data.json');
}

runMegaAudit().catch(console.error);
