/*
 * @Author       : Pear107
 * @Date         : 2023-01-16 11:05:26
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-04-05 22:34:00
 * @FilePath     : \q-face-web\next.config.js
 * @Description  : 头部注释
 */
module.exports = {
  experimental: {
    appDir: true,
  },
};
const withLess = require("next-with-less");
module.exports = withLess({
  lessLoaderOptions: {
    lessOptions: {
      modifyVars: {
        "@primary-color": "#f74a49",
        "@border-radius-base": ".5em",
      },
    },
  },
});

modules = ["@nuxtjs/axios"];
