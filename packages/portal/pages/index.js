import React from 'react'
import useSWR from 'swr'
import { withApollo } from '../lib/apollo'
import fetcher from '../utils/fetcher'
import Profiles from '../components/Profiles'

function UserData({ data }) {
  return (
    <ul>
      {Object.entries(data).map(([k, v]) => (
        <li key={k}>
          <b>{k}</b>: {typeof v === 'object' ? <UserData data={v}/> : v}
        </li>
      ))}
    </ul>
  )
}

function Index() {
  const { data, error } = useSWR('/api/me', fetcher)
  const isSignedIn = data && data.name

  return (
    <>
      <h1>Open Table Top</h1>
      <Profiles/>

      {isSignedIn ? (
        <>
          <UserData data={data}/>
          <a href="/api/sso/logout">Logout</a>
        </>
      ) : (
        <a href="/api/sso/login">Login</a>
      )}
    </>
  )
}

export default withApollo()(Index)
