import { assertPublicHttpUrl } from './urlSafety.js';

/** Google PageSpeed Insights API client. Results are never synthesized. */
export async function getLighthouseAudit(targetUrl, strategy = 'mobile') {
  const url = /^https?:\/\//i.test(targetUrl.trim()) ? targetUrl.trim() : `https://${targetUrl.trim()}`;
  await assertPublicHttpUrl(url);
  if (!['mobile', 'desktop'].includes(strategy)) throw new Error('Strategy must be mobile or desktop.');
  const startedAt = Date.now();
  const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY || '';
  const endpoint = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  endpoint.searchParams.set('url', url);
  endpoint.searchParams.set('strategy', strategy);
  for (const category of ['performance', 'accessibility', 'best-practices', 'seo']) endpoint.searchParams.append('category', category);
  if (apiKey) endpoint.searchParams.set('key', apiKey);

  let response;
  try {
    response = await fetch(endpoint, { signal: AbortSignal.timeout(25000) });
  } catch (cause) {
    const error = new Error(`Google PageSpeed Insights could not be reached: ${cause.message}`);
    error.statusCode = 502;
    throw error;
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error?.message || `Google PageSpeed Insights returned HTTP ${response.status}. No synthetic result was substituted.`);
    error.statusCode = response.status === 429 ? 503 : 502;
    throw error;
  }

  const lh = data.lighthouseResult;
  if (!lh?.categories || !lh?.audits) {
    const error = new Error('Google PageSpeed Insights returned an incomplete Lighthouse report.');
    error.statusCode = 502;
    throw error;
  }
  const audits = lh.audits;
  const value = (id, scale = 1) => Number.isFinite(audits[id]?.numericValue) ? audits[id].numericValue / scale : null;
  const display = (id) => audits[id]?.displayValue || null;
  const score = (name) => Number.isFinite(lh.categories[name]?.score) ? Math.round(lh.categories[name].score * 100) : null;
  const lcp = value('largest-contentful-paint', 1000);
  const fcp = value('first-contentful-paint', 1000);
  const cls = value('cumulative-layout-shift');
  const tbt = value('total-blocking-time');
  const speedIndex = value('speed-index', 1000);
  const grade = (n, good, improve) => n == null ? 'UNAVAILABLE' : n <= good ? 'GOOD' : n <= improve ? 'NEEDS_IMPROVEMENT' : 'POOR';

  return {
    success: true,
    source: 'Google PageSpeed Insights / Lighthouse (lab data)',
    url,
    strategy,
    durationMs: Date.now() - startedAt,
    fetchedAt: new Date().toISOString(),
    scores: {
      performance: score('performance'),
      accessibility: score('accessibility'),
      bestPractices: score('best-practices'),
      seo: score('seo')
    },
    coreWebVitals: {
      lcp: { value: display('largest-contentful-paint') || (lcp == null ? null : `${lcp.toFixed(2)} s`), numericValue: lcp, score: grade(lcp, 2.5, 4), threshold: 'Target: ≤ 2.5s' },
      fcp: { value: display('first-contentful-paint') || (fcp == null ? null : `${fcp.toFixed(2)} s`), numericValue: fcp, score: grade(fcp, 1.8, 3), threshold: 'Target: ≤ 1.8s' },
      cls: { value: display('cumulative-layout-shift') || (cls == null ? null : cls.toFixed(3)), numericValue: cls, score: grade(cls, 0.1, 0.25), threshold: 'Target: ≤ 0.1' },
      tbt: { value: display('total-blocking-time') || (tbt == null ? null : `${Math.round(tbt)} ms`), numericValue: tbt, score: grade(tbt, 200, 600), threshold: 'Target: ≤ 200ms' },
      speedIndex: { value: display('speed-index') || (speedIndex == null ? null : `${speedIndex.toFixed(2)} s`), numericValue: speedIndex }
    },
    opportunities: Object.values(audits)
      .filter(a => a.details?.type === 'opportunity' && Number(a.numericValue) > 200)
      .slice(0, 5)
      .map(a => ({ title: a.title, savings: a.displayValue || '', description: a.description }))
  };
}
