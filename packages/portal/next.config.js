const withTM = require('next-transpile-modules')(['@opentabletop/client'])

module.exports = withTM({
  publicRuntimeConfig: {
    endpoint: 'http://localhost:3000',
    hasuraEndpoint: '/api',
  },
  serverRuntimeConfig: {
    hasuraEndpoint: 'http://localhost:8080/v1/graphql',
    auth0Domain: 'opentabletop.eu.auth0.com',
    auth0ClientId: process.env.AUTHO_CLIENT_ID,
    auth0ClientSecret: process.env.AUTH0_CLIENT_SECRET,
    cookieSecret: process.env.COOKIE_SECRET,
  },
})
