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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ({

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__image_hero_editor_css__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__image_hero_editor_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__image_hero_editor_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__image_hero_view_css__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__image_hero_view_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__image_hero_view_css__);



const {
    registerBlockType,
    AlignmentToolbar, //prebuild alignment button component that we put in block controls for this block
    RichText,
    InspectorControls, // allows us to add controls on the sidebar
    BlockControls, //component that appears right above block when it is selected
    MediaUpload, // allows us to upload images
    ColorPalette // prebuilt component that allows color picking in inspector controls
} = wp.blocks;

registerBlockType('guty-blocks/image-hero', {
    title: 'Image Hero Block',
    icon: 'format-image',
    category: 'common',

    // Somewhat like setting initial state in a react app
    attributes: {
        alignement: {
            type: 'string'
        },
        content: {
            type: 'array',
            source: 'children',
            selector: 'h1',
            default: 'Editable block content...'
        },
        imageUrl: {
            type: 'string',
            default: "http://placehold.it/800x300"
        },
        textColor: {
            type: 'string',
            default: null
        },
        gradientColor: {
            type: 'string',
            default: null
        }
    },

    // The editor "render" function
    edit(props) {

        let { focus } = props;
        let { alignment, content, imageUrl, textColor, gradientColor } = props.attributes;

        function onChangeContent(updatedContent) {
            props.setAttributes({ content: updatedContent });
        }
        function onChangeImage(imgObject) {
            props.setAttributes({ imageUrl: imgObject.url });
        }
        function onChangeGradientColor(color) {
            props.setAttributes({ gradientColor: color });
        }
        function onChangeTextColor(color) {
            props.setAttributes({ textColor: color });
        }

        // Actual elements being rendered
        return [props.isSelected && wp.element.createElement(
            InspectorControls,
            null,
            wp.element.createElement(MediaUpload, {
                type: 'image',
                onSelect: onChangeImage,
                render: ({ open }) => wp.element.createElement(
                    'button',
                    { onClick: open },
                    'Select a background image'
                )
            }),
            wp.element.createElement('br', null),
            wp.element.createElement('br', null),
            wp.element.createElement(
                'span',
                null,
                'Select text color:'
            ),
            wp.element.createElement(ColorPalette, {
                value: textColor,
                onChange: onChangeTextColor
            }),
            wp.element.createElement('br', null),
            wp.element.createElement('br', null),
            wp.element.createElement(
                'span',
                null,
                'Select a gradient color:'
            ),
            wp.element.createElement(ColorPalette, {
                value: gradientColor,
                onChange: onChangeGradientColor
            }),
            wp.element.createElement('br', null),
            wp.element.createElement('br', null)
        ), props.isSelected && wp.element.createElement(
            BlockControls,
            null,
            wp.element.createElement(AlignmentToolbar, {
                value: alignment,
                onChange: change => props.setAttributes({ alignment: change })
            })
        ), wp.element.createElement(
            'div',
            { className: props.className, style: { backgroundImage: `url(${imageUrl})` } },
            wp.element.createElement('div', {
                className: `overlay`,
                style: {
                    background: gradientColor,
                    opacity: '.3'
                }
            }),
            wp.element.createElement(RichText, {
                tagName: 'h1',
                value: content,
                onChange: onChangeContent,
                style: {
                    color: textColor,
                    textAlign: alignment
                }
            })
        )];
    },

    // The save "render" function
    save(props) {
        let { className } = props;
        let { alignment, content, imageUrl, gradientColor, textColor } = props.attributes;

        return wp.element.createElement(
            'div',
            { className: className, style: { backgroundImage: `url(${imageUrl})` } },
            wp.element.createElement('div', {
                className: `overlay` //Note to self... `${props.className}` was undefined here. Bug?
                , style: {
                    background: gradientColor,
                    opacity: '.3'
                }
            }),
            wp.element.createElement(
                'h1',
                { style: {
                        color: textColor,
                        textAlign: alignment
                    } },
                content
            )
        );
    }

});

/***/ }),

/***/ 18:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 19:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });