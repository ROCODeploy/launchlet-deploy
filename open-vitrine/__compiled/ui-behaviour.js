var LCHVitrineBehaviour = (function () {
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
			return exports.OLSKInternationalLocalizedString(inputData, JSON.parse(`{"en":{"LCHVitrineDemoRecipeNames":{"LCHVitrinePageColoursRandomize":"Randomize page colours","LCHVitrinePageColoursRestore":"Restore page colours","LCHVitrineCopyPageInfo":"Copy page info","LCHVitrineSendEmail":"Send email","LCHVitrinePageLinksHighlightAdd":"Highlight page links","LCHVitrinePageLinksHighlightRemove":"Remove page links highlight","LCHVitrineMinimalistDateString":"Minimalist Date String"},"LCHVitrineCopyPageInfoAlertText":"Copied to clipboard","LCHVitrineTitle":"Launchlet","LCHVitrineDescription":"Make the web yours.","LCHVitrineVideo1HeadingText":"Search recipes.","LCHVitrineVideo2HeadingText":"Tutorial.","LCHVitrineVideo3HeadingText":"Sync with the browser extension.","LCHVitrineVideo4HeadingText":"Pipe mode.","OLSKLandingBlurbText":"Customize any website with JavaScript or CSS.","LCHVitrineDemoButtonCommitText":"Demo Commit mode","LCHVitrineDemoButtonPreviewText":"Demo Preview mode","LCHVitrineDemoButtonPipeText":"Demo Pipe mode","LCHVitrineBrueghelText":"A photo of a postcard containing Pieter Bruegel's painting: The Fall of the Rebel Angels","LCHFeatureListArray":[["Add scripts or styles.","Create Recipes with JavaScript or CSS."],["General or specific.","Trigger some Recipes based on the URL."],["Power up your browser.","The extension can run Recipes automatically on page load."],["Save it to go.","Export all Recipes as a bookmarklet."]]},"es":{"LCHVitrineDemoRecipeNames":{"LCHVitrinePageColoursRandomize":"Aleatorizar los colores de la página","LCHVitrinePageColoursRestore":"Restablecer los colores de la página","LCHVitrineCopyPageInfo":"Copiar información de la página","LCHVitrineSendEmail":"Enviar correo","LCHVitrinePageLinksHighlightAdd":"Marcar los enlaces de la página","LCHVitrinePageLinksHighlightRemove":"Quitar las marcas enlace de la página","LCHVitrineMinimalistDateString":"Frase del dato minimalista"},"LCHVitrineCopyPageInfoAlertText":"Copiado al portapapeles","LCHVitrineTitle":"Launchlet","LCHVitrineDescription":"Hazlo tuyo el web.","LCHVitrineVideo1HeadingText":"Buscar recetas.","LCHVitrineVideo2HeadingText":"Tutorial.","LCHVitrineVideo3HeadingText":"Sincronizar con el extensión del navigador.","LCHVitrineVideo4HeadingText":"Modo de Pipe.","OLSKLandingBlurbText":"Personalizar qualquier sitio web con JavaScript o CSS.","LCHVitrineDemoButtonCommitText":"Demo modo de Commit","LCHVitrineDemoButtonPreviewText":"Demo modo de Preview","LCHVitrineDemoButtonPipeText":"Demo modo de Pipe","LCHVitrineBrueghelText":"Una foto de una tarjeta postal que contiene una pintura de Pieter Bruegel : La caída de los ángeles rebeldes","LCHFeatureListArray":[["Adicionar scripts o estilos.","Crear Recetas con JavaScript o CSS."],["General o específica.","Activar algunas Recetas basadas en la URL."],["Augmenta tu navegador.","La extensión puede ejecutar Recetas automáticamente al cargar de la página."],["Tomarla para llevar.","Exportar todas las Recetas como un bookmarklet."]]},"fr":{"LCHVitrineDemoRecipeNames":{"LCHVitrinePageColoursRandomize":"Randomiser les couleurs de la page","LCHVitrinePageColoursRestore":"Rétablir les couleurs de la page","LCHVitrineCopyPageInfo":"Copier les informations de la page","LCHVitrineSendEmail":"Envoyer email","LCHVitrinePageLinksHighlightAdd":"Surligner des liens de la page","LCHVitrinePageLinksHighlightRemove":"Enlever le surlignage des liens de la page","LCHVitrineMinimalistDateString":"Chaîne de date minimaliste"},"LCHVitrineCopyPageInfoAlertText":"Copié dans le presse-papier","LCHVitrineTitle":"Launchlet","LCHVitrineDescription":"Faites-en le vôtre le web.","LCHVitrineVideo1HeadingText":"Chercher des recettes.","LCHVitrineVideo2HeadingText":"Tutoriel.","LCHVitrineVideo3HeadingText":"Synchroniser avec l'extension du navigateur.","LCHVitrineVideo4HeadingText":"Mode Pipe.","OLSKLandingBlurbText":"Personnaliser de n'importe quel site web avec JavaScript ou CSS.","LCHVitrineDemoButtonCommitText":"Démo mode Commit","LCHVitrineDemoButtonPreviewText":"Démo mode Preview","LCHVitrineDemoButtonPipeText":"Démo mode Pipe","LCHVitrineBrueghelText":"Une photo d'une carte postale qui contient une peinture de Pieter Bruegel : La Chute des anges rebelles","LCHFeatureListArray":[["Ajouter du code ou du style.","Créer des Recettes avec JavaScript ou CSS."],["Général ou spécifique.","Activer certaines Recettes basé sur l'URL."],["Augmentez votre navigateur.","L'extension peut exécuter des Recettes automatiquement lors du chargement de la page."],["Avoir ça pour emporter.","Exporter toutes les Recettes sous forme de bookmarklet."]]},"pt":{}}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
		};
	}
	});

	unwrapExports(main);
	var main_1 = main.OLSKLocalized;

	var main$1 = createCommonjsModule(function (module, exports) {
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
	var main_1$1 = main$1.OLSK_SPEC_UI;

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
			window.alert(main_1('LCHVitrineCopyPageInfoAlertText'));

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

			if (main_1$1()) {
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

	const _LCHVitrineRecipes = Object.entries(mod).filter(function (e) {
		return e.shift().includes('Recipe');
	}).map(function (e) {
		const item = e.pop()();
		return Object.assign(item, {
			LCHRecipeName: main_1('LCHVitrineDemoRecipeNames')[item.LCHRecipeSignature],
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
