import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import React, { useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import useChat from '../client/useChat'
import ChatMessage from './chatLog/ChatMessage'

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    history: {
      flex: 1,
    },
    message: {
      margin: theme.spacing(2, 0, 0, 0),
    },
    sendButton: {
      margin: theme.spacing(2, 0),
      alignSelf: 'end',
    },
  }),
  { name: 'ChatLog' },
)

function ChatLog({ className: classNameProp }) {
  const [messages, sendMessage] = useChat()
  const [text, setText] = useState('')
  const classes = useStyles()

  async function send() {
    if (!text) {
      return
    }

    await sendMessage(text)
    setText('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
      send()
    }
  }

  return (
    <div className={classNames(classes.root, classNameProp)}>
      <Scrollbars universal>
        <List className={classes.history}>
          {messages.map((msg) => (
            <ChatMessage key={msg._id} message={msg} />
          ))}
        </List>
      </Scrollbars>
      <TextField
        id="message"
        className={classes.message}
        onKeyDown={handleKeyDown}
        label="Message"
        multiline
        rows={4}
        placeholder="Write here..."
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        className={classes.sendButton}
        disabled={!text}
        onClick={send}
        color="primary"
        variant="contained"
      >
        Send
      </Button>
    </div>
  )
}

export default ChatLog
