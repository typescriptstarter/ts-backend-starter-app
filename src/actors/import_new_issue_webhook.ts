
import { importIssue } from "../github"

export const exchange = 'powco.dev'

export const routingkey = 'github.webhook.created'

export const queue = routingkey

export default async function(channel, msg, json) {

    const { payload: { issue, action } } = json

    if (action === 'opened' && issue) {

        console.log('IMPORT NEW ISSUE', json)

        const [ org, repo ] = json.payload.repository.split('/')
        
        const {
            payload: {
                issue: { number: issue_id }
            }
        } = json

        const record = await importIssue({ org, repo, issue_id })

        console.log(record, '--importIssue--')

    }    
    
}