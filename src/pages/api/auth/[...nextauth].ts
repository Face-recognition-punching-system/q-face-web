import { signIn, signOut } from "next-auth/react";
/*
 * @Author       : Pear107
 * @Date         : 2023-01-30 05:33:57
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-01-30 12:09:35
 * @FilePath     : \q-face-web\src\pages\api\auth\[...nextauth].ts
 * @Description  : 头部注释
 */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextApiRequest, NextApiResponse } from "next";

export default function auth(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: {
          username: { label: "Username", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          try {
            console.log(req.body);
            return {};
          } catch (e) {
            return null;
          }
        },
      }),
    ],
    session: {
      strategy: "jwt",
      maxAge: 2 * 60 * 60,
    },
    jwt: {
      maxAge: 2 * 60 * 60,
    },
    pages: {
      signIn: "/auth/signin",
    },
    callbacks: {
      async jwt({ token, user, account }) {
        // 在登陆时判断是否是自定义登录的方式，并将用户信息保存到next-auth生成的token中，（因为next-auth最终提供的用户信息很少，不能满足需要，因此需要我们自己通过传递设置）
        if (account && account.type === "credentials" && user) {
          token.user = user;
          token.accessToken = user.access_token;
        }
        return token;
      },
      async session({ session, token }) {
        // 自定义会话中的user（因为默认的会话中的user信息不能满足我们的需求）
        session.user = token.user;
        session.accessToken = token.accessToken;
        return session;
      },
    },
  });
}
