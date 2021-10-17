set -e
echo 'replacing i515358 with postgres in prisma/.env'
sed -i s/i515358/postgres/ prisma/.env
echo 'npm i '
npm i
echo 'npm i prisma'
npm i --prefix=prisma
echo 'prisma push, seed'
npm run push --prefix=prisma
npm run seed --prefix=prisma
echo 'npm i main'
npm i --prefix=main
echo 'restart svc'
sudo systemctl restart schronisko-backend.service
echo 'sudo journalctl -u schronisko-backend.service --follow'
