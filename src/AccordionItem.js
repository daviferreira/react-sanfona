'use strict';

import React, { Component, PropTypes } from 'react';

// TODO: title and body componenets?
// TODO: PropTypes
export default class AccordionItem extends Component {

  render() {
    let itemProps = {
      'aria-expanded': this.props.expanded,
      'aria-hidden': !this.props.expanded,
      className: 'react-sanfona-item', // TODO: modifier class
      role: 'tabpanel'
    };

    let titleProps = {
      'aria-controls': `react-sanfona-item-body-${ this.props.itemId }`,
      className: 'react-sanfona-item-title',
      id: `react-safona-item-title-${ this.props.itemId }`
    };

    let bodyProps = {
      'aria-labelledby': `react-safona-item-title-${ this.props.itemId }`,
      className: 'react-sanfona-item-body',
      id: `react-safona-item-body-${ this.props.itemId }`
    };

    return (
      <div {...itemProps}>
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

AccordionItem.propTypes = {
  expanded: React.PropTypes.bool,
  itemId: React.PropTypes.string.isRequired,
  title: React.PropTypes.string
};
