# guty-blocks
A build environment for gutenberg blocks with a few examples

## How to start
Make sure you have installed the Gutenberg plugin in WordPress
1) Clone into the plugins folder of your WordPress
2) run npm install
3) Activate the plugin


## How to create another block

1) Duplicate any of the folders within the src folder and make sure to rename the js and css files to your new block name
2) Add an entry in the webpack.config.js that points to your new js file
3) You will need to create an index.php file that loads your new block in the blocks/[yourblockname] folder. You can follow the pattern in the example blocks inside of the blocks folder


## How to build
- `npm run build` - one time build with webpack
- `npm run watch` - sets up watcher
