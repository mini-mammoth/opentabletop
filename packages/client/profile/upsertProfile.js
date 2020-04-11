import nano from 'nano'

/**
 * Inserts or updates a users profile.
 * @param user
 * @param endpoint {string} - harusa endpoint
 * @param token {string} - bearer token
 * @return {Promise<nano.DocumentInsertResponse>}
 */
async function upsertProfile(user, { endpoint }) {
  const master = nano(endpoint).use('master')

  let existingUser = {}
  try {
    existingUser = await master.get(user._id)
  } catch (err) {
    if (err.reason === 'missing') {
      existingUser = {}
    } else {
      throw err
    }
  }

  return await master.insert({
    ...existingUser,
    ...user,
  })
}

export default upsertProfile
