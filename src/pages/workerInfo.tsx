/*
 * @Author       : Pear107
 * @Date         : 2023-01-28 23:25:33
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-02-09 12:23:21
 * @FilePath     : \q-face-web\src\pages\workerInfo.tsx
 * @Description  : 头部注释
 */
import React, { ReactElement, useState, useRef } from "react";
import { Button, Space, Table, Modal, Image, Tag } from "antd";
import { List, message } from "antd";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wid, setWid] = useState("");
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
    const user: { id: string; csrfToken: string } = session?.user as {
      id: string;
      csrfToken: string;
    };
    if (imageUrl !== "") {
      try {
        const data = {
          id: user.id,
          csrfToken: user.csrfToken,
          img: imageUrl.replace(/^data:image\/\w+;base64,/, ""),
          wid: wid,
        };
        const retPromise = await fetch("/api/updateWorkerImg", {
          method: "POST",
          body: JSON.stringify(data),
        });
        const ret = await retPromise.json();
        console.log(ret);
        if (ret.message === "success") {
          messageApi.success("更新成功");
        } else {
          messageApi.error("更新失败");
        }
      } catch (error) {}
    }
    setImageUrl(() => "");
    setWid(() => "");
  };

  const handleCancel = () => {
    setIsModalOpen(() => false);
    setImageUrl(() => "");
    setWid(() => "");
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
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
            onClick={async () => {
              try {
                const data = {
                  id: user.id,
                  csrfToken: user.csrfToken,
                  wid: id,
                };
                const retPromise = await fetch("/api/getWorkerImg", {
                  method: "POST",
                  body: JSON.stringify(data),
                });
                const ret = await retPromise.json();
                if (ret.img) {
                  Modal.info({
                    title: "查看人脸",
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
            查看人脸
          </Button>
          <Button
            onClick={() => {
              setWid(id);
              setWid((_) => {
                return _;
              });
              showModal();
            }}
          >
            更新人脸
          </Button>
          <Button
            onClick={async () => {
              let list: {
                id: string;
                img: string;
                create_time: string;
                isClock: string;
              }[] = [];
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
                        <div
                          onClick={async () => {
                            Modal.info({
                              title: "查看人脸",
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
                          }}
                        >
                          {item.img == "null" ? (
                            <EyeInvisibleOutlined />
                          ) : (
                            <EyeOutlined />
                          )}
                        </div>
                        <Tag color={item.isClock === "是" ? "green" : "red"}>
                          {item.isClock}
                        </Tag>
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
      {contextHolder}
      <Modal
        title="更新人脸"
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
          上传图片
        </Button>
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" width={256} />
        ) : (
          previewWindow
        )}
      </Modal>
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
