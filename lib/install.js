// lib/install.js
// Main install logic. Reads templates/ from this package, copies to host's project path.
//
// CLI scope (D-58): only skills. Never touches project root.
// Memory, AGENTS.md, design-system.md = meta-spec skill's runtime concern.

const path = require('path');
const fs = require('fs/promises');
const { prompt, HOSTS } = require('./prompts');
const HOST_PATHS = require('./platform-paths');

const SKILLS = ['meta-spec', 'todo-m', 'plan-m', 'spec-m', 'code-m', 'debug-m', 'commit-m'];

function parseArgs(argv) {
  const out = {};
  for (const arg of argv) {
    if (arg.startsWith('--host=')) out.host = arg.slice('--host='.length);
    if (arg === '--help' || arg === '-h') out.help = true;
  }
  return out;
}

function printHelp() {
  console.log(`meta-spec-agentskills — install meta-spec skills

Usage:
  npx -- meta-spec-agentskills                        interactive (prompts for host)
  npx -- meta-spec-agentskills --host=<h>             one-line (no prompts)

The \`--\` after \`npx\` is required — npm 7+'s \`npx\` eats the args otherwise.

Hosts (AI Coding Agent Applications):
${HOSTS.map(h => `  - ${h}`).join('\n')}

Examples:
  npx -- meta-spec-agentskills
  npx -- meta-spec-agentskills --host=codebuddy
`);
}

async function copyDir(src, dst) {
  await fs.mkdir(dst, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) await copyDir(s, d);
    else await fs.copyFile(s, d);
  }
}

async function installFiles({ host }) {
  const paths = HOST_PATHS[host];
  if (!paths) {
    throw new Error(`Unknown host "${host}". Supported: ${HOSTS.join(', ')}`);
  }

  // Templates live next to this file at ../skills (i.e. inside the npm package).
  const templatesRoot = path.join(__dirname, '..');
  let count = 0;
  const installed = [];

  for (const skill of SKILLS) {
    await copyDir(
      path.join(templatesRoot, 'skills', skill),
      path.join(paths.skills, skill)
    );
    installed.push(`${paths.skills}/${skill}/`);
    count++;
  }

  return { count, installed, paths };
}

async function main() {
  const argv = process.argv.slice(2);
  const args = parseArgs(argv);

  if (args.help) {
    printHelp();
    return;
  }

  let { host } = args;
  if (!host) {
    const prompted = await prompt();
    host = prompted.host;
  }

  const { count, installed, paths } = await installFiles({ host });

  console.log('');
  console.log(`✔ Installed ${count} files to ${paths.skills}:`);
  for (const f of installed) console.log(`  - ${f}`);
  console.log('');
  console.log('Next: invoke the meta-spec skill in your AI Coding Agent Application.');
  console.log('It will run Pre-flight → PROJECT_INIT (where AGENTS.md is written) → TODO → ...');
}

module.exports = { main, installFiles, parseArgs };
