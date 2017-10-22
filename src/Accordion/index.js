'use strict';

import className from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

export default class Accordion extends Component {
  constructor(props) {
    super(props);

    let activeItems = [];

    if (props.children) {
      props.children.forEach((children, index) => {
        if (!children.props.disabled && children.props.expanded) {
          activeItems.push(index);
        }
      });

      if (!props.allowMultiple && activeItems.length > 0) {
        activeItems = activeItems.slice(0, 1);
      }
    }

    this.state = {
      activeItems
    };
  }

  handleClick(index) {
    const { allowMultiple, children, openNextAccordionItem } = this.props;

    // clone active items state array
    let activeItems = this.state.activeItems.slice(0);

    const position = activeItems.indexOf(index);

    if (position !== -1) {
      activeItems.splice(position, 1);

      if (openNextAccordionItem && index !== this.props.children.length - 1) {
        activeItems.push(index + 1);
      }
    } else if (allowMultiple) {
      activeItems.push(index);
    } else {
      activeItems = [index];
    }

    const newState = {
      activeItems
    };

    this.setState(newState);

    if (this.props.onChange) {
      this.props.onChange(newState);
    }
  }

  renderItems() {
    const { children, openNextAccordionItem } = this.props;

    if (!children) {
      return null;
    }

    const { activeItems } = this.state;

    return children.filter(c => c).map((item, index) => {
      const { props: { disabled } } = item;
      const expanded = !disabled && activeItems.indexOf(index) !== -1;

      return React.cloneElement(item, {
        expanded,
        index,
        key: index,
        onClick: this.handleClick.bind(this, index),
        ref: `item-${index}`
      });
    });
  }

  render() {
    return (
      <this.props.rootTag
        className={className('react-sanfona', this.props.className)}
        role="tablist"
        style={this.props.style}
      >
        {this.renderItems()}
      </this.props.rootTag>
    );
  }
}

Accordion.defaultProps = {
  activeItems: [0],
  allowMultiple: false,
  rootTag: 'div'
};

Accordion.propTypes = {
  allowMultiple: PropTypes.bool,
  activeItems: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.string
  ]),
  className: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
  rootTag: PropTypes.string
};
