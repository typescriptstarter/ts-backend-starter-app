
import { Octokit, App } from 'octokit'

import { createAppAuth } from "@octokit/auth-app";

interface Repo {

}

interface Issue {

}

export async function listRepos(token: string): Promise<Repo[]> {

  return []

}


import { listIssues } from '../github'

import {
  createOAuthAppAuth,
  createOAuthUserAuth,
} from "@octokit/auth-oauth-app"

import { request } from '@octokit/request';

import { join } from 'path'

import { readFileSync } from 'fs';

async function main() {

  const privateKey = readFileSync(join(__dirname, '../..', 'powco-dev.2022-10-21.private-key.pem'));

  const auth = createAppAuth({
    appId: 251846,
    privateKey: privateKey.toString(),
    installationId: 31749918
  });

  const { token } = await auth({ type: "installation" });
  
  const requestWithAuth = request.defaults({
    request: {
      hook: auth.hook
    }
  })

  let org = 'pow-co'
  
  const { data: repos } = await requestWithAuth("GET /orgs/:org/repos", {
    org,
    type: "public"
  });

  for (let {name: repo} of repos) {

    const issues = await listIssues({ org, repo })
  
    //console.log(issues)
  
    for (let issue of issues) {
  
      //console.log({ title: issue.title, state: issue.state })
    }
  
    console.log(`${issues.length} open issues for ${org}/${repo}`)


  }

  /*

  const appOctokit = new Octokit({
    authStrategy: createOAuthAppAuth,
    auth: {
      clientId: process.env.github_client_id,
      clientSecret: process.env.github_client_secret
    },
  });
  
  // Send requests as app
  /*&await appOctokit.request("POST /application/{client_id}/token", {
    client_id: "1234567890abcdef1234",
    access_token: "existingtoken123",
  });
  console.log("token is valid");
  
  // create a new octokit instance that is authenticated as the user
  const userOctokit: any = await appOctokit.auth({
    type: "oauth-user",
    code: "403f4f68e382f8bf694e",
    factory: (options) => {
      return new Octokit({
        authStrategy: createOAuthUserAuth,
        auth: options,
      });
    },
  });

  console.log(userOctokit.rest.issues)

  const issuesForOrg = await userOctokit.rest.issues.listForAuthenticatedUser()

  console.log({ issuesForOrg })
  
  // Exchanges the code for the user access token authentication on first request
  // and caches the authentication for successive requests
  /*const {
    data: { login }, //@ts-ignore
  } = await userOctokit.request("GET /user");
  console.log("Hello, %s!", login);*/
  
}

if (require.main === module) {

  main()
}
