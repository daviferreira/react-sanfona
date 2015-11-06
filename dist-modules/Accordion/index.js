'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var Accordion = (function (_Component) {
  _inherits(Accordion, _Component);

  function Accordion(props) {
    _classCallCheck(this, Accordion);

    _Component.call(this, props);

    var activeItems = !Array.isArray(props.activeItems) ? [props.activeItems] : props.activeItems;

    this.state = { activeItems: activeItems };
  }

  Accordion.prototype.componentDidMount = function componentDidMount() {
    var _this = this;

    this.state.activeItems.forEach(function (index) {
      if (_this.refs['item-' + index]) {
        _this.refs['item-' + index].allowOverflow();
      }
    });

    // allow overflow for absolute positioned elements inside
    // the item body, but only after animation is complete
    _reactDom2['default'].findDOMNode(this).addEventListener('transitionend', function () {
      _this.state.activeItems.forEach(function (index) {
        _this.refs['item-' + index].allowOverflow();
      });
    });
  };

  Accordion.prototype.handleClick = function handleClick(index) {
    var newState = {};

    // clone active items state array
    newState.activeItems = this.state.activeItems.slice(0);

    var position = newState.activeItems.indexOf(index);

    if (position !== -1) {
      newState.activeItems.splice(position, 1);
    } else if (this.props.allowMultiple) {
      newState.activeItems.push(index);
    } else {
      newState.activeItems = [index];
    }

    this.setState(newState);
  };

  Accordion.prototype.renderItems = function renderItems() {
    var _this2 = this;

    if (!this.props.children) {
      return null;
    }

    return this.props.children.map(function (item, index) {
      var expanded = _this2.state.activeItems.indexOf(index) !== -1;

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
  activeItems: [0],
  allowMultiple: false
};

Accordion.propTypes = {
  allowMultiple: _react.PropTypes.bool,
  activeItems: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.array])
};
module.exports = exports['default'];