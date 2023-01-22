
export const exchange = 'powco.dev'

export const routingkey = 'github.webhook.action.created'

export const queue = 'powco.dev.github.bot.issue.created.bitchat.post'

export default async function start(channel, msg, json) {

    if (json.issue) {

        console.log('NEW ISSUE CREATED', json)

        // TODO: Post a comment with the issue's RUN Address

    }

}