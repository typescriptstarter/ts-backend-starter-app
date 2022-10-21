
import { log } from '../../log'

export async function callback(req, h) {

  const { query } = req

  const { code, installation_id, setup_action } = query

  log.info('github.auth.callback', query)

  return h.response({ success: true }).code(200)

}

