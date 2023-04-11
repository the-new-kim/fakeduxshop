import withHandler from "@/libs/server/withHandler";
import { IExchangeRates } from "@/redux/slices/exchangeRatesSlice";

import type { NextApiRequest, NextApiResponse } from "next";

export type ExchangeRateResponse = {
  ok: boolean;
  data: IExchangeRates;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExchangeRateResponse>
) {
  const headers = new Headers();
  headers.append("apikey", process.env.EXCHANGE_RATES_API_KEY!);

  const data: IExchangeRates = await (
    await fetch(
      `${process.env.EXCHANGE_RATES_BASE_URL}/latest?symbols=GBP%2CJPY%2CEUR&base=USD`,
      {
        method: "GET",
        headers,
        redirect: "follow",
      }
    )
  ).json();

  if (!data.success) {
    throw new Error("500");
  }

  res.status(200).json({ ok: true, data });
}

export default withHandler({ methods: ["GET"], handler });
