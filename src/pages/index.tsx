/*
 * @Author       : Pear107
 * @Date         : 2023-01-16 14:32:39
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-06-03 03:05:02
 * @FilePath     : \q-face-web\src\pages\index.tsx
 * @Description  : 主页
 */
import React, { ReactElement, useEffect, useState } from "react";
import Head from "next/head";
import { Tabs, Table, Tag, Button } from "antd";
import type { TabsProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import cookie from "react-cookies";
import Router from "next/router";

import IndexLayout from "@/layouts/indexLayout";
import Calendar from "@/components/calendar";
import styles from "./index.module.less";
import { postAxios } from "@/utils/axios";
import { formatDatetime } from "@/utils/utils";

interface ClockType {
  workerId: string;
  name: string;
  department: string;
  create_time: string;
  status: string;
}

interface NotClockType {
  workerId: string;
  department: string;
  name: string;
  status: string;
}

const Index: {
  (): JSX.Element;
  getLayout(page: ReactElement): JSX.Element;
} = () => {
  const [onDuty, setOnDuty] = useState<ClockType[]>([]);
  const [offDuty, setOffDuty] = useState<ClockType[]>([]);
  const [notOnDuty, setNotOnDuty] = useState<NotClockType[]>([]);
  const [notOffDuty, setNotOffDuty] = useState<NotClockType[]>([]);
  const [select, setSelect] = useState<{
    day: number;
    month: number;
    year: number;
  }>({ day: 0, month: 0, year: 0 });
  const clock: ColumnsType<ClockType> = [
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
      title: "打卡时间",
      dataIndex: "create_time",
      key: "create_time",
      render: (value) => <span>{formatDatetime(value, "datetime")}</span>,
    },
    {
      title: "打卡状态",
      dataIndex: "status",
      key: "status",
      render: (value, record) => (
        <Tag color={value === "0" ? "green" : "orange"}>
          {record.status === "0"
            ? value === "0"
              ? "打卡"
              : "迟到"
            : value === "0"
            ? "打卡"
            : "早退"}
        </Tag>
      ),
    },
    {
      title: "操作",
      key: "operate",
      render: (_) => <Button>查看打卡图像</Button>,
    },
  ];
  const notClock: ColumnsType<NotClockType> = [
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
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "部门",
      dataIndex: "department",
      key: "department",
    },
  ];
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `上班打卡`,
      children: (
        <Table
          rowKey={(r) => r.workerId}
          columns={clock}
          dataSource={onDuty}
          className="cursor-default"
        />
      ),
    },
    {
      key: "2",
      label: `下班打卡`,
      children: (
        <Table
          rowKey={(r) => r.workerId}
          columns={clock}
          dataSource={offDuty}
          className="cursor-default"
        />
      ),
    },
    {
      key: "3",
      label: `未上班打卡`,
      children: (
        <Table
          rowKey={(r) => r.workerId}
          columns={notClock}
          dataSource={notOnDuty}
          className="cursor-default"
        />
      ),
    },
    {
      key: "4",
      label: `未下班打卡`,
      children: (
        <Table
          rowKey={(r) => r.workerId}
          columns={notClock}
          dataSource={notOffDuty}
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
        const datetime = formatDatetime(Date.now(), "date");
        const onDutyPromise = await postAxios(
          `/admin/readClock/0/0/${datetime}`,
          {}
        );
        const offDutyPromise = await postAxios(
          `/admin/readClock/0/1/${datetime}`,
          {}
        );
        const notOnDutyPromise = await postAxios(
          `/admin/readClock/1/0/${datetime}`,
          {}
        );
        const notOffDutyPromise = await postAxios(
          `/admin/readClock/1/1/${datetime}`,
          {}
        );
        const [onDuty, offDuty, notOnDuty, notOffDuty]: [any, any, any, any] =
          await Promise.all([
            onDutyPromise,
            offDutyPromise,
            notOnDutyPromise,
            notOffDutyPromise,
          ]);

        if (Array.isArray(onDuty)) {
          setOnDuty(() => onDuty);
        }

        if (Array.isArray(offDuty)) {
          setOffDuty(() => offDuty);
        }

        if (Array.isArray(notOnDuty)) {
          setNotOnDuty(() => notOnDuty);
        }

        if (Array.isArray(notOffDuty)) {
          setNotOffDuty(() => notOffDuty);
        }
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const datetime = `${select.year}-${select.month
          .toString()
          .padStart(2, "0")}-${select.day.toString().padStart(2, "0")}`;
        console.log(datetime);
        const onDutyPromise = await postAxios(
          `/admin/readClock/0/0/${datetime}`,
          {}
        );
        const offDutyPromise = await postAxios(
          `/admin/readClock/0/1/${datetime}`,
          {}
        );
        const notOnDutyPromise = await postAxios(
          `/admin/readClock/1/0/${datetime}`,
          {}
        );
        const notOffDutyPromise = await postAxios(
          `/admin/readClock/1/1/${datetime}`,
          {}
        );
        const [onDuty, offDuty, notOnDuty, notOffDuty]: [any, any, any, any] =
          await Promise.all([
            onDutyPromise,
            offDutyPromise,
            notOnDutyPromise,
            notOffDutyPromise,
          ]);

        if (Array.isArray(onDuty)) {
          setOnDuty(() => onDuty);
        }

        if (Array.isArray(offDuty)) {
          setOffDuty(() => offDuty);
        }

        if (Array.isArray(notOnDuty)) {
          setNotOnDuty(() => notOnDuty);
        }

        if (Array.isArray(notOffDuty)) {
          setNotOffDuty(() => notOffDuty);
        }
      } catch (error) {}
    })();
  }, [select]);
  return (
    <>
      <Head>
        <title>打卡记录</title>
      </Head>
      <section className={styles.container}>
        <Tabs
          defaultActiveKey="1"
          type="card"
          items={items}
          className={styles.tabs}
        />
        <Calendar setSelect={setSelect} select={select} />
      </section>
    </>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <IndexLayout>{page}</IndexLayout>;
};

export default Index;
