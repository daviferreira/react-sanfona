'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var arrayify = function arrayify(obj) {
  return [].concat(obj);
};

// removes duplicate from array
var dedupeArr = function dedupeArr(arr) {
  return arr.filter(function (item, index, inputArray) {
    return inputArray.indexOf(item) === index;
  });
};

var Accordion = function (_Component) {
  _inherits(Accordion, _Component);

  function Accordion(props) {
    _classCallCheck(this, Accordion);

    var _this = _possibleConstructorReturn(this, (Accordion.__proto__ || Object.getPrototypeOf(Accordion)).call(this, props));

    _this.updateActiveItems = _this.updateActiveItems.bind(_this);
    _this.updateActiveItems(props);
    return _this;
  }

  _createClass(Accordion, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.updateActiveItems(nextProps);
    }
  }, {
    key: 'updateActiveItems',
    value: function updateActiveItems(props) {
      var activeItems = arrayify(props.activeItems);

      // can't have multiple active items, just use the first one
      if (!props.allowMultiple) activeItems = [activeItems[0]];

      this.state = {
        activeItems: activeItems
      };
    }
  }, {
    key: 'handleClick',
    value: function handleClick(index) {
      var newState = {};

      // clone active items state array
      newState.activeItems = this.state.activeItems.slice(0);

      var position = newState.activeItems.indexOf(index);

      if (position !== -1) {
        newState.activeItems.splice(position, 1);

        if (this.props.openNextAccordionItem && index !== this.props.children.length - 1) {
          newState.activeItems.push(index + 1);
        }
      } else if (this.props.allowMultiple) {
        newState.activeItems.push(index);
      } else {
        newState.activeItems = [index];
      }

      if (this.props.onChange) {
        this.props.onChange(newState);
      }

      // removes duplicate items in activeItems array
      newState.activeItems = dedupeArr(newState.activeItems);
      this.setState(newState);
    }
  }, {
    key: 'renderItems',
    value: function renderItems() {
      var _this2 = this;

      if (!this.props.children) {
        return null;
      }

      var children = arrayify(this.props.children);
      return children.map(function (item, index) {
        var key = _this2.props.openNextAccordionItem ? index : item.props.slug || index;
        var expanded = _this2.state.activeItems.indexOf(key) !== -1 && !item.props.disabled;

        return _react2.default.cloneElement(item, {
          expanded: expanded,
          key: key,
          onClick: _this2.handleClick.bind(_this2, key),
          onKeyDown: _this2.handleClick.bind(_this2, key),
          ref: 'item-' + key,
          index: index
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('react-sanfona', this.props.className),
          role: 'tablist',
          style: this.props.style },
        this.renderItems()
      );
    }
  }]);

  return Accordion;
}(_react.Component);

exports.default = Accordion;


Accordion.defaultProps = {
  activeItems: [0],
  allowMultiple: false
};

Accordion.propTypes = {
  allowMultiple: _react.PropTypes.bool,
  activeItems: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.array]),
  className: _react.PropTypes.string,
  onChange: _react.PropTypes.func,
  style: _react.PropTypes.object
};