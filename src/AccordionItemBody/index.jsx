'use strict';

import className from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AccordionItemBody extends Component {
  render() {
    const style = {
      maxHeight: this.props.maxHeight,
      overflow: this.props.overflow,
      transition: `max-height ${this.props.duration}ms ease`,
    };

    return (
      <div
        aria-labelledby={`react-safona-item-title-${this.props.uuid}`}
        className={className('react-sanfona-item-body', this.props.className)}
        id={`react-safona-item-body-${this.props.uuid}`}
        style={style}
      >
        <div className="react-sanfona-item-body-wrapper">
          {this.props.children}
        </div>
      </div>
    );
  }
}

AccordionItemBody.propTypes = {
  className: PropTypes.string,
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  duration: PropTypes.number,
  overflow: PropTypes.string,
  uuid: PropTypes.string,
};
