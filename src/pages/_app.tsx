/*
 * @Author       : Pear107
 * @Date         : 2023-01-30 19:39:26
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-05-08 08:54:39
 * @FilePath     : \q-face-web\src\pages\_app.tsx
 * @Description  : 头部注释
 */
import "tailwindcss/tailwind.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

import "../styles/index.less";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout & { auth: boolean };
};

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page: ReactElement) => page);
  return getLayout(<Component {...pageProps} />);
}
