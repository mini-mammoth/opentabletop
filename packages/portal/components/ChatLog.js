import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Grow from '@material-ui/core/Grow'
import List from '@material-ui/core/List'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import useChat from '../client/useChat'
import { detectMacro } from '../rules/macros'
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
    buttonGroup: {},
    sendButton: {
      margin: theme.spacing(2, 0),
      alignSelf: 'end',
    },
  }),
  { name: 'ChatLog' },
)

/**
 * Shows the global chat history and a message box to send new messages.
 *
 * @param {object} props
 * @param {string} [props.className]
 */
function ChatLog({ className: classNameProp }) {
  const [messages, sendMessage] = useChat()
  const [text, setText] = useState('')
  const [macro, setMacro] = useState(undefined)
  const classes = useStyles()

  useEffect(() => {
    const macro = detectMacro(text)

    setMacro(macro)
  }, [text, setMacro])

  /**
   *
   */
  async function send() {
    if (!text) {
      return
    }

    await sendMessage(text)
    setText('')
  }

  /**
   *
   */
  async function sendMacro() {
    if (!macro) {
      return
    }

    await sendMessage(macro)
    setText('')
  }

  /**
   * @param e
   */
  function handleKeyDown(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
      if (macro) {
        sendMacro()
      } else {
        send()
      }
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
      <div className={classes.buttonGroup}>
        <Button
          className={classes.sendButton}
          disabled={!text}
          onClick={send}
          color={!macro ? 'primary' : undefined}
          variant={!macro ? 'contained' : undefined}
        >
          Send
        </Button>
        <Grow in={!!macro}>
          <Button
            className={classes.sendButton}
            disabled={!text}
            onClick={sendMacro}
            color="primary"
            variant="contained"
          >
            {macro?.macro.replace('_', ' ') || 'send macro'}
          </Button>
        </Grow>
      </div>
    </div>
  )
}

export default ChatLog
