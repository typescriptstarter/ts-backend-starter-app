
import config from '../config'

import * as rabbi from 'rabbi'

import { log } from '../log'

const requireAll = require('require-all')

function loadModules(directory: string) {

  var tsModules: any = requireAll({
    directory,
    filter      :  /(.+)\.ts$/,
  });

  var jsModules: any = requireAll({
    directory,
    filter      :  /(.+)\.js$/,
  });

  return Object.assign(tsModules, jsModules)

}

interface ActorParams {
  name: string;
  queue: string;
  routingkey: string;
  exchange: string;
  start: Function;
}

class Actor {
  name: string;
  queue: string;
  routingkey: string;
  exchange: string;
  start: Function;

  constructor(params: ActorParams) {
    this.name = params.name
    this.queue = params.queue
    this.routingkey = params.routingkey
    this.exchange = params.exchange
    this.start = params.start
  }

  toJSON() {
    return {
      name: this.name,
      queue: this.queue,
      routingkey: this.routingkey,
      exchange: this.exchange
    }
  }
}

export async function start(directory?: string): Promise<rabbi.Actor[]> {

  log.info('rabbi.actors.start')

  if (!directory) {

    directory = `${__dirname}/../actors`
  }

  const modules = loadModules(directory)

  const actors: rabbi.Actor[] = Object.keys(modules).map(name => {

    let actor = new Actor({
      name: modules[name],
      queue: modules[name].queue || name,
      routingkey: modules[name].routingkey  || name,
      exchange: modules[name].exchange || config.get("amqp_exchange"),
      start: modules[name].start || modules[name].default
    })

    return rabbi.Actor.create({
      exchange: actor.exchange,
      routingkey: actor.routingkey,
      queue: actor.queue,
      connection: rabbi.connection,
      channel: rabbi.channel
    })

  })

  for (let actor of actors) {

    log.info('rabbi.actor.start', actor.toJSON())

    actor.start(actor.start)

  }

  return actors

}
