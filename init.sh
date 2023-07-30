set -e

echo 'force making a symlink from ~/www-data-stuff/img/ to /var/svc/schronisko/images/img'
ln -sf ~/www-data-stuff/img/ /var/svc/schronisko/images/img

echo 'replacing pw with postgres in prisma/.env'
sed -i s/pw/postgres/ prisma/.env

echo 'npm ci '
npm i

echo 'npm ci prisma'
npm i --prefix=prisma

echo 'prisma push'
npm run push --prefix=prisma
# echo 'prisma seed'
# npm run seed:vps --prefix=prisma

echo 'npm ci main'
npm i --prefix=main

echo 'npm ci client'
npm i --prefix=client

echo 'building client...';
npm run build --prefix=client

echo 'restart services'
sudo systemctl restart schronisko-backend.service
sudo systemctl restart schronisko-client-main.service

echo 'RUN sudo journalctl -u schronisko-backend.service --follow'
echo 'RUN sudo journalctl -u schronisko-client-main.service --follow'