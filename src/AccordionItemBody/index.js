'use strict';

import cx from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AccordionItemBody extends Component {
  render() {
    const {
      children,
      className,
      duration,
      easing,
      expanded,
      maxHeight,
      overflow,
      rootTag: Root,
      uuid
    } = this.props;

    const style = {
      maxHeight,
      overflow,
      transition: `max-height ${duration}ms ${easing}`
    };

    return (
      <Root
        aria-hidden={!expanded}
        aria-labelledby={`react-sanfona-item-title-${uuid}`}
        className={cx('react-sanfona-item-body', className)}
        id={`react-sanfona-item-body-${uuid}`}
        style={style}
      >
        <div className="react-sanfona-item-body-wrapper">{children}</div>
      </Root>
    );
  }
}

AccordionItemBody.defaultProps = {
  rootTag: 'div'
};

AccordionItemBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  duration: PropTypes.number,
  easing: PropTypes.string,
  expanded: PropTypes.bool,
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  overflow: PropTypes.string,
  rootTag: PropTypes.string,
  uuid: PropTypes.string
};
