const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        canvas: './src/canvas.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader!sass-loader"
            })
        }, ]
    },
    plugins: [
        new ExtractTextPlugin("./css/style.css"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    watch: true,
    devtool: 'cheap-eval-source-map',
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, 'dist')
    }
};