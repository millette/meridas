'use strict'

const sortBy = require('lodash.sortby')
const groupBy = require('lodash.groupby')
const day = require('./day-one.json')

module.exports = {
  entry: [
    './entry.js',
    'file?name=index.html!jade-html!./index.jade?day=john'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    host: '0.0.0.0',
    port: 1234
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      }
    ]
  },
  jadeLoader: {
    locals: {
      sortBy: sortBy,
      grouped: groupBy(day, (x) => x.html_url || x.repository_url)
    }
  },
  postcss: (webpack) => [
    require('postcss-import')({ addDependencyTo: webpack }),
    require('postcss-url')(),
    require('postcss-cssnext')(),
    require('postcss-responsive-type')(),
    require('lost'),
    require('postcss-browser-reporter')(),
    require('postcss-reporter')()
  ]
}
