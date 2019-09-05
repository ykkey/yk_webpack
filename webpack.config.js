const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const portfinder = require('portfinder'); // port
const readConfig = require('read-config')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

// base config
const SRC = './src';
const DEST = './public';
// const HOST = process.env.HOST || '0.0.0.0'
// const PORT = process.env.PORT || 3000
const BASE_DIR = "/";


console.log( readConfig(`${SRC}/pug/meta.yml`));

module.exports = {
  mode: isDevelopment ? 'development': 'production',
  entry: {
    'js/script.js': `${SRC}/js/script.js`,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]',
    publicPath: BASE_DIR,
  },
  module: {
    rules: [{
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                modules: false
              }]
            ]
          }
        }]
      },
      {
        // ローダーの処理対象ファイル
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
              loader: 'css-loader',
              options: {
                  url: false,
                  importLoaders: 2,
              }
          },
          {
            loader: "postcss-loader",
            options: {
              // sourceMap: true,
              plugins: [
                require("autoprefixer")({
                  grid: true
                })
              ]
            }
          },
          {
              loader: 'sass-loader',
              // options: {
              //   // ソースマップの利用有無
              //   sourceMap: enabledSourceMap
              // }
              options: {
                  // includePaths: [ `${SRC}/scss` ],
                  implementation: require('node-sass'),
              },
          }
        ]
      }
    ],
  },

  plugins: [
    // new CleanWebpackPlugin(
    //   ['dist'],
    //   {
    //     // 除外するファイルやディレクトリを指定
    //     exclude: ['img']
    //   }
    // ),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: `${SRC}/pug/index.pug`,
      templateParameters: {
        meta: readConfig(`${SRC}/pug/meta.yml`)
      }
    }),
    new MiniCssExtractPlugin({
      filename: `css/style.css`,//
      // filename: '[name]',
    })
  ],
  devServer: {
      open: true, //ブラウザを自動で開く
      inline: true, // 自動読み込み
      // openPage: BASE_DIR+"index.html",//自動で指定したページを開く
      contentBase: path.join(__dirname, DEST),// HTML等コンテンツのルートディレクトリ
      watchContentBase: true,//コンテンツの変更監視をする
      // port: 3000, // ポート番号
  },
  // キャッシュ
  cache: true,

};

// portfinder.getPort(function (err, port) {
// });