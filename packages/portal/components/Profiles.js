import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const GET_PROFILES = gql`
  query get_profiles {
    profile {
      name
      user_id
    }
  }
`

function Profiles() {
  const { data } = useQuery(GET_PROFILES)

  if (!data) {
    return null
  }

  return (
    <ul>
      {data.profile.map((p) => (
        <li>{p.name}</li>
      ))}
    </ul>
  )
}

export default Profiles
