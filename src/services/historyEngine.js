import fs from 'fs';
import path from 'path';

const DATA_DIR = process.env.VERCEL ? path.join('/tmp', 'data') : path.resolve('data');
const HISTORY_FILE = path.join(DATA_DIR, 'audit_history.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

/**
 * Loads history records
 * @returns {Array}
 */
export function getHistory(domainFilter = '') {
  try {
    if (!fs.existsSync(HISTORY_FILE)) {
      return getSeedHistory();
    }
    const raw = fs.readFileSync(HISTORY_FILE, 'utf-8');
    const records = JSON.parse(raw);
    if (!domainFilter) return records;
    return records.filter(r => r.url.toLowerCase().includes(domainFilter.toLowerCase()));
  } catch (err) {
    console.error('[History Engine] Error reading history:', err.message);
    return getSeedHistory();
  }
}

/**
 * Logs a new audit into history
 * @param {Object} entry
 */
export function logAuditEntry(entry) {
  try {
    let records = [];
    if (fs.existsSync(HISTORY_FILE)) {
      records = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
    } else {
      records = getSeedHistory();
    }

    const newRecord = {
      id: 'aud_' + Date.now(),
      timestamp: new Date().toISOString(),
      dateLabel: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      url: entry.url,
      score: entry.score || 85,
      loadTimeMs: entry.loadTimeMs || 300,
      wordCount: entry.wordCount || 1000,
      headingsCount: entry.headingsCount || 8,
      issuesCount: entry.issuesCount || 2
    };

    records.unshift(newRecord);
    // Keep max 200 records
    if (records.length > 200) records = records.slice(0, 200);

    fs.writeFileSync(HISTORY_FILE, JSON.stringify(records, null, 2), 'utf-8');
    return newRecord;
  } catch (err) {
    console.error('[History Engine] Error writing entry:', err.message);
    return null;
  }
}

/**
 * Seed historical data spanning past months for instant trend visualization
 */
function getSeedHistory() {
  const now = new Date();
  const seed = [];
  const domain = 'https://example.com';
  const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  const scores = [65, 72, 78, 85, 92, 100];
  const speeds = [580, 490, 420, 360, 310, 260];

  for (let i = 0; i < 6; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 15);
    seed.push({
      id: `seed_${i}`,
      timestamp: d.toISOString(),
      dateLabel: `${months[i]} ${d.getFullYear()}`,
      url: domain,
      score: scores[i],
      loadTimeMs: speeds[i],
      wordCount: 800 + (i * 180),
      headingsCount: 15 + (i * 4),
      issuesCount: Math.max(0, 6 - i)
    });
  }

  try {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(seed, null, 2), 'utf-8');
  } catch {}

  return seed;
}
