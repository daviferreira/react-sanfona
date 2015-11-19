'use strict';

var babel = require('babel-core');
var fs = require('fs');

// borrowed from https://github.com/babel/babel-jest/blob/master/index.js
require.extensions['.jsx'] = function (module, filename) {
  var src = fs.readFileSync(filename, 'utf8');
  // Ignore all files within node_modules
  if (filename.indexOf('node_modules') === -1 && babel.util.canCompile(filename)) {
    var compiled = babel.transform(src, { filename: filename }).code;
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
