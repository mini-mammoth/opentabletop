import auth0 from '../../utils/auth0'

export default auth0.requireAuthentication(async function api(req, res) {
  const { user } = await auth0.getSession(req)

  if (req.method === 'POST') {

  }

  res.status(400).json({ error: 'invalid request' }).end()
})
