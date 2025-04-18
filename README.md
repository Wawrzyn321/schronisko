# Project structure

- `backoffice/` - an administrative panel for the pet shelter.
- `DEV__zdjecia i svg/` - temporary (for a long time) dir for dev stuff
- `dev-scripts/` - scripts used for deploying the project
- `e2e/` - e2e tests for backoffice and main site
- `server/` - backend app
- `client` - main frontend app
- `prisma/` - db stuff, bootstraping the database and seeding
- `copy-vsp-images.sh`, `init-client.sh`, `init.sh` - scripts used on VPS.

## Running all packages

* Ensure `.env` file is provided in `server` and `prisma`. There's `.env-template` file to base the `.env` upon.
* Run `npm run push` and `npm run seed` in `prisma` directory.

At root:

```bash
npm run dev
```

## Running backoffice (port 5555)

At `backoffice/`:

```bash
npm run dev
```

## Running server site (port 60045)

At `server/` - runs backend.

```bash
npm run dev
```

## Running client site (port 3015)

At `client/` - runs client.

```bash
npm run dev
```

## Versions

- NodeJS: v22
- NPM: v10.5.0
- PostgresSQL 14.5

## `node-canvas` installation problems

```bash
npm install -g node-gyp
brew install jpeg pkg-config cairo pango libpng jpeg giflib librsvg
```

## DB installation problems

```bash
brew services restart postgresql # if postgres is not up

createdb #database "<USERNAME>" does not exist

create database schronisko

# change default password
sudo -u <USERNAME>  psql schronisko
\passwd <USERNAME>
```
