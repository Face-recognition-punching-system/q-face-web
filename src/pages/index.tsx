/*
 * @Author       : Pear107
 * @Date         : 2023-01-16 14:32:39
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-01-29 17:39:36
 * @FilePath     : \q-face-web\src\pages\index.tsx
 * @Description  : 主页
 */
import React, { ReactElement } from "react";
import Head from "next/head";

import IndexLayout from "@/layouts/indexLayout";

const Index = ({}) => {
  return (
    <Head>
      <title>首页</title>
    </Head>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <IndexLayout>{page}</IndexLayout>;
};

export default Index;
