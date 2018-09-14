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
    this.setMaxHeight(false);
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
      this.setMaxHeight(false);
    }
  }

  handleExpand() {
    const { index, onExpand, slug } = this.props;

    this.setMaxHeight(false);

    if (onExpand) {
      slug ? onExpand(slug, index) : onExpand(index);
    }
  }

  handleCollapse() {
    const { index, onClose, slug } = this.props;

    this.setMaxHeight(true);

    if (onClose) {
      slug ? onClose(slug, index) : onClose(index);
    }
  }

  setMaxHeight(collapse) {
    const { duration, expanded } = this.props;

    clearTimeout(this.timeout);

    const bodyNode = ReactDOM.findDOMNode(this.refs.body);
    const images = bodyNode.querySelectorAll('img');

    if (images.length > 0) {
      return this.preloadImages(bodyNode, images);
    }

    this.setState({
      maxHeight: expanded || collapse ? bodyNode.scrollHeight + 'px' : 0,
      overflow: 'hidden'
    });

    if (expanded) {
      this.timeout = setTimeout(() => {
        this.setState({
          maxHeight: 'none',
          overflow: 'visible'
        });
      }, duration);
    } else {
      this.timeout = setTimeout(() => {
        this.setState({
          maxHeight: 0
        });
      }, 0);
    }
  }

  // Wait for images to load before calculating maxHeight
  preloadImages(node, images = []) {
    const { duration, expanded } = this.props;

    let imagesLoaded = 0;

    const imgLoaded = () => {
      imagesLoaded++;

      if (imagesLoaded === images.length) {
        if (expanded) {
          this.setState({
            maxHeight: `${node.scrollHeight}px`
          });

          // wait for animation
          setTimeout(() => {
            this.setState({
              overflow: 'visible'
            });
          }, duration);
        } else {
          this.setState({
            maxHeight: 0,
            overflow: 'hidden'
          });
        }
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
      onMouseOver,
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
          expanded={this.props.expanded}
          onClick={disabled ? null : onClick}
          onMouseOver={disabled ? null : onMouseOver}
          rootTag={titleTag}
          title={title}
          uuid={this.uuid}
        />
        <AccordionItemBody
          className={bodyClassName}
          duration={duration}
          easing={easing}
          expanded={this.props.expanded}
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
  onMouseOver: PropTypes.func,
  onClose: PropTypes.func,
  onExpand: PropTypes.func,
  onHover: PropTypes.func,
  rootTag: PropTypes.string,
  slug: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  titleClassName: PropTypes.string,
  titleTag: PropTypes.string,
  uuid: PropTypes.string
};
