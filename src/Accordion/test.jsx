'use strict';

import expect from 'unexpected';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Accordion from './index';
import AccordionItem from '../AccordionItem';
import AccordionItemTitle from '../AccordionItemTitle';

describe('Accordion Test Case', () => {

  it('should render', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<Accordion />);
    const instance = shallowRenderer.getRenderOutput();
    expect(instance, 'to be defined');
  });

  describe('selectedIndex', () => {

    it('should select the first item as default', () => {
      const shallowRenderer = TestUtils.createRenderer();
      shallowRenderer.render(
        <Accordion>
          <AccordionItem title="First" />
          <AccordionItem title="Second" />
        </Accordion>
      );
      const instance = shallowRenderer.getRenderOutput();

      const items = instance.props.children;

      expect(items[0].props.expanded, 'to be true');
      expect(items[1].props.expanded, 'to be false');
    });

    it('should accept a selectedIndex prop', () => {
      const shallowRenderer = TestUtils.createRenderer();
      shallowRenderer.render(
        <Accordion selectedIndex={1}>
          <AccordionItem title="First" />
          <AccordionItem title="Second" />
        </Accordion>
      );

      const instance = shallowRenderer.getRenderOutput();

      const items = instance.props.children;

      expect(items[0].props.expanded, 'to be false');
      expect(items[1].props.expanded, 'to be true');
    });

  });

  describe('allowMultiple', () => {

    it('should allow multiple expanded items', () => {
      const shallowRenderer = TestUtils.createRenderer();
      shallowRenderer.render(
        <Accordion selectedIndex={1} allowMultiple={true}>
          <AccordionItem title="First" />
          <AccordionItem title="Second" />
        </Accordion>
      );

      const instance = shallowRenderer.getRenderOutput();

      const items = instance.props.children;

      expect(items[0].props.expanded, 'to be false');
      expect(items[1].props.expanded, 'to be true');

      // TestUtils.Simulate.click(React.findDOMNode(title));
      shallowRenderer.getMountedInstance().handleClick(1);

      expect(items[0].props.expanded, 'to be true');
      expect(items[1].props.expanded, 'to be true');
    });

    it('should save activeItems on state when allowMultiple is true', () => {
      var instance = TestUtils.renderIntoDocument(
        <Accordion selectedIndex={1} allowMultiple={true}>
          <AccordionItem title="First" />
          <AccordionItem title="Second" />
        </Accordion>
      );

      expect(instance.state.activeItems, 'to equal', [1]);
    });

    it('should update activeItems state when clicking on an item', () => {
      var instance = TestUtils.renderIntoDocument(
        <Accordion selectedIndex={1} allowMultiple={true}>
          <AccordionItem title="First" />
          <AccordionItem title="Second" />
        </Accordion>
      );

      var items = TestUtils.scryRenderedComponentsWithType(
        instance,
        AccordionItem
      );

      var title = TestUtils.findRenderedComponentWithType(
        items[0],
        AccordionItemTitle
      );

      expect(instance.state.activeItems, 'to equal', [1]);

      TestUtils.Simulate.click(React.findDOMNode(title));

      expect(instance.state.activeItems, 'to equal', [1, 0]);
    });

  });

});
