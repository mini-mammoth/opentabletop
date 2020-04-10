# Open Tabletop

## Development

### Requirements

1. Install NodeJS 12 (LTS) and `yarn`
1. Install `docker` and `docker-compose`

### Run

1. Run `yarn` to install dependencies
1. Run `docker-compose up -d` to start the graphql server.
1. Check with `yarn harusa migrate status` if your db instance is in sync. Otherwise, use `yarn haruse migrate apply`.  
1. Run `yarn dev` to start the dev instance. The dev instance is running at [http://localhost:3000]().
1. (optional) Use `yarn harusa console` to access the graphql servers console 

> Read more about `harusa` migrations at: [https://hasura.io/docs/1.0/graphql/manual/migrations/new-database.html#migrations-new-db]()
