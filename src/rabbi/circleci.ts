
import axios from 'axios'

import config from '../config'

const slug = 'gh/pow-co/boost-worker'

export async function listPipelines() {

  const { data } = await axios.get(`https://circleci.com/api/v2/pipeline`, {
    params: {
    },
    auth: {
      username: config.get('circleci_token'),
      password: null
    }
  })

  return data

}

export async function getProject() {

  const { data } = await axios.get(`https://circleci.com/api/v2/project/${slug}`, {
    auth: {
      username: config.get('circleci_token'),
      password: null
    }
  })

  return data

}

export async function listEnv(): Promise<any> {

  const { data } = await axios.get(`https://circleci.com/api/v2/project/${slug}/envvar`, {
    auth: {
      username: config.get('circleci_token'),
      password: null
    }
  })

  return data

}

export async function getEnv({ name }: { name: String }): Promise<any> {

  const { data } = await axios.get(`https://circleci.com/api/v2/project/${slug}/envvar/${name}`, {
    auth: {
      username: config.get('circleci_token'),
      password: null
    }
  })

  return data

}

export async function setEnv({ name, value }: { name: String, value: String }): Promise<any> {

  const { data } = await axios.post(`https://circleci.com/api/v2/project/${slug}/envvar`, {

    name, value

  }, {
    auth: {
      username: config.get('circleci_token'),
      password: null
    }
  })

  return data


}

export async function setEnvFromConfig(): Promise<any> {

  await setEnv({ name: 'DOCKER_USER', value: config.get('docker_user') })

  await setEnv({ name: 'DOCKER_PASSWORD', value: config.get('docker_password') })

  await setEnv({ name: 'DOCKER_REPO', value: config.get('docker_repo') })

  await setEnv({ name: 'GITHUB_TOKEN', value: config.get('github_token') })

}

