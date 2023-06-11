/*
 * @Author       : Pear107
 * @Date         : 2023-01-31 21:32:30
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-05-11 21:24:44
 * @FilePath     : \q-face-web\src\pages\feedback.tsx
 * @Description  : 头部注释
 */
import React, { ReactElement, useEffect, useState } from "react";
import {
  Table,
  Tag,
  Tabs,
  Button,
  Space,
  Dropdown,
  MenuProps,
  Menu,
} from "antd";
import type { TabsProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import Head from "next/head";
import cookie from "react-cookies";
import Router from "next/router";

import IndexLayout from "@/layouts/indexLayout";
import { postAxios } from "@/utils/axios";
import { formatDatetime } from "@/utils/utils";

interface NotDealType {
  fid: number;
  cid: number;
  workerId: string;
  name: string;
  age: number;
  department: string;
  type: string;
  status: string;
  clock_time: string;
  feedback_time: string;
  reason: string;
  img: string;
}

interface DealType {
  fid: number;
  workerId: string;
  name: string;
  age: number;
  department: string;
  type: string;
  status: string;
  clock_time: string;
  feedback_time: string;
  reason: string;
  result: string;
  img: string;
  isClock: string;
}

const Feedback: {
  (): JSX.Element;
  getLayout(page: ReactElement): JSX.Element;
} = () => {
  const [notDeal, setNotDeal] = useState<NotDealType[]>([]);
  const [deal, setDeal] = useState<DealType[]>([]);
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
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "部门",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "打卡类型",
      dataIndex: "type",
      key: "type",
      render: (value: "0" | "1") => (
        <span>{value == "0" ? "上班" : "下班"}</span>
      ),
    },
    {
      title: "打卡状态",
      dataIndex: "status",
      key: "status",
      render: (value: "1" | "2", record) => (
        <Tag color={value === "1" ? "orange" : "red"}>
          {record.type == "0"
            ? value == "1"
              ? "迟到"
              : "未打卡"
            : value == "1"
            ? "早退"
            : "未打卡"}
        </Tag>
      ),
    },
    {
      title: "打卡时间",
      dataIndex: "clock_time",
      key: "clock_time",
      render: (value) => <span>{formatDatetime(value, "datetime")}</span>,
    },
    {
      title: "原因",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "反馈时间",
      dataIndex: "feedback_time",
      key: "feedback_time",
      render: (value) => <span>{formatDatetime(value, "datetime")}</span>,
    },
    {
      title: "操作",
      key: "operate",
      render: (_, { fid, cid, img, type, status }) => (
        <Space>
          <Button>查看打卡图像</Button>
          <Dropdown
            overlay={() => (
              <Menu>
                <Menu.Item key="1">
                  <Tag
                    color="green"
                    onClick={async () => {
                      const data = {
                        fid,
                        cid,
                        status,
                        result: "0",
                      };
                      const ret: any = await postAxios(
                        "/admin/updateFeedback",
                        data
                      );
                      console.log(ret);
                      if (ret.message == "success") {
                        console.log("操作成功");
                      } else {
                        console.log("操作失败");
                      }
                    }}
                  >
                    打卡
                  </Tag>
                </Menu.Item>
                <Menu.Item key="2" disabled={status == "1"}>
                  <Tag
                    color="orange"
                    onClick={async () => {
                      const data = {
                        fid,
                        cid,
                        status,
                        result: "1",
                      };
                      const ret: any = await postAxios(
                        "/admin/updateFeedback",
                        data
                      );
                      console.log(ret);
                      if (ret.message == "success") {
                        console.log("操作成功");
                      } else {
                        console.log("操作失败");
                      }
                    }}
                  >
                    {type == "0" ? "迟到" : "早退"}
                  </Tag>
                </Menu.Item>
                <Menu.Item>
                  <Tag
                    color="red"
                    onClick={async () => {
                      const data = {
                        fid,
                        cid,
                        status,
                        result: status,
                      };
                      const ret: any = await postAxios(
                        "/admin/updateFeedback",
                        data
                      );
                      console.log(ret);
                      if (ret.message == "success") {
                        console.log("操作成功");
                      } else {
                        console.log("操作失败");
                      }
                    }}
                  >
                    不处理
                  </Tag>
                </Menu.Item>
              </Menu>
            )}
            placement="bottom"
            arrow
          >
            <Button>处理</Button>
          </Dropdown>
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
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "部门",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "打卡类型",
      dataIndex: "type",
      key: "type",
      render: (value: "0" | "1") => (
        <span>{value == "0" ? "上班" : "下班"}</span>
      ),
    },
    {
      title: "打卡时间",
      dataIndex: "clock_time",
      key: "clock_time",
      render: (value) => <span>{formatDatetime(value, "datetime")}</span>,
    },
    {
      title: "原因",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "反馈时间",
      dataIndex: "feedback_time",
      key: "feedback_time",
      render: (value) => <span>{formatDatetime(value, "datetime")}</span>,
    },
    {
      title: "处理时间",
      dataIndex: "deal_time",
      key: "deal_time",
      render: (value) => <span>{formatDatetime(value, "datetime")}</span>,
    },
    {
      title: "原始状态",
      dataIndex: "origin",
      key: "origin",
      render: (value: "1" | "2", record) => (
        <Tag color={value === "1" ? "orange" : "red"}>
          {record.type == "0"
            ? value == "1"
              ? "迟到"
              : "未打卡"
            : value == "1"
            ? "早退"
            : "未打卡"}
        </Tag>
      ),
    },
    {
      title: "结果",
      key: "result",
      dataIndex: "result",
      render: (value, record) => (
        <Tag color={value === "0" ? "green" : value === "1" ? "orange" : "red"}>
          {value === "0"
            ? "打卡"
            : value === "1"
            ? record.type === "0"
              ? "迟到"
              : "早退"
            : "未打卡"}
        </Tag>
      ),
    },
    {
      title: "操作",
      key: "operate",
      render: (_, { img }) => <Button>查看打卡图像</Button>,
    },
  ];
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `未处理`,
      children: (
        <Table
          rowKey={(r) => r.fid}
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
          rowKey={(r) => r.fid}
          columns={columns2}
          dataSource={deal}
          className="cursor-default"
        />
      ),
    },
  ];

  useEffect(() => {
    if (
      cookie.load("token") === undefined ||
      cookie.load("aid") === undefined
    ) {
      Router.replace("/signIn");
    }
    (async () => {
      try {
        const notDealPromise = await postAxios("/admin/readFeedback/0", {});
        const dealPromise = await postAxios("/admin/readFeedback/1", {});
        const [notDeal, deal]: [any, any] = await Promise.all([
          notDealPromise,
          dealPromise,
        ]);
        if (Array.isArray(notDeal)) {
          setNotDeal(() => notDeal);
        } else {
          if (notDeal.message == "identity invalid") {
            Router.replace("/signIn");
          }
        }

        if (Array.isArray(deal)) {
          setDeal(() => deal);
        } else {
          if (deal.message == "identity invalid") {
            Router.replace("/signIn");
          }
        }
      } catch (error) {}
    })();
  }, []);
  return (
    <>
      <Head>
        <title>反馈管理</title>
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
