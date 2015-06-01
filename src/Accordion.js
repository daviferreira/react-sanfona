'use strict';

import React, { Component, PropTypes } from 'react';

export default class Accordion extends Component {

  render() {
    return (
      <div className="react-sanfona">
        {this.props.children}
      </div>
    );
  }

}
