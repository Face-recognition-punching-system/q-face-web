import { message } from "antd";
/*
 * @Author       : Pear107
 * @Date         : 2023-02-06 17:08:19
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-03-06 21:15:10
 * @FilePath     : \q-face-web\src\pages\api\workerClock.ts
 * @Description  : 头部注释
 */
import type { NextApiRequest, NextApiResponse } from "next";
import { postAxios } from "@/utils/axios";
import { getSession } from "next-auth/react";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  (async () => {
    try {
      const data = JSON.parse(req.body);
      const ret = await postAxios("/admin/workerClock", data);
      res.status(200).json(ret);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  })();
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
    responseLimit: "10mb",
    externalResolver: true,
  },
};
