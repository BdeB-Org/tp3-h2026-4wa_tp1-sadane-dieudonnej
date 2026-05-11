const express = require("express");
const router = express.Router();
const projetController = require("../controllers/projetController");
const verifyToken = require("../middleware/authMiddleWare");
// ---------------Edgar-------------------

// GET - récupère tous les projets (protégé par token)
router.get("/projets", verifyToken, projetController.getProjets);
// ---------------Edgar-------------------

// POST - ajoute un nouveau projet (protégé par token)
router.post("/projets", verifyToken, projetController.addProjet);
// ---------------Edgar-------------------

// UPDATE - modifie un projet (protégé par token)
router.put("/projets/:id", verifyToken, projetController.updateProjet);
// ---------------Edgar-------------------

// DELETE - supprime un projet (protégé par token)
router.delete("/projets/:id", verifyToken, projetController.deleteProjet);

module.exports = router;