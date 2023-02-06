/*
 * @Author       : Pear107
 * @Date         : 2023-01-16 14:32:39
 * @LastEditors  : Pear107
<<<<<<< HEAD
 * @LastEditTime : 2023-02-06 16:43:24
 * @FilePath     : \q-face-web\src\pages\index.tsx
 * @Description  : 主页
 */
import React, { ReactElement } from "react";
import Head from "next/head";
import { Tabs, Table } from "antd";
import type { TabsProps } from "antd";
import { GetServerSideProps } from "next";
import type { ColumnsType } from "antd/es/table";

import IndexLayout from "@/layouts/indexLayout";
import { getAxios } from "@/utils/axios";

interface ClockType {
  workerId: string;
  name: string;
  create_time: string;
}

interface NotClockType {
  workerId: string;
  name: string;
}

const Index = ({
  data1,
  data2,
}: {
  data1: ClockType[];
  data2: NotClockType[];
}) => {
  const columns1: ColumnsType<ClockType> = [
    {
      title: "员工号",
      dataIndex: "workerId",
      key: "workId",
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "创建时间",
      dataIndex: "create_time",
      key: "create_time",
    },
  ];
  const columns2: ColumnsType<NotClockType> = [
    {
      title: "员工号",
      dataIndex: "workerId",
      key: "workId",
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
  ];
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `已打卡人数`,
      children: (
        <Table
          rowKey={(r) => r.workerId}
          columns={columns1}
          dataSource={data1}
          className="cursor-default"
        />
      ),
    },
    {
      key: "2",
      label: `未打卡人数`,
      children: (
        <Table
          rowKey={(r) => r.workerId}
          columns={columns2}
          dataSource={data2}
          className="cursor-default"
        />
      ),
    },
  ];
  return (
    <>
      <Head>
        <title>首页</title>
      </Head>
      <section>
        <Tabs defaultActiveKey="1" type="card" items={items} />
      </section>
    </>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <IndexLayout>{page}</IndexLayout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  let data1: ClockType[] = [],
    data2: NotClockType[] = [];
  try {
    const resPromise1 = getAxios("/admin/clock", {});
    const resPromise2 = getAxios("/admin/notClock", {});
    const res1 = await resPromise1;
    const res2 = await resPromise2;
    if (Array.isArray(res1)) {
      data1 = res1;
    }
    if (Array.isArray(res2)) {
      data2 = res2;
    }
  } catch (error) {}
  return {
    props: { data1, data2 },
  };
};

=======
 * @LastEditTime : 2023-01-28 11:27:07
 * @FilePath     : \q-face-web\src\pages\index.tsx
 * @Description  : 主页
 */
import { Layout, Menu } from "antd";
import { Html5TwoTone } from "@ant-design/icons";
import { useRouter } from "next/router";

const { Header, Footer, Sider, Content } = Layout;
const Index = () => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <Layout className="w-screen h-screen">
      <Sider width={256}>
        <div className="h-[64px] flex flex-row items-center justify-center gap-2">
          <Html5TwoTone className="cursor-default text-[32px]" />
          <span className="text-white cursor-default text-[28px]">QFace</span>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">员工信息</Menu.Item>
          <Menu.Item key="2">监控页</Menu.Item>
          <Menu.Item key="3">工作台</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header>Header</Header>
        <Content className="mx-3 my-4">{slug}</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};

>>>>>>> 80ee4a84fc3579c6e27c241dc17199ffb52842f5
export default Index;
