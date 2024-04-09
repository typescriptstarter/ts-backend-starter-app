
import { Actor } from 'rabbi'

import { Channel, Message } from 'amqplib'

export default async function start(): Promise<Actor> {

  const actor = Actor.create({
    exchange: 'example_exchange',
    routingkey: 'example_routingkey',
    queue: 'example_queue'
  })

  actor.start(async (channel: Channel, msg: Message, json: any) => {
    
	  console.log(json)
  })

  return actor
  
}

if (require.main === module) {

  start();
}
