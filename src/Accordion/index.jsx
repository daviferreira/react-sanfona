'use strict';

import React, { Component, PropTypes } from 'react';

export default class Accordion extends Component {

  constructor(props) {
    super(props);

    let selectedItem = props.selectedItem || 0;
    let state = { selectedItem: selectedItem };


    if (props.allowMultiple) {
      state.activeItems = [selectedItem];
    }

    this.state = state;
  }

  componentDidMount() {
    this.refs[`item-${ this.state.selectedItem }`].allowOverflow();

    // allow overflow for absolute positioned elements inside
    // the item body, but only after animation is complete
    React.findDOMNode(this).addEventListener('transitionend', () => {
      if (this.state.selectedItem !== -1) {
        this.refs[`item-${ this.state.selectedItem }`].allowOverflow();
      }
    });
  }

  handleClick(index) {
    var newState = { selectedItem: index };

    if (this.props.allowMultiple) {
      // clone active items state array
      newState.activeItems = this.state.activeItems.slice(0);

      let position = newState.activeItems.indexOf(index);

      if (position !== -1) {
        newState.activeItems.splice(position, 1);
        newState.selectedItem = -1;
      } else {
        newState.activeItems.push(index);
      }
    } else if (index === this.state.selectedItem) {
      newState.selectedItem = -1;
    }

    this.setState(newState);
  }

  renderItems() {
    if (!this.props.children) {
      return null;
    }

    return this.props.children.map((item, index) => {
      let expanded = this.state.selectedItem === index ||
                      (this.props.allowMultiple &&
                        this.state.activeItems.indexOf(index) !== -1);

      return React.addons.cloneWithProps(item, {
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

Accordion.propTypes = {
  allowMultiple: PropTypes.bool,
  selectedItem: PropTypes.number
};
