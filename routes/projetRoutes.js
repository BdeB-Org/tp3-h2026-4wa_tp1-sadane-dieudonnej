const express = require("express");
const router = express.Router();
const projetController = require("../controllers/projetController");
// ---------------Edgar-------------------

// GET
router.get("/projets", projetController.getProjets);
// ---------------Edgar-------------------

// POST
router.post("/projets", projetController.addProjet);
// ---------------Edgar-------------------

// UPDATE
router.put("/projets/:id", projetController.updateProjet);
// ---------------Edgar-------------------

// DELETE
router.delete("/projets/:id", projetController.deleteProjet);

module.exports = router;