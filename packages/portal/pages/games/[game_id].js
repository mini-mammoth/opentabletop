import { useRouter } from 'next/router'
import React from 'react'

import Layout from '../../components/Layout'
import PouchDBProvider from '../../utils/PouchDBContext'

function Game() {
  const router = useRouter()
  const { game_id } = router.query

  return (
    <Layout>
      <PouchDBProvider remoteUrl={game_id && `/api/games/${game_id}`}>
        <div>Game Screen</div>
      </PouchDBProvider>
    </Layout>
  )
}

export default Game
