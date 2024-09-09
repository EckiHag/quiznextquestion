Offene Fragen: Wo kann ich das Passwort zum SCP ändern? und wie melde ich mich bei \_screen an?
pwd = print working directory

# Zugang

ssh -p 2024 ecklin@94.16.109.36 ("root" geht nicht, siehe zServerabsicherung.md)

Passphrase bei Authentification mit keyfile:
Otto*Geh-I#de+Garte*

passwd root: R3#!fD5&UeP#pFot
ssh -p 2024 root@94.16.109.36
mit su - gehts zu root /// zurück: su - ecklin
passwd ecklin: E3#!fD5&UeP#plin
ssh -p 2024 ecklin@94.16.109.36
ssh -vvv -p 2024 ecklin@94.16.109.36 hier gibt es Infos, warum etwas nicht klappt

C:\Users\eu\.ssh

# SCP Netcup

Login-Name: 175781
Passwort: aBq926iHSa
Link: https://www.servercontrolpanel.de/SCP/

# System information:

debian 12 (bookworm) - minimal

IP address: 94.16.109.36
Hostname: v2202405163731269256.bestsrv.de

SSH key fingerprints:

256 SHA256:+PtGiP488T66XT1kMLTAZH1iZ2kQMehtfGL+GYD/ZXA (ED25519)
3072 SHA256:/u9FlRjAEbyZX7KhPTDfk7iKvP1J+pCggLrx4HKLMTw (RSA)
256 SHA256:MH3ofJ2bhiwuAm1ZrOU/M0ZYcZQnGLwVtB7gKGe+Nk4 (ECDSA)
256 MD5:c3:b2:67:b5:0b:42:40:3f:e1:bd:df:fb:3a:a7:bb:57 (ED25519)
3072 MD5:cd:cf:5e:48:3e:23:0f:e6:15:20:52:e7:8d:72:ed:9d (RSA)
256 MD5:b7:19:87:dc:9c:1b:b8:19:ef:dd:76:21:76:f3:f8:98 (ECDSA)
