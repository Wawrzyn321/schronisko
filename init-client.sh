set -e

echo 'update permissions'
sudo chown ubuntu:ubuntu /var/svc/schronisko/main/src/client -R

echo 'build client'
sudo npm run build --prefix=main/src/client

echo 'restart service'
sudo systemctl restart schronisko-client-main.service
