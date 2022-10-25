require('dotenv')

import { channel, log } from 'rabbi'

import { loadFromFiles } from './src/config'

export const exchange = 'rabbi'

export const queue = 'post_powco_dev_github_webhook_onchain'

export const routingkey = 'dev.powco.github.webhook'

import { fetch } from 'powco'

import { loadWallet } from 'stag-wallet'

import { onchain } from './src/onchain'

import { Op } from 'sequelize'

import * as models from './src/models'

export default async function start() {

  const val = {
    web: 'hook'
  }

  const wallet = await loadWallet()

  const webhooks = await models.GithubWebhook.findAll({

    where: {

      tx_id: {

        [Op.eq]: null

      }

    },

    order: [["createdAt", "desc"]]

  })

  for (let webhook of webhooks) {

    console.log(webhook.toJSON())

    if (!webhook.tx_id) {

      const { txid, txhex, txo } = await onchain(wallet).post({
        app: 'alpha.powco.dev',
        key: 'github.webhook',
        val
      })

      log.info('rabbi.actor.stag.onchain.post.result', { txid, txhex, txo })

      webhook.tx_id = txid

      await webhook.save()

    }

  }

  process.exit(0)

}

start()

