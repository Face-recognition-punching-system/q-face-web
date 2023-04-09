/*
 * @Author       : Pear107
 * @Date         : 2023-03-07 08:21:50
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-04-04 22:53:14
 * @FilePath     : \q-face-web\src\pages\statistics.tsx
 * @Description  : 头部注释
 */
import React, { ReactElement, useState } from "react";
import Head from "next/head";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

import IndexLayout from "@/layouts/indexLayout";

interface StatisticsType {
  workerId: string;
  department: string;
  name: string;
  lateNum: string;
  leaveNum: string;
  notOnDuty: string;
}

const Statistics: {
  (): JSX.Element;
  getLayout(page: ReactElement): JSX.Element;
} = () => {
  const [data, setData] = useState<StatisticsType[]>([]);
  const statistics: ColumnsType<StatisticsType> = [
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
      title: "迟到次数",
      dataIndex: "lateNum",
      key: "lateNum",
    },
    {
      title: "早退次数",
      dataIndex: "leaveNum",
      key: "leaveNum",
    },
    {
      title: "未上班次数",
      dataIndex: "notOnDutyNum",
      key: "notOnDutyNum",
    },
  ];
  return (
    <>
      <Head>
        <title>今日打卡</title>
      </Head>
      <Table
        rowKey={(r) => r.workerId}
        columns={statistics}
        dataSource={data}
        className="cursor-default"
      />
    </>
  );
};

Statistics.getLayout = function getLayout(page: ReactElement) {
  return <IndexLayout>{page}</IndexLayout>;
};

export default Statistics;
