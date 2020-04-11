import Typography from '@material-ui/core/Typography'
import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'

import Layout from '../components/Layout'
import fetcher from '../utils/fetcher'

function UserData({ data }) {
  return (
    <ul>
      {Object.entries(data).map(([k, v]) => (
        <li key={k}>
          <b>{k}</b>: {typeof v === 'object' ? <UserData data={v} /> : v}
        </li>
      ))}
    </ul>
  )
}

function Index() {
  const { data, error } = useSWR('/api/me', fetcher)
  const { data: games } = useSWR('/api/games', fetcher)
  const isSignedIn = data && data.name

  return (
    <Layout title='Welcome'>
      <h1>Open Table Top</h1>

      {games && (
        <>
          <h3>My Games</h3>
          <ul>
            {games.map((game) => (
              <li>
                <Link href={`/games/${game.id}`}>{game.name}</Link>
              </li>
            ))}
          </ul>

          <Link href={`/games/new`}>Create new game</Link>
        </>
      )}

      {isSignedIn ? (
        <>
          <h3>My Token Values</h3>

          <UserData data={data} />
          <a href="/api/sso/logout">Logout</a>
        </>
      ) : (
        <a href="/api/sso/login">Login</a>
      )}
    </Layout>
  )
}

export default Index
