import expect from 'unexpected';
import React from 'react';
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
    expect(item.children().length, 'to equal', 2);
  });

  describe('activeItems', () => {
    it('should select the first item as default', () => {
      const item = shallow(
        <Accordion>
          <AccordionItem title="First" />
          <AccordionItem title="Second" />
        </Accordion>
      );

      expect(item.childAt(0).prop('expanded'), 'to be true');
      expect(item.childAt(1).prop('expanded'), 'to be false');
    });

    it('should accept a activeItems prop', () => {
      const item = shallow(
        <Accordion activeItems={1}>
          <AccordionItem title="First" />
          <AccordionItem title="Second" />
        </Accordion>
      );

      expect(item.childAt(0).prop('expanded'), 'to be false');
      expect(item.childAt(1).prop('expanded'), 'to be true');
    });

    it('should accept a string as active item prop', () => {
      const item = shallow(
        <Accordion activeItems={'second'}>
          <AccordionItem title="First" slug='first' />
          <AccordionItem title="Second" slug='second' />
        </Accordion>
      )

      expect(item.childAt(0).prop('expanded'), 'to be false');
      expect(item.childAt(1).prop('expanded'), 'to be true');
    });
  });

  describe('allowMultiple false', () => {
    // disabled by default
    it('should not allow multiple by default', () => {

    });

    it('should default to first active item if given multiple', () => {
      const item = shallow(
        <Accordion activeItems={[0, 1]}>
          <AccordionItem title="First" />
          <AccordionItem title="Second" />
        </Accordion>
      );

      expect(item.childAt(0).props().expanded, 'to be true');
      expect(item.childAt(1).props().expanded, 'to be false');
    });

    it('should update activeItem', () => {
      const item = shallow(
        <Accordion activeItems={1}>
          <AccordionItem title="First" />
          <AccordionItem title="Second" />
        </Accordion>
      );

      // todo: findWhere or something
      expect(item.state().activeItems, 'to equal', [1]);
      item.childAt(0).simulate('click');
      expect(item.update().state().activeItems, 'to equal', [0]);
    });
  });

  describe('allowMultiple', () => {

    it('should allow multiple expanded items', () => {
      const item = shallow(
        <Accordion activeItems={1} allowMultiple={true}>
          <AccordionItem title="First" />
          <AccordionItem title="Second" />
        </Accordion>
      );

      expect(item.childAt(0).prop('expanded'), 'to be false');
      expect(item.childAt(1).prop('expanded'), 'to be true');

      item.childAt(0).simulate('click');

      expect(item.update().childAt(0).prop('expanded'), 'to be true');
      expect(item.update().childAt(1).prop('expanded'), 'to be true');
    });

    it('should allow multiple selected indexes of different types', () => {
      const item = shallow(
        <Accordion activeItems={[0, 'second']} allowMultiple>
          <AccordionItem title="First" />
          <AccordionItem title="Second" slug="second" />
        </Accordion>
      );

      expect(item.childAt(0).props().expanded, 'to be true');
      expect(item.childAt(1).props().expanded, 'to be true');
    });

    it('should save activeItems on state when allowMultiple is true', () => {
      const item = shallow(
        <Accordion activeItems={1} allowMultiple={true}>
          <AccordionItem title="First" />
          <AccordionItem title="Second" />
        </Accordion>
      );

      expect(item.state('activeItems'), 'to equal', [1]);
    });

    it('should update activeItems state when clicking on an item', () => {
      const item = shallow(
        <Accordion activeItems={1} allowMultiple={true}>
          <AccordionItem title="First" />
          <AccordionItem title="Second" />
        </Accordion>
      );

      expect(item.state('activeItems'), 'to equal', [1]);

      item.childAt(0).simulate('click');

      expect(item.state('activeItems'), 'to equal', [1, 0]);
    });

  });

  describe('external state', () => {
    let item;
    let onClick;
    let firstChild;
    let secondChild;

    beforeEach(() => {
      onClick = sinon.stub();
      item = shallow(
        <Accordion activeItems={[]} onClick={onClick}>
          <AccordionItem title="First" />
          <AccordionItem title="Second" />
        </Accordion>
      );

      firstChild = item.find(AccordionItem).at(0);
      secondChild = item.find(AccordionItem).at(1);
    });

    it('should respect activeItems prop', () => {
      expect(firstChild.prop('expanded'), 'to be false');
      expect(secondChild.prop('expanded'), 'to be false');
      item = shallow(
        <Accordion activeItems={[0, 1]} onClick={onClick}>
          <AccordionItem title="First" />
          <AccordionItem title="Second" />
        </Accordion>
      );
      expect(item.update().childAt(0).prop('expanded'), 'to be true');
      expect(item.update().childAt(1).prop('expanded'), 'to be true');
    });

    it('should override default onClick', () => {
      firstChild.simulate('click');

      // call item.update() to wait for async event
      firstChild = item.update().childAt(0);
      secondChild = item.update().childAt(1);

      expect(firstChild.prop('expanded'), 'to be false');
      expect(secondChild.prop('expanded'), 'to be false');
      expect(onClick.callCount, 'to equal', 1);
    });

    it('should allow overriding item onClick', () => {
      const accordionOnClick = sinon.stub().returns(1);
      const itemOnClick = sinon.stub().returns(1);

      const item = shallow(
        <Accordion activeItems={[]} onClick={accordionOnClick}>
          <AccordionItem title="First" onClick={itemOnClick}/>
        </Accordion>
      );

      let firstChild = item.find(AccordionItem).at(0);

      expect(firstChild.prop('expanded'), 'to be false');

      firstChild.simulate('click');

      firstChild = item.update().find(AccordionItem).at(0);

      expect(firstChild.prop('expanded'), 'to be false');
      expect(accordionOnClick.callCount, 'to equal', 0);
      expect(itemOnClick.callCount, 'to equal', 1);
    });
  });
});
