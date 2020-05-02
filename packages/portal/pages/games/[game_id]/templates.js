import { useRouter } from 'next/router'
import React from 'react'

import Layout from '../../../components/Layout'
import TemplateEditor from '../../../components/TemplateEditor'
import PouchDBProvider from '../../../utils/PouchDBContext'

/**
 *
 */
function GameChat() {
  const router = useRouter()
  const { game_id } = router.query

  return (
    <Layout title="Templates">
      <PouchDBProvider remoteUrl={game_id && `/api/games/${game_id}`}>
        <TemplateEditor />
      </PouchDBProvider>
    </Layout>
  )
}

export default GameChat
