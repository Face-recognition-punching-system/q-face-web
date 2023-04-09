/*
 * @Author       : Pear107
 * @Date         : 2023-01-16 14:32:39
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-04-09 12:30:50
 * @FilePath     : \q-face-web\src\pages\index.tsx
 * @Description  : 主页
 */
import React, { ReactElement, useEffect, useState } from "react";
import Head from "next/head";
import { Tabs, Table, Tag } from "antd";
import type { TabsProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useSession } from "next-auth/react";

import IndexLayout from "@/layouts/indexLayout";
import Calendar from "@/components/calendar";
import styles from "./index.module.less";
import { postAxios } from "@/utils/axios";

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
  const { data: session } = useSession({ required: true });
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
      title: "部门",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "时间",
      dataIndex: "create_time",
      key: "create_time",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (value, record) => (
        <Tag color={value === "0" ? "green" : "red"}>
          {record.status === "0" ? (value === "0" ? "正常" : "迟到") : (value === "0" ? "正常" : "早退")}
        </Tag>
      ),
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
      title: "部门",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
    },
  ];
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `已上班`,
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
      label: `已下班`,
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
      label: `未上班`,
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
      label: `未下班`,
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
    (async () => {
      const data = {
        // @ts-ignore
        id: session?.user?.id,
        // @ts-ignore
        csrfToken: session?.user?.csrfToken,
      };

      try {
        const onDutyPromise = await postAxios("/admin/getOnDuty", data);
        const offDutyPromise = await postAxios("/admin/getOffDuty", data);
        const notOnDutyPromise = await postAxios("/admin/getNotOnDuty", data);
        const notOffDutyPromise = await postAxios("/admin/getNotOffDuty", data);
        const [onDuty, offDuty, notOnDuty, notOffDuty] = await Promise.all([
          onDutyPromise,
          offDutyPromise,
          notOnDutyPromise,
          notOffDutyPromise,
        ]);
        if (Array.isArray(onDuty)) {
          console.log(onDuty);
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
  return (
    <>
      <Head>
        <title>今日打卡</title>
      </Head>
      <section className={styles.container}>
        <Tabs
          defaultActiveKey="1"
          type="card"
          items={items}
          className={styles.tabs}
        />
        <Calendar />
      </section>
    </>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <IndexLayout>{page}</IndexLayout>;
};

export default Index;
