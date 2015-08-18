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

var _AccordionItem = require('../AccordionItem');

var _AccordionItem2 = _interopRequireDefault(_AccordionItem);

var _AccordionItemTitle = require('../AccordionItemTitle');

var _AccordionItemTitle2 = _interopRequireDefault(_AccordionItemTitle);

var TestUtils = _reactAddons2['default'].addons.TestUtils;

describe('Accordion Test Case', function () {

  (0, _mochaJsdom2['default'])();

  it('should render', function () {
    var instance = TestUtils.renderIntoDocument(_reactAddons2['default'].createElement(_index2['default'], null));
    (0, _unexpected2['default'])(instance, 'to be defined');
  });

  describe('selectedIndex', function () {

    it('should select the first item as default', function () {
      var instance = TestUtils.renderIntoDocument(_reactAddons2['default'].createElement(
        _index2['default'],
        null,
        _reactAddons2['default'].createElement(_AccordionItem2['default'], { title: 'First' }),
        _reactAddons2['default'].createElement(_AccordionItem2['default'], { title: 'Second' })
      ));

      var items = TestUtils.scryRenderedComponentsWithType(instance, _AccordionItem2['default']);

      (0, _unexpected2['default'])(items[0].props.expanded, 'to be true');
      (0, _unexpected2['default'])(items[1].props.expanded, 'to be false');
    });

    it('should accept a selectedIndex prop', function () {
      var instance = TestUtils.renderIntoDocument(_reactAddons2['default'].createElement(
        _index2['default'],
        { selectedIndex: 1 },
        _reactAddons2['default'].createElement(_AccordionItem2['default'], { title: 'First' }),
        _reactAddons2['default'].createElement(_AccordionItem2['default'], { title: 'Second' })
      ));

      var items = TestUtils.scryRenderedComponentsWithType(instance, _AccordionItem2['default']);

      (0, _unexpected2['default'])(items[0].props.expanded, 'to be false');
      (0, _unexpected2['default'])(items[1].props.expanded, 'to be true');
    });
  });

  describe('allowMultiple', function () {

    it('should allow multiple expanded items', function () {
      var instance = TestUtils.renderIntoDocument(_reactAddons2['default'].createElement(
        _index2['default'],
        { selectedIndex: 1, allowMultiple: true },
        _reactAddons2['default'].createElement(_AccordionItem2['default'], { title: 'First' }),
        _reactAddons2['default'].createElement(_AccordionItem2['default'], { title: 'Second' })
      ));

      var items = TestUtils.scryRenderedComponentsWithType(instance, _AccordionItem2['default']);

      var title = TestUtils.findRenderedComponentWithType(items[0], _AccordionItemTitle2['default']);

      (0, _unexpected2['default'])(items[0].props.expanded, 'to be false');
      (0, _unexpected2['default'])(items[1].props.expanded, 'to be true');

      TestUtils.Simulate.click(_reactAddons2['default'].findDOMNode(title));

      (0, _unexpected2['default'])(items[0].props.expanded, 'to be true');
      (0, _unexpected2['default'])(items[1].props.expanded, 'to be true');
    });

    it('should save activeItems on state when allowMultiple is true', function () {
      var instance = TestUtils.renderIntoDocument(_reactAddons2['default'].createElement(
        _index2['default'],
        { selectedIndex: 1, allowMultiple: true },
        _reactAddons2['default'].createElement(_AccordionItem2['default'], { title: 'First' }),
        _reactAddons2['default'].createElement(_AccordionItem2['default'], { title: 'Second' })
      ));

      (0, _unexpected2['default'])(instance.state.activeItems, 'to equal', [1]);
    });

    it('should update activeItems state when clicking on an item', function () {
      var instance = TestUtils.renderIntoDocument(_reactAddons2['default'].createElement(
        _index2['default'],
        { selectedIndex: 1, allowMultiple: true },
        _reactAddons2['default'].createElement(_AccordionItem2['default'], { title: 'First' }),
        _reactAddons2['default'].createElement(_AccordionItem2['default'], { title: 'Second' })
      ));

      var items = TestUtils.scryRenderedComponentsWithType(instance, _AccordionItem2['default']);

      var title = TestUtils.findRenderedComponentWithType(items[0], _AccordionItemTitle2['default']);

      (0, _unexpected2['default'])(instance.state.activeItems, 'to equal', [1]);

      TestUtils.Simulate.click(_reactAddons2['default'].findDOMNode(title));

      (0, _unexpected2['default'])(instance.state.activeItems, 'to equal', [1, 0]);
    });
  });
});