var Launchlet = (function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
	}

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var main = createCommonjsModule(function (module, exports) {
	const _require = commonjsRequire;

	const mod = {

		OLSKSpecUIArguments (inputData) {
			if (!Array.isArray(inputData)) {
				throw new Error('OLSKErrorInputNotValid');
			}

			return inputData.map(function (e) {
				if (e.match(/^match=/)) {
					return e.replace(/^match=/, '-os-match=');
				}

				if (e.match(/^skip=/)) {
					return e.replace(/^skip=/, '-os-skip=');
				}

				return e;
			});
		},

		OLSKSpecUITestPaths (inputData) {
			if (typeof inputData !== 'string') {
				throw new Error('OLSKErrorInputNotValid');
			}

			if (!_require().OLSKDiskIsRealFolderPath(inputData)) {
				throw new Error('OLSKErrorInputNotValid');
			}

			return _require().sync('**/ui-test-*.js', {
				cwd: inputData,
				realpath: true,
			}).filter(function (e) {
				return !e.match(_require().OLSKDiskStandardIgnorePattern());
			});
		},

		OLSKSpecUISourcePaths (inputData) {
			if (typeof inputData !== 'string') {
				throw new Error('OLSKErrorInputNotValid');
			}

			if (!_require().OLSKDiskIsRealFolderPath(inputData)) {
				throw new Error('OLSKErrorInputNotValid');
			}

			return _require().sync('**/+(ui-behaviour.js|*.ejs|*.md|*.html)', {
				cwd: inputData,
				realpath: true,
			}).filter(function (e) {
				if (e.match('__compiled')) {
					return true;
				}
				
				return !e.match(_require().OLSKDiskStandardIgnorePattern());
			});
		},

		OLSKSpecMochaPaths (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('OLSKErrorInputNotValid');
			}

			if (typeof inputData.ParamPackageDirectory !== 'string') {
				throw new Error('OLSKErrorInputNotValid');
			}

			if (typeof inputData.ParamWorkingDirectory !== 'string') {
				throw new Error('OLSKErrorInputNotValid');
			}

			return [
				_require().join(inputData.ParamPackageDirectory, './node_modules/.bin/mocha'),
				_require().join(inputData.ParamPackageDirectory, '../.bin/mocha'),
				_require().join(inputData.ParamWorkingDirectory, './node_modules/.bin/mocha'),
				];
		},

		_OLSKSpecMochaReplaceES6Import (inputData) {
			const exportable = [];
			
			inputData = inputData
				.replace(/^import \* as (\w+) from ['"]([^'"]+)['"];?/gm, 'var $1 = require("$2");')
				// .replace(/^import (\w+) from ['"]([^'"]+)['"];?/gm, 'var {default: $1} = require("$2");')
				.replace(/^import (\w+) from ['"]([^'"]+)['"];?/gm, 'var _$1 = require("$2"); const $1 = _$1.default || _$1')
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
		},
		
	};

	Object.assign(exports, mod);

	{
		exports.OLSK_SPEC_UI = function () {
			if (typeof navigator === 'undefined') {
				return false;
			}

			if (typeof window !== 'undefined' && window.location.hostname === 'loc.tests') {
				return true;
			}

			return navigator.appName === 'Zombie';
		};
	}
	});
	var main_1 = main.OLSK_SPEC_UI;

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

		LCHFormulaErrors (inputData, options = {}) {
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
			if (mod.LCHFormulaErrors(inputData)) {
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
				return 'https://example.com?q=LCHSEARCHTOKEN';
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
	 * Attempts to encode a given input.
	 *
	 * @param {String} input The string that needs to be encoded.
	 * @returns {String|Null} The encoded string.
	 * @api private
	 */
	function encode(input) {
	  try {
	    return encodeURIComponent(input);
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
	  var parser = /([^=?#&]+)=?([^&]*)/g
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

	      key = encode(key);
	      value = encode(value);

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

	var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:[\\/]+/
	  , protocolre = /^([a-z][a-z0-9.+-]*:)?([\\/]{1,})?([\S\s]*)/i
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

	  var match = protocolre.exec(address)
	    , protocol = match[1] ? match[1].toLowerCase() : ''
	    , slashes = !!(match[2] && match[2].length >= 2)
	    , rest =  match[2] && match[2].length === 1 ? '/' + match[3] : match[3];

	  return {
	    protocol: protocol,
	    slashes: slashes,
	    rest: rest
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
	  // Default to a / for pathname if none exists. This normalizes the URL
	  // to always have a /
	  //
	  if (url.pathname.charAt(0) !== '/' && url.hostname) {
	    url.pathname = '/' + url.pathname;
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
		return 'https://example.com';
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
		return 'https://example.com?q=LCHSEARCHTOKEN';
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
		// if (LCHRecipesErrors(inputData)) {
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

	const LCHReadTextFileCallback = async function(inputData = {}) {
		return new Promise(function (res, rej) {
			return Object.assign(document.createElement('input'), inputData, {
				type: 'file',
				onchange (event) {
					return Object.assign(new FileReader(), {
						onload (event) {
							return res(event.target.result);
						},
					}).readAsText(event.target.files[0]);
				},
			}).click();
		});
	};

	const LCHReadTextFileRecipe = function() {
		return {
			LCHRecipeSignature: 'LCHReadTextFile',
			LCHRecipeCallback: LCHReadTextFileCallback,
		};
	};

	var LCHReadTextFile = /*#__PURE__*/Object.freeze({
		LCHReadTextFileCallback: LCHReadTextFileCallback,
		LCHReadTextFileRecipe: LCHReadTextFileRecipe
	});

	const LCHReadTextFileObjectsCallback = async function(inputData = {}) {
		return new Promise(function (res, rej) {
			return Object.assign(document.createElement('input'), inputData, {
				type: 'file',
				onchange (event) {
					return res(Promise.all([...event.target.files].map(function (e) {
						return new Promise(function (res, rej) {
							return Object.assign(new FileReader(), {
								onload (event) {
									return res(Object.assign(e, {
										_LCHReadTextFileObjectContent: event.target.result,
									}));
								},
							}).readAsText(e);
						});
					})));
				},
			}).click();
		});
	};

	const LCHReadTextFileObjectsRecipe = function() {
		return {
			LCHRecipeSignature: 'LCHReadTextFileObjects',
			LCHRecipeCallback: LCHReadTextFileObjectsCallback,
		};
	};

	var LCHReadTextFileObjects = /*#__PURE__*/Object.freeze({
		LCHReadTextFileObjectsCallback: LCHReadTextFileObjectsCallback,
		LCHReadTextFileObjectsRecipe: LCHReadTextFileObjectsRecipe
	});

	var FileSaver_min = createCommonjsModule(function (module, exports) {
	(function(a,b){b();})(commonjsGlobal,function(){function b(a,b){return "undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c);},d.onerror=function(){console.error("could not download file");},d.send();}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send();}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"));}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b);}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof commonjsGlobal&&commonjsGlobal.global===commonjsGlobal?commonjsGlobal:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href);},4E4),setTimeout(function(){e(j);},0));}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i);});}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null;},k.readAsDataURL(b);}else{var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m);},4E4);}});f.saveAs=g.saveAs=g,(module.exports=g);});


	});

	const LCHSaveFileCallback = function(param1, param2) {
		if (typeof param1 !== 'string') {
			throw new Error('LCHErrorInputNotValid');
		}

		if (typeof param2 !== 'string') {
			throw new Error('LCHErrorInputNotValid');
		}

		if (!param2.trim()) {
			throw new Error('LCHErrorInputNotValid');
		}

		return FileSaver_min.saveAs(new Blob([param1], {type: 'text/plain;charset=utf-8'}), param2);
	};

	const LCHSaveFileRecipe = function() {
		return {
			LCHRecipeSignature: 'LCHSaveFile',
			LCHRecipeCallback: LCHSaveFileCallback,
		};
	};

	var LCHSaveFile = /*#__PURE__*/Object.freeze({
		LCHSaveFileCallback: LCHSaveFileCallback,
		LCHSaveFileRecipe: LCHSaveFileRecipe
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
			return param1.apply(param2, [...arguments].reverse());
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
			LCHReadTextFile,
			LCHReadTextFileObjects,
			LCHSaveFile,

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

		LCHRecipesErrors (inputData, options = {}) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('LCHErrorInputNotValid');
			}

			const errors = mod.LCHFormulaTo(mod.LCHFormulaErrors(mod.LCHFormulaFrom(inputData)) || {}, 'LCHRecipe');

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

		LCHRecipesIsCommand (inputData) {
			if (mod$2.LCHRecipesErrors(inputData)) {
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

		LCHRecipesIsSubject (inputData) {
			if (mod$2.LCHRecipesErrors(inputData)) {
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

		LCHRecipesIsAction (inputData) {
			if (mod$2.LCHRecipesErrors(inputData)) {
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

		LCHRecipesIsType (inputData) {
			if (mod$2.LCHRecipesErrors(inputData)) {
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

		LCHRecipesIsTask (inputData) {
			if (mod$2.LCHRecipesErrors(inputData)) {
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

		LCHRecipesActionTakesObject (inputData) {
			if (mod$2.LCHRecipesErrors(inputData)) {
				throw new Error('LCHErrorInputNotValid');
			}

			if (!mod$2.LCHRecipesIsAction(inputData)) {
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

		LCHRecipesActionTakesParams (inputData) {
			if (mod$2.LCHRecipesErrors(inputData)) {
				throw new Error('LCHErrorInputNotValid');
			}

			if (!mod$2.LCHRecipesIsAction(inputData)) {
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
				if (mod$2.LCHRecipesErrors(e)) {
					return false;
				}

				if (!mod$2.LCHRecipesIsType(e)) {
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
				if (mod$2.LCHRecipesErrors(e)) {
					return false;
				}

				return mod$2.LCHRecipesIsType(e);
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
				if (mod$2.LCHRecipesErrors(e)) {
					return false;
				}

				if (!mod$2.LCHRecipesIsAction(e)) {
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
				if (mod$2.LCHRecipesErrors(e)) {
					return false;
				}

				if (!mod$2.LCHRecipesIsSubject(e)) {
					return false;
				}

				if (e.LCHRecipeOutputType !== param1) {
					return false;
				}

				return true;
			});
		},

		LCHCompositionErrors (inputData) {
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

			if (!mod$2.LCHRecipesIsAction(inputData.LCHCompositionAction)) {
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
			} else if (inputData.LCHCompositionAction.LCHRecipeInputTypes === 'Command' && mod$2.LCHRecipesIsCommand(inputData.LCHCompositionSubjectPrimary)) ;

			// if (!mod.LCHRecipesIsSubject(inputData.LCHCompositionSubjectPrimary)) {
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
				if (!mod$2.LCHRecipesIsSubject(inputData.LCHCompositionSubjectSecondary)) {
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
			if (mod$2.LCHCompositionErrors(inputData)) {
				throw new Error('LCHErrorInputNotValid');
			}

			if (typeof api.fn !== 'function') {
				throw new Error('LCHErrorInputNotValid');
			}

			return mod$2.LCHAPIExecuteRecipe(inputData.LCHCompositionAction, [
				await mod$2.LCHAPIExecuteRecipe(inputData.LCHCompositionSubjectPrimary, [], api),
			].concat(inputData.LCHCompositionSubjectSecondary ? [
				await mod$2.LCHAPIExecuteRecipe(inputData.LCHCompositionSubjectSecondary, [], api),
			] : []), api);
		},

		async LCHAPIExecuteRecipe (param1, param2 = [], param3 = {}) {
			if (mod$2.LCHRecipesErrors(param1)) {
				throw new Error('LCHErrorInputNotValid');
			}

			if (!Array.isArray(param2)) {
				throw new Error('LCHErrorInputNotValid');
			}

			if (typeof param3.fn !== 'function') {
				throw new Error('LCHErrorInputNotValid');
			}

			if (param1.LCHRecipeStyle && typeof document !== 'undefined') {
				document.body.appendChild(document.createElement('style')).innerHTML = param1.LCHRecipeStyle;
			}

			return Promise.resolve(param1.LCHRecipeCallback.apply({
				api: param3,
			}, param2.length ? param2 : undefined)); // #mysterious Firefox throws `Permission denied to access property "length"` if array is empty
		},

		LCHComponentDescriptorsErrors (inputData) {
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
				throw new Error('LCHErrorInputNotValid');
			}

			if (typeof param2 !== 'string') {
				throw new Error('LCHErrorInputNotValid');
			}

			return param1.filter(function (e) {
				if (mod$2.LCHRecipesErrors(e)) {
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
				throw new Error('LCHErrorInputNotValid');
			}

			return inputData.filter(function (e) {
				if (!mod$2.LCHRecipesIsTask(e)) {
					return false;
				}

				if (e.LCHRecipeIsExcluded) {
					return !e.LCHRecipeIsExcluded();
				}

				return true;
			});
		},

		LCHAPIRunTasks  () {
			const inputData = mod$2.LCHRuntimeFilteredRecipes.apply(null, [...arguments]);
			const api = mod$1.LCHRuntimeAPI(LCHLauncherStandardRecipes().concat(inputData));

			return Promise.all(mod$2.LCHRuntimeFilteredTasks(inputData).map(function (e) {
				return mod$2.LCHAPIExecuteRecipe(e, [], api);
			}));
		},

		LCHRecipeProxyErrors (inputData, options = {}) {
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
				const errors = mod$2.LCHRecipesErrors(e);

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
					return mod$2.LCHRecipesIsCommand(e);
					// if (LCHLauncherAPI.LCHRecipesIsCommand(e)) {
					// 	return true;
					// };

					// if (!LCHLauncherAPI.LCHRecipesIsAction(e)) {
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
					return mod$2.LCHRecipesIsCommand(e);
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

		LCHLauncherThrottleDuration: main_1() ? 25 : 1000,

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

				if (mod$2.LCHRecipesErrors(e)) {
					return false;
				}
				if (!mod$2.LCHRecipesIsSubject(e)) {
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
	(function (global, factory) {
	     module.exports = factory() ;
	}(commonjsGlobal, function () {
	    function noop() { }
	    function assign(tar, src) {
	        // @ts-ignore
	        for (const k in src)
	            tar[k] = src[k];
	        return tar;
	    }
	    function add_location(element, file, line, column, char) {
	        element.__svelte_meta = {
	            loc: { file, line, column, char }
	        };
	    }
	    function run(fn) {
	        return fn();
	    }
	    function blank_object() {
	        return Object.create(null);
	    }
	    function run_all(fns) {
	        fns.forEach(run);
	    }
	    function is_function(thing) {
	        return typeof thing === 'function';
	    }
	    function safe_not_equal(a, b) {
	        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
	    }
	    function is_empty(obj) {
	        return Object.keys(obj).length === 0;
	    }
	    function create_slot(definition, ctx, $$scope, fn) {
	        if (definition) {
	            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
	            return definition[0](slot_ctx);
	        }
	    }
	    function get_slot_context(definition, ctx, $$scope, fn) {
	        return definition[1] && fn
	            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
	            : $$scope.ctx;
	    }
	    function get_slot_changes(definition, $$scope, dirty, fn) {
	        if (definition[2] && fn) {
	            const lets = definition[2](fn(dirty));
	            if ($$scope.dirty === undefined) {
	                return lets;
	            }
	            if (typeof lets === 'object') {
	                const merged = [];
	                const len = Math.max($$scope.dirty.length, lets.length);
	                for (let i = 0; i < len; i += 1) {
	                    merged[i] = $$scope.dirty[i] | lets[i];
	                }
	                return merged;
	            }
	            return $$scope.dirty | lets;
	        }
	        return $$scope.dirty;
	    }
	    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
	        const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
	        if (slot_changes) {
	            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
	            slot.p(slot_context, slot_changes);
	        }
	    }
	    function null_to_empty(value) {
	        return value == null ? '' : value;
	    }

	    function append(target, node) {
	        target.appendChild(node);
	    }
	    function insert(target, node, anchor) {
	        target.insertBefore(node, anchor || null);
	    }
	    function detach(node) {
	        node.parentNode.removeChild(node);
	    }
	    function destroy_each(iterations, detaching) {
	        for (let i = 0; i < iterations.length; i += 1) {
	            if (iterations[i])
	                iterations[i].d(detaching);
	        }
	    }
	    function element(name) {
	        return document.createElement(name);
	    }
	    function text(data) {
	        return document.createTextNode(data);
	    }
	    function space() {
	        return text(' ');
	    }
	    function empty() {
	        return text('');
	    }
	    function listen(node, event, handler, options) {
	        node.addEventListener(event, handler, options);
	        return () => node.removeEventListener(event, handler, options);
	    }
	    function attr(node, attribute, value) {
	        if (value == null)
	            node.removeAttribute(attribute);
	        else if (node.getAttribute(attribute) !== value)
	            node.setAttribute(attribute, value);
	    }
	    function children(element) {
	        return Array.from(element.childNodes);
	    }
	    function set_input_value(input, value) {
	        input.value = value == null ? '' : value;
	    }
	    function toggle_class(element, name, toggle) {
	        element.classList[toggle ? 'add' : 'remove'](name);
	    }
	    function custom_event(type, detail) {
	        const e = document.createEvent('CustomEvent');
	        e.initCustomEvent(type, false, false, detail);
	        return e;
	    }

	    let current_component;
	    function set_current_component(component) {
	        current_component = component;
	    }
	    function get_current_component() {
	        if (!current_component)
	            throw new Error('Function called outside component initialization');
	        return current_component;
	    }
	    function onMount(fn) {
	        get_current_component().$$.on_mount.push(fn);
	    }
	    function afterUpdate(fn) {
	        get_current_component().$$.after_update.push(fn);
	    }
	    function createEventDispatcher() {
	        const component = get_current_component();
	        return (type, detail) => {
	            const callbacks = component.$$.callbacks[type];
	            if (callbacks) {
	                // TODO are there situations where events could be dispatched
	                // in a server (non-DOM) environment?
	                const event = custom_event(type, detail);
	                callbacks.slice().forEach(fn => {
	                    fn.call(component, event);
	                });
	            }
	        };
	    }

	    const dirty_components = [];
	    const binding_callbacks = [];
	    const render_callbacks = [];
	    const flush_callbacks = [];
	    const resolved_promise = Promise.resolve();
	    let update_scheduled = false;
	    function schedule_update() {
	        if (!update_scheduled) {
	            update_scheduled = true;
	            resolved_promise.then(flush);
	        }
	    }
	    function add_render_callback(fn) {
	        render_callbacks.push(fn);
	    }
	    let flushing = false;
	    const seen_callbacks = new Set();
	    function flush() {
	        if (flushing)
	            return;
	        flushing = true;
	        do {
	            // first, call beforeUpdate functions
	            // and update components
	            for (let i = 0; i < dirty_components.length; i += 1) {
	                const component = dirty_components[i];
	                set_current_component(component);
	                update(component.$$);
	            }
	            set_current_component(null);
	            dirty_components.length = 0;
	            while (binding_callbacks.length)
	                binding_callbacks.pop()();
	            // then, once components are updated, call
	            // afterUpdate functions. This may cause
	            // subsequent updates...
	            for (let i = 0; i < render_callbacks.length; i += 1) {
	                const callback = render_callbacks[i];
	                if (!seen_callbacks.has(callback)) {
	                    // ...so guard against infinite loops
	                    seen_callbacks.add(callback);
	                    callback();
	                }
	            }
	            render_callbacks.length = 0;
	        } while (dirty_components.length);
	        while (flush_callbacks.length) {
	            flush_callbacks.pop()();
	        }
	        update_scheduled = false;
	        flushing = false;
	        seen_callbacks.clear();
	    }
	    function update($$) {
	        if ($$.fragment !== null) {
	            $$.update();
	            run_all($$.before_update);
	            const dirty = $$.dirty;
	            $$.dirty = [-1];
	            $$.fragment && $$.fragment.p($$.ctx, dirty);
	            $$.after_update.forEach(add_render_callback);
	        }
	    }
	    const outroing = new Set();
	    let outros;
	    function group_outros() {
	        outros = {
	            r: 0,
	            c: [],
	            p: outros // parent group
	        };
	    }
	    function check_outros() {
	        if (!outros.r) {
	            run_all(outros.c);
	        }
	        outros = outros.p;
	    }
	    function transition_in(block, local) {
	        if (block && block.i) {
	            outroing.delete(block);
	            block.i(local);
	        }
	    }
	    function transition_out(block, local, detach, callback) {
	        if (block && block.o) {
	            if (outroing.has(block))
	                return;
	            outroing.add(block);
	            outros.c.push(() => {
	                outroing.delete(block);
	                if (callback) {
	                    if (detach)
	                        block.d(1);
	                    callback();
	                }
	            });
	            block.o(local);
	        }
	    }

	    const globals = (typeof window !== 'undefined'
	        ? window
	        : typeof globalThis !== 'undefined'
	            ? globalThis
	            : commonjsGlobal);

	    function get_spread_update(levels, updates) {
	        const update = {};
	        const to_null_out = {};
	        const accounted_for = { $$scope: 1 };
	        let i = levels.length;
	        while (i--) {
	            const o = levels[i];
	            const n = updates[i];
	            if (n) {
	                for (const key in o) {
	                    if (!(key in n))
	                        to_null_out[key] = 1;
	                }
	                for (const key in n) {
	                    if (!accounted_for[key]) {
	                        update[key] = n[key];
	                        accounted_for[key] = 1;
	                    }
	                }
	                levels[i] = n;
	            }
	            else {
	                for (const key in o) {
	                    accounted_for[key] = 1;
	                }
	            }
	        }
	        for (const key in to_null_out) {
	            if (!(key in update))
	                update[key] = undefined;
	        }
	        return update;
	    }
	    function get_spread_object(spread_props) {
	        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
	    }
	    function create_component(block) {
	        block && block.c();
	    }
	    function mount_component(component, target, anchor, customElement) {
	        const { fragment, on_mount, on_destroy, after_update } = component.$$;
	        fragment && fragment.m(target, anchor);
	        if (!customElement) {
	            // onMount happens before the initial afterUpdate
	            add_render_callback(() => {
	                const new_on_destroy = on_mount.map(run).filter(is_function);
	                if (on_destroy) {
	                    on_destroy.push(...new_on_destroy);
	                }
	                else {
	                    // Edge case - component was destroyed immediately,
	                    // most likely as a result of a binding initialising
	                    run_all(new_on_destroy);
	                }
	                component.$$.on_mount = [];
	            });
	        }
	        after_update.forEach(add_render_callback);
	    }
	    function destroy_component(component, detaching) {
	        const $$ = component.$$;
	        if ($$.fragment !== null) {
	            run_all($$.on_destroy);
	            $$.fragment && $$.fragment.d(detaching);
	            // TODO null out other refs, including component.$$ (but need to
	            // preserve final state?)
	            $$.on_destroy = $$.fragment = null;
	            $$.ctx = [];
	        }
	    }
	    function make_dirty(component, i) {
	        if (component.$$.dirty[0] === -1) {
	            dirty_components.push(component);
	            schedule_update();
	            component.$$.dirty.fill(0);
	        }
	        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
	    }
	    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
	        const parent_component = current_component;
	        set_current_component(component);
	        const $$ = component.$$ = {
	            fragment: null,
	            ctx: null,
	            // state
	            props,
	            update: noop,
	            not_equal,
	            bound: blank_object(),
	            // lifecycle
	            on_mount: [],
	            on_destroy: [],
	            on_disconnect: [],
	            before_update: [],
	            after_update: [],
	            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
	            // everything else
	            callbacks: blank_object(),
	            dirty,
	            skip_bound: false
	        };
	        let ready = false;
	        $$.ctx = instance
	            ? instance(component, options.props || {}, (i, ret, ...rest) => {
	                const value = rest.length ? rest[0] : ret;
	                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
	                    if (!$$.skip_bound && $$.bound[i])
	                        $$.bound[i](value);
	                    if (ready)
	                        make_dirty(component, i);
	                }
	                return ret;
	            })
	            : [];
	        $$.update();
	        ready = true;
	        run_all($$.before_update);
	        // `false` as a special case of no DOM component
	        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
	        if (options.target) {
	            if (options.hydrate) {
	                const nodes = children(options.target);
	                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	                $$.fragment && $$.fragment.l(nodes);
	                nodes.forEach(detach);
	            }
	            else {
	                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	                $$.fragment && $$.fragment.c();
	            }
	            if (options.intro)
	                transition_in(component.$$.fragment);
	            mount_component(component, options.target, options.anchor, options.customElement);
	            flush();
	        }
	        set_current_component(parent_component);
	    }
	    /**
	     * Base class for Svelte components. Used when dev=false.
	     */
	    class SvelteComponent {
	        $destroy() {
	            destroy_component(this, 1);
	            this.$destroy = noop;
	        }
	        $on(type, callback) {
	            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
	            callbacks.push(callback);
	            return () => {
	                const index = callbacks.indexOf(callback);
	                if (index !== -1)
	                    callbacks.splice(index, 1);
	            };
	        }
	        $set($$props) {
	            if (this.$$set && !is_empty($$props)) {
	                this.$$.skip_bound = true;
	                this.$$set($$props);
	                this.$$.skip_bound = false;
	            }
	        }
	    }

	    function dispatch_dev(type, detail) {
	        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.38.2' }, detail)));
	    }
	    function append_dev(target, node) {
	        dispatch_dev('SvelteDOMInsert', { target, node });
	        append(target, node);
	    }
	    function insert_dev(target, node, anchor) {
	        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
	        insert(target, node, anchor);
	    }
	    function detach_dev(node) {
	        dispatch_dev('SvelteDOMRemove', { node });
	        detach(node);
	    }
	    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
	        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
	        if (has_prevent_default)
	            modifiers.push('preventDefault');
	        if (has_stop_propagation)
	            modifiers.push('stopPropagation');
	        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
	        const dispose = listen(node, event, handler, options);
	        return () => {
	            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
	            dispose();
	        };
	    }
	    function attr_dev(node, attribute, value) {
	        attr(node, attribute, value);
	        if (value == null)
	            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
	        else
	            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
	    }
	    function set_data_dev(text, data) {
	        data = '' + data;
	        if (text.wholeText === data)
	            return;
	        dispatch_dev('SvelteDOMSetData', { node: text, data });
	        text.data = data;
	    }
	    function validate_each_argument(arg) {
	        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
	            let msg = '{#each} only iterates over array-like objects.';
	            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
	                msg += ' You can use a spread to convert this iterable into an array.';
	            }
	            throw new Error(msg);
	        }
	    }
	    function validate_slots(name, slot, keys) {
	        for (const slot_key of Object.keys(slot)) {
	            if (!~keys.indexOf(slot_key)) {
	                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
	            }
	        }
	    }
	    /**
	     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
	     */
	    class SvelteComponentDev extends SvelteComponent {
	        constructor(options) {
	            if (!options || (!options.target && !options.$$inline)) {
	                throw new Error("'target' is a required option");
	            }
	            super();
	        }
	        $destroy() {
	            super.$destroy();
	            this.$destroy = () => {
	                console.warn('Component was already destroyed'); // eslint-disable-line no-console
	            };
	        }
	        $capture_state() { }
	        $inject_state() { }
	    }

	    var commonjsGlobal$1 = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof self !== 'undefined' ? self : {};

	    function commonjsRequire () {
	    	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
	    }

	    function unwrapExports (x) {
	    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	    }

	    function createCommonjsModule(fn, module) {
	    	return module = { exports: {} }, fn(module, module.exports), module.exports;
	    }

	    var main = createCommonjsModule(function (module, exports) {
	    const _require = commonjsRequire;

	    const mod = {

	    	OLSKSpecUIArguments (inputData) {
	    		if (!Array.isArray(inputData)) {
	    			throw new Error('OLSKErrorInputNotValid');
	    		}

	    		return inputData.map(function (e) {
	    			if (e.match(/^match=/)) {
	    				return e.replace(/^match=/, '-os-match=');
	    			}

	    			if (e.match(/^skip=/)) {
	    				return e.replace(/^skip=/, '-os-skip=');
	    			}

	    			return e;
	    		});
	    	},

	    	OLSKSpecUITestPaths (inputData) {
	    		if (typeof inputData !== 'string') {
	    			throw new Error('OLSKErrorInputNotValid');
	    		}

	    		if (!_require().OLSKDiskIsRealFolderPath(inputData)) {
	    			throw new Error('OLSKErrorInputNotValid');
	    		}

	    		return _require().sync('**/ui-test-*.js', {
	    			cwd: inputData,
	    			realpath: true,
	    		}).filter(function (e) {
	    			return !e.match(_require().OLSKDiskStandardIgnorePattern());
	    		});
	    	},

	    	OLSKSpecUISourcePaths (inputData) {
	    		if (typeof inputData !== 'string') {
	    			throw new Error('OLSKErrorInputNotValid');
	    		}

	    		if (!_require().OLSKDiskIsRealFolderPath(inputData)) {
	    			throw new Error('OLSKErrorInputNotValid');
	    		}

	    		return _require().sync('**/+(ui-behaviour.js|*.ejs|*.md|*.html)', {
	    			cwd: inputData,
	    			realpath: true,
	    		}).filter(function (e) {
	    			if (e.match('__compiled')) {
	    				return true;
	    			}
	    			
	    			return !e.match(_require().OLSKDiskStandardIgnorePattern());
	    		});
	    	},

	    	OLSKSpecMochaPaths (inputData) {
	    		if (typeof inputData !== 'object' || inputData === null) {
	    			throw new Error('OLSKErrorInputNotValid');
	    		}

	    		if (typeof inputData.ParamPackageDirectory !== 'string') {
	    			throw new Error('OLSKErrorInputNotValid');
	    		}

	    		if (typeof inputData.ParamWorkingDirectory !== 'string') {
	    			throw new Error('OLSKErrorInputNotValid');
	    		}

	    		return [
	    			_require().join(inputData.ParamPackageDirectory, './node_modules/.bin/mocha'),
	    			_require().join(inputData.ParamPackageDirectory, '../.bin/mocha'),
	    			_require().join(inputData.ParamWorkingDirectory, './node_modules/.bin/mocha'),
	    			];
	    	},

	    	_OLSKSpecMochaReplaceES6Import (inputData) {
	    		const exportable = [];
	    		
	    		inputData = inputData
	    			.replace(/^import \* as (\w+) from ['"]([^'"]+)['"];?/gm, 'var $1 = require("$2");')
	    			// .replace(/^import (\w+) from ['"]([^'"]+)['"];?/gm, 'var {default: $1} = require("$2");')
	    			.replace(/^import (\w+) from ['"]([^'"]+)['"];?/gm, 'var _$1 = require("$2"); const $1 = _$1.default || _$1')
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
	    	},
	    	
	    };

	    Object.assign(exports, mod);

	    {
	    	exports.OLSK_SPEC_UI = function () {
	    		if (typeof navigator === 'undefined') {
	    			return false;
	    		}

	    		if (typeof window !== 'undefined' && window.location.hostname === 'loc.tests') {
	    			return true;
	    		}

	    		return navigator.appName === 'Zombie';
	    	};
	    }
	    });
	    var main_1 = main.OLSK_SPEC_UI;

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

	    	LCHFormulaErrors (inputData, options = {}) {
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
	    		if (mod.LCHFormulaErrors(inputData)) {
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
	    			return 'https://example.com?q=LCHSEARCHTOKEN';
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
	     * Attempts to encode a given input.
	     *
	     * @param {String} input The string that needs to be encoded.
	     * @returns {String|Null} The encoded string.
	     * @api private
	     */
	    function encode(input) {
	      try {
	        return encodeURIComponent(input);
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
	      var parser = /([^=?#&]+)=?([^&]*)/g
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

	          key = encode(key);
	          value = encode(value);

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

	    var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:[\\/]+/
	      , protocolre = /^([a-z][a-z0-9.+-]*:)?([\\/]{1,})?([\S\s]*)/i
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
	      else if (typeof commonjsGlobal$1 !== 'undefined') globalVar = commonjsGlobal$1;
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

	      var match = protocolre.exec(address)
	        , protocol = match[1] ? match[1].toLowerCase() : ''
	        , slashes = !!(match[2] && match[2].length >= 2)
	        , rest =  match[2] && match[2].length === 1 ? '/' + match[3] : match[3];

	      return {
	        protocol: protocol,
	        slashes: slashes,
	        rest: rest
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
	      // Default to a / for pathname if none exists. This normalizes the URL
	      // to always have a /
	      //
	      if (url.pathname.charAt(0) !== '/' && url.hostname) {
	        url.pathname = '/' + url.pathname;
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
	    	return 'https://example.com';
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
	    	return 'https://example.com?q=LCHSEARCHTOKEN';
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
	    	// if (LCHRecipesErrors(inputData)) {
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

	    const LCHReadTextFileCallback = async function(inputData = {}) {
	    	return new Promise(function (res, rej) {
	    		return Object.assign(document.createElement('input'), inputData, {
	    			type: 'file',
	    			onchange (event) {
	    				return Object.assign(new FileReader(), {
	    					onload (event) {
	    						return res(event.target.result);
	    					},
	    				}).readAsText(event.target.files[0]);
	    			},
	    		}).click();
	    	});
	    };

	    const LCHReadTextFileRecipe = function() {
	    	return {
	    		LCHRecipeSignature: 'LCHReadTextFile',
	    		LCHRecipeCallback: LCHReadTextFileCallback,
	    	};
	    };

	    var LCHReadTextFile = /*#__PURE__*/Object.freeze({
	        LCHReadTextFileCallback: LCHReadTextFileCallback,
	        LCHReadTextFileRecipe: LCHReadTextFileRecipe
	    });

	    const LCHReadTextFileObjectsCallback = async function(inputData = {}) {
	    	return new Promise(function (res, rej) {
	    		return Object.assign(document.createElement('input'), inputData, {
	    			type: 'file',
	    			onchange (event) {
	    				return res(Promise.all([...event.target.files].map(function (e) {
	    					return new Promise(function (res, rej) {
	    						return Object.assign(new FileReader(), {
	    							onload (event) {
	    								return res(Object.assign(e, {
	    									_LCHReadTextFileObjectContent: event.target.result,
	    								}));
	    							},
	    						}).readAsText(e);
	    					});
	    				})));
	    			},
	    		}).click();
	    	});
	    };

	    const LCHReadTextFileObjectsRecipe = function() {
	    	return {
	    		LCHRecipeSignature: 'LCHReadTextFileObjects',
	    		LCHRecipeCallback: LCHReadTextFileObjectsCallback,
	    	};
	    };

	    var LCHReadTextFileObjects = /*#__PURE__*/Object.freeze({
	        LCHReadTextFileObjectsCallback: LCHReadTextFileObjectsCallback,
	        LCHReadTextFileObjectsRecipe: LCHReadTextFileObjectsRecipe
	    });

	    var FileSaver_min = createCommonjsModule(function (module, exports) {
	    (function(a,b){b();})(commonjsGlobal$1,function(){function b(a,b){return "undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c);},d.onerror=function(){console.error("could not download file");},d.send();}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send();}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"));}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b);}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof commonjsGlobal$1&&commonjsGlobal$1.global===commonjsGlobal$1?commonjsGlobal$1:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href);},4E4),setTimeout(function(){e(j);},0));}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i);});}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null;},k.readAsDataURL(b);}else{var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m);},4E4);}});f.saveAs=g.saveAs=g,(module.exports=g);});


	    });

	    const LCHSaveFileCallback = function(param1, param2) {
	    	if (typeof param1 !== 'string') {
	    		throw new Error('LCHErrorInputNotValid');
	    	}

	    	if (typeof param2 !== 'string') {
	    		throw new Error('LCHErrorInputNotValid');
	    	}

	    	if (!param2.trim()) {
	    		throw new Error('LCHErrorInputNotValid');
	    	}

	    	return FileSaver_min.saveAs(new Blob([param1], {type: 'text/plain;charset=utf-8'}), param2);
	    };

	    const LCHSaveFileRecipe = function() {
	    	return {
	    		LCHRecipeSignature: 'LCHSaveFile',
	    		LCHRecipeCallback: LCHSaveFileCallback,
	    	};
	    };

	    var LCHSaveFile = /*#__PURE__*/Object.freeze({
	        LCHSaveFileCallback: LCHSaveFileCallback,
	        LCHSaveFileRecipe: LCHSaveFileRecipe
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
	    		return param1.apply(param2, [...arguments].reverse());
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
	    		LCHReadTextFile,
	    		LCHReadTextFileObjects,
	    		LCHSaveFile,

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

	    	LCHRecipesErrors (inputData, options = {}) {
	    		if (typeof inputData !== 'object' || inputData === null) {
	    			throw new Error('LCHErrorInputNotValid');
	    		}

	    		const errors = mod.LCHFormulaTo(mod.LCHFormulaErrors(mod.LCHFormulaFrom(inputData)) || {}, 'LCHRecipe');

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

	    	LCHRecipesIsCommand (inputData) {
	    		if (mod$2.LCHRecipesErrors(inputData)) {
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

	    	LCHRecipesIsSubject (inputData) {
	    		if (mod$2.LCHRecipesErrors(inputData)) {
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

	    	LCHRecipesIsAction (inputData) {
	    		if (mod$2.LCHRecipesErrors(inputData)) {
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

	    	LCHRecipesIsType (inputData) {
	    		if (mod$2.LCHRecipesErrors(inputData)) {
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

	    	LCHRecipesIsTask (inputData) {
	    		if (mod$2.LCHRecipesErrors(inputData)) {
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

	    	LCHRecipesActionTakesObject (inputData) {
	    		if (mod$2.LCHRecipesErrors(inputData)) {
	    			throw new Error('LCHErrorInputNotValid');
	    		}

	    		if (!mod$2.LCHRecipesIsAction(inputData)) {
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

	    	LCHRecipesActionTakesParams (inputData) {
	    		if (mod$2.LCHRecipesErrors(inputData)) {
	    			throw new Error('LCHErrorInputNotValid');
	    		}

	    		if (!mod$2.LCHRecipesIsAction(inputData)) {
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
	    			if (mod$2.LCHRecipesErrors(e)) {
	    				return false;
	    			}

	    			if (!mod$2.LCHRecipesIsType(e)) {
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
	    			if (mod$2.LCHRecipesErrors(e)) {
	    				return false;
	    			}

	    			return mod$2.LCHRecipesIsType(e);
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
	    			if (mod$2.LCHRecipesErrors(e)) {
	    				return false;
	    			}

	    			if (!mod$2.LCHRecipesIsAction(e)) {
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
	    			if (mod$2.LCHRecipesErrors(e)) {
	    				return false;
	    			}

	    			if (!mod$2.LCHRecipesIsSubject(e)) {
	    				return false;
	    			}

	    			if (e.LCHRecipeOutputType !== param1) {
	    				return false;
	    			}

	    			return true;
	    		});
	    	},

	    	LCHCompositionErrors (inputData) {
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

	    		if (!mod$2.LCHRecipesIsAction(inputData.LCHCompositionAction)) {
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
	    		} else if (inputData.LCHCompositionAction.LCHRecipeInputTypes === 'Command' && mod$2.LCHRecipesIsCommand(inputData.LCHCompositionSubjectPrimary)) ;

	    		// if (!mod.LCHRecipesIsSubject(inputData.LCHCompositionSubjectPrimary)) {
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
	    			if (!mod$2.LCHRecipesIsSubject(inputData.LCHCompositionSubjectSecondary)) {
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
	    		if (mod$2.LCHCompositionErrors(inputData)) {
	    			throw new Error('LCHErrorInputNotValid');
	    		}

	    		if (typeof api.fn !== 'function') {
	    			throw new Error('LCHErrorInputNotValid');
	    		}

	    		return mod$2.LCHAPIExecuteRecipe(inputData.LCHCompositionAction, [
	    			await mod$2.LCHAPIExecuteRecipe(inputData.LCHCompositionSubjectPrimary, [], api),
	    		].concat(inputData.LCHCompositionSubjectSecondary ? [
	    			await mod$2.LCHAPIExecuteRecipe(inputData.LCHCompositionSubjectSecondary, [], api),
	    		] : []), api);
	    	},

	    	async LCHAPIExecuteRecipe (param1, param2 = [], param3 = {}) {
	    		if (mod$2.LCHRecipesErrors(param1)) {
	    			throw new Error('LCHErrorInputNotValid');
	    		}

	    		if (!Array.isArray(param2)) {
	    			throw new Error('LCHErrorInputNotValid');
	    		}

	    		if (typeof param3.fn !== 'function') {
	    			throw new Error('LCHErrorInputNotValid');
	    		}

	    		if (param1.LCHRecipeStyle && typeof document !== 'undefined') {
	    			document.body.appendChild(document.createElement('style')).innerHTML = param1.LCHRecipeStyle;
	    		}

	    		return Promise.resolve(param1.LCHRecipeCallback.apply({
	    			api: param3,
	    		}, param2.length ? param2 : undefined)); // #mysterious Firefox throws `Permission denied to access property "length"` if array is empty
	    	},

	    	LCHComponentDescriptorsErrors (inputData) {
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
	    			throw new Error('LCHErrorInputNotValid');
	    		}

	    		if (typeof param2 !== 'string') {
	    			throw new Error('LCHErrorInputNotValid');
	    		}

	    		return param1.filter(function (e) {
	    			if (mod$2.LCHRecipesErrors(e)) {
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
	    			throw new Error('LCHErrorInputNotValid');
	    		}

	    		return inputData.filter(function (e) {
	    			if (!mod$2.LCHRecipesIsTask(e)) {
	    				return false;
	    			}

	    			if (e.LCHRecipeIsExcluded) {
	    				return !e.LCHRecipeIsExcluded();
	    			}

	    			return true;
	    		});
	    	},

	    	LCHAPIRunTasks  () {
	    		const inputData = mod$2.LCHRuntimeFilteredRecipes.apply(null, [...arguments]);
	    		const api = mod$1.LCHRuntimeAPI(LCHLauncherStandardRecipes().concat(inputData));

	    		return Promise.all(mod$2.LCHRuntimeFilteredTasks(inputData).map(function (e) {
	    			return mod$2.LCHAPIExecuteRecipe(e, [], api);
	    		}));
	    	},

	    	LCHRecipeProxyErrors (inputData, options = {}) {
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
	    			const errors = mod$2.LCHRecipesErrors(e);

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
	    				return mod$2.LCHRecipesIsCommand(e);
	    				// if (LCHLauncherAPI.LCHRecipesIsCommand(e)) {
	    				// 	return true;
	    				// };

	    				// if (!LCHLauncherAPI.LCHRecipesIsAction(e)) {
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
	    				return mod$2.LCHRecipesIsCommand(e);
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

	    	LCHLauncherThrottleDuration: main_1() ? 25 : 1000,

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

	    			if (mod$2.LCHRecipesErrors(e)) {
	    				return false;
	    			}
	    			if (!mod$2.LCHRecipesIsSubject(e)) {
	    				return false;
	    			}
	    			return true;
	    		});
	    	},

	    };

	    var main$1 = createCommonjsModule(function (module, exports) {
	    (function(global, factory) {
	    	 factory(exports) ;
	    }(commonjsGlobal$1, (function(exports) {
	    	const mod = {

	    		OLSKInternationalDefaultIdentifier () {
	    			return 'i18n';
	    		},

	    		OLSKInternationalIsTranslationFileBasename (inputData) {
	    			if (typeof inputData !== 'string') {
	    				return false;
	    			}

	    			if (!inputData.split('.').pop().match(/ya?ml/i)) {
	    				return false;
	    			}

	    			if (inputData.split('.').shift() !== mod.OLSKInternationalDefaultIdentifier()) {
	    				return false;
	    			}

	    			if (!mod._OLSKInternationalLanguageID(inputData)) {
	    				return false;
	    			}

	    			return true;
	    		},

	    		OLSKInternationalLanguageID (inputData) {
	    			if (!mod.OLSKInternationalIsTranslationFileBasename(inputData)) {
	    				throw new Error('OLSKErrorInputNotValid');
	    			}

	    			return mod._OLSKInternationalLanguageID(inputData);
	    		},

	    		OLSKInternationalSimplifiedLanguageCode (inputData) {
	    			if (typeof inputData !== 'string') {
	    				throw new Error('OLSKErrorInputNotValid');
	    			}

	    			return inputData.split('-').shift();
	    		},

	    		_OLSKInternationalLanguageID (inputData) {
	    			var elements = inputData.split('.');

	    			elements.pop();
	    			elements.shift();

	    			return elements.pop();
	    		},

	    		OLSKInternationalLocalizedString (translationKey, translationDictionary) {
	    			if (typeof translationDictionary !== 'object' || translationDictionary === null) {
	    				throw new Error('OLSKErrorInputNotValid');
	    			}

	    			var localizedString = translationDictionary[translationKey];

	    			if (!localizedString) {
	    				localizedString = 'TRANSLATION_MISSING';
	    				console.log([
	    					localizedString,
	    					translationKey,
	    					]);
	    			}

	    			return localizedString;
	    		},

	    		OLSKInternationalLocalizedStringCallback (dictionary, fallbackLocales) {
	    			if (typeof dictionary !== 'object' || dictionary === null) {
	    				throw new Error('OLSKErrorInputNotValid');
	    			}

	    			if (!Array.isArray(fallbackLocales)) {
	    				throw new Error('OLSKErrorInputNotValid');
	    			}

	    			const _locales = Object.keys(dictionary).reverse().concat(...fallbackLocales.map(function (e) {
	    					return [mod.OLSKInternationalSimplifiedLanguageCode(e), e]
	    				}).reverse());

	    			return function (signature, requestLocales) {
	    				if (!Array.isArray(requestLocales)) {
	    					throw new Error('OLSKErrorInputNotValid');
	    				}

	    				let locales = _locales.concat(...requestLocales.map(function (e) {
	    					return [mod.OLSKInternationalSimplifiedLanguageCode(e), e]
	    				}).reverse(), []);

	    				let outputData;

	    				while (!outputData && locales.length) {
	    					outputData = (dictionary[locales.pop()] || {})[signature];
	    				}

	    				if (!outputData) {
	    					console.log([outputData = 'TRANSLATION_MISSING', signature].join(' '));
	    				}

	    				return outputData;				
	    			};
	    		},

	    		_OLSKInternationalPaths (cwd, filter) {
	    			if (typeof cwd !== 'string' || !cwd.trim()) {
	    				throw new Error('OLSKErrorInputNotValid');
	    			}

	    			const _require = commonjsRequire;

	    			return _require().sync(`**/*${ mod.OLSKInternationalDefaultIdentifier() }*.y*(a)ml`, {
	    				cwd,
	    				realpath: true,
	    			}).filter(function (e) {
	    				if (!filter) {
	    					return true;
	    				}

	    				return !e.match(filter);
	    			}).filter(function (e) {
	    				return mod.OLSKInternationalIsTranslationFileBasename(_require().basename(e));
	    			});
	    		},

	    		_OLSKInternationalConstructedDictionary (inputData) {
	    			if (!Array.isArray(inputData)) {
	    				throw new Error('OLSKErrorInputNotValid');
	    			}

	    			const _require = commonjsRequire;

	    			return inputData.reduce(function (coll, item) {
	    				const key = mod.OLSKInternationalLanguageID(_require().basename(item));

	    				coll[key] = Object.assign(coll[key] || {}, _require().load(_require().readFileSync(item, 'utf8')));

	    				return coll;
	    			}, {});
	    		},

	    		OLSKInternationalDictionary (cwd) {
	    			return this._OLSKInternationalConstructedDictionary(this._OLSKInternationalPaths(cwd));
	    		},

	    		_OLSKInternationalCompilationObject (cwd, languageID) {
	    			const _require = commonjsRequire;

	    			return this._OLSKInternationalPaths(cwd, /node_modules|__external/).filter(function (e) {
	    				if (!languageID) {
	    					return true;
	    				}

	    				return mod.OLSKInternationalLanguageID(_require().basename(e)) === languageID;
	    			}).reduce(function (coll, item) {
	    				return Object.assign(coll, {
	    					[item]: _require().load(_require().readFileSync(item, 'utf8')),
	    				});
	    			}, {});
	    		},

	    		_OLSKInternationalCompilationFilePath (cwd) {
	    			if (typeof cwd !== 'string' || !cwd.trim()) {
	    				throw new Error('OLSKErrorInputNotValid');
	    			}
	    			const _require = commonjsRequire;

	    			return _require().join(cwd, '__compiled', mod.OLSKInternationalDefaultIdentifier() + '-compilation.yml')
	    		},

	    		_SafeDump (inputData) {
	    			const _require = commonjsRequire;

	    			return _require().safeDump(inputData, {
	    				lineWidth: Infinity,
	    			});
	    		},

	    		OLSKInternationalWriteCompilationFile (cwd, languageID) {
	    			const _require = commonjsRequire;

	    			const data = mod._SafeDump(this._OLSKInternationalCompilationObject(cwd, languageID));

	    			const outputDirectory = _require().dirname(mod._OLSKInternationalCompilationFilePath(cwd));

	    			if (!_require().existsSync(outputDirectory)){
	    				_require().mkdirSync(outputDirectory);
	    			}

	    			_require().writeFileSync(mod._OLSKInternationalCompilationFilePath(cwd), data);
	    		},

	    		OLSKInternationalSpreadCompilationFile (cwd, languageID) {
	    			if (typeof cwd !== 'string' || !cwd.trim()) {
	    				throw new Error('OLSKErrorInputNotValid');
	    			}

	    			const _require = commonjsRequire;

	    			const compilation = _require().load(_require().readFileSync(mod._OLSKInternationalCompilationFilePath(cwd), 'utf8'));

	    			Object.keys(compilation).map(function (e) {
	    				return _require().writeFileSync(e, mod._SafeDump(compilation[e]));
	    			});
	    		},

	    		OLSKInternationalAddControllerLanguageCode (cwd, languageID) {
	    			if (typeof cwd !== 'string' || !cwd.trim()) {
	    				throw new Error('OLSKErrorInputNotValid');
	    			}

	    			if (typeof languageID !== 'string' || !languageID.trim()) {
	    				throw new Error('OLSKErrorInputNotValid');
	    			}

	    			const _require = commonjsRequire;

	    			_require().sync('controller.js', {
	    				cwd,
	    				matchBase: true,
	    				realpath: true,
	    			}).forEach(function (file) {
	    				if (file.match(/.*(\.git|DS_Store|node_modules|vendor|__\w+)\/.*/i)) {
	    					return
	    				}

	    				const item = _require();

	    				if (typeof item.OLSKControllerRoutes !== 'function') {
	    					return;
	    				}

	    				if (!(function(inputData) {
	    					if (Array.isArray(inputData)) {
	    						return inputData;
	    					}
	    					return Object.entries(inputData).reduce(function (coll, item) {
	    						return coll.concat(Object.assign(item[1], {
	    							OLSKRouteSignature: item[0],
	    						}));
	    					}, []);
	    				})(item.OLSKControllerRoutes()).filter(function (e) {
	    					return e.OLSKRouteLanguageCodes;
	    				}).filter(function (e) {
	    					return !e.OLSKRouteLanguageCodes.includes(languageID);
	    				}).length) {
	    					return
	    				}
	    				const match = _require().readFileSync(file, 'utf8').match(/OLSKRouteLanguageCodes: \[.*\]/g);

	    				if (!match) {
	    					throw new Error(`invalid OLSKRouteLanguageCodes syntax in ${ e }`);
	    				}

	    				match.map(function (e) {
	    					const match = e.match(/\[.*\]/);
	    					return _require().writeFileSync(file, _require().readFileSync(file, 'utf8').replace(/OLSKRouteLanguageCodes: \[.*\]/, `OLSKRouteLanguageCodes: ['${JSON.parse(match[0].replace(/\'/g, '"')).concat(languageID).join('\', \'')}']`));
	    				});
	    			});

	    			if (process.argv[2].endsWith('olsk-i18n-add')) {
	    				process.exit();
	    			}
	    		},

	    	};
	    	
	    	Object.assign(exports, mod);

	    	Object.defineProperty(exports, '__esModule', {
	    		value: true
	    	});

	    })));

	    {
	    	exports.OLSKLocalized = function (inputData) {
	    		return exports.OLSKInternationalLocalizedString(inputData, JSON.parse(`{"en":{"LCHLauncherInputPlaceholderDefault":"Type to search","LCHLauncherInputPlaceholderPreview":"Type to filter","LCHLauncherSubjectPromptPlaceholderText":"Type to search","LCHLauncherSubjectPromptHeadingText":"Subject","LCHLauncherActionPromptHeadingText":"Action","LCHLauncherObjectPromptHeadingText":"Object","LCHCopyToClipboardButtonText":"Copy to clipboard","LCHStandardRecipeNames":{"LCHActiveDocumentFocusElements":"Active Document Focus Elements","LCHCopyToClipboard":"Copy to clipboard","LCHLargeText":"Large text","LCHDOMElementFocus":"Focus","LCHRunCommand":"Run Command","LCHSearchWith":"Search With","LCHSearchFor":"Search For","LCHSubjectContainerShowContents":"Show Contents","LCHURLOpen":"Open URL","SubjectContainer":"Subject Container","String":"String","Date":"Date","URL":"URL","ServiceSearchURLTemplate":"Search Service URL Template","DOMElement":"DOM Element"}},"es":{"LCHLauncherInputPlaceholderDefault":"Escribir para buscar","LCHLauncherInputPlaceholderPreview":"Escribir para filtrar","LCHLauncherSubjectPromptPlaceholderText":"Escribir para buscar","LCHLauncherSubjectPromptHeadingText":"Sujeto","LCHLauncherActionPromptHeadingText":"Acto","LCHLauncherObjectPromptHeadingText":"Objeto","LCHCopyToClipboardButtonText":"Copiar al portapapeles","LCHStandardRecipeNames":{"LCHActiveDocumentFocusElements":"Elementos enfocados del documento activo","LCHCopyToClipboard":"Copiar al portapapeles","LCHLargeText":"Texto aumentado","LCHDOMElementFocus":"Enfocar","LCHRunCommand":"Ejecutar comando","LCHSearchWith":"Buscar con","LCHSearchFor":"Buscar para","LCHSubjectContainerShowContents":"Mostrar contenidos","LCHURLOpen":"Abrir URL","SubjectContainer":"Contenido de sujetos","String":"String","Date":"Date","URL":"URL","ServiceSearchURLTemplate":"Plantilla URL de servicio de búsqueda","DOMElement":"Elemento DOM"}},"fr":{"LCHLauncherInputPlaceholderDefault":"Taper pour chercher","LCHLauncherInputPlaceholderPreview":"Taper pour filtrer","LCHLauncherSubjectPromptPlaceholderText":"Taper pour chercher","LCHLauncherSubjectPromptHeadingText":"Sujet","LCHLauncherActionPromptHeadingText":"Action","LCHLauncherObjectPromptHeadingText":"Objet","LCHCopyToClipboardButtonText":"Copier dans le presse-papier","LCHStandardRecipeNames":{"LCHActiveDocumentFocusElements":"Éléments au points du document active","LCHCopyToClipboard":"Copier dans le presse-papier","LCHLargeText":"Texte élargi","LCHDOMElementFocus":"Faire le point","LCHRunCommand":"Exécuter la commande","LCHSearchWith":"Chercher avec","LCHSearchFor":"Chercher pour","LCHSubjectContainerShowContents":"Montrer le contenu","LCHURLOpen":"Ouvrir l'URL","SubjectContainer":"Contenant des sujets","String":"String","Date":"Date","URL":"URL","ServiceSearchURLTemplate":"Modèle URL de service de recherche","DOMElement":"Élément DOM"}},"pt":{"LCHLauncherInputPlaceholderDefault":"Digitar para pesquisar","LCHLauncherInputPlaceholderPreview":"Digitar para filtrar","LCHLauncherSubjectPromptPlaceholderText":"Digitar para pesquisar","LCHLauncherSubjectPromptHeadingText":"Sujeito","LCHLauncherActionPromptHeadingText":"Ação","LCHLauncherObjectPromptHeadingText":"Objeto","LCHCopyToClipboardButtonText":"Cópia na área de transferência","LCHStandardRecipeNames":{"LCHActiveDocumentFocusElements":"Elementos de foco no documento ativo","LCHCopyToClipboard":"Cópia na área de transferência","LCHLargeText":"Texto grande","LCHDOMElementFocus":"Foco","LCHRunCommand":"Executar Comando","LCHSearchWith":"Buscar com","LCHSearchFor":"Buscar por","LCHSubjectContainerShowContents":"Mostrar conteúdo","LCHURLOpen":"Abrir URL","SubjectContainer":"Contêiner do Sujeito","String":"Sequência","Date":"Data","URL":"URL","ServiceSearchURLTemplate":"Modelo de URL do serviço de pesquisa","DOMElement":"Elemento do DOM"}}}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
	    	};
	    }
	    });

	    var OLSKInternational = unwrapExports(main$1);
	    var main_1$1 = main$1.OLSKLocalized;

	    var fuzzysort = createCommonjsModule(function (module) {
	    (function(root, UMD) {
	      if( module.exports) module.exports = UMD();
	      else root.fuzzysort = UMD();
	    })(commonjsGlobal$1, function UMD() { function fuzzysortNew(instanceOptions) {

	      var fuzzysort = {

	        single: function(search, target, options) {
	          if(!search) return null
	          if(!isObj(search)) search = fuzzysort.getPreparedSearch(search);

	          if(!target) return null
	          if(!isObj(target)) target = fuzzysort.getPrepared(target);

	          var allowTypo = options && options.allowTypo!==undefined ? options.allowTypo
	            : instanceOptions && instanceOptions.allowTypo!==undefined ? instanceOptions.allowTypo
	            : true;
	          var algorithm = allowTypo ? fuzzysort.algorithm : fuzzysort.algorithmNoTypo;
	          return algorithm(search, target, search[0])
	          // var threshold = options && options.threshold || instanceOptions && instanceOptions.threshold || -9007199254740991
	          // var result = algorithm(search, target, search[0])
	          // if(result === null) return null
	          // if(result.score < threshold) return null
	          // return result
	        },

	        go: function(search, targets, options) {
	          if(!search) return noResults
	          search = fuzzysort.prepareSearch(search);
	          var searchLowerCode = search[0];

	          var threshold = options && options.threshold || instanceOptions && instanceOptions.threshold || -9007199254740991;
	          var limit = options && options.limit || instanceOptions && instanceOptions.limit || 9007199254740991;
	          var allowTypo = options && options.allowTypo!==undefined ? options.allowTypo
	            : instanceOptions && instanceOptions.allowTypo!==undefined ? instanceOptions.allowTypo
	            : true;
	          var algorithm = allowTypo ? fuzzysort.algorithm : fuzzysort.algorithmNoTypo;
	          var resultsLen = 0; var limitedCount = 0;
	          var targetsLen = targets.length;

	          // This code is copy/pasted 3 times for performance reasons [options.keys, options.key, no keys]

	          // options.keys
	          if(options && options.keys) {
	            var scoreFn = options.scoreFn || defaultScoreFn;
	            var keys = options.keys;
	            var keysLen = keys.length;
	            for(var i = targetsLen - 1; i >= 0; --i) { var obj = targets[i];
	              var objResults = new Array(keysLen);
	              for (var keyI = keysLen - 1; keyI >= 0; --keyI) {
	                var key = keys[keyI];
	                var target = getValue(obj, key);
	                if(!target) { objResults[keyI] = null; continue }
	                if(!isObj(target)) target = fuzzysort.getPrepared(target);

	                objResults[keyI] = algorithm(search, target, searchLowerCode);
	              }
	              objResults.obj = obj; // before scoreFn so scoreFn can use it
	              var score = scoreFn(objResults);
	              if(score === null) continue
	              if(score < threshold) continue
	              objResults.score = score;
	              if(resultsLen < limit) { q.add(objResults); ++resultsLen; }
	              else {
	                ++limitedCount;
	                if(score > q.peek().score) q.replaceTop(objResults);
	              }
	            }

	          // options.key
	          } else if(options && options.key) {
	            var key = options.key;
	            for(var i = targetsLen - 1; i >= 0; --i) { var obj = targets[i];
	              var target = getValue(obj, key);
	              if(!target) continue
	              if(!isObj(target)) target = fuzzysort.getPrepared(target);

	              var result = algorithm(search, target, searchLowerCode);
	              if(result === null) continue
	              if(result.score < threshold) continue

	              // have to clone result so duplicate targets from different obj can each reference the correct obj
	              result = {target:result.target, _targetLowerCodes:null, _nextBeginningIndexes:null, score:result.score, indexes:result.indexes, obj:obj}; // hidden

	              if(resultsLen < limit) { q.add(result); ++resultsLen; }
	              else {
	                ++limitedCount;
	                if(result.score > q.peek().score) q.replaceTop(result);
	              }
	            }

	          // no keys
	          } else {
	            for(var i = targetsLen - 1; i >= 0; --i) { var target = targets[i];
	              if(!target) continue
	              if(!isObj(target)) target = fuzzysort.getPrepared(target);

	              var result = algorithm(search, target, searchLowerCode);
	              if(result === null) continue
	              if(result.score < threshold) continue
	              if(resultsLen < limit) { q.add(result); ++resultsLen; }
	              else {
	                ++limitedCount;
	                if(result.score > q.peek().score) q.replaceTop(result);
	              }
	            }
	          }

	          if(resultsLen === 0) return noResults
	          var results = new Array(resultsLen);
	          for(var i = resultsLen - 1; i >= 0; --i) results[i] = q.poll();
	          results.total = resultsLen + limitedCount;
	          return results
	        },

	        goAsync: function(search, targets, options) {
	          var canceled = false;
	          var p = new Promise(function(resolve, reject) {
	            if(!search) return resolve(noResults)
	            search = fuzzysort.prepareSearch(search);
	            var searchLowerCode = search[0];

	            var q = fastpriorityqueue();
	            var iCurrent = targets.length - 1;
	            var threshold = options && options.threshold || instanceOptions && instanceOptions.threshold || -9007199254740991;
	            var limit = options && options.limit || instanceOptions && instanceOptions.limit || 9007199254740991;
	            var allowTypo = options && options.allowTypo!==undefined ? options.allowTypo
	              : instanceOptions && instanceOptions.allowTypo!==undefined ? instanceOptions.allowTypo
	              : true;
	            var algorithm = allowTypo ? fuzzysort.algorithm : fuzzysort.algorithmNoTypo;
	            var resultsLen = 0; var limitedCount = 0;
	            function step() {
	              if(canceled) return reject('canceled')

	              var startMs = Date.now();

	              // This code is copy/pasted 3 times for performance reasons [options.keys, options.key, no keys]

	              // options.keys
	              if(options && options.keys) {
	                var scoreFn = options.scoreFn || defaultScoreFn;
	                var keys = options.keys;
	                var keysLen = keys.length;
	                for(; iCurrent >= 0; --iCurrent) { var obj = targets[iCurrent];
	                  var objResults = new Array(keysLen);
	                  for (var keyI = keysLen - 1; keyI >= 0; --keyI) {
	                    var key = keys[keyI];
	                    var target = getValue(obj, key);
	                    if(!target) { objResults[keyI] = null; continue }
	                    if(!isObj(target)) target = fuzzysort.getPrepared(target);

	                    objResults[keyI] = algorithm(search, target, searchLowerCode);
	                  }
	                  objResults.obj = obj; // before scoreFn so scoreFn can use it
	                  var score = scoreFn(objResults);
	                  if(score === null) continue
	                  if(score < threshold) continue
	                  objResults.score = score;
	                  if(resultsLen < limit) { q.add(objResults); ++resultsLen; }
	                  else {
	                    ++limitedCount;
	                    if(score > q.peek().score) q.replaceTop(objResults);
	                  }

	                  if(iCurrent%1000/*itemsPerCheck*/ === 0) {
	                    if(Date.now() - startMs >= 10/*asyncInterval*/) {
	                      isNode?setImmediate(step):setTimeout(step);
	                      return
	                    }
	                  }
	                }

	              // options.key
	              } else if(options && options.key) {
	                var key = options.key;
	                for(; iCurrent >= 0; --iCurrent) { var obj = targets[iCurrent];
	                  var target = getValue(obj, key);
	                  if(!target) continue
	                  if(!isObj(target)) target = fuzzysort.getPrepared(target);

	                  var result = algorithm(search, target, searchLowerCode);
	                  if(result === null) continue
	                  if(result.score < threshold) continue

	                  // have to clone result so duplicate targets from different obj can each reference the correct obj
	                  result = {target:result.target, _targetLowerCodes:null, _nextBeginningIndexes:null, score:result.score, indexes:result.indexes, obj:obj}; // hidden

	                  if(resultsLen < limit) { q.add(result); ++resultsLen; }
	                  else {
	                    ++limitedCount;
	                    if(result.score > q.peek().score) q.replaceTop(result);
	                  }

	                  if(iCurrent%1000/*itemsPerCheck*/ === 0) {
	                    if(Date.now() - startMs >= 10/*asyncInterval*/) {
	                      isNode?setImmediate(step):setTimeout(step);
	                      return
	                    }
	                  }
	                }

	              // no keys
	              } else {
	                for(; iCurrent >= 0; --iCurrent) { var target = targets[iCurrent];
	                  if(!target) continue
	                  if(!isObj(target)) target = fuzzysort.getPrepared(target);

	                  var result = algorithm(search, target, searchLowerCode);
	                  if(result === null) continue
	                  if(result.score < threshold) continue
	                  if(resultsLen < limit) { q.add(result); ++resultsLen; }
	                  else {
	                    ++limitedCount;
	                    if(result.score > q.peek().score) q.replaceTop(result);
	                  }

	                  if(iCurrent%1000/*itemsPerCheck*/ === 0) {
	                    if(Date.now() - startMs >= 10/*asyncInterval*/) {
	                      isNode?setImmediate(step):setTimeout(step);
	                      return
	                    }
	                  }
	                }
	              }

	              if(resultsLen === 0) return resolve(noResults)
	              var results = new Array(resultsLen);
	              for(var i = resultsLen - 1; i >= 0; --i) results[i] = q.poll();
	              results.total = resultsLen + limitedCount;
	              resolve(results);
	            }

	            isNode?setImmediate(step):step();
	          });
	          p.cancel = function() { canceled = true; };
	          return p
	        },

	        highlight: function(result, hOpen, hClose) {
	          if(result === null) return null
	          if(hOpen === undefined) hOpen = '<b>';
	          if(hClose === undefined) hClose = '</b>';
	          var highlighted = '';
	          var matchesIndex = 0;
	          var opened = false;
	          var target = result.target;
	          var targetLen = target.length;
	          var matchesBest = result.indexes;
	          for(var i = 0; i < targetLen; ++i) { var char = target[i];
	            if(matchesBest[matchesIndex] === i) {
	              ++matchesIndex;
	              if(!opened) { opened = true;
	                highlighted += hOpen;
	              }

	              if(matchesIndex === matchesBest.length) {
	                highlighted += char + hClose + target.substr(i+1);
	                break
	              }
	            } else {
	              if(opened) { opened = false;
	                highlighted += hClose;
	              }
	            }
	            highlighted += char;
	          }

	          return highlighted
	        },

	        prepare: function(target) {
	          if(!target) return
	          return {target:target, _targetLowerCodes:fuzzysort.prepareLowerCodes(target), _nextBeginningIndexes:null, score:null, indexes:null, obj:null} // hidden
	        },
	        prepareSlow: function(target) {
	          if(!target) return
	          return {target:target, _targetLowerCodes:fuzzysort.prepareLowerCodes(target), _nextBeginningIndexes:fuzzysort.prepareNextBeginningIndexes(target), score:null, indexes:null, obj:null} // hidden
	        },
	        prepareSearch: function(search) {
	          if(!search) return
	          return fuzzysort.prepareLowerCodes(search)
	        },



	        // Below this point is only internal code
	        // Below this point is only internal code
	        // Below this point is only internal code
	        // Below this point is only internal code



	        getPrepared: function(target) {
	          if(target.length > 999) return fuzzysort.prepare(target) // don't cache huge targets
	          var targetPrepared = preparedCache.get(target);
	          if(targetPrepared !== undefined) return targetPrepared
	          targetPrepared = fuzzysort.prepare(target);
	          preparedCache.set(target, targetPrepared);
	          return targetPrepared
	        },
	        getPreparedSearch: function(search) {
	          if(search.length > 999) return fuzzysort.prepareSearch(search) // don't cache huge searches
	          var searchPrepared = preparedSearchCache.get(search);
	          if(searchPrepared !== undefined) return searchPrepared
	          searchPrepared = fuzzysort.prepareSearch(search);
	          preparedSearchCache.set(search, searchPrepared);
	          return searchPrepared
	        },

	        algorithm: function(searchLowerCodes, prepared, searchLowerCode) {
	          var targetLowerCodes = prepared._targetLowerCodes;
	          var searchLen = searchLowerCodes.length;
	          var targetLen = targetLowerCodes.length;
	          var searchI = 0; // where we at
	          var targetI = 0; // where you at
	          var typoSimpleI = 0;
	          var matchesSimpleLen = 0;

	          // very basic fuzzy match; to remove non-matching targets ASAP!
	          // walk through target. find sequential matches.
	          // if all chars aren't found then exit
	          for(;;) {
	            var isMatch = searchLowerCode === targetLowerCodes[targetI];
	            if(isMatch) {
	              matchesSimple[matchesSimpleLen++] = targetI;
	              ++searchI; if(searchI === searchLen) break
	              searchLowerCode = searchLowerCodes[typoSimpleI===0?searchI : (typoSimpleI===searchI?searchI+1 : (typoSimpleI===searchI-1?searchI-1 : searchI))];
	            }

	            ++targetI; if(targetI >= targetLen) { // Failed to find searchI
	              // Check for typo or exit
	              // we go as far as possible before trying to transpose
	              // then we transpose backwards until we reach the beginning
	              for(;;) {
	                if(searchI <= 1) return null // not allowed to transpose first char
	                if(typoSimpleI === 0) { // we haven't tried to transpose yet
	                  --searchI;
	                  var searchLowerCodeNew = searchLowerCodes[searchI];
	                  if(searchLowerCode === searchLowerCodeNew) continue // doesn't make sense to transpose a repeat char
	                  typoSimpleI = searchI;
	                } else {
	                  if(typoSimpleI === 1) return null // reached the end of the line for transposing
	                  --typoSimpleI;
	                  searchI = typoSimpleI;
	                  searchLowerCode = searchLowerCodes[searchI + 1];
	                  var searchLowerCodeNew = searchLowerCodes[searchI];
	                  if(searchLowerCode === searchLowerCodeNew) continue // doesn't make sense to transpose a repeat char
	                }
	                matchesSimpleLen = searchI;
	                targetI = matchesSimple[matchesSimpleLen - 1] + 1;
	                break
	              }
	            }
	          }

	          var searchI = 0;
	          var typoStrictI = 0;
	          var successStrict = false;
	          var matchesStrictLen = 0;

	          var nextBeginningIndexes = prepared._nextBeginningIndexes;
	          if(nextBeginningIndexes === null) nextBeginningIndexes = prepared._nextBeginningIndexes = fuzzysort.prepareNextBeginningIndexes(prepared.target);
	          var firstPossibleI = targetI = matchesSimple[0]===0 ? 0 : nextBeginningIndexes[matchesSimple[0]-1];

	          // Our target string successfully matched all characters in sequence!
	          // Let's try a more advanced and strict test to improve the score
	          // only count it as a match if it's consecutive or a beginning character!
	          if(targetI !== targetLen) for(;;) {
	            if(targetI >= targetLen) {
	              // We failed to find a good spot for this search char, go back to the previous search char and force it forward
	              if(searchI <= 0) { // We failed to push chars forward for a better match
	                // transpose, starting from the beginning
	                ++typoStrictI; if(typoStrictI > searchLen-2) break
	                if(searchLowerCodes[typoStrictI] === searchLowerCodes[typoStrictI+1]) continue // doesn't make sense to transpose a repeat char
	                targetI = firstPossibleI;
	                continue
	              }

	              --searchI;
	              var lastMatch = matchesStrict[--matchesStrictLen];
	              targetI = nextBeginningIndexes[lastMatch];

	            } else {
	              var isMatch = searchLowerCodes[typoStrictI===0?searchI : (typoStrictI===searchI?searchI+1 : (typoStrictI===searchI-1?searchI-1 : searchI))] === targetLowerCodes[targetI];
	              if(isMatch) {
	                matchesStrict[matchesStrictLen++] = targetI;
	                ++searchI; if(searchI === searchLen) { successStrict = true; break }
	                ++targetI;
	              } else {
	                targetI = nextBeginningIndexes[targetI];
	              }
	            }
	          }

	          { // tally up the score & keep track of matches for highlighting later
	            if(successStrict) { var matchesBest = matchesStrict; var matchesBestLen = matchesStrictLen; }
	            else { var matchesBest = matchesSimple; var matchesBestLen = matchesSimpleLen; }
	            var score = 0;
	            var lastTargetI = -1;
	            for(var i = 0; i < searchLen; ++i) { var targetI = matchesBest[i];
	              // score only goes down if they're not consecutive
	              if(lastTargetI !== targetI - 1) score -= targetI;
	              lastTargetI = targetI;
	            }
	            if(!successStrict) {
	              score *= 1000;
	              if(typoSimpleI !== 0) score += -20;/*typoPenalty*/
	            } else {
	              if(typoStrictI !== 0) score += -20;/*typoPenalty*/
	            }
	            score -= targetLen - searchLen;
	            prepared.score = score;
	            prepared.indexes = new Array(matchesBestLen); for(var i = matchesBestLen - 1; i >= 0; --i) prepared.indexes[i] = matchesBest[i];

	            return prepared
	          }
	        },

	        algorithmNoTypo: function(searchLowerCodes, prepared, searchLowerCode) {
	          var targetLowerCodes = prepared._targetLowerCodes;
	          var searchLen = searchLowerCodes.length;
	          var targetLen = targetLowerCodes.length;
	          var searchI = 0; // where we at
	          var targetI = 0; // where you at
	          var matchesSimpleLen = 0;

	          // very basic fuzzy match; to remove non-matching targets ASAP!
	          // walk through target. find sequential matches.
	          // if all chars aren't found then exit
	          for(;;) {
	            var isMatch = searchLowerCode === targetLowerCodes[targetI];
	            if(isMatch) {
	              matchesSimple[matchesSimpleLen++] = targetI;
	              ++searchI; if(searchI === searchLen) break
	              searchLowerCode = searchLowerCodes[searchI];
	            }
	            ++targetI; if(targetI >= targetLen) return null // Failed to find searchI
	          }

	          var searchI = 0;
	          var successStrict = false;
	          var matchesStrictLen = 0;

	          var nextBeginningIndexes = prepared._nextBeginningIndexes;
	          if(nextBeginningIndexes === null) nextBeginningIndexes = prepared._nextBeginningIndexes = fuzzysort.prepareNextBeginningIndexes(prepared.target);
	          var firstPossibleI = targetI = matchesSimple[0]===0 ? 0 : nextBeginningIndexes[matchesSimple[0]-1];

	          // Our target string successfully matched all characters in sequence!
	          // Let's try a more advanced and strict test to improve the score
	          // only count it as a match if it's consecutive or a beginning character!
	          if(targetI !== targetLen) for(;;) {
	            if(targetI >= targetLen) {
	              // We failed to find a good spot for this search char, go back to the previous search char and force it forward
	              if(searchI <= 0) break // We failed to push chars forward for a better match

	              --searchI;
	              var lastMatch = matchesStrict[--matchesStrictLen];
	              targetI = nextBeginningIndexes[lastMatch];

	            } else {
	              var isMatch = searchLowerCodes[searchI] === targetLowerCodes[targetI];
	              if(isMatch) {
	                matchesStrict[matchesStrictLen++] = targetI;
	                ++searchI; if(searchI === searchLen) { successStrict = true; break }
	                ++targetI;
	              } else {
	                targetI = nextBeginningIndexes[targetI];
	              }
	            }
	          }

	          { // tally up the score & keep track of matches for highlighting later
	            if(successStrict) { var matchesBest = matchesStrict; var matchesBestLen = matchesStrictLen; }
	            else { var matchesBest = matchesSimple; var matchesBestLen = matchesSimpleLen; }
	            var score = 0;
	            var lastTargetI = -1;
	            for(var i = 0; i < searchLen; ++i) { var targetI = matchesBest[i];
	              // score only goes down if they're not consecutive
	              if(lastTargetI !== targetI - 1) score -= targetI;
	              lastTargetI = targetI;
	            }
	            if(!successStrict) score *= 1000;
	            score -= targetLen - searchLen;
	            prepared.score = score;
	            prepared.indexes = new Array(matchesBestLen); for(var i = matchesBestLen - 1; i >= 0; --i) prepared.indexes[i] = matchesBest[i];

	            return prepared
	          }
	        },

	        prepareLowerCodes: function(str) {
	          var strLen = str.length;
	          var lowerCodes = []; // new Array(strLen)    sparse array is too slow
	          var lower = str.toLowerCase();
	          for(var i = 0; i < strLen; ++i) lowerCodes[i] = lower.charCodeAt(i);
	          return lowerCodes
	        },
	        prepareBeginningIndexes: function(target) {
	          var targetLen = target.length;
	          var beginningIndexes = []; var beginningIndexesLen = 0;
	          var wasUpper = false;
	          var wasAlphanum = false;
	          for(var i = 0; i < targetLen; ++i) {
	            var targetCode = target.charCodeAt(i);
	            var isUpper = targetCode>=65&&targetCode<=90;
	            var isAlphanum = isUpper || targetCode>=97&&targetCode<=122 || targetCode>=48&&targetCode<=57;
	            var isBeginning = isUpper && !wasUpper || !wasAlphanum || !isAlphanum;
	            wasUpper = isUpper;
	            wasAlphanum = isAlphanum;
	            if(isBeginning) beginningIndexes[beginningIndexesLen++] = i;
	          }
	          return beginningIndexes
	        },
	        prepareNextBeginningIndexes: function(target) {
	          var targetLen = target.length;
	          var beginningIndexes = fuzzysort.prepareBeginningIndexes(target);
	          var nextBeginningIndexes = []; // new Array(targetLen)     sparse array is too slow
	          var lastIsBeginning = beginningIndexes[0];
	          var lastIsBeginningI = 0;
	          for(var i = 0; i < targetLen; ++i) {
	            if(lastIsBeginning > i) {
	              nextBeginningIndexes[i] = lastIsBeginning;
	            } else {
	              lastIsBeginning = beginningIndexes[++lastIsBeginningI];
	              nextBeginningIndexes[i] = lastIsBeginning===undefined ? targetLen : lastIsBeginning;
	            }
	          }
	          return nextBeginningIndexes
	        },

	        cleanup: cleanup,
	        new: fuzzysortNew,
	      };
	      return fuzzysort
	    } // fuzzysortNew

	    // This stuff is outside fuzzysortNew, because it's shared with instances of fuzzysort.new()
	    var isNode = typeof commonjsRequire !== 'undefined' && typeof window === 'undefined';
	    // var MAX_INT = Number.MAX_SAFE_INTEGER
	    // var MIN_INT = Number.MIN_VALUE
	    var preparedCache = new Map();
	    var preparedSearchCache = new Map();
	    var noResults = []; noResults.total = 0;
	    var matchesSimple = []; var matchesStrict = [];
	    function cleanup() { preparedCache.clear(); preparedSearchCache.clear(); matchesSimple = []; matchesStrict = []; }
	    function defaultScoreFn(a) {
	      var max = -9007199254740991;
	      for (var i = a.length - 1; i >= 0; --i) {
	        var result = a[i]; if(result === null) continue
	        var score = result.score;
	        if(score > max) max = score;
	      }
	      if(max === -9007199254740991) return null
	      return max
	    }

	    // prop = 'key'              2.5ms optimized for this case, seems to be about as fast as direct obj[prop]
	    // prop = 'key1.key2'        10ms
	    // prop = ['key1', 'key2']   27ms
	    function getValue(obj, prop) {
	      var tmp = obj[prop]; if(tmp !== undefined) return tmp
	      var segs = prop;
	      if(!Array.isArray(prop)) segs = prop.split('.');
	      var len = segs.length;
	      var i = -1;
	      while (obj && (++i < len)) obj = obj[segs[i]];
	      return obj
	    }

	    function isObj(x) { return typeof x === 'object' } // faster as a function

	    // Hacked version of https://github.com/lemire/FastPriorityQueue.js
	    var fastpriorityqueue=function(){var r=[],o=0,e={};function n(){for(var e=0,n=r[e],c=1;c<o;){var f=c+1;e=c,f<o&&r[f].score<r[c].score&&(e=f),r[e-1>>1]=r[e],c=1+(e<<1);}for(var a=e-1>>1;e>0&&n.score<r[a].score;a=(e=a)-1>>1)r[e]=r[a];r[e]=n;}return e.add=function(e){var n=o;r[o++]=e;for(var c=n-1>>1;n>0&&e.score<r[c].score;c=(n=c)-1>>1)r[n]=r[c];r[n]=e;},e.poll=function(){if(0!==o){var e=r[0];return r[0]=r[--o],n(),e}},e.peek=function(e){if(0!==o)return r[0]},e.replaceTop=function(o){r[0]=o,n();},e};
	    var q = fastpriorityqueue(); // reuse this, except for async, it needs to make its own

	    return fuzzysortNew()
	    }); // UMD

	    // TODO: (performance) wasm version!?

	    // TODO: (performance) layout memory in an optimal way to go fast by avoiding cache misses

	    // TODO: (performance) preparedCache is a memory leak

	    // TODO: (like sublime) backslash === forwardslash

	    // TODO: (performance) i have no idea how well optizmied the allowing typos algorithm is
	    });

	    var main$2 = createCommonjsModule(function (module, exports) {
	    const mod = {

	    	OLSKThrottleIsValid (inputData) {
	    		if (typeof inputData !== 'object' || inputData === null) {
	    			return false;
	    		}

	    		if (typeof inputData.OLSKThrottleCallback !== 'function') {
	    			return false;
	    		}

	    		if (typeof inputData.OLSKThrottleDuration !== 'number') {
	    			return false;
	    		}

	    		return true;
	    	},

	    	OLSKThrottleTimeoutFor (inputData) {
	    		if (!mod.OLSKThrottleIsValid(inputData)) {
	    			throw new Error('OLSKErrorInputNotValid');
	    		}

	    		if (inputData._OLSKThrottleTimeoutID) {
	    			clearTimeout(inputData._OLSKThrottleTimeoutID);
	    		}

	    		inputData._OLSKThrottleTimeoutID = setTimeout(function () {
	    			mod._OLSKThrottleFire(inputData);
	    		}, inputData.OLSKThrottleDuration);

	    		return inputData._OLSKThrottleTimeoutID;
	    	},

	    	OLSKThrottleSkip (inputData) {
	    		if (!mod.OLSKThrottleIsValid(inputData)) {
	    			throw new Error('OLSKErrorInputNotValid');
	    		}

	    		clearTimeout(inputData._OLSKThrottleTimeoutID);
	    		
	    		return mod._OLSKThrottleFire(inputData);
	    	},

	    	_OLSKThrottleFire (inputData) {
	    		delete inputData._OLSKThrottleTimeoutID;
	    		
	    		return inputData.OLSKThrottleCallback();
	    	},

	    	OLSKThrottleMappedTimeout (param1, param2, param3) {
	    		if (typeof param1 !== 'object' || param1 === null) {
	    			throw new Error('OLSKErrorInputNotValid');
	    		}

	    		if (typeof param2 !== 'string') {
	    			throw new Error('OLSKErrorInputNotValid');
	    		}

	    		if (!mod.OLSKThrottleIsValid(param3)) {
	    			throw new Error('OLSKErrorInputNotValid');
	    		}

	    		if (!param1[param2]) {
	    			param1[param2] = Object.assign(Object.assign({}, param3), {
	    				OLSKThrottleCallback () {
	    					mod._OLSKThrottleFire(param3);

	    					delete param1[param2];
	    				},
	    			});
	    		}

	    		return param3._OLSKThrottleTimeoutID = mod.OLSKThrottleTimeoutFor(param1[param2]);
	    	},

	    };

	    Object.assign(exports, mod);
	    });

	    var clipboard = createCommonjsModule(function (module, exports) {
	    /*!
	     * clipboard.js v2.0.8
	     * https://clipboardjs.com/
	     *
	     * Licensed MIT © Zeno Rocha
	     */
	    (function webpackUniversalModuleDefinition(root, factory) {
	    	module.exports = factory();
	    })(commonjsGlobal$1, function() {
	    return /******/ (function() { // webpackBootstrap
	    /******/ 	var __webpack_modules__ = ({

	    /***/ 134:
	    /***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

	    // EXPORTS
	    __webpack_require__.d(__webpack_exports__, {
	      "default": function() { return /* binding */ clipboard; }
	    });

	    // EXTERNAL MODULE: ./node_modules/tiny-emitter/index.js
	    var tiny_emitter = __webpack_require__(279);
	    var tiny_emitter_default = /*#__PURE__*/__webpack_require__.n(tiny_emitter);
	    // EXTERNAL MODULE: ./node_modules/good-listener/src/listen.js
	    var listen = __webpack_require__(370);
	    var listen_default = /*#__PURE__*/__webpack_require__.n(listen);
	    // EXTERNAL MODULE: ./node_modules/select/src/select.js
	    var src_select = __webpack_require__(817);
	    var select_default = /*#__PURE__*/__webpack_require__.n(src_select);
	    function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	    function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	    function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


	    /**
	     * Inner class which performs selection from either `text` or `target`
	     * properties and then executes copy or cut operations.
	     */

	    var ClipboardAction = /*#__PURE__*/function () {
	      /**
	       * @param {Object} options
	       */
	      function ClipboardAction(options) {
	        _classCallCheck(this, ClipboardAction);

	        this.resolveOptions(options);
	        this.initSelection();
	      }
	      /**
	       * Defines base properties passed from constructor.
	       * @param {Object} options
	       */


	      _createClass(ClipboardAction, [{
	        key: "resolveOptions",
	        value: function resolveOptions() {
	          var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	          this.action = options.action;
	          this.container = options.container;
	          this.emitter = options.emitter;
	          this.target = options.target;
	          this.text = options.text;
	          this.trigger = options.trigger;
	          this.selectedText = '';
	        }
	        /**
	         * Decides which selection strategy is going to be applied based
	         * on the existence of `text` and `target` properties.
	         */

	      }, {
	        key: "initSelection",
	        value: function initSelection() {
	          if (this.text) {
	            this.selectFake();
	          } else if (this.target) {
	            this.selectTarget();
	          }
	        }
	        /**
	         * Creates a fake textarea element, sets its value from `text` property,
	         */

	      }, {
	        key: "createFakeElement",
	        value: function createFakeElement() {
	          var isRTL = document.documentElement.getAttribute('dir') === 'rtl';
	          this.fakeElem = document.createElement('textarea'); // Prevent zooming on iOS

	          this.fakeElem.style.fontSize = '12pt'; // Reset box model

	          this.fakeElem.style.border = '0';
	          this.fakeElem.style.padding = '0';
	          this.fakeElem.style.margin = '0'; // Move element out of screen horizontally

	          this.fakeElem.style.position = 'absolute';
	          this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px'; // Move element to the same position vertically

	          var yPosition = window.pageYOffset || document.documentElement.scrollTop;
	          this.fakeElem.style.top = "".concat(yPosition, "px");
	          this.fakeElem.setAttribute('readonly', '');
	          this.fakeElem.value = this.text;
	          return this.fakeElem;
	        }
	        /**
	         * Get's the value of fakeElem,
	         * and makes a selection on it.
	         */

	      }, {
	        key: "selectFake",
	        value: function selectFake() {
	          var _this = this;

	          var fakeElem = this.createFakeElement();

	          this.fakeHandlerCallback = function () {
	            return _this.removeFake();
	          };

	          this.fakeHandler = this.container.addEventListener('click', this.fakeHandlerCallback) || true;
	          this.container.appendChild(fakeElem);
	          this.selectedText = select_default()(fakeElem);
	          this.copyText();
	          this.removeFake();
	        }
	        /**
	         * Only removes the fake element after another click event, that way
	         * a user can hit `Ctrl+C` to copy because selection still exists.
	         */

	      }, {
	        key: "removeFake",
	        value: function removeFake() {
	          if (this.fakeHandler) {
	            this.container.removeEventListener('click', this.fakeHandlerCallback);
	            this.fakeHandler = null;
	            this.fakeHandlerCallback = null;
	          }

	          if (this.fakeElem) {
	            this.container.removeChild(this.fakeElem);
	            this.fakeElem = null;
	          }
	        }
	        /**
	         * Selects the content from element passed on `target` property.
	         */

	      }, {
	        key: "selectTarget",
	        value: function selectTarget() {
	          this.selectedText = select_default()(this.target);
	          this.copyText();
	        }
	        /**
	         * Executes the copy operation based on the current selection.
	         */

	      }, {
	        key: "copyText",
	        value: function copyText() {
	          var succeeded;

	          try {
	            succeeded = document.execCommand(this.action);
	          } catch (err) {
	            succeeded = false;
	          }

	          this.handleResult(succeeded);
	        }
	        /**
	         * Fires an event based on the copy operation result.
	         * @param {Boolean} succeeded
	         */

	      }, {
	        key: "handleResult",
	        value: function handleResult(succeeded) {
	          this.emitter.emit(succeeded ? 'success' : 'error', {
	            action: this.action,
	            text: this.selectedText,
	            trigger: this.trigger,
	            clearSelection: this.clearSelection.bind(this)
	          });
	        }
	        /**
	         * Moves focus away from `target` and back to the trigger, removes current selection.
	         */

	      }, {
	        key: "clearSelection",
	        value: function clearSelection() {
	          if (this.trigger) {
	            this.trigger.focus();
	          }

	          document.activeElement.blur();
	          window.getSelection().removeAllRanges();
	        }
	        /**
	         * Sets the `action` to be performed which can be either 'copy' or 'cut'.
	         * @param {String} action
	         */

	      }, {
	        key: "destroy",

	        /**
	         * Destroy lifecycle.
	         */
	        value: function destroy() {
	          this.removeFake();
	        }
	      }, {
	        key: "action",
	        set: function set() {
	          var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'copy';
	          this._action = action;

	          if (this._action !== 'copy' && this._action !== 'cut') {
	            throw new Error('Invalid "action" value, use either "copy" or "cut"');
	          }
	        }
	        /**
	         * Gets the `action` property.
	         * @return {String}
	         */
	        ,
	        get: function get() {
	          return this._action;
	        }
	        /**
	         * Sets the `target` property using an element
	         * that will be have its content copied.
	         * @param {Element} target
	         */

	      }, {
	        key: "target",
	        set: function set(target) {
	          if (target !== undefined) {
	            if (target && _typeof(target) === 'object' && target.nodeType === 1) {
	              if (this.action === 'copy' && target.hasAttribute('disabled')) {
	                throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
	              }

	              if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
	                throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
	              }

	              this._target = target;
	            } else {
	              throw new Error('Invalid "target" value, use a valid Element');
	            }
	          }
	        }
	        /**
	         * Gets the `target` property.
	         * @return {String|HTMLElement}
	         */
	        ,
	        get: function get() {
	          return this._target;
	        }
	      }]);

	      return ClipboardAction;
	    }();

	    /* harmony default export */ var clipboard_action = (ClipboardAction);
	    function clipboard_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { clipboard_typeof = function _typeof(obj) { return typeof obj; }; } else { clipboard_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return clipboard_typeof(obj); }

	    function clipboard_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	    function clipboard_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	    function clipboard_createClass(Constructor, protoProps, staticProps) { if (protoProps) clipboard_defineProperties(Constructor.prototype, protoProps); if (staticProps) clipboard_defineProperties(Constructor, staticProps); return Constructor; }

	    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

	    function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

	    function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	    function _possibleConstructorReturn(self, call) { if (call && (clipboard_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

	    function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

	    function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

	    function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




	    /**
	     * Helper function to retrieve attribute value.
	     * @param {String} suffix
	     * @param {Element} element
	     */

	    function getAttributeValue(suffix, element) {
	      var attribute = "data-clipboard-".concat(suffix);

	      if (!element.hasAttribute(attribute)) {
	        return;
	      }

	      return element.getAttribute(attribute);
	    }
	    /**
	     * Base class which takes one or more elements, adds event listeners to them,
	     * and instantiates a new `ClipboardAction` on each click.
	     */


	    var Clipboard = /*#__PURE__*/function (_Emitter) {
	      _inherits(Clipboard, _Emitter);

	      var _super = _createSuper(Clipboard);

	      /**
	       * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
	       * @param {Object} options
	       */
	      function Clipboard(trigger, options) {
	        var _this;

	        clipboard_classCallCheck(this, Clipboard);

	        _this = _super.call(this);

	        _this.resolveOptions(options);

	        _this.listenClick(trigger);

	        return _this;
	      }
	      /**
	       * Defines if attributes would be resolved using internal setter functions
	       * or custom functions that were passed in the constructor.
	       * @param {Object} options
	       */


	      clipboard_createClass(Clipboard, [{
	        key: "resolveOptions",
	        value: function resolveOptions() {
	          var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	          this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
	          this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
	          this.text = typeof options.text === 'function' ? options.text : this.defaultText;
	          this.container = clipboard_typeof(options.container) === 'object' ? options.container : document.body;
	        }
	        /**
	         * Adds a click event listener to the passed trigger.
	         * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
	         */

	      }, {
	        key: "listenClick",
	        value: function listenClick(trigger) {
	          var _this2 = this;

	          this.listener = listen_default()(trigger, 'click', function (e) {
	            return _this2.onClick(e);
	          });
	        }
	        /**
	         * Defines a new `ClipboardAction` on each click event.
	         * @param {Event} e
	         */

	      }, {
	        key: "onClick",
	        value: function onClick(e) {
	          var trigger = e.delegateTarget || e.currentTarget;

	          if (this.clipboardAction) {
	            this.clipboardAction = null;
	          }

	          this.clipboardAction = new clipboard_action({
	            action: this.action(trigger),
	            target: this.target(trigger),
	            text: this.text(trigger),
	            container: this.container,
	            trigger: trigger,
	            emitter: this
	          });
	        }
	        /**
	         * Default `action` lookup function.
	         * @param {Element} trigger
	         */

	      }, {
	        key: "defaultAction",
	        value: function defaultAction(trigger) {
	          return getAttributeValue('action', trigger);
	        }
	        /**
	         * Default `target` lookup function.
	         * @param {Element} trigger
	         */

	      }, {
	        key: "defaultTarget",
	        value: function defaultTarget(trigger) {
	          var selector = getAttributeValue('target', trigger);

	          if (selector) {
	            return document.querySelector(selector);
	          }
	        }
	        /**
	         * Returns the support of the given action, or all actions if no action is
	         * given.
	         * @param {String} [action]
	         */

	      }, {
	        key: "defaultText",

	        /**
	         * Default `text` lookup function.
	         * @param {Element} trigger
	         */
	        value: function defaultText(trigger) {
	          return getAttributeValue('text', trigger);
	        }
	        /**
	         * Destroy lifecycle.
	         */

	      }, {
	        key: "destroy",
	        value: function destroy() {
	          this.listener.destroy();

	          if (this.clipboardAction) {
	            this.clipboardAction.destroy();
	            this.clipboardAction = null;
	          }
	        }
	      }], [{
	        key: "isSupported",
	        value: function isSupported() {
	          var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['copy', 'cut'];
	          var actions = typeof action === 'string' ? [action] : action;
	          var support = !!document.queryCommandSupported;
	          actions.forEach(function (action) {
	            support = support && !!document.queryCommandSupported(action);
	          });
	          return support;
	        }
	      }]);

	      return Clipboard;
	    }((tiny_emitter_default()));

	    /* harmony default export */ var clipboard = (Clipboard);

	    /***/ }),

	    /***/ 828:
	    /***/ (function(module) {

	    var DOCUMENT_NODE_TYPE = 9;

	    /**
	     * A polyfill for Element.matches()
	     */
	    if (typeof Element !== 'undefined' && !Element.prototype.matches) {
	        var proto = Element.prototype;

	        proto.matches = proto.matchesSelector ||
	                        proto.mozMatchesSelector ||
	                        proto.msMatchesSelector ||
	                        proto.oMatchesSelector ||
	                        proto.webkitMatchesSelector;
	    }

	    /**
	     * Finds the closest parent that matches a selector.
	     *
	     * @param {Element} element
	     * @param {String} selector
	     * @return {Function}
	     */
	    function closest (element, selector) {
	        while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
	            if (typeof element.matches === 'function' &&
	                element.matches(selector)) {
	              return element;
	            }
	            element = element.parentNode;
	        }
	    }

	    module.exports = closest;


	    /***/ }),

	    /***/ 438:
	    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {

	    var closest = __webpack_require__(828);

	    /**
	     * Delegates event to a selector.
	     *
	     * @param {Element} element
	     * @param {String} selector
	     * @param {String} type
	     * @param {Function} callback
	     * @param {Boolean} useCapture
	     * @return {Object}
	     */
	    function _delegate(element, selector, type, callback, useCapture) {
	        var listenerFn = listener.apply(this, arguments);

	        element.addEventListener(type, listenerFn, useCapture);

	        return {
	            destroy: function() {
	                element.removeEventListener(type, listenerFn, useCapture);
	            }
	        }
	    }

	    /**
	     * Delegates event to a selector.
	     *
	     * @param {Element|String|Array} [elements]
	     * @param {String} selector
	     * @param {String} type
	     * @param {Function} callback
	     * @param {Boolean} useCapture
	     * @return {Object}
	     */
	    function delegate(elements, selector, type, callback, useCapture) {
	        // Handle the regular Element usage
	        if (typeof elements.addEventListener === 'function') {
	            return _delegate.apply(null, arguments);
	        }

	        // Handle Element-less usage, it defaults to global delegation
	        if (typeof type === 'function') {
	            // Use `document` as the first parameter, then apply arguments
	            // This is a short way to .unshift `arguments` without running into deoptimizations
	            return _delegate.bind(null, document).apply(null, arguments);
	        }

	        // Handle Selector-based usage
	        if (typeof elements === 'string') {
	            elements = document.querySelectorAll(elements);
	        }

	        // Handle Array-like based usage
	        return Array.prototype.map.call(elements, function (element) {
	            return _delegate(element, selector, type, callback, useCapture);
	        });
	    }

	    /**
	     * Finds closest match and invokes callback.
	     *
	     * @param {Element} element
	     * @param {String} selector
	     * @param {String} type
	     * @param {Function} callback
	     * @return {Function}
	     */
	    function listener(element, selector, type, callback) {
	        return function(e) {
	            e.delegateTarget = closest(e.target, selector);

	            if (e.delegateTarget) {
	                callback.call(element, e);
	            }
	        }
	    }

	    module.exports = delegate;


	    /***/ }),

	    /***/ 879:
	    /***/ (function(__unused_webpack_module, exports) {

	    /**
	     * Check if argument is a HTML element.
	     *
	     * @param {Object} value
	     * @return {Boolean}
	     */
	    exports.node = function(value) {
	        return value !== undefined
	            && value instanceof HTMLElement
	            && value.nodeType === 1;
	    };

	    /**
	     * Check if argument is a list of HTML elements.
	     *
	     * @param {Object} value
	     * @return {Boolean}
	     */
	    exports.nodeList = function(value) {
	        var type = Object.prototype.toString.call(value);

	        return value !== undefined
	            && (type === '[object NodeList]' || type === '[object HTMLCollection]')
	            && ('length' in value)
	            && (value.length === 0 || exports.node(value[0]));
	    };

	    /**
	     * Check if argument is a string.
	     *
	     * @param {Object} value
	     * @return {Boolean}
	     */
	    exports.string = function(value) {
	        return typeof value === 'string'
	            || value instanceof String;
	    };

	    /**
	     * Check if argument is a function.
	     *
	     * @param {Object} value
	     * @return {Boolean}
	     */
	    exports.fn = function(value) {
	        var type = Object.prototype.toString.call(value);

	        return type === '[object Function]';
	    };


	    /***/ }),

	    /***/ 370:
	    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {

	    var is = __webpack_require__(879);
	    var delegate = __webpack_require__(438);

	    /**
	     * Validates all params and calls the right
	     * listener function based on its target type.
	     *
	     * @param {String|HTMLElement|HTMLCollection|NodeList} target
	     * @param {String} type
	     * @param {Function} callback
	     * @return {Object}
	     */
	    function listen(target, type, callback) {
	        if (!target && !type && !callback) {
	            throw new Error('Missing required arguments');
	        }

	        if (!is.string(type)) {
	            throw new TypeError('Second argument must be a String');
	        }

	        if (!is.fn(callback)) {
	            throw new TypeError('Third argument must be a Function');
	        }

	        if (is.node(target)) {
	            return listenNode(target, type, callback);
	        }
	        else if (is.nodeList(target)) {
	            return listenNodeList(target, type, callback);
	        }
	        else if (is.string(target)) {
	            return listenSelector(target, type, callback);
	        }
	        else {
	            throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
	        }
	    }

	    /**
	     * Adds an event listener to a HTML element
	     * and returns a remove listener function.
	     *
	     * @param {HTMLElement} node
	     * @param {String} type
	     * @param {Function} callback
	     * @return {Object}
	     */
	    function listenNode(node, type, callback) {
	        node.addEventListener(type, callback);

	        return {
	            destroy: function() {
	                node.removeEventListener(type, callback);
	            }
	        }
	    }

	    /**
	     * Add an event listener to a list of HTML elements
	     * and returns a remove listener function.
	     *
	     * @param {NodeList|HTMLCollection} nodeList
	     * @param {String} type
	     * @param {Function} callback
	     * @return {Object}
	     */
	    function listenNodeList(nodeList, type, callback) {
	        Array.prototype.forEach.call(nodeList, function(node) {
	            node.addEventListener(type, callback);
	        });

	        return {
	            destroy: function() {
	                Array.prototype.forEach.call(nodeList, function(node) {
	                    node.removeEventListener(type, callback);
	                });
	            }
	        }
	    }

	    /**
	     * Add an event listener to a selector
	     * and returns a remove listener function.
	     *
	     * @param {String} selector
	     * @param {String} type
	     * @param {Function} callback
	     * @return {Object}
	     */
	    function listenSelector(selector, type, callback) {
	        return delegate(document.body, selector, type, callback);
	    }

	    module.exports = listen;


	    /***/ }),

	    /***/ 817:
	    /***/ (function(module) {

	    function select(element) {
	        var selectedText;

	        if (element.nodeName === 'SELECT') {
	            element.focus();

	            selectedText = element.value;
	        }
	        else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
	            var isReadOnly = element.hasAttribute('readonly');

	            if (!isReadOnly) {
	                element.setAttribute('readonly', '');
	            }

	            element.select();
	            element.setSelectionRange(0, element.value.length);

	            if (!isReadOnly) {
	                element.removeAttribute('readonly');
	            }

	            selectedText = element.value;
	        }
	        else {
	            if (element.hasAttribute('contenteditable')) {
	                element.focus();
	            }

	            var selection = window.getSelection();
	            var range = document.createRange();

	            range.selectNodeContents(element);
	            selection.removeAllRanges();
	            selection.addRange(range);

	            selectedText = selection.toString();
	        }

	        return selectedText;
	    }

	    module.exports = select;


	    /***/ }),

	    /***/ 279:
	    /***/ (function(module) {

	    function E () {
	      // Keep this empty so it's easier to inherit from
	      // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
	    }

	    E.prototype = {
	      on: function (name, callback, ctx) {
	        var e = this.e || (this.e = {});

	        (e[name] || (e[name] = [])).push({
	          fn: callback,
	          ctx: ctx
	        });

	        return this;
	      },

	      once: function (name, callback, ctx) {
	        var self = this;
	        function listener () {
	          self.off(name, listener);
	          callback.apply(ctx, arguments);
	        }
	        listener._ = callback;
	        return this.on(name, listener, ctx);
	      },

	      emit: function (name) {
	        var data = [].slice.call(arguments, 1);
	        var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
	        var i = 0;
	        var len = evtArr.length;

	        for (i; i < len; i++) {
	          evtArr[i].fn.apply(evtArr[i].ctx, data);
	        }

	        return this;
	      },

	      off: function (name, callback) {
	        var e = this.e || (this.e = {});
	        var evts = e[name];
	        var liveEvents = [];

	        if (evts && callback) {
	          for (var i = 0, len = evts.length; i < len; i++) {
	            if (evts[i].fn !== callback && evts[i].fn._ !== callback)
	              liveEvents.push(evts[i]);
	          }
	        }

	        // Remove event from queue to prevent memory leak
	        // Suggested by https://github.com/lazd
	        // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

	        (liveEvents.length)
	          ? e[name] = liveEvents
	          : delete e[name];

	        return this;
	      }
	    };

	    module.exports = E;
	    module.exports.TinyEmitter = E;


	    /***/ })

	    /******/ 	});
	    /************************************************************************/
	    /******/ 	// The module cache
	    /******/ 	var __webpack_module_cache__ = {};
	    /******/ 	
	    /******/ 	// The require function
	    /******/ 	function __webpack_require__(moduleId) {
	    /******/ 		// Check if module is in cache
	    /******/ 		if(__webpack_module_cache__[moduleId]) {
	    /******/ 			return __webpack_module_cache__[moduleId].exports;
	    /******/ 		}
	    /******/ 		// Create a new module (and put it into the cache)
	    /******/ 		var module = __webpack_module_cache__[moduleId] = {
	    /******/ 			// no module.id needed
	    /******/ 			// no module.loaded needed
	    /******/ 			exports: {}
	    /******/ 		};
	    /******/ 	
	    /******/ 		// Execute the module function
	    /******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
	    /******/ 	
	    /******/ 		// Return the exports of the module
	    /******/ 		return module.exports;
	    /******/ 	}
	    /******/ 	
	    /************************************************************************/
	    /******/ 	/* webpack/runtime/compat get default export */
	    /******/ 	!function() {
	    /******/ 		// getDefaultExport function for compatibility with non-harmony modules
	    /******/ 		__webpack_require__.n = function(module) {
	    /******/ 			var getter = module && module.__esModule ?
	    /******/ 				function() { return module['default']; } :
	    /******/ 				function() { return module; };
	    /******/ 			__webpack_require__.d(getter, { a: getter });
	    /******/ 			return getter;
	    /******/ 		};
	    /******/ 	}();
	    /******/ 	
	    /******/ 	/* webpack/runtime/define property getters */
	    /******/ 	!function() {
	    /******/ 		// define getter functions for harmony exports
	    /******/ 		__webpack_require__.d = function(exports, definition) {
	    /******/ 			for(var key in definition) {
	    /******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
	    /******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
	    /******/ 				}
	    /******/ 			}
	    /******/ 		};
	    /******/ 	}();
	    /******/ 	
	    /******/ 	/* webpack/runtime/hasOwnProperty shorthand */
	    /******/ 	!function() {
	    /******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); };
	    /******/ 	}();
	    /******/ 	
	    /************************************************************************/
	    /******/ 	// module exports must be returned from runtime so entry inlining is disabled
	    /******/ 	// startup
	    /******/ 	// Load entry module and return exports
	    /******/ 	return __webpack_require__(134);
	    /******/ })()
	    .default;
	    });
	    });

	    var Clipboard = unwrapExports(clipboard);

	    /* os-app/dev-launcher/recipes/actions/LCHCopyToClipboard/main.svelte generated by Svelte v3.38.2 */
	    const file = "os-app/dev-launcher/recipes/actions/LCHCopyToClipboard/main.svelte";

	    function create_fragment(ctx) {
	    	let button;
	    	let t_value = /*OLSKLocalized*/ ctx[1]("LCHCopyToClipboardButtonText") + "";
	    	let t;

	    	const block = {
	    		c: function create() {
	    			button = element("button");
	    			t = text(t_value);
	    			attr_dev(button, "class", "LCHCopyToClipboardButton");
	    			attr_dev(button, "data-clipboard-text", /*inputData*/ ctx[0]);
	    			add_location(button, file, 52, 0, 895);
	    		},
	    		l: function claim(nodes) {
	    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    		},
	    		m: function mount(target, anchor) {
	    			insert_dev(target, button, anchor);
	    			append_dev(button, t);
	    			/*button_binding*/ ctx[4](button);
	    		},
	    		p: function update(ctx, [dirty]) {
	    			if (dirty & /*OLSKLocalized*/ 2 && t_value !== (t_value = /*OLSKLocalized*/ ctx[1]("LCHCopyToClipboardButtonText") + "")) set_data_dev(t, t_value);

	    			if (dirty & /*inputData*/ 1) {
	    				attr_dev(button, "data-clipboard-text", /*inputData*/ ctx[0]);
	    			}
	    		},
	    		i: noop,
	    		o: noop,
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(button);
	    			/*button_binding*/ ctx[4](null);
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_fragment.name,
	    		type: "component",
	    		source: "",
	    		ctx
	    	});

	    	return block;
	    }

	    function instance($$self, $$props, $$invalidate) {
	    	let { $$slots: slots = {}, $$scope } = $$props;
	    	validate_slots("Main", slots, []);
	    	let { inputData } = $$props;
	    	let { LCHCopyToClipboardCompletionHandler } = $$props;
	    	let { OLSKLocalized } = $$props;
	    	let clipboardButton, clipboard;
	    	let _didComplete = false;

	    	function didComplete() {
	    		if (_didComplete) {
	    			return;
	    		}

	    		clipboard.destroy();
	    		LCHCopyToClipboardCompletionHandler();
	    		_didComplete = true;
	    	}

	    	onMount(function () {
	    		clipboard = new Clipboard(clipboardButton);

	    		clipboard.on("success", function (e) {
	    			// console.log('success', e);
	    			didComplete();
	    		});

	    		clipboard.on("error", function (e) {
	    			// console.log('error', e);
	    			didComplete();
	    		});

	    		clipboardButton.addEventListener("click", function (e) {
	    			// console.log('click', e);
	    			didComplete();
	    		});

	    		clipboardButton.focus();

	    		if (main_1()) {
	    			return;
	    		}

	    		clipboardButton.click();
	    	});

	    	const writable_props = ["inputData", "LCHCopyToClipboardCompletionHandler", "OLSKLocalized"];

	    	Object.keys($$props).forEach(key => {
	    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Main> was created with unknown prop '${key}'`);
	    	});

	    	function button_binding($$value) {
	    		binding_callbacks[$$value ? "unshift" : "push"](() => {
	    			clipboardButton = $$value;
	    			$$invalidate(2, clipboardButton);
	    		});
	    	}

	    	$$self.$$set = $$props => {
	    		if ("inputData" in $$props) $$invalidate(0, inputData = $$props.inputData);
	    		if ("LCHCopyToClipboardCompletionHandler" in $$props) $$invalidate(3, LCHCopyToClipboardCompletionHandler = $$props.LCHCopyToClipboardCompletionHandler);
	    		if ("OLSKLocalized" in $$props) $$invalidate(1, OLSKLocalized = $$props.OLSKLocalized);
	    	};

	    	$$self.$capture_state = () => ({
	    		inputData,
	    		LCHCopyToClipboardCompletionHandler,
	    		OLSKLocalized,
	    		OLSK_SPEC_UI: main_1,
	    		onMount,
	    		Clipboard,
	    		clipboardButton,
	    		clipboard,
	    		_didComplete,
	    		didComplete
	    	});

	    	$$self.$inject_state = $$props => {
	    		if ("inputData" in $$props) $$invalidate(0, inputData = $$props.inputData);
	    		if ("LCHCopyToClipboardCompletionHandler" in $$props) $$invalidate(3, LCHCopyToClipboardCompletionHandler = $$props.LCHCopyToClipboardCompletionHandler);
	    		if ("OLSKLocalized" in $$props) $$invalidate(1, OLSKLocalized = $$props.OLSKLocalized);
	    		if ("clipboardButton" in $$props) $$invalidate(2, clipboardButton = $$props.clipboardButton);
	    		if ("clipboard" in $$props) clipboard = $$props.clipboard;
	    		if ("_didComplete" in $$props) _didComplete = $$props._didComplete;
	    	};

	    	if ($$props && "$$inject" in $$props) {
	    		$$self.$inject_state($$props.$$inject);
	    	}

	    	return [
	    		inputData,
	    		OLSKLocalized,
	    		clipboardButton,
	    		LCHCopyToClipboardCompletionHandler,
	    		button_binding
	    	];
	    }

	    class Main extends SvelteComponentDev {
	    	constructor(options) {
	    		super(options);

	    		init(this, options, instance, create_fragment, safe_not_equal, {
	    			inputData: 0,
	    			LCHCopyToClipboardCompletionHandler: 3,
	    			OLSKLocalized: 1
	    		});

	    		dispatch_dev("SvelteRegisterComponent", {
	    			component: this,
	    			tagName: "Main",
	    			options,
	    			id: create_fragment.name
	    		});

	    		const { ctx } = this.$$;
	    		const props = options.props || {};

	    		if (/*inputData*/ ctx[0] === undefined && !("inputData" in props)) {
	    			console.warn("<Main> was created without expected prop 'inputData'");
	    		}

	    		if (/*LCHCopyToClipboardCompletionHandler*/ ctx[3] === undefined && !("LCHCopyToClipboardCompletionHandler" in props)) {
	    			console.warn("<Main> was created without expected prop 'LCHCopyToClipboardCompletionHandler'");
	    		}

	    		if (/*OLSKLocalized*/ ctx[1] === undefined && !("OLSKLocalized" in props)) {
	    			console.warn("<Main> was created without expected prop 'OLSKLocalized'");
	    		}
	    	}

	    	get inputData() {
	    		throw new Error("<Main>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	set inputData(value) {
	    		throw new Error("<Main>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	get LCHCopyToClipboardCompletionHandler() {
	    		throw new Error("<Main>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	set LCHCopyToClipboardCompletionHandler(value) {
	    		throw new Error("<Main>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	get OLSKLocalized() {
	    		throw new Error("<Main>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	set OLSKLocalized(value) {
	    		throw new Error("<Main>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}
	    }

	    const LCHCopyToClipboard$1 = Main;

	    var apiComponents = /*#__PURE__*/Object.freeze({
	        LCHCopyToClipboard: LCHCopyToClipboard$1
	    });

	    var uiLogic = createCommonjsModule(function (module, exports) {
	    const mod = {

	    	OLSKResultsConstrainIndex (param1, param2) {
	    		if (!Array.isArray(param1)) {
	    			throw new Error('OLSKErrorInputNotValid');
	    		}

	    		if (typeof param2 !== 'number') {
	    			throw new Error('OLSKErrorInputNotValid');
	    		}

	    		if (param2 < 0) {
	    			return param1.length - 1;
	    		}

	    		if (param2 >= param1.length) {
	    			return 0;
	    		}

	    		return param2;
	    	},

	    };

	    Object.assign(exports, mod);
	    });

	    /* node_modules/OLSKResults/main.svelte generated by Svelte v3.38.2 */
	    const file$1 = "node_modules/OLSKResults/main.svelte";

	    const get_OLSKResultsEmpty_slot_changes = dirty => ({
	    	OLSKResultsListItem: dirty & /*OLSKResultsListItems*/ 1
	    });

	    const get_OLSKResultsEmpty_slot_context = ctx => ({ OLSKResultsListItem: /*e*/ ctx[10] });

	    function get_each_context(ctx, list, i) {
	    	const child_ctx = ctx.slice();
	    	child_ctx[10] = list[i];
	    	return child_ctx;
	    }

	    const get_default_slot_changes = dirty => ({
	    	OLSKResultsListItem: dirty & /*OLSKResultsListItems*/ 1
	    });

	    const get_default_slot_context = ctx => ({ OLSKResultsListItem: /*e*/ ctx[10] });

	    // (72:0) {:else}
	    function create_else_block(ctx) {
	    	let div;
	    	let current;
	    	const OLSKResultsEmpty_slot_template = /*#slots*/ ctx[8].OLSKResultsEmpty;
	    	const OLSKResultsEmpty_slot = create_slot(OLSKResultsEmpty_slot_template, ctx, /*$$scope*/ ctx[7], get_OLSKResultsEmpty_slot_context);

	    	const block = {
	    		c: function create() {
	    			div = element("div");
	    			if (OLSKResultsEmpty_slot) OLSKResultsEmpty_slot.c();
	    			attr_dev(div, "class", "OLSKResultsEmpty");
	    			add_location(div, file$1, 72, 1, 1765);
	    		},
	    		m: function mount(target, anchor) {
	    			insert_dev(target, div, anchor);

	    			if (OLSKResultsEmpty_slot) {
	    				OLSKResultsEmpty_slot.m(div, null);
	    			}

	    			current = true;
	    		},
	    		p: function update(ctx, dirty) {
	    			if (OLSKResultsEmpty_slot) {
	    				if (OLSKResultsEmpty_slot.p && (!current || dirty & /*$$scope, OLSKResultsListItems*/ 129)) {
	    					update_slot(OLSKResultsEmpty_slot, OLSKResultsEmpty_slot_template, ctx, /*$$scope*/ ctx[7], dirty, get_OLSKResultsEmpty_slot_changes, get_OLSKResultsEmpty_slot_context);
	    				}
	    			}
	    		},
	    		i: function intro(local) {
	    			if (current) return;
	    			transition_in(OLSKResultsEmpty_slot, local);
	    			current = true;
	    		},
	    		o: function outro(local) {
	    			transition_out(OLSKResultsEmpty_slot, local);
	    			current = false;
	    		},
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(div);
	    			if (OLSKResultsEmpty_slot) OLSKResultsEmpty_slot.d(detaching);
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_else_block.name,
	    		type: "else",
	    		source: "(72:0) {:else}",
	    		ctx
	    	});

	    	return block;
	    }

	    // (64:0) {#if OLSKResultsListItems.length}
	    function create_if_block(ctx) {
	    	let div;
	    	let current;
	    	let each_value = /*OLSKResultsListItems*/ ctx[0];
	    	validate_each_argument(each_value);
	    	let each_blocks = [];

	    	for (let i = 0; i < each_value.length; i += 1) {
	    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	    	}

	    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
	    		each_blocks[i] = null;
	    	});

	    	const block = {
	    		c: function create() {
	    			div = element("div");

	    			for (let i = 0; i < each_blocks.length; i += 1) {
	    				each_blocks[i].c();
	    			}

	    			attr_dev(div, "class", "OLSKResultsList");
	    			add_location(div, file$1, 64, 1, 1462);
	    		},
	    		m: function mount(target, anchor) {
	    			insert_dev(target, div, anchor);

	    			for (let i = 0; i < each_blocks.length; i += 1) {
	    				each_blocks[i].m(div, null);
	    			}

	    			current = true;
	    		},
	    		p: function update(ctx, dirty) {
	    			if (dirty & /*OLSKResultsListItems, OLSKResultsListItemSelected, OLSKResultsDispatchClick, $$scope*/ 135) {
	    				each_value = /*OLSKResultsListItems*/ ctx[0];
	    				validate_each_argument(each_value);
	    				let i;

	    				for (i = 0; i < each_value.length; i += 1) {
	    					const child_ctx = get_each_context(ctx, each_value, i);

	    					if (each_blocks[i]) {
	    						each_blocks[i].p(child_ctx, dirty);
	    						transition_in(each_blocks[i], 1);
	    					} else {
	    						each_blocks[i] = create_each_block(child_ctx);
	    						each_blocks[i].c();
	    						transition_in(each_blocks[i], 1);
	    						each_blocks[i].m(div, null);
	    					}
	    				}

	    				group_outros();

	    				for (i = each_value.length; i < each_blocks.length; i += 1) {
	    					out(i);
	    				}

	    				check_outros();
	    			}
	    		},
	    		i: function intro(local) {
	    			if (current) return;

	    			for (let i = 0; i < each_value.length; i += 1) {
	    				transition_in(each_blocks[i]);
	    			}

	    			current = true;
	    		},
	    		o: function outro(local) {
	    			each_blocks = each_blocks.filter(Boolean);

	    			for (let i = 0; i < each_blocks.length; i += 1) {
	    				transition_out(each_blocks[i]);
	    			}

	    			current = false;
	    		},
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(div);
	    			destroy_each(each_blocks, detaching);
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_if_block.name,
	    		type: "if",
	    		source: "(64:0) {#if OLSKResultsListItems.length}",
	    		ctx
	    	});

	    	return block;
	    }

	    // (66:2) {#each OLSKResultsListItems as e}
	    function create_each_block(ctx) {
	    	let div;
	    	let t;
	    	let current;
	    	let mounted;
	    	let dispose;
	    	const default_slot_template = /*#slots*/ ctx[8].default;
	    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], get_default_slot_context);

	    	function click_handler() {
	    		return /*click_handler*/ ctx[9](/*e*/ ctx[10]);
	    	}

	    	const block = {
	    		c: function create() {
	    			div = element("div");
	    			if (default_slot) default_slot.c();
	    			t = space();
	    			attr_dev(div, "class", "OLSKResultsListItem svelte-617v38");
	    			toggle_class(div, "OLSKResultsListItemSelected", /*e*/ ctx[10] === /*OLSKResultsListItemSelected*/ ctx[1]);
	    			add_location(div, file$1, 66, 3, 1531);
	    		},
	    		m: function mount(target, anchor) {
	    			insert_dev(target, div, anchor);

	    			if (default_slot) {
	    				default_slot.m(div, null);
	    			}

	    			append_dev(div, t);
	    			current = true;

	    			if (!mounted) {
	    				dispose = listen_dev(div, "click", click_handler, false, false, false);
	    				mounted = true;
	    			}
	    		},
	    		p: function update(new_ctx, dirty) {
	    			ctx = new_ctx;

	    			if (default_slot) {
	    				if (default_slot.p && (!current || dirty & /*$$scope, OLSKResultsListItems*/ 129)) {
	    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[7], dirty, get_default_slot_changes, get_default_slot_context);
	    				}
	    			}

	    			if (dirty & /*OLSKResultsListItems, OLSKResultsListItemSelected*/ 3) {
	    				toggle_class(div, "OLSKResultsListItemSelected", /*e*/ ctx[10] === /*OLSKResultsListItemSelected*/ ctx[1]);
	    			}
	    		},
	    		i: function intro(local) {
	    			if (current) return;
	    			transition_in(default_slot, local);
	    			current = true;
	    		},
	    		o: function outro(local) {
	    			transition_out(default_slot, local);
	    			current = false;
	    		},
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(div);
	    			if (default_slot) default_slot.d(detaching);
	    			mounted = false;
	    			dispose();
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_each_block.name,
	    		type: "each",
	    		source: "(66:2) {#each OLSKResultsListItems as e}",
	    		ctx
	    	});

	    	return block;
	    }

	    function create_fragment$1(ctx) {
	    	let div;
	    	let current_block_type_index;
	    	let if_block;
	    	let current;
	    	let mounted;
	    	let dispose;
	    	const if_block_creators = [create_if_block, create_else_block];
	    	const if_blocks = [];

	    	function select_block_type(ctx, dirty) {
	    		if (/*OLSKResultsListItems*/ ctx[0].length) return 0;
	    		return 1;
	    	}

	    	current_block_type_index = select_block_type(ctx);
	    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	    	const block = {
	    		c: function create() {
	    			div = element("div");
	    			if_block.c();
	    			attr_dev(div, "class", "OLSKResults");
	    			add_location(div, file$1, 61, 0, 1400);
	    		},
	    		l: function claim(nodes) {
	    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    		},
	    		m: function mount(target, anchor) {
	    			insert_dev(target, div, anchor);
	    			if_blocks[current_block_type_index].m(div, null);
	    			current = true;

	    			if (!mounted) {
	    				dispose = listen_dev(window, "keydown", /*mod*/ ctx[3].InterfaceWindowDidKeydown, false, false, false);
	    				mounted = true;
	    			}
	    		},
	    		p: function update(ctx, [dirty]) {
	    			let previous_block_index = current_block_type_index;
	    			current_block_type_index = select_block_type(ctx);

	    			if (current_block_type_index === previous_block_index) {
	    				if_blocks[current_block_type_index].p(ctx, dirty);
	    			} else {
	    				group_outros();

	    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
	    					if_blocks[previous_block_index] = null;
	    				});

	    				check_outros();
	    				if_block = if_blocks[current_block_type_index];

	    				if (!if_block) {
	    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	    					if_block.c();
	    				} else {
	    					if_block.p(ctx, dirty);
	    				}

	    				transition_in(if_block, 1);
	    				if_block.m(div, null);
	    			}
	    		},
	    		i: function intro(local) {
	    			if (current) return;
	    			transition_in(if_block);
	    			current = true;
	    		},
	    		o: function outro(local) {
	    			transition_out(if_block);
	    			current = false;
	    		},
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(div);
	    			if_blocks[current_block_type_index].d();
	    			mounted = false;
	    			dispose();
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_fragment$1.name,
	    		type: "component",
	    		source: "",
	    		ctx
	    	});

	    	return block;
	    }

	    function instance$1($$self, $$props, $$invalidate) {
	    	let { $$slots: slots = {}, $$scope } = $$props;
	    	validate_slots("Main", slots, ['default','OLSKResultsEmpty']);
	    	let { OLSKResultsListItems } = $$props;
	    	let { OLSKResultsListItemSelected } = $$props;
	    	let { OLSKResultsDispatchArrow } = $$props;
	    	let { OLSKResultsDispatchClick } = $$props;
	    	let { OLSKResultsEnableLooping = false } = $$props;
	    	let { OLSKResultsIgnoreKeyboard = false } = $$props;

	    	const mod = {
	    		// INTERFACE
	    		InterfaceWindowDidKeydown(event) {
	    			if (OLSKResultsIgnoreKeyboard) {
	    				return;
	    			}

	    			if (!OLSKResultsListItems.length) {
	    				return;
	    			}

	    			const handlerFunctions = {
	    				ArrowUp() {
	    					(function () {
	    						if (!OLSKResultsEnableLooping && OLSKResultsListItems[0] === OLSKResultsListItemSelected) {
	    							return;
	    						}

	    						mod.ControlArrowIncrement(-1);
	    					})();

	    					return event.preventDefault();
	    				},
	    				ArrowDown() {
	    					(function () {
	    						if (!OLSKResultsEnableLooping && OLSKResultsListItems.slice(-1).pop() === OLSKResultsListItemSelected) {
	    							return;
	    						}

	    						mod.ControlArrowIncrement(1);
	    					})();

	    					return event.preventDefault();
	    				}
	    			};

	    			handlerFunctions[event.code] && handlerFunctions[event.code]();
	    		},
	    		// CONTROL
	    		ControlArrowIncrement(inputData) {
	    			OLSKResultsDispatchArrow(OLSKResultsListItems[uiLogic.OLSKResultsConstrainIndex(OLSKResultsListItems, OLSKResultsListItems.indexOf(OLSKResultsListItemSelected) + inputData)]);
	    		}
	    	};

	    	const writable_props = [
	    		"OLSKResultsListItems",
	    		"OLSKResultsListItemSelected",
	    		"OLSKResultsDispatchArrow",
	    		"OLSKResultsDispatchClick",
	    		"OLSKResultsEnableLooping",
	    		"OLSKResultsIgnoreKeyboard"
	    	];

	    	Object.keys($$props).forEach(key => {
	    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Main> was created with unknown prop '${key}'`);
	    	});

	    	const click_handler = e => OLSKResultsDispatchClick(e);

	    	$$self.$$set = $$props => {
	    		if ("OLSKResultsListItems" in $$props) $$invalidate(0, OLSKResultsListItems = $$props.OLSKResultsListItems);
	    		if ("OLSKResultsListItemSelected" in $$props) $$invalidate(1, OLSKResultsListItemSelected = $$props.OLSKResultsListItemSelected);
	    		if ("OLSKResultsDispatchArrow" in $$props) $$invalidate(4, OLSKResultsDispatchArrow = $$props.OLSKResultsDispatchArrow);
	    		if ("OLSKResultsDispatchClick" in $$props) $$invalidate(2, OLSKResultsDispatchClick = $$props.OLSKResultsDispatchClick);
	    		if ("OLSKResultsEnableLooping" in $$props) $$invalidate(5, OLSKResultsEnableLooping = $$props.OLSKResultsEnableLooping);
	    		if ("OLSKResultsIgnoreKeyboard" in $$props) $$invalidate(6, OLSKResultsIgnoreKeyboard = $$props.OLSKResultsIgnoreKeyboard);
	    		if ("$$scope" in $$props) $$invalidate(7, $$scope = $$props.$$scope);
	    	};

	    	$$self.$capture_state = () => ({
	    		OLSKResultsListItems,
	    		OLSKResultsListItemSelected,
	    		OLSKResultsDispatchArrow,
	    		OLSKResultsDispatchClick,
	    		OLSKResultsEnableLooping,
	    		OLSKResultsIgnoreKeyboard,
	    		OLSKResultsLogic: uiLogic,
	    		mod
	    	});

	    	$$self.$inject_state = $$props => {
	    		if ("OLSKResultsListItems" in $$props) $$invalidate(0, OLSKResultsListItems = $$props.OLSKResultsListItems);
	    		if ("OLSKResultsListItemSelected" in $$props) $$invalidate(1, OLSKResultsListItemSelected = $$props.OLSKResultsListItemSelected);
	    		if ("OLSKResultsDispatchArrow" in $$props) $$invalidate(4, OLSKResultsDispatchArrow = $$props.OLSKResultsDispatchArrow);
	    		if ("OLSKResultsDispatchClick" in $$props) $$invalidate(2, OLSKResultsDispatchClick = $$props.OLSKResultsDispatchClick);
	    		if ("OLSKResultsEnableLooping" in $$props) $$invalidate(5, OLSKResultsEnableLooping = $$props.OLSKResultsEnableLooping);
	    		if ("OLSKResultsIgnoreKeyboard" in $$props) $$invalidate(6, OLSKResultsIgnoreKeyboard = $$props.OLSKResultsIgnoreKeyboard);
	    	};

	    	if ($$props && "$$inject" in $$props) {
	    		$$self.$inject_state($$props.$$inject);
	    	}

	    	return [
	    		OLSKResultsListItems,
	    		OLSKResultsListItemSelected,
	    		OLSKResultsDispatchClick,
	    		mod,
	    		OLSKResultsDispatchArrow,
	    		OLSKResultsEnableLooping,
	    		OLSKResultsIgnoreKeyboard,
	    		$$scope,
	    		slots,
	    		click_handler
	    	];
	    }

	    class Main$1 extends SvelteComponentDev {
	    	constructor(options) {
	    		super(options);

	    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
	    			OLSKResultsListItems: 0,
	    			OLSKResultsListItemSelected: 1,
	    			OLSKResultsDispatchArrow: 4,
	    			OLSKResultsDispatchClick: 2,
	    			OLSKResultsEnableLooping: 5,
	    			OLSKResultsIgnoreKeyboard: 6
	    		});

	    		dispatch_dev("SvelteRegisterComponent", {
	    			component: this,
	    			tagName: "Main",
	    			options,
	    			id: create_fragment$1.name
	    		});

	    		const { ctx } = this.$$;
	    		const props = options.props || {};

	    		if (/*OLSKResultsListItems*/ ctx[0] === undefined && !("OLSKResultsListItems" in props)) {
	    			console.warn("<Main> was created without expected prop 'OLSKResultsListItems'");
	    		}

	    		if (/*OLSKResultsListItemSelected*/ ctx[1] === undefined && !("OLSKResultsListItemSelected" in props)) {
	    			console.warn("<Main> was created without expected prop 'OLSKResultsListItemSelected'");
	    		}

	    		if (/*OLSKResultsDispatchArrow*/ ctx[4] === undefined && !("OLSKResultsDispatchArrow" in props)) {
	    			console.warn("<Main> was created without expected prop 'OLSKResultsDispatchArrow'");
	    		}

	    		if (/*OLSKResultsDispatchClick*/ ctx[2] === undefined && !("OLSKResultsDispatchClick" in props)) {
	    			console.warn("<Main> was created without expected prop 'OLSKResultsDispatchClick'");
	    		}
	    	}

	    	get OLSKResultsListItems() {
	    		throw new Error("<Main>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	set OLSKResultsListItems(value) {
	    		throw new Error("<Main>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	get OLSKResultsListItemSelected() {
	    		throw new Error("<Main>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	set OLSKResultsListItemSelected(value) {
	    		throw new Error("<Main>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	get OLSKResultsDispatchArrow() {
	    		throw new Error("<Main>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	set OLSKResultsDispatchArrow(value) {
	    		throw new Error("<Main>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	get OLSKResultsDispatchClick() {
	    		throw new Error("<Main>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	set OLSKResultsDispatchClick(value) {
	    		throw new Error("<Main>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	get OLSKResultsEnableLooping() {
	    		throw new Error("<Main>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	set OLSKResultsEnableLooping(value) {
	    		throw new Error("<Main>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	get OLSKResultsIgnoreKeyboard() {
	    		throw new Error("<Main>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	set OLSKResultsIgnoreKeyboard(value) {
	    		throw new Error("<Main>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}
	    }

	    /* os-app/dev-launcher/submodules/LCHLauncherPipeItem/main.svelte generated by Svelte v3.38.2 */

	    const file$2 = "os-app/dev-launcher/submodules/LCHLauncherPipeItem/main.svelte";

	    // (10:1) {#if PipeItemSubtitle}
	    function create_if_block_1(ctx) {
	    	let br;
	    	let t0;
	    	let span;
	    	let t1;

	    	const block = {
	    		c: function create() {
	    			br = element("br");
	    			t0 = space();
	    			span = element("span");
	    			t1 = text(/*PipeItemSubtitle*/ ctx[1]);
	    			add_location(br, file$2, 10, 2, 244);
	    			attr_dev(span, "class", "LCHLauncherPipeItemSubtitle svelte-1u2sunx");
	    			add_location(span, file$2, 11, 2, 251);
	    		},
	    		m: function mount(target, anchor) {
	    			insert_dev(target, br, anchor);
	    			insert_dev(target, t0, anchor);
	    			insert_dev(target, span, anchor);
	    			append_dev(span, t1);
	    		},
	    		p: function update(ctx, dirty) {
	    			if (dirty & /*PipeItemSubtitle*/ 2) set_data_dev(t1, /*PipeItemSubtitle*/ ctx[1]);
	    		},
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(br);
	    			if (detaching) detach_dev(t0);
	    			if (detaching) detach_dev(span);
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_if_block_1.name,
	    		type: "if",
	    		source: "(10:1) {#if PipeItemSubtitle}",
	    		ctx
	    	});

	    	return block;
	    }

	    // (15:1) {#if PipeItemSource}
	    function create_if_block$1(ctx) {
	    	let br;
	    	let t0;
	    	let span;
	    	let t1;

	    	const block = {
	    		c: function create() {
	    			br = element("br");
	    			t0 = space();
	    			span = element("span");
	    			t1 = text(/*PipeItemSource*/ ctx[2]);
	    			add_location(br, file$2, 15, 2, 354);
	    			attr_dev(span, "class", "LCHLauncherPipeItemSource svelte-1u2sunx");
	    			add_location(span, file$2, 16, 2, 361);
	    		},
	    		m: function mount(target, anchor) {
	    			insert_dev(target, br, anchor);
	    			insert_dev(target, t0, anchor);
	    			insert_dev(target, span, anchor);
	    			append_dev(span, t1);
	    		},
	    		p: function update(ctx, dirty) {
	    			if (dirty & /*PipeItemSource*/ 4) set_data_dev(t1, /*PipeItemSource*/ ctx[2]);
	    		},
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(br);
	    			if (detaching) detach_dev(t0);
	    			if (detaching) detach_dev(span);
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_if_block$1.name,
	    		type: "if",
	    		source: "(15:1) {#if PipeItemSource}",
	    		ctx
	    	});

	    	return block;
	    }

	    function create_fragment$2(ctx) {
	    	let div;
	    	let span;
	    	let t0;
	    	let t1;
	    	let t2;
	    	let if_block0 = /*PipeItemSubtitle*/ ctx[1] && create_if_block_1(ctx);
	    	let if_block1 = /*PipeItemSource*/ ctx[2] && create_if_block$1(ctx);

	    	const block = {
	    		c: function create() {
	    			div = element("div");
	    			span = element("span");
	    			t0 = text(/*PipeItemTitle*/ ctx[0]);
	    			t1 = space();
	    			if (if_block0) if_block0.c();
	    			t2 = space();
	    			if (if_block1) if_block1.c();
	    			attr_dev(span, "class", "LCHLauncherPipeItemTitle");
	    			add_location(span, file$2, 7, 1, 152);
	    			attr_dev(div, "class", "LCHLauncherPipeItem svelte-1u2sunx");
	    			add_location(div, file$2, 6, 0, 117);
	    		},
	    		l: function claim(nodes) {
	    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    		},
	    		m: function mount(target, anchor) {
	    			insert_dev(target, div, anchor);
	    			append_dev(div, span);
	    			append_dev(span, t0);
	    			append_dev(div, t1);
	    			if (if_block0) if_block0.m(div, null);
	    			append_dev(div, t2);
	    			if (if_block1) if_block1.m(div, null);
	    		},
	    		p: function update(ctx, [dirty]) {
	    			if (dirty & /*PipeItemTitle*/ 1) set_data_dev(t0, /*PipeItemTitle*/ ctx[0]);

	    			if (/*PipeItemSubtitle*/ ctx[1]) {
	    				if (if_block0) {
	    					if_block0.p(ctx, dirty);
	    				} else {
	    					if_block0 = create_if_block_1(ctx);
	    					if_block0.c();
	    					if_block0.m(div, t2);
	    				}
	    			} else if (if_block0) {
	    				if_block0.d(1);
	    				if_block0 = null;
	    			}

	    			if (/*PipeItemSource*/ ctx[2]) {
	    				if (if_block1) {
	    					if_block1.p(ctx, dirty);
	    				} else {
	    					if_block1 = create_if_block$1(ctx);
	    					if_block1.c();
	    					if_block1.m(div, null);
	    				}
	    			} else if (if_block1) {
	    				if_block1.d(1);
	    				if_block1 = null;
	    			}
	    		},
	    		i: noop,
	    		o: noop,
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(div);
	    			if (if_block0) if_block0.d();
	    			if (if_block1) if_block1.d();
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_fragment$2.name,
	    		type: "component",
	    		source: "",
	    		ctx
	    	});

	    	return block;
	    }

	    function instance$2($$self, $$props, $$invalidate) {
	    	let { $$slots: slots = {}, $$scope } = $$props;
	    	validate_slots("Main", slots, []);
	    	let { PipeItemTitle = "" } = $$props;
	    	let { PipeItemSubtitle = "" } = $$props;
	    	let { PipeItemSource = "" } = $$props;
	    	const writable_props = ["PipeItemTitle", "PipeItemSubtitle", "PipeItemSource"];

	    	Object.keys($$props).forEach(key => {
	    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Main> was created with unknown prop '${key}'`);
	    	});

	    	$$self.$$set = $$props => {
	    		if ("PipeItemTitle" in $$props) $$invalidate(0, PipeItemTitle = $$props.PipeItemTitle);
	    		if ("PipeItemSubtitle" in $$props) $$invalidate(1, PipeItemSubtitle = $$props.PipeItemSubtitle);
	    		if ("PipeItemSource" in $$props) $$invalidate(2, PipeItemSource = $$props.PipeItemSource);
	    	};

	    	$$self.$capture_state = () => ({
	    		PipeItemTitle,
	    		PipeItemSubtitle,
	    		PipeItemSource
	    	});

	    	$$self.$inject_state = $$props => {
	    		if ("PipeItemTitle" in $$props) $$invalidate(0, PipeItemTitle = $$props.PipeItemTitle);
	    		if ("PipeItemSubtitle" in $$props) $$invalidate(1, PipeItemSubtitle = $$props.PipeItemSubtitle);
	    		if ("PipeItemSource" in $$props) $$invalidate(2, PipeItemSource = $$props.PipeItemSource);
	    	};

	    	if ($$props && "$$inject" in $$props) {
	    		$$self.$inject_state($$props.$$inject);
	    	}

	    	return [PipeItemTitle, PipeItemSubtitle, PipeItemSource];
	    }

	    class Main$2 extends SvelteComponentDev {
	    	constructor(options) {
	    		super(options);

	    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
	    			PipeItemTitle: 0,
	    			PipeItemSubtitle: 1,
	    			PipeItemSource: 2
	    		});

	    		dispatch_dev("SvelteRegisterComponent", {
	    			component: this,
	    			tagName: "Main",
	    			options,
	    			id: create_fragment$2.name
	    		});
	    	}

	    	get PipeItemTitle() {
	    		throw new Error("<Main>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	set PipeItemTitle(value) {
	    		throw new Error("<Main>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	get PipeItemSubtitle() {
	    		throw new Error("<Main>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	set PipeItemSubtitle(value) {
	    		throw new Error("<Main>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	get PipeItemSource() {
	    		throw new Error("<Main>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	set PipeItemSource(value) {
	    		throw new Error("<Main>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}
	    }

	    /* os-app/dev-launcher/submodules/LCHLauncherPrompt/main.svelte generated by Svelte v3.38.2 */
	    const file$3 = "os-app/dev-launcher/submodules/LCHLauncherPrompt/main.svelte";

	    // (28:2) {:else}
	    function create_else_block$1(ctx) {
	    	let lchlauncherpipeitem;
	    	let current;

	    	lchlauncherpipeitem = new Main$2({
	    			props: {
	    				PipeItemTitle: /*ItemSelected*/ ctx[0].LCHRecipeName,
	    				PipeItemSubtitle: /*ItemSelected*/ ctx[0]._LCHRecipeOutputTypeName,
	    				PipeItemSource: /*ItemSelected*/ ctx[0]._LCHRecipeSource
	    			},
	    			$$inline: true
	    		});

	    	const block = {
	    		c: function create() {
	    			create_component(lchlauncherpipeitem.$$.fragment);
	    		},
	    		m: function mount(target, anchor) {
	    			mount_component(lchlauncherpipeitem, target, anchor);
	    			current = true;
	    		},
	    		p: function update(ctx, dirty) {
	    			const lchlauncherpipeitem_changes = {};
	    			if (dirty & /*ItemSelected*/ 1) lchlauncherpipeitem_changes.PipeItemTitle = /*ItemSelected*/ ctx[0].LCHRecipeName;
	    			if (dirty & /*ItemSelected*/ 1) lchlauncherpipeitem_changes.PipeItemSubtitle = /*ItemSelected*/ ctx[0]._LCHRecipeOutputTypeName;
	    			if (dirty & /*ItemSelected*/ 1) lchlauncherpipeitem_changes.PipeItemSource = /*ItemSelected*/ ctx[0]._LCHRecipeSource;
	    			lchlauncherpipeitem.$set(lchlauncherpipeitem_changes);
	    		},
	    		i: function intro(local) {
	    			if (current) return;
	    			transition_in(lchlauncherpipeitem.$$.fragment, local);
	    			current = true;
	    		},
	    		o: function outro(local) {
	    			transition_out(lchlauncherpipeitem.$$.fragment, local);
	    			current = false;
	    		},
	    		d: function destroy(detaching) {
	    			destroy_component(lchlauncherpipeitem, detaching);
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_else_block$1.name,
	    		type: "else",
	    		source: "(28:2) {:else}",
	    		ctx
	    	});

	    	return block;
	    }

	    // (26:2) {#if !ItemSelected || ItemSelectedHidden}
	    function create_if_block_1$1(ctx) {
	    	let current;
	    	const default_slot_template = /*#slots*/ ctx[6].default;
	    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], null);

	    	const block = {
	    		c: function create() {
	    			if (default_slot) default_slot.c();
	    		},
	    		m: function mount(target, anchor) {
	    			if (default_slot) {
	    				default_slot.m(target, anchor);
	    			}

	    			current = true;
	    		},
	    		p: function update(ctx, dirty) {
	    			if (default_slot) {
	    				if (default_slot.p && (!current || dirty & /*$$scope*/ 128)) {
	    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[7], dirty, null, null);
	    				}
	    			}
	    		},
	    		i: function intro(local) {
	    			if (current) return;
	    			transition_in(default_slot, local);
	    			current = true;
	    		},
	    		o: function outro(local) {
	    			transition_out(default_slot, local);
	    			current = false;
	    		},
	    		d: function destroy(detaching) {
	    			if (default_slot) default_slot.d(detaching);
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_if_block_1$1.name,
	    		type: "if",
	    		source: "(26:2) {#if !ItemSelected || ItemSelectedHidden}",
	    		ctx
	    	});

	    	return block;
	    }

	    // (34:0) {#if !ResultsHidden}
	    function create_if_block$2(ctx) {
	    	let olskresults;
	    	let current;

	    	olskresults = new Main$1({
	    			props: {
	    				OLSKResultsListItems: /*PromptItems*/ ctx[1],
	    				OLSKResultsListItemSelected: /*ItemSelected*/ ctx[0],
	    				OLSKResultsDispatchClick: /*ResultListDispatchClick*/ ctx[5],
	    				OLSKResultsDispatchArrow: /*ResultListDispatchArrow*/ ctx[4],
	    				OLSKResultsEnableLooping: true,
	    				$$slots: {
	    					default: [
	    						create_default_slot,
	    						({ OLSKResultsListItem: item }) => ({ 9: item }),
	    						({ OLSKResultsListItem: item }) => item ? 512 : 0
	    					]
	    				},
	    				$$scope: { ctx }
	    			},
	    			$$inline: true
	    		});

	    	const block = {
	    		c: function create() {
	    			create_component(olskresults.$$.fragment);
	    		},
	    		m: function mount(target, anchor) {
	    			mount_component(olskresults, target, anchor);
	    			current = true;
	    		},
	    		p: function update(ctx, dirty) {
	    			const olskresults_changes = {};
	    			if (dirty & /*PromptItems*/ 2) olskresults_changes.OLSKResultsListItems = /*PromptItems*/ ctx[1];
	    			if (dirty & /*ItemSelected*/ 1) olskresults_changes.OLSKResultsListItemSelected = /*ItemSelected*/ ctx[0];

	    			if (dirty & /*$$scope, item*/ 640) {
	    				olskresults_changes.$$scope = { dirty, ctx };
	    			}

	    			olskresults.$set(olskresults_changes);
	    		},
	    		i: function intro(local) {
	    			if (current) return;
	    			transition_in(olskresults.$$.fragment, local);
	    			current = true;
	    		},
	    		o: function outro(local) {
	    			transition_out(olskresults.$$.fragment, local);
	    			current = false;
	    		},
	    		d: function destroy(detaching) {
	    			destroy_component(olskresults, detaching);
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_if_block$2.name,
	    		type: "if",
	    		source: "(34:0) {#if !ResultsHidden}",
	    		ctx
	    	});

	    	return block;
	    }

	    // (35:1) <OLSKResults   OLSKResultsListItems={ PromptItems }   OLSKResultsListItemSelected={ ItemSelected }   OLSKResultsDispatchClick={ ResultListDispatchClick }   OLSKResultsDispatchArrow={ ResultListDispatchArrow }   let:OLSKResultsListItem={ item }   OLSKResultsEnableLooping={ true }   >
	    function create_default_slot(ctx) {
	    	let lchlauncherpipeitem;
	    	let current;

	    	lchlauncherpipeitem = new Main$2({
	    			props: {
	    				PipeItemTitle: /*item*/ ctx[9].LCHRecipeName,
	    				PipeItemSubtitle: /*item*/ ctx[9]._LCHRecipeOutputTypeName,
	    				PipeItemSource: /*item*/ ctx[9]._LCHRecipeSource
	    			},
	    			$$inline: true
	    		});

	    	const block = {
	    		c: function create() {
	    			create_component(lchlauncherpipeitem.$$.fragment);
	    		},
	    		m: function mount(target, anchor) {
	    			mount_component(lchlauncherpipeitem, target, anchor);
	    			current = true;
	    		},
	    		p: function update(ctx, dirty) {
	    			const lchlauncherpipeitem_changes = {};
	    			if (dirty & /*item*/ 512) lchlauncherpipeitem_changes.PipeItemTitle = /*item*/ ctx[9].LCHRecipeName;
	    			if (dirty & /*item*/ 512) lchlauncherpipeitem_changes.PipeItemSubtitle = /*item*/ ctx[9]._LCHRecipeOutputTypeName;
	    			if (dirty & /*item*/ 512) lchlauncherpipeitem_changes.PipeItemSource = /*item*/ ctx[9]._LCHRecipeSource;
	    			lchlauncherpipeitem.$set(lchlauncherpipeitem_changes);
	    		},
	    		i: function intro(local) {
	    			if (current) return;
	    			transition_in(lchlauncherpipeitem.$$.fragment, local);
	    			current = true;
	    		},
	    		o: function outro(local) {
	    			transition_out(lchlauncherpipeitem.$$.fragment, local);
	    			current = false;
	    		},
	    		d: function destroy(detaching) {
	    			destroy_component(lchlauncherpipeitem, detaching);
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_default_slot.name,
	    		type: "slot",
	    		source: "(35:1) <OLSKResults   OLSKResultsListItems={ PromptItems }   OLSKResultsListItemSelected={ ItemSelected }   OLSKResultsDispatchClick={ ResultListDispatchClick }   OLSKResultsDispatchArrow={ ResultListDispatchArrow }   let:OLSKResultsListItem={ item }   OLSKResultsEnableLooping={ true }   >",
	    		ctx
	    	});

	    	return block;
	    }

	    function create_fragment$3(ctx) {
	    	let div2;
	    	let div1;
	    	let div0;
	    	let current_block_type_index;
	    	let if_block0;
	    	let t;
	    	let current;
	    	const if_block_creators = [create_if_block_1$1, create_else_block$1];
	    	const if_blocks = [];

	    	function select_block_type(ctx, dirty) {
	    		if (!/*ItemSelected*/ ctx[0] || /*ItemSelectedHidden*/ ctx[3]) return 0;
	    		return 1;
	    	}

	    	current_block_type_index = select_block_type(ctx);
	    	if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	    	let if_block1 = !/*ResultsHidden*/ ctx[2] && create_if_block$2(ctx);

	    	const block = {
	    		c: function create() {
	    			div2 = element("div");
	    			div1 = element("div");
	    			div0 = element("div");
	    			if_block0.c();
	    			t = space();
	    			if (if_block1) if_block1.c();
	    			attr_dev(div0, "class", "LCHLauncherZoneInputBezel svelte-m73tr1");
	    			add_location(div0, file$3, 24, 1, 650);
	    			attr_dev(div1, "class", "LCHLauncherZoneInput svelte-m73tr1");
	    			add_location(div1, file$3, 23, 0, 614);
	    			attr_dev(div2, "class", "LCHLauncherPrompt");
	    			add_location(div2, file$3, 21, 0, 581);
	    		},
	    		l: function claim(nodes) {
	    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    		},
	    		m: function mount(target, anchor) {
	    			insert_dev(target, div2, anchor);
	    			append_dev(div2, div1);
	    			append_dev(div1, div0);
	    			if_blocks[current_block_type_index].m(div0, null);
	    			append_dev(div2, t);
	    			if (if_block1) if_block1.m(div2, null);
	    			current = true;
	    		},
	    		p: function update(ctx, [dirty]) {
	    			let previous_block_index = current_block_type_index;
	    			current_block_type_index = select_block_type(ctx);

	    			if (current_block_type_index === previous_block_index) {
	    				if_blocks[current_block_type_index].p(ctx, dirty);
	    			} else {
	    				group_outros();

	    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
	    					if_blocks[previous_block_index] = null;
	    				});

	    				check_outros();
	    				if_block0 = if_blocks[current_block_type_index];

	    				if (!if_block0) {
	    					if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	    					if_block0.c();
	    				} else {
	    					if_block0.p(ctx, dirty);
	    				}

	    				transition_in(if_block0, 1);
	    				if_block0.m(div0, null);
	    			}

	    			if (!/*ResultsHidden*/ ctx[2]) {
	    				if (if_block1) {
	    					if_block1.p(ctx, dirty);

	    					if (dirty & /*ResultsHidden*/ 4) {
	    						transition_in(if_block1, 1);
	    					}
	    				} else {
	    					if_block1 = create_if_block$2(ctx);
	    					if_block1.c();
	    					transition_in(if_block1, 1);
	    					if_block1.m(div2, null);
	    				}
	    			} else if (if_block1) {
	    				group_outros();

	    				transition_out(if_block1, 1, 1, () => {
	    					if_block1 = null;
	    				});

	    				check_outros();
	    			}
	    		},
	    		i: function intro(local) {
	    			if (current) return;
	    			transition_in(if_block0);
	    			transition_in(if_block1);
	    			current = true;
	    		},
	    		o: function outro(local) {
	    			transition_out(if_block0);
	    			transition_out(if_block1);
	    			current = false;
	    		},
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(div2);
	    			if_blocks[current_block_type_index].d();
	    			if (if_block1) if_block1.d();
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_fragment$3.name,
	    		type: "component",
	    		source: "",
	    		ctx
	    	});

	    	return block;
	    }

	    function instance$3($$self, $$props, $$invalidate) {
	    	let { $$slots: slots = {}, $$scope } = $$props;
	    	validate_slots("Main", slots, ['default']);
	    	let { PromptItems = [] } = $$props;
	    	let { ResultsHidden = false } = $$props;
	    	let { ItemSelected = null } = $$props;
	    	let { ItemSelectedHidden = false } = $$props;
	    	const dispatch = createEventDispatcher();

	    	function ResultListDispatchArrow(inputData) {
	    		dispatch("ResultListDispatchArrow", $$invalidate(0, ItemSelected = inputData));
	    	}

	    	function ResultListDispatchClick(inputData) {
	    		dispatch("ResultListDispatchClick", $$invalidate(0, ItemSelected = inputData));
	    	}

	    	const writable_props = ["PromptItems", "ResultsHidden", "ItemSelected", "ItemSelectedHidden"];

	    	Object.keys($$props).forEach(key => {
	    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Main> was created with unknown prop '${key}'`);
	    	});

	    	$$self.$$set = $$props => {
	    		if ("PromptItems" in $$props) $$invalidate(1, PromptItems = $$props.PromptItems);
	    		if ("ResultsHidden" in $$props) $$invalidate(2, ResultsHidden = $$props.ResultsHidden);
	    		if ("ItemSelected" in $$props) $$invalidate(0, ItemSelected = $$props.ItemSelected);
	    		if ("ItemSelectedHidden" in $$props) $$invalidate(3, ItemSelectedHidden = $$props.ItemSelectedHidden);
	    		if ("$$scope" in $$props) $$invalidate(7, $$scope = $$props.$$scope);
	    	};

	    	$$self.$capture_state = () => ({
	    		PromptItems,
	    		ResultsHidden,
	    		ItemSelected,
	    		ItemSelectedHidden,
	    		OLSKResults: Main$1,
	    		LCHLauncherPipeItem: Main$2,
	    		createEventDispatcher,
	    		dispatch,
	    		ResultListDispatchArrow,
	    		ResultListDispatchClick
	    	});

	    	$$self.$inject_state = $$props => {
	    		if ("PromptItems" in $$props) $$invalidate(1, PromptItems = $$props.PromptItems);
	    		if ("ResultsHidden" in $$props) $$invalidate(2, ResultsHidden = $$props.ResultsHidden);
	    		if ("ItemSelected" in $$props) $$invalidate(0, ItemSelected = $$props.ItemSelected);
	    		if ("ItemSelectedHidden" in $$props) $$invalidate(3, ItemSelectedHidden = $$props.ItemSelectedHidden);
	    	};

	    	if ($$props && "$$inject" in $$props) {
	    		$$self.$inject_state($$props.$$inject);
	    	}

	    	return [
	    		ItemSelected,
	    		PromptItems,
	    		ResultsHidden,
	    		ItemSelectedHidden,
	    		ResultListDispatchArrow,
	    		ResultListDispatchClick,
	    		slots,
	    		$$scope
	    	];
	    }

	    class Main$3 extends SvelteComponentDev {
	    	constructor(options) {
	    		super(options);

	    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {
	    			PromptItems: 1,
	    			ResultsHidden: 2,
	    			ItemSelected: 0,
	    			ItemSelectedHidden: 3
	    		});

	    		dispatch_dev("SvelteRegisterComponent", {
	    			component: this,
	    			tagName: "Main",
	    			options,
	    			id: create_fragment$3.name
	    		});
	    	}

	    	get PromptItems() {
	    		throw new Error("<Main>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	set PromptItems(value) {
	    		throw new Error("<Main>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	get ResultsHidden() {
	    		throw new Error("<Main>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	set ResultsHidden(value) {
	    		throw new Error("<Main>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	get ItemSelected() {
	    		throw new Error("<Main>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	set ItemSelected(value) {
	    		throw new Error("<Main>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	get ItemSelectedHidden() {
	    		throw new Error("<Main>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	set ItemSelectedHidden(value) {
	    		throw new Error("<Main>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}
	    }

	    /* os-app/dev-launcher/main.svelte generated by Svelte v3.38.2 */

	    const { Object: Object_1, console: console_1, window: window_1 } = globals;
	    const file$4 = "os-app/dev-launcher/main.svelte";

	    function get_each_context$1(ctx, list, i) {
	    	const child_ctx = ctx.slice();
	    	child_ctx[16] = list[i];
	    	child_ctx[17] = list;
	    	child_ctx[18] = i;
	    	return child_ctx;
	    }

	    // (887:0) {#if e.LCHPromptIsVisible}
	    function create_if_block_2(ctx) {
	    	let div;
	    	let show_if = /*LRTOptions*/ ctx[0].LCHOptionMode === mod$3.LCHLauncherModePipe();
	    	let t;
	    	let lchlauncherprompt;
	    	let div_class_value;
	    	let current;
	    	let mounted;
	    	let dispose;
	    	let if_block = show_if && create_if_block_6(ctx);

	    	lchlauncherprompt = new Main$3({
	    			props: {
	    				PromptItems: /*e*/ ctx[16].LCHPromptItemsVisible,
	    				ItemSelected: /*e*/ ctx[16].LCHPromptItemSelected,
	    				ItemSelectedHidden: /*LRTOptions*/ ctx[0].LCHOptionMode !== mod$3.LCHLauncherModePipe() || /*e*/ ctx[16].LCHPromptDotModeEnabled,
	    				ResultsHidden: /*e*/ ctx[16].LCHPromptResultsThrottle !== false,
	    				$$slots: { default: [create_default_slot$1] },
	    				$$scope: { ctx }
	    			},
	    			$$inline: true
	    		});

	    	lchlauncherprompt.$on("ResultListDispatchArrow", /*ResultListDispatchArrow_handler*/ ctx[10]);
	    	lchlauncherprompt.$on("ResultListDispatchClick", /*ResultListDispatchClick_handler*/ ctx[11]);

	    	function click_handler() {
	    		return /*click_handler*/ ctx[12](/*e*/ ctx[16]);
	    	}

	    	const block = {
	    		c: function create() {
	    			div = element("div");
	    			if (if_block) if_block.c();
	    			t = space();
	    			create_component(lchlauncherprompt.$$.fragment);
	    			attr_dev(div, "class", div_class_value = "" + (null_to_empty(/*e*/ ctx[16].LCHPromptClass) + " svelte-1rxh210"));
	    			toggle_class(div, "LCHLauncherPromptSelected", /*mod*/ ctx[1]._ValuePromptObjects[/*mod*/ ctx[1]._ValuePromptActiveIndex] === /*e*/ ctx[16]);
	    			add_location(div, file$4, 888, 0, 27546);
	    		},
	    		m: function mount(target, anchor) {
	    			insert_dev(target, div, anchor);
	    			if (if_block) if_block.m(div, null);
	    			append_dev(div, t);
	    			mount_component(lchlauncherprompt, div, null);
	    			current = true;

	    			if (!mounted) {
	    				dispose = listen_dev(div, "click", click_handler, false, false, false);
	    				mounted = true;
	    			}
	    		},
	    		p: function update(new_ctx, dirty) {
	    			ctx = new_ctx;
	    			if (dirty & /*LRTOptions*/ 1) show_if = /*LRTOptions*/ ctx[0].LCHOptionMode === mod$3.LCHLauncherModePipe();

	    			if (show_if) {
	    				if (if_block) {
	    					if_block.p(ctx, dirty);
	    				} else {
	    					if_block = create_if_block_6(ctx);
	    					if_block.c();
	    					if_block.m(div, t);
	    				}
	    			} else if (if_block) {
	    				if_block.d(1);
	    				if_block = null;
	    			}

	    			const lchlauncherprompt_changes = {};
	    			if (dirty & /*mod*/ 2) lchlauncherprompt_changes.PromptItems = /*e*/ ctx[16].LCHPromptItemsVisible;
	    			if (dirty & /*mod*/ 2) lchlauncherprompt_changes.ItemSelected = /*e*/ ctx[16].LCHPromptItemSelected;
	    			if (dirty & /*LRTOptions, mod*/ 3) lchlauncherprompt_changes.ItemSelectedHidden = /*LRTOptions*/ ctx[0].LCHOptionMode !== mod$3.LCHLauncherModePipe() || /*e*/ ctx[16].LCHPromptDotModeEnabled;
	    			if (dirty & /*mod*/ 2) lchlauncherprompt_changes.ResultsHidden = /*e*/ ctx[16].LCHPromptResultsThrottle !== false;

	    			if (dirty & /*$$scope, mod, LRTOptions*/ 524291) {
	    				lchlauncherprompt_changes.$$scope = { dirty, ctx };
	    			}

	    			lchlauncherprompt.$set(lchlauncherprompt_changes);

	    			if (!current || dirty & /*mod*/ 2 && div_class_value !== (div_class_value = "" + (null_to_empty(/*e*/ ctx[16].LCHPromptClass) + " svelte-1rxh210"))) {
	    				attr_dev(div, "class", div_class_value);
	    			}

	    			if (dirty & /*mod, mod*/ 2) {
	    				toggle_class(div, "LCHLauncherPromptSelected", /*mod*/ ctx[1]._ValuePromptObjects[/*mod*/ ctx[1]._ValuePromptActiveIndex] === /*e*/ ctx[16]);
	    			}
	    		},
	    		i: function intro(local) {
	    			if (current) return;
	    			transition_in(lchlauncherprompt.$$.fragment, local);
	    			current = true;
	    		},
	    		o: function outro(local) {
	    			transition_out(lchlauncherprompt.$$.fragment, local);
	    			current = false;
	    		},
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(div);
	    			if (if_block) if_block.d();
	    			destroy_component(lchlauncherprompt);
	    			mounted = false;
	    			dispose();
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_if_block_2.name,
	    		type: "if",
	    		source: "(887:0) {#if e.LCHPromptIsVisible}",
	    		ctx
	    	});

	    	return block;
	    }

	    // (890:1) {#if LRTOptions.LCHOptionMode === LCHLauncherLogic.LCHLauncherModePipe()}
	    function create_if_block_6(ctx) {
	    	let strong;
	    	let t_value = (/*e*/ ctx[16].LCHPromptFilterText && /*e*/ ctx[16].LCHPromptFilterText.toUpperCase() || /*e*/ ctx[16].LCHPromptHeading) + "";
	    	let t;

	    	const block = {
	    		c: function create() {
	    			strong = element("strong");
	    			t = text(t_value);
	    			attr_dev(strong, "class", "LCHLauncherPromptHeading svelte-1rxh210");
	    			toggle_class(strong, "LCHLauncherPromptHeadingMatchStop", /*e*/ ctx[16].LCHPromptMatchStop);
	    			add_location(strong, file$4, 890, 2, 27801);
	    		},
	    		m: function mount(target, anchor) {
	    			insert_dev(target, strong, anchor);
	    			append_dev(strong, t);
	    		},
	    		p: function update(ctx, dirty) {
	    			if (dirty & /*mod*/ 2 && t_value !== (t_value = (/*e*/ ctx[16].LCHPromptFilterText && /*e*/ ctx[16].LCHPromptFilterText.toUpperCase() || /*e*/ ctx[16].LCHPromptHeading) + "")) set_data_dev(t, t_value);

	    			if (dirty & /*mod*/ 2) {
	    				toggle_class(strong, "LCHLauncherPromptHeadingMatchStop", /*e*/ ctx[16].LCHPromptMatchStop);
	    			}
	    		},
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(strong);
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_if_block_6.name,
	    		type: "if",
	    		source: "(890:1) {#if LRTOptions.LCHOptionMode === LCHLauncherLogic.LCHLauncherModePipe()}",
	    		ctx
	    	});

	    	return block;
	    }

	    // (902:2) {#if e.LCHPromptClass === 'LCHLauncherSubjectPrompt' && !e.LCHPromptDotModeEnabled }
	    function create_if_block_5(ctx) {
	    	let span;

	    	const block = {
	    		c: function create() {
	    			span = element("span");
	    			span.textContent = `${/*OLSKLocalized*/ ctx[2]("LCHLauncherSubjectPromptPlaceholderText")}`;
	    			attr_dev(span, "class", "LCHLauncherSubjectPromptPlaceholder svelte-1rxh210");
	    			add_location(span, file$4, 902, 3, 28605);
	    		},
	    		m: function mount(target, anchor) {
	    			insert_dev(target, span, anchor);
	    		},
	    		p: noop,
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(span);
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_if_block_5.name,
	    		type: "if",
	    		source: "(902:2) {#if e.LCHPromptClass === 'LCHLauncherSubjectPrompt' && !e.LCHPromptDotModeEnabled }",
	    		ctx
	    	});

	    	return block;
	    }

	    // (906:2) {#if e.LCHPromptClass === 'LCHLauncherFilterPrompt' }
	    function create_if_block_4(ctx) {
	    	let input;
	    	let input_placeholder_value;
	    	let mounted;
	    	let dispose;

	    	const block = {
	    		c: function create() {
	    			input = element("input");
	    			attr_dev(input, "class", "LCHLauncherFilterInput svelte-1rxh210");

	    			attr_dev(input, "placeholder", input_placeholder_value = /*LRTOptions*/ ctx[0].LCHOptionMode === mod$3.LCHLauncherModePreview()
	    			? /*OLSKLocalized*/ ctx[2]("LCHLauncherInputPlaceholderPreview")
	    			: /*OLSKLocalized*/ ctx[2]("LCHLauncherInputPlaceholderDefault"));

	    			input.autofocus = true;
	    			add_location(input, file$4, 906, 3, 28791);
	    		},
	    		m: function mount(target, anchor) {
	    			insert_dev(target, input, anchor);
	    			set_input_value(input, /*mod*/ ctx[1]._ValuePromptObjects[0].LCHPromptFilterText);
	    			/*input_binding*/ ctx[7](input);
	    			input.focus();

	    			if (!mounted) {
	    				dispose = [
	    					listen_dev(input, "input", /*input_input_handler*/ ctx[6]),
	    					listen_dev(input, "input", /*input_handler*/ ctx[8], false, false, false)
	    				];

	    				mounted = true;
	    			}
	    		},
	    		p: function update(ctx, dirty) {
	    			if (dirty & /*LRTOptions*/ 1 && input_placeholder_value !== (input_placeholder_value = /*LRTOptions*/ ctx[0].LCHOptionMode === mod$3.LCHLauncherModePreview()
	    			? /*OLSKLocalized*/ ctx[2]("LCHLauncherInputPlaceholderPreview")
	    			: /*OLSKLocalized*/ ctx[2]("LCHLauncherInputPlaceholderDefault"))) {
	    				attr_dev(input, "placeholder", input_placeholder_value);
	    			}

	    			if (dirty & /*mod*/ 2 && input.value !== /*mod*/ ctx[1]._ValuePromptObjects[0].LCHPromptFilterText) {
	    				set_input_value(input, /*mod*/ ctx[1]._ValuePromptObjects[0].LCHPromptFilterText);
	    			}
	    		},
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(input);
	    			/*input_binding*/ ctx[7](null);
	    			mounted = false;
	    			run_all(dispose);
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_if_block_4.name,
	    		type: "if",
	    		source: "(906:2) {#if e.LCHPromptClass === 'LCHLauncherFilterPrompt' }",
	    		ctx
	    	});

	    	return block;
	    }

	    // (910:2) {#if !['LCHLauncherFilterPrompt', 'LCHLauncherActionPrompt'].includes(e.LCHPromptClass) && e.LCHPromptDotModeEnabled }
	    function create_if_block_3(ctx) {
	    	let input;
	    	let mounted;
	    	let dispose;

	    	function input_input_handler_1() {
	    		/*input_input_handler_1*/ ctx[9].call(input, /*each_value*/ ctx[17], /*e_index*/ ctx[18]);
	    	}

	    	const block = {
	    		c: function create() {
	    			input = element("input");
	    			attr_dev(input, "class", "LCHLauncherPromptDotModeInput svelte-1rxh210");
	    			input.autofocus = true;
	    			add_location(input, file$4, 910, 3, 29369);
	    		},
	    		m: function mount(target, anchor) {
	    			insert_dev(target, input, anchor);
	    			set_input_value(input, /*e*/ ctx[16].LCHPromptDotModeText);
	    			input.focus();

	    			if (!mounted) {
	    				dispose = [
	    					listen_dev(input, "input", input_input_handler_1),
	    					listen_dev(
	    						input,
	    						"input",
	    						function () {
	    							if (is_function(/*mod*/ ctx[1].InterfaceDotModeFieldDidInput)) /*mod*/ ctx[1].InterfaceDotModeFieldDidInput.apply(this, arguments);
	    						},
	    						false,
	    						false,
	    						false
	    					)
	    				];

	    				mounted = true;
	    			}
	    		},
	    		p: function update(new_ctx, dirty) {
	    			ctx = new_ctx;

	    			if (dirty & /*mod*/ 2 && input.value !== /*e*/ ctx[16].LCHPromptDotModeText) {
	    				set_input_value(input, /*e*/ ctx[16].LCHPromptDotModeText);
	    			}
	    		},
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(input);
	    			mounted = false;
	    			run_all(dispose);
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_if_block_3.name,
	    		type: "if",
	    		source: "(910:2) {#if !['LCHLauncherFilterPrompt', 'LCHLauncherActionPrompt'].includes(e.LCHPromptClass) && e.LCHPromptDotModeEnabled }",
	    		ctx
	    	});

	    	return block;
	    }

	    // (894:1) <LCHLauncherPrompt   PromptItems={ e.LCHPromptItemsVisible }   ItemSelected={ e.LCHPromptItemSelected }   ItemSelectedHidden={ LRTOptions.LCHOptionMode !== LCHLauncherLogic.LCHLauncherModePipe() || e.LCHPromptDotModeEnabled }   ResultsHidden={ e.LCHPromptResultsThrottle !== false }   on:ResultListDispatchArrow={ (event) => ActivePromptItemSelectedShouldUpdate(event.detail) }   on:ResultListDispatchClick={ (event) => ActivePromptItemSelectedShouldUpdate(event.detail) || mod.ControlTerminate() }   >
	    function create_default_slot$1(ctx) {
	    	let t0;
	    	let t1;
	    	let show_if = !["LCHLauncherFilterPrompt", "LCHLauncherActionPrompt"].includes(/*e*/ ctx[16].LCHPromptClass) && /*e*/ ctx[16].LCHPromptDotModeEnabled;
	    	let if_block2_anchor;
	    	let if_block0 = /*e*/ ctx[16].LCHPromptClass === "LCHLauncherSubjectPrompt" && !/*e*/ ctx[16].LCHPromptDotModeEnabled && create_if_block_5(ctx);
	    	let if_block1 = /*e*/ ctx[16].LCHPromptClass === "LCHLauncherFilterPrompt" && create_if_block_4(ctx);
	    	let if_block2 = show_if && create_if_block_3(ctx);

	    	const block = {
	    		c: function create() {
	    			if (if_block0) if_block0.c();
	    			t0 = space();
	    			if (if_block1) if_block1.c();
	    			t1 = space();
	    			if (if_block2) if_block2.c();
	    			if_block2_anchor = empty();
	    		},
	    		m: function mount(target, anchor) {
	    			if (if_block0) if_block0.m(target, anchor);
	    			insert_dev(target, t0, anchor);
	    			if (if_block1) if_block1.m(target, anchor);
	    			insert_dev(target, t1, anchor);
	    			if (if_block2) if_block2.m(target, anchor);
	    			insert_dev(target, if_block2_anchor, anchor);
	    		},
	    		p: function update(ctx, dirty) {
	    			if (/*e*/ ctx[16].LCHPromptClass === "LCHLauncherSubjectPrompt" && !/*e*/ ctx[16].LCHPromptDotModeEnabled) {
	    				if (if_block0) {
	    					if_block0.p(ctx, dirty);
	    				} else {
	    					if_block0 = create_if_block_5(ctx);
	    					if_block0.c();
	    					if_block0.m(t0.parentNode, t0);
	    				}
	    			} else if (if_block0) {
	    				if_block0.d(1);
	    				if_block0 = null;
	    			}

	    			if (/*e*/ ctx[16].LCHPromptClass === "LCHLauncherFilterPrompt") {
	    				if (if_block1) {
	    					if_block1.p(ctx, dirty);
	    				} else {
	    					if_block1 = create_if_block_4(ctx);
	    					if_block1.c();
	    					if_block1.m(t1.parentNode, t1);
	    				}
	    			} else if (if_block1) {
	    				if_block1.d(1);
	    				if_block1 = null;
	    			}

	    			if (dirty & /*mod*/ 2) show_if = !["LCHLauncherFilterPrompt", "LCHLauncherActionPrompt"].includes(/*e*/ ctx[16].LCHPromptClass) && /*e*/ ctx[16].LCHPromptDotModeEnabled;

	    			if (show_if) {
	    				if (if_block2) {
	    					if_block2.p(ctx, dirty);
	    				} else {
	    					if_block2 = create_if_block_3(ctx);
	    					if_block2.c();
	    					if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
	    				}
	    			} else if (if_block2) {
	    				if_block2.d(1);
	    				if_block2 = null;
	    			}
	    		},
	    		d: function destroy(detaching) {
	    			if (if_block0) if_block0.d(detaching);
	    			if (detaching) detach_dev(t0);
	    			if (if_block1) if_block1.d(detaching);
	    			if (detaching) detach_dev(t1);
	    			if (if_block2) if_block2.d(detaching);
	    			if (detaching) detach_dev(if_block2_anchor);
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_default_slot$1.name,
	    		type: "slot",
	    		source: "(894:1) <LCHLauncherPrompt   PromptItems={ e.LCHPromptItemsVisible }   ItemSelected={ e.LCHPromptItemSelected }   ItemSelectedHidden={ LRTOptions.LCHOptionMode !== LCHLauncherLogic.LCHLauncherModePipe() || e.LCHPromptDotModeEnabled }   ResultsHidden={ e.LCHPromptResultsThrottle !== false }   on:ResultListDispatchArrow={ (event) => ActivePromptItemSelectedShouldUpdate(event.detail) }   on:ResultListDispatchClick={ (event) => ActivePromptItemSelectedShouldUpdate(event.detail) || mod.ControlTerminate() }   >",
	    		ctx
	    	});

	    	return block;
	    }

	    // (885:0) {#each mod._ValuePromptObjects as e}
	    function create_each_block$1(ctx) {
	    	let if_block_anchor;
	    	let current;
	    	let if_block = /*e*/ ctx[16].LCHPromptIsVisible && create_if_block_2(ctx);

	    	const block = {
	    		c: function create() {
	    			if (if_block) if_block.c();
	    			if_block_anchor = empty();
	    		},
	    		m: function mount(target, anchor) {
	    			if (if_block) if_block.m(target, anchor);
	    			insert_dev(target, if_block_anchor, anchor);
	    			current = true;
	    		},
	    		p: function update(ctx, dirty) {
	    			if (/*e*/ ctx[16].LCHPromptIsVisible) {
	    				if (if_block) {
	    					if_block.p(ctx, dirty);

	    					if (dirty & /*mod*/ 2) {
	    						transition_in(if_block, 1);
	    					}
	    				} else {
	    					if_block = create_if_block_2(ctx);
	    					if_block.c();
	    					transition_in(if_block, 1);
	    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
	    				}
	    			} else if (if_block) {
	    				group_outros();

	    				transition_out(if_block, 1, 1, () => {
	    					if_block = null;
	    				});

	    				check_outros();
	    			}
	    		},
	    		i: function intro(local) {
	    			if (current) return;
	    			transition_in(if_block);
	    			current = true;
	    		},
	    		o: function outro(local) {
	    			transition_out(if_block);
	    			current = false;
	    		},
	    		d: function destroy(detaching) {
	    			if (if_block) if_block.d(detaching);
	    			if (detaching) detach_dev(if_block_anchor);
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_each_block$1.name,
	    		type: "each",
	    		source: "(885:0) {#each mod._ValuePromptObjects as e}",
	    		ctx
	    	});

	    	return block;
	    }

	    // (920:0) {#if OLSK_SPEC_UI() }
	    function create_if_block_1$2(ctx) {
	    	let button;
	    	let mounted;
	    	let dispose;

	    	const block = {
	    		c: function create() {
	    			button = element("button");
	    			attr_dev(button, "id", "TestLCHDebugCloseButton");
	    			attr_dev(button, "class", "svelte-1rxh210");
	    			add_location(button, file$4, 920, 1, 29589);
	    		},
	    		m: function mount(target, anchor) {
	    			insert_dev(target, button, anchor);

	    			if (!mounted) {
	    				dispose = listen_dev(
	    					button,
	    					"click",
	    					function () {
	    						if (is_function(/*mod*/ ctx[1].ControlExit)) /*mod*/ ctx[1].ControlExit.apply(this, arguments);
	    					},
	    					false,
	    					false,
	    					false
	    				);

	    				mounted = true;
	    			}
	    		},
	    		p: function update(new_ctx, dirty) {
	    			ctx = new_ctx;
	    		},
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(button);
	    			mounted = false;
	    			dispose();
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_if_block_1$2.name,
	    		type: "if",
	    		source: "(920:0) {#if OLSK_SPEC_UI() }",
	    		ctx
	    	});

	    	return block;
	    }

	    // (926:0) {#if mod._ValueSecondaryComponentDescriptor}
	    function create_if_block$3(ctx) {
	    	let switch_instance;
	    	let switch_instance_anchor;
	    	let current;
	    	const switch_instance_spread_levels = [/*mod*/ ctx[1]._ValueSecondaryComponentDescriptor.LCHInstanceProps];
	    	var switch_value = /*mod*/ ctx[1]._ValueSecondaryComponentDescriptor.LCHInstanceClass;

	    	function switch_props(ctx) {
	    		let switch_instance_props = {};

	    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
	    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
	    		}

	    		return {
	    			props: switch_instance_props,
	    			$$inline: true
	    		};
	    	}

	    	if (switch_value) {
	    		switch_instance = new switch_value(switch_props());
	    	}

	    	const block = {
	    		c: function create() {
	    			if (switch_instance) create_component(switch_instance.$$.fragment);
	    			switch_instance_anchor = empty();
	    		},
	    		m: function mount(target, anchor) {
	    			if (switch_instance) {
	    				mount_component(switch_instance, target, anchor);
	    			}

	    			insert_dev(target, switch_instance_anchor, anchor);
	    			current = true;
	    		},
	    		p: function update(ctx, dirty) {
	    			const switch_instance_changes = (dirty & /*mod*/ 2)
	    			? get_spread_update(switch_instance_spread_levels, [
	    					get_spread_object(/*mod*/ ctx[1]._ValueSecondaryComponentDescriptor.LCHInstanceProps)
	    				])
	    			: {};

	    			if (switch_value !== (switch_value = /*mod*/ ctx[1]._ValueSecondaryComponentDescriptor.LCHInstanceClass)) {
	    				if (switch_instance) {
	    					group_outros();
	    					const old_component = switch_instance;

	    					transition_out(old_component.$$.fragment, 1, 0, () => {
	    						destroy_component(old_component, 1);
	    					});

	    					check_outros();
	    				}

	    				if (switch_value) {
	    					switch_instance = new switch_value(switch_props());
	    					create_component(switch_instance.$$.fragment);
	    					transition_in(switch_instance.$$.fragment, 1);
	    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
	    				} else {
	    					switch_instance = null;
	    				}
	    			} else if (switch_value) {
	    				switch_instance.$set(switch_instance_changes);
	    			}
	    		},
	    		i: function intro(local) {
	    			if (current) return;
	    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
	    			current = true;
	    		},
	    		o: function outro(local) {
	    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
	    			current = false;
	    		},
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(switch_instance_anchor);
	    			if (switch_instance) destroy_component(switch_instance, detaching);
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_if_block$3.name,
	    		type: "if",
	    		source: "(926:0) {#if mod._ValueSecondaryComponentDescriptor}",
	    		ctx
	    	});

	    	return block;
	    }

	    function create_fragment$4(ctx) {
	    	let div;
	    	let t0;
	    	let show_if = main_1();
	    	let t1;
	    	let if_block1_anchor;
	    	let current;
	    	let mounted;
	    	let dispose;
	    	let each_value = /*mod*/ ctx[1]._ValuePromptObjects;
	    	validate_each_argument(each_value);
	    	let each_blocks = [];

	    	for (let i = 0; i < each_value.length; i += 1) {
	    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	    	}

	    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
	    		each_blocks[i] = null;
	    	});

	    	let if_block0 = show_if && create_if_block_1$2(ctx);
	    	let if_block1 = /*mod*/ ctx[1]._ValueSecondaryComponentDescriptor && create_if_block$3(ctx);

	    	const block = {
	    		c: function create() {
	    			div = element("div");

	    			for (let i = 0; i < each_blocks.length; i += 1) {
	    				each_blocks[i].c();
	    			}

	    			t0 = space();
	    			if (if_block0) if_block0.c();
	    			t1 = space();
	    			if (if_block1) if_block1.c();
	    			if_block1_anchor = empty();
	    			attr_dev(div, "class", "Container LCHLauncher svelte-1rxh210");
	    			add_location(div, file$4, 882, 0, 27399);
	    		},
	    		l: function claim(nodes) {
	    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    		},
	    		m: function mount(target, anchor) {
	    			insert_dev(target, div, anchor);

	    			for (let i = 0; i < each_blocks.length; i += 1) {
	    				each_blocks[i].m(div, null);
	    			}

	    			append_dev(div, t0);
	    			if (if_block0) if_block0.m(div, null);
	    			/*div_binding*/ ctx[13](div);
	    			insert_dev(target, t1, anchor);
	    			if (if_block1) if_block1.m(target, anchor);
	    			insert_dev(target, if_block1_anchor, anchor);
	    			current = true;

	    			if (!mounted) {
	    				dispose = [
	    					listen_dev(
	    						window_1,
	    						"keydown",
	    						function () {
	    							if (is_function(/*mod*/ ctx[1].interfaceDidKeydown)) /*mod*/ ctx[1].interfaceDidKeydown.apply(this, arguments);
	    						},
	    						false,
	    						false,
	    						false
	    					),
	    					listen_dev(
	    						window_1,
	    						"click",
	    						function () {
	    							if (is_function(/*mod*/ ctx[1].InterfaceBodyDidClick)) /*mod*/ ctx[1].InterfaceBodyDidClick.apply(this, arguments);
	    						},
	    						false,
	    						false,
	    						false
	    					),
	    					listen_dev(
	    						window_1,
	    						"touchstart",
	    						function () {
	    							if (is_function(/*mod*/ ctx[1].InterfaceBodyDidClick)) /*mod*/ ctx[1].InterfaceBodyDidClick.apply(this, arguments);
	    						},
	    						false,
	    						false,
	    						false
	    					)
	    				];

	    				mounted = true;
	    			}
	    		},
	    		p: function update(new_ctx, [dirty]) {
	    			ctx = new_ctx;

	    			if (dirty & /*mod, LRTOptions, LCHLauncherLogic, ActivePromptItemSelectedShouldUpdate, OLSKLocalized, ActivePromptFilterTextShouldUpdate*/ 31) {
	    				each_value = /*mod*/ ctx[1]._ValuePromptObjects;
	    				validate_each_argument(each_value);
	    				let i;

	    				for (i = 0; i < each_value.length; i += 1) {
	    					const child_ctx = get_each_context$1(ctx, each_value, i);

	    					if (each_blocks[i]) {
	    						each_blocks[i].p(child_ctx, dirty);
	    						transition_in(each_blocks[i], 1);
	    					} else {
	    						each_blocks[i] = create_each_block$1(child_ctx);
	    						each_blocks[i].c();
	    						transition_in(each_blocks[i], 1);
	    						each_blocks[i].m(div, t0);
	    					}
	    				}

	    				group_outros();

	    				for (i = each_value.length; i < each_blocks.length; i += 1) {
	    					out(i);
	    				}

	    				check_outros();
	    			}

	    			if (show_if) if_block0.p(ctx, dirty);

	    			if (/*mod*/ ctx[1]._ValueSecondaryComponentDescriptor) {
	    				if (if_block1) {
	    					if_block1.p(ctx, dirty);

	    					if (dirty & /*mod*/ 2) {
	    						transition_in(if_block1, 1);
	    					}
	    				} else {
	    					if_block1 = create_if_block$3(ctx);
	    					if_block1.c();
	    					transition_in(if_block1, 1);
	    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
	    				}
	    			} else if (if_block1) {
	    				group_outros();

	    				transition_out(if_block1, 1, 1, () => {
	    					if_block1 = null;
	    				});

	    				check_outros();
	    			}
	    		},
	    		i: function intro(local) {
	    			if (current) return;

	    			for (let i = 0; i < each_value.length; i += 1) {
	    				transition_in(each_blocks[i]);
	    			}

	    			transition_in(if_block1);
	    			current = true;
	    		},
	    		o: function outro(local) {
	    			each_blocks = each_blocks.filter(Boolean);

	    			for (let i = 0; i < each_blocks.length; i += 1) {
	    				transition_out(each_blocks[i]);
	    			}

	    			transition_out(if_block1);
	    			current = false;
	    		},
	    		d: function destroy(detaching) {
	    			if (detaching) detach_dev(div);
	    			destroy_each(each_blocks, detaching);
	    			if (if_block0) if_block0.d();
	    			/*div_binding*/ ctx[13](null);
	    			if (detaching) detach_dev(t1);
	    			if (if_block1) if_block1.d(detaching);
	    			if (detaching) detach_dev(if_block1_anchor);
	    			mounted = false;
	    			run_all(dispose);
	    		}
	    	};

	    	dispatch_dev("SvelteRegisterBlock", {
	    		block,
	    		id: create_fragment$4.name,
	    		type: "component",
	    		source: "",
	    		ctx
	    	});

	    	return block;
	    }

	    function instance$4($$self, $$props, $$invalidate) {
	    	let { $$slots: slots = {}, $$scope } = $$props;
	    	validate_slots("Main", slots, []);
	    	let { LRTOptions = {} } = $$props;
	    	let { LRTDidFinish = null } = $$props;
	    	LRTOptions = mod$3.LCHLauncherOptions(LRTOptions, main_1() ? undefined : console.warn);

	    	const OLSKLocalized = function (translationConstant) {
	    		return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"en":{"LCHLauncherInputPlaceholderDefault":"Type to search","LCHLauncherInputPlaceholderPreview":"Type to filter","LCHLauncherSubjectPromptPlaceholderText":"Type to search","LCHLauncherSubjectPromptHeadingText":"Subject","LCHLauncherActionPromptHeadingText":"Action","LCHLauncherObjectPromptHeadingText":"Object","LCHCopyToClipboardButtonText":"Copy to clipboard","LCHStandardRecipeNames":{"LCHActiveDocumentFocusElements":"Active Document Focus Elements","LCHCopyToClipboard":"Copy to clipboard","LCHLargeText":"Large text","LCHDOMElementFocus":"Focus","LCHRunCommand":"Run Command","LCHSearchWith":"Search With","LCHSearchFor":"Search For","LCHSubjectContainerShowContents":"Show Contents","LCHURLOpen":"Open URL","SubjectContainer":"Subject Container","String":"String","Date":"Date","URL":"URL","ServiceSearchURLTemplate":"Search Service URL Template","DOMElement":"DOM Element"}},"es":{"LCHLauncherInputPlaceholderDefault":"Escribir para buscar","LCHLauncherInputPlaceholderPreview":"Escribir para filtrar","LCHLauncherSubjectPromptPlaceholderText":"Escribir para buscar","LCHLauncherSubjectPromptHeadingText":"Sujeto","LCHLauncherActionPromptHeadingText":"Acto","LCHLauncherObjectPromptHeadingText":"Objeto","LCHCopyToClipboardButtonText":"Copiar al portapapeles","LCHStandardRecipeNames":{"LCHActiveDocumentFocusElements":"Elementos enfocados del documento activo","LCHCopyToClipboard":"Copiar al portapapeles","LCHLargeText":"Texto aumentado","LCHDOMElementFocus":"Enfocar","LCHRunCommand":"Ejecutar comando","LCHSearchWith":"Buscar con","LCHSearchFor":"Buscar para","LCHSubjectContainerShowContents":"Mostrar contenidos","LCHURLOpen":"Abrir URL","SubjectContainer":"Contenido de sujetos","String":"String","Date":"Date","URL":"URL","ServiceSearchURLTemplate":"Plantilla URL de servicio de búsqueda","DOMElement":"Elemento DOM"}},"fr":{"LCHLauncherInputPlaceholderDefault":"Taper pour chercher","LCHLauncherInputPlaceholderPreview":"Taper pour filtrer","LCHLauncherSubjectPromptPlaceholderText":"Taper pour chercher","LCHLauncherSubjectPromptHeadingText":"Sujet","LCHLauncherActionPromptHeadingText":"Action","LCHLauncherObjectPromptHeadingText":"Objet","LCHCopyToClipboardButtonText":"Copier dans le presse-papier","LCHStandardRecipeNames":{"LCHActiveDocumentFocusElements":"Éléments au points du document active","LCHCopyToClipboard":"Copier dans le presse-papier","LCHLargeText":"Texte élargi","LCHDOMElementFocus":"Faire le point","LCHRunCommand":"Exécuter la commande","LCHSearchWith":"Chercher avec","LCHSearchFor":"Chercher pour","LCHSubjectContainerShowContents":"Montrer le contenu","LCHURLOpen":"Ouvrir l'URL","SubjectContainer":"Contenant des sujets","String":"String","Date":"Date","URL":"URL","ServiceSearchURLTemplate":"Modèle URL de service de recherche","DOMElement":"Élément DOM"}},"pt":{"LCHLauncherInputPlaceholderDefault":"Digitar para pesquisar","LCHLauncherInputPlaceholderPreview":"Digitar para filtrar","LCHLauncherSubjectPromptPlaceholderText":"Digitar para pesquisar","LCHLauncherSubjectPromptHeadingText":"Sujeito","LCHLauncherActionPromptHeadingText":"Ação","LCHLauncherObjectPromptHeadingText":"Objeto","LCHCopyToClipboardButtonText":"Cópia na área de transferência","LCHStandardRecipeNames":{"LCHActiveDocumentFocusElements":"Elementos de foco no documento ativo","LCHCopyToClipboard":"Cópia na área de transferência","LCHLargeText":"Texto grande","LCHDOMElementFocus":"Foco","LCHRunCommand":"Executar Comando","LCHSearchWith":"Buscar com","LCHSearchFor":"Buscar por","LCHSubjectContainerShowContents":"Mostrar conteúdo","LCHURLOpen":"Abrir URL","SubjectContainer":"Contêiner do Sujeito","String":"Sequência","Date":"Data","URL":"URL","ServiceSearchURLTemplate":"Modelo de URL do serviço de pesquisa","DOMElement":"Elemento do DOM"}}}`)[LRTOptions.LCHOptionLanguage]);
	    	};

	    	function ActivePromptFilterTextShouldUpdate(inputData) {
	    		(function SetFilterText() {
	    			$$invalidate(1, mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptFilterText = inputData, mod);
	    		})();

	    		(function ClearFilterTextOnSubsequentPrompts() {
	    			for (var i = 0; i < mod._ValuePromptObjects.length; i++) {
	    				if (!i) {
	    					continue;
	    				}

	    				if (i === mod._ValuePromptActiveIndex) {
	    					continue;
	    				}

	    				$$invalidate(1, mod._ValuePromptObjects[i].LCHPromptFilterText = "", mod);
	    				$$invalidate(1, mod._ValuePromptObjects[i].LCHPromptMatchStop = false, mod);
	    			}
	    		})();

	    		(function SetMatchStop() {
	    			if (LRTOptions.LCHOptionMode !== mod$3.LCHLauncherModePipe()) {
	    				return;
	    			}

	    			if (mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptInputThrottle === false) {
	    				$$invalidate(1, mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptMatchStop = false, mod);
	    			}

	    			if (!mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptFilterText) {
	    				$$invalidate(1, mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptMatchStop = false, mod);
	    			}
	    		})();

	    		(function ThrottleInput() {
	    			if (LRTOptions.LCHOptionMode !== mod$3.LCHLauncherModePipe()) {
	    				return;
	    			}

	    			if (!mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptFilterText) {
	    				return;
	    			}

	    			const inputData = mod._ValuePromptActiveIndex;

	    			main$2.OLSKThrottleMappedTimeout(mod._ValuePromptObjects[inputData], "LCHPromptInputThrottle", {
	    				OLSKThrottleDuration: mod$3.LCHLauncherThrottleDuration,
	    				OLSKThrottleCallback() {
	    					setTimeout(function () {
	    						$$invalidate(1, mod._ValuePromptObjects[inputData].LCHPromptInputThrottle = false, mod);
	    					});
	    				}
	    			});
	    		})();

	    		(function ThrottleResults() {
	    			if (LRTOptions.LCHOptionMode !== mod$3.LCHLauncherModePipe()) {
	    				return;
	    			}

	    			if (!mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptFilterText) {
	    				return;
	    			}

	    			const inputData = mod._ValuePromptActiveIndex;

	    			main$2.OLSKThrottleMappedTimeout(mod._ValuePromptObjects[inputData], "LCHPromptResultsThrottle", {
	    				OLSKThrottleDuration: mod$3.LCHLauncherThrottleDuration,
	    				OLSKThrottleCallback() {
	    					setTimeout(function () {
	    						$$invalidate(1, mod._ValuePromptObjects[inputData].LCHPromptResultsThrottle = false, mod);
	    					});
	    				}
	    			});
	    		})();

	    		(function SetItems() {
	    			ActivePromptItemsShouldUpdate((function () {
	    				if (LRTOptions.LCHOptionMode === mod$3.LCHLauncherModePipe() && !mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptFilterText && mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptResultsThrottle === false) {
	    					return mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptItemsVisible;
	    				}

	    				if (!mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptFilterText) {
	    					return LRTOptions.LCHOptionMode === mod$3.LCHLauncherModePreview()
	    					? mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptItemsAll
	    					: [];
	    				}

	    				const visibleRecipes = mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptItemsAll.filter(function (e) {
	    					return e.LCHRecipeIsExcluded ? !e.LCHRecipeIsExcluded() : true;
	    				});

	    				let results = fuzzysort.go(mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptFilterText, visibleRecipes, { key: "LCHRecipeName" });

	    				if (!results.length && main_1() && !mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptFilterText.slice(0, 3).match(/[^A-Z]/)) {
	    					return visibleRecipes.filter(function (e) {
	    						return e.LCHRecipeSignature === mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptFilterText;
	    					});
	    				}

	    				

	    				if (LRTOptions.LCHOptionMode === mod$3.LCHLauncherModePipe() && mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptItemsVisible.length && !results.length) {
	    					if (mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptResultsThrottle) {
	    						main$2.OLSKThrottleSkip(mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptResultsThrottle);
	    					}

	    					$$invalidate(1, mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptMatchStop = true, mod);
	    					return mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptItemsVisible;
	    				}

	    				return results.sort(function (a, b) {
	    					return a.score < b.score ? 1 : a.score > b.score ? -1 : 0;
	    				}).map(function (e) {
	    					return e.obj;
	    				});
	    			})());
	    		})();
	    	}

	    	function ActivePromptItemsShouldUpdate(inputData) {
	    		(function SetItems() {
	    			$$invalidate(1, mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptItemsVisible = inputData, mod);
	    		})();

	    		(function SetItemSelected() {
	    			ActivePromptItemSelectedShouldUpdate(mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptItemsVisible[0]);
	    		})();
	    	}

	    	function ActivePromptItemSelectedShouldUpdate(inputData) {
	    		(function SetItemSelected() {
	    			$$invalidate(1, mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptItemSelected = inputData, mod);

	    			if (LRTOptions.LCHOptionMode !== mod$3.LCHLauncherModePreview()) {
	    				return;
	    			}

	    			mod.ControlRun(mod._ValuePromptObjects[0].LCHPromptItemSelected);
	    		})();

	    		if (LRTOptions.LCHOptionMode !== mod$3.LCHLauncherModePipe()) {
	    			return;
	    		}

	    		(function UpdateActionsForSubject() {
	    			if (mod._ValuePromptActiveIndex !== 0) {
	    				return;
	    			}

	    			if (!mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptItemSelected) {
	    				$$invalidate(1, mod._ValuePromptObjects[1].LCHPromptItemsVisible = $$invalidate(1, mod._ValuePromptObjects[1].LCHPromptItemsAll = [], mod), mod);
	    				delete mod._ValuePromptObjects[1].LCHPromptItemSelected;
	    				return;
	    			}

	    			$$invalidate(
	    				1,
	    				mod._ValuePromptObjects[1].LCHPromptItemsAll = mod._ValueAllActions.filter(function (e) {
	    					return mod._ValueTypeEquivalenceMap[inputData.LCHRecipeOutputType || "Command"].filter(function (type) {
	    						return mod$1.LCHRuntimeInputTypes(e.LCHRecipeInputTypes).shift() === type;
	    					}).length;
	    				}).sort(mod$3.LCHLauncherActionComparator(inputData.LCHRecipeOutputType || "Command")),
	    				mod
	    			);

	    			$$invalidate(1, mod._ValuePromptObjects[1].LCHPromptItemsVisible = mod._ValuePromptObjects[1].LCHPromptItemsAll, mod);
	    			$$invalidate(1, mod._ValuePromptObjects[1].LCHPromptItemSelected = mod._ValuePromptObjects[1].LCHPromptItemsVisible[0], mod);
	    		})();

	    		(function UpdateObjectsForAction() {
	    			if (mod._ValuePromptActiveIndex > 1) {
	    				return;
	    			}

	    			if (!mod._ValuePromptObjects[1].LCHPromptItemSelected) {
	    				return;
	    			}

	    			$$invalidate(1, mod._ValuePromptObjects[2].LCHPromptIsVisible = mod$2.LCHRecipesActionTakesObject(mod._ValuePromptObjects[1].LCHPromptItemSelected), mod);

	    			$$invalidate(
	    				1,
	    				mod._ValuePromptObjects[2].LCHPromptItemsAll = !mod._ValuePromptObjects[2].LCHPromptIsVisible || mod$1.LCHRuntimeInputTypes(mod._ValuePromptObjects[1].LCHPromptItemSelected.LCHRecipeInputTypes).pop() === "String"
	    				? []
	    				: mod._ValueAllSubjects.filter(function (e) {
	    						return mod._ValueTypeEquivalenceMap[mod$1.LCHRuntimeInputTypes(mod._ValuePromptObjects[1].LCHPromptItemSelected.LCHRecipeInputTypes).pop()].includes(e.LCHRecipeOutputType);
	    					}),
	    				mod
	    			);

	    			$$invalidate(1, mod._ValuePromptObjects[2].LCHPromptItemsVisible = mod._ValuePromptObjects[2].LCHPromptItemsAll, mod);
	    			$$invalidate(1, mod._ValuePromptObjects[2].LCHPromptItemSelected = mod._ValuePromptObjects[2].LCHPromptItemsVisible[0], mod);
	    		})();
	    	}

	    	const refactorDependancies = function () {
	    		
	    	};

	    	const mod = {
	    		// VALUE
	    		_ValuePromptActiveIndex: 0,
	    		_ValuePromptObjects: [],
	    		_ValueAllPromptRecipes: [],
	    		_ValueAllSubjects: [],
	    		_ValueAllActions: [],
	    		ValuePromptActiveIndex(inputData) {
	    			if (typeof inputData === "undefined") {
	    				return mod._ValuePromptActiveIndex;
	    			}

	    			(function CancelThrottle() {
	    				if (LRTOptions.LCHOptionMode !== mod$3.LCHLauncherModePipe()) {
	    					return;
	    				}

	    				if (main$2.OLSKThrottleIsValid(mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptInputThrottle)) {
	    					clearTimeout(mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptInputThrottle._OLSKThrottleTimeoutID);
	    				}

	    				$$invalidate(1, mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptInputThrottle = undefined, mod);

	    				if (main$2.OLSKThrottleIsValid(mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptResultsThrottle)) {
	    					clearTimeout(mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptResultsThrottle._OLSKThrottleTimeoutID);
	    				}

	    				$$invalidate(1, mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptResultsThrottle = undefined, mod);
	    			})();

	    			if (!mod._ValuePromptObjects[1].LCHPromptItemsAll.length) {
	    				return;
	    			}

	    			(function SetIndexActive() {
	    				$$invalidate(1, mod._ValuePromptActiveIndex = inputData, mod);
	    			})();

	    			(function ActivateDotMode() {
	    				if (mod._ValuePromptActiveIndex !== 2) {
	    					return;
	    				}

	    				if (mod$1.LCHRuntimeInputTypes(mod._ValuePromptObjects[1].LCHPromptItemSelected.LCHRecipeInputTypes).pop() !== "String") {
	    					return;
	    				}

	    				mod.ValuePromptDotModeEnabled(true);
	    				mod.ValuePromptDotModeText(mod.ValuePromptDotModeText());
	    			})();
	    		},
	    		ValuePromptDotModeEnabled(inputData) {
	    			if (typeof inputData === "undefined") {
	    				return mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptDotModeEnabled;
	    			}

	    			$$invalidate(1, mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptDotModeEnabled = inputData, mod);
	    		},
	    		ValuePromptDotModeText(inputData) {
	    			if (typeof inputData === "undefined") {
	    				return mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptDotModeText;
	    			}

	    			$$invalidate(1, mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptDotModeText = inputData, mod);

	    			ActivePromptItemsShouldUpdate(mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptDotModeText
	    			? [
	    					{
	    						LCHRecipeName: mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptDotModeText,
	    						LCHRecipeCallback() {
	    							return inputData;
	    						},
	    						LCHRecipeOutputType: LCHPrimitiveURLCallback(mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptDotModeText)
	    						? "URL"
	    						: "String"
	    					}
	    				]
	    			: []);
	    		},
	    		ValuePromptResultsIsVisible(inputData) {
	    			if (typeof inputData === "undefined") {
	    				return mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptResultsThrottle === false;
	    			}

	    			$$invalidate(1, mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptResultsThrottle = inputData ? false : undefined, mod);
	    		},
	    		// DATA
	    		DataComposition() {
	    			if (LRTOptions.LCHOptionMode === mod$3.LCHLauncherModePipe()) {
	    				return {
	    					LCHCompositionAction: mod._ValuePromptObjects[1].LCHPromptItemSelected,
	    					LCHCompositionSubjectPrimary: mod._ValuePromptObjects[0].LCHPromptItemSelected,
	    					LCHCompositionSubjectSecondary: mod._ValuePromptObjects[2].LCHPromptItemSelected
	    				};
	    			}

	    			return {
	    				LCHCompositionAction: Object.assign(LCHRunCommandRecipe(), {
	    					LCHRecipeName: OLSKLocalized("LCHStandardRecipeNames")[LCHRunCommandRecipe().LCHRecipeSignature]
	    				}),
	    				LCHCompositionSubjectPrimary: mod._ValuePromptObjects[0].LCHPromptItemSelected
	    			};
	    		},
	    		// INTERFACE
	    		InterfaceBodyDidClick(event) {
	    			if (!mod._ValueComponentDidMount) {
	    				return;
	    			}

	    			

	    			if (mod._ValueRootElementInstance.contains(event.target)) {
	    				return;
	    			}

	    			mod.ControlExit();
	    		},
	    		interfaceDidClickPrompt(inputData) {
	    			if (LRTOptions.LCHOptionMode !== mod$3.LCHLauncherModePipe()) {
	    				return;
	    			}

	    			mod.ValuePromptActiveIndex(mod._ValuePromptObjects.indexOf(inputData));
	    		},
	    		interfaceDidKeydown(event) {
	    			mod.ControlHandleEventKeydown(event);
	    		},
	    		InterfaceDotModeFieldDidInput(event) {
	    			mod.ValuePromptDotModeText(this.value);
	    		},
	    		// CONTROL
	    		_ControlHandleEventKeydownModeDotMode(event) {
	    			const handlerFunctions = {
	    				Escape() {
	    					event.preventDefault();
	    					event.stopPropagation();
	    					return mod.ValuePromptDotModeEnabled(false) || true;
	    				},
	    				Tab() {
	    					event.preventDefault();
	    					event.stopPropagation();

	    					if (!mod.ValuePromptDotModeText()) {
	    						return true;
	    					}

	    					return mod.ValuePromptDotModeEnabled(false);
	    				},
	    				Enter() {
	    					return mod.ValuePromptDotModeEnabled(false);
	    				}
	    			};

	    			if (!handlerFunctions[event.key]) {
	    				return true;
	    			}

	    			return handlerFunctions[event.key]();
	    		},
	    		_ControlHandleEventKeydownEscape(event) {
	    			event.preventDefault();
	    			event.stopPropagation();

	    			if (LRTOptions.LCHOptionMode === mod$3.LCHLauncherModePipe() && mod.ValuePromptResultsIsVisible()) {
	    				return mod.ValuePromptResultsIsVisible(false);
	    			}

	    			if (LRTOptions.LCHOptionMode !== mod$3.LCHLauncherModePipe() && mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptFilterText) {
	    				return ActivePromptFilterTextShouldUpdate("");
	    			}

	    			mod.ControlExit();
	    		},
	    		_ControlHandleEventKeydownTab(event) {
	    			event.preventDefault();

	    			if (LRTOptions.LCHOptionMode !== mod$3.LCHLauncherModePipe()) {
	    				return;
	    			}

	    			mod.ValuePromptActiveIndex(mod$3.LCHLauncherConstrainIndex(
	    				mod._ValuePromptObjects.filter(function (e) {
	    					return e.LCHPromptIsVisible;
	    				}),
	    				mod._ValuePromptActiveIndex + (event.shiftKey ? -1 : 1) * (function () {
	    					if (!mod._ValuePromptActiveIndex && mod._ValuePromptObjects[2].LCHPromptIsVisible && mod._ValuePromptObjects[1].LCHPromptItemsAll.length === 1) {
	    						return 2;
	    					}

	    					return 1;
	    				})()
	    			));
	    		},
	    		_ControlHandleEventKeydownEnter(event) {
	    			event.preventDefault();
	    			event.stopPropagation();

	    			if (mod$2.LCHCompositionErrors(mod.DataComposition())) {
	    				return;
	    			}

	    			mod.ControlTerminate();
	    		},
	    		_ControlHandleEventKeydownArrow(event) {
	    			if (LRTOptions.LCHOptionMode !== mod$3.LCHLauncherModePipe()) {
	    				return;
	    			}

	    			event.preventDefault();

	    			if (!mod.ValuePromptResultsIsVisible()) {
	    				return mod.ValuePromptResultsIsVisible(true);
	    			}

	    			if (!mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptResultsThrottle) {
	    				return;
	    			}

	    			main$2.OLSKThrottleSkip(mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptResultsThrottle);
	    		},
	    		_ControlHandleEventKeydownArrowDown(event) {
	    			if (LRTOptions.LCHOptionMode !== mod$3.LCHLauncherModePipe()) {
	    				return;
	    			}

	    			event.preventDefault();

	    			if (mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptResultsThrottle === undefined) {
	    				$$invalidate(1, mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptResultsThrottle = false, mod);
	    				return;
	    			}

	    			if (!mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptResultsThrottle) {
	    				return;
	    			}

	    			main$2.OLSKThrottleSkip(mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptResultsThrottle);
	    		},
	    		_ControlHandleEventKeydownDot(event) {
	    			if (LRTOptions.LCHOptionMode !== mod$3.LCHLauncherModePipe()) {
	    				return;
	    			}

	    			event.preventDefault();

	    			if (mod._ValuePromptActiveIndex !== 0) {
	    				return;
	    			}

	    			if (main$2.OLSKThrottleIsValid(mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptResultsThrottle)) {
	    				clearTimeout(mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptResultsThrottle._OLSKThrottleTimeoutID);
	    			}

	    			mod.ValuePromptResultsIsVisible(false);
	    			mod.ValuePromptDotModeEnabled(true);
	    			ActivePromptFilterTextShouldUpdate("");
	    			mod.ValuePromptDotModeText(mod.ValuePromptDotModeText());

	    			if (mod.ValuePromptDotModeText()) {
	    				return;
	    			}

	    			$$invalidate(1, mod._ValuePromptObjects[1].LCHPromptItemsAll = [], mod);
	    			$$invalidate(1, mod._ValuePromptObjects[1].LCHPromptItemsVisible = [], mod);
	    			delete mod._ValuePromptObjects[1].LCHPromptItemSelected;
	    		},
	    		_ControlHandleEventKeydownBackspace(event) {
	    			if (LRTOptions.LCHOptionMode !== mod$3.LCHLauncherModePipe()) {
	    				return;
	    			}

	    			event.preventDefault();

	    			if (mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptResultsThrottle) {
	    				return ActivePromptFilterTextShouldUpdate(mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptFilterText.slice(0, -1));
	    			}

	    			if (mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptFilterText) {
	    				$$invalidate(1, mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptMatchStop = false, mod);
	    				return ActivePromptFilterTextShouldUpdate("");
	    			}

	    			ActivePromptItemsShouldUpdate([]);
	    			$$invalidate(1, mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptResultsThrottle = undefined, mod);
	    			$$invalidate(1, mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptDotModeText = "", mod);
	    		},
	    		ControlHandleEventKeydown(event) {
	    			if (mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptDotModeEnabled && mod._ControlHandleEventKeydownModeDotMode(event)) {
	    				return;
	    			}

	    			const handlerFunctions = {
	    				Escape: mod._ControlHandleEventKeydownEscape,
	    				Tab: mod._ControlHandleEventKeydownTab,
	    				".": mod._ControlHandleEventKeydownDot,
	    				Enter: mod._ControlHandleEventKeydownEnter,
	    				ArrowUp: mod._ControlHandleEventKeydownArrow,
	    				ArrowDown: mod._ControlHandleEventKeydownArrowDown,
	    				Backspace: mod._ControlHandleEventKeydownBackspace
	    			};

	    			if (handlerFunctions[event.key]) {
	    				return handlerFunctions[event.key](event);
	    			}

	    			if (mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptDotModeEnabled) {
	    				return;
	    			}

	    			if (LRTOptions.LCHOptionMode !== mod$3.LCHLauncherModePipe()) {
	    				return;
	    			}

	    			event.preventDefault();

	    			if (!mod$3.LCHLauncherKeyboardEventIsTextInput(event)) {
	    				return;
	    			}

	    			ActivePromptFilterTextShouldUpdate(!mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptInputThrottle
	    			? event.key
	    			: mod._ValuePromptObjects[mod._ValuePromptActiveIndex].LCHPromptFilterText + event.key);
	    		},
	    		ControlReloadSubjects(inputData) {
	    			let reloadSubjects = mod$3.LCHLauncherReloadableSubjects([inputData]);

	    			if (!reloadSubjects.length) {
	    				return false;
	    			}

	    			
	    			$$invalidate(1, mod._ValuePromptObjects[0].LCHPromptItemsVisible = [], mod);
	    			$$invalidate(1, mod._ValuePromptObjects[0].LCHPromptItemsAll = reloadSubjects, mod);
	    			mod.ValuePromptActiveIndex(0);
	    			ActivePromptItemSelectedShouldUpdate(reloadSubjects[0]);
	    			return true;
	    		},
	    		async ControlTerminate() {
	    			if (LRTOptions.LCHOptionMode === mod$3.LCHLauncherModePipe()) {
	    				if (mod.ControlReloadSubjects(await mod.ControlRun(mod.DataComposition()))) {
	    					return;
	    				}

	    				
	    			}

	    			if (LRTOptions.LCHOptionMode === mod$3.LCHLauncherModeCommit()) {
	    				await mod.ControlRun(mod._ValuePromptObjects[0].LCHPromptItemSelected);
	    			}

	    			mod.ControlExit();
	    		},
	    		async ControlRun(inputData) {
	    			return mod._ControlRun(inputData.LCHCompositionAction
	    			? await mod$2.LCHAPIExecuteComposition(inputData, mod._ValueSharedAPI)
	    			: await mod$2.LCHAPIExecuteRecipe(inputData, [], mod._ValueSharedAPI));
	    		},
	    		async _ControlRun(inputData) {
	    			if (!inputData) {
	    				return Promise.resolve(inputData);
	    			}

	    			if (typeof inputData !== "object") {
	    				return Promise.resolve(inputData);
	    			}

	    			if (mod$2.LCHComponentDescriptorsErrors(inputData)) {
	    				return Promise.resolve(inputData);
	    			}

	    			return new Promise(function (resolve, reject) {
	    					let LCHInstanceProps = inputData.LCHComponentDescriptorProps;

	    					if (inputData.LCHComponentDescriptorOLSKLocalized) {
	    						Object.assign(LCHInstanceProps, { OLSKLocalized });
	    					}

	    					

	    					LCHInstanceProps[inputData.LCHComponentDescriptorCompletionHandlerSignature] = function () {
	    						delete mod._ValueSecondaryComponentDescriptor;
	    						mod.ControlExit();
	    					};

	    					$$invalidate(
	    						1,
	    						mod._ValueSecondaryComponentDescriptor = {
	    							LCHInstanceClass: apiComponents[inputData.LCHComponentDescriptorName],
	    							LCHInstanceProps
	    						},
	    						mod
	    					);
	    				});
	    		},
	    		ControlExit() {
	    			if (mod._ValueFilterInputInstance === document.activeElement) {
	    				mod._ValueFilterInputInstance.blur();
	    			}

	    			

	    			if (typeof LRTDidFinish !== "function") {
	    				return;
	    			}

	    			return LRTDidFinish();
	    		},
	    		// REACT
	    		ReactFocusFilterInput() {
	    			if (LRTOptions.LCHOptionMode === mod$3.LCHLauncherModePipe()) {
	    				return;
	    			}

	    			setTimeout(
	    				function () {
	    					mod._ValueFilterInputInstance.focus();
	    				},
	    				20
	    			);
	    		},
	    		ReactScrollSelectedItemIntoView() {
	    			if (main_1()) {
	    				return;
	    			}

	    			/* OLSKResultsListCapAndScroll */
	    			let element = document.querySelector(".OLSKResultsListItemSelected");

	    			if (!element) {
	    				return;
	    			}

	    			element.scrollIntoView({ block: "nearest", inline: "nearest" });
	    		},
	    		// SETUP
	    		async SetupEverything() {
	    			mod.SetupSharedRecipes();
	    			await mod.SetupPageRecipes();
	    			mod.SetupSharedAPI();
	    			mod.SetupTasks();
	    			mod.SetupPromptObjects();
	    		},
	    		SetupSharedRecipes() {
	    			$$invalidate(
	    				1,
	    				mod._ValueSharedRecipes = LCHLauncherStandardRecipes().map(function (e) {
	    					return Object.assign(e, {
	    						LCHRecipeName: e.LCHRecipeName || OLSKLocalized("LCHStandardRecipeNames")[e.LCHRecipeSignature], // #purge
	    						
	    					});
	    				}).concat(mod$2.LCHRuntimeFilteredRecipes(LRTOptions.LCHOptionRecipes, window.location.href)),
	    				mod
	    			);
	    		},
	    		async SetupPageRecipes() {
	    			if (!LRTOptions.LCHOptionIncludePageRecipes) {
	    				return;
	    			}

	    			
	    			let inputData = window.LCHPageRecipes;

	    			if (!inputData) {
	    				inputData = (window.wrappedJSObject || {}).LCHPageRecipes;
	    			}

	    			

	    			if (!inputData && window.location.origin && window.location.origin !== "null") {
	    				// about:blank has no origin
	    				await new Promise(function (resolve, reject) {
	    						function receiveMessage(event) {
	    							if (event.source !== window && !main_1()) {
	    								return console.log("not window");
	    							}

	    							if (event.data === "LCHPageRecipes") {
	    								return;
	    							}

	    							if (!Array.isArray(event.data)) {
	    								return;
	    							}

	    							window.removeEventListener("message", receiveMessage);

	    							inputData = event.data.filter(function (e) {
	    								return !mod$2.LCHRecipeProxyErrors(e);
	    							}).map(function (e) {
	    								return {
	    									LCHRecipeName: e.LCHRecipeProxyName,
	    									LCHRecipeSignature: e.LCHRecipeProxySignature,
	    									LCHRecipeCallback() {
	    										window.postMessage(e.LCHRecipeProxySignature, window.location.origin);
	    									}
	    								};
	    							});

	    							resolve();
	    						}

	    						
	    						window.addEventListener("message", receiveMessage, false);
	    						window.postMessage("LCHPageRecipes", window.location.origin);
	    						setTimeout(resolve, 20);
	    					});
	    			}

	    			

	    			if (!Array.isArray(inputData)) {
	    				return;
	    			}

	    			mod._ValueSharedRecipes.push(...Array.from(inputData).map(function (e) {
	    				delete e.LCHRecipeURLFilter;
	    				delete e.LCHRecipeIsAutomatic;
	    				e._LCHRecipeSource = window.location.host;
	    				return e;
	    			}).filter(function (e) {
	    				return !mod$2.LCHRecipesErrors(e);
	    			}));
	    		},
	    		SetupSharedAPI() {
	    			$$invalidate(1, mod._ValueSharedAPI = mod$1.LCHRuntimeAPI(mod._ValueSharedRecipes), mod);
	    		},
	    		SetupTasks() {
	    			if (!LRTOptions.LCHOptionRunAutomaticRecipes) {
	    				return;
	    			}

	    			
	    			mod$2.LCHAPIRunTasks(mod._ValueSharedRecipes, window.location.href);
	    		},
	    		SetupPromptObjects() {
	    			$$invalidate(1, mod._ValueAllPromptRecipes = mod$3.LCHLauncherUIRecipesForMode(mod._ValueSharedRecipes, LRTOptions.LCHOptionMode), mod);

	    			if (LRTOptions.LCHOptionMode === mod$3.LCHLauncherModePipe()) {
	    				$$invalidate(1, mod._ValueTypeEquivalenceMap = mod$2.LCHAPITypeEquivalenceMapForRecipes(mod._ValueSharedRecipes), mod);
	    				const typeNameMap = mod$2.LCHAPITypeNameMap(mod._ValueSharedRecipes);

	    				$$invalidate(
	    					1,
	    					mod._ValueAllSubjects = mod._ValueAllPromptRecipes.filter(function (e) {
	    						if (mod$2.LCHRecipesIsSubject(e)) {
	    							return true;
	    						}

	    						

	    						if (mod$2.LCHRecipesIsCommand(e)) {
	    							return true;
	    						}

	    						
	    						return false;
	    					}).filter(function (e) {
	    						return !e.LCHRecipeOutputType || Object.keys(mod._ValueTypeEquivalenceMap).includes(e.LCHRecipeOutputType);
	    					}).map(function (e) {
	    						return Object.assign(e, {
	    							_LCHRecipeOutputTypeName: typeNameMap[e.LCHRecipeOutputType]
	    						});
	    					}),
	    					mod
	    				);

	    				$$invalidate(1, mod._ValueAllActions = mod._ValueAllPromptRecipes.filter(mod$2.LCHRecipesIsAction), mod);

	    				const _ActionableTypesForPrimarySubject = Object.keys(mod._ValueTypeEquivalenceMap).filter(function (type) {
	    					return mod._ValueAllActions.filter(function (e) {
	    						return mod$1.LCHRuntimeInputTypes(e.LCHRecipeInputTypes).shift() === type;
	    					}).length;
	    				});

	    				return mod._ValuePromptObjects.push(...[
	    					{
	    						LCHPromptClass: "LCHLauncherSubjectPrompt",
	    						LCHPromptHeading: OLSKLocalized("LCHLauncherSubjectPromptHeadingText"),
	    						LCHPromptItemsVisible: [],
	    						LCHPromptItemsAll: mod._ValueAllSubjects.filter(function (e) {
	    							return !e.LCHRecipeOutputType || _ActionableTypesForPrimarySubject.includes(e.LCHRecipeOutputType);
	    						}),
	    						// LCHPromptItemSelected: null,
	    						LCHPromptInputThrottle: undefined,
	    						LCHPromptFilterText: "",
	    						LCHPromptMatchStop: false,
	    						LCHPromptResultsThrottle: undefined,
	    						LCHPromptDotModeText: "",
	    						LCHPromptIsVisible: true
	    					},
	    					{
	    						LCHPromptClass: "LCHLauncherActionPrompt",
	    						LCHPromptHeading: OLSKLocalized("LCHLauncherActionPromptHeadingText"),
	    						LCHPromptItemsVisible: [],
	    						LCHPromptItemsAll: [],
	    						// LCHPromptItemSelected: null,
	    						LCHPromptInputThrottle: undefined,
	    						LCHPromptFilterText: "",
	    						LCHPromptMatchStop: false,
	    						LCHPromptResultsThrottle: undefined,
	    						LCHPromptIsVisible: true
	    					},
	    					{
	    						LCHPromptClass: "LCHLauncherObjectPrompt",
	    						LCHPromptHeading: OLSKLocalized("LCHLauncherObjectPromptHeadingText"),
	    						LCHPromptItemsVisible: [],
	    						LCHPromptItemsAll: [],
	    						// LCHPromptItemSelected: null,
	    						LCHPromptInputThrottle: undefined,
	    						LCHPromptFilterText: "",
	    						LCHPromptMatchStop: false,
	    						LCHPromptResultsThrottle: undefined,
	    						LCHPromptDotModeText: "",
	    						LCHPromptIsVisible: false
	    					}
	    				]);
	    			}

	    			mod._ValuePromptObjects.push({
	    				LCHPromptClass: "LCHLauncherFilterPrompt",
	    				LCHPromptItemsVisible: [],
	    				LCHPromptItemsAll: mod._ValueAllPromptRecipes,
	    				LCHPromptFilterText: "",
	    				LCHPromptResultsThrottle: false,
	    				LCHPromptIsVisible: true
	    			});

	    			if (LRTOptions.LCHOptionMode !== mod$3.LCHLauncherModePreview()) {
	    				return;
	    			}

	    			$$invalidate(1, mod._ValuePromptObjects[0].LCHPromptItemsVisible = mod._ValuePromptObjects[0].LCHPromptItemsAll, mod);

	    			$$invalidate(
	    				1,
	    				mod._ValuePromptObjects[0].LCHPromptItemSelected = mod._ValuePromptObjects[0].LCHPromptItemsAll.filter(function (e) {
	    					return e._LCHRecipeIsSelected;
	    				}).shift(),
	    				mod
	    			);
	    		},
	    		// LIFECYCLE
	    		LifecycleModuleWillMount() {
	    			mod.SetupEverything();
	    		},
	    		LifecycleModuleDidMount() {
	    			setTimeout(
	    				function () {
	    					$$invalidate(1, mod._ValueComponentDidMount = true, mod);
	    				},
	    				100
	    			);
	    		}, // mod.ReactFocusFilterInput();
	    		LifecycleModuleDidUpdate() {
	    			mod.ReactScrollSelectedItemIntoView();
	    		}
	    	};

	    	mod.LifecycleModuleWillMount();
	    	onMount(mod.LifecycleModuleDidMount);
	    	afterUpdate(mod.LifecycleModuleDidUpdate);
	    	const writable_props = ["LRTOptions", "LRTDidFinish"];

	    	Object_1.keys($$props).forEach(key => {
	    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<Main> was created with unknown prop '${key}'`);
	    	});

	    	function input_input_handler() {
	    		mod._ValuePromptObjects[0].LCHPromptFilterText = this.value;
	    		$$invalidate(1, mod);
	    	}

	    	function input_binding($$value) {
	    		binding_callbacks[$$value ? "unshift" : "push"](() => {
	    			mod._ValueFilterInputInstance = $$value;
	    			$$invalidate(1, mod);
	    		});
	    	}

	    	const input_handler = () => ActivePromptFilterTextShouldUpdate(mod._ValueFilterInputInstance.value);

	    	function input_input_handler_1(each_value, e_index) {
	    		each_value[e_index].LCHPromptDotModeText = this.value;
	    		$$invalidate(1, mod);
	    	}

	    	const ResultListDispatchArrow_handler = event => ActivePromptItemSelectedShouldUpdate(event.detail);
	    	const ResultListDispatchClick_handler = event => ActivePromptItemSelectedShouldUpdate(event.detail) || mod.ControlTerminate();
	    	const click_handler = e => mod.interfaceDidClickPrompt(e);

	    	function div_binding($$value) {
	    		binding_callbacks[$$value ? "unshift" : "push"](() => {
	    			mod._ValueRootElementInstance = $$value;
	    			$$invalidate(1, mod);
	    		});
	    	}

	    	$$self.$$set = $$props => {
	    		if ("LRTOptions" in $$props) $$invalidate(0, LRTOptions = $$props.LRTOptions);
	    		if ("LRTDidFinish" in $$props) $$invalidate(5, LRTDidFinish = $$props.LRTDidFinish);
	    	};

	    	$$self.$capture_state = () => ({
	    		LRTOptions,
	    		LRTDidFinish,
	    		OLSK_SPEC_UI: main_1,
	    		LCHLauncherLogic: mod$3,
	    		LCHLauncherAPI: mod$2,
	    		OLSKInternational,
	    		OLSKLocalized,
	    		fuzzysort,
	    		ActivePromptFilterTextShouldUpdate,
	    		ActivePromptItemsShouldUpdate,
	    		ActivePromptItemSelectedShouldUpdate,
	    		refactorDependancies,
	    		OLSKThrottle: main$2,
	    		LCHRuntime: mod$1,
	    		LCHLauncherStandardRecipes,
	    		LCHRunCommandRecipe,
	    		LCHPrimitiveURLCallback,
	    		apiComponents,
	    		mod,
	    		onMount,
	    		afterUpdate,
	    		LCHLauncherPrompt: Main$3,
	    		LCHLauncherPipeItem: Main$2
	    	});

	    	$$self.$inject_state = $$props => {
	    		if ("LRTOptions" in $$props) $$invalidate(0, LRTOptions = $$props.LRTOptions);
	    		if ("LRTDidFinish" in $$props) $$invalidate(5, LRTDidFinish = $$props.LRTDidFinish);
	    	};

	    	if ($$props && "$$inject" in $$props) {
	    		$$self.$inject_state($$props.$$inject);
	    	}

	    	return [
	    		LRTOptions,
	    		mod,
	    		OLSKLocalized,
	    		ActivePromptFilterTextShouldUpdate,
	    		ActivePromptItemSelectedShouldUpdate,
	    		LRTDidFinish,
	    		input_input_handler,
	    		input_binding,
	    		input_handler,
	    		input_input_handler_1,
	    		ResultListDispatchArrow_handler,
	    		ResultListDispatchClick_handler,
	    		click_handler,
	    		div_binding
	    	];
	    }

	    class Main$4 extends SvelteComponentDev {
	    	constructor(options) {
	    		super(options);
	    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { LRTOptions: 0, LRTDidFinish: 5 });

	    		dispatch_dev("SvelteRegisterComponent", {
	    			component: this,
	    			tagName: "Main",
	    			options,
	    			id: create_fragment$4.name
	    		});
	    	}

	    	get LRTOptions() {
	    		throw new Error("<Main>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	set LRTOptions(value) {
	    		throw new Error("<Main>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	get LRTDidFinish() {
	    		throw new Error("<Main>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}

	    	set LRTDidFinish(value) {
	    		throw new Error("<Main>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    	}
	    }

	    return Main$4;

	}));

	});

	var Main = unwrapExports(uiBehaviour);

	mod$4._ValueClass = Main;

	var rollupStart = LCHPackage();

	return rollupStart;

}());
//# sourceMappingURL=launchlet.js.map
