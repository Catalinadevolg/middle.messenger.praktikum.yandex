const mode = process.env.NODE_ENV;
const devMode = mode === 'development';

const { merge } = require('webpack-merge'); //[1]
const commonConfig = require('./webpack.common');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod'); //[2]

module.exports = merge(commonConfig, devMode ? devConfig : prodConfig);
