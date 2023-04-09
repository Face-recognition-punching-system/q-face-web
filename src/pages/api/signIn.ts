import { message } from "antd";
/*
 * @Author       : Pear107
 * @Date         : 2023-01-31 22:33:34
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-04-02 19:49:52
 * @FilePath     : \q-face-web\src\pages\api\signIn.ts
 * @Description  : 头部注释
 */
import type { NextApiRequest, NextApiResponse } from "next";
import { postAxios } from "@/utils/axios";
import qs from "qs";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = qs.stringify(JSON.parse(req.body));
    const ret = await postAxios("/admin/signIn", data);
    res.status(200).json(ret);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
    responseLimit: "1mb",
    externalResolver: true,
  },
};
