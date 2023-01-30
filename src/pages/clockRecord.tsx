/*
 * @Author       : Pear107
 * @Date         : 2023-01-28 23:21:54
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-01-28 23:28:06
 * @FilePath     : \q-face-web\src\pages\index\clockRecord.tsx
 * @Description  : 头部注释
 */
import { ReactElement } from "react";

import IndexLayout from "@/layouts/indexLayout";

const ClockRecord = () => {
  return <div></div>;
};

ClockRecord.getLayout = function getLayout(page: ReactElement) {
  return <IndexLayout>{page}</IndexLayout>;
};

export default ClockRecord;
