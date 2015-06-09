'use strict';

import React, { Component, PropTypes } from 'react';

export default class Accordion extends Component {

  constructor(props) {
    super(props);

    let selectedItem = props.selectedItem || 0;

    if (props.allowMultiple) {
      this.activeItems = [selectedItem];
    }

    this.state = { selectedItem: selectedItem };
  }

  componentDidMount() {
    // allow overflow for absolute positioned elements inside
    // the item body, but only after animation is complete
    React.findDOMNode(this).addEventListener('transitionend', () => {
      if (this.state.selectedItem !== -1) {
        this.refs[`item-${ this.state.selectedItem }`].allowOverflow();
      }
    });
  }

  handleClick(index) {
    if (this.props.allowMultiple) {
      let position = this.activeItems.indexOf(index);
      if (position !== -1) {
        this.activeItems.splice(position, 1);
        index = -1;
      } else {
        this.activeItems.push(index);
      }
    } else if (index === this.state.selectedItem) {
      index = -1;
    }

    this.setState({ selectedItem: index });
  }

  renderItems() {
    if (!this.props.children) {
      return null;
    }

    return this.props.children.map((item, index) => {
      let expanded = this.state.selectedItem === index ||
                      (this.props.allowMultiple &&
                        this.activeItems.indexOf(index) !== -1);

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
