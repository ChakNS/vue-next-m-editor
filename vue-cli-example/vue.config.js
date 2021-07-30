module.exports = {
  devServer: {
    // watchOptions: {
      // ignored: /node_modules\/((?!vue-next-m-editor).)/
      // ignored: require.context
    // }
  },
  chainWebpack: config => config.resolve.symlinks(false)
}
