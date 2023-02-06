/*
 * @Author       : Pear107
 * @Date         : 2023-01-29 10:28:11
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-02-06 16:29:13
 * @FilePath     : \q-face-web\src\pages\auth\signIn.tsx
 * @Description  : 头部注释
 */
import React from "react";
import Image from "next/image";
import { Button, Form, Input, message } from "antd";
import Head from "next/head";
import { signIn } from "next-auth/react";
import { getCsrfToken } from "next-auth/react";

import imgSignIn from "@/public/svgs/signIn.svg";

const SignIn: React.FC<{ csrfToken: any }> = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = async (values: { adminId: string; password: string }) => {
    const csrfToken = await getCsrfToken();
    if (csrfToken == undefined) {
      return;
    }
    const data: {
      adminId: string;
      password?: string;
      csrfToken: string;
      id?: string;
    } = {
      csrfToken,
      ...values,
    };
    try {
      const retPromise = await fetch("/api/signIn", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const ret = await retPromise.json();
      if (ret.id) {
        data["id"] = ret.id;
        delete data.password;
        signIn("credentials", data, { callbackUrl: "http://localhost:3000/" });
      } else {
        messageApi.error("登录失败，请确认账户密码是否正确");
      }
    } catch (e) {
      messageApi.error("登录失败，网络错误");
    }
    signIn("credentials", {
      ...data,
      redirect: false,
    });
  };

  return (
    <>
      <Head>
        <title>登录页</title>
      </Head>
      {contextHolder}
      <div className="w-full h-screen flex items-center justify-center bg-teal-500">
        <section className="flex items-center gap-5 p-5 rounded-md bg-gray-100">
          <Image src={imgSignIn} alt="404" height={404} />
          <Form
            name="login"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            {/* 占位 */}
            <Form.Item />
            <Form.Item
              label="用户名"
              name="adminId"
              rules={[{ required: true, message: "请输入你的用户名" }]}
            >
              <Input maxLength={16} />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入你的密码" }]}
            >
              <Input.Password maxLength={16} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button htmlType="submit">登录</Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    </>
  );
};

export default SignIn;
