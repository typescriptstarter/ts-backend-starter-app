
import { log } from '../../log'

import * as models from '../../models'

export async function create(req, h) {

  const { payload } = req

  log.info('api.github.webhook.create', { payload })

  try {

    await models.GithubWebhook.create({ payload })

    log.info('github.webhook.created', { payload })

  } catch(error) {

    log.error('github.webhook.create.error', error)

  }

  return { success: true }

}
