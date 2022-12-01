

import { log } from '../../log'

import models from '../../models'

export async function callback(req, h) {

  const { query } = req

  const { code, installation_id, setup_action } = query

  const record = await models.GithubAuth.create({
    code, installation_id, setup_action, query
  })

  log.info('github.auth.callback', { query, record: record.toJSON() })

  //return h.response({ success: true }).code(200)

  return h.redirect('/')

}

