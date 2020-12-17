module.exports = {
  outputDir: process.env.NODE_ENV === 'production'
    ? 'dist/public/'
    : '../public',
  indexPath: process.env.NODE_ENV === 'production'
    ? '../views/index.blade.php'
    : 'index.html',
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
};
