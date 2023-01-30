/*
 * @Author       : Pear107
 * @Date         : 2023-01-16 11:05:26
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-01-29 16:38:13
 * @FilePath     : \q-face-web\next.config.js
 * @Description  : 头部注释
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
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
