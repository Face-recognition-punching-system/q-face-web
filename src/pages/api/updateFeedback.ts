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
      res.status(500).json({ message: "net error" });
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