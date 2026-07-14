// lib/platform-paths.js
// Project-level paths for each supported AI Coding Agent Application host.
// CLI scope (D-58): only skills. Never touch project root.
const HOST_PATHS = {
  codebuddy: { skills: '.codebuddy/skills' },
  trae:      { skills: '.trae/skills'      },
  'trae-cn': { skills: '.trae-cn/skills'   },
};

module.exports = HOST_PATHS;
