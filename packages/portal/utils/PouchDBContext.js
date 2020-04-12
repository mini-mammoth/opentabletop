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
 * @param children {React.ReactNode}
 * @param remoteUrl {string} - url of the remote database
 */
export default function PouchDBProvider({ children, remoteUrl }) {
  const [db, setDB] = useState(undefined)

  useEffect(() => {
    if (!remoteUrl) {
      return
    }

    if (remoteUrl[0] === '/') {
      remoteUrl = `${window.location.origin}${remoteUrl}`
    }

    const db = new PouchDB(remoteUrl, {
      live: true,
    })

    if (window) {
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
 * @return {PouchDB}
 */
export function usePouchDB() {
  return useContext(PouchDBContext)
}
