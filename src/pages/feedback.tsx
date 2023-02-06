/*
 * @Author       : Pear107
 * @Date         : 2023-01-31 21:32:30
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-02-06 16:46:17
 * @FilePath     : \q-face-web\src\pages\feedback.tsx
 * @Description  : 头部注释
 */
import React, { ReactElement } from "react";
import { Table, Tag, Tabs, Button, Space, Modal } from "antd";
import type { TabsProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

import IndexLayout from "@/layouts/indexLayout";
import { getAxios } from "@/utils/axios";
import { useRouter } from "next/router";

interface Data1Type {
  fid: string;
  cid: string;
  workerId: string;
  name: string;
  create_time: string;
  reason: string;
}

interface Data2Type {
  workerId: string;
  name: string;
  create_time: string;
  reason: string;
  res: string;
}

const Feedback = ({
  data1,
  data2,
}: {
  data1: Data1Type[];
  data2: Data2Type[];
}) => {
  const { data: session } = useSession({ required: true });
  const user: { id: string; csrfToken: string } = session?.user as {
    id: string;
    csrfToken: string;
  };
  const columns1: ColumnsType<Data1Type> = [
    {
      title: "员工号",
      dataIndex: "workerId",
      key: "workerId",
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "原因",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "时间",
      dataIndex: "create_time",
      key: "create_time",
    },
    {
      title: "操作",
      key: "operate",
      render: (_, { fid, cid }) => (
        <Space>
          <Button
            onClick={async () => {
              const data = {
                fid,
                cid,
                csrfToken: user.csrfToken,
                id: user.id,
                res: "通过",
              };
              const retPromise = await fetch("/api/updateFeedback", {
                method: "POST",
                body: JSON.stringify(data),
              });
              const ret = await retPromise.json();
              if (ret.message == "success") {
                console.log("操作成功");
              } else {
                console.log("操作失败");
              }
            }}
          >
            通过
          </Button>
          <Button
            onClick={async () => {
              const data = {
                fid,
                cid,
                csrfToken: user.csrfToken,
                id: user.id,
                res: "不通过",
              };
              const retPromise = await fetch("/api/updateFeedback", {
                method: "POST",
                body: JSON.stringify(data),
              });
              const ret = await retPromise.json();
              if (ret.message) {
                const router = useRouter();
                router.reload();
                console.log("操作成功");
              } else {
                console.log("操作失败");
              }
            }}
          >
            不通过
          </Button>
        </Space>
      ),
    },
  ];
  const columns2: ColumnsType<Data2Type> = [
    {
      title: "员工号",
      dataIndex: "workerId",
      key: "workerId",
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "原因",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "时间",
      dataIndex: "create_time",
      key: "create_time",
    },
    {
      title: "结果",
      key: "res",
      dataIndex: "res",
      render: (_, { res }) => (
        <Tag color={res === "通过" ? "green" : "red"}>{res}</Tag>
      ),
    },
  ];
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `未处理`,
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
      label: `已处理`,
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
        <title>打卡反馈</title>
      </Head>
      <section>
        <Tabs defaultActiveKey="1" type="card" items={items} />
      </section>
    </>
  );
};

Feedback.getLayout = function getLayout(page: ReactElement) {
  return <IndexLayout>{page}</IndexLayout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  let data1: Data1Type[] = [];
  let data2: Data2Type[] = [];

  try {
    const resPromise1 = getAxios("/admin/feedback", {});
    const resPromise2 = getAxios("/admin/feedbackRes", {});
    const res1 = await resPromise1;
    const res2 = await resPromise2;
    console.log(res1);
    console.log(res2);
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

export default Feedback;
