RSYNC_RSH='ssh -p 60022' rsync \
    --exclude '.git' \
    --exclude 'node_modules' \
    --exclude 'deploy.sh' \
    --exclude '.next' \
    --exclude "coverage-ts" \
    --exclude "dist" \
    --exclude "backoffice" \
    --progress \
    -r ./ ubuntu@217.182.74.200:www/schronisko

RSYNC_RSH='ssh -p 60022' rsync --progress \
    -r ./backoffice/public/* ubuntu@217.182.74.200:www/schronisko/schronisko-backoffice
