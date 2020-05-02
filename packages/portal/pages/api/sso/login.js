import auth0 from '../../../utils/auth0'

/**
 * @param req
 * @param res
 */
export default async function login(req, res) {
  try {
    await auth0.handleLogin(req, res)
  } catch (error) {
    console.error(error)
    res.status(error.status || 400).end(error.message)
  }
}
