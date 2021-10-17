RSYNC_RSH='ssh -p 60022' rsync \
    --exclude 'node_modules' \
    --exclude '.next' \
    --progress \
    -r main/src/client/* ubuntu@217.182.74.200:svc/client

echo 'remember about sudo chown ubuntu:ubuntu /var/svc/schronisko/main/src/client -R, then npm run build'