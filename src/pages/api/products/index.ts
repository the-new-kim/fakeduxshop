import withHandler from "@/libs/server/withHandler";
import { IProduct } from "@/libs/types";

import type { NextApiRequest, NextApiResponse } from "next";

export type ProductResponse = {
  ok: boolean;
  data: IProduct[];
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductResponse>
) {
  const data: IProduct[] = await (
    await fetch(`https://fakestoreapi.com/products/`)
  ).json();

  res.status(200).json({ ok: true, data });
}

export default withHandler({ methods: ["GET"], handler });
