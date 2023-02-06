/*
 * @Author       : Pear107
 * @Date         : 2023-01-30 05:33:57
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-02-06 05:31:38
 * @FilePath     : \q-face-web\src\pages\api\auth\[...nextauth].ts
 * @Description  : 头部注释
 */
import NextAuth, { Account } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextApiRequest, NextApiResponse } from "next";
import { JWT } from "next-auth/jwt";

import { postAxios } from "@/utils/axios";

type USER = {
  id: string;
  adminId: string;
  password: string;
  accessToken: string;
};

export default function auth(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: {},
        async authorize(credentials, req) {
          try {
            if (req.body === undefined) {
              return null;
            }
            return req.body;
          } catch (e) {
            return null;
          }
        },
      }),
    ],
    session: {
      strategy: "jwt",
      maxAge: 60 * 24 * 7,
    },
    jwt: {
      maxAge: 60 * 24 * 7,
    },
    pages: {
      signIn: "/auth/signIn",
    },
    callbacks: {
      async jwt({
        token,
        user,
        account,
      }: {
        token: JWT & { user: USER };
        user: USER;
        account: Account | null | undefined;
      }) {
        // 在登陆时判断是否是自定义登录的方式，并将用户信息保存到next-auth生成的token中，（因为next-auth最终提供的用户信息很少，不能满足需要，因此需要我们自己通过传递设置）
        if (account && account.type === "credentials" && user) {
          token.user = user;
          token.accessToken = user.accessToken;
        }

        return token;
      },
      async session({
        session,
        token,
      }: {
        session: {
          user: USER;
          expires: Date;
        };
        token: JWT & { user: USER };
      }) {
        // 自定义会话中的user（因为默认的会话中的user信息不能满足我们的需求）
        session.user = token.user;
        return session;
      },
    },
  });
}
