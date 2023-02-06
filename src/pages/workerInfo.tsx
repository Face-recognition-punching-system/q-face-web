/*
 * @Author       : Pear107
 * @Date         : 2023-01-28 23:25:33
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-02-06 18:03:25
 * @FilePath     : \q-face-web\src\pages\workerInfo.tsx
 * @Description  : 头部注释
 */
import React, { ReactElement } from "react";
import { Button, Space, Table, Modal, Image } from "antd";
import { Avatar, List } from "antd";
import type { ColumnsType } from "antd/es/table";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

import IndexLayout from "@/layouts/indexLayout";
import { getAxios } from "@/utils/axios";

interface DataType {
  id: string;
  workerId: string;
  name: string;
  age: string;
  department: string;
}

const WorkerInfo = ({ data }: { data: DataType[] }) => {
  const { data: session } = useSession({ required: true });
  const user: { id: string; csrfToken: string } = session?.user as {
    id: string;
    csrfToken: string;
  };
  const columns: ColumnsType<DataType> = [
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
      title: "操作",
      key: "action",
      render: (_, { id }) => (
        <Space>
          <Button
            onClick={() => {
              Modal.info({
                title: "查看人脸",
                content: (
                  <section className="flex items-center justify-between">
                    <Image
                      width={200}
                      src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
                    />
                    <Button>更新人脸</Button>
                  </section>
                ),
              });
            }}
          >
            查看人脸
          </Button>
          <Button
            onClick={async () => {
              let list: { id: string; img: string; create_time: string }[] = [];
              try {
                const data = {
                  wid: id,
                  id: user.id,
                  csrfToken: user.csrfToken,
                };
                const retPromise = await fetch("/api/workerClock", {
                  method: "POST",
                  body: JSON.stringify(data),
                });
                const ret = await retPromise.json();
                if (Array.isArray(ret)) {
                  list = ret;
                  console.log(ret);
                } else {
                  console.log(ret);
                }
              } catch (e) {}
              Modal.info({
                title: "历史打卡",
                content: (
                  <List
                    itemLayout="horizontal"
                    dataSource={list}
                    renderItem={(item) => (
                      <List.Item className="flex items-center justify-between">
                        <span>{item.create_time}</span>
                        {item.img == "null" ? (
                          <EyeInvisibleOutlined />
                        ) : (
                          <EyeOutlined />
                        )}
                      </List.Item>
                    )}
                  />
                ),
                onOk() {},
              });
            }}
          >
            查看历史打卡
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Head>
        <title>员工信息</title>
      </Head>
      <Table rowKey={(r) => r.id} columns={columns} dataSource={data} />
    </>
  );
};

WorkerInfo.getLayout = function getLayout(page: ReactElement) {
  return <IndexLayout>{page}</IndexLayout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  let data: DataType[] = [];
  try {
    const res = await getAxios("/admin/workerInfo", {});
    if (Array.isArray(res)) {
      data = res;
    }
  } catch (error) {}
  return {
    props: { data },
  };
};

export default WorkerInfo;
