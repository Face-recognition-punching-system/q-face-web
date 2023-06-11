/*
 * @Author       : Pear107
 * @Date         : 2023-01-28 23:25:33
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-06-03 03:02:02
 * @FilePath     : \q-face-web\src\pages\worker.tsx
 * @Description  : 头部注释
 */
import React, { ReactElement, useState, useRef, useEffect } from "react";
import { Button, Space, Table, Modal, Image, Tag } from "antd";
import { List, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import Head from "next/head";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import cookie from "react-cookies";
import Router from "next/router";

import IndexLayout from "@/layouts/indexLayout";
import { postAxios } from "@/utils/axios";
import { formatDatetime } from "@/utils/utils";

interface DataType {
  wid: number;
  workerId: string;
  name: string;
  age: string;
  department: string;
}

const Worker: {
  (): JSX.Element;
  getLayout(page: ReactElement): JSX.Element;
} = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wid, setWid] = useState(0);
  const [imageUrl, setImageUrl] = useState<string>("");
  const uploadRef = useRef<HTMLInputElement>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (!imageUrl) {
      return;
    }

    setIsModalOpen(false);
    if (imageUrl !== "") {
      console.log("hello world");
      try {
        const data = {
          img: imageUrl.replace(/^data:image\/\w+;base64,/, ""),
          wid: wid,
        };
        console.log(typeof wid);
        const ret: any = await postAxios("/admin/updateWorkerImg", data);
        if (ret.message === "success") {
          messageApi.success("更新成功");
        } else {
          messageApi.error("更新失败");
        }
      } catch (error) {}
    }
    setImageUrl(() => "");
    setWid(() => -1);
  };

  const handleCancel = () => {
    setIsModalOpen(() => false);
    setImageUrl(() => "");
    setWid(() => -1);
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("必须上传 PNG 或 JPG 格式图像!");
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("图像必须小于 2MB!");
    }

    return isJpgOrPng && isLt2M;
  };

  const handleFileReader = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null && e.target.files.length == 1) {
      const file: File = e.target.files[0];
      if (uploadRef.current != null) {
        uploadRef.current.value = "";
      }

      if (beforeUpload(file)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (ev: ProgressEvent<FileReader>) => {
          console.log(file);
          const base64: string = ev.target?.result as string;
          setImageUrl(() => base64);
        };
      }
    }
  };

  const previewWindow = (
    <div className="flex items-center justify-center w-64 h-64 border-gray-400 border-1 border-solid">
      <div>preview</div>
    </div>
  );

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
      key: "operate",
      render: (_, record) => (
        <Space>
          <Button
            onClick={async () => {
              try {
                const ret: any = await postAxios(
                  `/admin/readWorkerImg/${record.wid}`,
                  {}
                );
                if (ret.img) {
                  Modal.info({
                    title: "查看图像",
                    content: (
                      <section className="w-full h-full flex items-center justify-center">
                        <Image
                          width={256}
                          alt="avatar"
                          src={"data:image/jpg;base64," + ret.img}
                        />
                      </section>
                    ),
                    onOk: () => {},
                  });
                } else {
                  messageApi.error("获取失败");
                }
              } catch (error) {}
            }}
          >
            查看图像
          </Button>
          <Button
            onClick={() => {
              setWid(record.wid);
              showModal();
            }}
          >
            更新图像
          </Button>
          <Button
            onClick={async () => {
              let list: {
                id: string;
                img: string;
                clock_time: string;
                status: string;
                type: string;
              }[] = [];
              try {
                const ret: any = await postAxios(
                  `/admin/readWorkerClock/${record.wid}`,
                  {}
                );
                if (Array.isArray(ret)) {
                  list = ret;
                  console.log(ret);
                } else {
                  console.log(ret);
                }
              } catch (e) {}
              Modal.info({
                title: "打卡记录",
                content: (
                  <List
                    itemLayout="horizontal"
                    dataSource={list}
                    style={{ maxHeight: "60vh" }}
                    pagination={{ position: "bottom" }}
                    renderItem={(item) => (
                      <List.Item className="flex items-center justify-between">
                        <span>
                          {formatDatetime(item.clock_time, "datetime")}
                        </span>
                        <span>{item.type === "0" ? "上班" : "下班"}</span>
                        <div
                          onClick={
                            item.img === undefined
                              ? () => null
                              : () => {
                                  Modal.info({
                                    title: "查看图像",
                                    content: (
                                      <section className="w-full h-full flex items-center justify-center">
                                        <Image
                                          width={256}
                                          alt="avatar"
                                          src={item.img}
                                        />
                                      </section>
                                    ),
                                  });
                                }
                          }
                        >
                          {item.img == undefined ? (
                            <EyeInvisibleOutlined />
                          ) : (
                            <EyeOutlined />
                          )}
                        </div>
                        <div style={{ width: "20px" }}>
                          <Tag
                            color={
                              item.status === "0"
                                ? "green"
                                : item.status === "1"
                                ? "orange"
                                : "red"
                            }
                          >
                            {item.status === "0"
                              ? "打卡"
                              : item.status === "1"
                              ? item.type === "0"
                                ? "迟到"
                                : "早退"
                              : "未打卡"}
                          </Tag>
                        </div>
                      </List.Item>
                    )}
                  />
                ),
                onOk() {},
              });
            }}
          >
            查看打卡记录
          </Button>
        </Space>
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
        const ret = await postAxios("/admin/readWorker", {});
        console.log(ret);
        if (Array.isArray(ret)) {
          setData(() => ret);
        }
      } catch (err) {}
    })();
  }, []);
  return (
    <>
      <Head>
        <title>员工信息</title>
      </Head>
      {contextHolder}
      <Modal
        title="更新图像"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
        className="flex flex-col items-center justify-center gap-2"
      >
        <input
          type="file"
          onChange={handleFileReader}
          ref={uploadRef}
          className="hidden"
        />
        <Button
          onClick={() => {
            uploadRef.current?.click();
          }}
        >
          上传图像
        </Button>
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" width={256} />
        ) : (
          previewWindow
        )}
      </Modal>
      <Table rowKey={(r) => r.wid} columns={columns} dataSource={data} />
    </>
  );
};

Worker.getLayout = function getLayout(page: ReactElement) {
  return <IndexLayout>{page}</IndexLayout>;
};

export default Worker;
