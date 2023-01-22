require('dotenv').config()

import { Octokit } from '@octokit/rest'
import { readFileSync } from 'fs';
import { join } from 'path';
import * as models from './models'

const { createAppAuth, createOAuthUserAuth } = require("@octokit/auth-app");

export async function commentOnNewIssue({ owner, repo, issue_number }: any) {

  const privateKey = readFileSync(process.env.github_private_key_path || join(__dirname, '..', 'powco-dev.2022-10-21.private-key.pem'));

  /*const octokit = new Octokit({
    auth: config.get('github_token')
  })*/

  const webhook = await models.GithubWebhook.findOne({
    where: {
      payload: {
        installation: {
          account: {
            login: owner
          }
        }
      }
    },
    order: [['createdAt', 'desc']]
  })

  console.log('webhook', webhook)

  const octokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: 251846,
      privateKey: privateKey.toString(),
      installationId: webhook.payload.installation.id
    },
  });

  const issue = await models.GithubIssue.findOne({
    where: {
      data: {
        number: issue_number
      },
      org: owner,
      repo
    }
  })

  if (!issue) { throw new Error('Issue not found') }

  const result = await octokit.request(`POST /repos/{owner}/{repo}/issues/{issue_number}/comments`, {
    owner,
    repo,
    issue_number,
    body: `Thank you for making this issue!\n\nPlease get it some attention by boosting it here https://powco.dev/github/${owner}/${repo}/issues/${issue_number}\n\nBounties may be sent to this address https://whatsonchain.com/address/${issue.run_owner} and will be paid to the worker who completes your issue.`
  })

  return result

}
