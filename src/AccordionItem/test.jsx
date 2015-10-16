'use strict';

import expect from 'unexpected';
import sd from 'skin-deep';
import sinon from 'sinon';
import React from 'react'
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

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

});
