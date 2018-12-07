'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {    // 主入口文件
    app: './src/main.js'
  },
  output: {   // 输出文件
    path: config.build.assetsRoot,    // 导出目录的绝对路径，默认为项目根目录下的/dist
    filename: '[name].js',    // 导出文件的名称
    publicPath: process.env.NODE_ENV === 'production'    // 生产或开发模式下，html、js等文件内部引用的公共路径
      ? config.build.assetsPublicPath         //config目录下的index.js中配置，默认均为/static
      : config.dev.assetsPublicPath
  },
  resolve: {    // 文件解析
    extensions: ['.js', '.vue', '.json'],    // 导入这些扩展名的模块时，可以不带扩展名
    alias: {    // 创建import或require的别名
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {    // 如何处理项目中不同类型的模块（即任意形式的文件，如图片、js文件、css等）
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,          // 对指定后缀的文件，使用指定的loader处理
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]    // 需要处理的目录
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {              // 对此loader做的额外配置项
          limit: 10000,         // 对于小于10kb的文件，以base64的形式引用
          name: utils.assetsPath('img/[name].[hash:7].[ext]')   // 文件名格式：img/name.7位hash值.原扩展名
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,        // 字体文件
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
