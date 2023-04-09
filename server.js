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
      createProxyMiddleware("/api-cpp", {
        target: process.env.REACT_APP_HOST,
        pathRewrite: {
          "^/api-cpp": "",
        },
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
