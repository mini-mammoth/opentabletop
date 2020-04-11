import { useRouter } from 'next/router'
import React from 'react'
import ChatLog from '../../components/ChatLog'

import Layout from '../../components/Layout'
import PouchDBProvider from '../../utils/PouchDBContext'

function Game() {
  const router = useRouter()
  const { game_id } = router.query

  return (
    <Layout title="Game">
      <PouchDBProvider remoteUrl={game_id && `/api/games/${game_id}`}>
        <div>Game Screen</div>
        <ChatLog/>
      </PouchDBProvider>
    </Layout>
  )
}

export default Game
