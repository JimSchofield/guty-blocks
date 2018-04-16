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
/******/ 	return __webpack_require__(__webpack_require__.s = 53);
/******/ })
/************************************************************************/
/******/ ({

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__side_by_side_editor_scss__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__side_by_side_editor_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__side_by_side_editor_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__side_by_side_view_scss__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__side_by_side_view_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__side_by_side_view_scss__);



const {
    registerBlockType,
    RichText,
    MediaUpload
} = wp.blocks;

registerBlockType('guty-blocks/side-by-side', {
    title: 'Side by side block',
    icon: '',
    category: 'common',

    attributes: {
        selectedImage: {
            type: 'string',
            default: 'http://placehold.it/200x200'
        },
        content: {
            type: 'array',
            source: 'children',
            selector: 'p'
        }
    },

    edit(props) {
        const { className, setAttributes } = props;
        const { selectedImage, content, isSelected } = props.attributes;

        function changeText(changes) {
            setAttributes({ content: changes });
        }

        return wp.element.createElement(
            'div',
            { className: className },
            wp.element.createElement(
                'div',
                { className: 'left' },
                wp.element.createElement(MediaUpload, {
                    onSelect: image => setAttributes({ selectedImage: image.sizes.medium.url }),
                    type: 'image',
                    value: selectedImage,
                    render: ({ open }) => wp.element.createElement('div', {
                        className: 'left-image',
                        onClick: open,
                        style: { backgroundImage: `url(${selectedImage})` } })
                })
            ),
            wp.element.createElement(
                'div',
                { className: 'right' },
                wp.element.createElement(RichText, {
                    tagName: 'p',
                    value: content,
                    onChange: changeText,
                    placeholder: 'Enter text here...',
                    isSelected: isSelected
                })
            )
        );
    },

    save(props) {
        const { className } = props;
        const { selectedImage, content } = props.attributes;

        return wp.element.createElement(
            'div',
            { className: className },
            wp.element.createElement(
                'div',
                { className: 'left' },
                wp.element.createElement('div', {
                    className: 'left-image',
                    onClick: open,
                    style: { backgroundImage: `url(${selectedImage})` }
                })
            ),
            wp.element.createElement(
                'div',
                { className: 'right' },
                wp.element.createElement(
                    'p',
                    null,
                    content
                )
            )
        );
    }

});

/***/ }),

/***/ 54:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 55:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });