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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__media_block_editor_css__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__media_block_editor_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__media_block_editor_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__media_block_view_css__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__media_block_view_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__media_block_view_css__);



const { registerBlockType, Editable, InspectorControls } = wp.blocks;

registerBlockType('guty-blocks/media-block', {
    title: 'Media Item Block',
    icon: 'smiley',
    category: 'common',

    attributes: {
        content: {
            type: 'string',
            default: 'Editable block content...'
        }
    },

    // Defines the block within the editor.
    edit(props) {

        var content = props.attributes.content;

        function onChangeContent(updatedContent) {
            props.setAttributes({ content: updatedContent });
        }

        return [!!focus && wp.element.createElement(
            InspectorControls,
            { key: 'controls' },
            wp.element.createElement(
                'p',
                null,
                'Testing inspector!'
            )
        ), wp.element.createElement(
            'div',
            { className: props.className },
            wp.element.createElement(Editable, {
                key: 'editable',
                tagName: 'p',
                onChange: onChangeContent,
                value: content,
                focus: props.focus,
                onFocus: props.setFocus
            })
        )];
    },

    // Defines the saved block.
    save(props) {
        return wp.element.createElement(
            'div',
            { className: props.className },
            wp.element.createElement(
                'p',
                null,
                ' ',
                props.attributes.content,
                ' '
            )
        );
    }

});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);