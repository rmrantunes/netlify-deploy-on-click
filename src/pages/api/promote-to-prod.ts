// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { mergePullRequest, createProdPullRequest } from "../../requests/github";

const githubOAuthToken = process.env.GITHUB_OAUTH;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST" && githubOAuthToken) {
    try {
      const { data: pullRequest } = await createProdPullRequest({
        githubOAuthToken,
      });
      await mergePullRequest({
        pullRequestNumber: pullRequest.number,
        githubOAuthToken,
      });
      res.json({ ok: true, message: "Promoted to production" });
    } catch (error) {
      return res.json({ error });
    }
  }
}
