/*
 * @Author       : Pear107
 * @Date         : 2023-01-31 21:32:30
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-04-07 00:40:48
 * @FilePath     : \q-face-web\src\pages\askForLeave.tsx
 * @Description  : 头部注释
 */
import React, { ReactElement, useEffect, useState } from "react";
import { Table, Tag, Tabs, Button, Space } from "antd";
import type { TabsProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import Head from "next/head";
import { useRouter } from "next/router";

import IndexLayout from "@/layouts/indexLayout";
import { postAxios } from "@/utils/axios";

interface NotDealType {
  fid: string;
  cid: string;
  workerId: string;
  name: string;
  create_time: string;
  reason: string;
}

interface DealType {
  workerId: string;
  name: string;
  create_time: string;
  reason: string;
  result: string;
}

const Feedback: {
  (): JSX.Element;
  getLayout(page: ReactElement): JSX.Element;
} = () => {
  const [notDeal, setNotDeal] = useState<NotDealType[]>([]);
  const [deal, setDeal] = useState<DealType[]>([]);
  const user: { id: string; csrfToken: string } = { id: "", csrfToken: "" };
  const columns1: ColumnsType<NotDealType> = [
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
                result: "1",
              };
              const ret: any = {};
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
                result: "0",
              };
              const ret: any = {};
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
  const columns2: ColumnsType<DealType> = [
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
      render: (_, { result }) => (
        <Tag color={result === "1" ? "green" : "red"}>
          {result === "1" ? "通过" : "未通过"}
        </Tag>
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
          dataSource={notDeal}
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
          dataSource={deal}
          className="cursor-default"
        />
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const data = {
          id: "",
          token: "",
        };
        const notDealPromise = await postAxios("/admin/getFeedback", data);
        const dealPromise = await postAxios("/admin/getFeedbackResult", data);
        const [notDeal, deal] = await Promise.all([
          notDealPromise,
          dealPromise,
        ]);
        if (Array.isArray(notDeal)) {
          setNotDeal(() => notDeal);
        }

        if (Array.isArray(deal)) {
          setDeal(() => deal);
        }
      } catch (error) {}
    })();
  }, []);
  return (
    <>
      <Head>
        <title>请假管理</title>
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

export default Feedback;
