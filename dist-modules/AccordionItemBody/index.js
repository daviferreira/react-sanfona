'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var AccordionItemBody = (function (_Component) {
  _inherits(AccordionItemBody, _Component);

  function AccordionItemBody() {
    _classCallCheck(this, AccordionItemBody);

    _Component.apply(this, arguments);
  }

  AccordionItemBody.prototype.render = function render() {
    var style = {
      maxHeight: this.props.maxHeight,
      overflow: this.props.overflow,
      transition: 'max-height .3s ease'
    };

    return _react2['default'].createElement(
      'div',
      { 'aria-labelledby': 'react-safona-item-title-' + this.props.uuid,
        className: 'react-sanfona-item-body',
        id: 'react-safona-item-body-' + this.props.uuid,
        style: style },
      _react2['default'].createElement(
        'div',
        { className: 'react-sanfona-item-body-wrapper' },
        this.props.children
      )
    );
  };

  return AccordionItemBody;
})(_react.Component);

exports['default'] = AccordionItemBody;

AccordionItemBody.propTypes = {
  maxHeight: _react.PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
  overflow: _react.PropTypes.string,
  uuid: _react.PropTypes.string
};
module.exports = exports['default'];