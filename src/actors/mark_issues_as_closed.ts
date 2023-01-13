
import { publish } from 'rabbi'

import * as models from '../models'


export const exchange = 'powco.dev'

export const routingkey = 'github.webhook.created'

export const queue = 'powco_dev_mark_issues_closed'

export default async function(channel, msg, json) {

    const { action, pull_request, issue, repository, organization } = json.payload

    if (action === 'closed' && !pull_request && issue) {

      const repo = repository.name
      const org = organization.login

      const issue_id = issue.id

      console.log('findIssue', { org, repo, issue_id })

      const record = await models.GithubIssue.findOne({
        where: {
          repo,
          org,
          issue_id,
          state: 'open'
        }
      })

      if (record) {

        console.log(record.toJSON())

        record.state = 'closed'

        await record.save()

        publish('powco.dev', 'github.issue.closed', record.toJSON())

      }

    }

}
