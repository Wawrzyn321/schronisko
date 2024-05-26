# exit on error
set -o errexit

echo 'formatting server...'
npm run lint:fix --prefix=server

echo 'running server tests...'
npm run test --prefix=server -- --ci

rsync \
    --exclude '.git' \
    --exclude 'node_modules' \
    --exclude '.next' \
    --exclude "coverage-ts" \
    --exclude "dist" \
    --exclude "backoffice" \
    --exclude "client" \
    --exclude "e2e" \
    --exclude "dev" \
    --exclude "prisma/db-import/animals/animals" \
    --exclude "server/dump.rdb" \
    --progress \
    -r ./ ubuntu@146.59.32.93:schronisko
