'use strict';

import React, { Component, PropTypes } from 'react';

export class AccordionItem extends Component {

  render() {
    return (
      <div className="react-sanfona-item">
        {this.props.children}
      </div>
    );
  }

}

export class AccordionItemTitle extends Component {

  render() {
    return (
      <h3>{this.props.children}</h3>
    )
  }

}

export class AccordionItemContent extends Component {

  render() {
    return (
      <div className="react-sanfona-item-content">
        {this.props.children}
      </div>
    )
  }

}
