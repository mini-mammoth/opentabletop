import auth0 from '../../../utils/auth0'
import getConfig from 'next/config'
import { upsertProfile } from '@opentabletop/client'

const { serverRuntimeConfig } = getConfig()

/**
 * @param req
 * @param res
 */
export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, { redirectTo: '/' })

    // Use this mocked request object to read the session out of the not yet send cookie.
    const mockReq = /** @type {import('http').IncomingMessage} */ ({
      headers: { cookie: res.getHeader('set-cookie') },
    })

    const { user } = await auth0.getSession(mockReq)

    await upsertProfile(
      {
        _id: user.sub,
        type: 'Profile',
        name: user.nickname,
        email: user.email,
      },
      { endpoint: serverRuntimeConfig.couchdbEndpoint },
    )
  } catch (error) {
    console.error(error)
    res.status(error.status || 400).end(error.message)
  }
}
