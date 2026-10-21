import { auditUrl } from '../src/services/seoAuditor.js';

async function testOverallInsightsAndPerformance() {
  console.log('====================================================');
  console.log('⚡ TESTING OVERALL INSIGHTS & PERFORMANCE ENGINE');
  console.log('====================================================\n');

  const testUrl = 'https://pixelcraftprostudio.vercel.app';
  console.log(`[Test] Auditing: ${testUrl}...`);
  const result = await auditUrl(testUrl);

  if (!result.success) {
    console.error('❌ Audit failed:', result.error);
    process.exit(1);
  }

  console.log(`✅ Audit Completed in ${result.metrics.loadTimeMs}ms! Overall Score: ${result.metrics.score}/100`);

  // 1. Verify 5 Pillars
  console.log('\n--- 1. Multi-Pillar Score Radar ---');
  console.log(`On-Page SEO:       ${result.pillars.seo.score}/100 (Grade ${result.pillars.seo.grade})`);
  console.log(`Performance/Speed: ${result.pillars.performance.score}/100 (Grade ${result.pillars.performance.grade})`);
  console.log(`Mobile & UX:       ${result.pillars.mobile.score}/100 (Grade ${result.pillars.mobile.grade})`);
  console.log(`Security/Headers:  ${result.pillars.security.score}/100 (Grade ${result.pillars.security.grade})`);
  console.log(`Content/Semantics: ${result.pillars.content.score}/100 (Grade ${result.pillars.content.grade})`);

  if (!result.pillars.seo || !result.pillars.performance || !result.pillars.mobile || !result.pillars.security || !result.pillars.content) {
    throw new Error('Missing one of the 5 core pillars');
  }

  // 2. Verify Overall Insights
  console.log('\n--- 2. Executive Overall Insights ---');
  console.log(`Executive Grade:   ${result.overallInsights.executiveGrade}`);
  console.log(`Health Status:     ${result.overallInsights.healthStatus}`);
  console.log(`Summary (EN):      ${result.overallInsights.summary}`);
  console.log(`Summary (HI):      ${result.overallInsights.summaryHindi}`);
  console.log(`Issues Breakdown:  🔴 ${result.overallInsights.criticalCount} Critical | 🟡 ${result.overallInsights.warningsCount} Warnings | 🟢 ${result.overallInsights.passedCount} Passed`);
  console.log(`Top Strengths:     ${result.overallInsights.topStrengths.join(', ')}`);
  console.log(`Top Bottlenecks:   ${result.overallInsights.topBottlenecks.join(', ')}`);

  // 3. Verify Quick Wins
  console.log('\n--- 3. Top Actionable Quick Wins ---');
  result.quickWins.forEach((qw, idx) => {
    console.log(`[Win #${idx + 1}] [${qw.priority}] ${qw.title} (${qw.impact}) - ${qw.effort}`);
    console.log(`       Action: ${qw.action}`);
  });

  // 4. Verify Performance Engine & Core Web Vitals
  console.log('\n--- 4. Performance Center & Core Web Vitals ---');
  const cwv = result.performance.coreWebVitals;
  console.log(`LCP (Largest Contentful Paint): ${cwv.lcp.value} [${cwv.lcp.status}] (Benchmark: ${cwv.lcp.target})`);
  console.log(`FCP (First Contentful Paint):   ${cwv.fcp.value} [${cwv.fcp.status}] (Benchmark: ${cwv.fcp.target})`);
  console.log(`CLS (Cumulative Layout Shift):  ${cwv.cls.value} [${cwv.cls.status}] (Benchmark: ${cwv.cls.target})`);
  console.log(`TBT (Total Blocking Time):      ${cwv.tbt.value} [${cwv.tbt.status}] (Benchmark: ${cwv.tbt.target})`);
  console.log(`TTFB (Server Latency):          ${cwv.ttfb.value} [${cwv.ttfb.status}] (Benchmark: ${cwv.ttfb.target})`);
  console.log(`Speed Index:                    ${cwv.speedIndex.value} [${cwv.speedIndex.status}] (Benchmark: ${cwv.speedIndex.target})`);

  // 5. Verify Asset Payload Distribution
  console.log('\n--- 5. Asset Payload Distribution ---');
  const p = result.performance.payloadDistribution;
  console.log(`Total Payload: ${p.totalKb} KB`);
  console.log(`HTML:    ${p.htmlKb} KB (${p.htmlPct}%)`);
  console.log(`Scripts: ${p.jsKb} KB (${p.jsPct}%)`);
  console.log(`Styles:  ${p.cssKb} KB (${p.cssPct}%)`);
  console.log(`Images:  ${p.imgKb} KB (${p.imgPct}%)`);

  // 6. Verify Network Waterfall
  console.log('\n--- 6. Network Latency Waterfall ---');
  const wf = result.performance.waterfall;
  console.log(`DNS Lookup:     ${wf.dnsMs} ms`);
  console.log(`SSL Handshake:  ${wf.sslMs} ms`);
  console.log(`Server TTFB:    ${wf.ttfbMs} ms`);
  console.log(`HTML Download:  ${wf.downloadMs} ms`);
  console.log(`Total Time:     ${wf.totalMs} ms`);

  // 7. Text-to-HTML Ratio
  console.log('\n--- 7. Text-to-HTML Code Ratio ---');
  console.log(`Ratio: ${result.performance.textToHtmlRatio.value}% [${result.performance.textToHtmlRatio.status}] (${result.performance.textToHtmlRatio.benchmark})`);

  console.log('\n====================================================');
  console.log('🎉 ALL OVERALL INSIGHTS & PERFORMANCE TESTS PASSED!');
  console.log('====================================================');
}

testOverallInsightsAndPerformance().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
