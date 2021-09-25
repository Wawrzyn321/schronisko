read -p "First change the .env credentials for DB, user is postgres. BTW are certificates uncommented in server?"
set -e
echo 'npm i '
npm i
echo 'npm i prisma'
npm i --prefix=prisma
echo 'prisma push, seed'
npm run push --prefix=prisma
npm run seed --prefix=prisma
echo 'npm i main'
npm i --prefix=main
echo 'mkdir /var/www/schronisko/main/certs && cp certs'
mkdir /var/www/schronisko/main/certs
sudo cp /etc/letsencrypt/live/oto-jest-wawrzyn.pl/cert.pem /var/www/schronisko/main/certs/cert.pem
sudo cp /etc/letsencrypt/live/oto-jest-wawrzyn.pl/privkey.pem /var/www/schronisko/main/certs/key.pem
echo 'restart svc'
sudo systemctl restart schronisko-backend.service
echo 
read -p 'fix types error! vim main/node_modules/next/types/index.d.ts'
sudo journalctl -u schronisko-backend.service | tail -n50
