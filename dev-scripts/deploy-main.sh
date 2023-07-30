echo 'formatting server & client...'
sudo npm run lint:fix --prefix=main

echo 'running server tests...'
npm run test --prefix=main

RSYNC_RSH='ssh -p 60022' rsync \
    --exclude '.git' \
    --exclude 'node_modules' \
    --exclude 'deploy.sh' \
    --exclude '.next' \
    --exclude "coverage-ts" \
    --exclude "dist" \
    --exclude "backoffice" \
    --exclude "e2e" \
    --exclude "main/src/client/public/img/animals" \
    --exclude "prisma/db-import/animals/animals" \
    --progress \
    -r ./ ubuntu@217.182.74.200:svc/schronisko


RSYNC_RSH='ssh -p 60022' rsync \
    -r ./main/src/client/.next ubuntu@217.182.74.200:svc/schronisko
