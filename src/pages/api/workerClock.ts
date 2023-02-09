import { message } from "antd";
/*
 * @Author       : Pear107
 * @Date         : 2023-02-06 17:08:19
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-02-09 08:50:15
 * @FilePath     : \q-face-web\src\pages\api\workerClock.ts
 * @Description  : 头部注释
 */
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getSession } from "next-auth/react";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  (async () => {
    try {
      const session = await getSession({ req });
      const data = JSON.parse(req.body);
      const ret = await axios.post("http://127.0.0.1:8888/admin/workerClock", {
        ...data,
      });
      res.status(200).json(ret.data);
    } catch (err) {
      res.status(500).json({ message: "unknown error" });
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
