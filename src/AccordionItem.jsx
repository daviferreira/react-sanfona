'use strict';

import className from 'classnames';
import React, { Component, PropTypes } from 'react';
import uuid from 'uuid';

import AccordionItemBody from './AccordionItemBody';
import AccordionItemTitle from './AccordionItemTitle';

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
    this.setState({ overflow: 'visible' });
  }

  setMaxHeight() {
    var bodyNode = React.findDOMNode(this.refs.body);

    this.setState({
      maxHeight: this.props.expanded ? bodyNode.scrollHeight + 'px' : 0,
      overflow: 'hidden'
    });
  }

  getProps() {
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

  render() {
    return (
      <div {...this.getProps()} ref="item">
        <AccordionItemTitle title={this.props.title}
          onClick={this.props.onClick}
          uuid={this.uuid} />
        <AccordionItemBody maxHeight={this.state.maxHeight}
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
  expanded: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string
};
