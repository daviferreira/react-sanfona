'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _unexpected = require('unexpected');

var _unexpected2 = _interopRequireDefault(_unexpected);

var _mochaJsdom = require('mocha-jsdom');

var _mochaJsdom2 = _interopRequireDefault(_mochaJsdom);

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var TestUtils = _reactAddons2['default'].addons.TestUtils;

describe('Accordion Test Case', function () {

  (0, _mochaJsdom2['default'])();

  it('should render', function () {
    var instance = TestUtils.renderIntoDocument(_reactAddons2['default'].createElement(_index2['default'], null));
    (0, _unexpected2['default'])(instance, 'to be defined');
  });
});