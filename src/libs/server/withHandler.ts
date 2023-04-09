import { NextApiRequest, NextApiResponse } from "next";
import { errorMessage } from "@/libs/utils";

export type TMethods = "GET" | "POST" | "PUT" | "DELETE";

interface IConfigType {
  methods: TMethods[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void | Promise<void>;
}

export default function withHandler({ methods, handler }: IConfigType) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).end();
    }

    try {
      await handler(req, res);
    } catch (error) {
      return res.status(500).json({ ok: false, error: errorMessage(error) });
    }
  };
}
