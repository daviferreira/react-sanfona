'use strict';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class Accordion extends Component {

  constructor(props) {
    super(props);

    let activeItems = !Array.isArray(props.activeItems) ?
                      [props.activeItems] :
                      props.activeItems;

    this.state = { activeItems: activeItems };
  }

  componentDidMount() {
    this.state.activeItems.forEach((index) => {
      if (this.refs[`item-${ index }`]) {
        this.refs[`item-${ index }`].allowOverflow();
      }
    });

    // allow overflow for absolute positioned elements inside
    // the item body, but only after animation is complete
    ReactDOM.findDOMNode(this).addEventListener('transitionend', () => {
      this.state.activeItems.forEach((index) => {
        this.refs[`item-${ index }`].allowOverflow();
      });
    });
  }

  handleClick(index) {
    let newState = {};

    // clone active items state array
    newState.activeItems = this.state.activeItems.slice(0);

    const position = newState.activeItems.indexOf(index);

    if (position !== -1) {
      newState.activeItems.splice(position, 1);
    } else if (this.props.allowMultiple) {
      newState.activeItems.push(index);
    } else {
      newState.activeItems = [index];
    }

    this.setState(newState);
  }

  renderItems() {
    if (!this.props.children) {
      return null;
    }

    return this.props.children.map((item, index) => {
      const expanded = this.state.activeItems.indexOf(index) !== -1;

      return React.cloneElement(item, {
        expanded: expanded,
        key: index,
        onClick: this.handleClick.bind(this, index),
        ref: `item-${ index }`
      });
    });
  }

  render() {
    return (
      <div className="react-sanfona" role="tablist">
        {this.renderItems()}
      </div>
    );
  }

}

Accordion.defaultProps = {
  activeItems: [0],
  allowMultiple: false
};

Accordion.propTypes = {
  allowMultiple: PropTypes.bool,
  activeItems: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array
  ])
};
