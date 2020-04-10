import auth0 from '../../utils/auth0'
import getConfig from 'next/config'
import playground from 'graphql-playground-middleware-express'
import fetch from 'isomorphic-fetch'

const { serverRuntimeConfig } = getConfig()

const handler = playground({
  endpoint: '/api',
})

/**
 * Wrapper for harusa GraphQL API.
 *
 * Picks idToken from session and use it to authenticate against harusa.
 * This is useful for development and testing.
 *
 * ATTENTION: This does not allow any kind of WebSockets / Subscriptions.
 */
export default auth0.requireAuthentication(async function api(req, res) {
  const { idToken } = await auth0.getSession(req)

  if (req.method === 'GET') {
    return handler(req, res, () => {
    })
  }

  const apiRes = await fetch(serverRuntimeConfig.hasuraEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(req.body),
  })

  res.status(apiRes.status)
  res.send(await apiRes.json())
  res.end()
})
