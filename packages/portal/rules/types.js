/**
 * @typedef RuleContext
 *
 * @property {object} user - currently authenticated user
 * @property {string} user.sub - id of the user (from IClaims)
 * @property {string} user.nickname - name of the user (from IClaims)
 *
 * @property {import('nano').DocumentScope} db - database instance
 */

/**
 * @typedef Rule
 * @type {function(DbDocument, RuleContext):(Promise<DbDocument> | DbDocument)}
 */

/**
 * @typedef DbDocumentType
 * @type {'Chat' | 'Profile' | 'Character' | 'CharacterTemplate' }
 */

/**
 * @typedef DbDocument
 *
 * @property {string} _id - id of the document
 * @property {DbDocumentType} type - type of the document
 * @property {string} [_rev] - revision of this document
 * @property {PermissionSet} [permissions] - Contains lists of user ids which are allowed to read/write to a character
 */

/**
 * @typedef PermissionSet
 *
 * @property {string[]} [read] - list of users which are allowed to read
 * @property {string[]} [write] - list of users which are allowed to write
 */

/**
 * @typedef ChatMessageDocExt
 *
 * Uses the following ID space: `urn:ott:chat:$GROUP_ID:msgs:$TIMESTAMP`
 *
 * @property {string} message - The message shown to the user
 *
 * @property {object} [author] - Author of this chat message
 * @property {string} author.id - ID pointing to authors
 * @property {string} author.name - Name of the author
 *
 * @property {string} [macro] - optional name of the macro executed with this message
 * @property {string} [command] - optional command related to the macro
 *
 * @typedef {DbDocument & ChatMessageDocExt} ChatMessageDocument
 */

/**
 * @typedef CharacterTemplateExt
 *
 * A character template can be used to create a new instance of a character.
 *
 * Uses the following ID space: `urn:ott:templates:char:$GENERATED_ID`
 *
 * @property {string} name - Display name of the character template
 * @property {string} description - Description of the character template
 * @property {URL} preview_image - A small preview image for catalogue
 *
 * @property {Map<string, *>} attributes - Map of attributes
 *
 * @typedef {DbDocument & CharacterTemplateExt} CharacterTemplateDocument
 */

/**
 * @typedef CharacterExt
 *
 * Instance of a CharacterTemplate.
 *
 * Uses the following ID space: `urn:ott:char:$GENERATED_ID`
 *
 * @property {string} template_id - Ref back to the template
 * @property {Map<string, *>} attributes - Map of attributes
 *
 * @typedef {DbDocument & CharacterTemplateExt} CharacterDocument
 */
