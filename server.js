const express = require("express");
const app = express();
const projetRoutes = require("./routes/projetRoutes");
const etudiantRoutes = require("./routes/etudiantRoutes");
//Ajout de cors
const cors = require("cors");
//Ligne de codes app
app.use(express.json());
app.use("/", projetRoutes);
app.use ("/", etudiantRoutes);
//app cors
app.use(cors());

//Ligne de code serveur
app.listen(3000, () => {
console.log("Serveur lancé sur http://localhost:3000");
});