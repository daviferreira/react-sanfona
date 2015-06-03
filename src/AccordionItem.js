'use strict';

import React, { Component, PropTypes } from 'react';

// TODO: title and body componenets?
// TODO: PropTypes
export default class AccordionItem extends Component {

  getItemProps() {
    return {
      'aria-expanded': this.props.expanded,
      'aria-hidden': !this.props.expanded,
      className: 'react-sanfona-item', // TODO: modifier class
      role: 'tabpanel'
    };
  }

  getTitleProps() {
    return {
      'aria-controls': `react-sanfona-item-body-${ this.props.itemId }`,
      className: 'react-sanfona-item-title',
      id: `react-safona-item-title-${ this.props.itemId }`
    };
  }

  getBodyProps() {
    return {
      'aria-labelledby': `react-safona-item-title-${ this.props.itemId }`,
      className: 'react-sanfona-item-body',
      id: `react-safona-item-body-${ this.props.itemId }`
    };
  }

  render() {
    return (
      <div {this.getItemProps()}>
        <h3 {this.getTitleProps()}>
          {this.props.title}
        </h3>
        <div {this.getBodyProps()}>
          {this.props.children}
        </div>
      </div>
    );
  }

}

AccordionItem.propTypes = {
  expanded: React.PropTypes.bool,
  itemId: React.PropTypes.string.isRequired,
  title: React.PropTypes.string
};
