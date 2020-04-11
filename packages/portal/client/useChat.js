import React, { useCallback, useEffect, useState } from 'react'
import { usePouchDB } from '../utils/PouchDBContext'

/**
 * @typedef ChatMessage
 * @type {object}
 * @property _id {URN} - identifier
 * @property type {'Chat'}
 * @property message {string} -
 * @property timestamp {number} -
 */


/**
 * Hook to use the chat.
 *
 * @example
 *   const [messages, sendMessage] = useChat()
 *
 * @return {[Array<ChatMessage>, Function<String, void>]}
 */
export default function useChat() {
  const db = usePouchDB()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (!db) {
      return
    }

    const changes = db
      .changes({
        live: true,
        include_docs: true,
        filter: (doc) => doc.type === 'Chat',
      })
      .on('change', ({ doc }) => setMessages((msgs) => [...msgs, doc]))
      .on('error', console.error)

    return () => changes.cancel()
  }, [db])

  const sendMessage = useCallback(
    (text) => {
      if (!db) return

      const timestamp = Date.now()
      const message = {
        _id: `urn:ott:chat:${timestamp}`,
        type: 'Chat',
        message: text,
        timestamp,
      }

      db.put(message).catch(console.error)
    },
    [db],
  )

  return [messages, sendMessage]
}