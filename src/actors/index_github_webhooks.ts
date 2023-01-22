/* implements rabbi actor protocol */

require('dotenv').config();

import { Actor, Joi, log, publish } from 'rabbi';  

export const exchange = 'powco.dev'

export const routingkey = 'github.webhook.created'

export const queue = 'powco.dev.github.webhook.created'

export default async function start(channel, msg, json) {

  const action = json.payload.action

  await publish('powco.dev', `github.webhook.action.${action}`, json)

  log.info(msg.content.toString());

  log.info(json);

}
