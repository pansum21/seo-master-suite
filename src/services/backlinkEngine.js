const AHREFS_DR_ENDPOINT = 'https://api.ahrefs.com/v3/public/domain-rating-free';

export function getDomainRatingProviderStatus() {
  return {
    configured: Boolean(process.env.AHREFS_API_KEY),
    provider: 'Ahrefs Domain Rating API',
    version: 'dr4',
    message: process.env.AHREFS_API_KEY
      ? 'Ahrefs API key is configured.'
      : 'Add AHREFS_API_KEY to the server environment. The free Ahrefs DR endpoint requires an API v3 key.'
  };
}

function normalizeTarget(raw) {
  const value = String(raw || '').trim();
  if (!value || value.length > 2048) throw new Error('Each target must be a valid domain or URL (max 2,048 characters).');
  let parsed;
  try { parsed = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`); }
  catch { throw new Error(`Invalid domain or URL: ${value}`); }
  if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password) {
    throw new Error('Targets must be public HTTP/HTTPS domains or URLs.');
  }
  const hostname = parsed.hostname.toLowerCase().replace(/^www\./, '').replace(/^\[|\]$/g, '');
  if (!hostname || hostname === 'localhost' || hostname.endsWith('.localhost') || hostname.endsWith('.local')) {
    throw new Error('Local and private hostnames cannot be checked.');
  }
  return hostname;
}

/**
 * Ahrefs' public DR endpoint is free but requires an API v3 key. It returns
 * Domain Rating only; it does not provide backlinks, referring domains, or UR.
 */
export async function getAhrefsDomainRatings(rawTargets, apiKey = process.env.AHREFS_API_KEY) {
  const targetsInput = Array.isArray(rawTargets) ? rawTargets : [rawTargets];
  if (!targetsInput.length || targetsInput.length > 1000) {
    const error = new Error('Check between 1 and 1,000 domains per request.');
    error.statusCode = 400;
    throw error;
  }
  const targets = [...new Set(targetsInput.map(normalizeTarget))];
  if (!apiKey) {
    const error = new Error(getDomainRatingProviderStatus().message);
    error.statusCode = 503;
    throw error;
  }

  let response;
  try {
    response = await fetch(`${AHREFS_DR_ENDPOINT}?version=dr4`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ targets, version: 'dr4' }),
      signal: AbortSignal.timeout(15000)
    });
  } catch (cause) {
    const error = new Error(`Ahrefs Domain Rating request failed: ${cause.message}`);
    error.statusCode = 502;
    throw error;
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error?.message || payload.message || `Ahrefs API returned HTTP ${response.status}.`);
    error.statusCode = response.status === 429 ? 503 : (response.status >= 400 && response.status < 500 ? 400 : 502);
    throw error;
  }

  const items = payload.domain_rating?.targets;
  if (!Array.isArray(items)) {
    const error = new Error('Ahrefs returned an unexpected Domain Rating response.');
    error.statusCode = 502;
    throw error;
  }
  const byTarget = new Map(items.map(item => [String(item.target || '').toLowerCase().replace(/^www\./, ''), item]));
  return {
    success: true,
    source: 'Domain Rating by Ahrefs',
    version: payload.version || 'dr4',
    license: payload.domain_rating?.license || 'https://ahrefs.com/legal/domain-rating-license',
    fetchedAt: new Date().toISOString(),
    targets: targets.map(target => {
      const item = byTarget.get(target) || items.find(row => String(row.target || '').toLowerCase().replace(/^www\./, '') === target);
      return {
        target,
        domainRating: Number.isFinite(Number(item?.domain_rating)) ? Number(item.domain_rating) : null
      };
    })
  };
}
