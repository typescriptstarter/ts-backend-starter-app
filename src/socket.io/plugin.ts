require('dotenv').config()

const socketio = require('socket.io')

import { Server } from '@hapi/hapi'

import { log } from '../log'

import { publish } from 'rabbi'

import * as uuid from 'uuid'

export const plugin = (() => {

  return {

    name: 'socket.io',

    register: function(server: Server) {

      const path = '/v1/socketio'

      //const io = socketio(server.listener, { path })
      const io = socketio(server.listener)

      log.info('socket.io.started', { path })

      io.use(async (socket, next) => {

        socket.data.sessionId = uuid.v4()

        log.info('websocket.authenticate', socket.data.sessionId)

        // authenticate here

        next()

      })

      io.on('connection', async function(socket) {

        const { address } = socket.handshake

        log.info('socket.io.connection', { address })

        socket.on('disconnect', () => {

          log.info('socket.io.disconnect', socket.info)

        })

        socket.on('my-event', async (message) => {

          log.info('my-event', message)

          publish('rabbi', 'websockets.my-event', message)

        })

      })

    }

  }

})()


