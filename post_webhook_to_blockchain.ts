require('dotenv')

import { channel, log } from 'rabbi'

import { loadFromFiles } from './src/config'

export const exchange = 'rabbi'

export const queue = 'post_powco_dev_github_webhook_onchain'

export const routingkey = 'dev.powco.github.webhook'

import { fetch } from 'powco'

import { loadWallet } from 'stag-wallet'

import { onchain } from 'stag-wallet'

export default async function start() {

  const { txid, txhex, txo } = await onchain.post({
    app: 'alpha.powco.dev',
    key: 'github.webhook',
    val: {
      web: 'hook'
    }
  })

  log.info('rabbi.actor.stag.onchain.post.result', { txid, txhex, txo })

}

start()

