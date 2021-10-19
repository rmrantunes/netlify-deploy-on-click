// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const githubHeaders = {
  Authorization: `token ${process.env.GITHUB_OAUTH}`,
};

async function createPullRequest() {
  return await axios.post<{ number: string }>(
    `https://api.github.com/repos/rmrantunes/netlify-deploy-on-click/pulls`,
    {
      head: "dev",
      base: "main",
      title: "Aprovado pelo cliente",
    },
    {
      headers: githubHeaders,
    }
  );
}

async function mergePullRequest(pullRequestNumber: string) {
  return await axios.put(
    `https://api.github.com/repos/rmrantunes/netlify-deploy-on-click/pulls/${pullRequestNumber}/merge`,
    {
      commit_title: "Aprovado pelo cliente",
    },
    {
      headers: githubHeaders,
    }
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { data: pullRequest } = await createPullRequest();
      await mergePullRequest(pullRequest.number);
      res.json({ ok: true, message: "Promoted to production" });
    } catch (error) {
      return res.json({ error });
    }
  }
}
