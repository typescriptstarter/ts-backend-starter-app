
require('dotenv').config()

export const exchange = 'powco.dev'

export const routingkey = 'github.issue.created'

export const queue = 'powco.dev.github.issue.created.comment.post'

import { commentOnNewIssue } from "../comment"

export default async function start(channel, msg, json) {

    console.log('NEW ISSUE CREATED -- POST BOT COMMENT RUN RUN BOUNTY ADDRESS', json)

    const result = await commentOnNewIssue({
        owner: json.org,
        repo: json.repo,
        issue_number: json.data.number,
    })

    console.log('github.issue.comment.post', {result})

}