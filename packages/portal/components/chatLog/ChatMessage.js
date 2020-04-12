import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import React from 'react'

function ChatMessage({ message }) {
  const time = new Date(message.timestamp).toLocaleTimeString()
  const who = message.author?.name ?? 'Unknown'

  return (
    <ListItem key={message._id}>
      <ListItemText primary={message.message} secondary={`${time} - ${who}`} />
    </ListItem>
  )
}

export default ChatMessage
