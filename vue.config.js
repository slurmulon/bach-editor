module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {
    config.module
      .rule('bach')
      .test(/\.bach$/)
      .use('raw-loader')
        .loader('raw-loader')
        .end()
  },

}
