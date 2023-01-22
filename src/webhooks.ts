
import { importIssue, importRepoIssues, syncRepoIssuesToBlockchain } from './github'
import { log } from './log';
import models from './models';
import { publish } from 'rabbi'

export async function handleWebhook(payload: any): Promise<any> {

    try {

        const webhook = await models.GithubWebhook.create({ payload });

        log.info('github.webhook.created', { payload })

        publish('powco.dev', 'github.webhook.created', webhook.toJSON())

        log.info(`github.webhook.action.${payload.action}`)

        publish('powco.dev', `github.webhook.action.${payload.action}`, webhook.toJSON())

        if (payload.action === "opened" && !!payload.issue && !!payload.repository) {

            console.log(payload, '--payload')

            const {
                repository: {
                    owner: { login: org },
                    name: repo
                },
                issue: { number: issue_id }
            } = payload

            console.log({ org, repo, issue_id })

            const record = await importIssue({ org, repo, issue_id })

            console.log(record, '--importIssue--')

        }

        return webhook

    } catch(error) {

        console.error('error handling webhook', error)
    }

}