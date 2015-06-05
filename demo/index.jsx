'use strict';

require('normalize.css');

import React from 'react/addons';

import Accordion from '../src/Accordion';
import AccordionItem from '../src/AccordionItem';

class Demo extends React.Component {

  render() {
    return (
      <Accordion>
        {[1, 2, 3, 4, 5].map((item) => {
          return (
            <AccordionItem title={`Item ${ item }`} key={item}>
              <div>{`Item ${ item } content`}</div>
            </AccordionItem>
          );
        })}
      </Accordion>
    );
  }

}

React.render(
  <Demo />,
  document.body
);
