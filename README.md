# Project structure

- `backoffice/` - an administrative panel for the pet shelter.
- `DEV__zdjecia i svg/` - temporary (for a long time) dir for dev stuff
- `dev-scripts/` - scripts used for deploying the project
- `e2e/` - e2e tests for backoffice and main site
- `main/`:
    - `src/client` - main frontend app
    - `src/server` - backend app
- `prisma/` - db stuff, bootstraping the database and seeding
- `copy-vsp-images.sh`, `init-client.sh`, `init.sh` - scripts used on VPS.

## Running backoffice

At `backoffice/`:

```bash
npm run dev
```

## Running main site

At `main/` - runs both backend and frontend.

```bash
npm run dev
```

## Versions

- NodeJS: 16.19.0
- NPM: 8.19.3
- PostgresSQL 14.5


## Services on VPS:

Located at `/etc/systemd/system`:

- schronisko-backend.service
- schronisko-client-main.service


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
