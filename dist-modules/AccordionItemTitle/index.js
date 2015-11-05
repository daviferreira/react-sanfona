'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var AccordionItemTitle = (function (_Component) {
  _inherits(AccordionItemTitle, _Component);

  function AccordionItemTitle() {
    _classCallCheck(this, AccordionItemTitle);

    _Component.apply(this, arguments);
  }

  AccordionItemTitle.prototype.render = function render() {
    var style = {
      cursor: 'pointer',
      margin: 0,
      color: this.props.titleColor
    };

    return _react2['default'].createElement(
      'h3',
      { 'aria-controls': 'react-sanfona-item-body-' + this.props.uuid,
        className: 'react-sanfona-item-title',
        id: 'react-safona-item-title-' + this.props.uuid,
        onClick: this.props.onClick,
        style: style },
      this.props.title
    );
  };

  return AccordionItemTitle;
})(_react.Component);

exports['default'] = AccordionItemTitle;

AccordionItemTitle.propTypes = {
  onClick: _react.PropTypes.func,
  title: _react.PropTypes.string,
  uuid: _react.PropTypes.string
};
module.exports = exports['default'];