/* eslint-disable comma-dangle */
/* eslint-disable quote-props */

const path = require('path');

module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: process.env.VUE_APP_PAGE_TITLE
    }
  },
  assetsDir: 'assets',
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-spa-koshelek/' : '/',
  outputDir: 'dist',
  lintOnSave: process.env.NODE_ENV !== 'production',
  // runtimeCompiler: true,
  productionSourceMap: process.env.NODE_ENV !== 'production',
  css: {
    extract: process.env.NODE_ENV === 'production',
    sourceMap: true
  },
  chainWebpack: (config) => {
    config.module
      .rule('svg-sprite')
      .use('svgo-loader')
      .loader('svgo-loader');
  },
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        '~': path.resolve('./'),
        '@': path.resolve('src'),
        'views': path.resolve('src/views'),
        'layoutDefault': path.resolve('src/views/layouts/DefaultLayout'),
        'layoutError': path.resolve('src/views/layouts/ErrorLayout'),
        'assets': path.resolve('src/assets'),
        'less': path.resolve('src/assets/less'),
        'css': path.resolve('src/assets/css'),
        'router': path.resolve('src/router'),
        'store': path.resolve('src/store'),
        'components': path.resolve('src/components'),
        'plugins': path.resolve('src/components/plugins')
      }
    },
  },
  pluginOptions: {
    svgSprite: {
      dir: 'src/assets/img/svg',
      test: /\.(svg)(\?.*)?$/,
      loaderOptions: {
        extract: true,
        spriteFilename: 'assets/img/svg/icons.[hash:8].svg'
      },
      pluginOptions: {
        plainSprite: true
      }
    },
    // https://github.com/nguyenvanduocit/vue-cli-plugin-style-resources-loader
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname, './src/assets/less/_var.less')
      ]
    }
  }
};
