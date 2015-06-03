'use strict';

import React, { Component, PropTypes } from 'react/addons';
import uuid from 'uuid';

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
        itemId: uuid.v1(),
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
