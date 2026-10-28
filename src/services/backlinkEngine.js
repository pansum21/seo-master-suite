/**
 * OpenPageRank exposes a PageRank-style score; it is not Moz DA, Ahrefs DR,
 * backlink counts, anchor text, or a spam score. Those fields are never inferred.
 */
export async function analyzeDomainAuthority(targetUrl, apiKey = process.env.OPENPAGERANK_API_KEY) {
  const parsed = new URL(/^https?:\/\//i.test(targetUrl) ? targetUrl : `https://${targetUrl}`);
  const domain = parsed.hostname.toLowerCase().replace(/^www\./, '');
  if (!apiKey) {
    const error = new Error('OpenPageRank API key is not configured. No estimated backlink or authority metrics are shown.');
    error.statusCode = 503;
    throw error;
  }
  let response;
  try {
    response = await fetch(`https://openpagerank.com/api/v1.0/getPageRank?domains%5B0%5D=${encodeURIComponent(domain)}`, {
      headers: { 'API-OPR': apiKey },
      signal: AbortSignal.timeout(12000)
    });
  } catch (cause) {
    const error = new Error(`OpenPageRank request failed: ${cause.message}`);
    error.statusCode = 502;
    throw error;
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.response?.[0]) {
    const error = new Error(data.message || `OpenPageRank returned HTTP ${response.status}.`);
    error.statusCode = 502;
    throw error;
  }
  const item = data.response[0];
  return {
    domain,
    source: 'OpenPageRank API',
    metricName: 'OpenPageRank score',
    pageRank: item.page_rank_decimal ?? null,
    globalRank: item.rank ?? null,
    backlinks: null,
    referringDomains: null,
    spamScore: null,
    dofollowRatio: null,
    nofollowRatio: null,
    anchorDistribution: null,
    note: 'OpenPageRank is not Moz DA or Ahrefs DR and does not provide the backlink profile metrics shown as unavailable here.'
  };
}
