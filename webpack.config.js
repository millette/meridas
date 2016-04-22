'use strict'

// npm
const sortBy = require('lodash.sortby')
const groupBy = require('lodash.groupby')
const differenceBy = require('lodash.differenceby')

const addKey = (v) => {
  v._key = (v.html_url || v.repository_url).toLowerCase()
  return v
}

const grouped = groupBy(
  sortBy(
    differenceBy(
      require('./day-two.json').map(addKey),
      require('./day-one.json').map(addKey),
      (v) => v.platform + v._key
    ),
    'platform'
  ),
  (x) => x._key
)

module.exports = {
  entry: [
    './entry.js',
    'file?name=index.html!jade-html!./index.jade'
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
      grouped: grouped
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
