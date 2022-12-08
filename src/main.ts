
import config from './config'

import { start as server } from './server'

import { start as actors } from './rabbi/actors'

import postAllWebhooksToBlockchain from '../post_all_webhooks_to_blockchain'

import { syncAllIssuesToBlockchain, syncAllReposToBlockchainForever } from './github'

import delay from 'delay'

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


  (async () => {

    while (true) {

      try {

        console.log('syncing new issues to blockchain')

        const results = await syncAllIssuesToBlockchain()

        for (let item of results) {
  
          console.log('issue.synced', item)
        }

      } catch(error) {

        console.error('error syncing issues to blockchain', error)

      }

      await delay(5200)
    }

  })();

  syncAllReposToBlockchainForever({ org: 'pow-co' })

}

if (require.main === module) {

  start()

}
