echo 'building...'
npm run build --prefix=backoffice
echo 'build done'
RSYNC_RSH='ssh -p 60022' rsync --progress \
    -r ./backoffice/public/* ubuntu@217.182.74.200:www/schronisko-backoffice
