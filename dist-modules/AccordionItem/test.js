'use strict';

var _unexpected = require('unexpected');

var _unexpected2 = _interopRequireDefault(_unexpected);

var _skinDeep = require('skin-deep');

var _skinDeep2 = _interopRequireDefault(_skinDeep);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_unexpected2.default.installPlugin(require('unexpected-sinon'));

describe('AccordionItem Test Case', function () {
  var vdom = void 0,
      instance = void 0;

  it('should render', function () {
    var tree = _skinDeep2.default.shallowRender(_react2.default.createElement(_index2.default, null));
    instance = tree.getMountedInstance();
    vdom = tree.getRenderOutput();

    (0, _unexpected2.default)(instance, 'to be defined');
    (0, _unexpected2.default)(vdom, 'to be defined');
  });

  it('should have an unique id', function () {
    var tree = _skinDeep2.default.shallowRender(_react2.default.createElement(_index2.default, null));
    var treeAlt = _skinDeep2.default.shallowRender(_react2.default.createElement(_index2.default, null));

    instance = tree.getMountedInstance();
    var anotherInstance = treeAlt.getMountedInstance();

    (0, _unexpected2.default)(instance.uuid, 'not to equal', anotherInstance.uuid);
  });

  describe('aria', function () {

    it('should set aria-expanded to true when expanded prop is true', function () {
      var tree = _skinDeep2.default.shallowRender(_react2.default.createElement(_index2.default, { expanded: true }));
      vdom = tree.getRenderOutput();
      (0, _unexpected2.default)(vdom.props['aria-expanded'], 'to be true');
      (0, _unexpected2.default)(vdom.props['aria-hidden'], 'to be undefined');
    });

    it('should set aria-hidden to true when expanded prop is not true', function () {
      var tree = _skinDeep2.default.shallowRender(_react2.default.createElement(_index2.default, null));
      vdom = tree.getRenderOutput();
      (0, _unexpected2.default)(vdom.props['aria-expanded'], 'to be undefined');
      (0, _unexpected2.default)(vdom.props['aria-hidden'], 'to be true');
    });
  });
});