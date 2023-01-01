


import { log } from '../../log'

import { badRequest } from 'boom'

import models from '../../models'

import { App, Octokit } from "octokit";

import { getAppPrivateKey, appId } from '../../github'

const { createAppAuth, createOAuthUserAuth } = require("@octokit/auth-app");

import * as github from '../../github'

export async function create(req, h) {

    try {
        
        const { code, installation_id, setup_action, paymail, run_owner_address } = req.payload

        const appOctokit = new Octokit({
            authStrategy: createAppAuth,
            auth: {
            appId: github.appId,
            privateKey: github.getAppPrivateKey(),
            clientId: process.env.github_client_id,
            clientSecret: process.env.github_client_secret
            },
        });

        const userOctokit: any = await appOctokit.auth({
            type: "oauth-user",
            code,
            factory: (options) => {
            return new Octokit({
                authStrategy: createOAuthUserAuth,
                auth: options,
            });
            },
        });

        const github_user = await userOctokit.request("GET /user");
        
        console.log('user.login', github_user)

        return { github_user, code, installation_id, setup_action, paymail, run_owner_address }

    } catch(error) {

        console.error('ERROR', error)
        return badRequest(error.response.data)


    }

}

