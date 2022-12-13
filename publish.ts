
import { publish } from 'rabbi'
import * as models from './src/models'

export async function main() {

    const records = await models.GithubWebhook.findAll({
        
    })

    for (let record of records) {

        console.log('published', record.toJSON())

        publish('powco.dev', 'github.webhook.created', record.toJSON())

    }


}

main()