import nano from 'nano'
import shortid from 'shortid'

/**
 * Creates a new game
 *
 * @param {Game} game
 * @param {RequestOptions} options
 * @returns {Promise<Game>}
 */
async function createGame(game, { endpoint }) {
  const master = nano(endpoint).use('master')

  game.id = shortid().toLowerCase()

  if (!game.gm) {
    throw new Error('missing game master')
  }

  if (!game.name) {
    throw new Error('game needs a name')
  }

  // Create new database
  await nano(endpoint).db.create(`game-${game.id}`)

  // Patch permissions
  // See: https://github.com/apache/couchdb-nano/issues/193
  // @ts-ignore This is a bug in nano spec
  await nano(endpoint).request({
    db: `game-${game.id}`,
    method: 'put',
    path: '/_security',
    body: {
      admins: { names: [game.gm], roles: ['_admin'] },
      members: { names: [game.gm, ...game.playerIds], roles: ['_admin'] },
    },
  })

  // Upsert game info to all users
  for (const userId of [game.gm, ...game.playerIds]) {
    const user = await master.get(userId)
    user.games = [
      ...(user.games || []),
      {
        id: game.id,
        name: game.name,
      },
    ]
    await master.insert(user)
  }

  return game
}

export default createGame
