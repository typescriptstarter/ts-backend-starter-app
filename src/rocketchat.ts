
import { log } from './log'

import config from './config'

interface IssueWebhook {
  action: "opened";
  issue: {
    url: string;
    title: string;
    user: {
      login: string;
      gravatar_url: string;
    }
  };
  repository: {
    full_name: string;
  }
}

const base = 'https://chat.21e8.tech/hooks';

import axios from 'axios'

const channels = {
  'powco-development': config.get('rocketchat_channel')
}

export async function notify(channel, message: string) {

  if (!channels[channel]) {
    log.info(`rocketchat channel ${channel} not found`);
    channel = 'misc';
  }

  log.info(`notify slack ${message}`);

  const { data } = await axios.post(`${base}/${channels[channel]}`, {
    text: message
  })

  return data

}

export async function notifyIssueOpened(webhook: any) {

  try {

    if (webhook.action === 'opened') {

      const message = `${webhook.issue.user.login} opened an issue on ${webhook.repository.full_name}:\n\n"${webhook.issue.title}"\n\n${webhook.issue.url}`

      console.log(message)

      await notify('powco-development', message)

      log.info('github.issue.opened.notified', {message})

    }

  } catch(error) {

    log.info('github.issue.opened.error', error)

  }

}
