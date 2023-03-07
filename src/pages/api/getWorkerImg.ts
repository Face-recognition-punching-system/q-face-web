import type { NextApiRequest, NextApiResponse } from "next";
import { postAxios } from "@/utils/axios";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  (async () => {
    try {
      const data = JSON.parse(req.body);
      const ret = await postAxios("/admin/getWorkerImg", data);
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
    responseLimit: "3mb",
    externalResolver: true,
  },
};
