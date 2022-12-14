
import config from './config'

import { start as server } from './server'

export async function start() {

  if (config.get('http_api_enabled')) {

    server();

  }

}

if (require.main === module) {

  start()

}
