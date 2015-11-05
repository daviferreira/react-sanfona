'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _unexpected = require('unexpected');

var _unexpected2 = _interopRequireDefault(_unexpected);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _skinDeep = require('skin-deep');

var _skinDeep2 = _interopRequireDefault(_skinDeep);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _AccordionItem = require('../AccordionItem');

var _AccordionItem2 = _interopRequireDefault(_AccordionItem);

describe('Accordion Test Case', function () {
  var vdom = undefined,
      instance = undefined,
      items = undefined;

  it('should render', function () {
    var tree = _skinDeep2['default'].shallowRender(_react2['default'].createElement(_index2['default'], null));

    instance = tree.getMountedInstance();
    vdom = tree.getRenderOutput();

    _unexpected2['default'](instance, 'to be defined');
    _unexpected2['default'](vdom, 'to be defined');
  });

  describe('activeItems', function () {

    it('should select the first item as default', function () {
      var tree = _skinDeep2['default'].shallowRender(_react2['default'].createElement(
        _index2['default'],
        null,
        _react2['default'].createElement(_AccordionItem2['default'], { title: 'First' }),
        _react2['default'].createElement(_AccordionItem2['default'], { title: 'Second' })
      ));

      vdom = tree.getRenderOutput();

      items = vdom.props.children;

      _unexpected2['default'](items[0].props.expanded, 'to be true');
      _unexpected2['default'](items[1].props.expanded, 'to be false');
    });

    it('should accept a activeItems prop', function () {
      var tree = _skinDeep2['default'].shallowRender(_react2['default'].createElement(
        _index2['default'],
        { activeItems: 1 },
        _react2['default'].createElement(_AccordionItem2['default'], { title: 'First' }),
        _react2['default'].createElement(_AccordionItem2['default'], { title: 'Second' })
      ));

      vdom = tree.getRenderOutput();

      items = tree.props.children;

      _unexpected2['default'](items[0].props.expanded, 'to be false');
      _unexpected2['default'](items[1].props.expanded, 'to be true');
    });

    it('should accept multiple selected indexes', function () {
      var tree = _skinDeep2['default'].shallowRender(_react2['default'].createElement(
        _index2['default'],
        { activeItems: [0, 1] },
        _react2['default'].createElement(_AccordionItem2['default'], { title: 'First' }),
        _react2['default'].createElement(_AccordionItem2['default'], { title: 'Second' })
      ));

      vdom = tree.getRenderOutput();

      items = tree.props.children;

      _unexpected2['default'](items[0].props.expanded, 'to be true');
      _unexpected2['default'](items[1].props.expanded, 'to be true');
    });
  });

  describe('allowMultiple', function () {

    it('should allow multiple expanded items', function () {
      var tree = _skinDeep2['default'].shallowRender(_react2['default'].createElement(
        _index2['default'],
        { activeItems: 1, allowMultiple: true },
        _react2['default'].createElement(_AccordionItem2['default'], { title: 'First' }),
        _react2['default'].createElement(_AccordionItem2['default'], { title: 'Second' })
      ));

      instance = tree.getMountedInstance();
      vdom = tree.getRenderOutput();
      items = vdom.props.children;

      _unexpected2['default'](items[0].props.expanded, 'to be false');
      _unexpected2['default'](items[1].props.expanded, 'to be true');

      instance.handleClick(0);

      vdom = tree.getRenderOutput();
      items = vdom.props.children;

      _unexpected2['default'](items[0].props.expanded, 'to be true');
      _unexpected2['default'](items[1].props.expanded, 'to be true');
    });

    it('should save activeItems on state when allowMultiple is true', function () {
      var tree = _skinDeep2['default'].shallowRender(_react2['default'].createElement(
        _index2['default'],
        { activeItems: 1, allowMultiple: true },
        _react2['default'].createElement(_AccordionItem2['default'], { title: 'First' }),
        _react2['default'].createElement(_AccordionItem2['default'], { title: 'Second' })
      ));

      instance = tree.getMountedInstance();

      _unexpected2['default'](instance.state.activeItems, 'to equal', [1]);
    });

    it('should update activeItems state when clicking on an item', function () {
      var tree = _skinDeep2['default'].shallowRender(_react2['default'].createElement(
        _index2['default'],
        { activeItems: 1, allowMultiple: true },
        _react2['default'].createElement(_AccordionItem2['default'], { title: 'First' }),
        _react2['default'].createElement(_AccordionItem2['default'], { title: 'Second' })
      ));

      instance = tree.getMountedInstance();

      _unexpected2['default'](instance.state.activeItems, 'to equal', [1]);

      instance.handleClick(0);

      _unexpected2['default'](instance.state.activeItems, 'to equal', [1, 0]);
    });
  });
});