
import { log } from '../../log'

import * as models from '../../models'

import * as Boom from 'boom'

import { notifyIssueOpened } from '../../rocketchat'

import { onchain } from 'stag-wallet'

import { handleWebhook } from '../../webhooks'

import { publish } from 'rabbi'

const axios = require('axios')

async function onWebhookCreate(payload)  {

  if (payload.event === 'opened' && payload.issue) {

    await notifyIssueOpened(payload)

  }

}

export async function create(req, h) {

  const { payload } = req

  log.info('api.github.webhook.create', { payload })

  try {

    const webhook = await models.GithubWebhook.create({ payload });

    publish('powco.dev', 'github.webhook.created', webhook.toJSON())

    handleWebhook(payload)

    /*(async () => {

      if (!webhook.payload.issue) {
        return
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

    })()*/

    log.info('github.webhook.created', { payload })

  } catch(error) {

    log.error('github.webhook.create.error', error)

  }

  return { success: true }

}

export async function index(req, h) {

  const { query } = req

  log.info('api.github.webhook.index', { query })

  const limit = query.limit || 100

  const offset = query.offset || 0

  const order = query.order || 'desc'

  try {

    let webhooks = await models.GithubWebhook.findAll({

      limit,

      offset,

      order: [['createdAt', order]]

    })

    log.info('api.github.webhooks.index.success', { query, limit, order, offset })

    return { limit, offset, order, webhooks }

  } catch(error) {

    log.error('github.webhook.create.error', error)

    return Boom.badRequest(error)

  }


}
