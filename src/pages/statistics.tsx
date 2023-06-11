/*
 * @Author       : Pear107
 * @Date         : 2023-03-07 08:21:50
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-05-12 00:43:41
 * @FilePath     : \q-face-web\src\pages\statistics.tsx
 * @Description  : 头部注释
 */
import React, { ReactElement, useEffect, useState } from "react";
import Head from "next/head";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import cookie from "react-cookies";
import Router from "next/router";

import IndexLayout from "@/layouts/indexLayout";
import { postAxios } from "@/utils/axios";

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
      title: "迟到次数",
      dataIndex: "be_late",
      key: "be_late",
      render:(value)=><span>{value??0}</span>
    },
    {
      title: "早退次数",
      dataIndex: "leave_early",
      key: "leave_early",
      render:(value)=><span>{value??0}</span>
    },
    {
      title: "未打卡次数",
      dataIndex: "not_clock",
      key: "not_clock",
      render:(value)=><span>{value??0}</span>
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
      const ret: any = await postAxios("/admin/readStatistics", {});
      if (Array.isArray(ret)) {
        setData(() => ret);
      } else {
        if (ret.message == "identity invalid") {
          Router.replace("/signIn");
        }
      }
    })();
  }, []);
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
