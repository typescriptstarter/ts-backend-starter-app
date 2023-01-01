require('dotenv').config()

import * as models from './src/models'

import { Op } from 'sequelize'

export async function main() {

    try {

        const webhooks = await models.GithubWebhook.findAll({})

        for (let webhook of webhooks) {

            if (webhook.payload.issue && webhook.payload.action === 'closed') {

                console.log({
                    url: webhook.payload.issue.url,
                    assignee: webhook.payload.issue.assignee,
                    assignees: webhook.payload.issue.assignees
                })

            }

        }

    } catch(error) {
            
            console.error(error)
    

    }   

}

main()
