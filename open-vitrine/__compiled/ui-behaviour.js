var LCHVitrineBehaviour = (function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var main = createCommonjsModule(function (module, exports) {
	(function(global, factory) {
		 factory(exports) ;
	}(commonjsGlobal, (function(exports) {
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

				if (inputData.split('.').shift() !== exports.OLSKInternationalDefaultIdentifier()) {
					return false;
				}

				if (!exports._OLSKInternationalLanguageID(inputData)) {
					return false;
				}

				return true;
			},

			OLSKInternationalLanguageID (inputData) {
				if (!exports.OLSKInternationalIsTranslationFileBasename(inputData)) {
					throw new Error('OLSKErrorInputNotValid');
				}

				return exports._OLSKInternationalLanguageID(inputData);
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
						return [exports.OLSKInternationalSimplifiedLanguageCode(e), e]
					}).reverse());

				return function (signature, requestLocales) {
					if (!Array.isArray(requestLocales)) {
						throw new Error('OLSKErrorInputNotValid');
					}

					let locales = _locales.concat(...requestLocales.map(function (e) {
						return [exports.OLSKInternationalSimplifiedLanguageCode(e), e]
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

		};
		
		Object.assign(exports, mod);

		Object.defineProperty(exports, '__esModule', {
			value: true
		});

	})));
	});

	var OLSKInternational = unwrapExports(main);

	var main$1 = createCommonjsModule(function (module, exports) {

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
	};

	exports.OLSK_TESTING_BEHAVIOUR = function () {
		if (typeof navigator === 'undefined') {
			return false;
		}

		return navigator.appName === 'Zombie';
	};
	});
	var main_1 = main$1.OLSKTestingFakeRequest;
	var main_2 = main$1.OLSKTestingFakeRequestForSession;
	var main_3 = main$1.OLSKTestingFakeRequestForHeaders;
	var main_4 = main$1.OLSKTestingFakeResponse;
	var main_5 = main$1.OLSKTestingFakeResponseForLocals;
	var main_6 = main$1.OLSKTestingFakeResponseForJSON;
	var main_7 = main$1.OLSKTestingFakeResponseForRender;
	var main_8 = main$1.OLSKTestingFakeResponseForRedirect;
	var main_9 = main$1.OLSKTestingFakeResponseForStatus;
	var main_10 = main$1.OLSKTestingFakeNext;
	var main_11 = main$1._OLSKTestingMochaReplaceES6Import;
	var main_12 = main$1.OLSK_TESTING_BEHAVIOUR;

	const OLSKLocalized = function(translationConstant) {
		return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"en":{"LCHVitrineDemoRecipeNames":{"LCHVitrinePageColoursRandomize":"Randomize page colours","LCHVitrinePageColoursRestore":"Restore page colours","LCHVitrineCopyPageInfo":"Copy page info","LCHVitrineSendEmail":"Send email","LCHVitrinePageLinksHighlightAdd":"Highlight page links","LCHVitrinePageLinksHighlightRemove":"Remove page links highlight","LCHVitrineMinimalistDateString":"Minimalist Date String"},"LCHVitrineCopyPageInfoAlertText":"Copied to clipboard","LCHVitrineTitle":"Launchlet","LCHVitrineDescription":"Generalized interface for keyboard-based interaction","LCHVitrineContentAppButtonText":"Go to app","LCHVitrineDemoButtonCommitText":"Demo Commit mode","LCHVitrineDemoButtonPreviewText":"Demo Preview mode","LCHVitrineDemoButtonPipeText":"Demo Pipe mode","LCHVitrineBrueghelText":"A photo of a postcard containing Pieter Bruegel's painting: The Fall of the Rebel Angels"},"es":{"LCHVitrineDemoRecipeNames":{"LCHVitrinePageColoursRandomize":"Aleatorizar los colores de la página","LCHVitrinePageColoursRestore":"Restablecer los colores de la página","LCHVitrineCopyPageInfo":"Copiar información de la página","LCHVitrineSendEmail":"Enviar correo","LCHVitrinePageLinksHighlightAdd":"Marcar los enlaces de la página","LCHVitrinePageLinksHighlightRemove":"Quitar las marcas enlace de la página","LCHVitrineMinimalistDateString":"Frase del dato minimalista"},"LCHVitrineCopyPageInfoAlertText":"Copiado al portapapeles","LCHVitrineTitle":"Launchlet","LCHVitrineDescription":"Interfaz generalizada para la interacción con el teclado","LCHVitrineContentAppButtonText":"Ir al app","LCHVitrineDemoButtonCommitText":"Demo modo de Commit","LCHVitrineDemoButtonPreviewText":"Demo modo de Preview","LCHVitrineDemoButtonPipeText":"Demo modo de Pipe","LCHVitrineBrueghelText":"Una foto de una tarjeta postal que contiene una pintura de Pieter Bruegel : La caída de los ángeles rebeldes"},"fr":{"LCHVitrineDemoRecipeNames":{"LCHVitrinePageColoursRandomize":"Randomiser les couleurs de la page","LCHVitrinePageColoursRestore":"Rétablir les couleurs de la page","LCHVitrineCopyPageInfo":"Copier les informations de la page","LCHVitrineSendEmail":"Envoyer email","LCHVitrinePageLinksHighlightAdd":"Surligner des liens de la page","LCHVitrinePageLinksHighlightRemove":"Enlever le surlignage des liens de la page","LCHVitrineMinimalistDateString":"Chaîne de date minimaliste"},"LCHVitrineCopyPageInfoAlertText":"Copié dans le presse-papier","LCHVitrineTitle":"Launchlet","LCHVitrineDescription":"Interface généralisée pour les interactions clavier","LCHVitrineContentAppButtonText":"Aller à l'appli","LCHVitrineDemoButtonCommitText":"Démo mode Commit","LCHVitrineDemoButtonPreviewText":"Démo mode Preview","LCHVitrineDemoButtonPipeText":"Démo mode Pipe","LCHVitrineBrueghelText":"Une photo d'une carte postale qui contient une peinture de Pieter Bruegel : La Chute des anges rebelles"}}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
	};

	const mod = {

		LCHVitrinePageColoursRandomizeCallback () {
			let element = document.querySelector('style.LCHVitrinePageColoursRandomize');
			
			if (!element) {
				document.body.appendChild(element = document.createElement('style')).classList.add('LCHVitrinePageColoursRandomize');
			}
			let random = Math.random();

			const match = element.innerHTML.match(/LCHCommonBackground: hsl\(0\, 0\%\, (.*)\%/);
			if (match) {
				const previous = parseFloat(match.pop()) / 100;

				while (Math.abs(random - previous) < 0.1 || (random >= 0.4 && random <= 0.6)) {
					random = Math.random();
				}
			}
			element.innerHTML = `
		body {
		--LCHCommonBackground: hsl(0, 0%, ${ random * 100 }%);
		--LCHCommonForeground: hsl(0, 0%, ${ 100.0 - random * 100 }%);
		}
	`;
		},

		LCHVitrinePageColoursRandomizeRecipe () {
			return {
				LCHRecipeCallback: mod.LCHVitrinePageColoursRandomizeCallback,
				LCHRecipeSignature: 'LCHVitrinePageColoursRandomize',
			};
		},

		LCHVitrinePageColoursRestoreIsHidden () {
			return !document.querySelector('style.LCHVitrinePageColoursRandomize');
		},

		LCHVitrinePageColoursRestoreCallback () {
			document.querySelector('style.LCHVitrinePageColoursRandomize').remove();
		},

		LCHVitrinePageColoursRestoreRecipe () {
			return {
				LCHRecipeCallback: mod.LCHVitrinePageColoursRestoreCallback,
				LCHRecipeSignature: 'LCHVitrinePageColoursRestore',
				LCHRecipeIsExcluded: mod.LCHVitrinePageColoursRestoreIsHidden,
			};
		},

		LCHVitrineCopyPageInfoCallback () {
			window.alert(OLSKLocalized('LCHVitrineCopyPageInfoAlertText'));

			return this.api.LCHCopyToClipboard(`${document.title} ${location.href}`);
		},

		LCHVitrineCopyPageInfoRecipe () {
			return {
				LCHRecipeCallback: mod.LCHVitrineCopyPageInfoCallback,
				LCHRecipeSignature: 'LCHVitrineCopyPageInfo',
			};
		},

		LCHVitrineSendEmailCallback () {
			const url = 'mailto:';

			if (main_12()) {
				return window.alert(url)
			}
			window.location.href = url;
		},

		LCHVitrineSendEmailRecipe () {
			return {
				LCHRecipeCallback: mod.LCHVitrineSendEmailCallback,
				LCHRecipeSignature: 'LCHVitrineSendEmail',
			};
		},

		LCHVitrinePageLinksHighlightAddIsHidden () {
			return document.querySelector('style.LCHVitrinePageLinksHighlightAdd');
		},

		LCHVitrinePageLinksHighlightAddCallback () {
			let element = document.body.appendChild(document.createElement('style'));
			
			element.classList.add('LCHVitrinePageLinksHighlightAdd');
			element.innerHTML = `a { background: yellow !important; }`;
		},

		LCHVitrinePageLinksHighlightAddRecipe () {
			return {
				LCHRecipeCallback: mod.LCHVitrinePageLinksHighlightAddCallback,
				LCHRecipeSignature: 'LCHVitrinePageLinksHighlightAdd',
				LCHRecipeIsExcluded: mod.LCHVitrinePageLinksHighlightAddIsHidden,
			};
		},

		LCHVitrinePageLinksHighlightRemoveIsHidden () {
			return !document.querySelector('style.LCHVitrinePageLinksHighlightAdd');
		},

		LCHVitrinePageLinksHighlightRemoveCallback () {
			document.querySelector('style.LCHVitrinePageLinksHighlightAdd').remove();
		},

		LCHVitrinePageLinksHighlightRemoveRecipe () {
			return {
				LCHRecipeCallback: mod.LCHVitrinePageLinksHighlightRemoveCallback,
				LCHRecipeSignature: 'LCHVitrinePageLinksHighlightRemove',
				LCHRecipeIsExcluded: mod.LCHVitrinePageLinksHighlightRemoveIsHidden,
			};
		},

		LCHVitrineMinimalistDateStringCallback () {
			return (new Date()).toJSON().slice(0, 10).replace(/-/g, '.');
		},

		LCHVitrineMinimalistDateStringRecipe () {
			return {
				LCHRecipeCallback: mod.LCHVitrineMinimalistDateStringCallback,
				LCHRecipeSignature: 'LCHVitrineMinimalistDateString',
				LCHRecipeOutputType: 'String',
			};
		},

	};

	const OLSKLocalized$1 = function(translationConstant) {
		return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"en":{"LCHVitrineDemoRecipeNames":{"LCHVitrinePageColoursRandomize":"Randomize page colours","LCHVitrinePageColoursRestore":"Restore page colours","LCHVitrineCopyPageInfo":"Copy page info","LCHVitrineSendEmail":"Send email","LCHVitrinePageLinksHighlightAdd":"Highlight page links","LCHVitrinePageLinksHighlightRemove":"Remove page links highlight","LCHVitrineMinimalistDateString":"Minimalist Date String"},"LCHVitrineCopyPageInfoAlertText":"Copied to clipboard","LCHVitrineTitle":"Launchlet","LCHVitrineDescription":"Generalized interface for keyboard-based interaction","LCHVitrineContentAppButtonText":"Go to app","LCHVitrineDemoButtonCommitText":"Demo Commit mode","LCHVitrineDemoButtonPreviewText":"Demo Preview mode","LCHVitrineDemoButtonPipeText":"Demo Pipe mode","LCHVitrineBrueghelText":"A photo of a postcard containing Pieter Bruegel's painting: The Fall of the Rebel Angels"},"es":{"LCHVitrineDemoRecipeNames":{"LCHVitrinePageColoursRandomize":"Aleatorizar los colores de la página","LCHVitrinePageColoursRestore":"Restablecer los colores de la página","LCHVitrineCopyPageInfo":"Copiar información de la página","LCHVitrineSendEmail":"Enviar correo","LCHVitrinePageLinksHighlightAdd":"Marcar los enlaces de la página","LCHVitrinePageLinksHighlightRemove":"Quitar las marcas enlace de la página","LCHVitrineMinimalistDateString":"Frase del dato minimalista"},"LCHVitrineCopyPageInfoAlertText":"Copiado al portapapeles","LCHVitrineTitle":"Launchlet","LCHVitrineDescription":"Interfaz generalizada para la interacción con el teclado","LCHVitrineContentAppButtonText":"Ir al app","LCHVitrineDemoButtonCommitText":"Demo modo de Commit","LCHVitrineDemoButtonPreviewText":"Demo modo de Preview","LCHVitrineDemoButtonPipeText":"Demo modo de Pipe","LCHVitrineBrueghelText":"Una foto de una tarjeta postal que contiene una pintura de Pieter Bruegel : La caída de los ángeles rebeldes"},"fr":{"LCHVitrineDemoRecipeNames":{"LCHVitrinePageColoursRandomize":"Randomiser les couleurs de la page","LCHVitrinePageColoursRestore":"Rétablir les couleurs de la page","LCHVitrineCopyPageInfo":"Copier les informations de la page","LCHVitrineSendEmail":"Envoyer email","LCHVitrinePageLinksHighlightAdd":"Surligner des liens de la page","LCHVitrinePageLinksHighlightRemove":"Enlever le surlignage des liens de la page","LCHVitrineMinimalistDateString":"Chaîne de date minimaliste"},"LCHVitrineCopyPageInfoAlertText":"Copié dans le presse-papier","LCHVitrineTitle":"Launchlet","LCHVitrineDescription":"Interface généralisée pour les interactions clavier","LCHVitrineContentAppButtonText":"Aller à l'appli","LCHVitrineDemoButtonCommitText":"Démo mode Commit","LCHVitrineDemoButtonPreviewText":"Démo mode Preview","LCHVitrineDemoButtonPipeText":"Démo mode Pipe","LCHVitrineBrueghelText":"Une photo d'une carte postale qui contient une peinture de Pieter Bruegel : La Chute des anges rebelles"}}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
	};

	const _LCHVitrineRecipes = Object.entries(mod).filter(function (e) {
		return e.shift().includes('Recipe');
	}).map(function (e) {
		const item = e.pop()();
		return Object.assign(item, {
			LCHRecipeName: OLSKLocalized$1('LCHVitrineDemoRecipeNames')[item.LCHRecipeSignature],
		});
	});

	const mod$1 = {

		// INTERFACE

		InterfaceDemoButtonCommitDidClick() {
			mod$1.ControlDemoCommit();
		},

		InterfaceDemoButtonPreviewDidClick() {
			mod$1.ControlDemoPreview();
		},

		InterfaceDemoButtonPipeDidClick() {
			mod$1.ControlDemoPipe();
		},

		// CONTROL

		ControlDemoCommit() {
			Launchlet.LCHSingletonCreate({
				LCHOptionRecipes: _LCHVitrineRecipes,
				LCHOptionMode: Launchlet.LCHModeCommit,
				LCHOptionLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
			});
		},

		ControlDemoPreview() {
			Launchlet.LCHSingletonCreate({
				LCHOptionRecipes: [].concat.apply([], document.querySelectorAll('h1,h2')).map(function (e) {
					return {
						LCHRecipeName: e.textContent,
						LCHRecipeCallback () {
							e.scrollIntoView();
						},
						_LCHRecipeIsSelected: e.getBoundingClientRect().top >= 0,
					};
				}),
				LCHOptionMode: Launchlet.LCHModePreview,
				LCHOptionLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
			});
		},

		ControlDemoPipe() {
			Launchlet.LCHSingletonCreate({
				LCHOptionRecipes: _LCHVitrineRecipes,
				LCHOptionMode: Launchlet.LCHModePipe,
				LCHOptionLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
			});
		},

	};

	window.LCHPageRecipes = _LCHVitrineRecipes.slice();

	(function() {
		const proxyObjects = window.LCHPageRecipes.map(function (e) {
			return {
				LCHRecipeProxyName: e.LCHRecipeName,
				LCHRecipeProxySignature: e.LCHRecipeSignature,
			};
		});

		const signaturesMap = window.LCHPageRecipes.reduce(function (coll, item) {
			coll[item.LCHRecipeSignature] = item;

			return coll;
		}, {});

		window.addEventListener('message', function (event) {
		  if (event.source !== window) {
		  	return;
		  }

		  if (event.data === 'LCHPageRecipes') {
		  	return event.source.postMessage(proxyObjects, event.origin);
		  }
		  if (signaturesMap[event.data]) {
		  	return signaturesMap[event.data].LCHRecipeCallback();
		  }	}, false);
	})();

	return mod$1;

}());
//# sourceMappingURL=ui-behaviour.js.map
