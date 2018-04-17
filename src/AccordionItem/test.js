'use strict';

import expect from 'unexpected';
import sd from 'skin-deep';
import React from 'react';

import AccordionItem from './index';

describe('AccordionItem Test Case', () => {
  let vdom, instance;

  it('should render', () => {
    const tree = sd.shallowRender(<AccordionItem />);
    instance = tree.getMountedInstance();
    vdom = tree.getRenderOutput();

    expect(instance, 'to be defined');
    expect(vdom, 'to be defined');
    expect(vdom.type, 'to be', 'div');
    expect(vdom.props.children[0].props, 'to have property', 'rootTag', 'h3');
    expect(vdom.props.children[1].props, 'to have property', 'rootTag', 'div');
  });

  it('should render with custom tags', () => {
    const tree = sd.shallowRender(
      <AccordionItem rootTag="li" titleTag="h2" bodyTag="ul" />
    );
    instance = tree.getMountedInstance();
    vdom = tree.getRenderOutput();

    expect(instance, 'to be defined');
    expect(vdom, 'to be defined');
    expect(vdom.type, 'to be', 'li');
    expect(vdom.props.children[0].props, 'to have property', 'rootTag', 'h2');
    expect(vdom.props.children[1].props, 'to have property', 'rootTag', 'ul');
  });

  it('should have an unique id', () => {
    const tree = sd.shallowRender(<AccordionItem />);
    const treeAlt = sd.shallowRender(<AccordionItem />);

    instance = tree.getMountedInstance();
    let anotherInstance = treeAlt.getMountedInstance();

    expect(instance.uuid, 'not to equal', anotherInstance.uuid);
  });

  it('should allow custom uuid', () => {
    const tree = sd.shallowRender(<AccordionItem uuid="first item" />);
    const treeAlt = sd.shallowRender(<AccordionItem uuid="second item" />);

    instance = tree.getMountedInstance();
    const anotherInstance = treeAlt.getMountedInstance();

    expect(instance.uuid, 'to equal', 'first item');
    expect(anotherInstance.uuid, 'to equal', 'second item');
  });

  describe('disabled mode', () => {
    it('should be false by default', () => {
      const tree = sd.shallowRender(<AccordionItem />);
      vdom = tree.getRenderOutput();
      expect(vdom.props['disabled'], 'to be undefined');
    });

    it('should have react-sanfona-item-disabled className when disabled', () => {
      const tree = sd.shallowRender(<AccordionItem disabled />);
      vdom = tree.getRenderOutput();
      expect(
        vdom.props['className'],
        'to be',
        'react-sanfona-item react-sanfona-item-disabled'
      );
    });

    it('should have a custom className when provided', () => {
      const tree = sd.shallowRender(
        <AccordionItem disabled disabledClassName="customDisabled" />
      );
      vdom = tree.getRenderOutput();
      expect(
        vdom.props['className'],
        'to be',
        'react-sanfona-item react-sanfona-item-disabled customDisabled'
      );
    });
  });
});
