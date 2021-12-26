echo 'formatting client...'
sudo npm run lint:fix --prefix=main/src/client

RSYNC_RSH='ssh -p 60022' rsync \
    --exclude '.git' \
    --exclude 'node_modules' \
    --exclude 'deploy.sh' \
    --exclude '.next' \
    --exclude "coverage-ts" \
    --exclude "dist" \
    --exclude "backoffice" \
    --exclude "main/src/client/public/img/animals" \
    --exclude "prisma/db-import/animals/animals" \
    --progress \
    -r ./ ubuntu@217.182.74.200:svc/schronisko


