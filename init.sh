set -e

echo 'force making a symlink from ~/www-data-stuff/img/ to /var/svc/schronisko/images'
rm -rf /var/svc/schronisko/images/img
ln -sf ~/www-data-stuff/img/ /var/svc/schronisko/images

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

echo 'npm ci server'
npm i --prefix=server

echo 'restart services'
sudo systemctl restart schronisko-backend.service

echo 'RUN sudo journalctl -u schronisko-backend.service --follow'