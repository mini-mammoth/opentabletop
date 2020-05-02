import nano from 'nano'

/**
 * Gets all games of a user
 *
 * @param userId {string} - user identifier
 * @param options {RequestOptions}
 */
async function getGamesByUser(userId, { endpoint }) {
  const master = nano(endpoint).use('master')

  const user = await master.get(userId)
  return user.games || []
}

export default getGamesByUser
