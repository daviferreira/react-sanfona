'use strict';

import expect from 'unexpected';
import jsdom from 'mocha-jsdom';
import sinon from 'sinon';
import React from 'react/addons'

import AccordionItem from './AccordionItem';

var TestUtils = React.addons.TestUtils;

expect.installPlugin(require('unexpected-sinon'));

describe('AccordionItem Test Case', () => {

  jsdom();

  it('should render', () => {
    var instance = TestUtils.renderIntoDocument(<AccordionItem />);
    expect(instance, 'to be defined');
  });

  it('should have an unique id', () => {
    var instance = TestUtils.renderIntoDocument(<AccordionItem />);
    var anotherInstance = TestUtils.renderIntoDocument(<AccordionItem />);
    expect(instance.id, 'not to equal', anotherInstance.id);
  });

  it('should call the onClick prop when clicking on item title', () => {
    var spy = sinon.spy();
    var instance = TestUtils.renderIntoDocument(<AccordionItem onClick={spy} />);
    var node = TestUtils.findRenderedDOMComponentWithTag(instance, 'h3');
    TestUtils.Simulate.click(node);
    expect(spy, 'was called');
  });

  describe('aria', () => {

    it('should set aria-expanded to true when expanded prop is true', () => {
      var instance = TestUtils.renderIntoDocument(<AccordionItem expanded={true} />);
      var props = instance.getItemProps();
      expect(props['aria-expanded'], 'to be true');
      expect(props['aria-hidden'], 'to be undefined');
    });

    it('should set aria-hidden to true when expanded prop is not true', () => {
      var instance = TestUtils.renderIntoDocument(<AccordionItem />);
      var props = instance.getItemProps();
      expect(props['aria-expanded'], 'to be undefined');
      expect(props['aria-hidden'], 'to be true');
    });

  });

});
