
import { importRepoIssues } from './src/github'

async function main() {


  try {

    const result = await importRepoIssues({ org: 'pow-co', repo: process.argv[2] })

    console.log(result)


  } catch(error) {

    console.error(error)


  }

  process.exit(0)

}

main()

