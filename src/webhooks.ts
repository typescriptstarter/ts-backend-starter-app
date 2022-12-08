
import { importRepoIssues, syncRepoIssuesToBlockchain } from './github'

export async function handleWebhook(webhook: any) {

    try {

        if (webhook.action === "created" && !!webhook.issue && !!webhook.repository) {

            const [ org, repo ] = webhook.repository.split('/')

            await importRepoIssues({ org, repo })

            await syncRepoIssuesToBlockchain({ org, repo })

        }

    } catch(error) {

        console.error('error handling webhook', error)
    }

}