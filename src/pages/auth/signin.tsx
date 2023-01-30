/*
 * @Author       : Pear107
 * @Date         : 2023-01-29 10:28:11
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-01-30 12:07:00
 * @FilePath     : \q-face-web\src\pages\auth\signin.tsx
 * @Description  : 头部注释
 */
import React from "react";
import Image from "next/image";
import { Button, Checkbox, Form, Input, message, Space } from "antd";
import Head from "next/head";
import { signIn } from "next-auth/react";
import { getCsrfToken } from "next-auth/react";

import imgSignin from "@/assets/img/signin.svg";

const Signin: React.FC<{ csrfToken: any }> = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = async () => {
    // router.replace("/");
    const csrfToken = await getCsrfToken();
    const data = {
      csrfToken: csrfToken,
      username: "hello world",
      password: "hello world",
    };
    // let ret = "";
    // for (let it in data) {
    //   ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
    // }
    signIn("credentials", { ...data, callbackUrl: "http://localhost:3000/" });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    messageApi.open({
      type: "error",
      content: "登录失败",
    });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-teal-500">
      {contextHolder}
      <Head>
        <title>登录页</title>
      </Head>
      <section className="flex items-center gap-5 p-5 rounded-md bg-gray-100">
        <Image src={imgSignin} alt="404" height={404} />
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item>
            <Input
              type="hidden"
              name="csrfToken"
              value="8c0fd6a5c4e8b28db71f5425047a798460a957f7ac638f2d179bc08dfc529fcf"
            />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password type="password" />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button htmlType="submit">登录</Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
};

export default Signin;
