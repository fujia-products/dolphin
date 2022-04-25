const path = require('path');

const MAIN_PROCESS_ENTRY = 'main.js';

const resolve = (filePath, dir = __dirname) => path.resolve(dir, `../../${filePath}`);

module.exports = {
  resolve,
  MAIN_PROCESS_ENTRY,
};
