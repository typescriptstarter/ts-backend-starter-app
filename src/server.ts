
require('dotenv').config()

import config from './config'

import { Server, Request, ResponseToolkit } from '@hapi/hapi'

import { log } from './log'

import { join } from 'path'

const Joi = require('joi')

const Pack = require('../package');

import { handlers } from './server/handlers'

import { z } from 'zod'

const zodValidator: any = {
  compile: (schema: any) => ({
      validate: (val: any) => schema.parse(val)
  })
};

export const server = new Server({
  host: config.get('HTTP_HOST'),
  port: config.get('HTTP_PORT'),
  routes: {
    cors: true,
    validate: {
      options: {
        stripUnknown: true
      }
    }
  }
});

server.validator(zodValidator)

const { createPlugin: promsterPlugin } = require('@promster/hapi');

if (config.get('PROMETHEUS_ENABLED')) {

  server.register(promsterPlugin())

  log.info('server.metrics.prometheus', { path: '/metrics' })

  const { register: prometheus } = require('./metrics')

  server.route({
    method: 'GET',
    path: '/metrics',
    handler: async (req: Request, h: ResponseToolkit) => {
      return h.response(await prometheus.metrics())
    },
    options: {
      description: 'Prometheus Metrics about Node.js Process & Business-Level Metrics',
      tags: ['system']
    }
  })

}

server.route({
  method: 'GET', path: '/api/v0/status',
  handler: handlers.Status.index,
  options: {
    description: 'Simply check to see that the server is online and responding',
    tags: ['api', 'system'],
    response: {
      failAction: 'log',
      schema: Joi.object({
        status: Joi.string().valid('OK', 'ERROR').required(),
        error: Joi.string().optional()
      }).label('ServerStatus')
    }
  }
})

var started = false

export async function start() {

  if (started) return;

  started = true

  if (config.get('SWAGGER_ENABLED')) {

	console.log('SWAGGER')

    const swaggerOptions = {
      info: {
        title: `${Pack.name} API Docs`,
        version: Pack.version,
        description: Pack.description
      },
      schemes: ['http', 'https'],
      host: 'localhost:5200',
      documentationPath: '/api',
      grouping: 'tags'
    }

    const Inert = require('@hapi/inert');

    const Vision = require('@hapi/vision');

    const HapiSwagger = require('hapi-swagger');

    await server.register([
        Inert,
        Vision,
        {
          plugin: HapiSwagger,
          options: swaggerOptions
        }
    ]);

    log.info('server.api.documentation.swagger', swaggerOptions)
  }

  await server.start();

  log.info(server.info)

  return server;

}

if (require.main === module) {

  start()

}
