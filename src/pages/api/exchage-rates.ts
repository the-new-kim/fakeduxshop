// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import withHandler from "@/libs/server/withHandler";
// import { IExchangeRates } from "@/redux/slices/currencySlice";

// import type { NextApiRequest, NextApiResponse } from "next";

// export type ProductListResponse = {
//   ok: boolean;
//   data: IExchangeRates;
// };

// async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ProductListResponse>
// ) {
//   const headers = new Headers();
//   headers.append("apikey", process.env.EXCHANGE_RATES_API_KEY!);

//   const data = await (
//     await fetch(
//       `${process.env.EXCHANGE_RATES_BASE_URL}/latest?symbols=GBP%2CJPY%2CEUR&base=USD`,
//       {
//         method: "GET",
//         headers,
//         redirect: "follow",
//       }
//     )
//   ).json();

//   res.status(200).json({ ok: true, data });
// }

// export default withHandler({ methods: ["GET"], handler });
