'use strict';

require('normalize.css');
require('./demo.scss');

import React from 'react';
import ReactDOM from 'react-dom';

import { Accordion, AccordionItem } from '../src';

class Demo extends React.Component {

  render() {
    return (
      <div className="demo-container">
        <h1>react-sanfona</h1>

        <h2>Default settings</h2>

        <Accordion>
          {[1, 'two', 3, 'four', 5].map((item) => {
            return (
              <AccordionItem title={`Item ${ item }`} slug={item} key={item}>
                <div>
                  {`Item ${ item } content`}
                  {item === 3 ? <p><img src="https://cloud.githubusercontent.com/assets/38787/8015584/2883817e-0bda-11e5-9662-b7daf40e8c27.gif" /></p> : null}
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>

        <h2>Allow multiple</h2>

        <Accordion allowMultiple={true} activeItems={2}>
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

        <h2>Allow multiple, all active</h2>

        <Accordion allowMultiple={true} activeItems={[0, 1, 2, 3, 4]}>
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

        <h2>Open next accordion item when previous one closes</h2>

        <Accordion openNextAccordionItem>
          {[1, 2, 3, 4, 5].map((item) => {
            return (
              <AccordionItem title={`Item ${ item}`} key={item}>
                <div>
                  {`Item ${ item } content`}
                  {item === 3 ? <p><img src="http://i.giphy.com/nIMpbXH2WfYRi.gif" /></p> : null}
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>

        <h2>Overflow example</h2>

        <Accordion>
          {[1, 2].map((item) => {
            return (
              <AccordionItem title={`Item ${ item }`} key={item}>
                <div>
                  {`Item ${ item } content`}
                  <div className="tooltip">{`Tooltip ${ item } content`}</div>
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>

        <h2>onChange example</h2>

        <p id="changes"></p>
        <Accordion
          allowMultiple={true}
          activeItems={2}
          onChange={newState =>
            document.getElementById('changes').innerHTML = `Active: ${newState.activeItems}`
          }
        >
          {[1, 2, 3, 4, 5].map((item) => {
            return (
              <AccordionItem title={`Item ${ item }`} key={item}>
                <div>
                  {`Item ${ item } content`}
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>

      </div>
    );
  }

}

ReactDOM.render(
  <Demo />,
  document.getElementById('demo')
);
