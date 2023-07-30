set -e

echo 'force making a symlink from ~/www-data-stuff/gotowe-animals/ to static animals'
ln -sf ~/www-data-stuff/gotowe-animals/ /var/svc/schronisko/main/src/client/public/img

echo 'replacing pw with postgres in prisma/.env'
sed -i s/pw/postgres/ prisma/.env

echo 'copying import data from ~/'
cp ~/animals-for-vps.json prisma/
cp ~/animal-images-for-vps.json prisma/

echo 'npm i '
npm i

echo 'npm i prisma'
npm i --prefix=prisma

echo 'prisma push'
npm run push --prefix=prisma
echo 'prisma seed'
# npm run seed:vps --prefix=prisma

echo 'npm i main'
npm i --prefix=main

echo 'npm i client'
npm i --prefix=main/src/client

echo 'restart svc'
sudo systemctl restart schronisko-backend.service

echo 'RUN sudo journalctl -u schronisko-backend.service --follow'
