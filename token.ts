import { Octokit } from "@octokit/core";

require('dotenv').config()

const { createTokenAuth } = require("@octokit/auth-token");

const { createAppAuth, createOAuthUserAuth } = require("@octokit/auth-app");

import * as github from './src/github'

async function main() {

  const auth = createTokenAuth(process.argv[2])

  const result = await auth()

  console.log(result)

  const appOctokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: github.appId,
      privateKey: github.getAppPrivateKey(),
      clientId: process.env.github_client_id,
      clientSecret: process.env.github_client_secret
    },
  });

  const userOctokit: any = await appOctokit.auth({
    type: "oauth-user",
    code: 'a61adf7b8b371e1918ca',
    factory: (options) => {
      return new Octokit({
        authStrategy: createOAuthUserAuth,
        auth: options,
      });
    },
  });

  const user = await userOctokit.request("GET /user");
  
  console.log('user.login', user)

}

main()
