'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { Accordion, AccordionItem } from '../src';

import 'normalize.css';
import './demo.css';

class Demo extends React.Component {
  constructor(props) {
    super();

    this.state = {
      activeClickedItems: [0],
      activeHoveredItems: [0]
    };

    this.toggleActive = this.toggleActive.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleHover = this.handleHover.bind(this);
  }

  toggleActive(index) {
    const position = this.state.activeClickedItems.indexOf(index);

    if (position !== -1) {
      this.setState({ activeClickedItems: [] });
    } else {
      this.setState({ activeClickedItems: [index] });
    }
  }

  handleClick({ activeItems }) {
    this.setState({ activeClickedItems: activeItems });
  }

  handleHover({ activeItems }) {
    this.setState({ activeHoveredItems: activeItems });
  }

  render() {
    console.log(this.state);
    return (
      <div className="demo-container">
        <h1>react-sanfona</h1>

        <h2>Default settings</h2>

        <Accordion>
          {[0, 1, 2, 3, 4].map(item => {
            return (
              <AccordionItem
                key={item}
                title={`Item ${item}`}
                expanded={this.state.activeClickedItems.includes(item)}
              >
                <div>
                  {`Item ${item} content`}
                  {item === 3 ? (
                    <p>
                      <img src="https://cloud.githubusercontent.com/assets/38787/8015584/2883817e-0bda-11e5-9662-b7daf40e8c27.gif" />
                    </p>
                  ) : null}
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>

        <div className="togglers">
          {[0, 1, 2, 3, 4].map(item => {
            return (
              <button
                className="button"
                onClick={() => {
                  this.toggleActive(item);
                }}
                key={item}
              >
                {`Toggle item ${item} active`}
              </button>
            );
          })}
        </div>

        <h2>Hovered</h2>

        <Accordion onChange={this.handleHover} isHovered>
          {[0, 1, 2, 3, 4].map(item => {
            return (
              <AccordionItem
                key={item}
                title={`Item ${item}`}
                expanded={this.state.activeHoveredItems.includes(item)}
              >
                <div>
                  {`Item ${item} content`}
                  {item === 2 ? (
                    <p>
                      <img src="https://cloud.githubusercontent.com/assets/38787/8015584/2883817e-0bda-11e5-9662-b7daf40e8c27.gif" />
                    </p>
                  ) : null}
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>

        <h2>Allow multiple</h2>

        <Accordion allowMultiple>
          {[0, 1, 2, 3, 4].map(item => {
            return (
              <AccordionItem
                duration={item === 3 ? 700 : null}
                easing={
                  item === 3 ? 'cubic-bezier(0.420, 0.000, 0.580, 1.000)' : null
                }
                key={item}
                title={`Item ${item}`}
                expanded={item === 2}
              >
                <div>
                  {`Item ${item} content`}
                  {item === 3 ? (
                    <p>
                      <img src="https://i.giphy.com/nIMpbXH2WfYRi.gif" />
                    </p>
                  ) : null}
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>

        <h2>Allow multiple, all active</h2>

        <Accordion allowMultiple>
          {[0, 1, 2, 3, 4].map(item => {
            return (
              <AccordionItem key={item} title={`Item ${item}`} expanded>
                <div>
                  {`Item ${item} content`}
                  {item === 3 ? (
                    <p>
                      <img src="https://i.giphy.com/nIMpbXH2WfYRi.gif" />
                    </p>
                  ) : null}
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>

        <h2>Open next accordion item when previous one closes</h2>

        <Accordion openNextAccordionItem>
          {[0, 1, 2, 3, 4].map(item => {
            return (
              <AccordionItem key={item} title={`Item ${item}`}>
                <div>
                  {`Item ${item} content`}
                  {item === 3 ? (
                    <p>
                      <img src="https://i.giphy.com/nIMpbXH2WfYRi.gif" />
                    </p>
                  ) : null}
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>

        <h2>Overflow example</h2>

        <Accordion>
          {[0, 1].map(item => {
            return (
              <AccordionItem key={item} title={`Item ${item}`}>
                <div>
                  {`Item ${item} content`}
                  <div className="tooltip">{`Tooltip ${item} content`}</div>
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>

        <h2>onChange example</h2>

        <p id="changes" />
        <Accordion
          allowMultiple
          onChange={newState =>
            (document.getElementById('changes').innerHTML = `Active: ${
              newState.activeItems
            }`)
          }
        >
          {[0, 1, 2, 3, 4].map(item => {
            return (
              <AccordionItem
                key={item}
                title={`Item ${item}`}
                expanded={item === 2}
              >
                <div>{`Item ${item} content`}</div>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('demo'));
