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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ({

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__carousel_editor_css__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__carousel_editor_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__carousel_editor_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__carousel_view_css__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__carousel_view_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__carousel_view_css__);



const {
    registerBlockType
} = wp.blocks;

const {
    MediaUpload,
    InspectorControls
} = wp.editor;

registerBlockType('guty-blocks/carousel', {
    title: 'Carousel',
    icon: 'welcome-write-blog',
    category: 'common',

    attributes: { // Somewhat like setting initial state in a react app
        carouselImages: {
            type: 'array',
            default: []
        },
        carouselTime: {
            type: 'number',
            default: '5'
        },
        fadeTime: {
            type: 'number',
            default: '500'
        }
    },

    // The editor "render" function
    edit(props) {
        const {
            className,
            setAttributes,
            attributes: {
                carouselImages,
                carouselTime,
                fadeTime
            }
        } = props;

        function changeImageArray(changes) {
            setAttributes({ carouselImages: changes });
        }
        function changeCarouselTime(changes) {
            setAttributes({ carouselTime: changes.target.value });
        }

        function changeFadeTime(changes) {
            setAttributes({ fadeTime: changes.target.value });
        }

        const MyMediaUpload = wp.element.createElement(MediaUpload, {
            onSelect: changeImageArray,
            type: 'image',
            multiple: true,
            render: ({ open }) => wp.element.createElement(
                'button',
                {
                    onClick: open,
                    style: { marginBottom: '16px' } },
                'Select/Change Images'
            )
        });

        return [wp.element.createElement(
            InspectorControls,
            null,
            wp.element.createElement(
                'div',
                null,
                MyMediaUpload
            ),
            wp.element.createElement(
                'div',
                { style: { marginBottom: '16px' } },
                'Set fade length (milliseconds):',
                wp.element.createElement('input', {
                    type: 'number',
                    value: fadeTime,
                    onChange: changeFadeTime
                })
            ),
            wp.element.createElement(
                'div',
                { style: { marginBottom: '16px' } },
                'Set slide interval (seconds):',
                wp.element.createElement('input', {
                    type: 'number',
                    value: carouselTime,
                    onChange: changeCarouselTime
                })
            )
        ), MyMediaUpload, wp.element.createElement(
            'div',
            {
                className: className,
                'data-carousel-time': carouselTime,
                style: {
                    paddingBottom: '56.25%'
                } },
            wp.element.createElement(
                'div',
                { className: 'inner' },
                carouselImages.length ? carouselImages.map((el, index) => {
                    return wp.element.createElement('img', {
                        src: el.sizes.full.url,
                        className: !index ? 'active' : null,
                        style: { transition: `opacity ${fadeTime}ms` }
                    });
                }) : 'No Images Yet'
            )
        )];
    },

    // The save "render" function
    save(props) {
        const {
            className,
            attributes: {
                carouselImages,
                carouselTime,
                fadeTime
            }
        } = props;

        return wp.element.createElement(
            'div',
            {
                className: className,
                'data-carousel-time': carouselTime,
                style: {
                    paddingBottom: '56.25%'
                } },
            wp.element.createElement(
                'div',
                { className: 'inner' },
                carouselImages.length ? carouselImages.map((el, index) => {
                    return wp.element.createElement('img', {
                        src: el.sizes.full.url,
                        className: !index ? 'active' : null,
                        style: { transition: `opacity ${fadeTime}ms` }
                    });
                }) : 'No images yet...'
            )
        );
    }

});``;

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 16:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });