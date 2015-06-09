'use strict';

require('normalize.css');
require('./demo.scss');

import React from 'react/addons';

import Accordion from '../src/Accordion';
import AccordionItem from '../src/AccordionItem';

class Demo extends React.Component {

  render() {
    return (
      <div className="demo-container">
        <h1>react-sanfona</h1>

        <Accordion allowMultiple={true} selectedItem={2}>
          {[1, 2, 3, 4, 5].map((item) => {
            return (
              <AccordionItem title={`Item ${ item }`} key={item}>
                <div>
                  {`Item ${ item } content`}
                  {item === 3 ? <p><img src="http://i.giphy.com/nIMpbXH2WfYRi.gif" /></p> : null}
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>

        <Accordion>
          {[1, 2, 3, 4, 5].map((item) => {
            return (
              <AccordionItem title={`Item ${ item }`} key={item}>
                <div>
                  {`Item ${ item } content`}
                  {item === 3 ? <p><img src="https://cloud.githubusercontent.com/assets/38787/8015584/2883817e-0bda-11e5-9662-b7daf40e8c27.gif" /></p> : null}
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    );
  }

}

React.render(
  <Demo />,
  document.body
);
