// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const path = require('path')

module.exports = {
  plugins: [
    // your custom plugins
  ],
  module: {
    rules: [
      // {
      //   test: /(\.jsx|\.js)$/,
      //   include: [
      //     path.resolve(__dirname, '../src'),
      //     path.resolve(__dirname, '../stories')
      //   ],
      //   loader: 'babel-loader',
      //   options: {
      //     presets: ['es2015', 'react'],
      //     plugins: [
      //       'transform-object-rest-spread',
      //       'transform-class-properties',
      //       'transform-es2015-destructuring'
      //     ]
      //   }
      // },
      // {
      //   test: /\.json$/,
      //   loader: 'json-loader',
      //   options: {}
      // }
    ]
  },
  // resolve: {
  //   // options for resolving module requests
  //   // (does not apply to resolving to loaders)
  //   modules: [
  //     'node_modules'
  //   ],
  //   extensions: ['.js', '.json', '.jsx', '.css'],
  //   plugins: []
  // }
}

// const path = require('path')

// const config = {
//   entry: '../src/index',
//   devtool: 'source-map',
//   context: __dirname,
//   target: 'web',
//   stats: {},
//   devServer: {},
//   plugins: [],
//   profile: true,
//   output: {
//     path: path.resolve(__dirname, '../compiled'),
//     filename: 'reactSlexUi.js',
//     libraryTarget: 'umd',
//     pathinfo: true,
//     sourceMapFilename: '[file].map',
//     devtoolModuleFilenameTemplate: 'webpack:///[resource-path]',
//     devtoolFallbackModuleFilenameTemplate: 'webpack:///[resource-path]?[hash]',
//     umdNamedDefine: true,
//     sourcePrefix: '\t'
//   },
//   module: {
//     rules: [
//       {
//         test: /(\.jsx|\.js)$/,
//         include: [
//           path.resolve(__dirname, '../src')
//         ],
//         loader: 'babel-loader',
//         options: {
//           presets: ['es2015', 'react'],
//           plugins: [
//             'transform-object-rest-spread',
//             'transform-class-properties',
//             'transform-es2015-destructuring'
//           ]
//         }
//       },
//       {
//         test: /\.json$/,
//         loader: 'json-loader',
//         options: {}
//       }
//     ]
//   },

//   resolve: {
//     // options for resolving module requests
//     // (does not apply to resolving to loaders)
//     modules: [
//       'node_modules'
//     ],
//     extensions: ['.js', '.json', '.jsx', '.css'],
//     plugins: []
//   }
// }

// module.exports = config