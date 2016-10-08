'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AccordionItemBody = function (_Component) {
  _inherits(AccordionItemBody, _Component);

  function AccordionItemBody() {
    _classCallCheck(this, AccordionItemBody);

    return _possibleConstructorReturn(this, (AccordionItemBody.__proto__ || Object.getPrototypeOf(AccordionItemBody)).apply(this, arguments));
  }

  _createClass(AccordionItemBody, [{
    key: 'render',
    value: function render() {
      var style = {
        maxHeight: this.props.maxHeight,
        overflow: this.props.overflow,
        transition: 'max-height ' + this.props.duration + 'ms ease'
      };

      return _react2.default.createElement(
        'div',
        { 'aria-labelledby': 'react-safona-item-title-' + this.props.uuid,
          className: (0, _classnames2.default)('react-sanfona-item-body', this.props.className),
          id: 'react-safona-item-body-' + this.props.uuid,
          style: style },
        _react2.default.createElement(
          'div',
          { className: 'react-sanfona-item-body-wrapper' },
          this.props.children
        )
      );
    }
  }]);

  return AccordionItemBody;
}(_react.Component);

exports.default = AccordionItemBody;


AccordionItemBody.propTypes = {
  className: _react.PropTypes.string,
  maxHeight: _react.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
  duration: _react.PropTypes.number,
  overflow: _react.PropTypes.string,
  uuid: _react.PropTypes.string
};