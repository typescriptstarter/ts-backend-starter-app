
import { log } from '../../log'

export async function create(req, h) {

  log.info('api.github.webhooks.create', {
    payload: req.payload,
    query: req.query
  })

  return { success: true }

}
