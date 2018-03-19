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
/******/ 	return __webpack_require__(__webpack_require__.s = 39);
/******/ })
/************************************************************************/
/******/ ({

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__recent_posts_editor_css__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__recent_posts_editor_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__recent_posts_editor_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recent_posts_view_css__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recent_posts_view_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__recent_posts_view_css__);



const {
    registerBlockType,
    Editable, // Text field - will be replaced by RichText in future updates
    InspectorControls // allows us to add controls on the sidebar
} = wp.blocks;

registerBlockType('guty-blocks/recent-posts', {
    title: 'Recent Posts Block',
    icon: 'welcome-write-blog',
    category: 'common',

    attributes: { // Somewhat like setting initial state in a react app
        numberUp: {
            type: 'string',
            default: '1_up'
        },
        posts: {
            type: 'array',
            default: []
        }
    },

    // The editor "render" function
    edit(props) {

        let { content, posts, numberUp } = props.attributes;

        function onChangeContent(updatedContent) {
            props.setAttributes({ content: updatedContent });
        }
        function onChangeNumberUp(newNumberUp) {
            props.setAttributes({ numberUp: newNumberUp.target.value });
        }

        async function fetchArticles() {
            let data = await fetch('/wp-json/wp/v2/posts/');
            let posts = await data.json();
            props.setAttributes({ posts });
        }

        // Actual elements being rendered
        return [!!focus && wp.element.createElement(
            InspectorControls,
            { key: 'controls' },
            'Select Layout:',
            wp.element.createElement(
                'select',
                {
                    onChange: onChangeNumberUp },
                wp.element.createElement(
                    'option',
                    { value: 'one_up' },
                    '1 up blocks'
                ),
                wp.element.createElement(
                    'option',
                    { value: 'two_up' },
                    '2 up blocks'
                ),
                wp.element.createElement(
                    'option',
                    { value: 'three_up' },
                    '3 up blocks'
                )
            )
        ), wp.element.createElement(
            'div',
            { className: props.className },
            wp.element.createElement(
                'div',
                { className: 'sysMessage' },
                wp.element.createElement(
                    'button',
                    { onClick: fetchArticles },
                    'Fetch me recent articles!'
                ),
                posts.length === 0 ? wp.element.createElement(
                    'h1',
                    null,
                    'Posts not pulled yet'
                ) : wp.element.createElement(
                    'h1',
                    null,
                    posts.length,
                    ' found!'
                )
            ),
            wp.element.createElement(
                'div',
                { className: `articleContainer ${numberUp}` },
                posts && posts.map(el => {
                    return wp.element.createElement(RenderArticleButton, {
                        title: el.title.rendered,
                        desc: el.excerpt.rendered,
                        url: el.link
                    });
                })
            )
        )];
    },

    // The save "render" function
    save(props) {

        let { posts, numberUp } = props.attributes;

        return wp.element.createElement(
            'div',
            { className: props.className },
            wp.element.createElement(
                'div',
                { className: `articleContainer ${numberUp}` },
                posts && posts.map(el => {
                    return wp.element.createElement(RenderArticleButton, {
                        title: el.title.rendered,
                        desc: el.excerpt.rendered,
                        url: el.link
                    });
                })
            )
        );
    }

});

function RenderArticleButton(props) {
    return wp.element.createElement(
        'div',
        { 'class': 'articleButton' },
        wp.element.createElement('h3', { dangerouslySetInnerHTML: { __html: props.title } }),
        wp.element.createElement('p', { dangerouslySetInnerHTML: { __html: props.desc } }),
        wp.element.createElement(
            'a',
            { href: props.url },
            'Go to article...'
        )
    );
}

/***/ }),

/***/ 40:
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected token (1:0)\nYou may need an appropriate loader to handle this file type.\n| .wp-block-guty-blocks-recent-posts {\n| }\n| ");

/***/ }),

/***/ 41:
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected token (1:0)\nYou may need an appropriate loader to handle this file type.\n| .wp-block-guty-blocks-recent-posts {\n| }\n| ");

/***/ })

/******/ });