# Stellungnahme (13.6.24):

Das ist jetzt der zweite Angriff von meinem Server aus, jemand muss feindliche Software installiert haben.

Bitte löschen Sie alle Daten auf dem Server und setzen die Server neu auf.

Ich weiß nicht, wie der Server geentert sein soll. Ich hatte am 11.6.24 folgende Status von afw:

sudo ufw status
Status: active

To Action From

---

22/tcp ALLOW Anywhere
80/tcp ALLOW Anywhere
443 ALLOW Anywhere
22/tcp (v6) ALLOW Anywhere (v6)
80/tcp (v6) ALLOW Anywhere (v6)
443 (v6) ALLOW Anywhere (v6)

Wenn der Server neu aufgesetzt ist, werde ich eine Zwei-Faktor-Authentifizierung für ssh einrichten.

Mit freundlichen Grüßen

Eckhard Hagemeier

# Stellungnahme (11.6.24):

Ich habe den Server gemietet, um darauf eine NextJs-Anwendung laufen zu lassen. Den Zugang habe ich über SSH eingerichtet, anschließend, habe ich auf dem Server ufw installiert und aktiviert. Weitere Sicherungsmaßnahmen habe ich noch nicht eingerichtet. Ich habe zum Test eine index.html hochgeladen, die auf gelaufen ist.
Auf dem Server liegt also nur eine Mini-Testanwendung.
Natürlich werde ich alles mir Mögliche tun, um ein Entern des Servers zu verhindern.
Bitte starten Sie den Server neu und setzen mich darüber in Kenntnis. Die Daten können ausnahmslos gelöscht werden.
Welche Maßnahmen soll ich ihrer Meinung nach ergreifen, um den Server besser abzusichern?
Gibt es eine log-Datei, die ich einsehen kann, um zu sehen, wie der Angriff durchgeführt wurde?
Mit freundlichen Grüßen
Eckhard Hagemeier

### an attemp to brute-force attack

account passwords over SSH/FTP by a machine in your domain or in your network
has been detected. Attached are the host who attacks and time / date of
activity. Please take the necessary action(s) to stop this activity
immediately. If you have any questions please reply to this email.

Host of attacker: 94.16.109.36 => eckserv.de => eckserv.de  
Responsible email contacts: [abuse@eckserv.de](mailto:abuse@eckserv.de), [abuse@netcup.de](mailto:abuse@netcup.de)  
Attacked hosts in our Network: 37.228.159.142, 37.228.156.95, 37.228.154.97,
37.228.155.120, 185.39.221.34, 178.250.15.151

Logfile entries (time is CE(S)T):  
Thu Jun 13 10:08:59 2024: user: root service: ssh target: 37.228.154.97 source:
94.16.109.36  
Thu Jun 13 10:08:50 2024: user: root service: ssh target: 37.228.156.95 source:
94.16.109.36  
Thu Jun 13 10:07:59 2024: user: root service: ssh target: 37.228.154.97 source:
94.16.109.36  
Thu Jun 13 10:07:50 2024: user: root service: ssh target: 37.228.156.95 source:
94.16.109.36  
Thu Jun 13 10:06:59 2024: user: ivan service: ssh target: 37.228.154.97 source:
94.16.109.36  
Thu Jun 13 10:06:50 2024: user: ivan service: ssh target: 37.228.156.95 source:
94.16.109.36  
Thu Jun 13 10:05:49 2024: user: moodle service: ssh target: 37.228.154.97
source: 94.16.109.36  
Thu Jun 13 10:05:40 2024: user: moodle service: ssh target: 37.228.156.95
source: 94.16.109.36  
Thu Jun 13 10:00:39 2024: user: public service: ssh target: 37.228.154.97
source: 94.16.109.36  
Thu Jun 13 09:59:50 2024: user: public service: ssh target: 37.228.156.95
source: 94.16.109.36  
Mon Jun 10 03:26:10 2024: user: root service: ssh target: 37.228.155.120 source:
94.16.109.36  
Mon Jun 10 03:25:20 2024: user: ubuntu service: ssh target: 37.228.155.120
source: 94.16.109.36  
Mon Jun 10 03:24:30 2024: user: minecraft service: ssh target: 37.228.155.120
source: 94.16.109.36  
Mon Jun 10 03:23:30 2024: user: root service: ssh target: 37.228.155.120
source: 94.16.109.36  
Mon Jun 10 03:21:00 2024: user: root service: ssh target: 37.228.155.120
source: 94.16.109.36  
Sun Jun 9 13:49:34 2024: user: root service: ssh target: 178.250.15.151 source:
94.16.109.36  
Sun Jun 9 13:49:29 2024: user: root service: ssh target: 185.39.221.34 source:
94.16.109.36  
Sun Jun 9 13:49:17 2024: user: root service: ssh target: 37.228.159.142 source:
94.16.109.36

# 23.5.24 netcup domain einrichten:

rDNS Eintrag v2202405163731269256.bestsrv.de ersetzen durch eckserv.de
ip: 94.16.109.36/22
Unter destination ersetze ich die bisherige Adresse 46.38.243.234 durch 94.16.109.36 (ich habe den port weggelassen, weiß nicht, ob das richtig ist)
http://eckserv.de/ kann jetzt aufgerufen werden.
http://94.16.109.36/
http://eckserv.de/

cd /etc/apache2/sites-available // hier werden die Dateien erzeugt / abgelegt, um dann in sites-enabled kopiert zu werden, so ist immer noch eine Datei vorhanden, wenn die Datei in sites-enabled gelöscht wird

cd /var/log/apache2/
su - // weil nur als root zugänglich
/var/log/apache2# ls
/var/log/apache2# ls -l
/var/log/apache2# tail hrothgar-access.log

sudo systemctl reload apache2
sudo systemctl stop apache2
sudo systemctl start apache2
sudo systemctl disable apache2#

Trevor Sawler
Setting up a secure instance of Ubuntu 20.04 with Caddy, NGINX, Apache, PHP, MariaDB, PostgreSQL, Redis, and more
