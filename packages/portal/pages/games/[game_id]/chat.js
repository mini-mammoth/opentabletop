import { useRouter } from 'next/router'
import React from 'react'
import ChatLog from '../../../components/ChatLog'

import Layout from '../../../components/Layout'
import PouchDBProvider from '../../../utils/PouchDBContext'

function GameChat() {
  const router = useRouter()
  const { game_id } = router.query

  return (
    <Layout title="Chat">
      <PouchDBProvider remoteUrl={game_id && `/api/games/${game_id}`}>
        <ChatLog />
      </PouchDBProvider>
    </Layout>
  )
}

export default GameChat
