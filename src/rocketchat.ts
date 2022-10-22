
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

const http = require("superagent");

const base = 'https://chat.21e8.tech/hooks';

const channels = {
  'powco-development': config.get('rocketchat_channel')
}

export function notify(channel, message: string) {

  if (!channels[channel]) {
    log.info(`rocketchat channel ${channel} not found`);
    channel = 'misc';
  }

  log.info(`notify slack ${message}`);

  http
    .post(`${base}/${channels[channel]}`)
    .send({
      text: message
    })
    .end((error, response) => {
      if (error) {
        console.log('error', error)
        log.error("rocketchat.error", error.message);
      } else {
        log.info("rocketchat.notified", response.body);
      }
    });
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
