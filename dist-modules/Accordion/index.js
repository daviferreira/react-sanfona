'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Accordion = (function (_Component) {
  function Accordion(props) {
    _classCallCheck(this, Accordion);

    _Component.call(this, props);

    var selectedIndex = props.selectedIndex || 0;
    var state = { selectedIndex: selectedIndex };

    if (props.allowMultiple) {
      state.activeItems = [selectedIndex];
    }

    this.state = state;
  }

  _inherits(Accordion, _Component);

  Accordion.prototype.componentDidMount = function componentDidMount() {
    var _this = this;

    if (this.refs['item-' + this.state.selectedIndex]) {
      this.refs['item-' + this.state.selectedIndex].allowOverflow();
    }

    // allow overflow for absolute positioned elements inside
    // the item body, but only after animation is complete
    _react2['default'].findDOMNode(this).addEventListener('transitionend', function () {
      if (_this.state.selectedIndex !== -1) {
        _this.refs['item-' + _this.state.selectedIndex].allowOverflow();
      }
    });
  };

  Accordion.prototype.handleClick = function handleClick(index) {
    var newState = { selectedIndex: index };

    if (this.props.allowMultiple) {
      // clone active items state array
      newState.activeItems = this.state.activeItems.slice(0);

      var position = newState.activeItems.indexOf(index);

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
  };

  Accordion.prototype.renderItems = function renderItems() {
    var _this2 = this;

    if (!this.props.children) {
      return null;
    }

    return this.props.children.map(function (item, index) {
      var expanded = _this2.state.selectedIndex === index || _this2.props.allowMultiple && _this2.state.activeItems.indexOf(index) !== -1;

      return _react2['default'].cloneElement(item, {
        expanded: expanded,
        key: index,
        onClick: _this2.handleClick.bind(_this2, index),
        ref: 'item-' + index
      });
    });
  };

  Accordion.prototype.render = function render() {
    return _react2['default'].createElement(
      'div',
      { className: 'react-sanfona', role: 'tablist' },
      this.renderItems()
    );
  };

  return Accordion;
})(_react.Component);

exports['default'] = Accordion;

Accordion.defaultProps = {
  allowMultiple: false
};

Accordion.propTypes = {
  allowMultiple: _react.PropTypes.bool,
  selectedIndex: _react.PropTypes.number
};
module.exports = exports['default'];