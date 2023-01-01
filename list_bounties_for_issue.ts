#!/usr/bin/env ts-node

require('dotenv').config()

import { listTokenBalances } from './src/relayx'

import { Script } from 'bsv'

import * as models from './src/models'

import { run } from './src/run'

export async function main() {

  const issue_id = parseInt(process.argv[2])

  const record = await models.GithubIssue.findOne({ where: {id: issue_id } })

  const address = record.run_owner

  const tokens = await listTokenBalances(record.run_owner)

  console.log({tokens})

  const script = Script.fromAddress(address).toHex()
  const utxos = await run.blockchain.utxos(script)

  console.log({ utxos })

  run.trust('*')

  const unspent = await Promise.all(utxos.map(async (utxo) => {

    const location = `${utxo.txid}_o${utxo.vout}`
    
    try {

        const jig = await run.load(location)

        console.log({jig})

        if (jig) {

            return { utxo, jig, type: 'jig' }
        }
         
    } catch(error) {    

        return { utxo, type: 'satoshis' }

    }
    
  }))

  for (let output of unspent) {

    console.log(output)
    
  }

  // list unspent outputs

  // determine which are satoshis and which are run tokens

}

main()

