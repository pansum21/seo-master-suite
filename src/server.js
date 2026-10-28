import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

import { auditUrl } from './services/seoAuditor.js';
import { analyzeKeywords } from './services/keywordEngine.js';
import { generateSchema, generateMetaBundle } from './services/schemaGenerator.js';
import { optimizeWithAi } from './services/aiOptimizer.js';
import { compareCompetitors, compareMultiCompetitors } from './services/competitorCompare.js';
import { checkHeaders } from './services/headerChecker.js';
import { analyzeContent } from './services/contentAnalyzer.js';
import { crawlSitemap } from './services/sitemapCrawler.js';
import { getLighthouseAudit } from './services/lighthouseService.js';
import { getHistory, logAuditEntry } from './services/historyEngine.js';
import { crawlSiteDeep } from './services/deepSpider.js';
import { getProjects, saveProject, deleteProject } from './services/projectManager.js';
import { getDomainRatingProviderStatus, getAhrefsDomainRatings } from './services/backlinkEngine.js';
import { getGscStatus, saveGscConfig, disconnectGsc, getGscAnalytics } from './services/gscService.js';
import { getAlerts, dismissAlert, clearAllAlerts, getMonitorConfig, updateMonitorConfig, executeScheduledCheck, initBackgroundMonitor } from './services/cronMonitor.js';

const app = express();
const PORT = process.env.PORT || 5050;

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').map(origin => origin.trim()).filter(Boolean);
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(null, false);
  }
}));
app.use(express.json({ limit: '1mb' }));

// Basic per-process request cap for expensive public scan endpoints.
const apiWindows = new Map();
app.use('/api', (req, res, next) => {
  const now = Date.now();
  const key = req.ip || req.socket.remoteAddress || 'unknown';
  let window = apiWindows.get(key);
  if (!window || now - window.startedAt >= 60_000) window = { startedAt: now, count: 0 };
  window.count += 1;
  apiWindows.set(key, window);
  if (apiWindows.size > 5000) {
    for (const [ip, entry] of apiWindows) if (now - entry.startedAt >= 60_000) apiWindows.delete(ip);
  }
  res.setHeader('X-RateLimit-Limit', '120');
  res.setHeader('X-RateLimit-Remaining', String(Math.max(0, 120 - window.count)));
  if (window.count > 120) return res.status(429).json({ success: false, error: 'Request limit reached. Try again after one minute.' });
  next();
});

// Serve static frontend files from public directory
app.use(express.static(path.resolve('public')));

// 1. System Status
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    appName: 'SEOPulse Pro Suite',
    version: '2.5.0',
    hasGeminiKey: !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here',
    model: process.env.GEMINI_MODEL || 'gemini-3.8-flash'
  });
});

