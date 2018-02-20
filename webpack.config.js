const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// different instances for editor or view css files
const editorExtractTextPlugin = new ExtractTextPlugin("[name]/[name].editor.css");
const viewExtractTextPlugin = new ExtractTextPlugin("[name]/[name].view.css");

module.exports = {
    entry: {
        'media-block': './src/media-block/media-block.js',
        'image-hero': './src/image-hero/image-hero.js',
        'recent-posts': './src/recent-posts/recent-posts.js',
        'hello-world': './src/hello-world/hello-world.js'
    },
    output: {
        path: path.resolve(__dirname, 'blocks'),
        filename: '[name]/[name].build.js'
    },
    module: {
        rules: [
            {
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
                test: /\.js$/,
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
};