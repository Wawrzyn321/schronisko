# exit on error
set -o errexit

echo 'formatting client...'
npm run lint:fix --prefix=client

rsync \
    --exclude '.git' \
    --exclude 'node_modules' \
    --exclude 'deploy.sh' \
    --exclude '.next' \
    --exclude "coverage-ts" \
    --exclude "dist" \
    --exclude "backoffice" \
    --exclude "server" \
    --exclude "prisma" \
    --exclude "e2e" \
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
    # --exclude "server" \
    # --exclude "prisma" \
#     --exclude "e2e" \
#     --progress \
#     -r ./ ubuntu@217.182.74.200:svc/schronisko