/*
 * @Author       : Pear107
 * @Date         : 2023-01-30 19:39:26
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-04-05 00:14:32
 * @FilePath     : \q-face-web\src\pages\_app.tsx
 * @Description  : 头部注释
 */
import "tailwindcss/tailwind.css";
import "../styles/index.less";
import { SessionProvider, useSession } from "next-auth/react";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout & { auth: boolean };
};

const Auth = ({ children }: { children: ReactElement }) => {
  const { data: session } = useSession({ required: true });
  const user = session?.user;
  if (user) {
    return children;
  }

  return <div>...loading</div>;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page: ReactElement) => page);
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        //@ts-ignore
        <Auth>
          getLayout(
          <Component {...pageProps} />)
        </Auth>
      ) : (
        getLayout(<Component {...pageProps} />)
      )}
    </SessionProvider>
  );
}
