/* implements rabbi actor protocol */

require('dotenv').config();

import { Actor, Joi, log } from 'rabbi';

export async function start() {

  const actor = Actor.create({

    exchange: 'powco.dev',

    routingkey: 'github.webhook.created',

    queue: 'powco.dev.github.webhook.created'

  })

  console.log('actor.created', actor)

  actor.start(async (channel, msg, json) => {

    log.info(msg.content.toString());

    log.info(json);

    channel.ack(msg);

  })

  console.log('actor', actor)

}

if (require.main === module) {

  start();

}

