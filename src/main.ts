
import config from './config'

import { start as server } from './server'

import exampleActor from './actors/example'

export async function start() {

  if (config.get('HTTP_API_ENABLED')) {

    server();

  }

  if (config.get('AMQP_ENABLED')) {

    exampleActor();

  }

}

if (require.main === module) {

  start()

}
