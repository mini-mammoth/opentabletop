import nano from 'nano'

/**
 * Gets all games of a user
 *
 * @param {string} userId - user identifier
 * @param {RequestOptions} options - Additional options used to connect to db
 * @returns {Promise<Game[]>}
 */
async function getGamesByUser(userId, { endpoint }) {
  const master = nano(endpoint).use('master')

  const user = await master.get(userId)
  return user.games || []
}

export default getGamesByUser
