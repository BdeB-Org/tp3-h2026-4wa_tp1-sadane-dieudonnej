const sqlite3 = require('sqlite3').verbose(); // require('sqlite3') permet d'importer la bibliothèque SQLite dans le projet Node.js
//.verbose permet de détaillés les messages d'erreur.
const path = require('path');

// ---------------Edgar-------------------

//Permet de lier (ouvrir) la base de données SQLite.
const db = new sqlite3.Database(
    path.resolve(__dirname, '../TP1.db')
);

//Permet d'utiliser la connexion ailleurs.
module.exports = db;

//Ce fichier contient les fichiers de configuration du projet.