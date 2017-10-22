'use strict';

import className from 'classnames';
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
      overflow: props.expanded ? 'visible' : 'hidden',
      duration: 300,
    };
  }

  componentWillMount() {
    this.uuid = this.props.uuid || uuid.v4();
  }

  componentDidMount() {
    this.setMaxHeight();
  }

  componentDidUpdate(prevProps) {
    const { expanded, disabled, children } = this.props;

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
    const { onExpand, slug } = this.props;

    this.setMaxHeight();

    if (onExpand) {
      slug ? onExpand(slug, index) : onExpand(index);
    }
  }

  handleCollapse() {
    const { onClose, slug } = this.props;

    this.setMaxHeight();

    if (onClose) {
      slug ? onClose(slug, index) : onClose(index);
    }
  }

  setMaxHeight() {
    clearTimeout(this.timeout);

    const bodyNode = ReactDOM.findDOMNode(this.refs.body);
    const images = bodyNode.querySelectorAll('img');

    if (images.length > 0) {
      return this.preloadImages(bodyNode, images);
    }

    this.setState({
      maxHeight: this.props.expanded ? bodyNode.scrollHeight + 'px' : 0,
      overflow: 'hidden'
    });

    if (this.props.expanded) {
      this.timeout = setTimeout(() => {
        this.setState({
          overflow: 'visible'
        });
      }, this.state.duration);
    }
  }

  // Wait for images to load before calculating maxHeight
  preloadImages(node, images = []) {
    let imagesLoaded = 0;
    const imgLoaded = () => {
      imagesLoaded++;

      if (imagesLoaded === images.length) {
        this.setState({
          maxHeight: this.props.expanded ? node.scrollHeight + 'px' : 0,
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
    const props = {
      className: className(
        'react-sanfona-item',
        this.props.className,
        {
          'react-sanfona-item-expanded':
            this.props.expanded && !this.props.disabled,
        },
        this.props.expandedClassName && {
          [this.props.expandedClassName]: this.props.expanded,
        },
        { 'react-sanfona-item-disabled': this.props.disabled },
        this.props.disabledClassName && {
          [this.props.disabledClassName]: this.props.disabled,
        }
      ),
      role: 'tabpanel',
      style: this.props.style,
    };

    if (this.props.expanded) {
      props['aria-expanded'] = true;
    } else {
      props['aria-hidden'] = true;
    }

    return props;
  }

  render() {
    return (
      <this.props.rootTag {...this.getProps()} ref="item">
        <AccordionItemTitle
          className={this.props.titleClassName}
          title={this.props.title}
          onClick={this.props.disabled ? null : this.props.onClick}
          titleColor={this.props.titleColor}
          rootTag={this.props.titleTag}
          uuid={this.uuid}
        />
        <AccordionItemBody
          maxHeight={this.state.maxHeight}
          duration={this.state.duration}
          className={this.props.bodyClassName}
          overflow={this.state.overflow}
          ref="body"
          rootTag={this.props.bodyTag}
          uuid={this.uuid}
        >
          {this.props.children}
        </AccordionItemBody>
      </this.props.rootTag>
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
  className: PropTypes.string,
  expanded: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  expandedClassName: PropTypes.string,
  style: PropTypes.object,
  titleClassName: PropTypes.string,
  disabled: PropTypes.bool,
  disabledClassName: PropTypes.string,
  uuid: PropTypes.string,
  rootTag: PropTypes.string,
  titleTag: PropTypes.string,
  bodyTag: PropTypes.string,
  index: PropTypes.number.isRequired
};
