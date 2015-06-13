'use strict';

import expect from 'unexpected';
import jsdom from 'mocha-jsdom';
import React from 'react/addons'

import Accordion from './index';
import AccordionItem from '../AccordionItem';

var TestUtils = React.addons.TestUtils;

describe('Accordion Test Case', () => {

  jsdom();

  it('should render', () => {
    var instance = TestUtils.renderIntoDocument(<Accordion />);
    expect(instance, 'to be defined');
  });

  describe('selectedIndex', () => {

    it('should select the first item as default', () => {
      var instance = TestUtils.renderIntoDocument(
        <Accordion>
          <AccordionItem title="First" />
          <AccordionItem title="Second" />
        </Accordion>
      );
      var items = TestUtils.scryRenderedComponentsWithType(
        instance,
        AccordionItem
      );

      expect(items[0].props.expanded, 'to be true');
      expect(items[1].props.expanded, 'to be undefined');
    });

    it('should accept a selectedIndex prop', () => {
      var instance = TestUtils.renderIntoDocument(
        <Accordion selectedIndex={1}>
          <AccordionItem title="First" />
          <AccordionItem title="Second" />
        </Accordion>
      );
      var items = TestUtils.scryRenderedComponentsWithType(
        instance,
        AccordionItem
      );

      expect(items[0].props.expanded, 'to be undefined');
      expect(items[1].props.expanded, 'to be true');
    });

  });

});
