const path = require('path');


module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'static/frontend'),
        filename: 'tutorial.js'
    },
    module: {
        rules: [
              {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
              },
              {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader'
              },
        ]
    }
}