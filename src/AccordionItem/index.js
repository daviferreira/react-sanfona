'use strict';

import cx from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import uuid from 'uuid';

import AccordionItemBody from '../AccordionItemBody';
import AccordionItemTitle from '../AccordionItemTitle';

export default class AccordionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxHeight: props.expanded ? 'none' : 0,
      overflow: props.expanded ? 'visible' : 'hidden'
    };
  }

  componentWillMount() {
    this.uuid = this.props.uuid || uuid.v4();
  }

  componentDidMount() {
    this.setMaxHeight();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  componentDidUpdate(prevProps) {
    const { children, disabled, expanded } = this.props;

    if (prevProps.expanded !== expanded) {
      if (disabled) return;

      if (expanded) {
        this.handleExpand();
      } else {
        this.handleCollapse();
      }
    } else if (prevProps.children !== children) {
      this.setMaxHeight();
    }
  }

  handleExpand() {
    const { index, onExpand, slug } = this.props;

    this.setMaxHeight();

    if (onExpand) {
      slug ? onExpand(slug, index) : onExpand(index);
    }
  }

  handleCollapse() {
    const { index, onClose, slug } = this.props;

    this.setMaxHeight();

    if (onClose) {
      slug ? onClose(slug, index) : onClose(index);
    }
  }

  setMaxHeight() {
    const { duration, expanded } = this.props;

    clearTimeout(this.timeout);

    const bodyNode = ReactDOM.findDOMNode(this.refs.body);
    const images = bodyNode.querySelectorAll('img');

    if (images.length > 0) {
      return this.preloadImages(bodyNode, images);
    }

    this.setState({
      maxHeight: expanded ? bodyNode.scrollHeight + 'px' : 0,
      overflow: 'hidden'
    });

    if (expanded) {
      this.timeout = setTimeout(() => {
        this.setState({
          maxHeight: 'none',
          overflow: 'visible'
        });
      }, duration);
    }
  }

  // Wait for images to load before calculating maxHeight
  preloadImages(node, images = []) {
    const { expanded } = this.props;

    let imagesLoaded = 0;

    const imgLoaded = () => {
      imagesLoaded++;

      if (imagesLoaded === images.length) {
        this.setState({
          maxHeight: expanded ? node.scrollHeight + 'px' : 0,
          overflow: 'hidden'
        });
      }
    };

    for (let i = 0; i < images.length; i += 1) {
      let img = new Image();
      img.src = images[i].src;
      img.onload = img.onerror = imgLoaded;
    }
  }

  getProps() {
    const {
      className,
      disabled,
      disabledClassName,
      expanded,
      expandedClassName,
      style
    } = this.props;

    const props = {
      [`aria-${expanded ? 'expanded' : 'hidden'}`]: true,
      className: cx(
        'react-sanfona-item',
        className,
        {
          'react-sanfona-item-expanded': expanded && !disabled,
          'react-sanfona-item-disabled': disabled
        },
        expandedClassName && {
          [expandedClassName]: expanded
        },
        disabledClassName && {
          [disabledClassName]: disabled
        }
      ),
      role: 'tabpanel',
      style
    };

    return props;
  }

  render() {
    const {
      bodyClassName,
      bodyTag,
      children,
      disabled,
      duration,
      easing,
      onClick,
      rootTag: Root,
      title,
      titleClassName,
      titleTag
    } = this.props;

    const { maxHeight, overflow } = this.state;

    return (
      <Root {...this.getProps()} ref="item">
        <AccordionItemTitle
          className={titleClassName}
          onClick={disabled ? null : onClick}
          rootTag={titleTag}
          title={title}
          uuid={this.uuid}
        />
        <AccordionItemBody
          className={bodyClassName}
          duration={duration}
          easing={easing}
          maxHeight={maxHeight}
          overflow={overflow}
          ref="body"
          rootTag={bodyTag}
          uuid={this.uuid}
        >
          {children}
        </AccordionItemBody>
      </Root>
    );
  }
}

AccordionItem.defaultProps = {
  rootTag: 'div',
  titleTag: 'h3',
  bodyTag: 'div'
};

AccordionItem.propTypes = {
  bodyClassName: PropTypes.string,
  bodyTag: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  disabledClassName: PropTypes.string,
  duration: PropTypes.number,
  easing: PropTypes.string,
  expanded: PropTypes.bool,
  expandedClassName: PropTypes.string,
  index: PropTypes.number,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  onExpand: PropTypes.func,
  rootTag: PropTypes.string,
  slug: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  titleClassName: PropTypes.string,
  titleTag: PropTypes.string,
  uuid: PropTypes.string
};
