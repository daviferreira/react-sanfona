'use strict';

import cx from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AccordionItemTitle extends Component {
  render() {
    const { className, uuid, onClick, rootTag: Root, titleColor } = this.props;

    const style = {
      color: titleColor,
      cursor: 'pointer',
      margin: 0
    };

    const { title } = this.props;

    if (typeof title === 'object') {
      return React.cloneElement(title, {
        onClick: onClick,
        id: `react-safona-item-title-${uuid}`,
        'aria-controls': `react-sanfona-item-body-${uuid}`
      });
    }

    return (
      <Root
        aria-controls={`react-sanfona-item-body-${uuid}`}
        className={cx('react-sanfona-item-title', className)}
        id={`react-safona-item-title-${uuid}`}
        onClick={onClick}
        style={style}
      >
        {title}
      </Root>
    );
  }
}

AccordionItemTitle.defaultProps = {
  rootTag: 'h3'
};

AccordionItemTitle.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  rootTag: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  titleColor: PropTypes.string,
  uuid: PropTypes.string
};
