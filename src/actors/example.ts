
import { Actor } from 'rabbi'

export default async function start(): Promise<Actor> {

  const actor = Actor.create({
    exchange: 'rabbi',
    routingkey: 'example_routingkey',
    queue: 'example_queue'
  })

  actor.start(async (channel, msg, json) => {
    
	  console.log(json)
  })

  return actor
  
}

if (require.main === module) {

  start();
}
