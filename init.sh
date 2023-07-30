set -e

echo 'force making a symlink from ~/www-data-stuff/gotowe-animals/ to static animals'
ln -sf ~/www-data-stuff/gotowe-animals/ /var/svc/schronisko/main/src/client/public/img/animals

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
npm i --prefix=main/src/client

echo 'restart svc'
sudo systemctl restart schronisko-backend.service

echo 'RUN sudo journalctl -u schronisko-backend.service --follow'