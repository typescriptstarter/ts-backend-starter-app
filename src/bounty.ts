
import { listTokenBalances } from './relayx'

import { Script } from 'bsv'

import * as models from './models'

import { run } from './run'

import { Transaction, HDPrivateKey } from 'bsv'

import { broadcast } from 'powco'

export async function claimBounty({ org, repo, number, destination }): Promise<string | null> { //txid

    const hdPrivateKey = new HDPrivateKey(process.env.github_issues_root_private_key)
  
    const record = await models.GithubIssue.findOne({
        where: {
            org,
            repo,
            data: {
                number
            }

        }
    })
  
    if (!record) return null
  
    //@ts-ignore
    const privateKey = hdPrivateKey.deriveChild(record.id).privateKey
  
    const address = record.run_owner
  
    const tokens = await listTokenBalances(record.run_owner)
    
    const script = Script.fromAddress(address).toHex()

    const utxos = await run.blockchain.utxos(script)
    
    run.trust('*')
  
    const unspent = await Promise.all(utxos.map(async (utxo) => {
  
      const location = `${utxo.txid}_o${utxo.vout}`
      
      try {
  
          const jig = await run.load(location)
    
          if (jig) {
  
              return { utxo, jig, type: 'jig' }
          }
           
      } catch(error) {    
  
          return { utxo, type: 'satoshis' }
  
      }
      
    }))

    if (utxos.length === 0) return null

    const tx = new Transaction().from(utxos).change(destination)
  
    const signed = tx.sign(privateKey)
    
    const result = await broadcast(signed.toString())

    return result
}



