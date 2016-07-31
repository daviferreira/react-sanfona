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
	exports.AccordionItem = exports.Accordion = undefined;

	var _Accordion2 = __webpack_require__(1);

	var _Accordion3 = _interopRequireDefault(_Accordion2);

	var _AccordionItem2 = __webpack_require__(5);

	var _AccordionItem3 = _interopRequireDefault(_AccordionItem2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Accordion = _Accordion3.default;
	exports.AccordionItem = _AccordionItem3.default;

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

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Accordion).call(this, props));

	    var activeItems = arrayify(props.activeItems);

	    // can't have multiple active items, just use the first one
	    if (!props.allowMultiple) activeItems = [activeItems[0]];

	    _this.state = {
	      activeItems: activeItems
	    };
	    return _this;
	  }

	  _createClass(Accordion, [{
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
	        var expanded = _this2.state.activeItems.indexOf(key) !== -1;

	        return _react2.default.cloneElement(item, {
	          expanded: expanded,
	          key: key,
	          onClick: _this2.handleClick.bind(_this2, key),
	          ref: 'item-' + key
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

	var _uuid = __webpack_require__(6);

	var _uuid2 = _interopRequireDefault(_uuid);

	var _AccordionItemBody = __webpack_require__(8);

	var _AccordionItemBody2 = _interopRequireDefault(_AccordionItemBody);

	var _AccordionItemTitle = __webpack_require__(9);

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
	  title: _react.PropTypes.string,
	  expandedClassName: _react.PropTypes.string,
	  style: _react.PropTypes.object,
	  titleClassName: _react.PropTypes.string
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	//     uuid.js
	//
	//     Copyright (c) 2010-2012 Robert Kieffer
	//     MIT License - http://opensource.org/licenses/mit-license.php

	// Unique ID creation requires a high quality random # generator.  We feature
	// detect to determine the best RNG source, normalizing to a function that
	// returns 128-bits of randomness, since that's what's usually required
	var _rng = __webpack_require__(7);

	// Maps for number <-> hex string conversion
	var _byteToHex = [];
	var _hexToByte = {};
	for (var i = 0; i < 256; i++) {
	  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
	  _hexToByte[_byteToHex[i]] = i;
	}

	// **`parse()` - Parse a UUID into it's component bytes**
	function parse(s, buf, offset) {
	  var i = (buf && offset) || 0, ii = 0;

	  buf = buf || [];
	  s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
	    if (ii < 16) { // Don't overflow!
	      buf[i + ii++] = _hexToByte[oct];
	    }
	  });

	  // Zero out remaining bytes if string was short
	  while (ii < 16) {
	    buf[i + ii++] = 0;
	  }

	  return buf;
	}

	// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
	function unparse(buf, offset) {
	  var i = offset || 0, bth = _byteToHex;
	  return  bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]];
	}

	// **`v1()` - Generate time-based UUID**
	//
	// Inspired by https://github.com/LiosK/UUID.js
	// and http://docs.python.org/library/uuid.html

	// random #'s we need to init node and clockseq
	var _seedBytes = _rng();

	// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
	var _nodeId = [
	  _seedBytes[0] | 0x01,
	  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
	];

	// Per 4.2.2, randomize (14 bit) clockseq
	var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

	// Previous uuid creation time
	var _lastMSecs = 0, _lastNSecs = 0;

	// See https://github.com/broofa/node-uuid for API details
	function v1(options, buf, offset) {
	  var i = buf && offset || 0;
	  var b = buf || [];

	  options = options || {};

	  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

	  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
	  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
	  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
	  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
	  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

	  // Per 4.2.1.2, use count of uuid's generated during the current clock
	  // cycle to simulate higher resolution clock
	  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

	  // Time since last uuid creation (in msecs)
	  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

	  // Per 4.2.1.2, Bump clockseq on clock regression
	  if (dt < 0 && options.clockseq === undefined) {
	    clockseq = clockseq + 1 & 0x3fff;
	  }

	  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
	  // time interval
	  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
	    nsecs = 0;
	  }

	  // Per 4.2.1.2 Throw error if too many uuids are requested
	  if (nsecs >= 10000) {
	    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
	  }

	  _lastMSecs = msecs;
	  _lastNSecs = nsecs;
	  _clockseq = clockseq;

	  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
	  msecs += 12219292800000;

	  // `time_low`
	  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
	  b[i++] = tl >>> 24 & 0xff;
	  b[i++] = tl >>> 16 & 0xff;
	  b[i++] = tl >>> 8 & 0xff;
	  b[i++] = tl & 0xff;

	  // `time_mid`
	  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
	  b[i++] = tmh >>> 8 & 0xff;
	  b[i++] = tmh & 0xff;

	  // `time_high_and_version`
	  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
	  b[i++] = tmh >>> 16 & 0xff;

	  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
	  b[i++] = clockseq >>> 8 | 0x80;

	  // `clock_seq_low`
	  b[i++] = clockseq & 0xff;

	  // `node`
	  var node = options.node || _nodeId;
	  for (var n = 0; n < 6; n++) {
	    b[i + n] = node[n];
	  }

	  return buf ? buf : unparse(b);
	}

	// **`v4()` - Generate random UUID**

	// See https://github.com/broofa/node-uuid for API details
	function v4(options, buf, offset) {
	  // Deprecated - 'format' argument, as supported in v1.2
	  var i = buf && offset || 0;

	  if (typeof(options) == 'string') {
	    buf = options == 'binary' ? new Array(16) : null;
	    options = null;
	  }
	  options = options || {};

	  var rnds = options.random || (options.rng || _rng)();

	  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
	  rnds[6] = (rnds[6] & 0x0f) | 0x40;
	  rnds[8] = (rnds[8] & 0x3f) | 0x80;

	  // Copy bytes to buffer, if provided
	  if (buf) {
	    for (var ii = 0; ii < 16; ii++) {
	      buf[i + ii] = rnds[ii];
	    }
	  }

	  return buf || unparse(rnds);
	}

	// Export public API
	var uuid = v4;
	uuid.v1 = v1;
	uuid.v4 = v4;
	uuid.parse = parse;
	uuid.unparse = unparse;

	module.exports = uuid;


/***/ },
/* 7 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	var rng;

	if (global.crypto && crypto.getRandomValues) {
	  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
	  // Moderately fast, high quality
	  var _rnds8 = new Uint8Array(16);
	  rng = function whatwgRNG() {
	    crypto.getRandomValues(_rnds8);
	    return _rnds8;
	  };
	}

	if (!rng) {
	  // Math.random()-based (RNG)
	  //
	  // If all else fails, use Math.random().  It's fast, but is of unspecified
	  // quality.
	  var  _rnds = new Array(16);
	  rng = function() {
	    for (var i = 0, r; i < 16; i++) {
	      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
	      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
	    }

	    return _rnds;
	  };
	}

	module.exports = rng;


	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 8 */
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

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(AccordionItemBody).apply(this, arguments));
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
/* 9 */
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
	          className: (0, _classnames2.default)('react-sanfona-item-title', this.props.className),
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
	  className: _react.PropTypes.string,
	  onClick: _react.PropTypes.func,
	  title: _react.PropTypes.string,
	  uuid: _react.PropTypes.string
	};

/***/ }
/******/ ])
});
;