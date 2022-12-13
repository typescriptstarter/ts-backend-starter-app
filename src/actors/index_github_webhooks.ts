/* implements rabbi actor protocol */

require('dotenv').config();

import { Actor, Joi, log } from 'rabbi';  

export const exchange = 'powco.dev'

export const routingkey = 'github.webhook.created'

export const queue = 'powco.dev.github.webhook.created'

export default async function start(channel, msg, json) {

  log.info(msg.content.toString());

  log.info(json);

  channel.ack(msg);

}
