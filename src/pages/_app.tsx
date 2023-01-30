/*
 * @Author       : Pear107
 * @Date         : 2023-01-16 17:00:02
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-01-30 11:41:06
 * @FilePath     : \q-face-web\src\pages\_app.tsx
 * @Description  : 启动页
 */
import "tailwindcss/tailwind.css";
import { SessionProvider, useSession } from "next-auth/react";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function Auth({ children }) {
  const { data: session } = useSession({ required: true });
  const user = session?.user;
  // 已经登陆时，直接进入访问页面
  if (user) {
    return children;
  }
  // 当没有登陆时，展示加载内容（然后会自动定向到登陆页面）
  return <div>...loading</div>;
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(
    <SessionProvider session={session}>
      {/* 当页面存在auth属性时，表示需要登陆后才能访问 */}
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}
