/*
 * @Author       : Pear107
 * @Date         : 2023-01-16 17:00:02
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-01-28 18:44:43
 * @FilePath     : \q-face-web\src\pages\_app.js
 * @Description  : 启动页
 */
import "tailwindcss/tailwind.css";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(<Component {...pageProps} />);
}
