import putChatMessage from './putChatMessage'

/**
 * A set of rules which are run before a message is forwarded to couchdb
 *
 * @type {Array<Rule>}
 */
export const serverRules = [putChatMessage]
