/*
 * @Author       : Pear107
 * @Date         : 2023-01-25 19:12:12
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-02-01 06:18:44
 * @FilePath     : \q-face-web\src\pages\404.tsx
 * @Description  : 404 页面
 */
import Image from "next/image";
import { Button } from "antd";
import { useRouter } from "next/router";

import img404 from "@/assets/svgs/404.svg";

const Custom404 = () => {
  const router = useRouter();
  const replace = () => {
    router.replace("/");
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Image src={img404} alt="404" height={404} />
      <span className="mb-3">抱歉，你访问的页面不存在</span>
      <Button onClick={replace}>回到首页</Button>
    </div>
  );
};

export default Custom404;
