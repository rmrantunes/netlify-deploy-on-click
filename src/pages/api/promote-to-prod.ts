// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const promoteEndpoint = `https://api.netlify.com/api/v1/deploys/${req.query.deploy_id}/restore`;

    await axios.post(promoteEndpoint, undefined, {
      headers: {
        Authorization: "Bearer " + process.env.NETLIFY_ACCESS_TOKEN,
      },
    });
  }
}
