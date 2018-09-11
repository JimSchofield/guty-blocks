/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 43);
/******/ })
/************************************************************************/
/******/ ({

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__quote_editor_css__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__quote_editor_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__quote_editor_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__quote_view_css__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__quote_view_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__quote_view_css__);



const {
    registerBlockType
} = wp.blocks;

const {
    RichText
} = wp.editor;

registerBlockType('guty-blocks/quote', {
    title: 'Custom Quote Block',
    category: 'common',

    attributes: { // Somewhat like setting initial state in a react app.
        // Strategy for mapping rendered attributes back into editable state
        author: {
            type: 'string',
            default: 'author'
        },
        quoteContent: {
            type: 'string',
            default: 'Enter quote here'
        }
    },

    // The editor "render" function
    edit(props) {
        let { className } = props;
        return wp.element.createElement(
            'aside',
            { className: "quote " + className },
            wp.element.createElement(
                'div',
                { className: 'quote-text' },
                wp.element.createElement(
                    'span',
                    { className: 'first-last-quotes' },
                    '\u201C'
                ),
                wp.element.createElement(RichText, {
                    tagName: 'span',
                    value: props.attributes.quoteContent,
                    onChange: changes => props.setAttributes({ quoteContent: changes })
                }),
                wp.element.createElement(
                    'span',
                    { className: 'first-last-quotes' },
                    '\u201D'
                )
            ),
            wp.element.createElement(
                'div',
                { className: 'author' },
                '- ',
                wp.element.createElement(RichText, {
                    tagName: 'span',
                    value: props.attributes.author,
                    onChange: changes => props.setAttributes({ author: changes })
                })
            )
        );
    },

    // The save "render" function
    save(props) {
        let { className } = props;
        return wp.element.createElement(
            'aside',
            { className: "quote " + className },
            wp.element.createElement(
                'div',
                { className: 'quote-text' },
                wp.element.createElement(
                    'span',
                    { className: 'first-last-quotes' },
                    '\u201C'
                ),
                props.attributes.quoteContent,
                wp.element.createElement(
                    'span',
                    { className: 'first-last-quotes' },
                    '\u201D'
                )
            ),
            wp.element.createElement(
                'div',
                { className: 'author' },
                '- ',
                props.attributes.author
            )
        );
    }

});

/***/ }),

/***/ 44:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 45:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });