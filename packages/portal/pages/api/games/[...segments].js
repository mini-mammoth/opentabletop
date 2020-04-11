import getConfig from 'next/config'
import auth0 from '../../../utils/auth0'
import http from 'http'

const { serverRuntimeConfig } = getConfig()
const endpoint = serverRuntimeConfig.couchdbEndpoint

/**
 * Forwards all request directly to game database in our couchdb.
 *
 * Acts as authorization proxy and passes the authorized users sub.
 */
export default auth0.requireAuthentication(async function api(req, res) {
  const { user } = await auth0.getSession(req)

  // The segments object collects all segments after /api/game/
  const { segments, ...other } = req.query
  const [gameId, ...rest] = segments

  const queryString = Object.entries(other)
    .map(([key, value]) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(value)
    })
    .join('&')

  const path = rest.join('/')
  const url = `${endpoint}/game-${gameId}/${path}?${queryString}`

  return new Promise((resolve, reject) => {
    try {
      const request = http.request(
        url,
        {
          headers: {
            'X-Auth-CouchDB-UserName': user.sub,
            'X-Auth-CouchDB-Roles': 'user',
          },
          method: req.method,
        },
        (response) => {
          response.pipe(res)
          resolve()
        },
      )

      if (req.body) {
        request.write(JSON.stringify(req.body))
      } else {
      }

      request.end()
    } catch (error) {
      console.error(error)
      res.status(500).end()
      return resolve()
    }
  })
})
