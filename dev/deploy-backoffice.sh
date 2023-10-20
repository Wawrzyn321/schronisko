# exit on error
set -o errexit

echo 'linting  & building...'
# ten env wycisza błąd
# You must provide the URL of lib/mappings.wasm by calling
#  SourceMapConsumer.initialize({ 'lib/mappings.wasm': ... })
#  before using SourceMapConsumer (svelte)
NODE_OPTIONS=--no-experimental-fetch npm run build --prefix=backoffice
echo 'build done'
# RSYNC_RSH='ssh -p 60022' rsync --progress \
#     -r ./backoffice/public/* ubuntu@217.182.74.200:www/schronisko-backoffice

rsync --progress \
    -r ./backoffice/public/* ubuntu@146.59.32.93:schronisko-backoffice
