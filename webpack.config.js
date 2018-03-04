const path = require('path');
const webpack = require('webpack');

const typescript = require('typescript');
const { AotPlugin } = require('@ngtools/webpack');
const proxyObj = require('./proxy.conf');
var autoprefixer = require('autoprefixer');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var isProd = process.env.NODE_ENV === 'production';

const proxyConf = proxyObj || {};

const rules = [
  { test: /\.html$/, loader: 'html-loader' },
  { test: /\.scss$/, loaders: ['raw-loader', 'sass-loader'] },
  { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader' },
  {test: /\.css$/, use: 'css-loader?sourceMap-loader!postcss-loader'},
];

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: module => module.context && /node_modules/.test(module.context),
  }),
  new webpack.LoaderOptionsPlugin({
      minimize: isProd,
      debug: !isProd,
      postcss: [
        autoprefixer({
          browsers: ['last 2 version']
        })
      ]
  }),
];

if (isProd) {
  rules.push({
    test: /\.ts$/,
    loaders: ['@ngtools/webpack'],
  });
  plugins.push(
    new AotPlugin({
      tsConfigPath: './tsconfig.json',
      entryModule: 'src/app/app.module#AppModule',
    }),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      mangle: {
        screw_ie8: true,
      },
      compress: {
        unused: true,
        dead_code: true,
        drop_debugger: true,
        conditionals: true,
        evaluate: true,
        drop_console: true,
        sequences: true,
        booleans: true,
        screw_ie8: true,
        warnings: false,
      },
      comments: false,
    })
  );
} else {
  rules.push({
    test: /\.ts$/,
    loaders: [
      'awesome-typescript-loader',
      'angular-router-loader',
      'angular2-template-loader',
    ],
  });
  plugins.push(
    new webpack.NamedModulesPlugin(),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve(__dirname, './notfound')
    ),
  );
}


module.exports = {
  cache: true,
  context: __dirname,
  devServer: {
    contentBase: __dirname,
    historyApiFallback: true,
    proxy : proxyConf,
    stats: {
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      errors: true,
      errorDetails: false,
      hash: false,
      timings: false,
      modules: false,
      warnings: false,
    },
    publicPath: '/build/',
    port: 4500,
  },
  devtool : isProd ? 'sourcemap' : 'eval-source-map',
  entry: {
    app: ['zone.js/dist/zone', './src/main.ts'],
    polyfills : './src/polyfills.ts',
    vendorStyles : [
      './node_modules/prismjs/themes/prism.css',
      './node_modules/bootstrap/dist/css/bootstrap.css'
    ],
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name]-chunk.js',
    publicPath: '/build/',
    path: path.resolve(__dirname, 'build'),
  },
  node: {
    console: false,
    global: true,
    process: true,
    Buffer: false,
    setImmediate: false,
  },
  module: {
    rules,
  },
  resolve: {
    extensions: ['.ts', '.js', '.css', '.scss', '.html'],
    modules: ['src', 'node_modules'],
  },
  plugins,
};
