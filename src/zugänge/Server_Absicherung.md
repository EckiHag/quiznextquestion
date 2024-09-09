Severabsicherung und Deployment

# Filezilla

Folgende Rechte bestehen:
ls -ld /var/www/html
Ergebnis
drwxr-xr-x 2 root root 4096 23. Jun 16:46 /var/www/html
Diese ändere ich jetzt:
sudo addgroup ecklin
sudo usermod -aG ecklin ecklin
Ergebnis:
drwxr-xr-x 2 ecklin ecklin 4096 23. Jun 16:46 /var/www/html
sudo systemctl restart nginx

Nochmal kritisieren:
sudo visudo
fritz ALL=(ALL) NOPASSWD:ALL

# Serverabsicherung:

Nach folgenden videos:

PlayList: https://www.youtube.com/playlist?list=PLhvaM7uJr1PA89sEfrL74abQ4kZGC3Js9

1. SSH auf Linux Server sicher einrichten - Linux Server absichern - Teil 1 mit Tarpit einrichten
   https://www.youtube.com/watch?v=C5l_Iuic5hs&list=PLhvaM7uJr1PA89sEfrL74abQ4kZGC3Js9&index=1
   Befehle: https://saintofsinner.de/ssh-auf-linux-servern-grundlegend-absichern/
2. Faktor Authentifizierung (SSH) und sichere Passwörter generieren - Linux Server absichern - Teil 2
   https://www.youtube.com/watch?v=MNQxg7uyE3I&list=PLhvaM7uJr1PA89sEfrL74abQ4kZGC3Js9&index=2
3. Server absichern - Paketverwaltung und automatische Updates
   https://www.youtube.com/watch?v=REFFAkkt7LY&list=PLhvaM7uJr1PA89sEfrL74abQ4kZGC3Js9&index=3
   ...
4. (7)Firewall auf Ubuntu/Debian/.. Server verwalten - ufw für Anfänger (Server Administration)
   https://www.youtube.com/watch?v=hX4paeZqLDE&list=PLhvaM7uJr1PA89sEfrL74abQ4kZGC3Js9&index=7
   Befehle: https://saintofsinner.de/ufw-die-firewall-die-jeder-kann/

Wie ist der Server abgesichert:
a) Zugang über root ist verwehrt
b) Zugang über pw ist verwehrt
c) Zugang über user ecklin mit publicKey: der Key ist auf dem Server und dem Client / mit dem Programm puttygen wurde der Schlüssel in eine \*.ppk-Datei für fileZilla konvertiert
d) ufw:
sudo apt update
sudo ufw status
sudo ufw allow ssh
sudo ufw allow 2024/tcp
sudo ufw deny 22/tcp
sudo ufw disable && sudo ufw enable && sudo ufw status
Status: active

# Stand sudo ufw status 23.6.24

Status: active

     To                         Action      From
     --                         ------      ----

[ 1] 22/tcp DENY IN Anywhere
[ 2] 2024/tcp ALLOW IN Anywhere
[ 3] Nginx Full ALLOW IN Anywhere
[ 4] 22/tcp (v6) DENY IN Anywhere (v6)
[ 5] 2024/tcp (v6) ALLOW IN Anywhere (v6)
[ 6] Nginx Full (v6) ALLOW IN Anywhere (v6)

zum testen: telnet 94.16.109.36 2024
Weitere nützliche Befehle
uws limit 2024 (überprüfen: nur 6 Zugriffe innerhalb von 30 Sekunden)

# Öfnen Ports

sudo ufw allow 80/tcp comment http
sudo ufw allow 443/tcp comment https
sudo ufw disable && sudo ufw enable && sudo ufw status numbered

npm install -g pm2
pm2 start npm --name "neilcummingsnextjscourse" -- run start
pm2 logs neilcummingsnextjscourse

# Updaten

sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist-upgrade

# Passwörter generieren

sudo apt install pwgen

pwgen
pwgwn -Byns 20 1
Password-Manager Bitwarden KeyPassXC

# Generieren eines Schlüssels auf dem server

ssh-keygen -t rsa -b 4096 -C "root@94.16.109.36"

# Generieren eines Schlüssels auf dem client

In einem Terminal:
ssh-keygen -t rsa -b 2048 -f ~/.ssh/id_rsa

<!-- Scheinbar ich vor auf dem Server den Schlüssel mit dem Befehl
sudo ssh-keygen -b 4096 -t rsa -f .ssh/ecklinschl
Passphrase bei Authentification mit keyfile: Otto*Geh-I#de+Garte*
erzeugt, dieser Schhlüssel wird wohl nicht mehr gebraucht! Ausprobieren und löschen! -->

Mit dem Ergebnis:
Generating public/private rsa key pair.
C:\Users\eu/.ssh/id_rsa already exists.
Overwrite (y/n)? y
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in C:\Users\eu/.ssh/id_rsa
Your public key has been saved in C:\Users\eu/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:23YKFJhqVx/kGeHMiDR+JATIUmeL4EqleWsZeIDBWrY eu@Mekong
The key's randomart image is:
+---[RSA 2048]----+
|==.o+o= . +. |
|+o@+ + B B o |
|.X.=. = = B |
|+ E +. o o . |
|. +o . S . |
| .. . . o |
| o o . |
| o o |
| . |
+----[SHA256]-----+

# How to Deploy a Next.js App on Ubuntu with Nginx and Let’s Encrypt

https://www.slingacademy.com/article/how-to-deploy-a-next-js-app-on-ubuntu-with-nginx-and-lets-encrypt/
