// ================================================================
// C4-3: Statistical Process Control (SPC)
// ================================================================

const sqlite3 = require('sqlite3').verbose();
const math = require('mathjs');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '..', 'metrics', 'metrics.db');
fs.mkdirSync(path.dirname(dbPath), { recursive: true });
const db = new sqlite3.Database(dbPath);
const reportPath = path.join(__dirname, '..', 'metrics', 'spc-report.md');

db.all(`SELECT defect_density, timestamp FROM builds ORDER BY id DESC LIMIT 20`, (err, rows) => {
  if (err) {
    console.error('[FAIL] Database error:', err.message);
    process.exit(1);
  }

  // Baseline collection (need at least 5 builds)
  if (rows.length < 5) {
    console.log(`[DATA] Collecting baseline... (${rows.length}/5 builds)`);
    fs.writeFileSync(reportPath,
      `# SPC Report - Baseline\n\n**Current builds**: ${rows.length}\n**Status**: Collecting baseline data (need 5 builds for control limits)`);
    process.exit(0);
  }

  const values = rows.map(r => r.defect_density);
  const mean = math.mean(values);
  const std = math.std(values);
  const UCL = mean + 3 * std;
  const current = values[0];

  // Generate Mermaid control chart (xychart: x-axis values array, '-->' range,
  // no per-line labels — mmdc rejects 'line [...] "label"' syntax).
  values.reverse(); // oldest -> newest for chart display
  const yMax = Math.max(0.5, Math.ceil(Math.max(...values, UCL) * 2));
  const labels = values.map((_, i) => '"b' + (i + 1) + '"').join(', ');
  const chartData = '```mermaid\nxychart\n    title "Defect Density SPC Chart"\n    x-axis [' + labels + ']\n    y-axis "Defect Density" 0 --> ' +
    yMax + '\n    line [' + values.join(', ') + ']\n    line [' +
    new Array(values.length).fill(UCL).join(', ') + ']\n    line [' +
    new Array(values.length).fill(mean).join(', ') + ']\n```\n';

  const report = `# SPC Report - CMMI Level 4

## Summary Statistics
| Metric | Value |
| :--- | :--- |
| Sample Size | ${values.length} |
| Mean | ${mean.toFixed(4)} |
| Standard Deviation | ${std.toFixed(4)} |
| UCL (Mean + 3σ) | ${UCL.toFixed(4)} |
| Current Defect Density | ${current.toFixed(4)} |

## Control Chart
${chartData}

## Status
**${current > UCL ? ':red_circle: OUT OF CONTROL - BLOCK MERGE' : ':white_check_mark: In Statistical Control'}**

${current > UCL ? `
### Action Required (R10)
- Current defect density (${current.toFixed(4)}) exceeds UCL (${UCL.toFixed(4)})
- **Merge is BLOCKED until process improves**
` : 'No action required. Process is stable and predictable.'}
`;

  fs.writeFileSync(reportPath, report);

  console.log(`[CHART] Mean: ${mean.toFixed(4)}, UCL: ${UCL.toFixed(4)}, Current: ${current.toFixed(4)}`);

  if (current > UCL) {
    console.error(`[FAIL] OUT OF CONTROL! Current (${current.toFixed(4)}) > UCL (${UCL.toFixed(4)})`);
    console.error('[FAIL] Merge BLOCKED per R10');
    process.exit(1);
  }

  console.log('[OK] Process in statistical control');
  process.exit(0);
});
