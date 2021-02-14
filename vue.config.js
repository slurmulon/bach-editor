module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    resolve: { symlinks: false }
  },
  chainWebpack: config => {
    config.module
      .rule('bach')
      .test(/\.bach$/)
      .use('raw-loader')
        .loader('raw-loader')
        .end()
  },
  lintOnSave: false
}
