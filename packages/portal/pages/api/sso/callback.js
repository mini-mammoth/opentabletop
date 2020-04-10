import auth0 from '../../../utils/auth0'
import getConfig from 'next/config'
import { upsertProfile } from '@opentabletop/client'

const { serverRuntimeConfig } = getConfig()

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, { redirectTo: '/' })

    // Use this mocked request object to read the session out of the not yet send cookie.
    const mockReq = { headers: { cookie: res.getHeader('set-cookie') } }
    const { user, idToken } = await auth0.getSession(mockReq)

    await upsertProfile(
      {
        user_id: user.sub,
        name: user.nickname,
        email: user.email,
      },
      { endpoint: serverRuntimeConfig.hasuraEndpoint, token: idToken },
    )
  } catch (error) {
    console.error(error)
    res.status(error.status || 400).end(error.message)
  }
}
