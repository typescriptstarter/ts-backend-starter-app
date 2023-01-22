
export const exchange = 'powco.dev'

export const routingkey = 'github.issue.created'

export const queue = 'powco.dev.github.bot.issue.created.comment.post'

export default async function start(channel, msg, json) {

    if (json.issue) {

        console.log('NEW ISSUE CREATED -- POST BOT COMMENT RUN RUN BOUNTY ADDRESS', json)

        // TODO: Post a comment with the issue's RUN Address

    }

}