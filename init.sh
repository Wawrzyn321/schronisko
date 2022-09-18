set -e
echo 'replacing I515358 with postgres in prisma/.env'
sed -i s/I515358/postgres/ prisma/.env
echo 'npm i '
npm i
echo 'npm i prisma'
npm i --prefix=prisma
echo 'prisma push, seed'
npm run push --prefix=prisma
npm run seed:vps --prefix=prisma
echo 'npm i main'
npm i --prefix=main
echo 'npm i client'
npm i --prefix=main/src/client
echo 'restart svc'
sudo systemctl restart schronisko-backend.service
echo 'sudo journalctl -u schronisko-backend.service --follow'
