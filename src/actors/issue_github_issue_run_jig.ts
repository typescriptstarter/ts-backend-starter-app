/* implements rabbi actor protocol */

require('dotenv').config();

import { log, publish } from 'rabbi';  

import * as models from '../models'

export const exchange = 'powco.dev'

export const routingkey = 'github.issue.created'

export const queue = 'powcodev_issue_github_issue_run_jig'

import { HDPrivateKey } from 'bsv';

const hdPrivateKey = new HDPrivateKey(process.env.github_issues_root_private_key)

export default async function start(channel, msg, json) {

  log.info(msg.content.toString());

  log.info(json);

  const record = await models.GithubIssue.findOne({
    where: {
        id: json.id
    }
  })

  if (!record) return

  if (!record.run_owner) {

    const privateKey = hdPrivateKey.deriveChild(record.id).privateKey

    record.run_owner = privateKey.toAddress().toString()

    await record.save()

    publish('powco.dev', 'github.issue.run_owner.added', record.toJSON())

    log.info('github.issue.run_owner.added', record.toJSON())

  }

}
