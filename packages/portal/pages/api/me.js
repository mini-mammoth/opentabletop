import auth0 from '../../utils/auth0'

/**
 * Returns session info about a user
 *
 * @param {import('next').NextApiRequest} req - Request object
 * @param {import('next').NextApiResponse} res - Response object
 * @returns {Promise<*>}
 */
export default async function me(req, res) {
  try {
    await auth0.handleProfile(req, res, { refetch: true })
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}
