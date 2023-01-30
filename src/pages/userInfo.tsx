/*
 * @Author       : Pear107
 * @Date         : 2023-01-28 23:25:33
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-01-29 17:56:22
 * @FilePath     : \q-face-web\src\pages\userInfo.tsx
 * @Description  : 头部注释
 */
import React, { ReactElement } from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import Head from "next/head";

import IndexLayout from "@/layouts/indexLayout";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const UserInfo = () => {
  return (
    <>
      <Head>
        <title>员工信息</title>
      </Head>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

UserInfo.getLayout = function getLayout(page: ReactElement) {
  return <IndexLayout>{page}</IndexLayout>;
};

export default UserInfo;
