'use strict';

import expect from 'unexpected';
import sd from 'skin-deep';
import React from 'react';

import AccordionItemTitle from './index';

describe('AccordionItemTitle Test Case', () => {
  let vdom;

  describe('aria', () => {
    it('should set aria-expanded to true when expanded prop is true', () => {
      const tree = sd.shallowRender(<AccordionItemTitle expanded />);
      vdom = tree.getRenderOutput();
      expect(vdom.props['aria-expanded'], 'to be true');
    });

    it('should set aria-expanded to false when expanded prop is false', () => {
      const tree = sd.shallowRender(<AccordionItemTitle expanded={false} />);
      vdom = tree.getRenderOutput();
      expect(vdom.props['aria-expanded'], 'to be false');
    });
  });
});
