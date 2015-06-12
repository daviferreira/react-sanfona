'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _unexpected = require('unexpected');

var _unexpected2 = _interopRequireDefault(_unexpected);

var _mochaJsdom = require('mocha-jsdom');

var _mochaJsdom2 = _interopRequireDefault(_mochaJsdom);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var TestUtils = _reactAddons2['default'].addons.TestUtils;

_unexpected2['default'].installPlugin(require('unexpected-sinon'));

describe('AccordionItem Test Case', function () {

  (0, _mochaJsdom2['default'])();

  it('should render', function () {
    var instance = TestUtils.renderIntoDocument(_reactAddons2['default'].createElement(_index2['default'], null));
    (0, _unexpected2['default'])(instance, 'to be defined');
  });

  it('should have an unique id', function () {
    var instance = TestUtils.renderIntoDocument(_reactAddons2['default'].createElement(_index2['default'], null));
    var anotherInstance = TestUtils.renderIntoDocument(_reactAddons2['default'].createElement(_index2['default'], null));
    (0, _unexpected2['default'])(instance.uuid, 'not to equal', anotherInstance.uuid);
  });

  it('should call the onClick prop when clicking on item title', function () {
    var spy = _sinon2['default'].spy();
    var instance = TestUtils.renderIntoDocument(_reactAddons2['default'].createElement(_index2['default'], { onClick: spy }));
    var node = TestUtils.findRenderedDOMComponentWithTag(instance, 'h3');
    TestUtils.Simulate.click(node);
    (0, _unexpected2['default'])(spy, 'was called');
  });

  describe('aria', function () {

    it('should set aria-expanded to true when expanded prop is true', function () {
      var instance = TestUtils.renderIntoDocument(_reactAddons2['default'].createElement(_index2['default'], { expanded: true }));
      var props = instance.getProps();
      (0, _unexpected2['default'])(props['aria-expanded'], 'to be true');
      (0, _unexpected2['default'])(props['aria-hidden'], 'to be undefined');
    });

    it('should set aria-hidden to true when expanded prop is not true', function () {
      var instance = TestUtils.renderIntoDocument(_reactAddons2['default'].createElement(_index2['default'], null));
      var props = instance.getProps();
      (0, _unexpected2['default'])(props['aria-expanded'], 'to be undefined');
      (0, _unexpected2['default'])(props['aria-hidden'], 'to be true');
    });
  });
});