(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["ReactSanfona"] = factory(require("React"));
	else
		root["ReactSanfona"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
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

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Accordion = __webpack_require__(1);

	var _Accordion2 = _interopRequireDefault(_Accordion);

	var _AccordionItem = __webpack_require__(3);

	var _AccordionItem2 = _interopRequireDefault(_AccordionItem);

	exports['default'] = { Accordion: _Accordion2['default'], AccordionItem: _AccordionItem2['default'] };
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var Accordion = (function (_Component) {
	  function Accordion(props) {
	    _classCallCheck(this, Accordion);

	    _Component.call(this, props);

	    var selectedIndex = props.selectedIndex || 0;
	    var state = { selectedIndex: selectedIndex };

	    if (props.allowMultiple) {
	      state.activeItems = [selectedIndex];
	    }

	    this.state = state;
	  }

	  _inherits(Accordion, _Component);

	  Accordion.prototype.componentDidMount = function componentDidMount() {
	    var _this = this;

	    if (this.refs['item-' + this.state.selectedIndex]) {
	      this.refs['item-' + this.state.selectedIndex].allowOverflow();
	    }

	    // allow overflow for absolute positioned elements inside
	    // the item body, but only after animation is complete
	    _react2['default'].findDOMNode(this).addEventListener('transitionend', function () {
	      if (_this.state.selectedIndex !== -1) {
	        _this.refs['item-' + _this.state.selectedIndex].allowOverflow();
	      }
	    });
	  };

	  Accordion.prototype.handleClick = function handleClick(index) {
	    var newState = { selectedIndex: index };

	    if (this.props.allowMultiple) {
	      // clone active items state array
	      newState.activeItems = this.state.activeItems.slice(0);

	      var position = newState.activeItems.indexOf(index);

	      if (position !== -1) {
	        newState.activeItems.splice(position, 1);
	        newState.selectedIndex = -1;
	      } else {
	        newState.activeItems.push(index);
	      }
	    } else if (index === this.state.selectedIndex) {
	      newState.selectedIndex = -1;
	    }

	    this.setState(newState);
	  };

	  Accordion.prototype.renderItems = function renderItems() {
	    var _this2 = this;

	    if (!this.props.children) {
	      return null;
	    }

	    return this.props.children.map(function (item, index) {
	      var expanded = _this2.state.selectedIndex === index || _this2.props.allowMultiple && _this2.state.activeItems.indexOf(index) !== -1;

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
	  allowMultiple: false
	};

	Accordion.propTypes = {
	  allowMultiple: _react.PropTypes.bool,
	  selectedIndex: _react.PropTypes.number
	};
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _uuid = __webpack_require__(5);

	var _uuid2 = _interopRequireDefault(_uuid);

	var _AccordionItemBody = __webpack_require__(7);

	var _AccordionItemBody2 = _interopRequireDefault(_AccordionItemBody);

	var _AccordionItemTitle = __webpack_require__(8);

	var _AccordionItemTitle2 = _interopRequireDefault(_AccordionItemTitle);

	var AccordionItem = (function (_Component) {
	  function AccordionItem(props) {
	    _classCallCheck(this, AccordionItem);

	    _Component.call(this, props);
	    this.state = {
	      maxHeight: props.expanded ? 'none' : 0,
	      overflow: props.expanded ? 'visible' : 'hidden'
	    };
	  }

	  _inherits(AccordionItem, _Component);

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
	    var bodyNode = _react2['default'].findDOMNode(this.refs.body);
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
	      className: (0, _classnames2['default'])(['react-sanfona-item', { 'react-sanfona-item-expanded': this.props.expanded }]),
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
	      _react2['default'].createElement(_AccordionItemTitle2['default'], { title: this.props.title,
	        onClick: this.props.onClick,
	        color: this.props.color,
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/

	(function () {
		'use strict';

		function classNames () {

			var classes = '';

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if ('string' === argType || 'number' === argType) {
					classes += ' ' + arg;

				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);

				} else if ('object' === argType) {
					for (var key in arg) {
						if (arg.hasOwnProperty(key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}

			return classes.substr(1);
		}

		if (true) {
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else {
			window.classNames = classNames;
		}

	}());


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	//     uuid.js
	//
	//     Copyright (c) 2010-2012 Robert Kieffer
	//     MIT License - http://opensource.org/licenses/mit-license.php

	// Unique ID creation requires a high quality random # generator.  We feature
	// detect to determine the best RNG source, normalizing to a function that
	// returns 128-bits of randomness, since that's what's usually required
	var _rng = __webpack_require__(6);

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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var AccordionItemBody = (function (_Component) {
	  function AccordionItemBody() {
	    _classCallCheck(this, AccordionItemBody);

	    if (_Component != null) {
	      _Component.apply(this, arguments);
	    }
	  }

	  _inherits(AccordionItemBody, _Component);

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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var AccordionItemTitle = (function (_Component) {
	  function AccordionItemTitle() {
	    _classCallCheck(this, AccordionItemTitle);

	    if (_Component != null) {
	      _Component.apply(this, arguments);
	    }
	  }

	  _inherits(AccordionItemTitle, _Component);

	  AccordionItemTitle.prototype.render = function render() {
	    var style = {
	      cursor: 'pointer',
	      margin: 0,
	      color: this.props.color
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

/***/ }
/******/ ])
});
;