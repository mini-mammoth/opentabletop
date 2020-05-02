import nano from 'nano'

/**
 * @typedef ProfileDocumentExt
 *
 * Profile document is used to store additional information about a single user.
 *
 * @property {string} name - Name of the user
 * @property {string} email - Email of the user
 *
 * @typedef {DbDocument & ProfileDocumentExt} ProfileDocument
 */

/**
 * Inserts or updates a users profile.
 *
 * @param {ProfileDocument} user - profile to upsert
 * @param {RequestOptions} options - Additional options to connect to db
 * @returns {Promise<nano.DocumentInsertResponse>}
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
