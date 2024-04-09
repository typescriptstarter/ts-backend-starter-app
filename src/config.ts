
import { config } from 'dotenv'

config()

import * as nconf from 'nconf'

nconf.argv({
  parseValues: true
})

nconf.env({
  parseValues: true
})

nconf.defaults({
  LOG_LEVEL: 'info',
  HTTP_HOST: '0.0.0.0',
  HTTP_PORT: 5200,
  WEBSOCKET_HOST: '0.0.0.0',
  WEBSOCKET_PORT: 5202,
  PROMETHEUS_ENABLED: true,
  HTTP_API_ENABLED: true,
  SWAGGER_ENABLED: true,
  POSTGRES_ENABLED: false,
  AMQP_ENABLED: process.env.AMQP_URL ? true : false,
  LOKI_ENABLED: false
})

export default nconf
