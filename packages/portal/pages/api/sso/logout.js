import auth0 from '../../../utils/auth0'

/**
 * Deletes all session cookies
 *
 * @param {import('next').NextApiRequest} req - Request object
 * @param {import('next').NextApiResponse} res - Response object
 * @returns {Promise<*>}
 */
export default async function logout(req, res) {
  try {
    await auth0.handleLogout(req, res)
  } catch (error) {
    console.error(error)
    res.status(error.status || 400).end(error.message)
  }
}
