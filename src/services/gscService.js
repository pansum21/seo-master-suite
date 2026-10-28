/**
 * Google Search Console is intentionally reported as unavailable until a real
 * OAuth flow is configured. Never fabricate clicks, impressions, queries, or
 * rankings when the property is not connected.
 */
export function getGscStatus() {
  return {
    connected: false,
    mode: 'not-configured',
    accountEmail: null,
    propertyUrl: null,
    connectedAt: null,
    message: 'Google Search Console OAuth is not configured. No demo or estimated data is shown.'
  };
}

export function getGscAnalytics() {
  const error = new Error('Google Search Console is not connected. Configure the OAuth integration before requesting property data.');
  error.statusCode = 503;
  throw error;
}

export function saveGscConfig() {
  const error = new Error('Credential saving is disabled because this app does not yet implement Google OAuth. Do not paste secrets here.');
  error.statusCode = 501;
  throw error;
}

export function disconnectGsc() {
  return { success: true, status: getGscStatus() };
}
