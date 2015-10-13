'use strict';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class Accordion extends Component {

  constructor(props) {
    super(props);

    var selectedIndex = props.selectedIndex || 0;
    var state = { selectedIndex: selectedIndex };

    if (props.allowMultiple) {
      state.activeItems = [selectedIndex];
    }

    this.state = state;
  }

  componentDidMount() {
    if (this.refs[`item-${ this.state.selectedIndex }`]) {
      this.refs[`item-${ this.state.selectedIndex }`].allowOverflow();
    }

    // allow overflow for absolute positioned elements inside
    // the item body, but only after animation is complete
    ReactDOM.findDOMNode(this).addEventListener('transitionend', () => {
      if (this.state.selectedIndex !== -1) {
        this.refs[`item-${ this.state.selectedIndex }`].allowOverflow();
      }
    });
  }

  handleClick(index) {
    var newState = { selectedIndex: index };

    if (this.props.allowMultiple) {
      // clone active items state array
      newState.activeItems = this.state.activeItems.slice(0);

      let position = newState.activeItems.indexOf(index);

      if (position !== -1) {
        newState.activeItems.splice(position, 1);
        newState.selectedIndex = -1;
      } else {
        newState.activeItems.push(index);
      }
    } else if (index === this.state.selectedIndex) {
      newState.selectedIndex = -1;
    }

    this.setState(newState);
  }

  renderItems() {
    if (!this.props.children) {
      return null;
    }

    return this.props.children.map((item, index) => {
      let expanded = this.state.selectedIndex === index ||
                      (this.props.allowMultiple &&
                        this.state.activeItems.indexOf(index) !== -1);

      return React.cloneElement(item, {
        expanded: expanded,
        key: index,
        onClick: this.handleClick.bind(this, index),
        ref: `item-${ index }`
      });
    });
  }

  render() {
    return (
      <div className="react-sanfona" role="tablist">
        {this.renderItems()}
      </div>
    );
  }

}

Accordion.defaultProps = {
  allowMultiple: false
};

Accordion.propTypes = {
  allowMultiple: PropTypes.bool,
  selectedIndex: PropTypes.number
};
