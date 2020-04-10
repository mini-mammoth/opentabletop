import PouchDB from 'pouchdb'
import React, { useEffect, useMemo, useState } from 'react'

function Game({ game_id }) {
  const [info, setInfo] = useState()

  useEffect(() => {
    const db = new PouchDB(`/api/game/${game_id}`, {
      live: true,
    })

    db.info().then(function(info) {
      setInfo(info)
    })
  }, [])

  return <div>{JSON.stringify(info)}</div>
}

export default Game