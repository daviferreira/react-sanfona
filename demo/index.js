'use strict';

import React from 'react/addons';

import Accordion from '../src/Accordion';

import {
  AccordionItem,
  AccordionItemTitle,
  AccordionItemContent
} from '../src/AccordionItem';

class Demo extends React.Component {
  render() {
    return (
      <Accordion>
        <AccordionItem>
          <AccordionItemTitle>
            First Item
          </AccordionItemTitle>
          <AccordionItemContent>
            First item content
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemTitle>
            Second Item
          </AccordionItemTitle>
          <AccordionItemContent>
            Second item content
          </AccordionItemContent>
        </AccordionItem>
      </Accordion>
    );
  }
}

React.render(
  <Demo />,
  document.body
);
