#!/usr/bin/env node
const { main } = require('../lib/install');
main().catch(err => { console.error(err.message || err); process.exit(1); });
