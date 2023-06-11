/*
 * @Author       : Pear107
 * @Date         : 2023-04-05 00:40:41
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-05-08 09:08:06
 * @FilePath     : \q-face-web\server.js
 * @Description  : 头部注释
 */
const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");
const dotenv = require("dotenv");
dotenv.config();
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
});
const handle = app.getRequestHandler();
const port = parseInt(process.env.REACT_APP_PORT);
app
  .prepare()
  .then(() => {
    const server = express();
    server.use(
      createProxyMiddleware("/admin", {
        target: process.env.REACT_APP_HOST,
        changeOrigin: true,
      })
    );
    server.all("*", (req, res) => {
      handle(req, res);
    });

    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
