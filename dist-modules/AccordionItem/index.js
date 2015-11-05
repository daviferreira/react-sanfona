'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _AccordionItemBody = require('../AccordionItemBody');

var _AccordionItemBody2 = _interopRequireDefault(_AccordionItemBody);

var _AccordionItemTitle = require('../AccordionItemTitle');

var _AccordionItemTitle2 = _interopRequireDefault(_AccordionItemTitle);

var AccordionItem = (function (_Component) {
  _inherits(AccordionItem, _Component);

  function AccordionItem(props) {
    _classCallCheck(this, AccordionItem);

    _Component.call(this, props);
    this.state = {
      maxHeight: props.expanded ? 'none' : 0,
      overflow: props.expanded ? 'visible' : 'hidden'
    };
  }

  AccordionItem.prototype.componentWillMount = function componentWillMount() {
    this.uuid = _uuid2['default'].v4();
  };

  AccordionItem.prototype.componentDidMount = function componentDidMount() {
    this.setMaxHeight();
  };

  AccordionItem.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.expanded !== this.props.expanded) {
      this.setMaxHeight();
    }
  };

  AccordionItem.prototype.allowOverflow = function allowOverflow() {
    this.setState({ overflow: 'visible' });
  };

  AccordionItem.prototype.setMaxHeight = function setMaxHeight() {
    var bodyNode = _reactDom2['default'].findDOMNode(this.refs.body);
    var images = bodyNode.querySelectorAll('img');

    if (images.length > 0) {
      return this.preloadImages(bodyNode, images);
    }

    this.setState({
      maxHeight: this.props.expanded ? bodyNode.scrollHeight + 'px' : 0,
      overflow: 'hidden'
    });
  };

  // Wait for images to load before calculating maxHeight

  AccordionItem.prototype.preloadImages = function preloadImages(node, images) {
    var _this = this;

    var imagesLoaded = 0;

    var imgLoaded = function imgLoaded() {
      imagesLoaded++;

      if (imagesLoaded === images.length) {
        _this.setState({
          maxHeight: _this.props.expanded ? node.scrollHeight + 'px' : 0,
          overflow: 'hidden'
        });
      }
    };

    for (var i = 0; i < images.length; i += 1) {
      var img = new Image();
      img.src = images[i].src;
      img.onload = img.onerror = imgLoaded;
    }
  };

  AccordionItem.prototype.getProps = function getProps() {
    var props = {
      className: _classnames2['default'](['react-sanfona-item', { 'react-sanfona-item-expanded': this.props.expanded }]),
      role: 'tabpanel'
    };

    if (this.props.expanded) {
      props['aria-expanded'] = true;
    } else {
      props['aria-hidden'] = true;
    }

    return props;
  };

  AccordionItem.prototype.render = function render() {
    return _react2['default'].createElement(
      'div',
      _extends({}, this.getProps(), { ref: 'item' }),
      _react2['default'].createElement(_AccordionItemTitle2['default'], {
        title: this.props.title,
        onClick: this.props.onClick,
        titleColor: this.props.titleColor,
        uuid: this.uuid }),
      _react2['default'].createElement(
        _AccordionItemBody2['default'],
        { maxHeight: this.state.maxHeight,
          overflow: this.state.overflow,
          ref: 'body',
          uuid: this.uuid },
        this.props.children
      )
    );
  };

  return AccordionItem;
})(_react.Component);

exports['default'] = AccordionItem;

AccordionItem.propTypes = {
  expanded: _react.PropTypes.bool,
  onClick: _react.PropTypes.func,
  title: _react.PropTypes.string
};
module.exports = exports['default'];