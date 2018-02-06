const path = require('path');

module.exports = {
    entry: {
        "media-block": './src/media-block/media-block.js'
    },
    output: {
        path: path.resolve(__dirname, 'blocks'),
        filename: '[name]/[name].build.js'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    stats: {
        colors: true
    }
};