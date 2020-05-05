module.exports = {
  publicPath: './',
  configureWebpack: {
    externals: {
      AMap: 'AMap'
    },
  },
  devServer: {
    https: true
  }
};
