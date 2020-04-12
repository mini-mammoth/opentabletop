import { BadRequestError } from './errors'

/**
 * Enforce rules on chat messages
 * @param message {Message}
 * @param user {Profile}
 * @return {Message}
 */
function putChatMessage(message, { user }) {
  if (message.type !== 'Chat') {
    return message
  }

  if (message._ref) {
    throw new BadRequestError('Chat is readonly')
  }

  message.author = {
    id: user.sub,
    name: user.nickname,
  }

  return message
}

export default putChatMessage
