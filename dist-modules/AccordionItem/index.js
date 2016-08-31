'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AccordionItem = function (_Component) {
  _inherits(AccordionItem, _Component);

  function AccordionItem(props) {
    _classCallCheck(this, AccordionItem);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AccordionItem).call(this, props));

    _this.state = {
      maxHeight: props.expanded ? 'none' : 0,
      overflow: props.expanded ? 'visible' : 'hidden',
      duration: 300
    };
    return _this;
  }

  _createClass(AccordionItem, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.uuid = _uuid2.default.v4();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.expanded !== this.props.expanded) {
        if (this.props.expanded) {
          this.maybeExpand();
        } else {
          this.handleCollapse();
        }
      }
    }
  }, {
    key: 'startTransition',
    value: function startTransition() {
      this.setState({
        maxHeight: this.maxHeight,
        overflow: 'hidden'
      });
      clearTimeout(this.timeout);
    }
  }, {
    key: 'maybeExpand',
    value: function maybeExpand() {
      var bodyNode = _reactDom2.default.findDOMNode(this.refs.body);
      var images = bodyNode.querySelectorAll('img');

      if (images.length > 0) {
        this.preloadImages(bodyNode, images);
        return;
      }

      this.handleExpand();
    }
  }, {
    key: 'handleExpand',
    value: function handleExpand() {
      var _this2 = this;

      var onExpand = this.props.onExpand;


      this.startTransition();
      this.timeout = setTimeout(function () {
        _this2.setState({
          maxHeight: 'none',
          overflow: 'visible'
        });

        if (onExpand) {
          onExpand();
        }
      }, this.state.duration);
    }
  }, {
    key: 'handleCollapse',
    value: function handleCollapse() {
      var _this3 = this;

      var onClose = this.props.onClose;


      this.startTransition();
      this.timeout = setTimeout(function () {
        _this3.setState({
          maxHeight: 0,
          overflow: 'hidden'
        });

        if (onClose) {
          onClose();
        }
      }, 0);
    }
  }, {
    key: 'preloadImages',


    // Wait for images to load before calculating maxHeight
    value: function preloadImages(node) {
      var _this4 = this;

      var images = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

      var imagesLoaded = 0;
      var imgLoaded = function imgLoaded() {
        imagesLoaded++;

        if (imagesLoaded === images.length) {
          _this4.handleExpand();
        }
      };

      for (var i = 0; i < images.length; i += 1) {
        var img = new Image();
        img.src = images[i].src;
        img.onload = img.onerror = imgLoaded;
      }
    }
  }, {
    key: 'getProps',
    value: function getProps() {
      var props = {
        className: (0, _classnames2.default)('react-sanfona-item', this.props.className, { 'react-sanfona-item-expanded': this.props.expanded }, this.props.expandedClassName && _defineProperty({}, this.props.expandedClassName, this.props.expanded)),
        role: 'tabpanel',
        style: this.props.style
      };

      if (this.props.expanded) {
        props['aria-expanded'] = true;
      } else {
        props['aria-hidden'] = true;
      }

      return props;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        _extends({}, this.getProps(), { ref: 'item' }),
        _react2.default.createElement(_AccordionItemTitle2.default, {
          className: this.props.titleClassName,
          title: this.props.title,
          onClick: this.props.onClick,
          titleColor: this.props.titleColor,
          uuid: this.uuid }),
        _react2.default.createElement(
          _AccordionItemBody2.default,
          {
            maxHeight: this.state.maxHeight,
            duration: this.state.duration,
            className: this.props.bodyClassName,
            overflow: this.state.overflow,
            ref: 'body',
            uuid: this.uuid },
          this.props.children
        )
      );
    }
  }, {
    key: 'maxHeight',
    get: function get() {
      var body = _reactDom2.default.findDOMNode(this.refs.body);
      return body.scrollHeight + 'px';
    }
  }]);

  return AccordionItem;
}(_react.Component);

exports.default = AccordionItem;


AccordionItem.propTypes = {
  bodyClassName: _react.PropTypes.string,
  className: _react.PropTypes.string,
  expanded: _react.PropTypes.bool,
  onClick: _react.PropTypes.func,
  title: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node]),
  expandedClassName: _react.PropTypes.string,
  style: _react.PropTypes.object,
  titleClassName: _react.PropTypes.string
};