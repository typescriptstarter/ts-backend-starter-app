
const action = 'new_permissions_accepted'

export const exchange = 'powco.dev'

export const routingkey = 'github.webhook.action.new_permissions_accepted'

export const queue = routingkey

export default async function start(channel, msg, json) {

    console.log('NEW PERMISSIONS ACCEPTED', json)
    
}