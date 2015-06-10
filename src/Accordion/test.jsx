'use strict';

import expect from 'unexpected';
import jsdom from 'mocha-jsdom';
import React from 'react/addons'

import Accordion from './index';

var TestUtils = React.addons.TestUtils;

describe('Accordion Test Case', () => {

  jsdom();

  it('should render', () => {
    var instance = TestUtils.renderIntoDocument(<Accordion />);
    expect(instance, 'to be defined');
  });

});
