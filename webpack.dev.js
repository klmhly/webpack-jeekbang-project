'use strict'
const path = require('path')
const webpack = require('webpack')
const  { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    entry: {
        // index: './src/index.js',
        index: './src/search.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test:/.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit:20480
                        }
                    }
                ]
            }
        ]
    },



    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(), //webpack内置的插件

    ],
    // 热更新
    devServer: {
        contentBase: './dist',
        hot: true
    }

}
