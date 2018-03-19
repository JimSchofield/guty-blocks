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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected token (1:0)\nYou may need an appropriate loader to handle this file type.\n| .wp-block-guty-blocks-block-layout {\n|     display: flex;\n|     flex-direction: row;");

/***/ }),

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_layout_editor_css__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_layout_editor_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__block_layout_editor_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__block_layout_view_css__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__block_layout_view_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__block_layout_view_css__);



const {
    registerBlockType,
    InnerBlocks,
    InspectorControls
} = wp.blocks;

registerBlockType('guty-blocks/block-layout', {
    title: 'Block Layout',
    category: 'layout',

    attributes: {// Somewhat like setting initial state in a react app.
        // Strategy for mapping rendered attributes back into editable state

    },

    // The editor "render" function
    edit(props) {
        return [props.isSelected && wp.element.createElement(
            InspectorControls,
            null,
            'Select the number of columns for your blocks:'
        ), wp.element.createElement(
            'div',
            { 'class': props.className },
            wp.element.createElement(InnerBlocks, {
                layouts: {
                    normal: { label: 'Normal Width', icon: 'align-center' },
                    wide: { label: 'Width Width', icon: 'align-wide' }
                } })
        )];
    },

    // The save "render" function
    save(props) {
        return wp.element.createElement(
            'div',
            { 'class': props.className },
            wp.element.createElement(InnerBlocks.Content, null)
        );
    }

});

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected token (1:0)\nYou may need an appropriate loader to handle this file type.\n| .wp-block-guty-blocks-block-layout .editor-block-list__layout{\n|     width: 100%\n| }");

/***/ })

/******/ });