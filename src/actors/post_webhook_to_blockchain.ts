
import { channel, log } from 'rabbi'

import { loadFromFiles } from '../config'

export const exchange = 'rabbi'

export const queue = 'post_powco_dev_github_webhook_onchain'

export const routingkey = 'dev.powco.github.webhook'

import { fetch } from 'powco'

import { loadWallet } from 'stag-wallet'

import { onchain } from '../onchain'

export default async function start(channel, msg, val) {

  log.info('rabbi.actor.post_webhook_to_blockchain', {
    message: msg.content.toString(),
    val
  })

  const wallet = await loadWallet()

  const { txid, txhex, tx } = await onchain(wallet).post({
    app: 'powco.dev',
    key: 'github.webhook',
    val
  })

  log.info('rabbi.actor.stag.onchain.post.result', { txid, txhex })

  channel.ack(msg)
}

