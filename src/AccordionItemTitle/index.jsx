'use strict';

import className from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AccordionItemTitle extends Component {

  render() {
    var style = {
      cursor: 'pointer',
      margin: 0,
      color : this.props.titleColor
    };

    const { title } = this.props;
    const { customTitle } = this.props;
    if (typeof title === 'object') {
      return React.cloneElement(title, {
        onClick: this.props.onClick,
        id: `react-safona-item-title-${ this.props.uuid }`,
        'aria-controls': `react-sanfona-item-body-${ this.props.uuid }`
      })
    }

    return (
      <h3 aria-controls={`react-sanfona-item-body-${ this.props.uuid }`}
          className={className('react-sanfona-item-title', this.props.className)}
          id={`react-safona-item-title-${ this.props.uuid }`}
          style={style}>
        <label onClick={this.props.onClick}>
          {title}
          </label>
        <label>
          {customTitle}
          </label>
      </h3>
    )
  }

}

AccordionItemTitle.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  customTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  uuid: PropTypes.string
};