// 2. Live On-Page SEO Audit
app.post('/api/audit', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    console.log(`[SEO Audit] Scanning URL: ${url}...`);
    const result = await auditUrl(url);
    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    // Auto-log into history
    logAuditEntry({
      url: result.url,
      score: result.metrics.score,
      loadTimeMs: result.metrics.loadTimeMs,
      wordCount: result.metrics.wordCount,
      headingsCount: (result.headings.h1?.length || 0) + (result.headings.h2?.length || 0),
      issuesCount: (result.audit?.critical?.length || 0) + (result.audit?.warnings?.length || 0)
    });

    res.json(result);
  } catch (err) {
    console.error('Audit Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 3. Multi-Page Sitemap Crawler (Batch 10-50 pages)
app.post('/api/crawl-sitemap', async (req, res) => {
  try {
    const domain = req.body.domain || req.body.sitemapUrl || req.body.url;
    const maxPages = req.body.maxPages || 25;
    if (!domain) {
      return res.status(400).json({ error: 'Domain or sitemap URL is required' });
    }

    console.log(`[Sitemap Crawler] Starting multi-page crawl on: ${domain} (max ${maxPages} pages)...`);
    const result = await crawlSitemap(domain, maxPages);
    res.json(result);
  } catch (err) {
    console.error('Sitemap Crawl Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 4. Google Core Web Vitals & Lighthouse Integration
app.post('/api/lighthouse', async (req, res) => {
  try {
    const { url, strategy = 'mobile' } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    console.log(`[Lighthouse API] Fetching Core Web Vitals for: ${url} (${strategy})...`);
    const result = await getLighthouseAudit(url, strategy);
    res.json(result);
  } catch (err) {
    console.error('Lighthouse Error:', err);
    res.status(err.statusCode || 500).json({ success: false, error: err.message });
  }
});

// 5. Historical Audit Timeline & Trend Tracker
app.get('/api/history', (req, res) => {
  try {
    const { domain } = req.query;
    const history = getHistory(domain);
    res.json({ success: true, count: history.length, history });
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, error: err.message });
  }
});

app.post('/api/history/log', (req, res) => {
  try {
    const entry = logAuditEntry(req.body);
    res.json({ success: true, entry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Keyword Research & LSI Generator
app.post('/api/keywords', async (req, res) => {
  try {
    const { keyword } = req.body;
    if (!keyword) {
      return res.status(400).json({ error: 'Keyword is required' });
    }

    console.log(`[Keyword Engine] Exploring keyword: "${keyword}"...`);
    const result = await analyzeKeywords(keyword, process.env.GEMINI_API_KEY);
    res.json(result);
  } catch (err) {
    console.error('Keyword Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 7. Schema JSON-LD & Meta Tag Generator
app.post('/api/schema', (req, res) => {
  try {
    const { type = 'Article', data = {} } = req.body;
    const jsonLd = generateSchema(type, data);
    const metaBundle = generateMetaBundle({
      title: data.headline || data.name || data.title,
      description: data.description,
      url: data.url,
      imageUrl: data.image,
      brand: data.brand || data.publisherName
    });

    res.json({
      success: true,
      type,
      jsonLd,
      jsonLdScript: `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n</script>`,
      metaBundle
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Gemini AI SEO Assistant
app.post('/api/ai/optimize', async (req, res) => {
  try {
    const { type, query, content, currentTitle, currentDesc, lang } = req.body;
    if (!type || !query) {
      return res.status(400).json({ error: 'Optimization type and query/keyword are required' });
    }

    console.log(`[AI SEO Optimizer] Running "${type}" for query: "${query}" in language "${lang || 'en'}"...`);
    const result = await optimizeWithAi({
      type,
      query,
      content,
      currentTitle,
      currentDesc,
      lang: lang || 'en',
      apiKey: process.env.GEMINI_API_KEY
    });

    res.json({ success: true, result });
  } catch (err) {
    console.error('AI Optimizer Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 9. Competitor Comparison (Supports 1 Target vs Up to 5 Competitors)
app.post('/api/compare', async (req, res) => {
  try {
    const { url1, url2, targetUrl, competitors } = req.body;
    const primaryUrl = (targetUrl || url1 || '').trim();

    // Collect list of competitors from array or individual fields
    let competitorList = [];
    if (Array.isArray(competitors) && competitors.length > 0) {
      competitorList = competitors;
    } else {
      competitorList = [url2, req.body.url3, req.body.url4, req.body.url5, req.body.url6].filter(Boolean);
    }

    if (!primaryUrl || competitorList.length === 0) {
      return res.status(400).json({ error: 'Your website URL and at least 1 competitor URL are required' });
    }

    console.log(`[Competitor Showdown] Comparing "${primaryUrl}" against ${competitorList.length} competitors...`);
    const comparison = await compareMultiCompetitors(primaryUrl, competitorList);
    res.json(comparison);
  } catch (err) {
    console.error('Comparison Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 10. Robots.txt & XML Sitemap Generator
app.post('/api/robots-sitemap', (req, res) => {
  try {
    const { domain = 'https://example.com', sitemapUrl, disallowPaths = ['/admin', '/api/private'] } = req.body;

    const robotsTxt = `# robots.txt generated by SEOPulse Pro Suite
User-agent: *
${disallowPaths.map(p => `Disallow: ${p}`).join('\n')}
Allow: /

# Sitemap
Sitemap: ${sitemapUrl || `${domain}/sitemap.xml`}
`;

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${domain}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${domain}/about</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

    res.json({
      success: true,
      robotsTxt,
      sitemapXml
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 11. HTTP Headers & Security Audit
app.post('/api/headers', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    const result = await checkHeaders(url);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 12. Readability & Content Quality Analyzer
app.post('/api/readability', (req, res) => {
  try {
    const { text, keyword } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text content is required' });
    }
    const result = analyzeContent(text, keyword);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 13. Save Settings / Keys safely into .env
app.post('/api/settings', (req, res) => {
  const { GEMINI_API_KEY, GEMINI_MODEL } = req.body;
  const envPath = path.resolve('.env');
  let currentEnv = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf-8') : '';

  if (GEMINI_API_KEY) {
    const regex = /^GEMINI_API_KEY=.*$/m;
    if (regex.test(currentEnv)) {
      currentEnv = currentEnv.replace(regex, `GEMINI_API_KEY=${GEMINI_API_KEY}`);
    } else {
      currentEnv += `\nGEMINI_API_KEY=${GEMINI_API_KEY}`;
    }
    process.env.GEMINI_API_KEY = GEMINI_API_KEY;
  }

  if (GEMINI_MODEL) {
    const regex = /^GEMINI_MODEL=.*$/m;
    if (regex.test(currentEnv)) {
      currentEnv = currentEnv.replace(regex, `GEMINI_MODEL=${GEMINI_MODEL}`);
    } else {
      currentEnv += `\nGEMINI_MODEL=${GEMINI_MODEL}`;
    }
    process.env.GEMINI_MODEL = GEMINI_MODEL;
  }

  fs.writeFileSync(envPath, currentEnv.trim() + '\n', 'utf-8');
  res.json({ success: true, message: 'Settings saved successfully' });
});

// 13. Deep Link-to-Link Site Spider (Screaming Frog Mode)
app.post('/api/spider/crawl', async (req, res) => {
  try {
    const { url, maxPages = 40, maxDepth = 3 } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'Start URL is required for deep crawling' });
    }
    console.log(`[Deep Spider] Initiating BFS crawl on: ${url} (max ${maxPages} pages, depth ${maxDepth})...`);
    const result = await crawlSiteDeep(url, { maxPages, maxDepth });
    res.json(result);
  } catch (err) {
    console.error('Deep Spider Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 14. Multi-Client & Saved Projects Management
app.get('/api/projects', (req, res) => {
  try {
    const list = getProjects();
    res.json({ success: true, count: list.length, projects: list });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/projects', (req, res) => {
  try {
    const { name, url, notes, tags } = req.body;
    if (!url) return res.status(400).json({ error: 'Project website URL is required' });
    const project = saveProject({ name, url, notes, tags });
    res.json({ success: true, project });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/projects/:id', (req, res) => {
  try {
    const result = deleteProject(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 15. Ahrefs Domain Rating checker (free public endpoint)
app.get('/api/backlinks/status', (req, res) => {
  res.json({ success: true, ...getDomainRatingProviderStatus() });
});

app.post('/api/backlinks', async (req, res) => {
  try {
    const targets = Array.isArray(req.body.targets) ? req.body.targets : [req.body.url];
    if (!targets.some(Boolean)) return res.status(400).json({ success: false, error: 'Enter a domain or URL.' });
    const result = await getAhrefsDomainRatings(targets);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, error: err.message });
  }
});

// 16. Google Search Console & Keyword Rank Engine
app.get('/api/gsc/status', (req, res) => {
  res.json({ success: true, ...getGscStatus() });
});

app.post('/api/gsc/data', (req, res) => {
  try {
    const { url, days = 28 } = req.body;
    const analytics = getGscAnalytics(url, Math.min(480, Math.max(1, parseInt(days, 10) || 28)));
    res.json({ success: true, ...analytics });
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, error: err.message });
  }
});

app.post('/api/gsc/connect', (req, res) => {
  try {
    const result = saveGscConfig(req.body);
    res.json(result);
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, error: err.message });
  }
});

app.post('/api/gsc/disconnect', (req, res) => {
  try {
    const result = disconnectGsc();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 17. Automated Background SEO Health Monitor & Alerts
app.get('/api/alerts', (req, res) => {
  res.json({ success: true, alerts: getAlerts() });
});

// Support both query param (?id=) and path param (/:id) for dismissing single alert, or no param for clearing all
app.delete('/api/alerts', (req, res) => {
  const { id } = req.query;
  if (id) {
    res.json(dismissAlert(id));
  } else {
    res.json(clearAllAlerts());
  }
});

app.delete('/api/alerts/:id', (req, res) => {
  res.json(dismissAlert(req.params.id));
});

app.post('/api/alerts/clear', (req, res) => {
  res.json(clearAllAlerts());
});

app.get('/api/monitor/config', (req, res) => {
  res.json({ success: true, config: getMonitorConfig() });
});

app.post('/api/monitor/trigger', async (req, res) => {
  try {
    const { url } = req.body || {};
    if (url && typeof url === 'string' && url.trim().length > 3) {
      const result = await auditUrl(url.trim());
      if (result && result.success) {
        const latency = result.metrics?.loadTimeMs || 0;
        if (latency > 1500) {
          saveAlert({
            severity: 'warning',
            domain: result.hostname || url,
            title: `High Server Response Time (${latency}ms)`,
            message: `TTFB response on ${url} is ${latency}ms, which may slow down mobile rankings.`
          });
        }
        if (result.checklist?.critical?.length > 0) {
          const crit = result.checklist.critical[0];
          saveAlert({
            severity: 'critical',
            domain: result.hostname || url,
            title: `Critical Issue: ${crit.title}`,
            message: crit.desc || 'Critical SEO issue discovered in health check.'
          });
        }
      }
    } else {
      await executeScheduledCheck();
    }
    const currentAlerts = getAlerts();
    const msg = currentAlerts.length === 0
      ? 'All systems operational! 0 critical errors or server latency spikes detected.'
      : `Scan completed. ${currentAlerts.length} active issue(s) detected.`;
    res.json({ success: true, message: msg, alerts: currentAlerts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/monitor/config', (req, res) => {
  try {
    const updated = updateMonitorConfig(req.body);
    initBackgroundMonitor(); // restart with new settings
    res.json({ success: true, config: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Initialize background health monitor
if (!process.env.VERCEL) {
  initBackgroundMonitor();
}

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════════════════════╗
║             ⚡ SEOPulse Pro Suite - Unified Web SEO Studio (v2.5)          ║
║                 All Premium Features 100% Free & Unlimited                 ║
║                                                                            ║
║         👉 OPEN IN YOUR BROWSER: http://localhost:${PORT}                   ║
╚════════════════════════════════════════════════════════════════════════════╝
    `);
  });
}

export default app;
