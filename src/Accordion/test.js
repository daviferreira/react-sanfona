'use strict';

import expect from 'unexpected';
import React from 'react';
import sd from 'skin-deep';

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
    expect(vdom.type, 'to be', 'div');
  });

  it('should render with a custom tag', () => {
    const tree = sd.shallowRender(<Accordion rootTag="ul" />);

    instance = tree.getMountedInstance();
    vdom = tree.getRenderOutput();

    expect(instance, 'to be defined');
    expect(vdom, 'to be defined');
    expect(vdom.type, 'to be', 'ul');
  });

  it('should render with one item only', () => {
    const tree = sd.shallowRender(
      <Accordion>
        <AccordionItem key={1} />
      </Accordion>
    );

    instance = tree.getMountedInstance();
    vdom = tree.getRenderOutput();

    expect(instance, 'to be defined');
    expect(vdom, 'to be defined');
    expect(vdom.type, 'to be', 'div');
  });

  describe('activeItems state', () => {
    it('should not set item as active when disabled', () => {
      const tree = sd.shallowRender(
        <Accordion>
          <AccordionItem title="First" key={1} />
          <AccordionItem title="Second" key={2} disabled expanded />
        </Accordion>
      );

      vdom = tree.getRenderOutput();

      items = tree.props.children;

      expect(items[0].props.expanded, 'to be false');
      expect(items[1].props.expanded, 'to be false');
    });
  });

  describe('onHover items', () => {
    it('should expand after hover an item', () => {
      const tree = sd.shallowRender(
        <Accordion isHovered>
          <AccordionItem title="First" key={1} expanded />
          <AccordionItem title="Second" key={2} />
          <AccordionItem title="Third" key={3} />
        </Accordion>
      );

      instance = tree.getMountedInstance();
      vdom = tree.getRenderOutput();
      items = vdom.props.children;

      expect(items[0].props.onMouseOver, 'not to be null');
      expect(items[1].props.onMouseOver, 'not to be null');
      expect(items[2].props.onMouseOver, 'not to be null');

      items[2].props.onMouseOver(2);

      vdom = tree.getRenderOutput();
      items = vdom.props.children;
      expect(items[2].props.expanded, 'to be true');
    });
  });

  describe('allowMultiple', () => {
    it('should allow multiple expanded items', () => {
      const tree = sd.shallowRender(
        <Accordion allowMultiple>
          <AccordionItem title="First" key={1} />
          <AccordionItem title="Second" key={2} expanded />
        </Accordion>
      );

      instance = tree.getMountedInstance();
      vdom = tree.getRenderOutput();
      items = vdom.props.children;

      expect(items[0].props.expanded, 'to be false');
      expect(items[1].props.expanded, 'to be true');

      instance.handleChange(0);

      vdom = tree.getRenderOutput();
      items = vdom.props.children;

      expect(items[0].props.expanded, 'to be true');
      expect(items[1].props.expanded, 'to be true');
    });

    it('should default to first active item if allowMultiple is false', () => {
      const tree = sd.shallowRender(
        <Accordion>
          <AccordionItem title="First" key={1} expanded />
          <AccordionItem title="Second" key={2} expanded />
        </Accordion>
      );

      vdom = tree.getRenderOutput();

      items = tree.props.children;

      expect(items[0].props.expanded, 'to be true');
      expect(items[1].props.expanded, 'to be false');
    });

    it('should allow multiple selected indexes of different types', () => {
      const tree = sd.shallowRender(
        <Accordion allowMultiple>
          <AccordionItem title="First" key={1} expanded />
          <AccordionItem title="Second" key={2} slug="second" expanded />
        </Accordion>
      );

      vdom = tree.getRenderOutput();

      items = tree.props.children;

      expect(items[0].props.expanded, 'to be true');
      expect(items[1].props.expanded, 'to be true');
    });

    it('should save activeItems on state when allowMultiple is true', () => {
      const tree = sd.shallowRender(
        <Accordion allowMultiple>
          <AccordionItem title="First" key={1} />
          <AccordionItem title="Second" key={2} expanded />
        </Accordion>
      );

      instance = tree.getMountedInstance();

      expect(instance.state.activeItems, 'to equal', [1]);
    });

    it('should update activeItems state when clicking on an item', () => {
      const tree = sd.shallowRender(
        <Accordion allowMultiple>
          <AccordionItem title="First" key={1} />
          <AccordionItem title="Second" key={2} expanded />
        </Accordion>
      );

      instance = tree.getMountedInstance();

      expect(instance.state.activeItems, 'to equal', [1]);

      instance.handleChange(0);

      expect(instance.state.activeItems, 'to equal', [1, 0]);
    });

    it('should keep only one activeItem when allowMultiple is false', () => {
      const tree = sd.shallowRender(
        <Accordion>
          <AccordionItem title="First" key={1} />
          <AccordionItem title="Second" key={2} expanded />
        </Accordion>
      );

      instance = tree.getMountedInstance();

      expect(instance.state.activeItems, 'to equal', [1]);

      instance.handleChange(0);

      expect(instance.state.activeItems, 'to equal', [0]);
    });
  });

  describe('openNextAccordionItem', () => {
    it('should open next accordion item', () => {
      const tree = sd.shallowRender(
        <Accordion openNextAccordionItem>
          <AccordionItem title="First" key={1} expanded />
          <AccordionItem title="Second" key={2} />
        </Accordion>
      );

      instance = tree.getMountedInstance();
      vdom = tree.getRenderOutput();
      items = vdom.props.children;

      expect(items[0].props.expanded, 'to be true');
      expect(items[1].props.expanded, 'to be false');

      instance.handleChange(0);

      vdom = tree.getRenderOutput();
      items = vdom.props.children;

      expect(items[0].props.expanded, 'to be false');
      expect(items[1].props.expanded, 'to be true');
    });

    it('should close last item and not open another accordion item', () => {
      const tree = sd.shallowRender(
        <Accordion openNextAccordionItem>
          <AccordionItem title="First" key={1} />
          <AccordionItem title="Second" key={2} expanded />
        </Accordion>
      );

      instance = tree.getMountedInstance();
      vdom = tree.getRenderOutput();
      items = vdom.props.children;

      expect(items[0].props.expanded, 'to be false');
      expect(items[1].props.expanded, 'to be true');

      instance.handleChange(1);

      vdom = tree.getRenderOutput();
      items = vdom.props.children;

      expect(items[0].props.expanded, 'to be false');
      expect(items[1].props.expanded, 'to be false');
    });

    it('should open multiple if allowMultiple present', () => {
      const tree = sd.shallowRender(
        <Accordion openNextAccordionItem allowMultiple>
          <AccordionItem title="First" key={1} expanded />
          <AccordionItem title="Second" key={2} />
          <AccordionItem title="Third" key={3} />
        </Accordion>
      );

      instance = tree.getMountedInstance();
      vdom = tree.getRenderOutput();
      items = vdom.props.children;

      expect(items[0].props.expanded, 'to be true');
      expect(items[1].props.expanded, 'to be false');
      expect(items[2].props.expanded, 'to be false');

      instance.handleChange(1);
      instance.handleChange(2);

      vdom = tree.getRenderOutput();
      items = vdom.props.children;

      expect(items[0].props.expanded, 'to be true');
      expect(items[1].props.expanded, 'to be true');
      expect(items[2].props.expanded, 'to be true');
    });

    it('should override slug property and assign key to index', () => {
      const tree = sd.shallowRender(
        <Accordion openNextAccordionItem>
          <AccordionItem title="First" key={1} slug="first" expanded />
          <AccordionItem title="Second" key={2} slug="second" />
        </Accordion>
      );

      instance = tree.getMountedInstance();

      instance.handleChange(0);

      vdom = tree.getRenderOutput();
      items = vdom.props.children;

      expect(items[0].props.expanded, 'to be false');
      expect(items[1].props.expanded, 'to be true');
    });

    it('should ignore null items', () => {
      const tree = sd.shallowRender(
        <Accordion>
          <AccordionItem title="First" key={1} />
          {null}
          <AccordionItem title="Second" key={2} />
        </Accordion>
      );

      instance = tree.getMountedInstance();

      vdom = tree.getRenderOutput();
      items = vdom.props.children;

      expect(items.length, 'to equal', 2);
    });
  });
});
