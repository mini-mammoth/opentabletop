import auth0 from '../../../utils/auth0'
import httpProxy from 'http-proxy'

export const config = {
  api: {
    // We disable body parsing as the req.body has to be directly forwarded to couchdb
    bodyParser: false,
  },
}

const proxy = httpProxy.createProxyServer()

/**
 * Forwards all request directly to game database in our couchdb.
 *
 * Acts as authorization proxy and passes the authorized users sub.
 */
export default auth0.requireAuthentication(async function api(req, res) {
  const { user } = await auth0.getSession(req)

  // The segments object collects all segments after /api/game/
  const [gameId, ...rest] = req.query.segments

  proxy.web(req, res, {
    target: `http://localhost:5984/game-${gameId}/${rest.join('/')}`,
    ignorePath: true,
    headers: {
      'X-Auth-CouchDB-UserName': user.sub,
      'X-Auth-CouchDB-Roles': 'user',
    },
  })
})
