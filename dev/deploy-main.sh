# exit on error
set -o errexit

echo 'formatting server...'
npm run lint:fix --prefix=main

echo 'formatting client...'
npm run lint:fix --prefix=client

echo 'running server tests...'
npm run test --prefix=main -- --ci

RSYNC_RSH='ssh -p 60022' rsync \
    --exclude '.git' \
    --exclude 'node_modules' \
    --exclude 'deploy.sh' \
    --exclude '.next' \
    --exclude "coverage-ts" \
    --exclude "dist" \
    --exclude "backoffice" \
    --exclude "e2e" \
    --exclude "prisma/db-import/animals/animals" \
    --progress \
    -r ./ ubuntu@217.182.74.200:svc/schronisko