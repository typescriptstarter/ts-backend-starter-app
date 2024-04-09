import { Request, ResponseToolkit } from "@hapi/hapi";

interface Handlers {
  [key: string]: {
    [key: string]: (request: Request, h: ResponseToolkit) => any
  }
}

import * as Status from './handlers/status' 

const handlers: Handlers = {
  Status
}

export { handlers }
