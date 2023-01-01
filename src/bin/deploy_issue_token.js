

require('dotenv').config()

//import { GithubIssue } from '../jigs/github_issue'

const tokenkit = require('@runonbitcoin/tokenkit')

const Run = require('run-sdk')

class GithubIssue extends Jig {

}



//const { fromBackupSeedPhrase } = require('/Users/zyler/github/stagwallet/stag-wallet')

//class BasicClass {}

async function main() {


  const blockchain = new Run.plugins.WhatsOnChain({ network: 'main' })

  const run = new Run({
    owner: process.env.run_owner,
    purse: process.env.run_purse,
    blockchain
  })

  run.trust('*')


  // Returns deployed Run Code
  const MyNFT = await tokenkit.nft.deploy({
    metadata: {
      name: 'My NFT',
      description: 'My example NFT',
      image: 'b://4400acfcb88af8584384bd6417056fa374d71b86e1eee59ca5ba937c8b53f254',
    },
    maxSupply: 218
  })

  console.log({ MyNFT })

//console.log({MyCoin})

  //const wallet = fromBackupSeedPhrase(process.env.run_seed_phrase)

  /*const GithubIssueCode = run.deploy(BasicClass)

  console.log(GithubIssueCode)

  await GithubIssueCode.sync()

  console.log(GithubIssueCode)

  */
}

main()
