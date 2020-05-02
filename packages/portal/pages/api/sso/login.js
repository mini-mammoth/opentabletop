import auth0 from '../../../utils/auth0'

/**
 * Starts OAuth2 Authorization flow
 *
 * @param {import('next').NextApiRequest} req - Request object
 * @param {import('next').NextApiResponse} res - Response object
 * @returns {Promise<*>}
 */
export default async function login(req, res) {
  try {
    await auth0.handleLogin(req, res)
  } catch (error) {
    console.error(error)
    res.status(error.status || 400).end(error.message)
  }
}
