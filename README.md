# Site des canards

Bienvenue sur notre site de canards ! Nous avons remplacez les oeuvres par des races de canards. Le groupe ayant codé ce projet est composé de Youssef Kertoubi, Dario Esposito, Erwan Laniray et Erwan Franco.

## Notes

Comme nous avons travaillé à plusieurs, il est probable que le code soit déstructuré bien que fonctionel. Les noms des variables peuvent également changer (exemple, oeuvres et duck correspondent à la même idée).

Notre application permet de :

- Créer un compte et se connecter à ce compte
- Une fois connecté, il est possible d'afficher sur le bot crisp un carousel avec les différents types de canards. Ce carousel possède des boutons qui redirigent vers les pages des canards correspondant.
- Une fois sur la page d'un canard, l'application enregistre automatiquement l'utilisateur qui a consulté la page, le canard consulté ainsi que la date et l'heure de consultation. Un canard est ensuite automatiquement recommandé sur le bot crisp, pour permettre une navigation facile. Un bouton permet d'attribuer une note sur 5 au canard. Cette note est ensuite enregistrée dans la base de données. La note est modifiable.

Pour le bon fonctionnement de l'application, il est nécéssaire de rajouter le token de votre bot crisp dans le fichier .env a la racine de l'application, ainsi que d'ajouter dans le fichier .env.local un secret jwt que vous pouvez generer à l'aide de la commande `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
