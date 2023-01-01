#!/usr/bin/env ts-node

require('dotenv').config()

const yargs = require('yargs/yargs')

const { hideBin } = require('yargs/helpers')

import * as models from '../models'

async function main() {

  const argv = yargs(hideBin(process.argv)).argv

  const { org, repo, issue_id } = argv

  if (!org || !repo || !issue_id) {
    console.error(`--org --repo and --issue_id options are required`)
  }

  let issue = await models.GithubIssue.findOne({

    where: {
      org,
      repo,
      issue_id
    }

  })

  if (!issue) {

    console.log('issue not found', { org, repo, issue_id })

    return

  }

  console.log(issue.toJSON())

}

main()

