const express = require("express");
const app = express();
const projetRoutes = require("./routes/projetRoutes");
const etudiantRoutes = require("./routes/etudiantRoutes");

app.use(express.json());
app.use("/", projetRoutes);
app.use ("/", etudiantRoutes);
app.listen(3000, () => {
console.log("Serveur lancé sur http://localhost:3000");
});