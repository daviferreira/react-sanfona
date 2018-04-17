'use strict';

import expect from 'unexpected';
import sd from 'skin-deep';
import React from 'react';

import AccordionItemBody from './index';

describe('AccordionItemBody Test Case', () => {
  let vdom;

  describe('aria', () => {
    it('should set hidden to false when expanded prop is true', () => {
      const tree = sd.shallowRender(<AccordionItemBody expanded />);
      vdom = tree.getRenderOutput();
      expect(vdom.props['hidden'], 'to be false');
    });

    it('should set hidden to true when expanded prop is not true', () => {
      const tree = sd.shallowRender(<AccordionItemBody />);
      vdom = tree.getRenderOutput();
      expect(vdom.props['hidden'], 'to be true');
    });
  });

});
