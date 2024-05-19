# exit on error
set -o errexit

echo 'linting & building...'
npm run build --prefix=backoffice
echo 'build done'


rsync --progress \
    -r ./backoffice/dist/* ubuntu@146.59.32.93:schronisko-backoffice
