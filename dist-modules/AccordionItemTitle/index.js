'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AccordionItemTitle = function (_Component) {
  _inherits(AccordionItemTitle, _Component);

  function AccordionItemTitle() {
    _classCallCheck(this, AccordionItemTitle);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AccordionItemTitle).apply(this, arguments));
  }

  _createClass(AccordionItemTitle, [{
    key: 'render',
    value: function render() {
      var style = {
        cursor: 'pointer',
        margin: 0,
        color: this.props.titleColor
      };

      return _react2.default.createElement(
        'h3',
        { 'aria-controls': 'react-sanfona-item-body-' + this.props.uuid,
          className: 'react-sanfona-item-title',
          id: 'react-safona-item-title-' + this.props.uuid,
          onClick: this.props.onClick,
          style: style },
        this.props.title
      );
    }
  }]);

  return AccordionItemTitle;
}(_react.Component);

exports.default = AccordionItemTitle;

AccordionItemTitle.propTypes = {
  onClick: _react.PropTypes.func,
  title: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node]),
  uuid: _react.PropTypes.string
};