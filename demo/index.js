'use strict';

import React from 'react/addons';

import Accordion from '../src/Accordion';
import AccordionItem from '../src/AccordionItem';

class Demo extends React.Component {

  render() {
    return (
      <Accordion>
        <AccordionItem title="First item">
          <p>First item content</p>
        </AccordionItem>
        <AccordionItem title="Second item">
          <p>Second item content</p>
        </AccordionItem>
      </Accordion>
    );
  }

}

React.render(
  <Demo />,
  document.body
);
