
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

  let org = process.argv[2] || 'pow-co'

  const repo = process.argv[3] || 'powco.dev'

  //const issues = await listIssues({ org, repo })
  
  //console.log(issues)

  /*for (let issue of issues) {

    console.log({ title: issue.title, state: issue.state })
  }

  console.log(`${issues.length} open issues for ${org}/${repo}`)
  
  const { data: repos } = await requestWithAuth("GET /orgs/:org/repos", {
    org,
    type: "public"
  });*/

  /*for (let {name: repo} of repos) {

    const issues = await listIssues({ org, repo })
  
    //console.log(issues)
  
    for (let issue of issues) {
  
      console.log({ title: issue.title, state: issue.state })
    }
  
    console.log(`${issues.length} open issues for ${org}/${repo}`)

  }*/

  
  const octokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: 251846,
      privateKey: privateKey.toString(),
      installationId: 30471878
    },
  });

  const {
    data: { slug },
  } = await octokit.rest.apps.getAuthenticated();

  const owner = org

  /*const issue = await octokit.rest.issues.create({
    owner,
    repo,
    title: "Hello world from " + slug,
  });*/

  //console.log(issue, 'issue.created')

  const comment = await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: 39,//issue.data.number,
    body: 'Powco Dev Bot is Watching this Issue!'
  });

  console.log(comment, 'comment.created')

}

if (require.main === module) {

  main()
}
