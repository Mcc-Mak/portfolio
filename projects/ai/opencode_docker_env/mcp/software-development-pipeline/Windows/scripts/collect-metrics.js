// ================================================================
// C4-2: Organizational Measurement Data Collection
// ================================================================

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'metrics', 'metrics.db');
fs.mkdirSync(path.dirname(dbPath), { recursive: true });
const db = new sqlite3.Database(dbPath);
db.on('error', (e) => { console.error('[FAIL] Database error:', e.message); process.exit(1); });

// Create database schema
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS builds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT,
    loc INTEGER,
    critical_vulns INTEGER,
    high_vulns INTEGER,
    defect_density REAL
  )`);
});

try {
  // Read npm audit results (R9)
  const auditPath = path.join(__dirname, '..', 'metrics', 'security-scan.json');
  let critical = 0, high = 0;

  if (fs.existsSync(auditPath)) {
    const raw = fs.readFileSync(auditPath, 'utf8').replace(/^\uFEFF/, '');
    const audit = JSON.parse(raw);
    if (audit.metadata && audit.metadata.vulnerabilities) {
      critical = audit.metadata.vulnerabilities.critical || 0;
      high = audit.metadata.vulnerabilities.high || 0;
    }
  }

  // Fold DAST findings (R19) into the defect density numerator.
  // riskcode: 3 = High, 4 = Critical in the ZAP baseline JSON report.
  const dastPath = path.join(__dirname, '..', 'metrics', 'dast-zap.json');
  if (fs.existsSync(dastPath)) {
    try {
      const raw = fs.readFileSync(dastPath, 'utf8').replace(/^\uFEFF/, '');
      const dast = JSON.parse(raw);
      if (Array.isArray(dast.site)) {
        for (const site of dast.site) {
          for (const alert of (site.alerts || [])) {
            const risk = String(alert.riskcode || '');
            if (risk === '4') critical += 1;
            else if (risk === '3') high += 1;
          }
        }
      }
    } catch (e) {
      // Unparseable or absent DAST output is non-blocking here (R19 gate governs)
    }
  }

  // Calculate LOC changed
  let loc = 100;
  try {
    const diffOutput = execSync('git diff --shortstat HEAD', {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore']
    });
    const match = diffOutput.match(/(\d+)/);
    loc = match ? parseInt(match[0]) : 100;
  } catch (e) {
    // Use default if git not available
  }

  // Calculate defect density (C4-1 metric)
  const density = (critical + high) / (loc / 1000);

  // Insert build record
  const stmt = db.prepare(
    `INSERT INTO builds (timestamp, loc, critical_vulns, high_vulns, defect_density)
     VALUES (?, ?, ?, ?, ?)`
  );

  stmt.run(new Date().toISOString(), loc, critical, high, density);
  stmt.finalize();

  console.log(`[OK] Metrics collected: LOC=${loc}, Critical=${critical}, High=${high}, Density=${density.toFixed(3)}`);

} catch (err) {
  console.error('[FAIL] Metrics collection failed:', err.message);
  process.exit(1);
} finally {
  db.close();
}
