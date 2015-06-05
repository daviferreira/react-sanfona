'use strict';

var babel = require('babel-core');
var fs = require('fs');

// borrowed from https://github.com/babel/babel-jest/blob/master/index.js
require.extensions['.jsx'] = function (module, filename) {
  var src = fs.readFileSync(filename, 'utf8');
  // Allow the stage to be configured by an environment
  // variable, but use Babel's default stage (2) if
  // no environment variable is specified.
  var stage = process.env.BABEL_JEST_STAGE || 2;

  // Ignore all files within node_modules
  if (filename.indexOf('node_modules') === -1 && babel.canCompile(filename)) {
    var compiled = babel.transform(src, { filename: filename, stage: stage }).code;
    return module._compile(compiled, filename);
  }
  return module;
};

require.extensions['.scss'] = function () {
  return null;
};

require.extensions['.css'] = function () {
  return null;
};
