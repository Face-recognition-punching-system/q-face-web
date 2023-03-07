/*
 * @Author       : Pear107
 * @Date         : 2023-01-28 19:20:36
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-03-07 08:35:10
 * @FilePath     : \q-face-web\src\layouts\indexLayout.tsx
 * @Description  : 头部注释
 */
import React, { useState } from "react";
import type { ReactElement } from "react";
import { Layout, Menu, Avatar, Image, MenuProps, Dropdown, Space } from "antd";
import { Modal, Input, Form, message } from "antd";
import {
  Html5TwoTone,
  LogoutOutlined,
  SettingOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  LockOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const { Header, Footer, Sider, Content } = Layout;
const IndexLayout = ({ children }: { children: ReactElement }) => {
  const { data: session } = useSession({ required: true });
  const user: { id: string; csrfToken: string; adminId: string } =
    session?.user as { id: string; csrfToken: string; adminId: string };
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  let key = ["1"];
  const router = useRouter();
  if (router.pathname === "/") {
    key = ["1"];
  } else if (router.pathname === "/workerInfo") {
    key = ["2"];
  } else if (router.pathname === "/askForLeave") {
    key = ["3"];
  } else if (router.pathname === "/feedback") {
    key = ["4"];
  } else if (router.pathname === "/statistics") {
    key = ["5"];
  }
  const items: MenuProps["items"] = [
    {
      label: (
        <div
          className="flex items-center gap-1"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <SettingOutlined />
          <span>密码设置</span>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div
          className="flex items-center gap-1"
          onClick={() => {
            signOut({ callbackUrl: "/auth/signIn" });
          }}
        >
          <LogoutOutlined />
          <span>退出登录</span>
        </div>
      ),
      key: "1",
    },
  ];
  const menuItems = [
    {
      key: "1",
      label: <Link href="/">今日打卡</Link>,
    },
    {
      key: "2",
      label: <Link href="/workerInfo">员工信息</Link>,
    },
    {
      key: "3",
      label: <Link href="/askForLeave">请假管理</Link>,
    },
    {
      key: "4",
      label: <Link href="/feedback">反馈管理</Link>,
    },
    {
      key: "5",
      label: <Link href="/statistics">数据统计</Link>,
    },
  ];
  return (
    <>
      <Modal
        title="密码设置"
        centered
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        width={256}
        okButtonProps={{ htmlType: "submit", form: "setting" }}
        destroyOnClose
      >
        <Form
          id="setting"
          name="setting"
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          onFinish={async (value: { newPassword: string }) => {
            const data = {
              password: value.newPassword,
              id: user.id,
              csrfToken: user.csrfToken,
            };
            try {
              const retPromise = await fetch("/api/updatePassword", {
                method: "POST",
                body: JSON.stringify(data),
              });
              const ret = await retPromise.json();
              if (ret.message == "success") {
                message.success("更新成功");
                setModalOpen(false);
              } else {
                message.error("更新失败");
              }
            } catch (err) {
              message.error("网络错误");
            }
          }}
          initialValues={{
            newPassword: "",
            confirmPassword: "",
          }}
        >
          <Form.Item
            label="新密码"
            name="newPassword"
            rules={[
              { required: true, message: "请输入你的密码" },
              {
                pattern: new RegExp(
                  "^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[\\(\\)])+$)([^(0-9a-zA-Z)]|[\\(\\)]|[a-z]|[A-Z]|[0-9]){8,}$",
                  "g"
                ),
                message: "密码至少由8位包含字母、数字、特殊字符两种组合",
              },
            ]}
          >
            <Input.Password
              placeholder="密码设置"
              prefix={<LockOutlined />}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              maxLength={16}
            />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirmPassword"
            rules={[
              { required: true, message: "请输入你的密码" },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("两次密码输入不一致");
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="密码设置"
              prefix={<LockOutlined />}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              maxLength={16}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Layout className="w-screen h-screen">
        <Sider width={256}>
          <div className="h-[64px] flex flex-row items-center justify-center gap-2">
            <Html5TwoTone className="cursor-default text-[32px]" />
            <span className="text-white cursor-default text-[28px]">QFace</span>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            items={menuItems}
            defaultSelectedKeys={key}
          ></Menu>
        </Sider>
        <Layout>
          <Header className="flex justify-end items-center">
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space className="flex items-center">
                  <span className="text-white cursor-pointer">
                    {session?.user?.adminId}
                  </span>
                  <Avatar
                    src={
                      <Image
                        src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMuaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA2LjAtYzAwMiA3OS4xNjQ0NjAsIDIwMjAvMDUvMTItMTY6MDQ6MTcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjRDMzg4MTZGNjk1RDExRURCODUxRTA1ODU1RTYwN0QyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjRDMzg4MTcwNjk1RDExRURCODUxRTA1ODU1RTYwN0QyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEMzODgxNkQ2OTVEMTFFREI4NTFFMDU4NTVFNjA3RDIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEMzODgxNkU2OTVEMTFFREI4NTFFMDU4NTVFNjA3RDIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAmQWRvYmUAZMAAAAABAwAVBAMGCg0AAAb9AAAMtgAAD7YA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"
                        className="w-32"
                        alt="avatar"
                      />
                    }
                  />
                </Space>
              </a>
            </Dropdown>
          </Header>
          <Content className="mx-4 my-5 bg-gray-100">{children}</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </>
  );
};

IndexLayout.auth = true;

export default IndexLayout;
