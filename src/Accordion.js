'use strict';

import React, { Component, PropTypes } from 'react';

export default class Accordion extends Component {

  constructor(props) {
    super(props);
    this.state = { selectedItem: props.selectedItem || 0 };
  }

  handleClick(index) {
    this.setState({ selectedItem: index });
  }

  renderItems() {
    return this.props.children.map((item, index) => {
      return React.addons.cloneWithProps(item, {
        expanded: this.state.selectedItem === index,
        key: index,
        onClick: this.handleClick.bind(this, index)
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
  selectedItem: PropTypes.number
};
