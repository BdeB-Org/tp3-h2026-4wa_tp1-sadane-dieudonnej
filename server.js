const express = require("express");
//Ajout de app Cross Origin Ressource Sharing permet de sécurisé des navigateurs qui contrôle le droit d'accès à une API
const cors = require('cors');
const authRoutes = require('./routes/authRoutes')
const projetRoutes = require("./routes/projetRoutes");
const etudiantRoutes = require("./routes/etudiantRoutes");

const app = express();

//app Cross Origin Ressource Sharing.
app.use(cors());
app.use(express.json());

// Sert les fichiers HTML/CSS/JS du dossier public/
app.use(express.static('public'));

app.use('/auth', authRoutes);
app.use("/", projetRoutes);
app.use ("/", etudiantRoutes);

//Ligne de code serveur Permet de démarrer le serveur local sur le port 3000 pour accéder au site.
app.listen(3000, () => {
console.log("Serveur lancé sur http://localhost:3000");
});