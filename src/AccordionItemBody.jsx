'use strict';

import React, { Component, PropTypes } from 'react';

export default class AccordionItemBody extends Component {

  render() {
    var style = {
      maxHeight: this.props.maxHeight,
      overflow: this.props.overflow,
      transition: 'max-height .3s ease'
    };

    return (
      <div aria-labelledby={`react-safona-item-title-${ this.props.uuid }`}
        className="react-sanfona-item-body"
        id={`react-safona-item-body-${ this.props.uuid }`}
        style={style}>
        <div className="react-sanfona-item-body-wrapper">
          {this.props.children}
        </div>
      </div>
    );
  }

}

AccordionItemBody.propTypes = {
  maxHeight: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
  ]),
  overflow: PropTypes.string,
  uuid: PropTypes.string
};
