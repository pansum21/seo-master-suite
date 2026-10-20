import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = process.env.VERCEL ? path.join('/tmp', 'data') : path.join(__dirname, '..', '..', 'data');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');

/**
 * Ensure data directory and projects.json exist
 */
function ensureStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(PROJECTS_FILE)) {
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify([], null, 2), 'utf8');
  }
}

/**
 * Get all saved client projects
 */
export function getProjects() {
  ensureStorage();
  try {
    const raw = fs.readFileSync(PROJECTS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Add or update a project
 */
export function saveProject(project) {
  ensureStorage();
  const projects = getProjects();
  const id = project.id || `proj_${Date.now()}`;
  
  const existingIdx = projects.findIndex(p => p.id === id || p.url.toLowerCase() === project.url.toLowerCase());
  const entry = {
    id: existingIdx >= 0 ? projects[existingIdx].id : id,
    name: project.name || 'Unnamed Project',
    url: project.url,
    createdAt: existingIdx >= 0 ? projects[existingIdx].createdAt : new Date().toISOString(),
    lastAudited: new Date().toISOString(),
    latestScore: project.latestScore || (existingIdx >= 0 ? projects[existingIdx].latestScore : null),
    tags: project.tags || (existingIdx >= 0 ? projects[existingIdx].tags : ['Active']),
    notes: project.notes || ''
  };

  if (existingIdx >= 0) {
    projects[existingIdx] = { ...projects[existingIdx], ...entry };
  } else {
    projects.unshift(entry);
  }

  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2), 'utf8');
  return entry;
}

/**
 * Delete a project by ID
 */
export function deleteProject(id) {
  ensureStorage();
  const projects = getProjects();
  const filtered = projects.filter(p => p.id !== id);
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(filtered, null, 2), 'utf8');
  return { success: true, remaining: filtered.length };
}
