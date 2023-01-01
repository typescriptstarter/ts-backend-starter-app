const Run = require('run-sdk');

import { Negociation } from './src/jigs/negociation'

export default async function main() {

    const run = new Run({ network: 'mock' })

    //@ts-ignore
    const negociation = new Negociation({
        org: 'pow-co',
        repo: 'powco.dev',
        issue_id: 1
    })

    console.log(negociation)

}

if (require.main === module) {

    main()
}