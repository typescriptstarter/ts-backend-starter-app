require('dotenv').config()

import { topPosts } from './src/scraper'

import { onchain } from 'stag-wallet'

async function run() {

  let result = await onchain.post({
    app: 'onchain.sv',
    key: 'set_index_html',
    val: {
      b_file: '4fc78e697276266782e328827d205f07e29d409f5f53cb451dc45bb6e1d53507'
    }
  })

  console.log('result', result)
}

run()


