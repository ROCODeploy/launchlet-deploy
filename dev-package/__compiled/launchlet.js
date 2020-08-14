var Launchlet = (function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var main = createCommonjsModule(function (module, exports) {

	//_ OLSKTestingFakeRequest

	exports.OLSKTestingFakeRequest = function(inputData = {}) {
		console.warn('OLSKTestingFakeRequest DEPRECATED');
		return Object.assign({}, inputData);
	};

	//_ OLSKTestingFakeRequestForSession

	exports.OLSKTestingFakeRequestForSession = function(inputData = {}) {
		console.warn('OLSKTestingFakeRequestForSession DEPRECATED');
		return exports.OLSKTestingFakeRequest({
			session: inputData,
		});
	};

	//_ OLSKTestingFakeRequestForHeaders

	exports.OLSKTestingFakeRequestForHeaders = function(inputData = {}) {
		console.warn('OLSKTestingFakeRequestForHeaders DEPRECATED');
		return exports.OLSKTestingFakeRequest({
			headers: inputData,
		});
	};

	//_ OLSKTestingFakeResponse

	exports.OLSKTestingFakeResponse = function(inputData = {}) {
		console.warn('OLSKTestingFakeResponse DEPRECATED');
		return Object.assign({}, inputData);
	};

	//_ OLSKTestingFakeResponseForLocals

	exports.OLSKTestingFakeResponseForLocals = function(inputData = {}) {
		console.warn('OLSKTestingFakeResponseForLocals DEPRECATED');
		return exports.OLSKTestingFakeResponse({
			locals: inputData,
		});
	};

	//_ OLSKTestingFakeResponseForJSON

	exports.OLSKTestingFakeResponseForJSON = function() {
		console.warn('OLSKTestingFakeResponseForJSON DEPRECATED');
		return exports.OLSKTestingFakeResponse({
			json: function(inputData) {
				return inputData;
			},
		});
	};

	//_ OLSKTestingFakeResponseForRender

	exports.OLSKTestingFakeResponseForRender = function(callback) {
		console.warn('OLSKTestingFakeResponseForRender DEPRECATED');
		if (typeof callback !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return exports.OLSKTestingFakeResponse({
			render: callback,
		});
	};

	//_ OLSKTestingFakeResponseForRedirect

	exports.OLSKTestingFakeResponseForRedirect = function() {
		console.warn('OLSKTestingFakeResponseForRedirect DEPRECATED');
		return exports.OLSKTestingFakeResponse({
			redirect: function(inputData) {
				return inputData;
			},
		});
	};

	//_ OLSKTestingFakeResponseForStatus

	exports.OLSKTestingFakeResponseForStatus = function() {
		console.warn('OLSKTestingFakeResponseForStatus DEPRECATED');
		var res = Object.assign(exports.OLSKTestingFakeResponseForJSON(), {
			status: function(inputData) {
				res.statusCode = inputData;

				return;
			},
		});

		return res;
	};

	//_ OLSKTestingFakeNext

	exports.OLSKTestingFakeNext = function() {
		console.warn('OLSKTestingFakeNext DEPRECATED');
		return function(inputData) {
			return typeof inputData === 'undefined' ? 'RETURNED_UNDEFINED' : inputData;
		};
	};

	//_ _OLSKTestingMochaReplaceES6Import

	exports._OLSKTestingMochaReplaceES6Import = function(inputData) {
		const exportable = [];
		
		inputData = inputData
			.replace(/^import \* as (\w+) from ['"]([^'"]+)['"];?/gm, 'var $1 = require("$2");')
			.replace(/^import (\w+) from ['"]([^'"]+)['"];?/gm, 'var {default: $1} = require("$2");')
			.replace(/^import {([^}]+)} from ['"](.+)['"];?/gm, 'var {$1} = require("$2");')
			.replace(/^export default /gm, 'exports.default = ')
			.replace(/^export (const|let|var|class|function) (\w+)/gm, (match, type, name) => {
				exportable.push(name);
				return `${type} ${name}`;
			})
			.replace(/^export \{([^}]+)\}(?: from ['"]([^'"]+)['"];?)?/gm, (match, names, source) => {
				names.split(',').filter(Boolean).forEach(name => {
					exportable.push(name);
				});

				return source ? `const { ${names} } = require("${source}");` : '';
			})
			.replace(/^export function (\w+)/gm, 'exports.$1 = function $1');

		exportable.forEach(name => {
			inputData += `\nexports.${name} = ${name};`;
		});

		return inputData;
	};

	exports.OLSK_TESTING_BEHAVIOUR = function () {
		if (typeof navigator === 'undefined') {
			return false;
		}

		return navigator.appName === 'Zombie';
	};
	});
	var main_1 = main.OLSKTestingFakeRequest;
	var main_2 = main.OLSKTestingFakeRequestForSession;
	var main_3 = main.OLSKTestingFakeRequestForHeaders;
	var main_4 = main.OLSKTestingFakeResponse;
	var main_5 = main.OLSKTestingFakeResponseForLocals;
	var main_6 = main.OLSKTestingFakeResponseForJSON;
	var main_7 = main.OLSKTestingFakeResponseForRender;
	var main_8 = main.OLSKTestingFakeResponseForRedirect;
	var main_9 = main.OLSKTestingFakeResponseForStatus;
	var main_10 = main.OLSKTestingFakeNext;
	var main_11 = main._OLSKTestingMochaReplaceES6Import;
	var main_12 = main.OLSK_TESTING_BEHAVIOUR;

	const mod = {

		LCHFormulaSafeStringFields: [
			'LCHFormulaID',
			'LCHFormulaName',
			'LCHFormulaSignature',
			'LCHFormulaInputTypes',
			'LCHFormulaOutputType',
			'LCHFormulaStyle',
			'LCHFormulaURLFilter',
			'LCHFormulaCreationDate',
			'LCHFormulaModificationDate',
			'LCHFormulaSyntaxErrorMessage',
			'@context',
		],

		LCHFormulaModelErrorsFor (inputData, options = {}) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('LCHErrorInputNotValid');
			}

			const errors = {};

			if (inputData.LCHFormulaName !== undefined || options.LCHOptionValidateIfNotPresent) {
				if (typeof inputData.LCHFormulaName !== 'string') {
					errors.LCHFormulaName = [
						'LCHErrorNotString',
					];
				}
			}

			if (inputData.LCHFormulaSignature !== undefined || options.LCHOptionValidateIfNotPresent) {
				if (typeof inputData.LCHFormulaSignature !== 'string') {
					errors.LCHFormulaSignature = [
						'LCHErrorNotString',
					];
				}
			}

			if (inputData.LCHFormulaInputTypes !== undefined || options.LCHOptionValidateIfNotPresent) {
				if (typeof inputData.LCHFormulaInputTypes !== 'string') {
					errors.LCHFormulaInputTypes = [
						'LCHErrorNotString',
					];
				}
			}

			if (inputData.LCHFormulaOutputType !== undefined || options.LCHOptionValidateIfNotPresent) {
				if (typeof inputData.LCHFormulaOutputType !== 'string') {
					errors.LCHFormulaOutputType = [
						'LCHErrorNotString',
					];
				}
			}

			if (inputData.LCHFormulaIsHidden !== undefined) {
				if (typeof inputData.LCHFormulaIsHidden !== 'function') {
					errors.LCHFormulaIsHidden = [
						'LCHErrorNotFunction',
					];
				}
			}

			if (inputData.LCHFormulaURLFilter !== undefined || options.LCHOptionValidateIfNotPresent) {
				if (typeof inputData.LCHFormulaURLFilter !== 'string') {
					errors.LCHFormulaURLFilter = [
						'LCHErrorNotString',
					];
				}
			}

			if (inputData.LCHFormulaIsAutomatic !== undefined || options.LCHOptionValidateIfNotPresent) {
				if (typeof inputData.LCHFormulaIsAutomatic !== 'boolean') {
					errors.LCHFormulaIsAutomatic = [
						'LCHErrorNotBoolean',
					];
				}
			}

			if (inputData.LCHFormulaStyle !== undefined || options.LCHOptionValidateIfNotPresent) {
				if (typeof inputData.LCHFormulaStyle !== 'string') {
					errors.LCHFormulaStyle = [
						'LCHErrorNotString',
					];
				}
			}

			if (inputData.LCHFormulaIsFlagged !== undefined || options.LCHOptionValidateIfNotPresent) {
				if (typeof inputData.LCHFormulaIsFlagged !== 'boolean') {
					errors.LCHFormulaIsFlagged = [
						'LCHErrorNotBoolean',
					];
				}
			}

			return Object.entries(errors).length ? errors : null;
		},

		LCHFormulaFrom (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('LCHErrorInputNotValid');
			}

			return Object.entries(inputData).reduce(function (coll, item) {
				coll[item[0].replace(/LCH[A-Z][a-z]+/, 'LCHFormula')] = item[1];

				return coll;
			}, {});
		},

		LCHFormulaTo (param1, param2) {
			if (typeof param1 !== 'object' || param1 === null) {
				throw new Error('LCHErrorInputNotValid');
			}

			if (typeof param2 !== 'string') {
				throw new Error('LCHErrorInputNotValid');
			}

			return Object.entries(param1).reduce(function (coll, item) {
				coll[item[0].replace('LCHFormula', param2)] = item[1];

				return coll;
			}, {});
		},

		LCHFormulaToEvaluate (inputData) {
			if (mod.LCHFormulaModelErrorsFor(inputData)) {
				throw new Error('LCHErrorInputNotValid');
			}

			let outputData = Object.fromEntries(Object.entries(inputData).filter(function (e) {
				return !mod.LCHFormulaSafeStringFields.includes(e[0]);
			}));

			if (outputData.LCHFormulaCallbackArgs || outputData.LCHFormulaCallbackBody) {
				outputData.LCHFormulaCallbackRaw = `(function (${ outputData.LCHFormulaCallbackArgs || '' }) { ${ outputData.LCHFormulaCallbackBody || '' } })`;
				delete outputData.LCHFormulaCallbackArgs;
				delete outputData.LCHFormulaCallbackBody;
			}

			if (outputData.LCHFormulaCanonicalExampleCallbackBody) {
				outputData.LCHFormulaCanonicalExampleCallbackRaw = `(function () { ${ outputData.LCHFormulaCanonicalExampleCallbackBody || '' } })`;
				delete outputData.LCHFormulaCanonicalExampleCallbackBody;
			}

			return outputData;
		},

	};

	const mod$1 = {

		LCHRuntimeURLFilter (param1, param2) {
			if (typeof param1 !== 'string') {
				throw new Error('LCHErrorInputNotValid');
			}

			if (typeof param2 !== 'string') {
				throw new Error('LCHErrorInputNotValid');
			}

			if (!param2) {
				throw new Error('LCHErrorInputNotValid');
			}

			if (param1 === '*') {
				return true;
			}

			let match = param1.match(/^\/(.*)\/(\w*)/i);

			if (!match || !match.shift()) {
				return param2.includes(param1);
			}

			return !!param2.match(new RegExp(match[0], match[1]));
		},

		LCHRuntimeInputTypes(inputData) {
			if (typeof inputData !== 'string') {
				throw new Error('LCHErrorInputNotValid');
			}

			return inputData.split(',').map(function (e) {
				return e.trim();
			}).filter(function (e) {
				return !!e;
			});
		},

		LCHRuntimeAPI(inputData) {
			if (!Array.isArray(inputData)) {
				throw new Error('LCHErrorInputNotValid');
			}

			const outputData = {
				fn (signature) {
					if (typeof signature !== 'string') {
						throw new Error('LCHErrorIdentifierNotString');
					}

					if (signature === '') {
						throw new Error('LCHErrorIdentifierBlank');
					}

					if (signature.trim() !== signature) {
						throw new Error('LCHErrorIdentifierContainsUntrimmedWhitespace');
					}

					let functionObject = inputData.filter(function (e) {
						return e.LCHRecipeSignature === signature;
					}).shift();

					if (!functionObject) {
						throw new Error('LCHErrorIdentifierNotDefined');
					}

					return functionObject.LCHRecipeCallback.bind({
						api: outputData,
					});
				},
			};

			Object.assign(outputData, inputData.reduce(function (coll, item) {
				if (!coll[item.LCHRecipeSignature]) {
					coll[item.LCHRecipeSignature] = function () {
						const args = arguments;

						(item.LCHRecipeInputTypes ? mod$1.LCHRuntimeInputTypes(item.LCHRecipeInputTypes) : []).forEach(function (e, i) {
							if (!coll[e](args[i])) {
								throw new Error('LCHErrorTypeMismatch');
							}
						});

						return item.LCHRecipeCallback.apply({
							api: outputData,
						}, args);
					};
				}

				return coll;
			}, {}));

			Object.freeze(outputData);

			return outputData;
		},

	};

	const LCHTypeServiceSearchCallback = function(inputData) {
		if (!inputData.LCHRecipeName) {
			return false;
		}
		
		if (inputData.LCHRecipeCallback.length) {
			return false;
		}
		
		if (inputData.LCHRecipeOutputType !== 'ServiceSearchURLTemplate') {
			return false;
		}

		return true;
	};

	const LCHTypeServiceSearchCanonicalExampleCallback = function() {
		return {
			LCHRecipeName: 'alfa',
			LCHRecipeCallback () {
				return 'http://example.com?q=LCHSEARCHTOKEN';
			},
			LCHRecipeOutputType: 'ServiceSearchURLTemplate',
		};
	};

	const LCHTypeServiceSearchRecipe = function() {
		return {
			LCHRecipeSignature: 'ServiceSearch',
			LCHRecipeCallback: LCHTypeServiceSearchCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeCanonicalExampleCallback: LCHTypeServiceSearchCanonicalExampleCallback,
		};
	};

	var ServiceSearch = /*#__PURE__*/Object.freeze({
		LCHTypeServiceSearchCallback: LCHTypeServiceSearchCallback,
		LCHTypeServiceSearchCanonicalExampleCallback: LCHTypeServiceSearchCanonicalExampleCallback,
		LCHTypeServiceSearchRecipe: LCHTypeServiceSearchRecipe
	});

	const LCHPrimitiveBoolCallback = function(inputData) {
		return !!inputData;
	};

	const LCHPrimitiveBoolRecipe = function() {
		return {
			LCHRecipeSignature: 'Bool',
			LCHRecipeCallback: LCHPrimitiveBoolCallback,
		};
	};

	var Bool = /*#__PURE__*/Object.freeze({
		LCHPrimitiveBoolCallback: LCHPrimitiveBoolCallback,
		LCHPrimitiveBoolRecipe: LCHPrimitiveBoolRecipe
	});

	const LCHPrimitiveDateCallback = function(inputData) {
		if (!(inputData instanceof Date)) {
			return false;
		}

		if (Number.isNaN(inputData.getTime())) {
			return false;
		}

		return true;
	};

	const LCHPrimitiveDateCanonicalExampleCallback = function() {
		return new Date(0);
	};

	const LCHPrimitiveDateRecipe = function() {
		return {
			LCHRecipeSignature: 'Date',
			LCHRecipeCallback: LCHPrimitiveDateCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeCanonicalExampleCallback: LCHPrimitiveDateCanonicalExampleCallback,
		};
	};

	var Date$1 = /*#__PURE__*/Object.freeze({
		LCHPrimitiveDateCallback: LCHPrimitiveDateCallback,
		LCHPrimitiveDateCanonicalExampleCallback: LCHPrimitiveDateCanonicalExampleCallback,
		LCHPrimitiveDateRecipe: LCHPrimitiveDateRecipe
	});

	const LCHPrimitiveDOMElementCallback = function(inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return false;
		}

		if (typeof inputData.focus !== 'function') {
			return false;
		}

		return true;
	};

	const LCHPrimitiveDOMElementCanonicalExampleCallback = function() {
		return {
			focus () {},
		};
	};

	const LCHPrimitiveDOMElementRecipe = function() {
		return {
			LCHRecipeCallback: LCHPrimitiveDOMElementCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeCanonicalExampleCallback: LCHPrimitiveDOMElementCanonicalExampleCallback,
			LCHRecipeSignature: 'DOMElement',
			_LCHRecipeTypeIsExclusive: true,
		};
	};

	var DOMElement = /*#__PURE__*/Object.freeze({
		LCHPrimitiveDOMElementCallback: LCHPrimitiveDOMElementCallback,
		LCHPrimitiveDOMElementCanonicalExampleCallback: LCHPrimitiveDOMElementCanonicalExampleCallback,
		LCHPrimitiveDOMElementRecipe: LCHPrimitiveDOMElementRecipe
	});

	/**
	 * Check if we're required to add a port number.
	 *
	 * @see https://url.spec.whatwg.org/#default-port
	 * @param {Number|String} port Port number we need to check
	 * @param {String} protocol Protocol we need to check against.
	 * @returns {Boolean} Is it a default port for the given protocol
	 * @api private
	 */
	var requiresPort = function required(port, protocol) {
	  protocol = protocol.split(':')[0];
	  port = +port;

	  if (!port) return false;

	  switch (protocol) {
	    case 'http':
	    case 'ws':
	    return port !== 80;

	    case 'https':
	    case 'wss':
	    return port !== 443;

	    case 'ftp':
	    return port !== 21;

	    case 'gopher':
	    return port !== 70;

	    case 'file':
	    return false;
	  }

	  return port !== 0;
	};

	var has = Object.prototype.hasOwnProperty
	  , undef;

	/**
	 * Decode a URI encoded string.
	 *
	 * @param {String} input The URI encoded string.
	 * @returns {String|Null} The decoded string.
	 * @api private
	 */
	function decode(input) {
	  try {
	    return decodeURIComponent(input.replace(/\+/g, ' '));
	  } catch (e) {
	    return null;
	  }
	}

	/**
	 * Simple query string parser.
	 *
	 * @param {String} query The query string that needs to be parsed.
	 * @returns {Object}
	 * @api public
	 */
	function querystring(query) {
	  var parser = /([^=?&]+)=?([^&]*)/g
	    , result = {}
	    , part;

	  while (part = parser.exec(query)) {
	    var key = decode(part[1])
	      , value = decode(part[2]);

	    //
	    // Prevent overriding of existing properties. This ensures that build-in
	    // methods like `toString` or __proto__ are not overriden by malicious
	    // querystrings.
	    //
	    // In the case if failed decoding, we want to omit the key/value pairs
	    // from the result.
	    //
	    if (key === null || value === null || key in result) continue;
	    result[key] = value;
	  }

	  return result;
	}

	/**
	 * Transform a query string to an object.
	 *
	 * @param {Object} obj Object that should be transformed.
	 * @param {String} prefix Optional prefix.
	 * @returns {String}
	 * @api public
	 */
	function querystringify(obj, prefix) {
	  prefix = prefix || '';

	  var pairs = []
	    , value
	    , key;

	  //
	  // Optionally prefix with a '?' if needed
	  //
	  if ('string' !== typeof prefix) prefix = '?';

	  for (key in obj) {
	    if (has.call(obj, key)) {
	      value = obj[key];

	      //
	      // Edge cases where we actually want to encode the value to an empty
	      // string instead of the stringified value.
	      //
	      if (!value && (value === null || value === undef || isNaN(value))) {
	        value = '';
	      }

	      key = encodeURIComponent(key);
	      value = encodeURIComponent(value);

	      //
	      // If we failed to encode the strings, we should bail out as we don't
	      // want to add invalid strings to the query.
	      //
	      if (key === null || value === null) continue;
	      pairs.push(key +'='+ value);
	    }
	  }

	  return pairs.length ? prefix + pairs.join('&') : '';
	}

	//
	// Expose the module.
	//
	var stringify = querystringify;
	var parse = querystring;

	var querystringify_1 = {
		stringify: stringify,
		parse: parse
	};

	var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//
	  , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i
	  , whitespace = '[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]'
	  , left = new RegExp('^'+ whitespace +'+');

	/**
	 * Trim a given string.
	 *
	 * @param {String} str String to trim.
	 * @public
	 */
	function trimLeft(str) {
	  return (str ? str : '').toString().replace(left, '');
	}

	/**
	 * These are the parse rules for the URL parser, it informs the parser
	 * about:
	 *
	 * 0. The char it Needs to parse, if it's a string it should be done using
	 *    indexOf, RegExp using exec and NaN means set as current value.
	 * 1. The property we should set when parsing this value.
	 * 2. Indication if it's backwards or forward parsing, when set as number it's
	 *    the value of extra chars that should be split off.
	 * 3. Inherit from location if non existing in the parser.
	 * 4. `toLowerCase` the resulting value.
	 */
	var rules = [
	  ['#', 'hash'],                        // Extract from the back.
	  ['?', 'query'],                       // Extract from the back.
	  function sanitize(address) {          // Sanitize what is left of the address
	    return address.replace('\\', '/');
	  },
	  ['/', 'pathname'],                    // Extract from the back.
	  ['@', 'auth', 1],                     // Extract from the front.
	  [NaN, 'host', undefined, 1, 1],       // Set left over value.
	  [/:(\d+)$/, 'port', undefined, 1],    // RegExp the back.
	  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
	];

	/**
	 * These properties should not be copied or inherited from. This is only needed
	 * for all non blob URL's as a blob URL does not include a hash, only the
	 * origin.
	 *
	 * @type {Object}
	 * @private
	 */
	var ignore = { hash: 1, query: 1 };

	/**
	 * The location object differs when your code is loaded through a normal page,
	 * Worker or through a worker using a blob. And with the blobble begins the
	 * trouble as the location object will contain the URL of the blob, not the
	 * location of the page where our code is loaded in. The actual origin is
	 * encoded in the `pathname` so we can thankfully generate a good "default"
	 * location from it so we can generate proper relative URL's again.
	 *
	 * @param {Object|String} loc Optional default location object.
	 * @returns {Object} lolcation object.
	 * @public
	 */
	function lolcation(loc) {
	  var globalVar;

	  if (typeof window !== 'undefined') globalVar = window;
	  else if (typeof commonjsGlobal !== 'undefined') globalVar = commonjsGlobal;
	  else if (typeof self !== 'undefined') globalVar = self;
	  else globalVar = {};

	  var location = globalVar.location || {};
	  loc = loc || location;

	  var finaldestination = {}
	    , type = typeof loc
	    , key;

	  if ('blob:' === loc.protocol) {
	    finaldestination = new Url(unescape(loc.pathname), {});
	  } else if ('string' === type) {
	    finaldestination = new Url(loc, {});
	    for (key in ignore) delete finaldestination[key];
	  } else if ('object' === type) {
	    for (key in loc) {
	      if (key in ignore) continue;
	      finaldestination[key] = loc[key];
	    }

	    if (finaldestination.slashes === undefined) {
	      finaldestination.slashes = slashes.test(loc.href);
	    }
	  }

	  return finaldestination;
	}

	/**
	 * @typedef ProtocolExtract
	 * @type Object
	 * @property {String} protocol Protocol matched in the URL, in lowercase.
	 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
	 * @property {String} rest Rest of the URL that is not part of the protocol.
	 */

	/**
	 * Extract protocol information from a URL with/without double slash ("//").
	 *
	 * @param {String} address URL we want to extract from.
	 * @return {ProtocolExtract} Extracted information.
	 * @private
	 */
	function extractProtocol(address) {
	  address = trimLeft(address);
	  var match = protocolre.exec(address);

	  return {
	    protocol: match[1] ? match[1].toLowerCase() : '',
	    slashes: !!match[2],
	    rest: match[3]
	  };
	}

	/**
	 * Resolve a relative URL pathname against a base URL pathname.
	 *
	 * @param {String} relative Pathname of the relative URL.
	 * @param {String} base Pathname of the base URL.
	 * @return {String} Resolved pathname.
	 * @private
	 */
	function resolve(relative, base) {
	  if (relative === '') return base;

	  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
	    , i = path.length
	    , last = path[i - 1]
	    , unshift = false
	    , up = 0;

	  while (i--) {
	    if (path[i] === '.') {
	      path.splice(i, 1);
	    } else if (path[i] === '..') {
	      path.splice(i, 1);
	      up++;
	    } else if (up) {
	      if (i === 0) unshift = true;
	      path.splice(i, 1);
	      up--;
	    }
	  }

	  if (unshift) path.unshift('');
	  if (last === '.' || last === '..') path.push('');

	  return path.join('/');
	}

	/**
	 * The actual URL instance. Instead of returning an object we've opted-in to
	 * create an actual constructor as it's much more memory efficient and
	 * faster and it pleases my OCD.
	 *
	 * It is worth noting that we should not use `URL` as class name to prevent
	 * clashes with the global URL instance that got introduced in browsers.
	 *
	 * @constructor
	 * @param {String} address URL we want to parse.
	 * @param {Object|String} [location] Location defaults for relative paths.
	 * @param {Boolean|Function} [parser] Parser for the query string.
	 * @private
	 */
	function Url(address, location, parser) {
	  address = trimLeft(address);

	  if (!(this instanceof Url)) {
	    return new Url(address, location, parser);
	  }

	  var relative, extracted, parse, instruction, index, key
	    , instructions = rules.slice()
	    , type = typeof location
	    , url = this
	    , i = 0;

	  //
	  // The following if statements allows this module two have compatibility with
	  // 2 different API:
	  //
	  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
	  //    where the boolean indicates that the query string should also be parsed.
	  //
	  // 2. The `URL` interface of the browser which accepts a URL, object as
	  //    arguments. The supplied object will be used as default values / fall-back
	  //    for relative paths.
	  //
	  if ('object' !== type && 'string' !== type) {
	    parser = location;
	    location = null;
	  }

	  if (parser && 'function' !== typeof parser) parser = querystringify_1.parse;

	  location = lolcation(location);

	  //
	  // Extract protocol information before running the instructions.
	  //
	  extracted = extractProtocol(address || '');
	  relative = !extracted.protocol && !extracted.slashes;
	  url.slashes = extracted.slashes || relative && location.slashes;
	  url.protocol = extracted.protocol || location.protocol || '';
	  address = extracted.rest;

	  //
	  // When the authority component is absent the URL starts with a path
	  // component.
	  //
	  if (!extracted.slashes) instructions[3] = [/(.*)/, 'pathname'];

	  for (; i < instructions.length; i++) {
	    instruction = instructions[i];

	    if (typeof instruction === 'function') {
	      address = instruction(address);
	      continue;
	    }

	    parse = instruction[0];
	    key = instruction[1];

	    if (parse !== parse) {
	      url[key] = address;
	    } else if ('string' === typeof parse) {
	      if (~(index = address.indexOf(parse))) {
	        if ('number' === typeof instruction[2]) {
	          url[key] = address.slice(0, index);
	          address = address.slice(index + instruction[2]);
	        } else {
	          url[key] = address.slice(index);
	          address = address.slice(0, index);
	        }
	      }
	    } else if ((index = parse.exec(address))) {
	      url[key] = index[1];
	      address = address.slice(0, index.index);
	    }

	    url[key] = url[key] || (
	      relative && instruction[3] ? location[key] || '' : ''
	    );

	    //
	    // Hostname, host and protocol should be lowercased so they can be used to
	    // create a proper `origin`.
	    //
	    if (instruction[4]) url[key] = url[key].toLowerCase();
	  }

	  //
	  // Also parse the supplied query string in to an object. If we're supplied
	  // with a custom parser as function use that instead of the default build-in
	  // parser.
	  //
	  if (parser) url.query = parser(url.query);

	  //
	  // If the URL is relative, resolve the pathname against the base URL.
	  //
	  if (
	      relative
	    && location.slashes
	    && url.pathname.charAt(0) !== '/'
	    && (url.pathname !== '' || location.pathname !== '')
	  ) {
	    url.pathname = resolve(url.pathname, location.pathname);
	  }

	  //
	  // We should not add port numbers if they are already the default port number
	  // for a given protocol. As the host also contains the port number we're going
	  // override it with the hostname which contains no port number.
	  //
	  if (!requiresPort(url.port, url.protocol)) {
	    url.host = url.hostname;
	    url.port = '';
	  }

	  //
	  // Parse down the `auth` for the username and password.
	  //
	  url.username = url.password = '';
	  if (url.auth) {
	    instruction = url.auth.split(':');
	    url.username = instruction[0] || '';
	    url.password = instruction[1] || '';
	  }

	  url.origin = url.protocol && url.host && url.protocol !== 'file:'
	    ? url.protocol +'//'+ url.host
	    : 'null';

	  //
	  // The href is just the compiled result.
	  //
	  url.href = url.toString();
	}

	/**
	 * This is convenience method for changing properties in the URL instance to
	 * insure that they all propagate correctly.
	 *
	 * @param {String} part          Property we need to adjust.
	 * @param {Mixed} value          The newly assigned value.
	 * @param {Boolean|Function} fn  When setting the query, it will be the function
	 *                               used to parse the query.
	 *                               When setting the protocol, double slash will be
	 *                               removed from the final url if it is true.
	 * @returns {URL} URL instance for chaining.
	 * @public
	 */
	function set(part, value, fn) {
	  var url = this;

	  switch (part) {
	    case 'query':
	      if ('string' === typeof value && value.length) {
	        value = (fn || querystringify_1.parse)(value);
	      }

	      url[part] = value;
	      break;

	    case 'port':
	      url[part] = value;

	      if (!requiresPort(value, url.protocol)) {
	        url.host = url.hostname;
	        url[part] = '';
	      } else if (value) {
	        url.host = url.hostname +':'+ value;
	      }

	      break;

	    case 'hostname':
	      url[part] = value;

	      if (url.port) value += ':'+ url.port;
	      url.host = value;
	      break;

	    case 'host':
	      url[part] = value;

	      if (/:\d+$/.test(value)) {
	        value = value.split(':');
	        url.port = value.pop();
	        url.hostname = value.join(':');
	      } else {
	        url.hostname = value;
	        url.port = '';
	      }

	      break;

	    case 'protocol':
	      url.protocol = value.toLowerCase();
	      url.slashes = !fn;
	      break;

	    case 'pathname':
	    case 'hash':
	      if (value) {
	        var char = part === 'pathname' ? '/' : '#';
	        url[part] = value.charAt(0) !== char ? char + value : value;
	      } else {
	        url[part] = value;
	      }
	      break;

	    default:
	      url[part] = value;
	  }

	  for (var i = 0; i < rules.length; i++) {
	    var ins = rules[i];

	    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
	  }

	  url.origin = url.protocol && url.host && url.protocol !== 'file:'
	    ? url.protocol +'//'+ url.host
	    : 'null';

	  url.href = url.toString();

	  return url;
	}

	/**
	 * Transform the properties back in to a valid and full URL string.
	 *
	 * @param {Function} stringify Optional query stringify function.
	 * @returns {String} Compiled version of the URL.
	 * @public
	 */
	function toString(stringify) {
	  if (!stringify || 'function' !== typeof stringify) stringify = querystringify_1.stringify;

	  var query
	    , url = this
	    , protocol = url.protocol;

	  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

	  var result = protocol + (url.slashes ? '//' : '');

	  if (url.username) {
	    result += url.username;
	    if (url.password) result += ':'+ url.password;
	    result += '@';
	  }

	  result += url.host + url.pathname;

	  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
	  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;

	  if (url.hash) result += url.hash;

	  return result;
	}

	Url.prototype = { set: set, toString: toString };

	//
	// Expose the URL parser and some additional properties that might be useful for
	// others or testing.
	//
	Url.extractProtocol = extractProtocol;
	Url.location = lolcation;
	Url.trimLeft = trimLeft;
	Url.qs = querystringify_1;

	var urlParse = Url;

	var _URLParser = /*#__PURE__*/Object.freeze({
		'default': urlParse,
		__moduleExports: urlParse
	});

	const URLParser = typeof _URLParser === 'function' ? _URLParser : urlParse;

	const LCHPrimitiveURLCallback = function(inputData) {
		if (typeof inputData !== 'string') {
			// throw new Error('LCHErrorInputNotValid');
			return false;
		}

		if (!(new URLParser(inputData, {})).hostname) { // To parse an input independently of the browser's current URL (e.g. for functionality parity with the library in a Node environment), pass an empty location object as the second parameter
			return false;
		}

		return true;
	};

	const LCHPrimitiveStringCanonicalExampleCallback = function() {
		return 'http://example.com';
	};

	const LCHPrimitiveURLRecipe = function() {
		return {
			LCHRecipeSignature: 'URL',
			LCHRecipeCallback: LCHPrimitiveURLCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeCanonicalExampleCallback: LCHPrimitiveStringCanonicalExampleCallback,
		};
	};

	var URL = /*#__PURE__*/Object.freeze({
		LCHPrimitiveURLCallback: LCHPrimitiveURLCallback,
		LCHPrimitiveStringCanonicalExampleCallback: LCHPrimitiveStringCanonicalExampleCallback,
		LCHPrimitiveURLRecipe: LCHPrimitiveURLRecipe
	});

	const LCHPrimitiveServiceSearchURLTemplateCallback = function(inputData) {
		if (!LCHPrimitiveURLCallback(inputData)) {
			return false;
		}

		if (!inputData.match(/LCHSEARCHTOKEN/i)) {
			return false;
		}

		return true;
	};

	const LCHPrimitiveServiceSearchURLTemplateCanonicalExampleCallback = function() {
		return 'http://example.com?q=LCHSEARCHTOKEN';
	};

	const LCHPrimitiveServiceSearchURLTemplateRecipe = function() {
		return {
			LCHRecipeCallback: LCHPrimitiveServiceSearchURLTemplateCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeCanonicalExampleCallback: LCHPrimitiveServiceSearchURLTemplateCanonicalExampleCallback,
			LCHRecipeSignature: 'ServiceSearchURLTemplate',
			_LCHRecipeTypeIsExclusive: true,
		};
	};

	var ServiceSearchURLTemplate = /*#__PURE__*/Object.freeze({
		LCHPrimitiveServiceSearchURLTemplateCallback: LCHPrimitiveServiceSearchURLTemplateCallback,
		LCHPrimitiveServiceSearchURLTemplateCanonicalExampleCallback: LCHPrimitiveServiceSearchURLTemplateCanonicalExampleCallback,
		LCHPrimitiveServiceSearchURLTemplateRecipe: LCHPrimitiveServiceSearchURLTemplateRecipe
	});

	const LCHPrimitiveStringCallback = function(inputData) {
		return typeof inputData === 'string';
	};

	const LCHPrimitiveStringCanonicalExampleCallback$1 = function() {
		return '';
	};

	const LCHPrimitiveStringRecipe = function() {
		return {
			LCHRecipeSignature: 'String',
			LCHRecipeCallback: LCHPrimitiveStringCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeCanonicalExampleCallback: LCHPrimitiveStringCanonicalExampleCallback$1,
		};
	};

	var String$1 = /*#__PURE__*/Object.freeze({
		LCHPrimitiveStringCallback: LCHPrimitiveStringCallback,
		LCHPrimitiveStringCanonicalExampleCallback: LCHPrimitiveStringCanonicalExampleCallback$1,
		LCHPrimitiveStringRecipe: LCHPrimitiveStringRecipe
	});

	const LCHTypeCommandCallback = function(inputData) {
		// if (LCHRecipesModelErrorsFor(inputData)) {
		// 	throw new Error('LCHErrorInputNotValid');
		// }

		if (!inputData.LCHRecipeName) {
			return false;
		}
		
		if (inputData.LCHRecipeCallback.length) {
			return false;
		}

		return true;
	};

	const LCHTypeStringCanonicalExampleCallback = function() {
		return {
			LCHRecipeName: 'alfa',
			LCHRecipeCallback () {},
		};
	};

	const LCHTypeCommandRecipe = function() {
		return {
			LCHRecipeSignature: 'Command',
			LCHRecipeCallback: LCHTypeCommandCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeCanonicalExampleCallback: LCHTypeStringCanonicalExampleCallback,
		};
	};

	var Command = /*#__PURE__*/Object.freeze({
		LCHTypeCommandCallback: LCHTypeCommandCallback,
		LCHTypeStringCanonicalExampleCallback: LCHTypeStringCanonicalExampleCallback,
		LCHTypeCommandRecipe: LCHTypeCommandRecipe
	});

	const LCHTypeSubjectContainerCallback = function(inputData) {
		if (!inputData.LCHRecipeName) {
			return false;
		}
		
		if (inputData.LCHRecipeOutputType !== 'SubjectContainer') {
			return false;
		}

		return true;
	};

	const LCHTypeSubjectContainerCanonicalExampleCallback = function() {
		return {
			LCHRecipeName: 'alfa',
			LCHRecipeCallback () {},
			LCHRecipeOutputType: 'SubjectContainer',
		};
	};

	const LCHTypeSubjectContainerRecipe = function() {
		return {
			LCHRecipeSignature: 'SubjectContainer',
			LCHRecipeCallback: LCHTypeSubjectContainerCallback,
			LCHRecipeOutputType: 'Bool',
			LCHRecipeCanonicalExampleCallback: LCHTypeSubjectContainerCanonicalExampleCallback,
			_LCHRecipeTypeIsExclusive: true,
		};
	};

	var SubjectContainer = /*#__PURE__*/Object.freeze({
		LCHTypeSubjectContainerCallback: LCHTypeSubjectContainerCallback,
		LCHTypeSubjectContainerCanonicalExampleCallback: LCHTypeSubjectContainerCanonicalExampleCallback,
		LCHTypeSubjectContainerRecipe: LCHTypeSubjectContainerRecipe
	});

	const LCHDateLocalOffsetSubtractedCallback = function(inputData) {
		return new Date(Date.parse(inputData) - inputData.getTimezoneOffset() * 1000 * 60);
	};

	const LCHDateLocalOffsetSubtractedRecipe = function() {
		return {
			LCHRecipeSignature: 'LCHDateLocalOffsetSubtracted',
			LCHRecipeInputTypes: 'Date',
			LCHRecipeCallback: LCHDateLocalOffsetSubtractedCallback,
		};
	};

	var LCHDateLocalOffsetSubtracted = /*#__PURE__*/Object.freeze({
		LCHDateLocalOffsetSubtractedCallback: LCHDateLocalOffsetSubtractedCallback,
		LCHDateLocalOffsetSubtractedRecipe: LCHDateLocalOffsetSubtractedRecipe
	});

	// https://stackoverflow.com/questions/1599660/which-html-elements-can-receive-focus
	const LCHFocusElementsSelector= [
		'a[href]:not([tabindex="-1"])',
	  // 'area[href]:not([tabindex="-1"])',
	  'input:not([disabled]):not([tabindex="-1"]):not([type="hidden"])',
	  // 'select:not([disabled]):not([tabindex="-1"])',
	  // 'textarea:not([disabled]):not([tabindex="-1"])',
	  'button:not([disabled]):not([tabindex="-1"])',
	  // 'iframe:not([tabindex="-1"])',
	  // '[tabindex]:not([tabindex="-1"])',
	  // '[contentEditable=true]:not([tabindex="-1"])',
	].join(',');

	const LCHActiveDocumentsFocusElements = function(inputData) {
		if (typeof inputData !== 'object' || inputData === null || typeof inputData.querySelectorAll !== 'function') {
			throw new Error('LCHErrorInputNotValid');
		}

		const aggregate = {
			ids: {},
		};

		return [].concat.apply([], inputData.querySelectorAll(LCHFocusElementsSelector)).filter(function (e) {
			return {
				'A': function FocusElementAnchorFilter (e) {
					if (!e.href) {
						return false;
					}				
					if (!e.textContent.trim() && !e.title.trim()) {
						return false;
					}				
					return true;
				},
				'INPUT': function FocusElementInputFilter (e) {
					if (!aggregate.labels) {
						aggregate.labels = Array.from(inputData.querySelectorAll('label'));
					}
					aggregate.ids[e.id] = aggregate.labels.filter(function (label) {
						return label.getAttribute('for') === e.id;
					}).map(function (e) {
						return e.textContent.trim();
					}).shift();

					if (!e.name.trim() && !e.placeholder.trim() && !aggregate.ids[e.id]) {
						return false;
					}
					return true;
				},
				'BUTTON': function FocusElementButtonFilter (e) {
					if (!e.textContent.trim()) {
						return false;
					}
					return true;
				}
			}[e.tagName](e);
		}).map(function (e) {
			return {
				LCHRecipeName: {
					'A': function FocusElementAnchorNameg (e) {
						return e.textContent.trim() || e.title.trim()
					},
					'INPUT': function FocusElementInputNameg (e) {
						return aggregate.ids[e.id] || e.placeholder.trim() || e.name.trim();
					},
					'BUTTON': function FocusElementButtonName (e) {
						return e.textContent.trim();
					},
				}[e.tagName](e),
				LCHRecipeCallback () {
					return e;
				},
				LCHRecipeOutputType: 'DOMElement',
			};
		});
	};

	const LCHActiveDocumentFocusElementsCallback = function() {
		return LCHActiveDocumentsFocusElements(document);
	};

	const LCHActiveDocumentFocusElementsRecipe = function() {
		return {
			LCHRecipeSignature: 'LCHActiveDocumentFocusElements',
			LCHRecipeOutputType: 'SubjectContainer',
			LCHRecipeCallback: LCHActiveDocumentFocusElementsCallback,
		};
	};

	var LCHActiveDocumentFocusElements = /*#__PURE__*/Object.freeze({
		LCHActiveDocumentsFocusElements: LCHActiveDocumentsFocusElements,
		LCHActiveDocumentFocusElementsCallback: LCHActiveDocumentFocusElementsCallback,
		LCHActiveDocumentFocusElementsRecipe: LCHActiveDocumentFocusElementsRecipe
	});

	const LCHCopyToClipboardCallback = function(inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('LCHErrorInputNotValid');
		}

		if (!inputData.trim().length) {
			throw new Error('LCHErrorInputNotValid');
		}

		// if (typeof navigator !== 'undefined' && navigator.clipboard) {
		// 	return Promise.resolve((async function () {
		// 		return await navigator.clipboard.writeText(inputData);
		// 	})());
		// }

		// if (typeof document !== 'undefined') {
		// 	(function () {
		// 		const el = document.createElement('textarea');
				
		// 		el.value = inputData;
				
		// 		el.setAttribute('readonly', '');
		// 		el.style.position = 'fixed';
		// 		el.style.top = 0;
				
		// 		document.body.appendChild(el);
		// 		el.select();
		// 		document.execCommand('copy');
				
		// 		el.remove();
		// 	})();
		// }

		return {
			LCHComponentDescriptorName: 'LCHCopyToClipboard',
			LCHComponentDescriptorProps: {
				inputData: inputData,
			},
			LCHComponentDescriptorCompletionHandlerSignature: 'LCHCopyToClipboardCompletionHandler',
			LCHComponentDescriptorOLSKLocalized: true,
		};
	};

	const LCHCopyToClipboardRecipe = function() {
		return {
			LCHRecipeSignature: 'LCHCopyToClipboard',
			LCHRecipeInputTypes: 'String',
			LCHRecipeCallback: LCHCopyToClipboardCallback,
		};
	};

	var LCHCopyToClipboard = /*#__PURE__*/Object.freeze({
		LCHCopyToClipboardCallback: LCHCopyToClipboardCallback,
		LCHCopyToClipboardRecipe: LCHCopyToClipboardRecipe
	});

	const LCHDOMElementFocusCallback = function(inputData) {
		if (!inputData) {
			return;
		}

		inputData.focus();
	};

	const LCHDOMElementFocusRecipe = function() {
		return {
			LCHRecipeSignature: 'LCHDOMElementFocus',
			LCHRecipeInputTypes: 'DOMElement',
			LCHRecipeCallback: LCHDOMElementFocusCallback,
		};
	};

	var LCHDOMElementFocus = /*#__PURE__*/Object.freeze({
		LCHDOMElementFocusCallback: LCHDOMElementFocusCallback,
		LCHDOMElementFocusRecipe: LCHDOMElementFocusRecipe
	});

	const LCHLargeTextCallback = function(inputData) {
		if (typeof document === 'undefined') {
			return;
		}

		const rootElement = document.createElement('div');
		rootElement.className = 'LCHLargeTextContainer';

		for (let [key, value] of Object.entries({
			width: '100%',

			position: 'fixed',
			top: '45%',
			left: '0',

			textAlign: 'center',

			cursor: 'default',
		})) {
			rootElement.style[key] = value;
		}

		const span = document.createElement('span');
		span.textContent = inputData;
		rootElement.appendChild(span);

		for (let [key, value] of Object.entries({
			display: 'block-inline',
			borderRadius: '20px',
			boxShadow: '0 0 10px 0px hsla(0, 0%, 0%, 0.1)',
			padding: '20px',

			background: 'hsla(0, 0%, 0%, 0.8)',
			color: 'white',
			fontFamily: 'Arial',
			fontSize: '72pt',
			fontWeight: 'bold',
			textAlign: 'center',
			textShadow: '5px 5px 10px hsla(0, 0%, 0%, 0.5)',
			overflowWrap: 'break-word',
		})) {
			span.style[key] = value;
		}
		
		document.body.appendChild(rootElement);

		let handler = function (event) {
			event.preventDefault();

			if (!event.key && rootElement.contains(event.target)) {
		  	return;
			}
			
			window.removeEventListener('click', handler);
			window.removeEventListener('keydown', handler);
			
			rootElement.remove();
		};

		setTimeout(function () {
			window.addEventListener('click', handler);
			window.addEventListener('keydown', handler);
		});
	};

	const LCHLargeTextRecipe = function() {
		return {
			LCHRecipeSignature: 'LCHLargeText',
			LCHRecipeInputTypes: 'String',
			LCHRecipeCallback: LCHLargeTextCallback,
		};
	};

	var LCHLargeText = /*#__PURE__*/Object.freeze({
		LCHLargeTextCallback: LCHLargeTextCallback,
		LCHLargeTextRecipe: LCHLargeTextRecipe
	});

	const LCHRunCommandCallback = function(inputData) {
		return inputData;
	};

	const LCHRunCommandRecipe = function() {
		return {
			LCHRecipeSignature: 'LCHRunCommand',
			LCHRecipeInputTypes: 'Command',
			LCHRecipeCallback: LCHRunCommandCallback,
		};
	};

	var LCHRunCommand = /*#__PURE__*/Object.freeze({
		LCHRunCommandCallback: LCHRunCommandCallback,
		LCHRunCommandRecipe: LCHRunCommandRecipe
	});

	const LCHFlip = function(param1, param2) {
		if (typeof param1 !== 'function') {
			throw new Error('LCHErrorInputNotValid');
		}

		return function() {
			return param1.apply(param2, Array.from(arguments).reverse());
		};
	};

	const LCHSearchActionURLFrom = function(param1, param2) {
		if (typeof param1 !== 'string') {
			throw new Error('LCHErrorInputNotValid');
		}

		if (typeof param2 !== 'string') {
			throw new Error('LCHErrorInputNotValid');
		}

		if (!param1.match(/LCHSEARCHTOKEN/i)) {
			return param1;
		}

		return param1.replace(/LCHSEARCHTOKEN/i, param2.split(' ').map(function (e) {
			return encodeURIComponent(e);
		}).join('+'));
	};

	const LCHSearchWithCallback = function(param1, param2) {
		return this.api.fn('LCHURLOpen')(LCHSearchActionURLFrom(param2, param1));
	};

	const LCHSearchWithRecipe = function() {
		return {
			LCHRecipeSignature: 'LCHSearchWith',
			LCHRecipeInputTypes: 'String,ServiceSearchURLTemplate',
			LCHRecipeCallback: LCHSearchWithCallback,
		};
	};
	const LCHSearchForCallback = function() {
		return LCHFlip(LCHSearchWithCallback, this)(...arguments);
	};

	const LCHSearchForRecipe = function() {
		return {
			LCHRecipeSignature: 'LCHSearchFor',
			LCHRecipeInputTypes: 'ServiceSearchURLTemplate,String',
			LCHRecipeCallback: LCHSearchForCallback,
		};
	};

	var LCHSearchAction = /*#__PURE__*/Object.freeze({
		LCHSearchActionURLFrom: LCHSearchActionURLFrom,
		LCHSearchWithCallback: LCHSearchWithCallback,
		LCHSearchWithRecipe: LCHSearchWithRecipe,
		LCHSearchForCallback: LCHSearchForCallback,
		LCHSearchForRecipe: LCHSearchForRecipe
	});

	const LCHServiceSearchWikipediaCallback = function() {
		return 'https://wikipedia.org/w/index.php?search=LCHSEARCHTOKEN';
	};

	const LCHServiceSearchWikipediaRecipe = function() {
		return {
			LCHRecipeName: 'Wikipedia',
			LCHRecipeOutputType: 'ServiceSearchURLTemplate',
			LCHRecipeCallback: LCHServiceSearchWikipediaCallback,
			LCHRecipeSignature: 'LCHServiceSearchWikipedia',
		};
	};

	var LCHServiceSearchWikipedia = /*#__PURE__*/Object.freeze({
		LCHServiceSearchWikipediaCallback: LCHServiceSearchWikipediaCallback,
		LCHServiceSearchWikipediaRecipe: LCHServiceSearchWikipediaRecipe
	});

	const LCHSubjectContainerShowContentsCallback = function(inputData) {
		return inputData;
	};

	const LCHSubjectContainerShowContentsRecipe = function() {
		return {
			LCHRecipeSignature: 'LCHSubjectContainerShowContents',
			LCHRecipeInputTypes: 'SubjectContainer',
			LCHRecipeCallback: LCHSubjectContainerShowContentsCallback,
		};
	};

	var LCHSubjectContainerShowContents = /*#__PURE__*/Object.freeze({
		LCHSubjectContainerShowContentsCallback: LCHSubjectContainerShowContentsCallback,
		LCHSubjectContainerShowContentsRecipe: LCHSubjectContainerShowContentsRecipe
	});

	const LCHURLOpenCallback = function(inputData) {
		if (!inputData) {
			return;
		}

		window.open(inputData, '_blank').focus();
	};

	const LCHURLOpenRecipe = function() {
		return {
			LCHRecipeSignature: 'LCHURLOpen',
			LCHRecipeInputTypes: 'URL',
			LCHRecipeCallback: LCHURLOpenCallback,
		};
	};

	var LCHURLOpen = /*#__PURE__*/Object.freeze({
		LCHURLOpenCallback: LCHURLOpenCallback,
		LCHURLOpenRecipe: LCHURLOpenRecipe
	});

	const LCHLauncherStandardRecipes = function() {
		return [].concat.apply([], [
			Bool,
			Date$1,
			DOMElement,
			ServiceSearchURLTemplate,
			String$1,
			URL,
			
			Command,
			ServiceSearch,
			SubjectContainer,
			
			LCHActiveDocumentFocusElements,

			LCHDateLocalOffsetSubtracted,

			LCHCopyToClipboard,
			LCHDOMElementFocus,
			LCHLargeText,
			LCHRunCommand,
			LCHSearchAction,
			LCHServiceSearchWikipedia,
			LCHSubjectContainerShowContents,
			LCHURLOpen,
		].map(function (e) {
			return Object.entries(e).filter(function (e) {
				return e.shift().includes('Recipe');
			}).map(function (e) {
				return e.pop()();
			}).map(function (e) {
				return e;
			});
		}));
	};

	Array.prototype._LCHIntersect = function() {
		return this.map(function (e) {
			return new Set(e);
		}).reduce(function (a, b) {
			return a.filter(i => b.has(i));
		}, [...new Set([].concat.apply([], this))]);
	};

	const mod$2 = {

		LCHRecipesModelErrorsFor (inputData, options = {}) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('LCHErrorInputNotValid');
			}

			const errors = mod.LCHFormulaTo(mod.LCHFormulaModelErrorsFor(mod.LCHFormulaFrom(inputData)) || {}, 'LCHRecipe');

			if (typeof inputData.LCHRecipeCallback !== 'function') {
				errors.LCHRecipeCallback = [
					'LCHErrorNotFunction',
				];
			}

			if (typeof inputData.LCHRecipeName === 'string') {
				if (!inputData.LCHRecipeName.trim()) {
					errors.LCHRecipeName = [
						'LCHErrorNotFilled',
					];
				}
			}

			if (typeof inputData.LCHRecipeInputTypes === 'string') {
				if (inputData.LCHRecipeInputTypes.trim() !== inputData.LCHRecipeInputTypes) {
					errors.LCHRecipeInputTypes = [
						'LCHErrorNotTrimmed',
					];
				}

				if (!inputData.LCHRecipeInputTypes.trim()) {
					errors.LCHRecipeInputTypes = [
						'LCHErrorNotFilled',
					];
				}
			}

			if (typeof inputData.LCHRecipeOutputType === 'string') {
				if (inputData.LCHRecipeOutputType.trim() !== inputData.LCHRecipeOutputType) {
					errors.LCHRecipeOutputType = [
						'LCHErrorNotTrimmed',
					];
				}

				if (!inputData.LCHRecipeOutputType.trim()) {
					errors.LCHRecipeOutputType = [
						'LCHErrorNotFilled',
					];
				}
			}

			if (inputData.LCHRecipeCanonicalExampleCallback !== undefined || options.LCHOptionValidateIfNotPresent) {
				if (typeof inputData.LCHRecipeCanonicalExampleCallback !== 'function') {
					errors.LCHRecipeCanonicalExampleCallback = [
						'LCHErrorNotFunction',
					];
				}
			}

			if (typeof inputData.LCHRecipeSignature === 'string') {
				if (!inputData.LCHRecipeSignature.trim()) {
					errors.LCHRecipeSignature = [
						'LCHErrorNotFilled',
					];
				} else if (inputData.LCHRecipeSignature.trim() !== inputData.LCHRecipeSignature) {
					errors.LCHRecipeSignature = [
						'LCHErrorNotTrimmed',
					];
				}
			}

			return Object.entries(errors).length ? errors : null;
		},

		LCHRecipesModelIsCommand (inputData) {
			if (mod$2.LCHRecipesModelErrorsFor(inputData)) {
				throw new Error('LCHErrorInputNotValid');
			}

			if (!inputData.LCHRecipeName) {
				return false;
			}
			
			if (inputData.LCHRecipeInputTypes) {
				return false;
			}

			if (inputData.LCHRecipeOutputType) {
				return false;
			}

			return true;
		},

		LCHRecipesModelIsSubject (inputData) {
			if (mod$2.LCHRecipesModelErrorsFor(inputData)) {
				throw new Error('LCHErrorInputNotValid');
			}

			if (!inputData.LCHRecipeName) {
				return false;
			}
			
			// if (inputData.LCHRecipeInputTypes) {
			// 	return false;
			// }

			if (!inputData.LCHRecipeOutputType) {
				return false;
			}

			return true;
		},

		LCHRecipesModelIsAction (inputData) {
			if (mod$2.LCHRecipesModelErrorsFor(inputData)) {
				throw new Error('LCHErrorInputNotValid');
			}

			if (!inputData.LCHRecipeName) {
				return false;
			}

			if (!inputData.LCHRecipeInputTypes) {
				return false;
			}
			
			// if (!inputData.LCHRecipeCallback.length) {
			// 	return false;
			// }

			return true;
		},

		LCHRecipesModelIsType (inputData) {
			if (mod$2.LCHRecipesModelErrorsFor(inputData)) {
				throw new Error('LCHErrorInputNotValid');
			}
			
			// if (inputData.LCHRecipeCallback.length !== 1) {
			// 	return false;
			// }

			if (inputData.LCHRecipeOutputType !== 'Bool') {
				return false;
			}

			if (!inputData.LCHRecipeCanonicalExampleCallback) {
				return false;
			}

			if (!inputData.LCHRecipeSignature) {
				return false;
			}

			return true;
		},

		LCHRecipesModelIsTask (inputData) {
			if (mod$2.LCHRecipesModelErrorsFor(inputData)) {
				throw new Error('LCHErrorInputNotValid');
			}
			
			// if (inputData.LCHRecipeCallback.length) {
			// 	return false;
			// }

			if (!inputData.LCHRecipeURLFilter) {
				return false;
			}

			if (inputData.LCHRecipeIsAutomatic !== true) {
				return false;
			}

			return true;
		},

		LCHLauncherConvertTypeServiceSearch (inputData, _stringCallback) {
			if (!Array.isArray(inputData)) {
				throw new Error('LCHErrorInputNotValid');
			}

			return inputData.filter(function (e) {
				if (typeof e !== 'object' || e === null) {
					return false;
				}
				
				return true;
			}).map(function (e) {
				if (!LCHTypeServiceSearchRecipe().LCHRecipeCallback(e)) {
					return e;
				}

				return {
					LCHRecipeName: _stringCallback(e.LCHRecipeName),
					LCHRecipeInputTypes: 'String',
					LCHRecipeCallback (inputData) {
						return this.api.fn('LCHSearchWith')(inputData, e);
					},
					_LCHLauncherGenerated: true,
				};
			});
		},

		LCHRecipesModelActionTakesObject (inputData) {
			if (mod$2.LCHRecipesModelErrorsFor(inputData)) {
				throw new Error('LCHErrorInputNotValid');
			}

			if (!mod$2.LCHRecipesModelIsAction(inputData)) {
				throw new Error('LCHErrorInputNotValid');
			}
			
			if (mod$1.LCHRuntimeInputTypes(inputData.LCHRecipeInputTypes).length < 2) {
				return false;
			}
			
			// if (inputData.LCHRecipeCallback.length < 2) {
			// 	return false;
			// }

			return true;
		},

		LCHRecipesModelActionTakesParams (inputData) {
			if (mod$2.LCHRecipesModelErrorsFor(inputData)) {
				throw new Error('LCHErrorInputNotValid');
			}

			if (!mod$2.LCHRecipesModelIsAction(inputData)) {
				throw new Error('LCHErrorInputNotValid');
			}
			
			if (mod$1.LCHRuntimeInputTypes(inputData.LCHRecipeInputTypes).pop() !== 'Object') {
				return false;
			}
			
			// if (inputData.LCHRecipeCallback.length !== LCHRuntime.LCHRuntimeInputTypes(inputData.LCHRecipeInputTypes).length) {
			// 	return false;
			// }

			return true;
		},

		LCHAPITypeEquivalenceMapForRecipes (inputData) {
			if (!Array.isArray(inputData)) {
				throw new Error('LCHErrorInputNotValid');
			}

			const uniqueSignatures = [];
			const validRecipes = inputData.filter(function (e) {
				if (mod$2.LCHRecipesModelErrorsFor(e)) {
					return false;
				}

				if (!mod$2.LCHRecipesModelIsType(e)) {
					return false;
				}

				if (!e.LCHRecipeCallback(e.LCHRecipeCanonicalExampleCallback())) {
					return false;
				}

				if (uniqueSignatures.includes(e.LCHRecipeSignature)) {
					return false;
				}

				uniqueSignatures.push(e.LCHRecipeSignature);

				return true;
			});

			return validRecipes.reduce(function (coll, item) {
				coll[item.LCHRecipeSignature] = validRecipes.filter(function (e) {
					if (item === e) {
						return true;
					}

					if (e._LCHRecipeTypeIsExclusive) {
						return false;
					}

					if (item._LCHRecipeTypeIsExclusive) {
						return false;
					}

					return e.LCHRecipeCallback(item.LCHRecipeCanonicalExampleCallback());
				}).map(function (e) {
					return e.LCHRecipeSignature;
				});

				return coll;
			}, {});
		},

		LCHAPITypeNameMap (inputData) {
			if (!Array.isArray(inputData)) {
				throw new Error('LCHErrorInputNotValid');
			}

			const validRecipes = inputData.filter(function (e) {
				if (mod$2.LCHRecipesModelErrorsFor(e)) {
					return false;
				}

				return mod$2.LCHRecipesModelIsType(e);
			});

			return validRecipes.reduce(function (coll, item) {
				if (coll[item.LCHRecipeSignature]) {
					return coll;
				}

				coll[item.LCHRecipeSignature] = item.LCHRecipeName || item.LCHRecipeSignature;

				return coll;
			}, {});
		},

		LCHAPIActionsForType (param1, param2) {
			if (typeof param1 !== 'string') {
				throw new Error('LCHErrorInputNotValid');
			}

			if (!Array.isArray(param2)) {
				throw new Error('LCHErrorInputNotValid');
			}

			return param2.filter(function (e) {
				if (mod$2.LCHRecipesModelErrorsFor(e)) {
					return false;
				}

				if (!mod$2.LCHRecipesModelIsAction(e)) {
					return false;
				}

				if (mod$1.LCHRuntimeInputTypes(e.LCHRecipeInputTypes).shift() !== param1) {
					return false;
				}

				return true;
			});
		},

		LCHAPISubjectsForType (param1, param2) {
			if (typeof param1 !== 'string') {
				throw new Error('LCHErrorInputNotValid');
			}

			if (!Array.isArray(param2)) {
				throw new Error('LCHErrorInputNotValid');
			}

			return param2.filter(function (e) {
				if (mod$2.LCHRecipesModelErrorsFor(e)) {
					return false;
				}

				if (!mod$2.LCHRecipesModelIsSubject(e)) {
					return false;
				}

				if (e.LCHRecipeOutputType !== param1) {
					return false;
				}

				return true;
			});
		},

		LCHCompositionModelErrors (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('LCHErrorInputNotValid');
			}

			if (!inputData.LCHCompositionAction) {
				return {
					LCHCompositionAction: [
						'LCHErrorInputNotPresent',
					],
				};
			}

			if (!mod$2.LCHRecipesModelIsAction(inputData.LCHCompositionAction)) {
				return {
					LCHCompositionAction: [
						'LCHErrorInputNotValid',
					],
				};
			}

			const errors = {};

			if (!inputData.LCHCompositionSubjectPrimary) {
				return {
					LCHCompositionSubjectPrimary: [
						'LCHErrorInputNotPresent',
					],
				};
			} else if (inputData.LCHCompositionAction.LCHRecipeInputTypes === 'Command' && mod$2.LCHRecipesModelIsCommand(inputData.LCHCompositionSubjectPrimary)) ;

			// if (!mod.LCHRecipesModelIsSubject(inputData.LCHCompositionSubjectPrimary)) {
			// 	errors.LCHCompositionSubjectPrimary = [
			// 		'LCHErrorInputNotValid',
			// 	];
			// }

			else if (inputData.LCHCompositionAction.LCHRecipeInputTypes && !mod$1.LCHRuntimeInputTypes(inputData.LCHCompositionAction.LCHRecipeInputTypes).includes(inputData.LCHCompositionSubjectPrimary.LCHRecipeOutputType)) {
				errors.LCHCompositionSubjectPrimary = [
					'LCHErrorInputNotValid',
				];
			}

			if (inputData.LCHCompositionAction.LCHRecipeInputTypes && mod$1.LCHRuntimeInputTypes(inputData.LCHCompositionAction.LCHRecipeInputTypes).length === 2 && !inputData.LCHCompositionSubjectSecondary) {
				errors.LCHCompositionSubjectSecondary = [
					'LCHErrorInputNotValid',
				];
			}

			if (inputData.LCHCompositionSubjectSecondary !== undefined) {
				if (!mod$2.LCHRecipesModelIsSubject(inputData.LCHCompositionSubjectSecondary)) {
					errors.LCHCompositionSubjectSecondary = [
						'LCHErrorInputNotValid',
					];
				}

				if (inputData.LCHCompositionAction.LCHRecipeInputTypes && !mod$1.LCHRuntimeInputTypes(inputData.LCHCompositionAction.LCHRecipeInputTypes).includes(inputData.LCHCompositionSubjectSecondary.LCHRecipeOutputType)) {
					errors.LCHCompositionSubjectSecondary = [
						'LCHErrorInputNotValid',
					];
				}
			}

			return Object.entries(errors).length ? errors : null;
		},

		async LCHAPIExecuteComposition (inputData, api = {}) {
			if (mod$2.LCHCompositionModelErrors(inputData)) {
				return Promise.reject(new Error('LCHErrorInputNotValid'));
			}

			if (typeof api.fn !== 'function') {
				return Promise.reject(new Error('LCHErrorInputNotValid'));
			}

			return mod$2.LCHAPIExecuteRecipe(inputData.LCHCompositionAction, [
				await mod$2.LCHAPIExecuteRecipe(inputData.LCHCompositionSubjectPrimary, [], api),
			].concat(inputData.LCHCompositionSubjectSecondary ? [
				await mod$2.LCHAPIExecuteRecipe(inputData.LCHCompositionSubjectSecondary, [], api),
			] : []), api);
		},

		async LCHAPIExecuteRecipe (param1, param2 = [], param3 = {}) {
			if (mod$2.LCHRecipesModelErrorsFor(param1)) {
				return Promise.reject(new Error('LCHErrorInputNotValid'));
			}

			if (!Array.isArray(param2)) {
				return Promise.reject(new Error('LCHErrorInputNotValid'));
			}

			if (typeof param3.fn !== 'function') {
				return Promise.reject(new Error('LCHErrorInputNotValid'));
			}

			if (param1.LCHRecipeStyle && typeof document !== 'undefined') {
				document.body.appendChild(document.createElement('style')).innerHTML = param1.LCHRecipeStyle;
			}

			return Promise.resolve(param1.LCHRecipeCallback.apply({
				api: param3,
			}, param2.length ? param2 : undefined)); // #mysterious Firefox throws `Permission denied to access property "length"` if array is empty
		},

		LCHComponentDescriptorsModelErrorsFor (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('LCHErrorInputNotValid');
			}

			const errors = {};

			if (typeof inputData.LCHComponentDescriptorName !== 'string') {
				errors.LCHComponentDescriptorName = [
					'LCHErrorNotString',
				];
			}

			if (typeof inputData.LCHComponentDescriptorName === 'string' && !inputData.LCHComponentDescriptorName) {
				errors.LCHComponentDescriptorName = [
					'LCHErrorNotFilled',
				];
			}

			if (typeof inputData.LCHComponentDescriptorName === 'string' && inputData.LCHComponentDescriptorName.trim() !== inputData.LCHComponentDescriptorName) {
				errors.LCHComponentDescriptorName = [
					'LCHErrorNotTrimmed',
				];
			}

			if (typeof inputData.LCHComponentDescriptorCompletionHandlerSignature !== 'string') {
				errors.LCHComponentDescriptorCompletionHandlerSignature = [
					'LCHErrorNotString',
				];
			}

			if (typeof inputData.LCHComponentDescriptorCompletionHandlerSignature === 'string' && !inputData.LCHComponentDescriptorCompletionHandlerSignature) {
				errors.LCHComponentDescriptorCompletionHandlerSignature = [
					'LCHErrorNotFilled',
				];
			}

			if (typeof inputData.LCHComponentDescriptorCompletionHandlerSignature === 'string' && inputData.LCHComponentDescriptorCompletionHandlerSignature.trim() !== inputData.LCHComponentDescriptorCompletionHandlerSignature) {
				errors.LCHComponentDescriptorCompletionHandlerSignature = [
					'LCHErrorNotTrimmed',
				];
			}

			if (inputData.LCHComponentDescriptorProps !== undefined) {
				if (typeof inputData.LCHComponentDescriptorProps !== 'object' || inputData.LCHComponentDescriptorProps === null) {
					errors.LCHComponentDescriptorProps = [
						'LCHErrorNotObject',
					];
				}
			}

			return Object.entries(errors).length ? errors : null;
		},

		LCHRuntimeFilteredRecipes  (param1, param2) {
			if (!Array.isArray(param1)) {
				throw new Error('LCHErrorInputInvalid');
			}

			if (typeof param2 !== 'string') {
				throw new Error('LCHErrorInputInvalid');
			}

			return param1.filter(function (e) {
				if (mod$2.LCHRecipesModelErrorsFor(e)) {
					return false;
				}

				if (typeof e.LCHRecipeURLFilter === 'undefined') {
					return true;
				}

				return mod$1.LCHRuntimeURLFilter(e.LCHRecipeURLFilter, param2);
			});
		},

		LCHRuntimeFilteredTasks  (inputData) {
			if (!Array.isArray(inputData)) {
				throw new Error('LCHErrorInputInvalid');
			}

			return inputData.filter(function (e) {
				if (!mod$2.LCHRecipesModelIsTask(e)) {
					return false;
				}

				if (e.LCHRecipeIsExcluded) {
					return !e.LCHRecipeIsExcluded();
				}

				return true;
			});
		},

		LCHAPIRunTasks  () {
			const inputData = mod$2.LCHRuntimeFilteredRecipes.apply(null, Array.from(arguments));
			const api = mod$1.LCHRuntimeAPI(LCHLauncherStandardRecipes().concat(inputData));

			return Promise.all(mod$2.LCHRuntimeFilteredTasks(inputData).map(function (e) {
				return mod$2.LCHAPIExecuteRecipe(e, [], api);
			}));
		},

		LCHRecipeProxyModelErrorsFor (inputData, options = {}) {
			if (typeof inputData !== 'object' || inputData === null) {
				return {};
			}

			const errors = {};

			if (typeof inputData.LCHRecipeProxyName !== 'string') {
				errors.LCHRecipeProxyName = [
					'LCHErrorNotString',
				];
			}

			if (typeof inputData.LCHRecipeProxySignature !== 'string') {
				errors.LCHRecipeProxySignature = [
					'LCHErrorNotString',
				];
			}

			return Object.entries(errors).length ? errors : null;
		},

	};

	const mod$3 = {

		LCHLauncherOptions (inputData, notify = function () {}) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('LCHErrorInputNotValid');
			}

			if (typeof inputData.LCHOptionRecipes === 'undefined') {
				inputData.LCHOptionRecipes = [];
			}
			if (!Array.isArray(inputData.LCHOptionRecipes)) {
				throw new Error('LCHOptionRecipesNotArray');
			}
			inputData.LCHOptionRecipes = inputData.LCHOptionRecipes.filter(function (e) {
				const errors = mod$2.LCHRecipesModelErrorsFor(e);

				if (errors) {
					notify('LCHOptionRecipesItemNotValid', e, errors);
				}
				return !errors;
			});

			if (typeof inputData.LCHOptionMode === 'undefined') {
				inputData.LCHOptionMode = mod$3.LCHLauncherModes().shift();
			}
			if (typeof inputData.LCHOptionMode !== 'undefined') {
				if (!mod$3.LCHLauncherModes().includes(inputData.LCHOptionMode)) {
					throw new Error('LCHOptionModeNotValid');
				}		}
			if (typeof inputData.LCHOptionCompletionHandler !== 'undefined') {
				if (typeof inputData.LCHOptionCompletionHandler !== 'function') {
					throw new Error('LCHOptionCompletionHandlerNotFunction');
				}		}
			if (typeof inputData.LCHOptionLanguage === 'undefined') {
				inputData.LCHOptionLanguage = 'en';
			}
			if (typeof inputData.LCHOptionLanguage !== 'string') {
				throw new Error('LCHOptionLanguageNotString')
			}
			return inputData;
		},

		LCHLauncherModeCommit () {
			return 'kLCHLauncherModeCommit';
		},

		LCHLauncherModePreview () {
			return 'kLCHLauncherModePreview';
		},

		LCHLauncherModePipe () {
			return 'kLCHLauncherModePipe';
		},

		LCHLauncherModeTask () {
			return 'kLCHLauncherModeTask';
		},

		LCHLauncherModes () {
			return [
				mod$3.LCHLauncherModeCommit(),
				mod$3.LCHLauncherModePreview(),
				mod$3.LCHLauncherModePipe(),
				mod$3.LCHLauncherModeTask(),
			];
		},

		LCHLauncherUIRecipesForMode (param1, param2) {
			if (!Array.isArray(param1)) {
				throw new Error('LCHErrorInputNotValid');
			}

			if (!mod$3.LCHLauncherModes().includes(param2)) {
				throw new Error('LCHErrorInputNotValid');
			}

			return param1.filter(function (e) {
				if (typeof e !== 'object' || e === null) {
					return false;
				}

				if (typeof e.LCHRecipeInputTypes === 'string' && e.LCHRecipeInputTypes.split(',').length > 2) {
					return false;
				}

				if (param2 === mod$3.LCHLauncherModeCommit()) {
					return mod$2.LCHRecipesModelIsCommand(e);
					// if (LCHLauncherAPI.LCHRecipesModelIsCommand(e)) {
					// 	return true;
					// };

					// if (!LCHLauncherAPI.LCHRecipesModelIsAction(e)) {
					// 	return false;
					// };

					// if (e.LCHRecipeCallback.length !== 1) {
					// 	return false;
					// };

					// if (e.LCHRecipeInputTypes !== 'String') {
					// 	return false;
					// };

					// if (e._LCHLauncherGenerated !== true) {
					// 	return false;
					// };
				}

				if (param2 === mod$3.LCHLauncherModePreview()) {
					return mod$2.LCHRecipesModelIsCommand(e);
				}
				
				return true;
			});
		},

		// import * as _fuzzysearch from 'fuzzysearch';
		// const fuzzysearch = typeof _fuzzysearch === 'function' ? _fuzzysearch : _fuzzysearch.default;
		// LCHLauncherFilterForText (inputData) {
		// 	if (typeof inputData !== 'string') {
		// 		throw new Error('LCHErrorInputNotValid');
		// 	}

		// 	return function (e) {
		// 		return [e.LCHRecipeName].filter(function (e) {
		// 			if (!e) {
		// 				return false;
		// 			}

		// 			return fuzzysearch(inputData.toLowerCase(), e.toLowerCase());
		// 		}).length > 0;
		// 	};
		// };

		LCHLauncherThrottleDuration: main_12() ? 25 : 1000,

		LCHLauncherKeyboardEventIsTextInput (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('LCHErrorInputNotValid');
			}

			if ([
				inputData.metaKey,
				inputData.shiftKey,
				inputData.ctrlKey,
				inputData.altKey,
			].includes(true)) {
				return false;
			}

			if (!inputData.key) {
				return false;
			}
			
			if ([
				'Unidentified',
				'Tab',
				'CapsLock',
				'ArrowRight',
				'ArrowLeft',
				'Backspace',
				'\\',
				'.',
				',',
				' ',
			].includes(inputData.key)) {
				return false;
			}
			
			return true;
		},

		LCHLauncherActionComparator (inputData) {
			if (typeof inputData !== 'string') {
				throw new Error('LCHErrorInputNotValid');
			}

			return function (a, b) {
				const param1s = [
					a.LCHRecipeInputTypes.split(',')[0],
					b.LCHRecipeInputTypes.split(',')[0],
				];
				const param2s = [
					a.LCHRecipeInputTypes.split(',')[1],
					b.LCHRecipeInputTypes.split(',')[1],
				];

				if (param1s[0] === inputData && param1s[1] === inputData) {
					if (!param2s[0] && param2s[1]) {
						return -1;
					}

					if (param2s[0] && !param2s[1]) {
						return 1;
					}
				}

				if (param1s[0] === inputData && param1s[1] !== inputData) {
					return -1;
				}

				if (param1s[1] === inputData && param1s[0] !== inputData) {
					return 1;
				}

				return 1;
			};
		},

		LCHLauncherConstrainIndex (param1, param2) {
			if (!Array.isArray(param1)) {
				throw new Error('LCHErrorInputNotValid');
			}

			if (typeof param2 !== 'number') {
				throw new Error('LCHErrorInputNotValid');
			}

			if (param2 < 0) {
				return param1.length - 1;
			}

			if (param2 >= param1.length) {
				return 0;
			}

			return param2;
		},

		LCHLauncherReloadableSubjects (inputData) {
			if (!Array.isArray(inputData)) {
				throw new Error('LCHErrorInputNotValid');
			}

			return [].concat.apply([], inputData).filter(function (e) {
				if (typeof e !== 'object' || e === null) {
					return false;
				}

				if (mod$2.LCHRecipesModelErrorsFor(e)) {
					return false;
				}
				if (!mod$2.LCHRecipesModelIsSubject(e)) {
					return false;
				}
				return true;
			});
		},

	};

	const LCHModeCommit = mod$3.LCHLauncherModeCommit();
	const LCHModePreview = mod$3.LCHLauncherModePreview();
	const LCHModePipe = mod$3.LCHLauncherModePipe();

	const mod$4 = {

		// DATA

		DataSingletonExists () {
			return !!mod$4._ValueSingleton;
		},

		// VALUE

		_ValueClass: undefined,
		
		_ValueTarget: undefined,
		
		_ValueSingleton: undefined,

		// CONTROL

		ControlRunTasks (inputData) {
			mod$2.LCHAPIRunTasks(inputData, window.location.href);
		},
		
		// LIFECYCLE

		LifecycleSingletonCreate (inputData = {}) {
			if (mod$4._ValueSingleton) {
				mod$4.LifecycleSingletonDestroy();
			}

			if (typeof document !== 'undefined') {
				document.body.appendChild(mod$4._ValueTarget = document.createElement('div'));
			}

			mod$4._ValueSingleton = new mod$4._ValueClass({
				target: mod$4._ValueTarget,
				props: {
					LRTOptions: inputData,
					LRTDidFinish () {
						mod$4.LifecycleSingletonDestroy();

						if (typeof inputData.LCHOptionCompletionHandler !== 'function') {
							return;
						}

						inputData.LCHOptionCompletionHandler();
					},
				},
			});
		},

		LifecycleSingletonDestroy () {
			mod$4._ValueSingleton.$destroy();
			
			delete mod$4._ValueSingleton;

			if (typeof document === 'undefined') {
				return;
			}

			mod$4._ValueTarget.remove();

			delete mod$4._ValueTarget;
		},

	};

	const LCHPackage = function () {
		const outputData = {
			LCHModeCommit,
			LCHModePreview,
			LCHModePipe,

			LCHSingletonCreate: mod$4.LifecycleSingletonCreate,
			LCHSingletonExists: mod$4.DataSingletonExists,
			LCHSingletonDestroy: mod$4.LifecycleSingletonDestroy,

			LCHTasksRun: mod$4.ControlRunTasks,
		};

		Object.freeze(outputData);

		return outputData;
	};

	var uiBehaviour = createCommonjsModule(function (module, exports) {
	!function(e,t){module.exports=t();}(commonjsGlobal,(function(){function e(){}function t(e,t){for(const r in t)e[r]=t[r];return e}function r(e){return e()}function o(){return Object.create(null)}function n(e){e.forEach(r);}function i(e){return "function"==typeof e}function a(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function l(e,t,r,o){if(e){const n=c(e,t,r,o);return e[0](n)}}function c(e,r,o,n){return e[1]&&n?t(o.ctx.slice(),e[1](n(r))):o.ctx}function u(e,t,r,o,n,i,a){const l=function(e,t,r,o){if(e[2]&&o){const n=e[2](o(r));if(void 0===t.dirty)return n;if("object"==typeof n){const e=[],r=Math.max(t.dirty.length,n.length);for(let o=0;o<r;o+=1)e[o]=t.dirty[o]|n[o];return e}return t.dirty|n}return t.dirty}(t,o,n,i);if(l){const n=c(t,r,o,a);e.p(n,l);}}function p(e){return null==e?"":e}function s(e,t){e.appendChild(t);}function C(e,t,r){e.insertBefore(t,r||null);}function L(e){e.parentNode.removeChild(e);}function m(e,t){for(let r=0;r<e.length;r+=1)e[r]&&e[r].d(t);}function d(e){return document.createElement(e)}function f(e){return document.createTextNode(e)}function H(){return f(" ")}function h(){return f("")}function y(e,t,r,o){return e.addEventListener(t,r,o),()=>e.removeEventListener(t,r,o)}function P(e,t,r){null==r?e.removeAttribute(t):e.getAttribute(t)!==r&&e.setAttribute(t,r);}function b(e,t){t=""+t,e.data!==t&&(e.data=t);}function S(e,t){e.value=null==t?"":t;}function R(e,t,r){e.classList[r?"add":"remove"](t);}let g;function I(e){g=e;}function T(){if(!g)throw new Error("Function called outside component initialization");return g}function O(e){T().$$.on_mount.push(e);}function v(){const e=T();return (t,r)=>{const o=e.$$.callbacks[t];if(o){const n=function(e,t){const r=document.createEvent("CustomEvent");return r.initCustomEvent(e,!1,!1,t),r}(t,r);o.slice().forEach(t=>{t.call(e,n);});}}}const E=[],w=[],x=[],V=[],_=Promise.resolve();let A=!1;function j(e){x.push(e);}let k=!1;const F=new Set;function M(){if(!k){k=!0;do{for(let e=0;e<E.length;e+=1){const t=E[e];I(t),D(t.$$);}for(E.length=0;w.length;)w.pop()();for(let e=0;e<x.length;e+=1){const t=x[e];F.has(t)||(F.add(t),t());}x.length=0;}while(E.length);for(;V.length;)V.pop()();A=!1,k=!1,F.clear();}}function D(e){if(null!==e.fragment){e.update(),n(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(j);}}const N=new Set;let K;function $(){K={r:0,c:[],p:K};}function U(){K.r||n(K.c),K=K.p;}function B(e,t){e&&e.i&&(N.delete(e),e.i(t));}function z(e,t,r,o){if(e&&e.o){if(N.has(e))return;N.add(e),K.c.push(()=>{N.delete(e),o&&(r&&e.d(1),o());}),e.o(t);}}const q="undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:commonjsGlobal;function W(e){e&&e.c();}function Z(e,t,o){const{fragment:a,on_mount:l,on_destroy:c,after_update:u}=e.$$;a&&a.m(t,o),j(()=>{const t=l.map(r).filter(i);c?c.push(...t):n(t),e.$$.on_mount=[];}),u.forEach(j);}function J(e,t){const r=e.$$;null!==r.fragment&&(n(r.on_destroy),r.fragment&&r.fragment.d(t),r.on_destroy=r.fragment=null,r.ctx=[]);}function G(e,t){-1===e.$$.dirty[0]&&(E.push(e),A||(A=!0,_.then(M)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31;}function Y(t,r,i,a,l,c,u=[-1]){const p=g;I(t);const s=r.props||{},C=t.$$={fragment:null,ctx:null,props:c,update:e,not_equal:l,bound:o(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(p?p.$$.context:[]),callbacks:o(),dirty:u};let m=!1;if(C.ctx=i?i(t,s,(e,r,...o)=>{const n=o.length?o[0]:r;return C.ctx&&l(C.ctx[e],C.ctx[e]=n)&&(C.bound[e]&&C.bound[e](n),m&&G(t,e)),r}):[],C.update(),m=!0,n(C.before_update),C.fragment=!!a&&a(C.ctx),r.target){if(r.hydrate){const e=function(e){return Array.from(e.childNodes)}(r.target);C.fragment&&C.fragment.l(e),e.forEach(L);}else C.fragment&&C.fragment.c();r.intro&&B(t.$$.fragment),Z(t,r.target,r.anchor),M();}I(p);}class X{$destroy(){J(this,1),this.$destroy=e;}$on(e,t){const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(t),()=>{const e=r.indexOf(t);-1!==e&&r.splice(e,1);}}$set(){}}var Q="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof commonjsGlobal?commonjsGlobal:"undefined"!=typeof self?self:{};function ee(){throw new Error("Dynamic requires are not currently supported by rollup-plugin-commonjs")}function te(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function re(e,t){return e(t={exports:{}},t.exports),t.exports}var oe=re((function(e,t){t.OLSKTestingFakeRequest=function(e={}){return console.warn("OLSKTestingFakeRequest DEPRECATED"),Object.assign({},e)},t.OLSKTestingFakeRequestForSession=function(e={}){return console.warn("OLSKTestingFakeRequestForSession DEPRECATED"),t.OLSKTestingFakeRequest({session:e})},t.OLSKTestingFakeRequestForHeaders=function(e={}){return console.warn("OLSKTestingFakeRequestForHeaders DEPRECATED"),t.OLSKTestingFakeRequest({headers:e})},t.OLSKTestingFakeResponse=function(e={}){return console.warn("OLSKTestingFakeResponse DEPRECATED"),Object.assign({},e)},t.OLSKTestingFakeResponseForLocals=function(e={}){return console.warn("OLSKTestingFakeResponseForLocals DEPRECATED"),t.OLSKTestingFakeResponse({locals:e})},t.OLSKTestingFakeResponseForJSON=function(){return console.warn("OLSKTestingFakeResponseForJSON DEPRECATED"),t.OLSKTestingFakeResponse({json:function(e){return e}})},t.OLSKTestingFakeResponseForRender=function(e){if(console.warn("OLSKTestingFakeResponseForRender DEPRECATED"),"function"!=typeof e)throw new Error("OLSKErrorInputNotValid");return t.OLSKTestingFakeResponse({render:e})},t.OLSKTestingFakeResponseForRedirect=function(){return console.warn("OLSKTestingFakeResponseForRedirect DEPRECATED"),t.OLSKTestingFakeResponse({redirect:function(e){return e}})},t.OLSKTestingFakeResponseForStatus=function(){console.warn("OLSKTestingFakeResponseForStatus DEPRECATED");var e=Object.assign(t.OLSKTestingFakeResponseForJSON(),{status:function(t){e.statusCode=t;}});return e},t.OLSKTestingFakeNext=function(){return console.warn("OLSKTestingFakeNext DEPRECATED"),function(e){return void 0===e?"RETURNED_UNDEFINED":e}},t._OLSKTestingMochaReplaceES6Import=function(e){const t=[];return e=e.replace(/^import \* as (\w+) from ['"]([^'"]+)['"];?/gm,'var $1 = require("$2");').replace(/^import (\w+) from ['"]([^'"]+)['"];?/gm,'var {default: $1} = require("$2");').replace(/^import {([^}]+)} from ['"](.+)['"];?/gm,'var {$1} = require("$2");').replace(/^export default /gm,"exports.default = ").replace(/^export (const|let|var|class|function) (\w+)/gm,(e,r,o)=>(t.push(o),`${r} ${o}`)).replace(/^export \{([^}]+)\}(?: from ['"]([^'"]+)['"];?)?/gm,(e,r,o)=>(r.split(",").filter(Boolean).forEach(e=>{t.push(e);}),o?`const { ${r} } = require("${o}");`:"")).replace(/^export function (\w+)/gm,"exports.$1 = function $1"),t.forEach(t=>{e+=`\nexports.${t} = ${t};`;}),e},t.OLSK_TESTING_BEHAVIOUR=function(){return "undefined"!=typeof navigator&&"Zombie"===navigator.appName};})),ne=(oe.OLSKTestingFakeRequest,oe.OLSKTestingFakeRequestForSession,oe.OLSKTestingFakeRequestForHeaders,oe.OLSKTestingFakeResponse,oe.OLSKTestingFakeResponseForLocals,oe.OLSKTestingFakeResponseForJSON,oe.OLSKTestingFakeResponseForRender,oe.OLSKTestingFakeResponseForRedirect,oe.OLSKTestingFakeResponseForStatus,oe.OLSKTestingFakeNext,oe._OLSKTestingMochaReplaceES6Import,oe.OLSK_TESTING_BEHAVIOUR);const ie={LCHFormulaSafeStringFields:["LCHFormulaID","LCHFormulaName","LCHFormulaSignature","LCHFormulaInputTypes","LCHFormulaOutputType","LCHFormulaStyle","LCHFormulaURLFilter","LCHFormulaCreationDate","LCHFormulaModificationDate","LCHFormulaSyntaxErrorMessage","@context"],LCHFormulaModelErrorsFor(e,t={}){if("object"!=typeof e||null===e)throw new Error("LCHErrorInputNotValid");const r={};return (void 0!==e.LCHFormulaName||t.LCHOptionValidateIfNotPresent)&&"string"!=typeof e.LCHFormulaName&&(r.LCHFormulaName=["LCHErrorNotString"]),(void 0!==e.LCHFormulaSignature||t.LCHOptionValidateIfNotPresent)&&"string"!=typeof e.LCHFormulaSignature&&(r.LCHFormulaSignature=["LCHErrorNotString"]),(void 0!==e.LCHFormulaInputTypes||t.LCHOptionValidateIfNotPresent)&&"string"!=typeof e.LCHFormulaInputTypes&&(r.LCHFormulaInputTypes=["LCHErrorNotString"]),(void 0!==e.LCHFormulaOutputType||t.LCHOptionValidateIfNotPresent)&&"string"!=typeof e.LCHFormulaOutputType&&(r.LCHFormulaOutputType=["LCHErrorNotString"]),void 0!==e.LCHFormulaIsHidden&&"function"!=typeof e.LCHFormulaIsHidden&&(r.LCHFormulaIsHidden=["LCHErrorNotFunction"]),(void 0!==e.LCHFormulaURLFilter||t.LCHOptionValidateIfNotPresent)&&"string"!=typeof e.LCHFormulaURLFilter&&(r.LCHFormulaURLFilter=["LCHErrorNotString"]),(void 0!==e.LCHFormulaIsAutomatic||t.LCHOptionValidateIfNotPresent)&&"boolean"!=typeof e.LCHFormulaIsAutomatic&&(r.LCHFormulaIsAutomatic=["LCHErrorNotBoolean"]),(void 0!==e.LCHFormulaStyle||t.LCHOptionValidateIfNotPresent)&&"string"!=typeof e.LCHFormulaStyle&&(r.LCHFormulaStyle=["LCHErrorNotString"]),(void 0!==e.LCHFormulaIsFlagged||t.LCHOptionValidateIfNotPresent)&&"boolean"!=typeof e.LCHFormulaIsFlagged&&(r.LCHFormulaIsFlagged=["LCHErrorNotBoolean"]),Object.entries(r).length?r:null},LCHFormulaFrom(e){if("object"!=typeof e||null===e)throw new Error("LCHErrorInputNotValid");return Object.entries(e).reduce((function(e,t){return e[t[0].replace(/LCH[A-Z][a-z]+/,"LCHFormula")]=t[1],e}),{})},LCHFormulaTo(e,t){if("object"!=typeof e||null===e)throw new Error("LCHErrorInputNotValid");if("string"!=typeof t)throw new Error("LCHErrorInputNotValid");return Object.entries(e).reduce((function(e,r){return e[r[0].replace("LCHFormula",t)]=r[1],e}),{})},LCHFormulaToEvaluate(e){if(ie.LCHFormulaModelErrorsFor(e))throw new Error("LCHErrorInputNotValid");let t=Object.fromEntries(Object.entries(e).filter((function(e){return !ie.LCHFormulaSafeStringFields.includes(e[0])})));return (t.LCHFormulaCallbackArgs||t.LCHFormulaCallbackBody)&&(t.LCHFormulaCallbackRaw=`(function (${t.LCHFormulaCallbackArgs||""}) { ${t.LCHFormulaCallbackBody||""} })`,delete t.LCHFormulaCallbackArgs,delete t.LCHFormulaCallbackBody),t.LCHFormulaCanonicalExampleCallbackBody&&(t.LCHFormulaCanonicalExampleCallbackRaw=`(function () { ${t.LCHFormulaCanonicalExampleCallbackBody||""} })`,delete t.LCHFormulaCanonicalExampleCallbackBody),t}},ae={LCHRuntimeURLFilter(e,t){if("string"!=typeof e)throw new Error("LCHErrorInputNotValid");if("string"!=typeof t)throw new Error("LCHErrorInputNotValid");if(!t)throw new Error("LCHErrorInputNotValid");if("*"===e)return !0;let r=e.match(/^\/(.*)\/(\w*)/i);return r&&r.shift()?!!t.match(new RegExp(r[0],r[1])):t.includes(e)},LCHRuntimeInputTypes(e){if("string"!=typeof e)throw new Error("LCHErrorInputNotValid");return e.split(",").map((function(e){return e.trim()})).filter((function(e){return !!e}))},LCHRuntimeAPI(e){if(!Array.isArray(e))throw new Error("LCHErrorInputNotValid");const t={fn(r){if("string"!=typeof r)throw new Error("LCHErrorIdentifierNotString");if(""===r)throw new Error("LCHErrorIdentifierBlank");if(r.trim()!==r)throw new Error("LCHErrorIdentifierContainsUntrimmedWhitespace");let o=e.filter((function(e){return e.LCHRecipeSignature===r})).shift();if(!o)throw new Error("LCHErrorIdentifierNotDefined");return o.LCHRecipeCallback.bind({api:t})}};return Object.assign(t,e.reduce((function(e,r){return e[r.LCHRecipeSignature]||(e[r.LCHRecipeSignature]=function(){const o=arguments;return (r.LCHRecipeInputTypes?ae.LCHRuntimeInputTypes(r.LCHRecipeInputTypes):[]).forEach((function(t,r){if(!e[t](o[r]))throw new Error("LCHErrorTypeMismatch")})),r.LCHRecipeCallback.apply({api:t},o)}),e}),{})),Object.freeze(t),t}},le=function(e){return !!e.LCHRecipeName&&(!e.LCHRecipeCallback.length&&"ServiceSearchURLTemplate"===e.LCHRecipeOutputType)},ce=function(){return {LCHRecipeName:"alfa",LCHRecipeCallback:()=>"http://example.com?q=LCHSEARCHTOKEN",LCHRecipeOutputType:"ServiceSearchURLTemplate"}},ue=function(){return {LCHRecipeSignature:"ServiceSearch",LCHRecipeCallback:le,LCHRecipeOutputType:"Bool",LCHRecipeCanonicalExampleCallback:ce}};var pe=Object.freeze({LCHTypeServiceSearchCallback:le,LCHTypeServiceSearchCanonicalExampleCallback:ce,LCHTypeServiceSearchRecipe:ue});const se=function(e){return !!e};var Ce=Object.freeze({LCHPrimitiveBoolCallback:se,LCHPrimitiveBoolRecipe:function(){return {LCHRecipeSignature:"Bool",LCHRecipeCallback:se}}});const Le=function(e){return e instanceof Date&&!Number.isNaN(e.getTime())},me=function(){return new Date(0)};var de=Object.freeze({LCHPrimitiveDateCallback:Le,LCHPrimitiveDateCanonicalExampleCallback:me,LCHPrimitiveDateRecipe:function(){return {LCHRecipeSignature:"Date",LCHRecipeCallback:Le,LCHRecipeOutputType:"Bool",LCHRecipeCanonicalExampleCallback:me}}});const fe=function(e){return "object"==typeof e&&null!==e&&"function"==typeof e.focus},He=function(){return {focus(){}}};var he=Object.freeze({LCHPrimitiveDOMElementCallback:fe,LCHPrimitiveDOMElementCanonicalExampleCallback:He,LCHPrimitiveDOMElementRecipe:function(){return {LCHRecipeCallback:fe,LCHRecipeOutputType:"Bool",LCHRecipeCanonicalExampleCallback:He,LCHRecipeSignature:"DOMElement",_LCHRecipeTypeIsExclusive:!0}}}),ye=function(e,t){if(t=t.split(":")[0],!(e=+e))return !1;switch(t){case"http":case"ws":return 80!==e;case"https":case"wss":return 443!==e;case"ftp":return 21!==e;case"gopher":return 70!==e;case"file":return !1}return 0!==e},Pe=Object.prototype.hasOwnProperty;function be(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(e){return null}}var Se={stringify:function(e,t){t=t||"";var r,o,n=[];for(o in"string"!=typeof t&&(t="?"),e)if(Pe.call(e,o)){if((r=e[o])||null!=r&&!isNaN(r)||(r=""),o=encodeURIComponent(o),r=encodeURIComponent(r),null===o||null===r)continue;n.push(o+"="+r);}return n.length?t+n.join("&"):""},parse:function(e){for(var t,r=/([^=?&]+)=?([^&]*)/g,o={};t=r.exec(e);){var n=be(t[1]),i=be(t[2]);null===n||null===i||n in o||(o[n]=i);}return o}},Re=/^[A-Za-z][A-Za-z0-9+-.]*:\/\//,ge=/^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i,Ie=new RegExp("^[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]+");function Te(e){return (e||"").toString().replace(Ie,"")}var Oe=[["#","hash"],["?","query"],function(e){return e.replace("\\","/")},["/","pathname"],["@","auth",1],[NaN,"host",void 0,1,1],[/:(\d+)$/,"port",void 0,1],[NaN,"hostname",void 0,1,1]],ve={hash:1,query:1};function Ee(e){var t,r=("undefined"!=typeof window?window:void 0!==Q?Q:"undefined"!=typeof self?self:{}).location||{},o={},n=typeof(e=e||r);if("blob:"===e.protocol)o=new xe(unescape(e.pathname),{});else if("string"===n)for(t in o=new xe(e,{}),ve)delete o[t];else if("object"===n){for(t in e)t in ve||(o[t]=e[t]);void 0===o.slashes&&(o.slashes=Re.test(e.href));}return o}function we(e){e=Te(e);var t=ge.exec(e);return {protocol:t[1]?t[1].toLowerCase():"",slashes:!!t[2],rest:t[3]}}function xe(e,t,r){if(e=Te(e),!(this instanceof xe))return new xe(e,t,r);var o,n,i,a,l,c,u=Oe.slice(),p=typeof t,s=this,C=0;for("object"!==p&&"string"!==p&&(r=t,t=null),r&&"function"!=typeof r&&(r=Se.parse),t=Ee(t),o=!(n=we(e||"")).protocol&&!n.slashes,s.slashes=n.slashes||o&&t.slashes,s.protocol=n.protocol||t.protocol||"",e=n.rest,n.slashes||(u[3]=[/(.*)/,"pathname"]);C<u.length;C++)"function"!=typeof(a=u[C])?(i=a[0],c=a[1],i!=i?s[c]=e:"string"==typeof i?~(l=e.indexOf(i))&&("number"==typeof a[2]?(s[c]=e.slice(0,l),e=e.slice(l+a[2])):(s[c]=e.slice(l),e=e.slice(0,l))):(l=i.exec(e))&&(s[c]=l[1],e=e.slice(0,l.index)),s[c]=s[c]||o&&a[3]&&t[c]||"",a[4]&&(s[c]=s[c].toLowerCase())):e=a(e);r&&(s.query=r(s.query)),o&&t.slashes&&"/"!==s.pathname.charAt(0)&&(""!==s.pathname||""!==t.pathname)&&(s.pathname=function(e,t){if(""===e)return t;for(var r=(t||"/").split("/").slice(0,-1).concat(e.split("/")),o=r.length,n=r[o-1],i=!1,a=0;o--;)"."===r[o]?r.splice(o,1):".."===r[o]?(r.splice(o,1),a++):a&&(0===o&&(i=!0),r.splice(o,1),a--);return i&&r.unshift(""),"."!==n&&".."!==n||r.push(""),r.join("/")}(s.pathname,t.pathname)),ye(s.port,s.protocol)||(s.host=s.hostname,s.port=""),s.username=s.password="",s.auth&&(a=s.auth.split(":"),s.username=a[0]||"",s.password=a[1]||""),s.origin=s.protocol&&s.host&&"file:"!==s.protocol?s.protocol+"//"+s.host:"null",s.href=s.toString();}xe.prototype={set:function(e,t,r){var o=this;switch(e){case"query":"string"==typeof t&&t.length&&(t=(r||Se.parse)(t)),o[e]=t;break;case"port":o[e]=t,ye(t,o.protocol)?t&&(o.host=o.hostname+":"+t):(o.host=o.hostname,o[e]="");break;case"hostname":o[e]=t,o.port&&(t+=":"+o.port),o.host=t;break;case"host":o[e]=t,/:\d+$/.test(t)?(t=t.split(":"),o.port=t.pop(),o.hostname=t.join(":")):(o.hostname=t,o.port="");break;case"protocol":o.protocol=t.toLowerCase(),o.slashes=!r;break;case"pathname":case"hash":if(t){var n="pathname"===e?"/":"#";o[e]=t.charAt(0)!==n?n+t:t;}else o[e]=t;break;default:o[e]=t;}for(var i=0;i<Oe.length;i++){var a=Oe[i];a[4]&&(o[a[1]]=o[a[1]].toLowerCase());}return o.origin=o.protocol&&o.host&&"file:"!==o.protocol?o.protocol+"//"+o.host:"null",o.href=o.toString(),o},toString:function(e){e&&"function"==typeof e||(e=Se.stringify);var t,r=this,o=r.protocol;o&&":"!==o.charAt(o.length-1)&&(o+=":");var n=o+(r.slashes?"//":"");return r.username&&(n+=r.username,r.password&&(n+=":"+r.password),n+="@"),n+=r.host+r.pathname,(t="object"==typeof r.query?e(r.query):r.query)&&(n+="?"!==t.charAt(0)?"?"+t:t),r.hash&&(n+=r.hash),n}},xe.extractProtocol=we,xe.location=Ee,xe.trimLeft=Te,xe.qs=Se;var Ve=xe,_e=Object.freeze({default:Ve,__moduleExports:Ve});const Ae="function"==typeof _e?_e:Ve,je=function(e){return "string"==typeof e&&!!new Ae(e,{}).hostname},ke=function(){return "http://example.com"};var Fe=Object.freeze({LCHPrimitiveURLCallback:je,LCHPrimitiveStringCanonicalExampleCallback:ke,LCHPrimitiveURLRecipe:function(){return {LCHRecipeSignature:"URL",LCHRecipeCallback:je,LCHRecipeOutputType:"Bool",LCHRecipeCanonicalExampleCallback:ke}}});const Me=function(e){return !!je(e)&&!!e.match(/LCHSEARCHTOKEN/i)},De=function(){return "http://example.com?q=LCHSEARCHTOKEN"};var Ne=Object.freeze({LCHPrimitiveServiceSearchURLTemplateCallback:Me,LCHPrimitiveServiceSearchURLTemplateCanonicalExampleCallback:De,LCHPrimitiveServiceSearchURLTemplateRecipe:function(){return {LCHRecipeCallback:Me,LCHRecipeOutputType:"Bool",LCHRecipeCanonicalExampleCallback:De,LCHRecipeSignature:"ServiceSearchURLTemplate",_LCHRecipeTypeIsExclusive:!0}}});const Ke=function(e){return "string"==typeof e},$e=function(){return ""};var Ue=Object.freeze({LCHPrimitiveStringCallback:Ke,LCHPrimitiveStringCanonicalExampleCallback:$e,LCHPrimitiveStringRecipe:function(){return {LCHRecipeSignature:"String",LCHRecipeCallback:Ke,LCHRecipeOutputType:"Bool",LCHRecipeCanonicalExampleCallback:$e}}});const Be=function(e){return !!e.LCHRecipeName&&!e.LCHRecipeCallback.length},ze=function(){return {LCHRecipeName:"alfa",LCHRecipeCallback(){}}};var qe=Object.freeze({LCHTypeCommandCallback:Be,LCHTypeStringCanonicalExampleCallback:ze,LCHTypeCommandRecipe:function(){return {LCHRecipeSignature:"Command",LCHRecipeCallback:Be,LCHRecipeOutputType:"Bool",LCHRecipeCanonicalExampleCallback:ze}}});const We=function(e){return !!e.LCHRecipeName&&"SubjectContainer"===e.LCHRecipeOutputType},Ze=function(){return {LCHRecipeName:"alfa",LCHRecipeCallback(){},LCHRecipeOutputType:"SubjectContainer"}};var Je=Object.freeze({LCHTypeSubjectContainerCallback:We,LCHTypeSubjectContainerCanonicalExampleCallback:Ze,LCHTypeSubjectContainerRecipe:function(){return {LCHRecipeSignature:"SubjectContainer",LCHRecipeCallback:We,LCHRecipeOutputType:"Bool",LCHRecipeCanonicalExampleCallback:Ze,_LCHRecipeTypeIsExclusive:!0}}});const Ge=function(e){return new Date(Date.parse(e)-1e3*e.getTimezoneOffset()*60)};var Ye=Object.freeze({LCHDateLocalOffsetSubtractedCallback:Ge,LCHDateLocalOffsetSubtractedRecipe:function(){return {LCHRecipeSignature:"LCHDateLocalOffsetSubtracted",LCHRecipeInputTypes:"Date",LCHRecipeCallback:Ge}}});const Xe=['a[href]:not([tabindex="-1"])','input:not([disabled]):not([tabindex="-1"]):not([type="hidden"])','button:not([disabled]):not([tabindex="-1"])'].join(","),Qe=function(e){if("object"!=typeof e||null===e||"function"!=typeof e.querySelectorAll)throw new Error("LCHErrorInputNotValid");const t={ids:{}};return [].concat.apply([],e.querySelectorAll(Xe)).filter((function(r){return {A:function(e){return !!e.href&&!(!e.textContent.trim()&&!e.title.trim())},INPUT:function(r){return t.labels||(t.labels=Array.from(e.querySelectorAll("label"))),t.ids[r.id]=t.labels.filter((function(e){return e.getAttribute("for")===r.id})).map((function(e){return e.textContent.trim()})).shift(),!!(r.name.trim()||r.placeholder.trim()||t.ids[r.id])},BUTTON:function(e){return !!e.textContent.trim()}}[r.tagName](r)})).map((function(e){return {LCHRecipeName:{A:function(e){return e.textContent.trim()||e.title.trim()},INPUT:function(e){return t.ids[e.id]||e.placeholder.trim()||e.name.trim()},BUTTON:function(e){return e.textContent.trim()}}[e.tagName](e),LCHRecipeCallback:()=>e,LCHRecipeOutputType:"DOMElement"}}))},et=function(){return Qe(document)};var tt=Object.freeze({LCHActiveDocumentsFocusElements:Qe,LCHActiveDocumentFocusElementsCallback:et,LCHActiveDocumentFocusElementsRecipe:function(){return {LCHRecipeSignature:"LCHActiveDocumentFocusElements",LCHRecipeOutputType:"SubjectContainer",LCHRecipeCallback:et}}});const rt=function(e){if("string"!=typeof e)throw new Error("LCHErrorInputNotValid");if(!e.trim().length)throw new Error("LCHErrorInputNotValid");return {LCHComponentDescriptorName:"LCHCopyToClipboard",LCHComponentDescriptorProps:{inputData:e},LCHComponentDescriptorCompletionHandlerSignature:"LCHCopyToClipboardCompletionHandler",LCHComponentDescriptorOLSKLocalized:!0}};var ot=Object.freeze({LCHCopyToClipboardCallback:rt,LCHCopyToClipboardRecipe:function(){return {LCHRecipeSignature:"LCHCopyToClipboard",LCHRecipeInputTypes:"String",LCHRecipeCallback:rt}}});const nt=function(e){e&&e.focus();};var it=Object.freeze({LCHDOMElementFocusCallback:nt,LCHDOMElementFocusRecipe:function(){return {LCHRecipeSignature:"LCHDOMElementFocus",LCHRecipeInputTypes:"DOMElement",LCHRecipeCallback:nt}}});const at=function(e){if("undefined"==typeof document)return;const t=document.createElement("div");t.className="LCHLargeTextContainer";for(let[e,r]of Object.entries({width:"100%",position:"fixed",top:"45%",left:"0",textAlign:"center",cursor:"default"}))t.style[e]=r;const r=document.createElement("span");r.textContent=e,t.appendChild(r);for(let[e,t]of Object.entries({display:"block-inline",borderRadius:"20px",boxShadow:"0 0 10px 0px hsla(0, 0%, 0%, 0.1)",padding:"20px",background:"hsla(0, 0%, 0%, 0.8)",color:"white",fontFamily:"Arial",fontSize:"72pt",fontWeight:"bold",textAlign:"center",textShadow:"5px 5px 10px hsla(0, 0%, 0%, 0.5)",overflowWrap:"break-word"}))r.style[e]=t;document.body.appendChild(t);let o=function(e){e.preventDefault(),!e.key&&t.contains(e.target)||(window.removeEventListener("click",o),window.removeEventListener("keydown",o),t.remove());};setTimeout((function(){window.addEventListener("click",o),window.addEventListener("keydown",o);}));};var lt=Object.freeze({LCHLargeTextCallback:at,LCHLargeTextRecipe:function(){return {LCHRecipeSignature:"LCHLargeText",LCHRecipeInputTypes:"String",LCHRecipeCallback:at}}});const ct=function(e){return e},ut=function(){return {LCHRecipeSignature:"LCHRunCommand",LCHRecipeInputTypes:"Command",LCHRecipeCallback:ct}};var pt=Object.freeze({LCHRunCommandCallback:ct,LCHRunCommandRecipe:ut});const st=function(e,t){if("function"!=typeof e)throw new Error("LCHErrorInputNotValid");return function(){return e.apply(t,Array.from(arguments).reverse())}},Ct=function(e,t){if("string"!=typeof e)throw new Error("LCHErrorInputNotValid");if("string"!=typeof t)throw new Error("LCHErrorInputNotValid");return e.match(/LCHSEARCHTOKEN/i)?e.replace(/LCHSEARCHTOKEN/i,t.split(" ").map((function(e){return encodeURIComponent(e)})).join("+")):e},Lt=function(e,t){return this.api.fn("LCHURLOpen")(Ct(t,e))},mt=function(){return st(Lt,this)(...arguments)};var dt=Object.freeze({LCHSearchActionURLFrom:Ct,LCHSearchWithCallback:Lt,LCHSearchWithRecipe:function(){return {LCHRecipeSignature:"LCHSearchWith",LCHRecipeInputTypes:"String,ServiceSearchURLTemplate",LCHRecipeCallback:Lt}},LCHSearchForCallback:mt,LCHSearchForRecipe:function(){return {LCHRecipeSignature:"LCHSearchFor",LCHRecipeInputTypes:"ServiceSearchURLTemplate,String",LCHRecipeCallback:mt}}});const ft=function(){return "https://wikipedia.org/w/index.php?search=LCHSEARCHTOKEN"};var Ht=Object.freeze({LCHServiceSearchWikipediaCallback:ft,LCHServiceSearchWikipediaRecipe:function(){return {LCHRecipeName:"Wikipedia",LCHRecipeOutputType:"ServiceSearchURLTemplate",LCHRecipeCallback:ft,LCHRecipeSignature:"LCHServiceSearchWikipedia"}}});const ht=function(e){return e};var yt=Object.freeze({LCHSubjectContainerShowContentsCallback:ht,LCHSubjectContainerShowContentsRecipe:function(){return {LCHRecipeSignature:"LCHSubjectContainerShowContents",LCHRecipeInputTypes:"SubjectContainer",LCHRecipeCallback:ht}}});const Pt=function(e){e&&window.open(e,"_blank").focus();};var bt=Object.freeze({LCHURLOpenCallback:Pt,LCHURLOpenRecipe:function(){return {LCHRecipeSignature:"LCHURLOpen",LCHRecipeInputTypes:"URL",LCHRecipeCallback:Pt}}});const St=function(){return [].concat.apply([],[Ce,de,he,Ne,Ue,Fe,qe,pe,Je,tt,Ye,ot,it,lt,pt,dt,Ht,yt,bt].map((function(e){return Object.entries(e).filter((function(e){return e.shift().includes("Recipe")})).map((function(e){return e.pop()()})).map((function(e){return e}))})))};Array.prototype._LCHIntersect=function(){return this.map((function(e){return new Set(e)})).reduce((function(e,t){return e.filter(e=>t.has(e))}),[...new Set([].concat.apply([],this))])};const Rt={LCHRecipesModelErrorsFor(e,t={}){if("object"!=typeof e||null===e)throw new Error("LCHErrorInputNotValid");const r=ie.LCHFormulaTo(ie.LCHFormulaModelErrorsFor(ie.LCHFormulaFrom(e))||{},"LCHRecipe");return "function"!=typeof e.LCHRecipeCallback&&(r.LCHRecipeCallback=["LCHErrorNotFunction"]),"string"==typeof e.LCHRecipeName&&(e.LCHRecipeName.trim()||(r.LCHRecipeName=["LCHErrorNotFilled"])),"string"==typeof e.LCHRecipeInputTypes&&(e.LCHRecipeInputTypes.trim()!==e.LCHRecipeInputTypes&&(r.LCHRecipeInputTypes=["LCHErrorNotTrimmed"]),e.LCHRecipeInputTypes.trim()||(r.LCHRecipeInputTypes=["LCHErrorNotFilled"])),"string"==typeof e.LCHRecipeOutputType&&(e.LCHRecipeOutputType.trim()!==e.LCHRecipeOutputType&&(r.LCHRecipeOutputType=["LCHErrorNotTrimmed"]),e.LCHRecipeOutputType.trim()||(r.LCHRecipeOutputType=["LCHErrorNotFilled"])),(void 0!==e.LCHRecipeCanonicalExampleCallback||t.LCHOptionValidateIfNotPresent)&&"function"!=typeof e.LCHRecipeCanonicalExampleCallback&&(r.LCHRecipeCanonicalExampleCallback=["LCHErrorNotFunction"]),"string"==typeof e.LCHRecipeSignature&&(e.LCHRecipeSignature.trim()?e.LCHRecipeSignature.trim()!==e.LCHRecipeSignature&&(r.LCHRecipeSignature=["LCHErrorNotTrimmed"]):r.LCHRecipeSignature=["LCHErrorNotFilled"]),Object.entries(r).length?r:null},LCHRecipesModelIsCommand(e){if(Rt.LCHRecipesModelErrorsFor(e))throw new Error("LCHErrorInputNotValid");return !!e.LCHRecipeName&&(!e.LCHRecipeInputTypes&&!e.LCHRecipeOutputType)},LCHRecipesModelIsSubject(e){if(Rt.LCHRecipesModelErrorsFor(e))throw new Error("LCHErrorInputNotValid");return !!e.LCHRecipeName&&!!e.LCHRecipeOutputType},LCHRecipesModelIsAction(e){if(Rt.LCHRecipesModelErrorsFor(e))throw new Error("LCHErrorInputNotValid");return !!e.LCHRecipeName&&!!e.LCHRecipeInputTypes},LCHRecipesModelIsType(e){if(Rt.LCHRecipesModelErrorsFor(e))throw new Error("LCHErrorInputNotValid");return "Bool"===e.LCHRecipeOutputType&&(!!e.LCHRecipeCanonicalExampleCallback&&!!e.LCHRecipeSignature)},LCHRecipesModelIsTask(e){if(Rt.LCHRecipesModelErrorsFor(e))throw new Error("LCHErrorInputNotValid");return !!e.LCHRecipeURLFilter&&!0===e.LCHRecipeIsAutomatic},LCHLauncherConvertTypeServiceSearch(e,t){if(!Array.isArray(e))throw new Error("LCHErrorInputNotValid");return e.filter((function(e){return "object"==typeof e&&null!==e})).map((function(e){return ue().LCHRecipeCallback(e)?{LCHRecipeName:t(e.LCHRecipeName),LCHRecipeInputTypes:"String",LCHRecipeCallback(t){return this.api.fn("LCHSearchWith")(t,e)},_LCHLauncherGenerated:!0}:e}))},LCHRecipesModelActionTakesObject(e){if(Rt.LCHRecipesModelErrorsFor(e))throw new Error("LCHErrorInputNotValid");if(!Rt.LCHRecipesModelIsAction(e))throw new Error("LCHErrorInputNotValid");return !(ae.LCHRuntimeInputTypes(e.LCHRecipeInputTypes).length<2)},LCHRecipesModelActionTakesParams(e){if(Rt.LCHRecipesModelErrorsFor(e))throw new Error("LCHErrorInputNotValid");if(!Rt.LCHRecipesModelIsAction(e))throw new Error("LCHErrorInputNotValid");return "Object"===ae.LCHRuntimeInputTypes(e.LCHRecipeInputTypes).pop()},LCHAPITypeEquivalenceMapForRecipes(e){if(!Array.isArray(e))throw new Error("LCHErrorInputNotValid");const t=[],r=e.filter((function(e){return !Rt.LCHRecipesModelErrorsFor(e)&&(!!Rt.LCHRecipesModelIsType(e)&&(!!e.LCHRecipeCallback(e.LCHRecipeCanonicalExampleCallback())&&(!t.includes(e.LCHRecipeSignature)&&(t.push(e.LCHRecipeSignature),!0))))}));return r.reduce((function(e,t){return e[t.LCHRecipeSignature]=r.filter((function(e){return t===e||!e._LCHRecipeTypeIsExclusive&&(!t._LCHRecipeTypeIsExclusive&&e.LCHRecipeCallback(t.LCHRecipeCanonicalExampleCallback()))})).map((function(e){return e.LCHRecipeSignature})),e}),{})},LCHAPITypeNameMap(e){if(!Array.isArray(e))throw new Error("LCHErrorInputNotValid");return e.filter((function(e){return !Rt.LCHRecipesModelErrorsFor(e)&&Rt.LCHRecipesModelIsType(e)})).reduce((function(e,t){return e[t.LCHRecipeSignature]||(e[t.LCHRecipeSignature]=t.LCHRecipeName||t.LCHRecipeSignature),e}),{})},LCHAPIActionsForType(e,t){if("string"!=typeof e)throw new Error("LCHErrorInputNotValid");if(!Array.isArray(t))throw new Error("LCHErrorInputNotValid");return t.filter((function(t){return !Rt.LCHRecipesModelErrorsFor(t)&&(!!Rt.LCHRecipesModelIsAction(t)&&ae.LCHRuntimeInputTypes(t.LCHRecipeInputTypes).shift()===e)}))},LCHAPISubjectsForType(e,t){if("string"!=typeof e)throw new Error("LCHErrorInputNotValid");if(!Array.isArray(t))throw new Error("LCHErrorInputNotValid");return t.filter((function(t){return !Rt.LCHRecipesModelErrorsFor(t)&&(!!Rt.LCHRecipesModelIsSubject(t)&&t.LCHRecipeOutputType===e)}))},LCHCompositionModelErrors(e){if("object"!=typeof e||null===e)throw new Error("LCHErrorInputNotValid");if(!e.LCHCompositionAction)return {LCHCompositionAction:["LCHErrorInputNotPresent"]};if(!Rt.LCHRecipesModelIsAction(e.LCHCompositionAction))return {LCHCompositionAction:["LCHErrorInputNotValid"]};const t={};return e.LCHCompositionSubjectPrimary?("Command"===e.LCHCompositionAction.LCHRecipeInputTypes&&Rt.LCHRecipesModelIsCommand(e.LCHCompositionSubjectPrimary)||e.LCHCompositionAction.LCHRecipeInputTypes&&!ae.LCHRuntimeInputTypes(e.LCHCompositionAction.LCHRecipeInputTypes).includes(e.LCHCompositionSubjectPrimary.LCHRecipeOutputType)&&(t.LCHCompositionSubjectPrimary=["LCHErrorInputNotValid"]),e.LCHCompositionAction.LCHRecipeInputTypes&&2===ae.LCHRuntimeInputTypes(e.LCHCompositionAction.LCHRecipeInputTypes).length&&!e.LCHCompositionSubjectSecondary&&(t.LCHCompositionSubjectSecondary=["LCHErrorInputNotValid"]),void 0!==e.LCHCompositionSubjectSecondary&&(Rt.LCHRecipesModelIsSubject(e.LCHCompositionSubjectSecondary)||(t.LCHCompositionSubjectSecondary=["LCHErrorInputNotValid"]),e.LCHCompositionAction.LCHRecipeInputTypes&&!ae.LCHRuntimeInputTypes(e.LCHCompositionAction.LCHRecipeInputTypes).includes(e.LCHCompositionSubjectSecondary.LCHRecipeOutputType)&&(t.LCHCompositionSubjectSecondary=["LCHErrorInputNotValid"])),Object.entries(t).length?t:null):{LCHCompositionSubjectPrimary:["LCHErrorInputNotPresent"]}},LCHAPIExecuteComposition:async(e,t={})=>Rt.LCHCompositionModelErrors(e)||"function"!=typeof t.fn?Promise.reject(new Error("LCHErrorInputNotValid")):Rt.LCHAPIExecuteRecipe(e.LCHCompositionAction,[await Rt.LCHAPIExecuteRecipe(e.LCHCompositionSubjectPrimary,[],t)].concat(e.LCHCompositionSubjectSecondary?[await Rt.LCHAPIExecuteRecipe(e.LCHCompositionSubjectSecondary,[],t)]:[]),t),LCHAPIExecuteRecipe:async(e,t=[],r={})=>Rt.LCHRecipesModelErrorsFor(e)?Promise.reject(new Error("LCHErrorInputNotValid")):Array.isArray(t)?"function"!=typeof r.fn?Promise.reject(new Error("LCHErrorInputNotValid")):(e.LCHRecipeStyle&&"undefined"!=typeof document&&(document.body.appendChild(document.createElement("style")).innerHTML=e.LCHRecipeStyle),Promise.resolve(e.LCHRecipeCallback.apply({api:r},t.length?t:void 0))):Promise.reject(new Error("LCHErrorInputNotValid")),LCHComponentDescriptorsModelErrorsFor(e){if("object"!=typeof e||null===e)throw new Error("LCHErrorInputNotValid");const t={};return "string"!=typeof e.LCHComponentDescriptorName&&(t.LCHComponentDescriptorName=["LCHErrorNotString"]),"string"!=typeof e.LCHComponentDescriptorName||e.LCHComponentDescriptorName||(t.LCHComponentDescriptorName=["LCHErrorNotFilled"]),"string"==typeof e.LCHComponentDescriptorName&&e.LCHComponentDescriptorName.trim()!==e.LCHComponentDescriptorName&&(t.LCHComponentDescriptorName=["LCHErrorNotTrimmed"]),"string"!=typeof e.LCHComponentDescriptorCompletionHandlerSignature&&(t.LCHComponentDescriptorCompletionHandlerSignature=["LCHErrorNotString"]),"string"!=typeof e.LCHComponentDescriptorCompletionHandlerSignature||e.LCHComponentDescriptorCompletionHandlerSignature||(t.LCHComponentDescriptorCompletionHandlerSignature=["LCHErrorNotFilled"]),"string"==typeof e.LCHComponentDescriptorCompletionHandlerSignature&&e.LCHComponentDescriptorCompletionHandlerSignature.trim()!==e.LCHComponentDescriptorCompletionHandlerSignature&&(t.LCHComponentDescriptorCompletionHandlerSignature=["LCHErrorNotTrimmed"]),void 0!==e.LCHComponentDescriptorProps&&("object"==typeof e.LCHComponentDescriptorProps&&null!==e.LCHComponentDescriptorProps||(t.LCHComponentDescriptorProps=["LCHErrorNotObject"])),Object.entries(t).length?t:null},LCHRuntimeFilteredRecipes(e,t){if(!Array.isArray(e))throw new Error("LCHErrorInputInvalid");if("string"!=typeof t)throw new Error("LCHErrorInputInvalid");return e.filter((function(e){return !Rt.LCHRecipesModelErrorsFor(e)&&(void 0===e.LCHRecipeURLFilter||ae.LCHRuntimeURLFilter(e.LCHRecipeURLFilter,t))}))},LCHRuntimeFilteredTasks(e){if(!Array.isArray(e))throw new Error("LCHErrorInputInvalid");return e.filter((function(e){return !!Rt.LCHRecipesModelIsTask(e)&&(!e.LCHRecipeIsExcluded||!e.LCHRecipeIsExcluded())}))},LCHAPIRunTasks(){const e=Rt.LCHRuntimeFilteredRecipes.apply(null,Array.from(arguments)),t=ae.LCHRuntimeAPI(St().concat(e));return Promise.all(Rt.LCHRuntimeFilteredTasks(e).map((function(e){return Rt.LCHAPIExecuteRecipe(e,[],t)})))},LCHRecipeProxyModelErrorsFor(e,t={}){if("object"!=typeof e||null===e)return {};const r={};return "string"!=typeof e.LCHRecipeProxyName&&(r.LCHRecipeProxyName=["LCHErrorNotString"]),"string"!=typeof e.LCHRecipeProxySignature&&(r.LCHRecipeProxySignature=["LCHErrorNotString"]),Object.entries(r).length?r:null}},gt={LCHLauncherOptions(e,t=function(){}){if("object"!=typeof e||null===e)throw new Error("LCHErrorInputNotValid");if(void 0===e.LCHOptionRecipes&&(e.LCHOptionRecipes=[]),!Array.isArray(e.LCHOptionRecipes))throw new Error("LCHOptionRecipesNotArray");if(e.LCHOptionRecipes=e.LCHOptionRecipes.filter((function(e){const r=Rt.LCHRecipesModelErrorsFor(e);return r&&t("LCHOptionRecipesItemNotValid",e,r),!r})),void 0===e.LCHOptionMode&&(e.LCHOptionMode=gt.LCHLauncherModes().shift()),void 0!==e.LCHOptionMode&&!gt.LCHLauncherModes().includes(e.LCHOptionMode))throw new Error("LCHOptionModeNotValid");if(void 0!==e.LCHOptionCompletionHandler&&"function"!=typeof e.LCHOptionCompletionHandler)throw new Error("LCHOptionCompletionHandlerNotFunction");if(void 0===e.LCHOptionLanguage&&(e.LCHOptionLanguage="en"),"string"!=typeof e.LCHOptionLanguage)throw new Error("LCHOptionLanguageNotString");return e},LCHLauncherModeCommit:()=>"kLCHLauncherModeCommit",LCHLauncherModePreview:()=>"kLCHLauncherModePreview",LCHLauncherModePipe:()=>"kLCHLauncherModePipe",LCHLauncherModeTask:()=>"kLCHLauncherModeTask",LCHLauncherModes:()=>[gt.LCHLauncherModeCommit(),gt.LCHLauncherModePreview(),gt.LCHLauncherModePipe(),gt.LCHLauncherModeTask()],LCHLauncherUIRecipesForMode(e,t){if(!Array.isArray(e))throw new Error("LCHErrorInputNotValid");if(!gt.LCHLauncherModes().includes(t))throw new Error("LCHErrorInputNotValid");return e.filter((function(e){return "object"==typeof e&&null!==e&&(!("string"==typeof e.LCHRecipeInputTypes&&e.LCHRecipeInputTypes.split(",").length>2)&&(t===gt.LCHLauncherModeCommit()?Rt.LCHRecipesModelIsCommand(e):t!==gt.LCHLauncherModePreview()||Rt.LCHRecipesModelIsCommand(e)))}))},LCHLauncherThrottleDuration:ne()?25:1e3,LCHLauncherKeyboardEventIsTextInput(e){if("object"!=typeof e||null===e)throw new Error("LCHErrorInputNotValid");return ![e.metaKey,e.shiftKey,e.ctrlKey,e.altKey].includes(!0)&&(!!e.key&&!["Unidentified","Tab","CapsLock","ArrowRight","ArrowLeft","Backspace","\\",".",","," "].includes(e.key))},LCHLauncherActionComparator(e){if("string"!=typeof e)throw new Error("LCHErrorInputNotValid");return function(t,r){const o=[t.LCHRecipeInputTypes.split(",")[0],r.LCHRecipeInputTypes.split(",")[0]],n=[t.LCHRecipeInputTypes.split(",")[1],r.LCHRecipeInputTypes.split(",")[1]];if(o[0]===e&&o[1]===e){if(!n[0]&&n[1])return -1;if(n[0]&&!n[1])return 1}return o[0]===e&&o[1]!==e?-1:1}},LCHLauncherConstrainIndex(e,t){if(!Array.isArray(e))throw new Error("LCHErrorInputNotValid");if("number"!=typeof t)throw new Error("LCHErrorInputNotValid");return t<0?e.length-1:t>=e.length?0:t},LCHLauncherReloadableSubjects(e){if(!Array.isArray(e))throw new Error("LCHErrorInputNotValid");return [].concat.apply([],e).filter((function(e){return "object"==typeof e&&null!==e&&(!Rt.LCHRecipesModelErrorsFor(e)&&!!Rt.LCHRecipesModelIsSubject(e))}))}};var It=te(re((function(e,t){!function(e){const t={OLSKInternationalDefaultIdentifier:()=>"i18n",OLSKInternationalIsTranslationFileBasename:t=>"string"==typeof t&&!!t.split(".").pop().match(/ya?ml/i)&&t.split(".").shift()===e.OLSKInternationalDefaultIdentifier()&&!!e._OLSKInternationalLanguageID(t),OLSKInternationalLanguageID(t){if(!e.OLSKInternationalIsTranslationFileBasename(t))throw new Error("OLSKErrorInputNotValid");return e._OLSKInternationalLanguageID(t)},OLSKInternationalSimplifiedLanguageCode(e){if("string"!=typeof e)throw new Error("OLSKErrorInputNotValid");return e.split("-").shift()},_OLSKInternationalLanguageID(e){var t=e.split(".");return t.pop(),t.shift(),t.pop()},OLSKInternationalLocalizedString(e,t){if("object"!=typeof t||null===t)throw new Error("OLSKErrorInputNotValid");var r=t[e];return r||(r="TRANSLATION_MISSING",console.log([r,e])),r},OLSKInternationalLocalizedStringCallback(t,r){if("object"!=typeof t||null===t)throw new Error("OLSKErrorInputNotValid");if(!Array.isArray(r))throw new Error("OLSKErrorInputNotValid");const o=Object.keys(t).reverse().concat(...r.map((function(t){return [e.OLSKInternationalSimplifiedLanguageCode(t),t]})).reverse());return function(r,n){if(!Array.isArray(n))throw new Error("OLSKErrorInputNotValid");let i,a=o.concat(...n.map((function(t){return [e.OLSKInternationalSimplifiedLanguageCode(t),t]})).reverse(),[]);for(;!i&&a.length;)i=(t[a.pop()]||{})[r];return i||console.log([i="TRANSLATION_MISSING",r].join(" ")),i}}};Object.assign(e,t),Object.defineProperty(e,"__esModule",{value:!0});}(t);}))),Tt=re((function(e){var t,r;t=Q,r=function(){var e=void 0!==ee&&"undefined"==typeof window,t=new Map,r=new Map,o=[];o.total=0;var n=[],i=[];function a(){t.clear(),r.clear(),n=[],i=[];}function l(e){for(var t=-9007199254740991,r=e.length-1;r>=0;--r){var o=e[r];if(null!==o){var n=o.score;n>t&&(t=n);}}return -9007199254740991===t?null:t}function c(e,t){var r=e[t];if(void 0!==r)return r;var o=t;Array.isArray(t)||(o=t.split("."));for(var n=o.length,i=-1;e&&++i<n;)e=e[o[i]];return e}function u(e){return "object"==typeof e}var p=function(){var e=[],t=0,r={};function o(){for(var r=0,o=e[r],n=1;n<t;){var i=n+1;r=n,i<t&&e[i].score<e[n].score&&(r=i),e[r-1>>1]=e[r],n=1+(r<<1);}for(var a=r-1>>1;r>0&&o.score<e[a].score;a=(r=a)-1>>1)e[r]=e[a];e[r]=o;}return r.add=function(r){var o=t;e[t++]=r;for(var n=o-1>>1;o>0&&r.score<e[n].score;n=(o=n)-1>>1)e[o]=e[n];e[o]=r;},r.poll=function(){if(0!==t){var r=e[0];return e[0]=e[--t],o(),r}},r.peek=function(r){if(0!==t)return e[0]},r.replaceTop=function(t){e[0]=t,o();},r},s=p();return function C(L){var m={single:function(e,t,r){return e?(u(e)||(e=m.getPreparedSearch(e)),t?(u(t)||(t=m.getPrepared(t)),((r&&void 0!==r.allowTypo?r.allowTypo:!L||void 0===L.allowTypo||L.allowTypo)?m.algorithm:m.algorithmNoTypo)(e,t,e[0])):null):null},go:function(e,t,r){if(!e)return o;var n=(e=m.prepareSearch(e))[0],i=r&&r.threshold||L&&L.threshold||-9007199254740991,a=r&&r.limit||L&&L.limit||9007199254740991,p=(r&&void 0!==r.allowTypo?r.allowTypo:!L||void 0===L.allowTypo||L.allowTypo)?m.algorithm:m.algorithmNoTypo,C=0,d=0,f=t.length;if(r&&r.keys)for(var H=r.scoreFn||l,h=r.keys,y=h.length,P=f-1;P>=0;--P){for(var b=t[P],S=new Array(y),R=y-1;R>=0;--R)(T=c(b,I=h[R]))?(u(T)||(T=m.getPrepared(T)),S[R]=p(e,T,n)):S[R]=null;S.obj=b;var g=H(S);null!==g&&(g<i||(S.score=g,C<a?(s.add(S),++C):(++d,g>s.peek().score&&s.replaceTop(S))));}else if(r&&r.key){var I=r.key;for(P=f-1;P>=0;--P)(T=c(b=t[P],I))&&(u(T)||(T=m.getPrepared(T)),null!==(O=p(e,T,n))&&(O.score<i||(O={target:O.target,_targetLowerCodes:null,_nextBeginningIndexes:null,score:O.score,indexes:O.indexes,obj:b},C<a?(s.add(O),++C):(++d,O.score>s.peek().score&&s.replaceTop(O)))));}else for(P=f-1;P>=0;--P){var T,O;(T=t[P])&&(u(T)||(T=m.getPrepared(T)),null!==(O=p(e,T,n))&&(O.score<i||(C<a?(s.add(O),++C):(++d,O.score>s.peek().score&&s.replaceTop(O)))));}if(0===C)return o;var v=new Array(C);for(P=C-1;P>=0;--P)v[P]=s.poll();return v.total=C+d,v},goAsync:function(t,r,n){var i=!1,a=new Promise((function(a,s){if(!t)return a(o);var C=(t=m.prepareSearch(t))[0],d=p(),f=r.length-1,H=n&&n.threshold||L&&L.threshold||-9007199254740991,h=n&&n.limit||L&&L.limit||9007199254740991,y=(n&&void 0!==n.allowTypo?n.allowTypo:!L||void 0===L.allowTypo||L.allowTypo)?m.algorithm:m.algorithmNoTypo,P=0,b=0;function S(){if(i)return s("canceled");var p=Date.now();if(n&&n.keys)for(var L=n.scoreFn||l,R=n.keys,g=R.length;f>=0;--f){for(var I=r[f],T=new Array(g),O=g-1;O>=0;--O)(w=c(I,E=R[O]))?(u(w)||(w=m.getPrepared(w)),T[O]=y(t,w,C)):T[O]=null;T.obj=I;var v=L(T);if(null!==v&&!(v<H)&&(T.score=v,P<h?(d.add(T),++P):(++b,v>d.peek().score&&d.replaceTop(T)),f%1e3==0&&Date.now()-p>=10))return void(e?setImmediate(S):setTimeout(S))}else if(n&&n.key){for(var E=n.key;f>=0;--f)if((w=c(I=r[f],E))&&(u(w)||(w=m.getPrepared(w)),null!==(x=y(t,w,C))&&!(x.score<H)&&(x={target:x.target,_targetLowerCodes:null,_nextBeginningIndexes:null,score:x.score,indexes:x.indexes,obj:I},P<h?(d.add(x),++P):(++b,x.score>d.peek().score&&d.replaceTop(x)),f%1e3==0&&Date.now()-p>=10)))return void(e?setImmediate(S):setTimeout(S))}else for(;f>=0;--f){var w,x;if((w=r[f])&&(u(w)||(w=m.getPrepared(w)),null!==(x=y(t,w,C))&&!(x.score<H)&&(P<h?(d.add(x),++P):(++b,x.score>d.peek().score&&d.replaceTop(x)),f%1e3==0&&Date.now()-p>=10)))return void(e?setImmediate(S):setTimeout(S))}if(0===P)return a(o);for(var V=new Array(P),_=P-1;_>=0;--_)V[_]=d.poll();V.total=P+b,a(V);}e?setImmediate(S):S();}));return a.cancel=function(){i=!0;},a},highlight:function(e,t,r){if(null===e)return null;void 0===t&&(t="<b>"),void 0===r&&(r="</b>");for(var o="",n=0,i=!1,a=e.target,l=a.length,c=e.indexes,u=0;u<l;++u){var p=a[u];if(c[n]===u){if(i||(i=!0,o+=t),++n===c.length){o+=p+r+a.substr(u+1);break}}else i&&(i=!1,o+=r);o+=p;}return o},prepare:function(e){if(e)return {target:e,_targetLowerCodes:m.prepareLowerCodes(e),_nextBeginningIndexes:null,score:null,indexes:null,obj:null}},prepareSlow:function(e){if(e)return {target:e,_targetLowerCodes:m.prepareLowerCodes(e),_nextBeginningIndexes:m.prepareNextBeginningIndexes(e),score:null,indexes:null,obj:null}},prepareSearch:function(e){if(e)return m.prepareLowerCodes(e)},getPrepared:function(e){if(e.length>999)return m.prepare(e);var r=t.get(e);return void 0!==r||(r=m.prepare(e),t.set(e,r)),r},getPreparedSearch:function(e){if(e.length>999)return m.prepareSearch(e);var t=r.get(e);return void 0!==t||(t=m.prepareSearch(e),r.set(e,t)),t},algorithm:function(e,t,r){for(var o=t._targetLowerCodes,a=e.length,l=o.length,c=0,u=0,p=0,s=0;;){if(r===o[u]){if(n[s++]=u,++c===a)break;r=e[0===p?c:p===c?c+1:p===c-1?c-1:c];}if(++u>=l)for(;;){if(c<=1)return null;if(0===p){if(r===e[--c])continue;p=c;}else{if(1===p)return null;if((r=e[1+(c=--p)])===e[c])continue}u=n[(s=c)-1]+1;break}}c=0;var C=0,L=!1,d=0,f=t._nextBeginningIndexes;null===f&&(f=t._nextBeginningIndexes=m.prepareNextBeginningIndexes(t.target));var H=u=0===n[0]?0:f[n[0]-1];if(u!==l)for(;;)if(u>=l){if(c<=0){if(++C>a-2)break;if(e[C]===e[C+1])continue;u=H;continue}--c,u=f[i[--d]];}else if(e[0===C?c:C===c?c+1:C===c-1?c-1:c]===o[u]){if(i[d++]=u,++c===a){L=!0;break}++u;}else u=f[u];if(L)var h=i,y=d;else h=n,y=s;for(var P=0,b=-1,S=0;S<a;++S)b!==(u=h[S])-1&&(P-=u),b=u;for(L?0!==C&&(P+=-20):(P*=1e3,0!==p&&(P+=-20)),P-=l-a,t.score=P,t.indexes=new Array(y),S=y-1;S>=0;--S)t.indexes[S]=h[S];return t},algorithmNoTypo:function(e,t,r){for(var o=t._targetLowerCodes,a=e.length,l=o.length,c=0,u=0,p=0;;){if(r===o[u]){if(n[p++]=u,++c===a)break;r=e[c];}if(++u>=l)return null}c=0;var s=!1,C=0,L=t._nextBeginningIndexes;if(null===L&&(L=t._nextBeginningIndexes=m.prepareNextBeginningIndexes(t.target)),(u=0===n[0]?0:L[n[0]-1])!==l)for(;;)if(u>=l){if(c<=0)break;--c,u=L[i[--C]];}else if(e[c]===o[u]){if(i[C++]=u,++c===a){s=!0;break}++u;}else u=L[u];if(s)var d=i,f=C;else d=n,f=p;for(var H=0,h=-1,y=0;y<a;++y)h!==(u=d[y])-1&&(H-=u),h=u;for(s||(H*=1e3),H-=l-a,t.score=H,t.indexes=new Array(f),y=f-1;y>=0;--y)t.indexes[y]=d[y];return t},prepareLowerCodes:function(e){for(var t=e.length,r=[],o=e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""),n=0;n<t;++n)r[n]=o.charCodeAt(n);return r},prepareBeginningIndexes:function(e){for(var t=e.length,r=[],o=0,n=!1,i=!1,a=0;a<t;++a){var l=e.charCodeAt(a),c=l>=65&&l<=90,u=c||l>=97&&l<=122||l>=48&&l<=57,p=c&&!n||!i||!u;n=c,i=u,p&&(r[o++]=a);}return r},prepareNextBeginningIndexes:function(e){for(var t=e.length,r=m.prepareBeginningIndexes(e),o=[],n=r[0],i=0,a=0;a<t;++a)n>a?o[a]=n:(n=r[++i],o[a]=void 0===n?t:n);return o},cleanup:a,new:C};return m}()},e.exports?e.exports=r():t.fuzzysort=r();})),Ot=re((function(e,t){const r={OLSKThrottleIsValid:e=>"object"==typeof e&&null!==e&&("function"==typeof e.OLSKThrottleCallback&&"number"==typeof e.OLSKThrottleDuration),OLSKThrottleTimeoutFor(e){if(!r.OLSKThrottleIsValid(e))throw new Error("OLSKErrorInputNotValid");return e._OLSKThrottleTimeoutID&&clearTimeout(e._OLSKThrottleTimeoutID),e._OLSKThrottleTimeoutID=setTimeout((function(){r._OLSKThrottleFire(e);}),e.OLSKThrottleDuration),e._OLSKThrottleTimeoutID},OLSKThrottleSkip(e){if(!r.OLSKThrottleIsValid(e))throw new Error("OLSKErrorInputNotValid");clearTimeout(e._OLSKThrottleTimeoutID),r._OLSKThrottleFire(e);},_OLSKThrottleFire(e){e.OLSKThrottleCallback(),delete e._OLSKThrottleTimeoutID;},OLSKThrottleMappedTimeout(e,t,o){if("object"!=typeof e||null===e)throw new Error("OLSKErrorInputNotValid");if("string"!=typeof t)throw new Error("OLSKErrorInputNotValid");if(!r.OLSKThrottleIsValid(o))throw new Error("OLSKErrorInputNotValid");return e[t]||(e[t]=Object.assign(Object.assign({},o),{OLSKThrottleCallback(){r._OLSKThrottleFire(o);}})),o._OLSKThrottleTimeoutID=r.OLSKThrottleTimeoutFor(e[t])}};Object.assign(t,r);})),vt=te(re((function(e,t){
	/*!
	     * clipboard.js v2.0.6
	     * https://clipboardjs.com/
	     * 
	     * Licensed MIT © Zeno Rocha
	     */
	var r;r=function(){return function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o});},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0});},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=6)}([function(e,t){e.exports=function(e){var t;if("SELECT"===e.nodeName)e.focus(),t=e.value;else if("INPUT"===e.nodeName||"TEXTAREA"===e.nodeName){var r=e.hasAttribute("readonly");r||e.setAttribute("readonly",""),e.select(),e.setSelectionRange(0,e.value.length),r||e.removeAttribute("readonly"),t=e.value;}else{e.hasAttribute("contenteditable")&&e.focus();var o=window.getSelection(),n=document.createRange();n.selectNodeContents(e),o.removeAllRanges(),o.addRange(n),t=o.toString();}return t};},function(e,t){function r(){}r.prototype={on:function(e,t,r){var o=this.e||(this.e={});return (o[e]||(o[e]=[])).push({fn:t,ctx:r}),this},once:function(e,t,r){var o=this;function n(){o.off(e,n),t.apply(r,arguments);}return n._=t,this.on(e,n,r)},emit:function(e){for(var t=[].slice.call(arguments,1),r=((this.e||(this.e={}))[e]||[]).slice(),o=0,n=r.length;o<n;o++)r[o].fn.apply(r[o].ctx,t);return this},off:function(e,t){var r=this.e||(this.e={}),o=r[e],n=[];if(o&&t)for(var i=0,a=o.length;i<a;i++)o[i].fn!==t&&o[i].fn._!==t&&n.push(o[i]);return n.length?r[e]=n:delete r[e],this}},e.exports=r,e.exports.TinyEmitter=r;},function(e,t,r){var o=r(3),n=r(4);e.exports=function(e,t,r){if(!e&&!t&&!r)throw new Error("Missing required arguments");if(!o.string(t))throw new TypeError("Second argument must be a String");if(!o.fn(r))throw new TypeError("Third argument must be a Function");if(o.node(e))return function(e,t,r){return e.addEventListener(t,r),{destroy:function(){e.removeEventListener(t,r);}}}(e,t,r);if(o.nodeList(e))return function(e,t,r){return Array.prototype.forEach.call(e,(function(e){e.addEventListener(t,r);})),{destroy:function(){Array.prototype.forEach.call(e,(function(e){e.removeEventListener(t,r);}));}}}(e,t,r);if(o.string(e))return function(e,t,r){return n(document.body,e,t,r)}(e,t,r);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")};},function(e,t){t.node=function(e){return void 0!==e&&e instanceof HTMLElement&&1===e.nodeType},t.nodeList=function(e){var r=Object.prototype.toString.call(e);return void 0!==e&&("[object NodeList]"===r||"[object HTMLCollection]"===r)&&"length"in e&&(0===e.length||t.node(e[0]))},t.string=function(e){return "string"==typeof e||e instanceof String},t.fn=function(e){return "[object Function]"===Object.prototype.toString.call(e)};},function(e,t,r){var o=r(5);function n(e,t,r,o,n){var a=i.apply(this,arguments);return e.addEventListener(r,a,n),{destroy:function(){e.removeEventListener(r,a,n);}}}function i(e,t,r,n){return function(r){r.delegateTarget=o(r.target,t),r.delegateTarget&&n.call(e,r);}}e.exports=function(e,t,r,o,i){return "function"==typeof e.addEventListener?n.apply(null,arguments):"function"==typeof r?n.bind(null,document).apply(null,arguments):("string"==typeof e&&(e=document.querySelectorAll(e)),Array.prototype.map.call(e,(function(e){return n(e,t,r,o,i)})))};},function(e,t){if("undefined"!=typeof Element&&!Element.prototype.matches){var r=Element.prototype;r.matches=r.matchesSelector||r.mozMatchesSelector||r.msMatchesSelector||r.oMatchesSelector||r.webkitMatchesSelector;}e.exports=function(e,t){for(;e&&9!==e.nodeType;){if("function"==typeof e.matches&&e.matches(t))return e;e=e.parentNode;}};},function(e,t,r){r.r(t);var o=r(0),n=r.n(o),i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o);}}return function(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}}(),l=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.resolveOptions(t),this.initSelection();}return a(e,[{key:"resolveOptions",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action=e.action,this.container=e.container,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText="";}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget();}},{key:"selectFake",value:function(){var e=this,t="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return e.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[t?"right":"left"]="-9999px";var r=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=r+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=n()(this.fakeElem),this.copyText();}},{key:"removeFake",value:function(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null);}},{key:"selectTarget",value:function(){this.selectedText=n()(this.target),this.copyText();}},{key:"copyText",value:function(){var e=void 0;try{e=document.execCommand(this.action);}catch(t){e=!1;}this.handleResult(e);}},{key:"handleResult",value:function(e){this.emitter.emit(e?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)});}},{key:"clearSelection",value:function(){this.trigger&&this.trigger.focus(),document.activeElement.blur(),window.getSelection().removeAllRanges();}},{key:"destroy",value:function(){this.removeFake();}},{key:"action",set:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(e){if(void 0!==e){if(!e||"object"!==(void 0===e?"undefined":i(e))||1!==e.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&e.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(e.hasAttribute("readonly")||e.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=e;}},get:function(){return this._target}}]),e}(),c=r(1),u=r.n(c),p=r(2),s=r.n(p),C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},L=function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o);}}return function(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}}(),m=function(e){function t(e,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var o=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return o.resolveOptions(r),o.listenClick(e),o}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t);}(t,e),L(t,[{key:"resolveOptions",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"==typeof e.action?e.action:this.defaultAction,this.target="function"==typeof e.target?e.target:this.defaultTarget,this.text="function"==typeof e.text?e.text:this.defaultText,this.container="object"===C(e.container)?e.container:document.body;}},{key:"listenClick",value:function(e){var t=this;this.listener=s()(e,"click",(function(e){return t.onClick(e)}));}},{key:"onClick",value:function(e){var t=e.delegateTarget||e.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new l({action:this.action(t),target:this.target(t),text:this.text(t),container:this.container,trigger:t,emitter:this});}},{key:"defaultAction",value:function(e){return d("action",e)}},{key:"defaultTarget",value:function(e){var t=d("target",e);if(t)return document.querySelector(t)}},{key:"defaultText",value:function(e){return d("text",e)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null);}}],[{key:"isSupported",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["copy","cut"],t="string"==typeof e?[e]:e,r=!!document.queryCommandSupported;return t.forEach((function(e){r=r&&!!document.queryCommandSupported(e);})),r}}]),t}(u.a);function d(e,t){var r="data-clipboard-"+e;if(t.hasAttribute(r))return t.getAttribute(r)}t.default=m;}]).default},e.exports=r();})));function Et(t){let r,o,n=t[1]("LCHCopyToClipboardButtonText")+"";return {c(){r=d("button"),o=f(n),P(r,"class","LCHCopyToClipboardButton"),P(r,"data-clipboard-text",t[0]);},m(e,n){C(e,r,n),s(r,o),t[4](r);},p(e,[t]){2&t&&n!==(n=e[1]("LCHCopyToClipboardButtonText")+"")&&b(o,n),1&t&&P(r,"data-clipboard-text",e[0]);},i:e,o:e,d(e){e&&L(r),t[4](null);}}}function wt(e,t,r){let o,n,{inputData:i}=t,{LCHCopyToClipboardCompletionHandler:a}=t,{OLSKLocalized:l}=t,c=!1;function u(){c||(n.destroy(),a(),c=!0);}return O((function(){n=new vt(o),n.on("success",(function(e){u();})),n.on("error",(function(e){u();})),o.addEventListener("click",(function(e){u();})),o.focus(),ne()||o.click();})),e.$set=e=>{"inputData"in e&&r(0,i=e.inputData),"LCHCopyToClipboardCompletionHandler"in e&&r(3,a=e.LCHCopyToClipboardCompletionHandler),"OLSKLocalized"in e&&r(1,l=e.OLSKLocalized);},[i,l,o,a,function(e){w[e?"unshift":"push"](()=>{o=e,r(2,o);});}]}const xt=class extends X{constructor(e){super(),Y(this,e,wt,Et,a,{inputData:0,LCHCopyToClipboardCompletionHandler:3,OLSKLocalized:1});}};var Vt=Object.freeze({LCHCopyToClipboard:xt}),_t=re((function(e,t){const r={OLSKResultsConstrainIndex(e,t){if(!Array.isArray(e))throw new Error("OLSKErrorInputNotValid");if("number"!=typeof t)throw new Error("OLSKErrorInputNotValid");return t<0?e.length-1:t>=e.length?0:t}};Object.assign(t,r);}));const At=e=>({OLSKResultsListItem:1&e}),jt=e=>({OLSKResultsListItem:e[10]}),kt=e=>({OLSKResultsListItem:1&e}),Ft=e=>({OLSKResultsListItem:e[10]});function Mt(e,t,r){const o=e.slice();return o[10]=t[r],o}function Dt(e){let t,r;const o=e[8].OLSKResultsEmpty,n=l(o,e,e[7],jt);return {c(){t=d("div"),n&&n.c(),P(t,"class","OLSKResultsEmpty");},m(e,o){C(e,t,o),n&&n.m(t,null),r=!0;},p(e,t){n&&n.p&&129&t&&u(n,o,e,e[7],t,At,jt);},i(e){r||(B(n,e),r=!0);},o(e){z(n,e),r=!1;},d(e){e&&L(t),n&&n.d(e);}}}function Nt(e){let t,r,o=e[0],n=[];for(let t=0;t<o.length;t+=1)n[t]=Kt(Mt(e,o,t));const i=e=>z(n[e],1,1,()=>{n[e]=null;});return {c(){t=d("div");for(let e=0;e<n.length;e+=1)n[e].c();P(t,"class","OLSKResultsList");},m(e,o){C(e,t,o);for(let e=0;e<n.length;e+=1)n[e].m(t,null);r=!0;},p(e,r){if(135&r){let a;for(o=e[0],a=0;a<o.length;a+=1){const i=Mt(e,o,a);n[a]?(n[a].p(i,r),B(n[a],1)):(n[a]=Kt(i),n[a].c(),B(n[a],1),n[a].m(t,null));}for($(),a=o.length;a<n.length;a+=1)i(a);U();}},i(e){if(!r){for(let e=0;e<o.length;e+=1)B(n[e]);r=!0;}},o(e){n=n.filter(Boolean);for(let e=0;e<n.length;e+=1)z(n[e]);r=!1;},d(e){e&&L(t),m(n,e);}}}function Kt(e){let t,r,o,n,i;const a=e[8].default,c=l(a,e,e[7],Ft);function p(...t){return e[9](e[10],...t)}return {c(){t=d("div"),c&&c.c(),r=H(),P(t,"class","OLSKResultsListItem svelte-617v38"),R(t,"OLSKResultsListItemSelected",e[10]===e[1]);},m(e,a){C(e,t,a),c&&c.m(t,null),s(t,r),o=!0,n||(i=y(t,"click",p),n=!0);},p(r,o){e=r,c&&c.p&&129&o&&u(c,a,e,e[7],o,kt,Ft),3&o&&R(t,"OLSKResultsListItemSelected",e[10]===e[1]);},i(e){o||(B(c,e),o=!0);},o(e){z(c,e),o=!1;},d(e){e&&L(t),c&&c.d(e),n=!1,i();}}}function $t(e){let t,r,o,n,i,a;const l=[Nt,Dt],c=[];function u(e,t){return e[0].length?0:1}return r=u(e),o=c[r]=l[r](e),{c(){t=d("div"),o.c(),P(t,"class","OLSKResults");},m(o,l){C(o,t,l),c[r].m(t,null),n=!0,i||(a=y(window,"keydown",e[3].InterfaceWindowDidKeydown),i=!0);},p(e,[n]){let i=r;r=u(e),r===i?c[r].p(e,n):($(),z(c[i],1,1,()=>{c[i]=null;}),U(),o=c[r],o||(o=c[r]=l[r](e),o.c()),B(o,1),o.m(t,null));},i(e){n||(B(o),n=!0);},o(e){z(o),n=!1;},d(e){e&&L(t),c[r].d(),i=!1,a();}}}function Ut(e,t,r){let{OLSKResultsListItems:o}=t,{OLSKResultsListItemSelected:n}=t,{OLSKResultsDispatchArrow:i}=t,{OLSKResultsDispatchClick:a}=t,{OLSKResultsEnableLooping:l=!1}=t,{OLSKResultsIgnoreKeyboard:c=!1}=t;const u={InterfaceWindowDidKeydown(e){if(c)return;if(!o.length)return;const t={ArrowUp:()=>((l||o[0]!==n)&&u.ControlArrowIncrement(-1),e.preventDefault()),ArrowDown:()=>((l||o.slice(-1).pop()!==n)&&u.ControlArrowIncrement(1),e.preventDefault())};t[e.code]&&t[e.code]();},ControlArrowIncrement(e){i(o[_t.OLSKResultsConstrainIndex(o,o.indexOf(n)+e)]);}};let{$$slots:p={},$$scope:s}=t;return e.$set=e=>{"OLSKResultsListItems"in e&&r(0,o=e.OLSKResultsListItems),"OLSKResultsListItemSelected"in e&&r(1,n=e.OLSKResultsListItemSelected),"OLSKResultsDispatchArrow"in e&&r(4,i=e.OLSKResultsDispatchArrow),"OLSKResultsDispatchClick"in e&&r(2,a=e.OLSKResultsDispatchClick),"OLSKResultsEnableLooping"in e&&r(5,l=e.OLSKResultsEnableLooping),"OLSKResultsIgnoreKeyboard"in e&&r(6,c=e.OLSKResultsIgnoreKeyboard),"$$scope"in e&&r(7,s=e.$$scope);},[o,n,a,u,i,l,c,s,p,e=>a(e)]}class Bt extends X{constructor(e){super(),Y(this,e,Ut,$t,a,{OLSKResultsListItems:0,OLSKResultsListItemSelected:1,OLSKResultsDispatchArrow:4,OLSKResultsDispatchClick:2,OLSKResultsEnableLooping:5,OLSKResultsIgnoreKeyboard:6});}}function zt(e){let t,r,o,n;return {c(){t=d("br"),r=H(),o=d("span"),n=f(e[1]),P(o,"class","LCHLauncherPipeItemSubtitle svelte-1u2sunx");},m(e,i){C(e,t,i),C(e,r,i),C(e,o,i),s(o,n);},p(e,t){2&t&&b(n,e[1]);},d(e){e&&L(t),e&&L(r),e&&L(o);}}}function qt(e){let t,r,o,n;return {c(){t=d("br"),r=H(),o=d("span"),n=f(e[2]),P(o,"class","LCHLauncherPipeItemSource svelte-1u2sunx");},m(e,i){C(e,t,i),C(e,r,i),C(e,o,i),s(o,n);},p(e,t){4&t&&b(n,e[2]);},d(e){e&&L(t),e&&L(r),e&&L(o);}}}function Wt(t){let r,o,n,i,a,l=t[1]&&zt(t),c=t[2]&&qt(t);return {c(){r=d("div"),o=d("span"),n=f(t[0]),i=H(),l&&l.c(),a=H(),c&&c.c(),P(o,"class","LCHLauncherPipeItemTitle"),P(r,"class","LCHLauncherPipeItem svelte-1u2sunx");},m(e,t){C(e,r,t),s(r,o),s(o,n),s(r,i),l&&l.m(r,null),s(r,a),c&&c.m(r,null);},p(e,[t]){1&t&&b(n,e[0]),e[1]?l?l.p(e,t):(l=zt(e),l.c(),l.m(r,a)):l&&(l.d(1),l=null),e[2]?c?c.p(e,t):(c=qt(e),c.c(),c.m(r,null)):c&&(c.d(1),c=null);},i:e,o:e,d(e){e&&L(r),l&&l.d(),c&&c.d();}}}function Zt(e,t,r){let{PipeItemTitle:o=""}=t,{PipeItemSubtitle:n=""}=t,{PipeItemSource:i=""}=t;return e.$set=e=>{"PipeItemTitle"in e&&r(0,o=e.PipeItemTitle),"PipeItemSubtitle"in e&&r(1,n=e.PipeItemSubtitle),"PipeItemSource"in e&&r(2,i=e.PipeItemSource);},[o,n,i]}class Jt extends X{constructor(e){super(),Y(this,e,Zt,Wt,a,{PipeItemTitle:0,PipeItemSubtitle:1,PipeItemSource:2});}}function Gt(e){let t,r;return t=new Jt({props:{PipeItemTitle:e[0].LCHRecipeName,PipeItemSubtitle:e[0]._LCHRecipeOutputTypeName,PipeItemSource:e[0]._LCHRecipeSource}}),{c(){W(t.$$.fragment);},m(e,o){Z(t,e,o),r=!0;},p(e,r){const o={};1&r&&(o.PipeItemTitle=e[0].LCHRecipeName),1&r&&(o.PipeItemSubtitle=e[0]._LCHRecipeOutputTypeName),1&r&&(o.PipeItemSource=e[0]._LCHRecipeSource),t.$set(o);},i(e){r||(B(t.$$.fragment,e),r=!0);},o(e){z(t.$$.fragment,e),r=!1;},d(e){J(t,e);}}}function Yt(e){let t;const r=e[6].default,o=l(r,e,e[7],null);return {c(){o&&o.c();},m(e,r){o&&o.m(e,r),t=!0;},p(e,t){o&&o.p&&128&t&&u(o,r,e,e[7],t,null,null);},i(e){t||(B(o,e),t=!0);},o(e){z(o,e),t=!1;},d(e){o&&o.d(e);}}}function Xt(e){let t,r;return t=new Bt({props:{OLSKResultsListItems:e[1],OLSKResultsListItemSelected:e[0],OLSKResultsDispatchClick:e[5],OLSKResultsDispatchArrow:e[4],OLSKResultsEnableLooping:!0,$$slots:{default:[Qt,({OLSKResultsListItem:e})=>({9:e}),({OLSKResultsListItem:e})=>e?512:0]},$$scope:{ctx:e}}}),{c(){W(t.$$.fragment);},m(e,o){Z(t,e,o),r=!0;},p(e,r){const o={};2&r&&(o.OLSKResultsListItems=e[1]),1&r&&(o.OLSKResultsListItemSelected=e[0]),640&r&&(o.$$scope={dirty:r,ctx:e}),t.$set(o);},i(e){r||(B(t.$$.fragment,e),r=!0);},o(e){z(t.$$.fragment,e),r=!1;},d(e){J(t,e);}}}function Qt(e){let t,r;return t=new Jt({props:{PipeItemTitle:e[9].LCHRecipeName,PipeItemSubtitle:e[9]._LCHRecipeOutputTypeName,PipeItemSource:e[9]._LCHRecipeSource}}),{c(){W(t.$$.fragment);},m(e,o){Z(t,e,o),r=!0;},p(e,r){const o={};512&r&&(o.PipeItemTitle=e[9].LCHRecipeName),512&r&&(o.PipeItemSubtitle=e[9]._LCHRecipeOutputTypeName),512&r&&(o.PipeItemSource=e[9]._LCHRecipeSource),t.$set(o);},i(e){r||(B(t.$$.fragment,e),r=!0);},o(e){z(t.$$.fragment,e),r=!1;},d(e){J(t,e);}}}function er(e){let t,r,o,n,i,a,l;const c=[Yt,Gt],u=[];function p(e,t){return !e[0]||e[3]?0:1}n=p(e),i=u[n]=c[n](e);let m=!e[2]&&Xt(e);return {c(){t=d("div"),r=d("div"),o=d("div"),i.c(),a=H(),m&&m.c(),P(o,"class","LCHLauncherZoneInputBezel svelte-m73tr1"),P(r,"class","LCHLauncherZoneInput svelte-m73tr1"),P(t,"class","LCHLauncherPrompt");},m(e,i){C(e,t,i),s(t,r),s(r,o),u[n].m(o,null),s(t,a),m&&m.m(t,null),l=!0;},p(e,[r]){let a=n;n=p(e),n===a?u[n].p(e,r):($(),z(u[a],1,1,()=>{u[a]=null;}),U(),i=u[n],i||(i=u[n]=c[n](e),i.c()),B(i,1),i.m(o,null)),e[2]?m&&($(),z(m,1,1,()=>{m=null;}),U()):m?(m.p(e,r),4&r&&B(m,1)):(m=Xt(e),m.c(),B(m,1),m.m(t,null));},i(e){l||(B(i),B(m),l=!0);},o(e){z(i),z(m),l=!1;},d(e){e&&L(t),u[n].d(),m&&m.d();}}}function tr(e,t,r){let{PromptItems:o=[]}=t,{ResultsHidden:n=!1}=t,{ItemSelected:i=null}=t,{ItemSelectedHidden:a=!1}=t;const l=v();let{$$slots:c={},$$scope:u}=t;return e.$set=e=>{"PromptItems"in e&&r(1,o=e.PromptItems),"ResultsHidden"in e&&r(2,n=e.ResultsHidden),"ItemSelected"in e&&r(0,i=e.ItemSelected),"ItemSelectedHidden"in e&&r(3,a=e.ItemSelectedHidden),"$$scope"in e&&r(7,u=e.$$scope);},[i,o,n,a,function(e){l("ResultListDispatchArrow",r(0,i=e));},function(e){l("ResultListDispatchClick",r(0,i=e));},c,u]}class rr extends X{constructor(e){super(),Y(this,e,tr,er,a,{PromptItems:1,ResultsHidden:2,ItemSelected:0,ItemSelectedHidden:3});}}const{window:or}=q;function nr(e,t,r){const o=e.slice();return o[16]=t[r],o[17]=t,o[18]=r,o}function ir(e){let t,r,o,n,i,a,l,c=e[0].LCHOptionMode===gt.LCHLauncherModePipe(),u=c&&ar(e);function m(...t){return e[12](e[16],...t)}return o=new rr({props:{PromptItems:e[16].LCHPromptItemsVisible,ItemSelected:e[16].LCHPromptItemSelected,ItemSelectedHidden:e[0].LCHOptionMode!==gt.LCHLauncherModePipe()||e[16].LCHPromptDotModeEnabled,ResultsHidden:!1!==e[16].LCHPromptResultsThrottle,$$slots:{default:[pr]},$$scope:{ctx:e}}}),o.$on("ResultListDispatchArrow",e[10]),o.$on("ResultListDispatchClick",e[11]),{c(){t=d("div"),u&&u.c(),r=H(),W(o.$$.fragment),P(t,"class",n=p(e[16].LCHPromptClass)+" svelte-1rxh210"),R(t,"LCHLauncherPromptSelected",e[1]._ValuePromptObjects[e[1]._ValuePromptActiveIndex]===e[16]);},m(e,n){C(e,t,n),u&&u.m(t,null),s(t,r),Z(o,t,null),i=!0,a||(l=y(t,"click",m),a=!0);},p(a,l){e=a,1&l&&(c=e[0].LCHOptionMode===gt.LCHLauncherModePipe()),c?u?u.p(e,l):(u=ar(e),u.c(),u.m(t,r)):u&&(u.d(1),u=null);const s={};2&l&&(s.PromptItems=e[16].LCHPromptItemsVisible),2&l&&(s.ItemSelected=e[16].LCHPromptItemSelected),3&l&&(s.ItemSelectedHidden=e[0].LCHOptionMode!==gt.LCHLauncherModePipe()||e[16].LCHPromptDotModeEnabled),2&l&&(s.ResultsHidden=!1!==e[16].LCHPromptResultsThrottle),524291&l&&(s.$$scope={dirty:l,ctx:e}),o.$set(s),(!i||2&l&&n!==(n=p(e[16].LCHPromptClass)+" svelte-1rxh210"))&&P(t,"class",n),2&l&&R(t,"LCHLauncherPromptSelected",e[1]._ValuePromptObjects[e[1]._ValuePromptActiveIndex]===e[16]);},i(e){i||(B(o.$$.fragment,e),i=!0);},o(e){z(o.$$.fragment,e),i=!1;},d(e){e&&L(t),u&&u.d(),J(o),a=!1,l();}}}function ar(e){let t,r,o=(e[16].LCHPromptFilterText&&e[16].LCHPromptFilterText.toUpperCase()||e[16].LCHPromptHeading)+"";return {c(){t=d("strong"),r=f(o),P(t,"class","LCHLauncherPromptHeading svelte-1rxh210"),R(t,"LCHLauncherPromptHeadingMatchStop",e[16].LCHPromptMatchStop);},m(e,o){C(e,t,o),s(t,r);},p(e,n){2&n&&o!==(o=(e[16].LCHPromptFilterText&&e[16].LCHPromptFilterText.toUpperCase()||e[16].LCHPromptHeading)+"")&&b(r,o),2&n&&R(t,"LCHLauncherPromptHeadingMatchStop",e[16].LCHPromptMatchStop);},d(e){e&&L(t);}}}function lr(t){let r;return {c(){r=d("span"),r.textContent=""+t[2]("LCHLauncherSubjectPromptPlaceholderText"),P(r,"class","LCHLauncherSubjectPromptPlaceholder svelte-1rxh210");},m(e,t){C(e,r,t);},p:e,d(e){e&&L(r);}}}function cr(e){let t,r,o,i;return {c(){t=d("input"),P(t,"class","LCHLauncherFilterInput svelte-1rxh210"),P(t,"placeholder",r=e[0].LCHOptionMode===gt.LCHLauncherModePreview()?e[2]("LCHLauncherInputPlaceholderPreview"):e[2]("LCHLauncherInputPlaceholderDefault")),t.autofocus=!0;},m(r,n){C(r,t,n),S(t,e[1]._ValuePromptObjects[0].LCHPromptFilterText),e[7](t),t.focus(),o||(i=[y(t,"input",e[6]),y(t,"input",e[8])],o=!0);},p(e,o){1&o&&r!==(r=e[0].LCHOptionMode===gt.LCHLauncherModePreview()?e[2]("LCHLauncherInputPlaceholderPreview"):e[2]("LCHLauncherInputPlaceholderDefault"))&&P(t,"placeholder",r),2&o&&t.value!==e[1]._ValuePromptObjects[0].LCHPromptFilterText&&S(t,e[1]._ValuePromptObjects[0].LCHPromptFilterText);},d(r){r&&L(t),e[7](null),o=!1,n(i);}}}function ur(e){let t,r,o;function a(){e[9].call(t,e[17],e[18]);}return {c(){t=d("input"),P(t,"class","LCHLauncherPromptDotModeInput svelte-1rxh210"),t.autofocus=!0;},m(n,l){C(n,t,l),S(t,e[16].LCHPromptDotModeText),t.focus(),r||(o=[y(t,"input",a),y(t,"input",(function(){i(e[1].InterfaceDotModeFieldDidInput)&&e[1].InterfaceDotModeFieldDidInput.apply(this,arguments);}))],r=!0);},p(r,o){e=r,2&o&&t.value!==e[16].LCHPromptDotModeText&&S(t,e[16].LCHPromptDotModeText);},d(e){e&&L(t),r=!1,n(o);}}}function pr(e){let t,r,o,n=!["LCHLauncherFilterPrompt","LCHLauncherActionPrompt"].includes(e[16].LCHPromptClass)&&e[16].LCHPromptDotModeEnabled,i="LCHLauncherSubjectPrompt"===e[16].LCHPromptClass&&!e[16].LCHPromptDotModeEnabled&&lr(e),a="LCHLauncherFilterPrompt"===e[16].LCHPromptClass&&cr(e),l=n&&ur(e);return {c(){i&&i.c(),t=H(),a&&a.c(),r=H(),l&&l.c(),o=h();},m(e,n){i&&i.m(e,n),C(e,t,n),a&&a.m(e,n),C(e,r,n),l&&l.m(e,n),C(e,o,n);},p(e,c){"LCHLauncherSubjectPrompt"!==e[16].LCHPromptClass||e[16].LCHPromptDotModeEnabled?i&&(i.d(1),i=null):i?i.p(e,c):(i=lr(e),i.c(),i.m(t.parentNode,t)),"LCHLauncherFilterPrompt"===e[16].LCHPromptClass?a?a.p(e,c):(a=cr(e),a.c(),a.m(r.parentNode,r)):a&&(a.d(1),a=null),2&c&&(n=!["LCHLauncherFilterPrompt","LCHLauncherActionPrompt"].includes(e[16].LCHPromptClass)&&e[16].LCHPromptDotModeEnabled),n?l?l.p(e,c):(l=ur(e),l.c(),l.m(o.parentNode,o)):l&&(l.d(1),l=null);},d(e){i&&i.d(e),e&&L(t),a&&a.d(e),e&&L(r),l&&l.d(e),e&&L(o);}}}function sr(e){let t,r,o=e[16].LCHPromptIsVisible&&ir(e);return {c(){o&&o.c(),t=h();},m(e,n){o&&o.m(e,n),C(e,t,n),r=!0;},p(e,r){e[16].LCHPromptIsVisible?o?(o.p(e,r),2&r&&B(o,1)):(o=ir(e),o.c(),B(o,1),o.m(t.parentNode,t)):o&&($(),z(o,1,1,()=>{o=null;}),U());},i(e){r||(B(o),r=!0);},o(e){z(o),r=!1;},d(e){o&&o.d(e),e&&L(t);}}}function Cr(e){let r,o,n;const i=[e[1]._ValueSecondaryComponentDescriptor.LCHInstanceProps];var a=e[1]._ValueSecondaryComponentDescriptor.LCHInstanceClass;function l(e){let r={};for(let e=0;e<i.length;e+=1)r=t(r,i[e]);return {props:r}}return a&&(r=new a(l())),{c(){r&&W(r.$$.fragment),o=h();},m(e,t){r&&Z(r,e,t),C(e,o,t),n=!0;},p(e,t){const n=2&t?function(e,t){const r={},o={},n={$$scope:1};let i=e.length;for(;i--;){const a=e[i],l=t[i];if(l){for(const e in a)e in l||(o[e]=1);for(const e in l)n[e]||(r[e]=l[e],n[e]=1);e[i]=l;}else for(const e in a)n[e]=1;}for(const e in o)e in r||(r[e]=void 0);return r}(i,[(c=e[1]._ValueSecondaryComponentDescriptor.LCHInstanceProps,"object"==typeof c&&null!==c?c:{})]):{};var c;if(a!==(a=e[1]._ValueSecondaryComponentDescriptor.LCHInstanceClass)){if(r){$();const e=r;z(e.$$.fragment,1,0,()=>{J(e,1);}),U();}a?(r=new a(l()),W(r.$$.fragment),B(r.$$.fragment,1),Z(r,o.parentNode,o)):r=null;}else a&&r.$set(n);},i(e){n||(r&&B(r.$$.fragment,e),n=!0);},o(e){r&&z(r.$$.fragment,e),n=!1;},d(e){e&&L(o),r&&J(r,e);}}}function Lr(e){let t,r,o,a,l,c,u,p=ne(),f=e[1]._ValuePromptObjects,b=[];for(let t=0;t<f.length;t+=1)b[t]=sr(nr(e,f,t));const S=e=>z(b[e],1,1,()=>{b[e]=null;});let R=p&&function(e){let t,r,o;return {c(){t=d("button"),P(t,"id","TestLCHDebugCloseButton"),P(t,"class","svelte-1rxh210");},m(n,a){C(n,t,a),r||(o=y(t,"click",(function(){i(e[1].ControlExit)&&e[1].ControlExit.apply(this,arguments);})),r=!0);},p(t,r){e=t;},d(e){e&&L(t),r=!1,o();}}}(e),g=e[1]._ValueSecondaryComponentDescriptor&&Cr(e);return {c(){t=d("div");for(let e=0;e<b.length;e+=1)b[e].c();r=H(),R&&R.c(),o=H(),g&&g.c(),a=h(),P(t,"class","Container LCHLauncher svelte-1rxh210");},m(n,p){C(n,t,p);for(let e=0;e<b.length;e+=1)b[e].m(t,null);s(t,r),R&&R.m(t,null),e[13](t),C(n,o,p),g&&g.m(n,p),C(n,a,p),l=!0,c||(u=[y(or,"keydown",(function(){i(e[1].interfaceDidKeydown)&&e[1].interfaceDidKeydown.apply(this,arguments);})),y(or,"click",(function(){i(e[1].InterfaceBodyDidClick)&&e[1].InterfaceBodyDidClick.apply(this,arguments);})),y(or,"touchstart",(function(){i(e[1].InterfaceBodyDidClick)&&e[1].InterfaceBodyDidClick.apply(this,arguments);}))],c=!0);},p(o,[n]){if(e=o,31&n){let o;for(f=e[1]._ValuePromptObjects,o=0;o<f.length;o+=1){const i=nr(e,f,o);b[o]?(b[o].p(i,n),B(b[o],1)):(b[o]=sr(i),b[o].c(),B(b[o],1),b[o].m(t,r));}for($(),o=f.length;o<b.length;o+=1)S(o);U();}p&&R.p(e,n),e[1]._ValueSecondaryComponentDescriptor?g?(g.p(e,n),2&n&&B(g,1)):(g=Cr(e),g.c(),B(g,1),g.m(a.parentNode,a)):g&&($(),z(g,1,1,()=>{g=null;}),U());},i(e){if(!l){for(let e=0;e<f.length;e+=1)B(b[e]);B(g),l=!0;}},o(e){b=b.filter(Boolean);for(let e=0;e<b.length;e+=1)z(b[e]);z(g),l=!1;},d(r){r&&L(t),m(b,r),R&&R.d(),e[13](null),r&&L(o),g&&g.d(r),r&&L(a),c=!1,n(u);}}}function mr(e,t,r){let{LRTOptions:o={}}=t,{LRTDidFinish:n=null}=t;o=gt.LCHLauncherOptions(o,ne()?void 0:console.warn);const i=function(e){return It.OLSKInternationalLocalizedString(e,JSON.parse('{"en":{"LCHLauncherInputPlaceholderDefault":"Type to search","LCHLauncherInputPlaceholderPreview":"Type to filter","LCHLauncherSubjectPromptPlaceholderText":"Type to search","LCHLauncherSubjectPromptHeadingText":"Subject","LCHLauncherActionPromptHeadingText":"Action","LCHLauncherObjectPromptHeadingText":"Object","LCHCopyToClipboardButtonText":"Copy to clipboard","LCHStandardRecipeNames":{"LCHActiveDocumentFocusElements":"Active Document Focus Elements","LCHCopyToClipboard":"Copy to clipboard","LCHLargeText":"Large text","LCHDOMElementFocus":"Focus","LCHRunCommand":"Run Command","LCHSearchWith":"Search With","LCHSearchFor":"Search For","LCHSubjectContainerShowContents":"Show Contents","LCHURLOpen":"Open URL","SubjectContainer":"Subject Container","String":"String","Date":"Date","URL":"URL","ServiceSearchURLTemplate":"Search Service URL Template","DOMElement":"DOM Element"}},"es":{"LCHLauncherInputPlaceholderDefault":"Escribir para buscar","LCHLauncherInputPlaceholderPreview":"Escribir para filtrar","LCHLauncherSubjectPromptPlaceholderText":"Escribir para buscar","LCHLauncherSubjectPromptHeadingText":"Sujeto","LCHLauncherActionPromptHeadingText":"Acto","LCHLauncherObjectPromptHeadingText":"Objeto","LCHCopyToClipboardButtonText":"Copiar al portapapeles","LCHStandardRecipeNames":{"LCHActiveDocumentFocusElements":"Elementos enfocados del documento activo","LCHCopyToClipboard":"Copiar al portapapeles","LCHLargeText":"Texto aumentado","LCHDOMElementFocus":"Enfocar","LCHRunCommand":"Ejecutar comando","LCHSearchWith":"Buscar con","LCHSearchFor":"Buscar para","LCHSubjectContainerShowContents":"Mostrar contenidos","LCHURLOpen":"Abrir URL","SubjectContainer":"Contenido de sujetos","String":"String","Date":"Date","URL":"URL","ServiceSearchURLTemplate":"Plantilla URL de servicio de búsqueda","DOMElement":"Elemento DOM"}},"fr":{"LCHLauncherInputPlaceholderDefault":"Taper pour chercher","LCHLauncherInputPlaceholderPreview":"Taper pour filtrer","LCHLauncherSubjectPromptPlaceholderText":"Taper pour chercher","LCHLauncherSubjectPromptHeadingText":"Sujet","LCHLauncherActionPromptHeadingText":"Action","LCHLauncherObjectPromptHeadingText":"Objet","LCHCopyToClipboardButtonText":"Copier dans le presse-papier","LCHStandardRecipeNames":{"LCHActiveDocumentFocusElements":"Éléments au points du document active","LCHCopyToClipboard":"Copier dans le presse-papier","LCHLargeText":"Texte élargi","LCHDOMElementFocus":"Faire le point","LCHRunCommand":"Exécuter la commande","LCHSearchWith":"Chercher avec","LCHSearchFor":"Chercher pour","LCHSubjectContainerShowContents":"Montrer le contenu","LCHURLOpen":"Ouvrir l\'URL","SubjectContainer":"Contenant des sujets","String":"String","Date":"Date","URL":"URL","ServiceSearchURLTemplate":"Modèle URL de service de recherche","DOMElement":"Élément DOM"}}}')[o.LCHOptionLanguage])};function a(e){r(1,u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptFilterText=e,u),function(){for(var e=0;e<u._ValuePromptObjects.length;e++)e&&e!==u._ValuePromptActiveIndex&&(r(1,u._ValuePromptObjects[e].LCHPromptFilterText="",u),r(1,u._ValuePromptObjects[e].LCHPromptMatchStop=!1,u));}(),o.LCHOptionMode===gt.LCHLauncherModePipe()&&(!1===u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptInputThrottle&&r(1,u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptMatchStop=!1,u),u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptFilterText||r(1,u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptMatchStop=!1,u)),function(){if(o.LCHOptionMode!==gt.LCHLauncherModePipe())return;if(!u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptFilterText)return;const e=u._ValuePromptActiveIndex;Ot.OLSKThrottleMappedTimeout(u._ValuePromptObjects[e],"LCHPromptInputThrottle",{OLSKThrottleDuration:gt.LCHLauncherThrottleDuration,OLSKThrottleCallback(){setTimeout((function(){r(1,u._ValuePromptObjects[e].LCHPromptInputThrottle=!1,u);}));}});}(),function(){if(o.LCHOptionMode!==gt.LCHLauncherModePipe())return;if(!u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptFilterText)return;const e=u._ValuePromptActiveIndex;Ot.OLSKThrottleMappedTimeout(u._ValuePromptObjects[e],"LCHPromptResultsThrottle",{OLSKThrottleDuration:gt.LCHLauncherThrottleDuration,OLSKThrottleCallback(){setTimeout((function(){r(1,u._ValuePromptObjects[e].LCHPromptResultsThrottle=!1,u);}));}});}(),l(function(){if(o.LCHOptionMode===gt.LCHLauncherModePipe()&&!u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptFilterText&&!1===u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptResultsThrottle)return u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptItemsVisible;if(!u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptFilterText)return o.LCHOptionMode===gt.LCHLauncherModePreview()?u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptItemsAll:[];const e=u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptItemsAll.filter((function(e){return !e.LCHRecipeIsExcluded||!e.LCHRecipeIsExcluded()}));let t=Tt.go(u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptFilterText,e,{key:"LCHRecipeName"});return t.length||!ne()||u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptFilterText.slice(0,3).match(/[^A-Z]/)?o.LCHOptionMode===gt.LCHLauncherModePipe()&&u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptItemsVisible.length&&!t.length?(u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptResultsThrottle&&Ot.OLSKThrottleSkip(u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptResultsThrottle),r(1,u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptMatchStop=!0,u),u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptItemsVisible):t.sort((function(e,t){return e.score<t.score?1:e.score>t.score?-1:0})).map((function(e){return e.obj})):e.filter((function(e){return e.LCHRecipeSignature===u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptFilterText}))}());}function l(e){r(1,u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptItemsVisible=e,u),c(u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptItemsVisible[0]);}function c(e){r(1,u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptItemSelected=e,u),o.LCHOptionMode===gt.LCHLauncherModePreview()&&u.ControlRun(u._ValuePromptObjects[0].LCHPromptItemSelected),o.LCHOptionMode===gt.LCHLauncherModePipe()&&(!function(){if(0===u._ValuePromptActiveIndex){if(!u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptItemSelected)return r(1,u._ValuePromptObjects[1].LCHPromptItemsVisible=r(1,u._ValuePromptObjects[1].LCHPromptItemsAll=[],u),u),void delete u._ValuePromptObjects[1].LCHPromptItemSelected;r(1,u._ValuePromptObjects[1].LCHPromptItemsAll=u._ValueAllActions.filter((function(t){return u._ValueTypeEquivalenceMap[e.LCHRecipeOutputType||"Command"].filter((function(e){return ae.LCHRuntimeInputTypes(t.LCHRecipeInputTypes).shift()===e})).length})).sort(gt.LCHLauncherActionComparator(e.LCHRecipeOutputType||"Command")),u),r(1,u._ValuePromptObjects[1].LCHPromptItemsVisible=u._ValuePromptObjects[1].LCHPromptItemsAll,u),r(1,u._ValuePromptObjects[1].LCHPromptItemSelected=u._ValuePromptObjects[1].LCHPromptItemsVisible[0],u);}}(),u._ValuePromptActiveIndex>1||u._ValuePromptObjects[1].LCHPromptItemSelected&&(r(1,u._ValuePromptObjects[2].LCHPromptIsVisible=Rt.LCHRecipesModelActionTakesObject(u._ValuePromptObjects[1].LCHPromptItemSelected),u),r(1,u._ValuePromptObjects[2].LCHPromptItemsAll=u._ValuePromptObjects[2].LCHPromptIsVisible&&"String"!==ae.LCHRuntimeInputTypes(u._ValuePromptObjects[1].LCHPromptItemSelected.LCHRecipeInputTypes).pop()?u._ValueAllSubjects.filter((function(e){return u._ValueTypeEquivalenceMap[ae.LCHRuntimeInputTypes(u._ValuePromptObjects[1].LCHPromptItemSelected.LCHRecipeInputTypes).pop()].includes(e.LCHRecipeOutputType)})):[],u),r(1,u._ValuePromptObjects[2].LCHPromptItemsVisible=u._ValuePromptObjects[2].LCHPromptItemsAll,u),r(1,u._ValuePromptObjects[2].LCHPromptItemSelected=u._ValuePromptObjects[2].LCHPromptItemsVisible[0],u)));}const u={_ValuePromptActiveIndex:0,_ValuePromptObjects:[],_ValueAllPromptRecipes:[],_ValueAllSubjects:[],_ValueAllActions:[],ValuePromptActiveIndex(e){if(void 0===e)return u._ValuePromptActiveIndex;o.LCHOptionMode===gt.LCHLauncherModePipe()&&(Ot.OLSKThrottleIsValid(u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptInputThrottle)&&clearTimeout(u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptInputThrottle._OLSKThrottleTimeoutID),r(1,u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptInputThrottle=void 0,u),Ot.OLSKThrottleIsValid(u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptResultsThrottle)&&clearTimeout(u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptResultsThrottle._OLSKThrottleTimeoutID),r(1,u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptResultsThrottle=void 0,u)),u._ValuePromptObjects[1].LCHPromptItemsAll.length&&(r(1,u._ValuePromptActiveIndex=e,u),2===u._ValuePromptActiveIndex&&"String"===ae.LCHRuntimeInputTypes(u._ValuePromptObjects[1].LCHPromptItemSelected.LCHRecipeInputTypes).pop()&&(u.ValuePromptDotModeEnabled(!0),u.ValuePromptDotModeText(u.ValuePromptDotModeText())));},ValuePromptDotModeEnabled(e){if(void 0===e)return u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptDotModeEnabled;r(1,u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptDotModeEnabled=e,u);},ValuePromptDotModeText(e){if(void 0===e)return u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptDotModeText;r(1,u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptDotModeText=e,u),l(u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptDotModeText?[{LCHRecipeName:u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptDotModeText,LCHRecipeCallback:()=>e,LCHRecipeOutputType:je(u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptDotModeText)?"URL":"String"}]:[]);},ValuePromptResultsIsVisible(e){if(void 0===e)return !1===u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptResultsThrottle;r(1,u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptResultsThrottle=!e&&void 0,u);},DataComposition:()=>o.LCHOptionMode===gt.LCHLauncherModePipe()?{LCHCompositionAction:u._ValuePromptObjects[1].LCHPromptItemSelected,LCHCompositionSubjectPrimary:u._ValuePromptObjects[0].LCHPromptItemSelected,LCHCompositionSubjectSecondary:u._ValuePromptObjects[2].LCHPromptItemSelected}:{LCHCompositionAction:Object.assign(ut(),{LCHRecipeName:i("LCHStandardRecipeNames")[ut().LCHRecipeSignature]}),LCHCompositionSubjectPrimary:u._ValuePromptObjects[0].LCHPromptItemSelected},InterfaceBodyDidClick(e){u._ValueComponentDidMount&&(u._ValueRootElementInstance.contains(e.target)||u.ControlExit());},interfaceDidClickPrompt(e){o.LCHOptionMode===gt.LCHLauncherModePipe()&&u.ValuePromptActiveIndex(u._ValuePromptObjects.indexOf(e));},interfaceDidKeydown(e){u.ControlHandleEventKeydown(e);},InterfaceDotModeFieldDidInput(e){u.ValuePromptDotModeText(this.value);},_ControlHandleEventKeydownModeDotMode(e){const t={Escape:()=>(e.preventDefault(),e.stopPropagation(),u.ValuePromptDotModeEnabled(!1)||!0),Tab:()=>(e.preventDefault(),e.stopPropagation(),!u.ValuePromptDotModeText()||u.ValuePromptDotModeEnabled(!1)),Enter:()=>u.ValuePromptDotModeEnabled(!1)};return !t[e.key]||t[e.key]()},_ControlHandleEventKeydownEscape:e=>(e.preventDefault(),e.stopPropagation(),o.LCHOptionMode===gt.LCHLauncherModePipe()&&u.ValuePromptResultsIsVisible()?u.ValuePromptResultsIsVisible(!1):o.LCHOptionMode!==gt.LCHLauncherModePipe()&&u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptFilterText?a(""):void u.ControlExit()),_ControlHandleEventKeydownTab(e){e.preventDefault(),o.LCHOptionMode===gt.LCHLauncherModePipe()&&u.ValuePromptActiveIndex(gt.LCHLauncherConstrainIndex(u._ValuePromptObjects.filter((function(e){return e.LCHPromptIsVisible})),u._ValuePromptActiveIndex+(e.shiftKey?-1:1)*(!u._ValuePromptActiveIndex&&u._ValuePromptObjects[2].LCHPromptIsVisible&&1===u._ValuePromptObjects[1].LCHPromptItemsAll.length?2:1)));},_ControlHandleEventKeydownEnter(e){e.preventDefault(),e.stopPropagation(),Rt.LCHCompositionModelErrors(u.DataComposition())||u.ControlTerminate();},_ControlHandleEventKeydownArrow(e){if(o.LCHOptionMode===gt.LCHLauncherModePipe()){if(e.preventDefault(),!u.ValuePromptResultsIsVisible())return u.ValuePromptResultsIsVisible(!0);u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptResultsThrottle&&Ot.OLSKThrottleSkip(u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptResultsThrottle);}},_ControlHandleEventKeydownArrowDown(e){o.LCHOptionMode===gt.LCHLauncherModePipe()&&(e.preventDefault(),void 0!==u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptResultsThrottle?u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptResultsThrottle&&Ot.OLSKThrottleSkip(u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptResultsThrottle):r(1,u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptResultsThrottle=!1,u));},_ControlHandleEventKeydownDot(e){o.LCHOptionMode===gt.LCHLauncherModePipe()&&(e.preventDefault(),0===u._ValuePromptActiveIndex&&(Ot.OLSKThrottleIsValid(u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptResultsThrottle)&&clearTimeout(u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptResultsThrottle._OLSKThrottleTimeoutID),u.ValuePromptResultsIsVisible(!1),u.ValuePromptDotModeEnabled(!0),a(""),u.ValuePromptDotModeText(u.ValuePromptDotModeText()),u.ValuePromptDotModeText()||(r(1,u._ValuePromptObjects[1].LCHPromptItemsAll=[],u),r(1,u._ValuePromptObjects[1].LCHPromptItemsVisible=[],u),delete u._ValuePromptObjects[1].LCHPromptItemSelected)));},_ControlHandleEventKeydownBackspace(e){if(o.LCHOptionMode===gt.LCHLauncherModePipe()){if(e.preventDefault(),u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptResultsThrottle)return a(u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptFilterText.slice(0,-1));if(u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptFilterText)return r(1,u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptMatchStop=!1,u),a("");l([]),r(1,u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptResultsThrottle=void 0,u),r(1,u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptDotModeText="",u);}},ControlHandleEventKeydown(e){if(u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptDotModeEnabled&&u._ControlHandleEventKeydownModeDotMode(e))return;const t={Escape:u._ControlHandleEventKeydownEscape,Tab:u._ControlHandleEventKeydownTab,".":u._ControlHandleEventKeydownDot,Enter:u._ControlHandleEventKeydownEnter,ArrowUp:u._ControlHandleEventKeydownArrow,ArrowDown:u._ControlHandleEventKeydownArrowDown,Backspace:u._ControlHandleEventKeydownBackspace};if(t[e.key])return t[e.key](e);u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptDotModeEnabled||o.LCHOptionMode===gt.LCHLauncherModePipe()&&(e.preventDefault(),gt.LCHLauncherKeyboardEventIsTextInput(e)&&a(u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptInputThrottle?u._ValuePromptObjects[u._ValuePromptActiveIndex].LCHPromptFilterText+e.key:e.key));},ControlReloadSubjects(e){let t=gt.LCHLauncherReloadableSubjects([e]);return !!t.length&&(r(1,u._ValuePromptObjects[0].LCHPromptItemsVisible=[],u),r(1,u._ValuePromptObjects[0].LCHPromptItemsAll=t,u),u.ValuePromptActiveIndex(0),c(t[0]),!0)},async ControlTerminate(){o.LCHOptionMode===gt.LCHLauncherModePipe()&&u.ControlReloadSubjects(await u.ControlRun(u.DataComposition()))||(o.LCHOptionMode===gt.LCHLauncherModeCommit()&&await u.ControlRun(u._ValuePromptObjects[0].LCHPromptItemSelected),u.ControlExit());},ControlRun:async e=>u._ControlRun(e.LCHCompositionAction?await Rt.LCHAPIExecuteComposition(e,u._ValueSharedAPI):await Rt.LCHAPIExecuteRecipe(e,[],u._ValueSharedAPI)),_ControlRun:async e=>e?"object"!=typeof e||Rt.LCHComponentDescriptorsModelErrorsFor(e)?Promise.resolve(e):new Promise((function(t,o){let n=e.LCHComponentDescriptorProps;e.LCHComponentDescriptorOLSKLocalized&&Object.assign(n,{OLSKLocalized:i}),n[e.LCHComponentDescriptorCompletionHandlerSignature]=function(){delete u._ValueSecondaryComponentDescriptor,u.ControlExit();},r(1,u._ValueSecondaryComponentDescriptor={LCHInstanceClass:Vt[e.LCHComponentDescriptorName],LCHInstanceProps:n},u);})):Promise.resolve(e),ControlExit(){if(u._ValueFilterInputInstance===document.activeElement&&u._ValueFilterInputInstance.blur(),"function"==typeof n)return n()},ReactFocusFilterInput(){o.LCHOptionMode!==gt.LCHLauncherModePipe()&&setTimeout((function(){u._ValueFilterInputInstance.focus();}),20);},ReactScrollSelectedItemIntoView(){if(ne())return;let e=document.querySelector(".OLSKResultsListItemSelected");e&&e.scrollIntoView({block:"nearest",inline:"nearest"});},async SetupEverything(){u.SetupSharedRecipes(),await u.SetupPageRecipes(),u.SetupSharedAPI(),u.SetupTasks(),u.SetupPromptObjects();},SetupSharedRecipes(){r(1,u._ValueSharedRecipes=St().map((function(e){return Object.assign(e,{LCHRecipeName:e.LCHRecipeName||i("LCHStandardRecipeNames")[e.LCHRecipeSignature]})})).concat(Rt.LCHRuntimeFilteredRecipes(o.LCHOptionRecipes,window.location.href)),u);},async SetupPageRecipes(){if(!o.LCHOptionIncludePageRecipes)return;let e=window.LCHPageRecipes;e||(e=(window.wrappedJSObject||{}).LCHPageRecipes),!e&&window.location.origin&&"null"!==window.location.origin&&await new Promise((function(t,r){window.addEventListener("message",(function r(o){if(o.source!==window&&!ne())return console.log("not window");"LCHPageRecipes"!==o.data&&Array.isArray(o.data)&&(window.removeEventListener("message",r),e=o.data.filter((function(e){return !Rt.LCHRecipeProxyModelErrorsFor(e)})).map((function(e){return {LCHRecipeName:e.LCHRecipeProxyName,LCHRecipeSignature:e.LCHRecipeProxySignature,LCHRecipeCallback(){window.postMessage(e.LCHRecipeProxySignature,window.location.origin);}}})),t());}),!1),window.postMessage("LCHPageRecipes",window.location.origin),setTimeout(t,20);})),Array.isArray(e)&&u._ValueSharedRecipes.push(...Array.from(e).map((function(e){return delete e.LCHRecipeURLFilter,delete e.LCHRecipeIsAutomatic,e._LCHRecipeSource=window.location.host,e})).filter((function(e){return !Rt.LCHRecipesModelErrorsFor(e)})));},SetupSharedAPI(){r(1,u._ValueSharedAPI=ae.LCHRuntimeAPI(u._ValueSharedRecipes),u);},SetupTasks(){o.LCHOptionRunAutomaticRecipes&&Rt.LCHAPIRunTasks(u._ValueSharedRecipes,window.location.href);},SetupPromptObjects(){if(r(1,u._ValueAllPromptRecipes=gt.LCHLauncherUIRecipesForMode(u._ValueSharedRecipes,o.LCHOptionMode),u),o.LCHOptionMode===gt.LCHLauncherModePipe()){r(1,u._ValueTypeEquivalenceMap=Rt.LCHAPITypeEquivalenceMapForRecipes(u._ValueSharedRecipes),u);const e=Rt.LCHAPITypeNameMap(u._ValueSharedRecipes);r(1,u._ValueAllSubjects=u._ValueAllPromptRecipes.filter((function(e){return !!Rt.LCHRecipesModelIsSubject(e)||!!Rt.LCHRecipesModelIsCommand(e)})).filter((function(e){return !e.LCHRecipeOutputType||Object.keys(u._ValueTypeEquivalenceMap).includes(e.LCHRecipeOutputType)})).map((function(t){return Object.assign(t,{_LCHRecipeOutputTypeName:e[t.LCHRecipeOutputType]})})),u),r(1,u._ValueAllActions=u._ValueAllPromptRecipes.filter(Rt.LCHRecipesModelIsAction),u);const t=Object.keys(u._ValueTypeEquivalenceMap).filter((function(e){return u._ValueAllActions.filter((function(t){return ae.LCHRuntimeInputTypes(t.LCHRecipeInputTypes).shift()===e})).length}));return u._ValuePromptObjects.push({LCHPromptClass:"LCHLauncherSubjectPrompt",LCHPromptHeading:i("LCHLauncherSubjectPromptHeadingText"),LCHPromptItemsVisible:[],LCHPromptItemsAll:u._ValueAllSubjects.filter((function(e){return !e.LCHRecipeOutputType||t.includes(e.LCHRecipeOutputType)})),LCHPromptInputThrottle:void 0,LCHPromptFilterText:"",LCHPromptMatchStop:!1,LCHPromptResultsThrottle:void 0,LCHPromptDotModeText:"",LCHPromptIsVisible:!0},{LCHPromptClass:"LCHLauncherActionPrompt",LCHPromptHeading:i("LCHLauncherActionPromptHeadingText"),LCHPromptItemsVisible:[],LCHPromptItemsAll:[],LCHPromptInputThrottle:void 0,LCHPromptFilterText:"",LCHPromptMatchStop:!1,LCHPromptResultsThrottle:void 0,LCHPromptIsVisible:!0},{LCHPromptClass:"LCHLauncherObjectPrompt",LCHPromptHeading:i("LCHLauncherObjectPromptHeadingText"),LCHPromptItemsVisible:[],LCHPromptItemsAll:[],LCHPromptInputThrottle:void 0,LCHPromptFilterText:"",LCHPromptMatchStop:!1,LCHPromptResultsThrottle:void 0,LCHPromptDotModeText:"",LCHPromptIsVisible:!1})}u._ValuePromptObjects.push({LCHPromptClass:"LCHLauncherFilterPrompt",LCHPromptItemsVisible:[],LCHPromptItemsAll:u._ValueAllPromptRecipes,LCHPromptFilterText:"",LCHPromptResultsThrottle:!1,LCHPromptIsVisible:!0}),o.LCHOptionMode===gt.LCHLauncherModePreview()&&(r(1,u._ValuePromptObjects[0].LCHPromptItemsVisible=u._ValuePromptObjects[0].LCHPromptItemsAll,u),r(1,u._ValuePromptObjects[0].LCHPromptItemSelected=u._ValuePromptObjects[0].LCHPromptItemsAll.filter((function(e){return e._LCHRecipeIsSelected})).shift(),u));},LifecycleModuleWillMount(){u.SetupEverything();},LifecycleModuleDidMount(){setTimeout((function(){r(1,u._ValueComponentDidMount=!0,u);}),100);},LifecycleModuleDidUpdate(){u.ReactScrollSelectedItemIntoView();}};var p;u.LifecycleModuleWillMount(),O(u.LifecycleModuleDidMount),p=u.LifecycleModuleDidUpdate,T().$$.after_update.push(p);return e.$set=e=>{"LRTOptions"in e&&r(0,o=e.LRTOptions),"LRTDidFinish"in e&&r(5,n=e.LRTDidFinish);},[o,u,i,a,c,n,function(){u._ValuePromptObjects[0].LCHPromptFilterText=this.value,r(1,u);},function(e){w[e?"unshift":"push"](()=>{u._ValueFilterInputInstance=e,r(1,u);});},()=>a(u._ValueFilterInputInstance.value),function(e,t){e[t].LCHPromptDotModeText=this.value,r(1,u);},e=>c(e.detail),e=>c(e.detail)||u.ControlTerminate(),e=>u.interfaceDidClickPrompt(e),function(e){w[e?"unshift":"push"](()=>{u._ValueRootElementInstance=e,r(1,u);});}]}return class extends X{constructor(e){super(),Y(this,e,mr,Lr,a,{LRTOptions:0,LRTDidFinish:5});}}}));

	});

	var Main = unwrapExports(uiBehaviour);

	mod$4._ValueClass = Main;

	var rollupStart = LCHPackage();

	return rollupStart;

}());
//# sourceMappingURL=launchlet.js.map
