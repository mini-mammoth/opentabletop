import nano from 'nano'

/**
 * @typedef ProfileDocumentExt
 *
 * @property {string} name
 * @property {string} email
 *
 * @typedef {DbDocument & ProfileDocumentExt} ProfileDocument
 */

/**
 * Inserts or updates a users profile.
 *
 * @param user {ProfileDocument}
 * @param options {RequestOptions}
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
