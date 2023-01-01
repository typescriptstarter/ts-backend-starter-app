
/*
  * This file defines the IssueNFT class, which is a Jig that represents a github issue.

  * Each issue should be able to have awards associated with it, either satoshis or RUN tokens or both.
  * 
  * When an issue is generated a new HD wallet is generated and assigned to that issue in the database
  * The wallet will be derived from a global HD wallet hierarchy. Each issue then may control an instance
  * of stag wallet, which gives it the ability to receive and send tokens, and to execute actions on chain.
  *
  * The global powco.dev system shall have a single HDPrivateKey as represented by a mnemonic seed phrase. That root
  * key will be used to generate a normal key HDPrivateKey, beginning with the first child. The original root key will
  * then be stored in cold storage and only retrieved if the normal key is compromised and a new one must be issued.
  *
  * Using the normal key each issue shall have its own derivation path equal to the issue id integer provided by github.
  * Perhaps in future iterations the key derivation function will take into account the org and repo as branchecs in the
  * path, however the github issue id is currently the most straightforward.
  *
  * Each issue references the github issue and maintains a list of contributors. Either the system or the creator of the
  * issue may control the list of contributors by adding a contributor to the issue. When the issue is finally closed
  * any bounty controlled by the Issue NFT will be paid out in equal proportions to the various contributors. To begin
  * there will likely only be a single contributor winning the bounty.
  *
  *
 *
 */

import { Jig } from 'run-sdk'

interface NewIssueNFT {
  issue_id: number;
  issue_json: any;
  state?: string;
}

interface Contributor {
  github_id: string;
  github_username: string;
  paymail: string;
  pubkey: string;    
}

export class IssueNFT extends Jig {

  issue_id: number;
  issue_json: string;
  contributors: Contributor[];
  state: string;

  init(newIssue: NewIssueNFT) {
    this.issue_id = newIssue.issue_id
    this.issue_json = newIssue.issue_json
    this.contributors = []
    this.state = newIssue.state || 'open'
  }

  addContributor(contributor: Contributor) {
    this.contributors.push(contributor)
  }

  listContributors() {
    return this.contributors
  }

  removeContributor(github_id: string) {
    this.contributors = this.contributors.filter(c => c.github_id !== github_id)
  }

  closeIssue() {
    this.state = 'closed'
  }

}
