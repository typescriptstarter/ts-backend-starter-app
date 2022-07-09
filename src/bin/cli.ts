#!/usr/bin/env ts-node

const { version } = require('../../package')

import { program } from 'commander'

import { start as server } from '../server'

import { start as actors } from '../rabbi/actors'

import { start as main } from '../main'

import * as circleci from '../rabbi/circleci'

program
  .version(version)
  .option('--config <path>')
  .option('--host <ipaddress>')
  .option('--port <integer>')
  .option('--prometheus_enabled <boolean>')
  .option('--amqp_enabled <boolean>')
  .option('--http_api_enabled <boolean>')
  .option('--swagger_enabled <boolean>')
  .option('--postgres_enabled <boolean>')
  .option('--database_url <connection_string>')
  .option('--amqp_url <connection_string>')
  .option('--amqp_exchange <name>')
  .option('--amqp_enabled <boolean>')

program
  .command('echo <statement>')
  .action((statement) => {

    console.log({ statement })

    process.exit(0)

  })

program
  .command('start')
  .action(() => {

    main()

  })

program
  .command('server')
  .action(() => {

    server()

  })

program
  .command('actors')
  .action(() => {

    actors()

  })
program
  .command('circleci_getproject')
  .action(async () => {

    try {

      let project = await circleci.getProject()

      console.log(project)

    } catch(error) {

      console.error(error)
    }

  })

program
  .command('circleci_getenv <name>')
  .action(async (name) => {

    try {

      let env = await circleci.getEnv({ name })

      console.log(env)

    } catch(error) {

      console.error(error)
    }

  })

program
  .command('circleci_setenv <name> <value>')
  .action(async (name, value) => {

    try {

      let env = await circleci.setEnv({ name, value })

      console.log(env)

    } catch(error) {

      console.error(error)
    }

  })

program
  .command('circleci_listenv')
  .action(async () => {

    try {

      let env = await circleci.listEnv()

      console.log(env)

    } catch(error) {

      console.error(error)
    }

  })

program
  .command('circleci_listpipelines')
  .action(async () => {

    try {

      let result = await circleci.listPipelines()

      console.log(result)

    } catch(error) {

      console.error(error)
    }

  })

program
  .command('circleci_set_env_from_config')
  .action(async () => {

    try {

      let result = await circleci.setEnvFromConfig()

      console.log(result)

    } catch(error) {

      console.error(error)
    }

  })

program.parse(process.argv)
