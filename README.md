# Open Tabletop

## Development

### Requirements

1. Install NodeJS 12 (LTS) and `yarn`
1. Install `docker` and `docker-compose`

### Run

1. Run `yarn` to install dependencies
1. Run `docker-compose up -d` to start the graphql server.
1. Ensure to run initial couchdb setup
1. Run `yarn dev` to start the dev instance. The dev instance is running at [http://localhost:3000]().
1. (optional) Go to [http://localhost:5984/\_utils]() to access the couchdb web console. Use `admin` and `password`.

### Inital Couchdb Setup

Run the following commands to complete the couchdb setup. You have to run this, each time you delete the couchdb volume.

```bash
# Create initial databases
# See: https://docs.couchdb.org/en/stable/setup/single-node.html
curl -H "Authorization: Basic YWRtaW46cGFzc3dvcmQ=" -X PUT http://127.0.0.1:5984/_users
curl -H "Authorization: Basic YWRtaW46cGFzc3dvcmQ=" -X PUT http://127.0.0.1:5984/_replicator
curl -H "Authorization: Basic YWRtaW46cGFzc3dvcmQ=" -X PUT http://127.0.0.1:5984/_global_changes

# Create master database
# The master database is used to state anything which is not user related.
curl -H "Authorization: Basic YWRtaW46cGFzc3dvcmQ=" -X PUT -d '{"id":"master","name":"master"}' http://127.0.0.1:5984/master
curl -H "Authorization: Basic YWRtaW46cGFzc3dvcmQ=" -X PUT -d '{"members":{"roles":["_admin"],"names":["admin"]},"admins":{"roles":["_admin"]}}' http://127.0.0.1:5984/master/_security

# Allow proxy authentication
# See: https://docs.couchdb.org/en/stable/api/server/authn.html#proxy-authentication
curl -H "Authorization: Basic YWRtaW46cGFzc3dvcmQ="  -X PUT -H 'Content-Type: application/json'  --data '"{chttpd_auth, cookie_authentication_handler}, {chttpd_auth, proxy_authentication_handler}, {chttpd_auth, default_authentication_handler}"' http://127.0.0.1:5984/_node/nonode@nohost/_config/chttpd/authentication_handlers
```

> **INFO** You have to change the authorization header if you've changed the admin user/password in docker-compose file
