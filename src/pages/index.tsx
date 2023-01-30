/*
 * @Author       : Pear107
 * @Date         : 2023-01-16 14:32:39
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-01-28 11:27:07
 * @FilePath     : \q-face-web\src\pages\index.tsx
 * @Description  : 主页
 */
import { Layout, Menu } from "antd";
import { Html5TwoTone } from "@ant-design/icons";
import { useRouter } from "next/router";

const { Header, Footer, Sider, Content } = Layout;
const Index = () => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <Layout className="w-screen h-screen">
      <Sider width={256}>
        <div className="h-[64px] flex flex-row items-center justify-center gap-2">
          <Html5TwoTone className="cursor-default text-[32px]" />
          <span className="text-white cursor-default text-[28px]">QFace</span>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">员工信息</Menu.Item>
          <Menu.Item key="2">监控页</Menu.Item>
          <Menu.Item key="3">工作台</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header>Header</Header>
        <Content className="mx-3 my-4">{slug}</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default Index;
