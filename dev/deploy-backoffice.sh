# exit on error
set -o errexit

echo 'linting & building...'
# NODE_OPTIONS=--no-experimental-fetch disables the error:
#   You must provide the URL of lib/mappings.wasm by calling
#   SourceMapConsumer.initialize({ 'lib/mappings.wasm': ... })
#   before using SourceMapConsumer (svelte)
NODE_OPTIONS=--no-experimental-fetch npm run build --prefix=backoffice
echo 'build done'


rsync --progress \
    -r ./backoffice/public/* ubuntu@146.59.32.93:schronisko-backoffice
