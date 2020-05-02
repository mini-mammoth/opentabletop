import { BadRequestError } from './errors'
import { executeMacro, removeMacroResults } from './macros'

/**
 * Enforce rules on chat messages
 *
 * @param {ChatMessageDocument} message
 * @param {RuleContext} context
 * @returns {ChatMessageDocument}
 */
function putChatMessage(message, { user }) {
  if (/^urn:ott:chat:/.exec(message._id)) {
    return message
  }

  if (message._rev) {
    throw new BadRequestError('Chat is readonly')
  }

  message.type = 'Chat'

  // Ensure no one has injected macro results
  message = removeMacroResults(message)

  // Execute chat macro if present
  if (message.macro) {
    message = executeMacro(message, message.macro)
  }

  message.author = {
    id: user.sub,
    name: user.nickname,
  }

  return message
}

export default putChatMessage
