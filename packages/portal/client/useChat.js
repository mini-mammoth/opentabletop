import React, { useCallback, useEffect, useState } from 'react'
import { usePouchDB } from '../utils/PouchDBContext'
import { throwIfError } from './utils'

/**
 * @typedef ChatMessage
 *
 * @property {string} _id - identifier
 * @property {"Chat"} type - This is always "Chat"
 * @property {string} message - Chat Message
 * @property {number} timestamp - Unix epoch
 * @property {object} [author] - Author of the message
 * @property {string} author.name - Name of the author
 */

/**
 * Hook to use the chat.
 *
 * @example
 *   const [messages, sendMessage] = useChat()
 *
 * @returns {[ChatMessage[], function(string):void]}
 */
export default function useChat() {
  const db = usePouchDB()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (!db) {
      return
    }

    // Get chat history
    db.allDocs({
      startkey: 'urn:ott:chat:public:msg:\ufff0',
      include_docs: true,
      descending: true,
      limit: 20,
    })
      .then(throwIfError)
      .then((res) => {
        const hist = res.rows.map((row) => row.doc).reverse()
        setMessages((msgs) => [...hist, ...msgs])
      })
      .catch(console.error)

    // Receive live updates
    const changes = db
      .changes({
        live: true,
        since: 'now',
        include_docs: true,
        filter: (doc) => doc.type === 'Chat',
      })
      .on('change', ({ doc }) => setMessages((msgs) => [...msgs, doc]))
      .on('error', console.error)

    return () => changes.cancel()
  }, [db])

  const sendMessage = useCallback(
    (msg) => {
      if (!db) return

      if (typeof msg === 'string') {
        msg = {
          message: msg,
        }
      }

      const timestamp = Date.now()
      const message = {
        ...msg,
        _id: `urn:ott:chat:public:msg:${timestamp}`,
        type: 'Chat',
        timestamp,
      }

      db.put(message).catch(console.error)
    },
    [db],
  )

  return [messages, sendMessage]
}
