import { notify } from "../rocketchat"

export const exchange = 'powco.dev'

export const routingkey = 'github.issue.created'

export const queue = 'powco.dev.github.issue.created.rocketchat.post'

export default async function start(channel, msg, json) {

    console.log('NEW ISSUE CREATED -- POST BOT COMMENT TO ROCKETCHAT', json)

    // TODO: Post a comment with the issue's RUN Address

    if (!json.data.user.login.match('dependabot') && process.env.NODE_ENV === 'production') {

        const result = await notify('powco-development', `${json.data.user.login} created a new github issue for ${json.data.html_url}\n\n${json.data.title}\n\n${json.data.body}`)

        console.log('rocketchat.notified', result)
    }

}