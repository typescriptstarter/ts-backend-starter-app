#!/usr/bin/env ts-node

const { version } = require('../../package')

import { program } from 'commander'

import { start as server } from '../server'

import { start as actors } from '../rabbi/actors'

import { start as main } from '../main'

program
  .version(version)

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

program.parse(process.argv)
