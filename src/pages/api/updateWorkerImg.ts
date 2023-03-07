/*
 * @Author       : Pear107
 * @Date         : 2023-02-08 17:35:51
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-03-06 21:14:53
 * @FilePath     : \q-face-web\src\pages\api\updateWorkerImg.ts
 * @Description  : 头部注释
 */
/*
 * @Author       : Pear107
 * @Date         : 2023-02-08 17:35:51
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-02-08 17:36:36
 * @FilePath     : \q-face-web\src\pages\api\updateWorkerImg.ts
 * @Description  : 头部注释
 */
import type { NextApiRequest, NextApiResponse } from "next";
import { postAxios } from "@/utils/axios";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  (async () => {
    try {
      const data = JSON.parse(req.body);
      const ret = await postAxios("/admin/updateWorkerImg", data);
      res.status(200).json(ret);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  })();
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "3mb",
    },
    responseLimit: "1mb",
    externalResolver: true,
  },
};
