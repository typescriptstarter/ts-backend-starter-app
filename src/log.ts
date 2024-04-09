
import config from './config'

import { createLogger, format, transports } from 'winston'

const level = config.get('log_level')

const log = createLogger({
  level,
  format: format.json(),
  defaultMeta: { service: '' },
  transports: [
    new transports.Console(),
  ],
});

export { log }
