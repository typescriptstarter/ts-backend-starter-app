
import { log } from './log'

import { Octokit } from "@octokit/core";

import config from './config'

const octokit = new Octokit({
  auth: config.get('github_token')
})

export async function listIssues(): Promise<any> {

  log.info('github.listIssues')

  const result = await octokit.request('GET /orgs/{org}/issues', {
    org: 'pow-co',
    filter: 'all',
  })

  log.info('github.listIssues.result', result)

  return result

}

