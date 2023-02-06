/*
 * @Author       : Pear107
 * @Date         : 2023-01-16 17:00:02
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-02-06 04:50:48
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
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <SessionProvider session={session}>
      {/* where the page has auth property, it should be sign in to visit */}
      {Component.auth ? (
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
