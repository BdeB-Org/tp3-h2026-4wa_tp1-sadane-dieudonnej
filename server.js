const express = require("express");
const app = express();

// Permet de référencer le Cross-Origin Resource Sharing
const cors = require("cors");
app.use(cors());

//Lignes de code pour les routes.
const projetRoutes = require("./routes/projetRoutes");
const etudiantRoutes = require("./routes/etudiantRoutes");

//Lignes de code pour les app
app.use(express.json());
app.use("/", projetRoutes);
app.use ("/", etudiantRoutes);
app.listen(3000, () => {
console.log("Serveur lancé sur http://localhost:3000");
});