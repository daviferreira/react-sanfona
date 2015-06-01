'use strict';

import React, { Component, PropTypes } from 'react';

// TODO: title and body componenets:
// TODO: PropTypes
export default class AccordionItem extends Component {

  render() {
    let props = {
      'aria-expanded': this.props.expanded,
      'aria-hidden': !this.props.expanded,
      className: 'react-sanfona-item', // TODO: modifier class
      role: 'tabpanel'
    };

    let titleProps = {
      'aria-controls': `react-sanfona-item-body-${ this.props.itemId }`,
      className: 'react-sanfona-item-title', // TODO: modifier class
      id: `react-safona-item-title-${ this.props.itemId }`
    };

    let bodyProps = {
      'aria-labelledby': `react-safona-item-title-${ this.props.itemId }`,
      className: 'react-sanfona-item-body', // TODO: modifier class
      id: `react-safona-item-body-${ this.props.itemId }`
    };

    return (
      <div {...props}>
        <h3 {...titleProps}>
          {this.props.title}
        </h3>
        <div {...bodyProps}>
          {this.props.children}
        </div>
      </div>
    );
  }

}
