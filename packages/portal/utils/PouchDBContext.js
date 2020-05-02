import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find'
import React, { useContext, useEffect, useState } from 'react'

const PouchDBContext = React.createContext(null)
PouchDBContext.displayName = 'pouchdb Context'

PouchDB.plugin(PouchDBFind)

/**
 * Provides a PouchDB instance for all children.
 *
 * Instance can be received can be accessed with `usePouchDB()`
 *
 * @param {object} props - Component's props
 * @param {React.ReactNode} props.children - Children
 * @param {string} props.remoteUrl - url of the remote database
 */
export default function PouchDBProvider({ children, remoteUrl }) {
  const [db, setDB] = useState(undefined)

  useEffect(() => {
    if (!remoteUrl) {
      return
    }

    const targetUrl =
      remoteUrl[0] === '/' ? `${window.location.origin}${remoteUrl}` : remoteUrl

    const db = new PouchDB(targetUrl, {
      live: true,
    })

    if (window) {
      // @ts-ignore - This is only for debug cases in the browser.
      window.ACTIVE_DB = db
    }

    setDB(db)

    db.info().then(console.log)
  }, [remoteUrl])

  return (
    <PouchDBContext.Provider value={db}>{children}</PouchDBContext.Provider>
  )
}

/**
 * Returns the instance of the PouchDB.
 *
 * @returns {PouchDB}
 */
export function usePouchDB() {
  return useContext(PouchDBContext)
}
