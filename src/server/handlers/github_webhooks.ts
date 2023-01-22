
import { log } from '../../log'

import * as models from '../../models'

import * as Boom from 'boom'

import { notifyIssueOpened } from '../../rocketchat'

import { onchain } from 'stag-wallet'

import { handleWebhook } from '../../webhooks'

import { publish } from 'rabbi'
import { createLogger } from 'winston'

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


    const webhook = await handleWebhook(payload)

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
