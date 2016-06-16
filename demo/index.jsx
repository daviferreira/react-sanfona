'use strict';

require('normalize.css');
require('./demo.scss');

import React from 'react';
import ReactDOM from 'react-dom';

import { Accordion, AccordionItem } from '../src';
import { updateItems } from '../src/Accordion';

class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      activeItems: []
    }
  }

  handleClick(index) {
    this.setState({
      activeItems: updateItems(index, this.state.activeItems, true)
    });
  }

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

        <h2>Custom onClick</h2>
        <p>Passing an onClick to an Accordion overrides the default behaviour. This allows you to handle activeItems outside the componet (e.g. in parent state). You can also pass separate onClick handlers to individual AccordionItems.</p>

        <Accordion onClick={this.handleClick.bind(this)} activeItems={this.state.activeItems}>
          {[1, 'with different onClick handler', 3, 4, 5].map((item) => {
            let customOnClick;
            if (item.length) {
              customOnClick = {onClick: () => console.log(`clicked item ${item}`)}
            }
            return (
              <AccordionItem title={`Item ${ item }`} slug={item} key={item} {...customOnClick}>
                <div>
                  {`Item ${ item } content`}
                  {item === 3 ? <p><img src="https://cloud.githubusercontent.com/assets/38787/8015584/2883817e-0bda-11e5-9662-b7daf40e8c27.gif" /></p> : null}
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
