/*
 * @Author       : Pear107
 * @Date         : 2023-01-29 10:28:11
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-04-05 21:09:09
 * @FilePath     : \q-face-web\src\pages\signIn.tsx
 * @Description  : 头部注释
 */
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button, Form, Input, message } from "antd";
import Head from "next/head";
import { signIn } from "next-auth/react";
import { getCsrfToken } from "next-auth/react";

import imgSignIn from "@/assets/svgs/signIn.svg";
import { postAxios } from "@/utils/axios";

const SignIn: React.FC<{ csrfToken: any }> = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [time, setTime] = useState<number>(0);
  const timerRef = useRef<any>(null);
  const handleTimer = () => {
    setTime(() => time - 1);
  };
  const onFinish = async (values: { adminId: string; password: string }) => {
    setTime(() => 10);
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
      const ret: any = await postAxios("/admin/signIn", data);
      if (ret.id) {
        data["id"] = ret.id;
        data["password"] = "";
        signIn("credentials", {
          ...data,
          callbackUrl: "http://localhost:3000/",
        });
      } else {
        messageApi.error("登录失败，请确认账户密码是否正确");
      }
    } catch (e) {
      messageApi.error("登录失败，服务器错误");
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (time > 0) {
      timerRef.current = setTimeout(handleTimer, 1000);
    } else {
      clearTimeout(timerRef.current);
    }
  }, [time]);
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
              <Button disabled={time !== 0} htmlType="submit">
                {time === 0 ? "登录" : time + "s"}
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    </>
  );
};

export default SignIn;
