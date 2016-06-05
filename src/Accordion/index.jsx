'use strict';

import className from 'classnames';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

const arrayify = obj => [].concat(obj);

export function updateItems(index, activeItems, allowMultiple) {
  let newActiveItems = activeItems.slice(0);
  const position = activeItems.indexOf(index);
  if (position !== -1) {
    newActiveItems.splice(position, 1);
  } else if (allowMultiple) {
    newActiveItems.push(index);
  } else {
    newActiveItems = [index];
  }
  return newActiveItems;
}

export default class Accordion extends Component {

  constructor(props) {
    super(props);
    let activeItems = arrayify(props.activeItems);

    // can't have multiple active items, just use the first one
    if (!props.allowMultiple) activeItems = [activeItems[0]]

    this.state = {
      activeItems
    };
  }

  handleClick(index) {
    let newState = {};

    newState.activeItems = updateItems(index, this.state.activeItems, this.props.allowMultiple);
    
    if (this.props.onChange) {
      this.props.onChange(newState);
    }

    this.setState(newState);
  }

  renderItems() {
    if (!this.props.children) {
      return null;
    }

    const children = arrayify(this.props.children);
    return children.map((item, index) => {
      const key = item.props.slug || index;
      let expanded = this.state.activeItems.indexOf(key) !== -1;
      let onClick = this.handleClick.bind(this, key);

      if (this.props.onClick) {
        onClick = () => this.props.onClick(key);
        expanded = this.props.activeItems.indexOf(key) !== -1;
      }

      return React.cloneElement(item, {
        expanded: expanded,
        key: key,
        onClick: onClick,
        ref: `item-${ key }`
      });
    });
  }

  render() {
    return (
      <div className={className('react-sanfona', this.props.className)}
        role="tablist"
        style={this.props.style}>
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
  ]),
  className: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  style: PropTypes.object
};
