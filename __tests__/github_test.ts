
import { listIssues } from '../src/github'

import { expect } from './utils'

describe("Github", () => {

  it("should list the issues for this repo", async () => {

    let issues = await listIssues()

    expect(issues).to.be.an('array')

  })

})
