
import config from './config'

import { start as server } from './server'

import { start as actors } from './rabbi/actors'

import postAllWebhooksToBlockchain from '../post_all_webhooks_to_blockchain'

var cron = require('node-cron');

export async function start() {

  if (config.get('http_api_enabled')) {

    server();

  }

  if (config.get('amqp_enabled')) {

    actors();

  }

  cron.schedule('* * * * *', async () => { // every minute

    await postAllWebhooksToBlockchain() 

  });

}

if (require.main === module) {

  start()

}
