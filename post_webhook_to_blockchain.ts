require('dotenv')

import { channel, log } from 'rabbi'

import { loadFromFiles } from './src/config'

export const exchange = 'rabbi'

export const queue = 'post_powco_dev_github_webhook_onchain'

export const routingkey = 'dev.powco.github.webhook'

import { fetch } from 'powco'

import { loadWallet } from 'stag-wallet'

import { onchain } from './src/onchain'

export default async function start() {

  const val = {
    web: 'hook'
  }

  const wallet = await loadWallet()

  const { txid, txhex, txo } = await onchain(wallet).post({
    app: 'alpha.powco.dev',
    key: 'github.webhook',
    val
  })

  log.info('rabbi.actor.stag.onchain.post.result', { txid, txhex, txo })

}

start()

