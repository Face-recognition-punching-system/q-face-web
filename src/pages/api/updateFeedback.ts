/*
 * @Author       : Pear107
 * @Date         : 2023-02-06 14:34:21
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-02-07 08:59:58
 * @FilePath     : \q-face-web\src\pages\api\updateFeedback.ts
 * @Description  : 头部注释o
 */
import type { NextApiRequest, NextApiResponse } from "next";
import { postAxios } from "@/utils/axios";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  (async () => {
    try {
      const data = JSON.parse(req.body);
      const ret = await postAxios("/admin/updateFeedback", data);
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
    responseLimit: "1mb",
    externalResolver: true,
  },
};
