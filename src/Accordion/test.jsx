import expect from 'unexpected';
import React from 'react';
import sd from 'skin-deep';
import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Accordion from './index';
import AccordionItem from '../AccordionItem';

describe('Accordion Test Case', () => {
  let vdom, instance, items;

  it('should render children', () => {
    const item = shallow(
      <Accordion>
        <AccordionItem title="First" />
        <AccordionItem title="Second" />
      </Accordion>
    );
    expect(item.props().children.length, 'to equal', 2);
  });

  describe('activeItems', () => {

    it('should select the first item as default', () => {
      const item = shallow(
        <Accordion>
          <AccordionItem title="First" />
          <AccordionItem title="Second" />
        </Accordion>
      );

      expect(item.find(AccordionItem).at(0).prop('expanded'), 'to be true');
      expect(item.find(AccordionItem).at(1).prop('expanded'), 'to be false');
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

    it('should accept a string as active item prop', () => {
      const tree = sd.shallowRender(
        <Accordion activeItems={'second'}>
          <AccordionItem title="First" slug='first' />
          <AccordionItem title="Second" slug='second' />
        </Accordion>
      )

      vdom = tree.getRenderOutput();

      items = tree.props.children;

      expect(items[0].props.expanded, 'to be false');
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

    it('should default to first active item if allowMultiple is false', () => {
      const tree = sd.shallowRender(
        <Accordion activeItems={[0, 1]}>
          <AccordionItem title="First" />
          <AccordionItem title="Second" />
        </Accordion>
      );

      vdom = tree.getRenderOutput();

      items = tree.props.children;

      expect(items[0].props.expanded, 'to be true');
      expect(items[1].props.expanded, 'to be false');
    });

    it('should allow multiple selected indexes of different types', () => {
      const tree = sd.shallowRender(
        <Accordion activeItems={[0, 'second']} allowMultiple>
          <AccordionItem title="First" />
          <AccordionItem title="Second" slug="second" />
        </Accordion>
      );

      vdom = tree.getRenderOutput();

      items = tree.props.children;

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

  describe('Accordion onClick', () => {
    it('should override default onClick', () => {
      const item = shallow(
        <Accordion activeItems={[]} onClick={() => {}}>
          <AccordionItem title="First" />
          <AccordionItem title="Second" />
        </Accordion>
      );

      let firstItem = item.find(AccordionItem).at(0);
      let secondItem = item.find(AccordionItem).at(1)

      expect(firstItem.prop('expanded'), 'to be false');
      expect(secondItem.prop('expanded'), 'to be false');

      firstItem.simulate('click');

      // call item.update() to wait for async event
      firstItem = item.update().find(AccordionItem).at(0);
      secondItem = item.update().find(AccordionItem).at(1);

      expect(firstItem.prop('expanded'), 'to be false');
      expect(secondItem.prop('expanded'), 'to be false');
    });
  });

  describe('AccordionItem onClick', () => {
    it('should be called when clicking AccordionItem', () => {
      const accordionOnClick = sinon.stub().returns(1);
      const itemOnClick = sinon.stub().returns(1);

      const item = shallow(
        <Accordion activeItems={[]} onClick={accordionOnClick}>
          <AccordionItem title="First" onClick={itemOnClick}/>
        </Accordion>
      );

      let firstItem = item.find(AccordionItem).at(0);

      expect(firstItem.prop('expanded'), 'to be false');

      firstItem.simulate('click');

      firstItem = item.update().find(AccordionItem).at(0);

      expect(firstItem.prop('expanded'), 'to be false');
      expect(accordionOnClick.callCount, 'to equal', 0);
      expect(itemOnClick.callCount, 'to equal', 1);
    });
  });
});
