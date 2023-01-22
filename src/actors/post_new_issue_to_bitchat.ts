
export const exchange = 'powco.dev'

export const routingkey = 'github.issue.created'

export const queue = 'powco.dev.github.bot.issue.created.bitchat.post'

import { bitchat, loadWallet } from 'stag-wallet'

import { log } from '../log'

export default async function start(channel, msg, json) {

    console.log('NEW ISSUE CREATED -- POST TO BITCHAT', json)

    // TODO: Post a comment with the issue's RUN Address

    const wallet = await loadWallet()

    const actor = new bitchat.Actor({
        wallet
    })

    const message = `${json.data.user.login} created a new github issue ${json.data.html_url}\n\n${json.data.title}\n\n${json.data.body || ''}`

    const paymail = 'powcodev@relayx.io'

    const result = await actor.post({
        message, paymail, channel: 'powco.dev'
    })

    log.info('bitchat.post.result', result)

    const result2 = await actor.post({
        message, paymail, channel: 'powco-development'
    })

    log.info('bitchat.post.result2', result2)

}