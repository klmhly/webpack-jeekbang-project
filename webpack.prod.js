'use strict'
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const glob = require('glob')



// 多页面打包方案
const setMPA = () => {
    const entry = {}
    const htmlWebpackPlugins = []

    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
    console.log(Object.keys(entryFiles))

    entryFiles.map((item, index) => {
        const match = item.match(/src\/(.*)\/index.js/)
        const pageName = match && match[1]
        entry[pageName] = entryFiles
        htmlWebpackPlugins.push(
            // 一个页面对应一个 HtmlWebpackPlugin
            new HtmlWebpackPlugin({
                template: path.join(__dirname, `src/${pageName}/index.html`),
                filename: `${pageName}.html`,
                chunks: [pageName],     // 以哪个文件为入口，将这些内容，  加到这个模版中
                inject: true,
                minify: {                 // 压缩配置
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: false
                }
            }),
        )
    })
    return {
        entry,
        htmlWebpackPlugins
    }
}

const {entry, htmlWebpackPlugins } = setMPA()

module.exports = {
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash].js'   // js文件指纹
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    // 'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test:/.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // limit:20480
                            name: '[name]_[hash:8][ext]'     // 图片指纹
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // 自动清理构建产物
        new CleanWebpackPlugin(),

        // 这个插件， 设置css文件指纹
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8]'
        }),

        // 压缩css文件
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),

    ].concat(htmlWebpackPlugins)
}