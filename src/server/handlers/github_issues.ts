
import { log } from '../../log'

import { listIssues } from '../../github'

import * as Boom from 'boom'

export async function index(req, h) {

  const { params } = req

  log.info('api.github.issues.list', { params })

  try {

    const issues = await listIssues()

    return issues

  } catch(error) {

    log.error('github.issues.list', error)

    return Boom.badRequest(error)

  }

}

