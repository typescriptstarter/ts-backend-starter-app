
import { log } from './log'

import { Octokit } from "@octokit/core";

import config from './config'

import * as models from './models'

import { Op } from 'sequelize'

import { onchain } from 'stag-wallet'

import delay from 'delay'

const octokit = new Octokit({
  auth: config.get('github_token')
})

import axios from 'axios'

export async function listIssues({org, repo}: {org: string, repo:string }): Promise<any> {

  const { data } = await axios.get(`https://api.github.com/repos/${org}/${repo}/issues`)

  return data

}

export async function listRepos({org}: {org: string }): Promise<any> {

  const { data } = await axios.get(`https://api.github.com/orgs/${org}/repos`)

  return data

}

export async function importRepoIssues({ org, repo }: any): Promise<any> {

  const issues = await listIssues({ org, repo })

  const result = []

  for (let issue of issues) {

    const [org, repo] = issue.repository_url.split('/repos/')[1].split('/')

    let [record, isNew] = await models.GithubIssue.findOrCreate({

      where: {

        issue_id: issue.id

      },

      defaults: {

        issue_id: issue.id,

        data: issue,

        state: issue.state,

        repo,

        org

      }

    })

    if (isNew) {

      result.push(issue)

    }

  }

  return result

}

export async function syncIssueToBlockchain(issue): Promise<[any, boolean]> {


  console.log('onchain find or create', {
    where: {
      app: 'powco.dev',
      type: 'github.issue',
      content: {
        id: issue.issue_id
      }
    },
    defaults: {
      app: 'powco.dev',
      key: 'github.issue',
      val: issue.data
    }
  })

  const [result, isNew] = await onchain.findOrCreate({
    where: {
      app: 'powco.dev',
      type: 'github.issue',
      content: {
        id: issue.issue_id
      }
    },
    defaults: {
      app: 'powco.dev',
      key: 'github.issue',
      val: issue.data
    }
  })

  if (isNew) {

    console.log('posted to blockchain', result)

    if (!issue.data.user.login.match('dependabot')) {

      notify('powco-development', `${issue.data.user.login} created a new github issue for ${issue.data.url}\n\n${issue.data.title}\n\n${issue.data.body}`)
      .then(result => console.log('rocketchat.notified', result)).catch(error => console.error('rocketchat.notify.error', error))
    }



  }

  issue.txid = result.txid

  await issue.save()

  return [issue, isNew]

}

export async function syncAllIssuesToBlockchain() {

  const issuesNotOnBlockchain = await models.GithubIssue.findAll({
    where: {
      state: 'open',
      txid: {
        [Op.eq]: null
      }
    }
  })

  console.log("issuesNotOnBlockchain", issuesNotOnBlockchain.length)

  const results = []

  for (let issue of issuesNotOnBlockchain) {

    const [result, isNew] = await syncIssueToBlockchain(issue)

    if (isNew) {

      results.push(result)
    }

  }

  return results
}


export async function syncRepoIssuesToBlockchain({ org, repo }: any) {

  console.log('SYNCING ISSUES', { org, repo })

  console.log({
    where: {
      org,
      repo,
      state: 'open',
      txid: {
        [Op.eq]: null
      }
    }
  })

  const issuesNotOnBlockchain = await models.GithubIssue.findAll({
    where: {
      org,
      repo,
      state: 'open',
      txid: {
        [Op.eq]: null
      }
    }
  })

  console.log("issuesNotOnBlockchain", issuesNotOnBlockchain.length)

  const results = []

  for (let issue of issuesNotOnBlockchain) {

    const [record, isNew] = await syncIssueToBlockchain(issue)

    if (isNew) {

      console.log('posted to blockchain', issue)

      results.push(record)

    }

  }

  return results

}

import { request } from '@octokit/request';

import { join } from 'path'

import { readFileSync } from 'fs';

import { createAppAuth } from "@octokit/auth-app";
import { notify } from './rocketchat';

export async function syncAllReposToBlockchainForever({ org }: { org: string }) {

  while (true) {

    try { 

      const privateKey = readFileSync(join(__dirname, '..', 'powco-dev.2022-10-21.private-key.pem'));

      const auth = createAppAuth({
        appId: 251846,
        privateKey: privateKey.toString(),
        installationId: 31749918
      });
        
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

      for (let {name: repo} of shuffle(repos)) {

        const imported = await importRepoIssues({ org, repo })

        console.log(`imported ${imported.length} new issues for ${org}/${repo}`)

        await syncRepoIssuesToBlockchain({ org, repo })

        await delay(1000 * 60) // wait between each repo to avoid rate limits

      }

    } catch(error) {

      console.error('syncAllReposToBlockchainForever.error', error)

      await delay(1000 * 60) // wait between each repo to avoid rate limits

    }


  }

}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}