

import { startProbot }  from './src'

const { run } = require('probot')

export async function main() {

    run(startProbot)
    
}

if (require.main === module) {

    main()
}