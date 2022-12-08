
import { log } from '../../log'

import { listIssues } from '../../github'

import * as Boom from 'boom'

import models from '../../models'

export async function index(req, h) {

  const { params, query } = req

  log.info('api.github.issues.list', { params })

  try {

    const where = {...params, ...query}

    console.log({ where })

    const issues = await models.GithubIssue.findAll({
      where
    })

    return { issues }

  } catch(error) {

    log.error('github.issues.list', error)

    return Boom.badRequest(error)

  }

}

export async function repo(req, h) {

  const { params, query } = req

  log.info('api.github.issues.repo', { params })

  try {

    const where = {...params, ...query}

    console.log({ where })

    const issues = await models.GithubIssue.findAll({
      where
    })

    return { issues }
    
  } catch(error) {

    log.error('github.issues.list', error)

    return Boom.badRequest(error)

  }

}

