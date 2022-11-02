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

- NodeJS: 16.14.2
- NPM: 8.5.0
- PostgresSQL 14.5
