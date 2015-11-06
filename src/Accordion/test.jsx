'use strict';

import expect from 'unexpected';
import React from 'react';
import sd from 'skin-deep';
import TestUtils from 'react-addons-test-utils';

import Accordion from './index';
import AccordionItem from '../AccordionItem';

describe('Accordion Test Case', () => {
  let vdom, instance, items;

  it('should render', () => {
    const tree = sd.shallowRender(<Accordion />);

    instance = tree.getMountedInstance();
    vdom = tree.getRenderOutput();

    expect(instance, 'to be defined');
    expect(vdom, 'to be defined');
  });

  describe('activeItems', () => {

    it('should select the first item as default', () => {
      const tree = sd.shallowRender(
        <Accordion>
          <AccordionItem title="First" />
          <AccordionItem title="Second" />
        </Accordion>
      );

      vdom = tree.getRenderOutput();

      items = vdom.props.children;

      expect(items[0].props.expanded, 'to be true');
      expect(items[1].props.expanded, 'to be false');
    });

    it('should accept a activeItems prop', () => {
      const tree = sd.shallowRender(
        <Accordion activeItems={1}>
          <AccordionItem title="First" />
          <AccordionItem title="Second" />
        </Accordion>
      );

      vdom = tree.getRenderOutput();

      items = tree.props.children;

      expect(items[0].props.expanded, 'to be false');
      expect(items[1].props.expanded, 'to be true');
    });

    it('should accept multiple selected indexes', () => {
      const tree = sd.shallowRender(
        <Accordion activeItems={[0, 1]}>
          <AccordionItem title="First" />
          <AccordionItem title="Second" />
        </Accordion>
      );

      vdom = tree.getRenderOutput();

      items = tree.props.children;

      expect(items[0].props.expanded, 'to be true');
      expect(items[1].props.expanded, 'to be true');
    });

    it('should keep only one activeItem when allowMultiple is false', () => {
      const tree = sd.shallowRender(
        <Accordion activeItems={1}>
          <AccordionItem title="First" />
          <AccordionItem title="Second" />
        </Accordion>
      );

      instance = tree.getMountedInstance();

      expect(instance.state.activeItems, 'to equal', [1]);

      instance.handleClick(0);

      expect(instance.state.activeItems, 'to equal', [0]);
    });

  });

  describe('allowMultiple', () => {

    it('should allow multiple expanded items', () => {
      const tree = sd.shallowRender(
        <Accordion activeItems={1} allowMultiple={true}>
          <AccordionItem title="First" />
          <AccordionItem title="Second" />
        </Accordion>
      );

      instance = tree.getMountedInstance();
      vdom = tree.getRenderOutput();
      items = vdom.props.children;

      expect(items[0].props.expanded, 'to be false');
      expect(items[1].props.expanded, 'to be true');

      instance.handleClick(0);

      vdom = tree.getRenderOutput();
      items = vdom.props.children;

      expect(items[0].props.expanded, 'to be true');
      expect(items[1].props.expanded, 'to be true');
    });

    it('should save activeItems on state when allowMultiple is true', () => {
      const tree = sd.shallowRender(
        <Accordion activeItems={1} allowMultiple={true}>
          <AccordionItem title="First" />
          <AccordionItem title="Second" />
        </Accordion>
      );

      instance = tree.getMountedInstance();

      expect(instance.state.activeItems, 'to equal', [1]);
    });

    it('should update activeItems state when clicking on an item', () => {
      const tree = sd.shallowRender(
        <Accordion activeItems={1} allowMultiple={true}>
          <AccordionItem title="First" />
          <AccordionItem title="Second" />
        </Accordion>
      );

      instance = tree.getMountedInstance();

      expect(instance.state.activeItems, 'to equal', [1]);

      instance.handleClick(0);

      expect(instance.state.activeItems, 'to equal', [1, 0]);
    });

  });

});
