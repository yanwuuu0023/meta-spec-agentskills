// lib/prompts.js
// Interactive prompt: ask user which AI Coding Agent Application.
// Zero dependencies — uses Node built-in readline/promises.

const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');
const HOST_PATHS = require('./platform-paths');

const HOSTS = Object.keys(HOST_PATHS);

async function chooseFromList(question, options) {
  const rl = readline.createInterface({ input, output });
  console.log(question);
  options.forEach((opt, i) => console.log(`  ${i + 1}. ${opt}`));
  const answer = (await rl.question('> ')).trim();
  rl.close();
  const idx = parseInt(answer, 10) - 1;
  if (idx >= 0 && idx < options.length) return options[idx];
  return options[0];
}

async function prompt() {
  const host = await chooseFromList(
    'Which AI Coding Agent Application does your project target?',
    HOSTS
  );
  return { host };
}

module.exports = { prompt, HOSTS };
