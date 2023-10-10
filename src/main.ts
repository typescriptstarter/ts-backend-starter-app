
import config from './config'

import { start as server } from './server'

import exampleActor from './actors/example'

export async function start() {

  if (config.get('http_api_enabled')) {

    server();

  }

  if (config.get('amqp_enabled')) {

    exampleActor();

  }

}

if (require.main === module) {

  start()

}
