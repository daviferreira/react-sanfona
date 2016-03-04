'use strict';

import className from 'classnames';
import React, { Component, PropTypes } from 'react';
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
    this.uuid = uuid.v4();
  }

  componentDidMount() {
    this.setMaxHeight();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.expanded !== this.props.expanded) {
      this.setMaxHeight();
    }
  }

  allowOverflow() {
    this.setState({
      maxHeight: 'none',
      overflow: 'visible'
    });
  }

  updateState(node) {
    if (!this.props.expanded) {
      this.setState({
        maxHeight: node.scrollHeight + 'px'
      });
    }

    setTimeout(() => this.setState({
      maxHeight: this.props.expanded ? node.scrollHeight + 'px' : 0,
      overflow: 'hidden'
    }), 0);
  }

  setMaxHeight() {
    var bodyNode = ReactDOM.findDOMNode(this.refs.body);
    var images = bodyNode.querySelectorAll('img');

    if (images.length > 0) {
      this.preloadImages(bodyNode, images);
      return;
    }

    this.updateState(bodyNode);
  }

  // Wait for images to load before calculating maxHeight
  preloadImages(node, images) {
    var imagesLoaded = 0;

    var imgLoaded = () => {
      imagesLoaded++;

      if (imagesLoaded === images.length) {
        this.updateState(node);
      }
    };

    for (let i = 0; i < images.length; i += 1) {
      let img = new Image();
      img.src = images[i].src;
      img.onload = img.onerror = imgLoaded;
    }
  }

  getProps() {
    var props = {
      className: className([
        'react-sanfona-item',
        this.props.className,
        { 'react-sanfona-item-expanded': this.props.expanded },
        { [this.props.expandedClassName]: this.props.expanded }
      ]),
      role: 'tabpanel',
      style: this.props.style
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
      <div {...this.getProps()} ref="item">
        <AccordionItemTitle
          className={this.props.titleClassName}
          title={this.props.title}
          onClick={this.props.onClick}
          titleColor= {this.props.titleColor}
          uuid={this.uuid} />
        <AccordionItemBody maxHeight={this.state.maxHeight}
          className={this.props.bodyClassName}
          overflow={this.state.overflow}
          ref="body"
          uuid={this.uuid}>
          {this.props.children}
        </AccordionItemBody>
      </div>
    );
  }

}

AccordionItem.propTypes = {
  bodyClassName: PropTypes.string,
  className: PropTypes.string,
  expanded: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string,
  expandedClassName: PropTypes.string,
  style: PropTypes.object,
  titleClassName: PropTypes.string
};
