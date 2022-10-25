
import * as bsv from 'bsv'

import { Actor } from 'stag-wallet'

import { v4 as uuid } from 'uuid'

import { fetch } from 'powco'

import { fromTx, Txo } from 'txo'

interface OnchainPostParams {
  app: string;
  key: string;
  val: any;
}

interface OnchainPostResult {
  txid: string;
  txhex: string;
  tx: bsv.Transaction;
  txo: Txo;
}

export const onchain = (wallet) => {

  const actor = new Actor({
    wallet
  })

  return {

    post: async (params: OnchainPostParams) => {

      const message = {
        app: params.app,
        event: params.key,
        payload: params.val,
        nonce: uuid()
      }

      console.log('onchain.publish.message', message)

      const txid = await actor.publishMessage(message)

      console.log('onchain.publish.message.result', { result: txid, message })

      const txhex = await fetch(txid)

      const txo = await fromTx(txhex)

      return {
        txid,
        txhex,
        txo,
        tx: new bsv.Transaction(txhex)
      }

    }

  }

}
