Deployen einer NextJs-App auf eckserv.de

Im wesentlichen folge ich der Anleitung unter:
How to Deploy a Next.js App on Ubuntu with Nginx and Let’s Encrypt:

- https://www.slingacademy.com/article/how-to-deploy-a-next-js-app-on-ubuntu-with-nginx-and-lets-encrypt/
  Gut zum Anschauen ist auch ByteGrad Deploy your Next.js app to a VPS (EASY!) - YouTube:
- https://www.youtube.com/watch?v=0rIak4Tc624&t

# Repository anlegen bei github

Ergebnis bei github:
echo "# neilcummingsnextjscourse" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/EckiHag/neilcummingsnextjscourse.git
git push -u origin main

Jetzt clonen:
ggf git installieren:
sudo apt update
sudo apt install git
git --version
Ergebnis: git version 2.39.2

dann:
man legt das Verzeichnis nicht an, das geschieht im Clone-Befehl
git clone https://github.com/EckiHag/neilcummingsnextjscourse.git

# App vorbereiten

in das Verzeichnis wechseln: cd neilcummingsnextjscourse
npm install
npm run build
npm install -g pm2
pm2 start npm --name "neilcummingsnextjscourse" -- start
pm2 status

to stop the app run: pm2 stop neilcummingsnextjscourse
to restart the app run: pm2 restart neilcummingsnextjscourse

# NodeJs installieren:

------------------------------------------------------ installing nvm Anleitung siehe unter: https://github.com/nvm-sh/nvm?tab=readme-ov-file#install--update-script
falls curl noch nicht installiert wurde:
sudo apt update
sudo apt install curl

Installation im Verzeichnis: /home/ecklin
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
Aktuellen Shell-Sitzung neu laden:
source ~/.bashrc

nvm -v
Ergebnis: 0.39.7
nvm install node

node -v
Ergbnis: v22.3.0
npm -v
Ergebnis: 10.8.1

--------------------- clonen der Dateien von github zum Server------------------
gehe in das Verzeichnis, wo die Anwendung sein soll

git clone https://github.com/EckiHag/neilcummingsnextjscourse.git

ls

---

npm run build

npm run start

# Configure Nginx

Create a new configuration file for your domain:
sudo nano /etc/nginx/sites-available/eckserv.de
Add the following to the recently created file:

server {
client_max_body_size 64M;
listen 80;
server_name eckserv.de www.eckserv.de;

        location / {
                proxy_pass             http://127.0.0.1:3000;
                proxy_read_timeout     60;
                proxy_connect_timeout  60;
                proxy_redirect         off;

                # Allow the use of websockets
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }

}

Enable the file by creating a link from it to the sites-enabled directory, which Nginx reads from during startup:
sudo ln -s /etc/nginx/sites-available/eckserv.de /etc/nginx/sites-enabled/

To make sure the configuration file has correct syntax, run the command below:
sudo nginx -t

Restart your Nginx server:
sudo systemctl restart nginx

ggf:
to stop the app run: pm2 stop neilcummingsnextjscourse
to restart the app run: pm2 restart neilcummingsnextjscourse

# Setting Up Let’s Encrypt SSL (HTTPS)

1. Install cerbot and its plugins:
   sudo apt install certbot python3-certbot-nginx

2. Obtain an SSL certificate by performing the command below:
   sudo certbot --nginx -d eckserv.de -d www.eckserv.de
   Ergebnis:
   Requesting a certificate for eckserv.de and www.eckserv.de
   Successfully received certificate.
   Certificate is saved at: /etc/letsencrypt/live/eckserv.de/fullchain.pem
   Key is saved at: /etc/letsencrypt/live/eckserv.de/privkey.pem
   This certificate expires on 2024-09-23.
   These files will be updated when the certificate renews.
   Certbot has set up a scheduled task to automatically renew this certificate in the background.
   Deploying certificate
   Successfully deployed certificate for eckserv.de to /etc/nginx/sites-enabled/eckserv.de
   Successfully deployed certificate for www.eckserv.de to /etc/nginx/sites-enabled/eckserv.de
   Congratulations! You have successfully enabled HTTPS on https://eckserv.de and https://www.eckserv.de

---

If you like Certbot, please consider supporting our work by:

- Donating to ISRG / Let's Encrypt: https://letsencrypt.org/donate
- Donating to EFF: https://eff.org/donate-le

---

3. The final task is to restart your Nginx server:
   sudo systemctl restart nginx

Now you can see your Next.js app online with https instead of http:

- https://eckserv.de

# How to Update/Upgrade Your Next.js App

1. Push it to Github.
   Wie geht das?
   a) git add .
   b) git commit -m "login register Formulare"
   c) git push -u origin main
2. Then, login to your server via SSH, navigate to your project folder, and run:
   ssh -p 2024 ecklin@94.16.109.36
   Otto*Geh-I#de+Garte*
   cd neilcummingsnextjscourse
   git pull

3. Then:
   git pull
   npm install
   -> im Falle von Änderung im schema.prisma muss auch auf dem Server "npx prisma generate" ausgeführt werden
   npm run build
   pm2 restart neilcummingsnextjscourse --update-env
   pm2 restart neilcummingsnextjscourse

npx prisma studio

Hochladen der .env Datei: Achtung bei dem Leerzeichen muss ein Backslash sein
scp -P 2024 C:\Users\eu\Documents Backslash_NextJsApps\CummingsEofSec2\.env ecklin@94.16.109.36:/home/ecklin/neilcummingsnextjscourse

chmod 600 .env

pm2 restart neilcummingsnextjscourse --update-env

# Installing Php

Installiere ich vorerst nicht.

# Installing MariaDB / MySql

Installiere ich vorerst nicht. Ich richte eine Datenbank bei Netcup/Webhosting ein.
