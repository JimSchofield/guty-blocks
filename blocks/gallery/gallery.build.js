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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gallery_editor_css__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gallery_editor_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__gallery_editor_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gallery_view_css__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gallery_view_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__gallery_view_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Image__ = __webpack_require__(9);





const {
    registerBlockType,
    RichText,
    PlainText,
    InspectorControls,
    MediaUpload
} = wp.blocks;

registerBlockType('guty-blocks/gallery', {
    title: 'Custom Photo Gallery',
    icon: 'format-gallery',
    category: 'common',

    attributes: {
        titleText: {
            type: 'string'
        },
        imagesArray: {
            type: 'array',
            default: []
        },
        columns: {
            type: 'number',
            default: 2
        },
        alignment: {
            type: 'string',
            default: 'alignLeft'
        }
    },

    // The editor "render" function
    edit(props) {

        const { focus, className, setAttributes } = props;
        const { titleText, imagesArray, columns, alignment } = props.attributes;

        const changeTitle = changes => {
            setAttributes({ titleText: changes });
        };

        function changeImageArray(changes) {
            setAttributes({ imagesArray: changes });
        }

        function changeColumns(changes) {
            setAttributes({ columns: changes.target.value });
        }

        function changeAlignment(changes) {
            setAttributes({ alignment: changes.target.value });
        }

        function moveElement(elIndex, direction) {
            let tempArray = [...imagesArray];

            //take out element
            const el = tempArray.splice(elIndex, 1)[0];

            // place element in either previous or next
            tempArray.splice(elIndex + direction, 0, el);

            //set array back
            setAttributes({ imagesArray: tempArray });
        }

        function removeElement(elIndex) {
            let tempArray = [...imagesArray];
            tempArray.splice(elIndex, 1);
            setAttributes({ imagesArray: tempArray });
        }

        function addPhotos(images) {
            setAttributes({
                imagesArray: [...imagesArray, ...images]
            });
        }

        const MyMediaUpload = wp.element.createElement(MediaUpload, {
            onSelect: changeImageArray,
            type: 'image',
            multiple: true,
            render: ({ open }) => wp.element.createElement(
                'button',
                {
                    onClick: open },
                'Select Images'
            )
        });

        const AddPhotosUpload = wp.element.createElement(MediaUpload, {
            onSelect: addPhotos,
            type: 'image',
            multiple: true,
            render: ({ open }) => {
                return wp.element.createElement(
                    'div',
                    { 'class': 'galleryContainer-addPhoto' },
                    wp.element.createElement(
                        'button',
                        { onClick: open },
                        'Add photo'
                    )
                );
            }
        });

        return [focus && wp.element.createElement(
            InspectorControls,
            null,
            wp.element.createElement(
                'div',
                { className: 'galleryInspector' },
                wp.element.createElement(
                    'strong',
                    null,
                    'Settings for gallery:"',
                    titleText,
                    '"'
                ),
                MyMediaUpload,
                wp.element.createElement(
                    'div',
                    null,
                    wp.element.createElement(
                        'label',
                        { htmlFor: 'columns' },
                        'Select Number of Columns:'
                    ),
                    wp.element.createElement('br', null),
                    wp.element.createElement(
                        'select',
                        { name: 'columns', onChange: changeColumns },
                        [1, 2, 3, 4].map(el => wp.element.createElement(
                            'option',
                            { value: el, selected: el === columns },
                            el,
                            ' Column'
                        ))
                    )
                ),
                wp.element.createElement(
                    'div',
                    null,
                    wp.element.createElement(
                        'label',
                        { htmlFor: 'alignment' },
                        'Select Alignment:'
                    ),
                    wp.element.createElement('br', null),
                    wp.element.createElement(
                        'select',
                        { name: 'alignment', onChange: changeAlignment },
                        ["alignLeft", "alignCenter", "alignRight"].map(el => wp.element.createElement(
                            'option',
                            { value: el, selected: el === alignment },
                            el
                        ))
                    )
                )
            )
        ), wp.element.createElement(
            'div',
            { className: className },
            wp.element.createElement(
                'section',
                { className: 'section' },
                wp.element.createElement(
                    'h1',
                    null,
                    wp.element.createElement(PlainText, {
                        tagName: 'h1',
                        value: titleText,
                        onChange: changeTitle,
                        placeholder: 'Enter Gallery Name Here'
                    })
                ),
                wp.element.createElement(
                    'div',
                    { className: `galleryContainer galleryContainer_${columns}up galleryContainer_${alignment}` },
                    imagesArray.length ? imagesArray.map((el, index) => {
                        return wp.element.createElement(
                            'div',
                            { className: 'imageWrapper' },
                            wp.element.createElement(__WEBPACK_IMPORTED_MODULE_2__Image__["a" /* Image */], {
                                key: index,
                                photo: el,
                                galleryID: titleText
                            }),
                            wp.element.createElement(
                                'div',
                                { className: 'imageWrapper-buttons' },
                                index !== 0 && wp.element.createElement(
                                    'button',
                                    { onClick: () => moveElement(index, -1) },
                                    '<'
                                ),
                                wp.element.createElement(
                                    'button',
                                    { onClick: () => removeElement(index) },
                                    'Remove'
                                ),
                                index !== imagesArray.length - 1 && wp.element.createElement(
                                    'button',
                                    { onClick: () => moveElement(index, 1) },
                                    '>'
                                )
                            )
                        );
                    }) : wp.element.createElement(
                        'div',
                        null,
                        wp.element.createElement(
                            'h3',
                            null,
                            'No images yet'
                        ),
                        MyMediaUpload
                    ),
                    AddPhotosUpload
                )
            )
        )];
    },

    // The save "render" function
    save(props) {

        const { className } = props;
        const { titleText, imagesArray, columns, alignment } = props.attributes;

        return wp.element.createElement(
            'div',
            { className: className },
            wp.element.createElement(
                'section',
                { className: 'section' },
                wp.element.createElement(
                    'h1',
                    null,
                    titleText
                ),
                wp.element.createElement(
                    'div',
                    { className: `galleryContainer galleryContainer_${columns}up galleryContainer_${alignment}` },
                    imagesArray.map((el, index) => {
                        return wp.element.createElement(__WEBPACK_IMPORTED_MODULE_2__Image__["a" /* Image */], {
                            key: index,
                            photo: el,
                            galleryID: titleText
                        });
                    })
                )
            )
        );
    }

});

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Image; });
const Image = function (props) {

    const { photo, galleryID } = props;
    const photoThumb = photo.sizes.medium || photo.sizes.thumbnail;

    return wp.element.createElement(
        'a',
        { href: photo.sizes.full.url, 'data-lightbox': galleryID, 'data-title': '' },
        wp.element.createElement('div', { style: {
                backgroundImage: `url(${photoThumb.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                paddingTop: '100%'
            }, alt: '' })
    );
};



/***/ })
/******/ ]);