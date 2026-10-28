import https from 'https';
import http from 'http';
import { assertPublicHttpUrl } from './urlSafety.js';

/**
 * Checks HTTP headers, redirects, SSL, and security headers of a given URL
 * @param {string} targetUrl 
 * @returns {Promise<Object>}
 */
export async function checkHeaders(targetUrl) {
  let urlStr = targetUrl.trim();
  if (!/^https?:\/\//i.test(urlStr)) {
    urlStr = `https://${urlStr}`;
  }

  const startTime = Date.now();

  try {
    const parsed = new URL(urlStr);
    await assertPublicHttpUrl(urlStr);
    const client = parsed.protocol === 'https:' ? https : http;

    const response = await new Promise((resolve, reject) => {
      const req = client.request(urlStr, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 SEOPulsePro/2.0',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        },
        timeout: 10000
      }, (res) => {
        resolve({
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
          headers: res.headers,
          httpVersion: res.httpVersion
        });
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Connection timed out (10s)'));
      });

      req.on('error', reject);
      req.end();
    });

    const latency = Date.now() - startTime;
    const headers = response.headers;

    // Security header inspection
    const securityHeaders = [
      {
        name: 'Strict-Transport-Security (HSTS)',
        headerKey: 'strict-transport-security',
        present: !!headers['strict-transport-security'],
        value: headers['strict-transport-security'] || 'Missing',
        impact: 'High',
        recommendation: 'Enforces HTTPS encryption and prevents SSL-stripping attacks.'
      },
      {
        name: 'Content-Security-Policy (CSP)',
        headerKey: 'content-security-policy',
        present: !!headers['content-security-policy'],
        value: headers['content-security-policy'] ? (headers['content-security-policy'].length > 60 ? headers['content-security-policy'].slice(0, 60) + '...' : headers['content-security-policy']) : 'Missing',
        impact: 'Critical',
        recommendation: 'Mitigates Cross-Site Scripting (XSS) and data injection vulnerabilities.'
      },
      {
        name: 'X-Frame-Options',
        headerKey: 'x-frame-options',
        present: !!headers['x-frame-options'],
        value: headers['x-frame-options'] || 'Missing',
        impact: 'Medium',
        recommendation: 'Prevents clickjacking by forbidding rendering inside iframes.'
      },
      {
        name: 'X-Content-Type-Options',
        headerKey: 'x-content-type-options',
        present: !!headers['x-content-type-options'],
        value: headers['x-content-type-options'] || 'Missing',
        impact: 'Medium',
        recommendation: 'Blocks MIME-sniffing vulnerabilities (set to "nosniff").'
      },
      {
        name: 'Referrer-Policy',
        headerKey: 'referrer-policy',
        present: !!headers['referrer-policy'],
        value: headers['referrer-policy'] || 'Missing',
        impact: 'Low',
        recommendation: 'Controls how much referrer information is leaked in outgoing requests.'
      },
      {
        name: 'Permissions-Policy',
        headerKey: 'permissions-policy',
        present: !!headers['permissions-policy'],
        value: headers['permissions-policy'] || 'Missing',
        impact: 'Low',
        recommendation: 'Restricts browser features like camera, microphone, and geolocation.'
      }
    ];

    const presentCount = securityHeaders.filter(h => h.present).length;
    const securityScore = Math.round((presentCount / securityHeaders.length) * 100);

    return {
      success: true,
      url: urlStr,
      statusCode: response.statusCode,
      statusMessage: response.statusMessage,
      latencyMs: latency,
      httpVersion: response.httpVersion,
      server: headers['server'] || 'Protected/Hidden',
      contentType: headers['content-type'] || 'text/html',
      isHttps: parsed.protocol === 'https:',
      securityScore,
      securityHeaders,
      allHeaders: headers
    };
  } catch (err) {
    return {
      success: false,
      url: urlStr,
      error: err.message
    };
  }
}
