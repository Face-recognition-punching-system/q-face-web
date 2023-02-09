/*
 * @Author       : Pear107
 * @Date         : 2023-02-06 14:34:21
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-02-07 08:59:58
 * @FilePath     : \q-face-web\src\pages\api\updateFeedback.ts
 * @Description  : 头部注释o
 */
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  (async () => {
    try {
      const data = JSON.parse(req.body);
      const ret = await axios.post(
        "http://127.0.0.1:8888/admin/updateFeedback",
        {
          ...data,
        }
      );
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
    responseLimit: "1mb",
    externalResolver: true,
  },
};
