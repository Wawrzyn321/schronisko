RSYNC_RSH='ssh -p 60022' rsync \
    --exclude 'node_modules' \
    --exclude '.next' \
    --progress \
    -r ./main/src/client.* ubuntu@217.182.74.200:www/client
