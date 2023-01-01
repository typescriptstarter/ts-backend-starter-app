
const { Jig } = require('run-sdk')

export class Negociation extends Jig {

    init(params) {                    

        this.org = params.org

        this.repo = params.repo

        this.issue_id = params.issue_id

    }

    async create() {

        this.state = {
            bids: []
        }

    }

    async addBid(bid) {

        this.state.bids.push(bid)

    }

    async rescindBid(bid) {

        

    }

    async declineBid(bid) {

        

    }

    async counterOffer(bid) {

        

    }

    async acknowledgeBid(bid) {

        

    }

    async acknowledgeCounterOffer(bid) {

        

    }

    async getBids() {

        return this.state.bids

    }

}