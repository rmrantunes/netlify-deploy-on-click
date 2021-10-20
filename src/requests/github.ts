import axios from "axios";

export async function createProdPullRequest(config: {
  githubOAuthToken: string;
}) {
  return await axios.post<{ number: string }>(
    `https://api.github.com/repos/rmrantunes/netlify-deploy-on-click/pulls`,
    {
      head: "staging",
      base: "main",
      title: "Aprovado pelo cliente",
    },
    {
      headers: {
        Authorization: `token ${config.githubOAuthToken}`,
      },
    }
  );
}

export async function mergePullRequest(config: {
  pullRequestNumber: string;
  githubOAuthToken: string;
}) {
  return await axios.put(
    `https://api.github.com/repos/rmrantunes/netlify-deploy-on-click/pulls/${config.pullRequestNumber}/merge`,
    {
      commit_title: "Aprovado pelo cliente",
    },
    {
      headers: {
        Authorization: `token ${config.githubOAuthToken}`,
      },
    }
  );
}
