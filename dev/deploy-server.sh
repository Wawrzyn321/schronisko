# exit on error
set -o errexit

echo 'removing previous cache (if exists)...'
rm -f server/dump.rdb

echo 'formatting server...'
npm run lint:fix --prefix=server

echo 'running server tests...'
npm run test --prefix=server -- --ci


rsync \
    --exclude '.git' \
    --exclude 'node_modules' \
    --exclude 'deploy.sh' \
    --exclude '.next' \
    --exclude "coverage-ts" \
    --exclude "dist" \
    --exclude "backoffice" \
    --exclude "client" \
    --exclude "e2e" \
    --exclude "prisma/db-import/animals/animals" \
    --progress \
    -r ./ ubuntu@146.59.32.93:schronisko

# RSYNC_RSH='ssh -p 60022' rsync \
#     --exclude '.git' \
#     --exclude 'node_modules' \
#     --exclude 'deploy.sh' \
#     --exclude '.next' \
#     --exclude "coverage-ts" \
#     --exclude "dist" \
#     --exclude "backoffice" \
#     --exclude "client" \
#     --exclude "e2e" \
#     --exclude "prisma/db-import/animals/animals" \
#     --progress \
#     -r ./ ubuntu@217.182.74.200:svc/schronisko