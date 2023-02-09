/*
 * @Author       : Pear107
 * @Date         : 2023-01-31 16:26:23
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-02-07 04:49:12
 * @FilePath     : \q-face-web\src\pages\_document.tsx
 * @Description  : 头部注释
 */
import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="../public/logo.ico" type="image/icon" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
