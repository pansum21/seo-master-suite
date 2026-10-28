import test from 'node:test';
import assert from 'node:assert/strict';
import { getAhrefsDomainRatings, getDomainRatingProviderStatus } from '../src/services/backlinkEngine.js';

test('provider status never exposes the API key', () => {
  const status = getDomainRatingProviderStatus();
  assert.equal(typeof status.configured, 'boolean');
  assert.equal(JSON.stringify(status).includes(process.env.AHREFS_API_KEY || '\0'), false);
});

test('missing provider key returns a clear configuration error', async () => {
  await assert.rejects(
    getAhrefsDomainRatings(['example.com'], ''),
    error => error.statusCode === 503 && /AHREFS_API_KEY/.test(error.message)
  );
});

test('single-domain request normalizes host and returns the real DR field', async () => {
  const originalFetch = globalThis.fetch;
  let request;
  globalThis.fetch = async (url, options) => {
    request = { url: String(url), options };
    return new Response(JSON.stringify({
      domain_rating: {
        license: 'https://ahrefs.com/legal/domain-rating-license',
        targets: [{ target: 'example.com', domain_rating: 42.7 }]
      }
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  };
  try {
    const result = await getAhrefsDomainRatings(['https://www.example.com/path'], 'test-secret');
    assert.equal(request.options.method, 'POST');
    assert.equal(request.options.headers.Authorization, 'Bearer test-secret');
    assert.deepEqual(JSON.parse(request.options.body), { targets: ['example.com'], version: 'dr4' });
    assert.equal(result.targets[0].domainRating, 42.7);
    assert.equal(result.source, 'Domain Rating by Ahrefs');
    assert.equal(JSON.stringify(result).includes('test-secret'), false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('batch requests deduplicate targets and preserve no-data rows', async () => {
  const originalFetch = globalThis.fetch;
  let requestTargets;
  globalThis.fetch = async (_url, options) => {
    requestTargets = JSON.parse(options.body).targets;
    return new Response(JSON.stringify({
      domain_rating: { targets: [{ target: 'b.example', domain_rating: 8 }, { target: 'a.example', domain_rating: 71 }] }
    }), { status: 200 });
  };
  try {
    const result = await getAhrefsDomainRatings(['https://www.a.example/path', 'b.example', 'a.example'], 'test-key');
    assert.deepEqual(requestTargets, ['a.example', 'b.example']);
    assert.deepEqual(result.targets.map(row => row.domainRating), [71, 8]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('provider rate limits are surfaced instead of becoming fabricated DR values', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify({ error: { message: 'rate limit exceeded' } }), { status: 429 });
  try {
    await assert.rejects(getAhrefsDomainRatings(['example.com'], 'test-key'), error => error.statusCode === 503 && /rate limit/i.test(error.message));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('private hosts and oversized batches are rejected before a provider request', async () => {
  await assert.rejects(getAhrefsDomainRatings(['localhost'], 'test-key'), /Local and private/);
  await assert.rejects(getAhrefsDomainRatings(Array.from({ length: 1001 }, (_, i) => `domain-${i}.example`), 'test-key'), error => error.statusCode === 400);
});
