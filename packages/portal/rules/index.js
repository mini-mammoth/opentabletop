import putChatMessage from './putChatMessage'

/**
 * @typedef Rule
 * @type {Function<Message, {user: Profile}, void>}
 */

/**
 * @typedef MessageType
 * @type {'Chat' | 'Profile"}
 */

/**
 * @typedef Message
 * @type {object}
 *
 * @property _id {String} - id of the message
 * @property type {String} - type of the message
 * @property _ref {String} - revision
 */

/**
 * A set of rules which are run before a message is forwarded to couchdb
 * @type {Array<Rule>}
 */
export const serverRules = [putChatMessage]
