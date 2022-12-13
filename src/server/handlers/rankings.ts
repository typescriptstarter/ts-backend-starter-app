
import { rankContent } from "../../rankings"

import { badRequest } from 'boom'

import { log } from '../../log'

import moment from 'moment'
import models, { sequelize } from "../../models"
import { Op } from "sequelize"

export async function show(req, h) {

    const where = {}

    const issuesWhere = {
      state: 'open'
    }

    if (req.params.org) {
        issuesWhere['org'] = req.params.org
    }

    if (req.params.repo) {
        issuesWhere['repo'] = req.params.repo
    }
  
    const query = {
      timestamp: {}
    }

    if (req.query.state) {

        issuesWhere['state'] = req.query.state

    }

    if (req.query.start_timestamp) {

        console.log('START TIMESTAMP', req.query.start_timestamp)
  
      where['timestamp'] = {
        [Op.gte]: new Date(parseInt(req.query.start_timestamp))
      }
  
      query['timestamp']['>='] = new Date(parseInt(req.query.start_timestamp))
  
    }
  
    if (req.query.end_timestamp) {
  
      where['timestamp'] = {
        [Op.lte]: new Date(parseInt(req.query.end_timestamp))
      }
  
      query['timestamp']['<='] = new Date(parseInt(req.query.end_timestamp))
  
    }

    try {

        var issues = await models.GithubIssue.findAll({

            where: issuesWhere,
      
            include: [{
                model: models.BoostPowProof,
                as: 'boostpow_proofs',
                where,
                required: false
            }]
      
        })

        issues = issues.map(record => {

            console.log(record)

            const difficulty = record.boostpow_proofs.reduce((sum, proof) => sum + proof.difficulty, 0)

            const json = record.toJSON() 
            delete json.boostpow_proofs

            return Object.assign(record.toJSON(), {
                difficulty,
                title: record.data.title,
                state: record.state,
                txid: record.txid
            })
        })
        .sort((a, b) => a.difficulty < b.difficulty ? 1 : -1)

      return {
  
        issues
  
      }
  
    } catch(error) {
  
      log.error('http.api.handlers.questions.index.error', error)
  
      console.error('http.api.handlers.questions.index.error', error)
  
      return badRequest(error)
  
    }
  
  }
