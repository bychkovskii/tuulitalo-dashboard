/**
 * regen_weekly_js.js
 * weekly_plan_w40.json  ->  weekly_data.js
 *
 * Workflow: edit JSON -> run this -> Ctrl+F5 in browser
 * Usage:    node regen_weekly_js.js
 */
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const jsonFile = path.join(dir, 'weekly_plan_w40.json');
const outFile = path.join(dir, 'weekly_data.js');

const plan = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));

const header =
  '// weekly_data.js -- GENERATED FILE, do not edit by hand.\n' +
  '// Source of truth: weekly_plan_w40.json\n' +
  '// Generated: ' + new Date().toISOString() + '\n' +
  '// Regenerate:  node regen_weekly_js.js\n\n' +
  'window.WEEKLY_DATA = ';

fs.writeFileSync(outFile, header + JSON.stringify(plan, null, 2) + ';\n', 'utf8');

const posts = plan.days.reduce((s, d) => s + d.posts.length, 0);
console.log('OK  weekly_data.js written');
console.log('    week ' + plan.meta.week_number + ' (' + plan.meta.start_date + ' .. ' + plan.meta.end_date + ')');
console.log('    days: ' + plan.days.length + '  posts: ' + posts + '  publications: ' + (posts * plan.meta.platforms.length));
