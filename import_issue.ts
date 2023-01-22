
import { importIssue } from './src/github'

export async function main() {

  const [org, repo, issue_id] = process.argv.slice(2,5)

  console.log({ org, repo, issue_id })

  const result = await importIssue({ org, repo, issue_id })

  console.log(result)

}

main()
