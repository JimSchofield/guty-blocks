# guty-blocks
A build environment for gutenberg blocks with a few examples

## How to start
Make sure you have installed the Gutenberg plugin in WordPress
1) Clone into the plugins folder of your WordPress instance
2) Run `npm install`
3) Activate the plugin in wp-admin


## How to create another block

1) Duplicate any of the folders within the src folder and make sure to rename the js and css files to your new block name.  You will need to rename file names inside of the src.js file as well.
2) You will need to create an index.php file that loads your new block in the blocks/[yourblockname] folder after the block is built. You can follow the pattern in the example blocks inside of the blocks folder
3) Webpack looks for *.js files following this pattern: ./source/[yourblockname]/[yourblockname].src.js .  If you do not include the .src.js suffix webpack will not consider it the gutenberg block js file.


## How to build the block files
- `npm run build` - one time build with webpack
- `npm run watch` - sets up watcher
