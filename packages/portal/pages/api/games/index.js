import { createGame, getGamesByUser } from '@opentabletop/client'
import getConfig from 'next/config'

import auth0 from '../../../utils/auth0'

const { serverRuntimeConfig } = getConfig()
const endpoint = serverRuntimeConfig.couchdbEndpoint

export default auth0.requireAuthentication(async function api(req, res) {
  const { user } = await auth0.getSession(req)

  switch (req.method) {
    case 'GET':
      const games = await getGamesByUser(user.sub, { endpoint })
      res.json(games).end()
      break
    case 'POST':
      const game = await createGame(
        { playerIds: [], ...req.body, gm: user.sub },
        { endpoint },
      )
      res.json(game).end()
      break
    default:
      res.status(400).json({ error: 'invalid request' }).end()
      break
  }
})
