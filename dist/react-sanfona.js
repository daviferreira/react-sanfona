(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("ReactDOM"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "ReactDOM"], factory);
	else if(typeof exports === 'object')
		exports["ReactSanfona"] = factory(require("React"), require("ReactDOM"));
	else
		root["ReactSanfona"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.AccordionItemBody = exports.AccordionItemTitle = exports.AccordionItem = exports.Accordion = undefined;

	var _Accordion2 = __webpack_require__(1);

	var _Accordion3 = _interopRequireDefault(_Accordion2);

	var _AccordionItem2 = __webpack_require__(5);

	var _AccordionItem3 = _interopRequireDefault(_AccordionItem2);

	var _AccordionItemTitle2 = __webpack_require__(7);

	var _AccordionItemTitle3 = _interopRequireDefault(_AccordionItemTitle2);

	var _AccordionItemBody2 = __webpack_require__(6);

	var _AccordionItemBody3 = _interopRequireDefault(_AccordionItemBody2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Accordion = _Accordion3.default;
	exports.AccordionItem = _AccordionItem3.default;
	exports.AccordionItemTitle = _AccordionItemTitle3.default;
	exports.AccordionItemBody = _AccordionItemBody3.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _classnames = __webpack_require__(2);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = '';

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes += ' ' + arg;
				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}

			return classes.substr(1);
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _classnames = __webpack_require__(2);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _AccordionItemBody = __webpack_require__(6);

	var _AccordionItemBody2 = _interopRequireDefault(_AccordionItemBody);

	var _AccordionItemTitle = __webpack_require__(7);

	var _AccordionItemTitle2 = _interopRequireDefault(_AccordionItemTitle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	// import uuid from 'uuid';

	var AccordionItem = function (_Component) {
	  _inherits(AccordionItem, _Component);

	  function AccordionItem(props) {
	    _classCallCheck(this, AccordionItem);

	    var _this = _possibleConstructorReturn(this, (AccordionItem.__proto__ || Object.getPrototypeOf(AccordionItem)).call(this, props));

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
	      // this.uuid = uuid.v4();
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
	      var disabled = this.props.disabled;


	      if (disabled) {
	        return;
	      }

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

	      var _props = this.props;
	      var onExpand = _props.onExpand;
	      var slug = _props.slug;


	      this.startTransition();
	      this.timeout = setTimeout(function () {
	        _this2.setState({
	          maxHeight: 'none',
	          overflow: 'visible'
	        });

	        if (onExpand) {
	          slug ? onExpand(slug) : onExpand();
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

	      var images = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

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
	        className: (0, _classnames2.default)('react-sanfona-item', this.props.className, { 'react-sanfona-item-expanded': this.props.expanded && !this.props.disabled }, this.props.expandedClassName && _defineProperty({}, this.props.expandedClassName, this.props.expanded), { 'react-sanfona-item-disabled': this.props.disabled }, this.props.disabledClassName && _defineProperty({}, this.props.disabledClassName, this.props.disabled)),
	        role: 'tabpanel',
	        tabIndex: '0',
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
	    key: 'handleKeyDown',
	    value: function handleKeyDown(e) {
	      if (e.keyCode === 13) {
	        if (typeof this.props.onKeyDown === 'function') {
	          this.props.onKeyDown();
	        }
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        _extends({}, this.getProps(), { ref: 'item', onKeyDown: this.handleKeyDown.bind(this) }),
	        _react2.default.createElement(_AccordionItemTitle2.default, {
	          className: this.props.titleClassName,
	          title: this.props.title,
	          onClick: this.props.disabled ? null : this.props.onClick,
	          titleColor: this.props.titleColor,
	          uuid: this.props.title.toLowerCase().replace(/\s/g, '-') + '-' + this.props.index }),
	        _react2.default.createElement(
	          _AccordionItemBody2.default,
	          {
	            maxHeight: this.state.maxHeight,
	            duration: this.state.duration,
	            className: this.props.bodyClassName,
	            overflow: this.state.overflow,
	            ref: 'body',
	            uuid: this.props.title.toLowerCase().replace(/\s/g, '-') + '-' + this.props.index },
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
	  onKeyDown: _react.PropTypes.func,
	  onFocus: _react.PropTypes.func,
	  title: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node]),
	  expandedClassName: _react.PropTypes.string,
	  style: _react.PropTypes.object,
	  titleClassName: _react.PropTypes.string,
	  disabled: _react.PropTypes.bool,
	  disabledClassName: _react.PropTypes.string
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _classnames = __webpack_require__(2);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _react = __webpack_require__(3);

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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _classnames = __webpack_require__(2);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AccordionItemTitle = function (_Component) {
	  _inherits(AccordionItemTitle, _Component);

	  function AccordionItemTitle() {
	    _classCallCheck(this, AccordionItemTitle);

	    return _possibleConstructorReturn(this, (AccordionItemTitle.__proto__ || Object.getPrototypeOf(AccordionItemTitle)).apply(this, arguments));
	  }

	  _createClass(AccordionItemTitle, [{
	    key: 'render',
	    value: function render() {
	      var style = {
	        cursor: 'pointer',
	        margin: 0,
	        color: this.props.titleColor
	      };

	      var title = this.props.title;


	      if ((typeof title === 'undefined' ? 'undefined' : _typeof(title)) === 'object') {
	        return _react2.default.cloneElement(title, {
	          onClick: this.props.onClick,
	          id: 'react-safona-item-title-' + this.props.uuid,
	          'aria-controls': 'react-sanfona-item-body-' + this.props.uuid
	        });
	      }

	      return _react2.default.createElement(
	        'h3',
	        { 'aria-controls': 'react-sanfona-item-body-' + this.props.uuid,
	          className: (0, _classnames2.default)('react-sanfona-item-title', this.props.className),
	          id: 'react-safona-item-title-' + this.props.uuid,
	          onClick: this.props.onClick,
	          style: style },
	        title
	      );
	    }
	  }]);

	  return AccordionItemTitle;
	}(_react.Component);

	exports.default = AccordionItemTitle;


	AccordionItemTitle.propTypes = {
	  className: _react.PropTypes.string,
	  onClick: _react.PropTypes.func,
	  title: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node]),
	  uuid: _react.PropTypes.string
	};

/***/ }
/******/ ])
});
;