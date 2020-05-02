/**
 * @typedef RuleContext
 *
 * @property {object} user
 * @property {string} user.sub
 * @property {string} user.nickname
 */

/**
 * @typedef Rule
 * @type {function(ChatMessageDocument, RuleContext):void}
 */

/**
 * @typedef DbDocumentType
 * @type {'Chat' | 'Profile'}
 */

/**
 * @typedef DbDocument
 *
 * @property {string} _id - id of the document
 * @property {DbDocumentType} type - type of the document
 * @property {string} [_rev] - revision of this document
 */

/**
 * @typedef ChatMessageDocExt
 *
 * @property {string} message - The message shown to the user
 *
 * @property {object} [author] - Author of this chat message
 * @property {string} author.id - ID pointing to authors
 * @property {string} author.name - Name of the author
 *
 * @property {string} [macro] - optional name of the macro executed with this message
 * @property {string} [command] - optionam command related to the macro
 *
 * @typedef {DbDocument & ChatMessageDocExt} ChatMessageDocument
 */
