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
echo 'npm i client'
npm i --prefix=main/src/client
echo 'replacing "DEV = 1" with "DEV = 0" in main/src/server/app.module.ts'
sed -i "s/DEV = 1/DEV = 0/" main/src/server/app.module.ts
echo 'replacing "DEV = 1" with "DEV = 0" in main/src/client/api.ts'
sed -i "s/DEV = 1/DEV = 0/" main/src/client/api.ts
echo 'replacing "DEV = 1" with "DEV = 0" in main/src/server/main.ts'
sed -i "s/DEV = 1/DEV = 0/" main/src/server/main.ts
echo 'restart svc'
sudo systemctl restart schronisko-backend.service
echo 'sudo journalctl -u schronisko-backend.service --follow'
