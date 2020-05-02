import { BadRequestError } from './errors'

/**
 * Enforce rules on chat messages
 *
 * @param {DbDocument} doc - Message to append to the chat log
 * @param {RuleContext} context - current session context
 * @returns {Promise<DbDocument>}
 */
async function putDocument(doc, { user, db }) {
  if (doc.type === 'Chat') {
    return doc
  }

  if (!doc._rev) {
    // This is an initial "create" so it is always allowed.

    // Set default permissions
    doc.permissions = {
      read: [user.sub],
      write: [user.sub],
      ...doc.permissions,
    }

    return doc
  }

  /** @type{DbDocument}**/
  const document = await db.get(doc._id)
  if (document.permissions?.write?.indexOf(user.sub) === -1) {
    throw new BadRequestError('not allowed to modify this object')
  }

  return doc
}

export default putDocument
