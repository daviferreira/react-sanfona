'use strict';

import cx from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getChildrenActiveItems, getActiveItems } from './utils';

// https://stackoverflow.com/a/22395463/338762
function isSame(array1, array2) {
  return (
    array1.length === array2.length &&
    array1.every((element, index) => {
      return element === array2[index];
    })
  );
}

export default class Accordion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItems: getActiveItems(props.children, props.allowMultiple)
    };
  }

  componentWillReceiveProps({ children, allowMultiple }) {
    if (
      !isSame(
        getChildrenActiveItems(this.props.children),
        getChildrenActiveItems(children)
      )
    ) {
      this.setState({
        activeItems: getActiveItems(children, allowMultiple)
      });
    }
  }

  handleClick(index) {
    const {
      allowMultiple,
      children,
      onChange,
      openNextAccordionItem
    } = this.props;

    // clone active items state array
    let activeItems = this.state.activeItems.slice(0);

    const position = activeItems.indexOf(index);

    if (position !== -1) {
      activeItems.splice(position, 1);

      if (openNextAccordionItem && index !== children.length - 1) {
        activeItems.push(index + 1);
      }
    } else if (allowMultiple) {
      activeItems.push(index);
    } else {
      activeItems = [index];
    }

    const newState = {
      activeItems
    };

    this.setState(newState);

    if (onChange) {
      onChange(newState);
    }
  }

  renderItems() {
    const { children } = this.props;

    if (!children) {
      return null;
    }

    const { activeItems } = this.state;

    return children.filter(c => c).map((item, index) => {
      const { props: { disabled } } = item;
      const isExpanded = !disabled && activeItems.indexOf(index) !== -1;

      return React.cloneElement(item, {
        expanded: isExpanded,
        index,
        onClick: this.handleClick.bind(this, index),
        ref: `item-${index}`
      });
    });
  }

  render() {
    const { className, style, rootTag: Root } = this.props;

    return (
      <Root
        className={cx('react-sanfona', className)}
        role="tablist"
        style={style}
      >
        {this.renderItems()}
      </Root>
    );
  }
}

Accordion.defaultProps = {
  activeItems: [0],
  allowMultiple: false,
  rootTag: 'div'
};

Accordion.propTypes = {
  allowMultiple: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string,
  onChange: PropTypes.func,
  openNextAccordionItem: PropTypes.bool,
  style: PropTypes.object,
  rootTag: PropTypes.string
};
