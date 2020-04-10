import fetch from 'isomorphic-fetch'

const UPSERT_PROFILE = `
mutation upsert_profile ($user: profile_insert_input!) {
  insert_profile(
    objects: [
      $user
    ],
    on_conflict: {
      constraint: profile_pkey
      update_columns: [email, name]
    }
  ) {
    affected_rows
  }
}
`

/**
 * Inserts or updates a users profile.
 * @param user
 * @param endpoint {string} - harusa endpoint
 * @param token {string} - bearer token
 * @return {Promise<void>}
 */
async function upsertProfile(user, { endpoint, token }) {
  const apiRes = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: UPSERT_PROFILE,
      variables: { user },
    }),
  })

  if (!apiRes.ok) {
    console.error(`could not upsert user: ${user}`)
    console.log(await apiRes.text())
  }
}

export default upsertProfile
