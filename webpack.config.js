const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const glob = require('glob');

// different instances for editor or view css files
const editorExtractTextPlugin = new ExtractTextPlugin("[name]/[name].editor.css");
const viewExtractTextPlugin = new ExtractTextPlugin("[name]/[name].view.css");

module.exports = [{
        entry: function () {
            /*
            function to map globs to appropriate entries for separate build files
            object that is returned looks like:
              {
                  block-name: 'src/block-name/block-name.js',
                  ...
              }
            */
            let entriesObject = {}
            glob.sync("./src/**/*.src.js").map((el) => {
                let path = el;
                let name = el.split('/').pop().split('.')[0];
                entriesObject[name] = path;
            })
            return entriesObject;
        },
        // {
        // 'media-block': './src/media-block/media-block.js',
        // 'image-hero': './src/image-hero/image-hero.js',
        // 'recent-posts': './src/recent-posts/recent-posts.js',
        // 'hello-world': './src/hello-world/hello-world.js'
        // },
        output: {
            path: path.resolve(__dirname, 'blocks'),
            filename: '[name]/[name].build.js'
        },
        module: {
            rules: [{
                    test: /\.editor.css$/,
                    use: editorExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader'
                    })
                },
                {
                    test: /\.view.css$/,
                    use: viewExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader'
                    })
                },
                {
                    test: /\.editor.scss$/,
                    use: editorExtractTextPlugin.extract({
                        use: [{
                            loader: 'css-loader'
                        }, {
                            loader: 'sass-loader'
                        }],
                        fallback: 'style-loader'
                    })
                },
                {
                    test: /\.view.scss$/,
                    use: viewExtractTextPlugin.extract({
                        use: [{
                            loader: 'css-loader'
                        }, {
                            loader: 'sass-loader'
                        }],
                        fallback: 'style-loader'
                    })
                },
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader'
                }
            ]
        },
        plugins: [
            editorExtractTextPlugin,
            viewExtractTextPlugin
        ],
        stats: {
            colors: true
        }
    },
    // Config for view javacsript files
    {
        entry: function () {
            /*
            function to map globs to appropriate entries for separate build files
            object that is returned looks like:
              {
                  block-name: 'src/block-name/block-name.js',
                  ...
              }
            */
            let entriesObject = {}
            glob.sync("./src/**/*.view.js").map((el) => {
                let path = el;
                let name = el.split('/').pop().split('.')[0];
                entriesObject[name] = path;
            })
            return entriesObject;
        },
        output: {
            path: path.resolve(__dirname, 'blocks'),
            filename: '[name]/[name].view.js'
        },
        module: {
            rules: [{
                test: /.view.js/,
                loader: 'babel-loader'
            }]
        },
        stats: {
            colors: true
        }

    }
];