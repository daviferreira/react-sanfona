'use strict';

import React, { Component, PropTypes } from 'react';
import uuid from 'uuid';

export default class AccordionItem extends Component {

  componentWillMount() {
    this.id = uuid.v4();
  }

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
      'aria-controls': `react-sanfona-item-body-${ this.id }`,
      className: 'react-sanfona-item-title',
      id: `react-safona-item-title-${ this.id }`
    };
  }

  getBodyProps() {
    return {
      'aria-labelledby': `react-safona-item-title-${ this.id }`,
      className: 'react-sanfona-item-body',
      id: `react-safona-item-body-${ this.id }`
    };
  }

  render() {
    return (
      <div {...this.getItemProps()}>
        <h3 {...this.getTitleProps()}>
          {this.props.title}
        </h3>
        <div {...this.getBodyProps()}>
          {this.props.children}
        </div>
      </div>
    );
  }

}

AccordionItem.propTypes = {
  expanded: React.PropTypes.bool,
  title: React.PropTypes.string
};
