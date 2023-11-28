
import { server, start } from '../src/server'

import { expect } from './utils'

describe('Scraping Prometheus Metrics', () => {

  before(async () => {

    await start()

  })

  it('GET /metrics should provide the metrics', async () => {

    const response = await server.inject({
      method: 'GET',
      url: '/metrics'
    })

    expect(response.statusCode).to.be.equal(200)

  })

})
