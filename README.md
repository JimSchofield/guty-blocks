# guty-blocks
A build environment for gutenberg blocks with a few examples

## How to use the blocks
1) Install and activate Project Gutenberg inside of Wordpress
2) Clone into the plugins folder of Wordpress
3) Activate the plugin inside of Wordpress
4) You now should have access to guty-blocks in the editor

## Current example blocks:
- Hello world - simple static block
- Media - Allows adding an image and text to the side
- Image hero - Includes a background, hero text, and a gradient overlay
- Recent posts - Uses WordPress API to fetch posts and include them in the block
- Block layout - Uses InnerBlock component to nest blocks into  blocks on the page (css)
- Prism code - A code formatter using [prismjs](http://prismjs.com/)
- React View - An example where a live react app is included in the view of the page.

## How make blocks
Make sure you have installed the Gutenberg plugin in WordPress and cloned this repo into the plugins folder
1) Run `npm install`
2) Duplicate any of the folders within the src folder and make sure to rename the js and css files to your new block name.  You will need to rename file names inside of the src.js file as well.
3) You will need to create an index.php file that loads your new block in the blocks/[yourblockname] folder after the block is built. You can follow the pattern in the example blocks inside of the blocks folder
4) Webpack looks for *.js files following this pattern: ./source/[yourblockname]/[yourblockname].src.js .  If you do not include the .src.js suffix webpack will not consider it the main gutenberg block js file.
5) Webpack also looks for *.view.js files to build files that may be called as a part of the view functionality, but are separate from the editor.


## How to build the block files
- `npm run build` - one time build with webpack
- `npm run watch` - sets up watcher
