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
/***/ (function(module, exports) {

// import React from 'react';
// import ReactDOM from 'react-dom';

class ReactLive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postsIds: this.props.posts.split(','),
            posts: []
        };

        this.fetchPosts = this.fetchPosts.bind(this);
    }

    componentDidMount() {
        this.fetchPosts();
    }

    fetchPosts() {
        fetch('/wp-json/wp/v2/posts/' + '?include[]=' + this.state.postsIds.join('&include[]=')).then(res => res.json()).then(json => {
            this.setState({
                posts: json
            });
        });
    }

    render() {
        return wp.element.createElement(
            'div',
            null,
            wp.element.createElement(
                'strong',
                null,
                'React is running live in the view.  It takes the ids of the posts from the saved div in the editor and fetches the post content from the REST API to render below:'
            ),
            wp.element.createElement(
                'ul',
                null,
                !this.state.posts.length ? wp.element.createElement(
                    'p',
                    null,
                    'Loading...'
                ) : this.state.posts.map((el, i) => {
                    return wp.element.createElement(
                        'li',
                        null,
                        wp.element.createElement(
                            'h3',
                            null,
                            el.title.rendered
                        ),
                        wp.element.createElement(
                            'p',
                            null,
                            el.excerpt.rendered
                        )
                    );
                })
            )
        );
    }
}

window.onload = function () {
    let container = document.getElementById('live-react');
    let postData = container.getAttribute('data-post-ids');
    if (container) {
        ReactDOM.render(wp.element.createElement(ReactLive, { posts: postData }), container);
    }
};

/***/ })
/******/ ]);