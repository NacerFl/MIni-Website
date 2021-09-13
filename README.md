# MIni-Website

Mini site réalisé par Foual Nacer



Inscription
Connexion
Memo


Toutes les routes se trouve dans server.js afin de faciliter la compréhension du code.

routes/memo n'est qu'un simple test
Si la disposition des routes ne convient pas elle peuvent simplement être implémenté dans un fichier routes/memo.js et routes/inscription.js
J'ai préféré tout réunir dans un même fichier




Middleware/flash :
Juste une petite fonction qui permet l'affichage d'erreur ou de succès pour le poste memo (cf. dans header "%= local flash>)
Le systeme d'affichage d'erreur et de succès est fonctionnelle. Pour l'inscription, la connexion et le poste de memo

confif/db :
création et connexion à la database avec datab


Css = j'ai utilisé semantic UI pour faciliter la mise en pages


Note:

Attention le port = 3333

Une fois inscrit et connecté vous avez accès a Accueil avec vos informations ainsi que la possibilité de poster un Memo et de voir les memo poster par d'autres utilisateurs

Je n'ai pas encrypter le mdp par soucis de temps, mais il peut être facilement implémenté avec bcrypt.
