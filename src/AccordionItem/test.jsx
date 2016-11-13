'use strict';

import expect from 'unexpected';
import sd from 'skin-deep';
import sinon from 'sinon';
import React from 'react'
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Accordion from './index';
import AccordionItem from './index';

expect.installPlugin(require('unexpected-sinon'));

describe('AccordionItem Test Case', () => {
  let vdom, instance;

  it('should render', () => {
    const tree = sd.shallowRender(<AccordionItem />);
    instance = tree.getMountedInstance();
    vdom = tree.getRenderOutput();

    expect(instance, 'to be defined');
    expect(vdom, 'to be defined');
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
    let anotherInstance = treeAlt.getMountedInstance();

    expect(instance.uuid, 'to equal', "first item");
  });

  describe('aria', () => {

    it('should set aria-expanded to true when expanded prop is true', () => {
      const tree = sd.shallowRender(<AccordionItem expanded={true} />);
      vdom = tree.getRenderOutput();
      expect(vdom.props['aria-expanded'], 'to be true');
      expect(vdom.props['aria-hidden'], 'to be undefined');
    });

    it('should set aria-hidden to true when expanded prop is not true', () => {
      const tree = sd.shallowRender(<AccordionItem />);
      vdom = tree.getRenderOutput();
      expect(vdom.props['aria-expanded'], 'to be undefined');
      expect(vdom.props['aria-hidden'], 'to be true');
    });

  });

  describe('disabled mode', () => {

    it('should be false by default', () => {
      const tree = sd.shallowRender(<AccordionItem />);
      vdom = tree.getRenderOutput();
      expect(vdom.props['disabled'], 'to be undefined');
    })

    it('should have react-sanfona-item-disabled className when disabled', () => {
      const tree = sd.shallowRender(<AccordionItem disabled={true}/>);
      vdom = tree.getRenderOutput();
      expect(vdom.props['className'], 'to be', 'react-sanfona-item react-sanfona-item-disabled')
    });

    it('should have a custom className when provided', () => {
      const tree = sd.shallowRender(<AccordionItem disabled={true} disabledClassName='customDisabled'/>);
      vdom = tree.getRenderOutput();
      expect(vdom.props['className'], 'to be', 'react-sanfona-item react-sanfona-item-disabled customDisabled')
    });

  });

});
