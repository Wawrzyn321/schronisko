set -e

echo 'npm ci client'
npm i --prefix=client

echo 'building client...';
npm run build --prefix=client

echo 'restart services'
sudo systemctl restart schronisko-client-main.service

echo 'RUN sudo journalctl -u schronisko-client-main.service --follow'