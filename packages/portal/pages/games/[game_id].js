import { makeStyles } from '@material-ui/core/styles'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React from 'react'

import Layout from '../../components/Layout'
import PouchDBProvider from '../../utils/PouchDBContext'

const Stage = dynamic(() => import('../../components/Stage'), {
  ssr: false,
})

const useStyles = makeStyles(
  () => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
  }),
  { name: 'Game' },
)

/**
 *
 */
function Game() {
  const router = useRouter()
  const { game_id } = router.query
  const { root } = useStyles()

  return (
    <Layout title="Game">
      <PouchDBProvider remoteUrl={game_id && `/api/games/${game_id}`}>
        <div className={root}>
          <Stage />
        </div>
      </PouchDBProvider>
    </Layout>
  )
}

export default Game
