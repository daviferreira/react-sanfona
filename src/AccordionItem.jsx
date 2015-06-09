'use strict';

import className from 'classnames';
import React, { Component, PropTypes } from 'react';
import uuid from 'uuid';

export default class AccordionItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      maxHeight: props.expanded ? 'none' : 0,
      overflow: props.expanded ? 'visible' : 'hidden'
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
      id: `react-safona-item-title-${ this.id }`,
      style: {
        cursor: 'pointer',
        margin: 0
      }
    };
  }

  getBodyProps() {
    return {
      'aria-labelledby': `react-safona-item-title-${ this.id }`,
      className: 'react-sanfona-item-body',
      id: `react-safona-item-body-${ this.id }`,
      style: {
        maxHeight: this.state.maxHeight,
        overflow: this.state.overflow,
        transition: 'max-height .3s ease'
      }
    };
  }

  render() {
    return (
      <div {...this.getItemProps()} ref="item">
        <h3 {...this.getTitleProps()} onClick={this.props.onClick}>
          {this.props.title}
        </h3>
        <div {...this.getBodyProps()} ref="body">
          <div className="react-sanfona-item-body-wrapper">
            {this.props.children}
          </div>
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
