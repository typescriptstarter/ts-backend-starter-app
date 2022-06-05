
require('dotenv').config()

import { Server } from '@hapi/hapi'

import { HealthPlugin } from 'hapi-k8s-health'

import { log } from './log'

const Joi = require('joi')

import { join } from 'path'

const Inert = require('@hapi/inert');

const Vision = require('@hapi/vision');

const HapiSwagger = require('hapi-swagger');

const Pack = require('../package');

import { load } from './server/handlers'

const handlers = load(join(__dirname, './server/handlers'))

export const server = new Server({
  host: process.env.HOST || "0.0.0.0",
  port: process.env.PORT || 8000,
  routes: {
    cors: true,
    validate: {
      options: {
        stripUnknown: true
      }
    }
  }
});

server.route({
  method: 'GET',
  path: '/api/v0/status',
  handler: async (req, h) => {
    return h.response({ success: true }).code(200)
  },
  options: {
    description: 'Simply check to see that the server is online and responding',
    tags: ['api'],
    /*response: {
      failAction: 'log',
      schema: Joi.object({
        success: Joi.boolean()
      })
    }
    */
  }
})

const swaggerOptions = {
  info: {
    title: 'API Docs',
    version: Pack.version,
    description: 'Base Rabbi Service'
  },
  schemes: ['https'],
  host: 'https://rabbi.21e8.tech',
  documentationPath: '/',
  grouping: 'tags'
}

var started = false

export async function start() {

  if (started) return;

  started = true

  await server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOptions
      },
      {
        plugin: HealthPlugin
      }
  ]);

  await server.start();

  log.info(server.info)

}

if (require.main === module) {

  start()

}
