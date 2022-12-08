
import { log } from '../../log'

import { listIssues } from '../../github'

import * as Boom from 'boom'

export async function index(req, h) {

  const { params } = req

  log.info('api.github.issues.list', { params })

  try {

    const issues = await listIssues({ org: 'pow-co', repo: 'powco-dev' })

    return issues

  } catch(error) {

    log.error('github.issues.list', error)

    return Boom.badRequest(error)

  }

}

export async function repo(req, h) {

  const { params } = req

  log.info('api.github.issues.repo', { params })

  try {

    const issues = await listIssues(params)

    return issues

  } catch(error) {

    log.error('github.issues.list', error)

    return Boom.badRequest(error)

  }

}

