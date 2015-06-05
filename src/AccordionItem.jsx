'use strict';

require('./AccordionItem.scss');

import className from 'classnames';
import React, { Component, PropTypes } from 'react';
import uuid from 'uuid';

export default class AccordionItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      style: { maxHeight: props.expanded ? 'none' : 0 }
    };
  }

  componentWillMount() {
    this.id = uuid.v4();
  }

  componentDidMount() {
    this.setMaxHeight();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.expanded !== this.props.expanded) {
      this.setMaxHeight();
    }
  }

  setMaxHeight() {
    var maxHeight = this.props.expanded ? React.findDOMNode(this).offsetHeight + 'px' : 0;

    this.setState({
      style: {
        maxHeight: maxHeight,
        overflow: maxHeight === 0 ? 'hidden' : 'auto'
      }
    });
  }

  getItemProps() {
    var props = {
      className: className([
        'react-sanfona-item',
        { 'react-sanfona-item-expanded': this.props.expanded }
      ]),
      role: 'tabpanel'
    };

    if (this.props.expanded) {
      props['aria-expanded'] = true;
    } else {
      props['aria-hidden'] = true;
    }

    return props;
  }

  getTitleProps() {
    return {
      'aria-controls': `react-sanfona-item-body-${ this.id }`,
      className: 'react-sanfona-item-title',
      id: `react-safona-item-title-${ this.id }`
    };
  }

  getBodyProps() {
    return {
      'aria-labelledby': `react-safona-item-title-${ this.id }`,
      className: 'react-sanfona-item-body',
      id: `react-safona-item-body-${ this.id }`,
      style: this.state.style
    };
  }

  render() {
    return (
      <div {...this.getItemProps()}>
        <h3 {...this.getTitleProps()} onClick={this.props.onClick}>
          {this.props.title}
        </h3>
        <div {...this.getBodyProps()}>
          {this.props.children}
        </div>
      </div>
    );
  }

}

AccordionItem.propTypes = {
  expanded: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string
};
