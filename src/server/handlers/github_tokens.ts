


import { log } from '../../log'

import { badRequest } from 'boom'

import models from '../../models'

import { App } from "octokit";

import { getAppPrivateKey, appId } from '../../github'

export async function create(req, h) {

    try {

    // Given a github app code and installation_id, return a github access token

    const app = new App({
        appId,
        privateKey: getAppPrivateKey(),
        oauth: {
            clientId: process.env.github_client_id,
            clientSecret: process.env.github_client_secret
        }
    });

    const { code, installation_id, setup_action, paymail, run_owner_address } = req.payload

    //@ts-ignore
    const { token } = await app.oauth.createToken({
        code
    });

    return { token, code, installation_id, setup_action, paymail, run_owner_address }
} catch(error) {
    console.error('ERROR', error)
    return badRequest(error.response.data)
}

}

