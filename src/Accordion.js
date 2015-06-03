'use strict';

import React, { Component, PropTypes } from 'react/addons';

// TODO: PropTypes
export default class Accordion extends Component {

  constructor(props) {
    super(props);
    this.state = { selectedItem: props.selectedItem || 0 };
  }

  renderItems() {
    return this.props.children.map((item, index) => {
      return React.addons.cloneWithProps(item, {
        key: index,
        expanded: this.state.selectedItem === index
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
