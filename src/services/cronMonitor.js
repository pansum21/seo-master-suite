import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { auditUrl } from './seoAuditor.js';
import { getProjects } from './projectManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = process.env.VERCEL ? path.join('/tmp', 'data') : path.join(__dirname, '..', '..', 'data');
const ALERTS_FILE = path.join(DATA_DIR, 'alerts.json');
const MONITOR_CONFIG_FILE = path.join(DATA_DIR, 'monitor_config.json');

let monitorIntervalId = null;

function ensureStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(ALERTS_FILE)) {
    fs.writeFileSync(ALERTS_FILE, JSON.stringify([], null, 2), 'utf8');
  }
  if (!fs.existsSync(MONITOR_CONFIG_FILE)) {
    const defaultConfig = {
      enabled: true,
      intervalMinutes: 120,
      lastRunAt: new Date().toISOString(),
      alertEmail: 'admin@example.com'
    };
    fs.writeFileSync(MONITOR_CONFIG_FILE, JSON.stringify(defaultConfig, null, 2), 'utf8');
  }
}

export function getAlerts() {
  ensureStorage();
  try {
    const raw = fs.readFileSync(ALERTS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveAlert(alert) {
  ensureStorage();
  const alerts = getAlerts();
  const entry = {
    id: `alt_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
    severity: alert.severity || 'warning', // 'critical' | 'warning' | 'info'
    domain: alert.domain || 'Unknown Domain',
    title: alert.title,
    message: alert.message,
    resolved: false
  };
  alerts.unshift(entry);
  fs.writeFileSync(ALERTS_FILE, JSON.stringify(alerts.slice(0, 50), null, 2), 'utf8');
  return entry;
}

export function dismissAlert(id) {
  ensureStorage();
  const alerts = getAlerts();
  const filtered = alerts.filter(a => a.id !== id);
  fs.writeFileSync(ALERTS_FILE, JSON.stringify(filtered, null, 2), 'utf8');
  return { success: true, remaining: filtered.length };
}

export function clearAllAlerts() {
  ensureStorage();
  fs.writeFileSync(ALERTS_FILE, JSON.stringify([], null, 2), 'utf8');
  return { success: true, remaining: 0 };
}

export function getMonitorConfig() {
  ensureStorage();
  try {
    const raw = fs.readFileSync(MONITOR_CONFIG_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return { enabled: true, intervalMinutes: 120, lastRunAt: null };
  }
}

export function updateMonitorConfig(updates) {
  ensureStorage();
  const current = getMonitorConfig();
  const next = { ...current, ...updates };
  fs.writeFileSync(MONITOR_CONFIG_FILE, JSON.stringify(next, null, 2), 'utf8');
  return next;
}

/**
 * Executes an automated audit check across saved client projects
 */
export async function executeScheduledCheck() {
  const config = getMonitorConfig();
  if (!config.enabled) return;

  const projects = getProjects();
  if (!projects || projects.length === 0) return;

  console.log(`[SEO Monitor] Running scheduled background audit on ${projects.length} project(s)...`);

  for (const proj of projects) {
    if (!proj.url) continue;
    try {
      const result = await auditUrl(proj.url);
      if (result && result.success) {
        const score = result.metrics?.score || 0;
        const latency = result.metrics?.loadTimeMs || 0;

        // Check if latency is high
        if (latency > 1500) {
          saveAlert({
            severity: 'warning',
            domain: proj.name || proj.url,
            title: `High Server Response Time (${latency}ms)`,
            message: `TTFB response on ${proj.url} spiked above 1500ms, impacting Core Web Vitals.`
          });
        }

        // Check if critical issues detected
        if (result.checklist?.critical?.length > 0) {
          const crit = result.checklist.critical[0];
          saveAlert({
            severity: 'critical',
            domain: proj.name || proj.url,
            title: `Critical Issue: ${crit.title}`,
            message: crit.desc || 'Critical SEO issue discovered in automated background crawl.'
          });
        }
      }
    } catch (err) {
      console.error(`[SEO Monitor] Error scanning ${proj.url}:`, err.message);
    }
  }

  updateMonitorConfig({ lastRunAt: new Date().toISOString() });
}

/**
 * Initializes background monitor loop
 */
export function initBackgroundMonitor() {
  if (process.env.VERCEL) {
    return; // Background intervals should not run in serverless lifecycle
  }
  ensureStorage();
  const config = getMonitorConfig();

  if (monitorIntervalId) clearInterval(monitorIntervalId);

  if (config.enabled) {
    const intervalMs = Math.max(30, config.intervalMinutes || 120) * 60 * 1000;
    monitorIntervalId = setInterval(executeScheduledCheck, intervalMs);
    console.log(`[SEO Monitor] Background health daemon active (every ${config.intervalMinutes} min).`);
  }
}
