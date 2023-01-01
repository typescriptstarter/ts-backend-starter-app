
const axios = require('axios')

export async function listTokenBalances(address: string): Promise<any> {

    const { data } = await axios.get(`https://staging-backend.relayx.com/api/user/balance2/${address}`)

    return data.data

}
