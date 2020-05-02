const withTM = require('next-transpile-modules')(['@opentabletop/client'])

module.exports = withTM({
  publicRuntimeConfig: {
    endpoint: 'http://localhost:3000',
    hasuraEndpoint: '/api',
  },
  serverRuntimeConfig: {
    couchdbEndpoint: 'http://admin:password@127.0.0.1:5984',
    auth0Domain: 'opentabletop.eu.auth0.com',
    auth0ClientId: process.env.AUTHO_CLIENT_ID,
    auth0ClientSecret: process.env.AUTH0_CLIENT_SECRET,
    cookieSecret: process.env.COOKIE_SECRET,
  },
})
