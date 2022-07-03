
import { channel, log } from 'rabbi'

import { loadFromFiles } from '../config'

export default async function(channel, msg, json) {

  log.info('rabbi.actor.exit_pricess', {
    message: msg.content.toString(),
    json
  })

  process.exit()
  
  channel.ack(msg)
}

