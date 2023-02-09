/*
 * @Author       : Pear107
 * @Date         : 2023-02-08 17:35:51
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-02-08 20:28:17
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
import axios from "axios";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  (async () => {
    try {
      const data = JSON.parse(req.body);
      const ret = await axios.post(
        "http://127.0.0.1:8888/admin/updateWorkerImg",
        {
          ...data,
        }
      );
      res.status(200).json(ret.data);
    } catch (err) {
      res.status(200).json({ message: "unknown error" });
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
