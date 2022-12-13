require('dotenv')

import { channel, log } from 'rabbi'

export const exchange = 'rabbi'

export const queue = 'post_powco_dev_github_webhook_onchain'

export const routingkey = 'dev.powco.github.webhook'

import { onchain } from 'stag-wallet'

import { Op } from 'sequelize'

import * as models from './src/models'

const axios = require('axios')

export default async function start() {

  const val = {
    web: 'hook'
  }

  const webhooks = await models.GithubWebhook.findAll({

    where: {

      tx_id: {

        [Op.eq]: null

      }

    },

    order: [["createdAt", "desc"]]

  })

  for (let webhook of webhooks) {

    if (!webhook.payload.issue) {
      continue;
    }

    if (!webhook.tx_id) {

      const { txid, txhex, txo } = await onchain.post({
        app: 'alpha.powco.dev',
        key: 'github.webhook',
        val: webhook.payload
      })

      log.info('rabbi.actor.stag.onchain.post.result', { txid, txhex, txo })

      webhook.tx_id = txid

      await webhook.save()

    }

    await axios.get(`https://onchain.sv/api/v1/events/${webhook.tx_id}`)

  }

}

if (require.main === module) {

  start()

}

