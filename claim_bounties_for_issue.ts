#!/usr/bin/env ts-node

require('dotenv').config()


import { claimBounty } from './src/bounty'

export async function main() {

    const txid = await claimBounty({
        org: 'pow-co',
        repo: 'next.askbitcoin.ai',
        number: 17,
        destination: '12syqu1XwFzGVqTTK5U6EkJaqq2FPeLmRH' // owenkellogg@relayx.io
    })

    if (txid) {

        console.log('bounty claimed!', {txid})

    } else {

        console.log('no bounty to claim')
    }

    process.exit(0)

}


main()
