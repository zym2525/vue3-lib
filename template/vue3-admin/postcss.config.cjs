/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  plugins: [
    {
      postcssPlugin: 'internal:charset-removal',
      AtRule: {
        charset: (atRule) => {
          if (atRule.name === 'charset') {
            atRule.remove()
          }
        },
      },
    },
    require('autoprefixer'),
    require('postcss-import'),
    // require('postcss-px-to-viewport')({
    //   unitToConvert: 'px',
    //   viewportWidth: 1280,
    //   unitPrecision: 5,
    //   propList: ['*'],
    //   viewportUnit: 'vw',
    //   fontViewportUnit: 'vw',
    //   selectorBlackList: [],
    //   minPixelValue: 1,
    //   mediaQuery: false,
    //   replace: true,
    //   exclude: undefined,
    //   include: undefined,
    //   landscape: false,
    //   landscapeUnit: 'vw',
    //   landscapeWidth: 568,
    // }),
  ],
}
