const express = require("express");
//Ajout de cors
const cors = require('cors');
const authRoutes = require('./routes/authRoutes')
const projetRoutes = require("./routes/projetRoutes");
const etudiantRoutes = require("./routes/etudiantRoutes");

const app = express();

//app cors
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use("/", projetRoutes);
app.use ("/", etudiantRoutes);

//Ligne de code serveur
app.listen(3000, () => {
console.log("Serveur lancé sur http://localhost:3000");
});