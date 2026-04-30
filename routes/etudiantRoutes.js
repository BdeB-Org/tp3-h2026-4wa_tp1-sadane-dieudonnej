const express = require("express");
const router = express.Router();
const etudiantController = require("../controllers/etudiantController");
// ---------------Jorenso-------------------

// GET
router.get("/etudiant", etudiantController.getEtudiant);
// ---------------Jorenso-------------------

// POST
router.post("/etudiant", etudiantController.addEtudiant);
// ---------------Jorenso-------------------

// UPDATE
router.put("/etudiant/:id", etudiantController.updateEtudiant);
// ---------------Jorenso-------------------

// DELETE
router.delete("/etudiant/:id", etudiantController.deleteEtudiant);

module.exports = router;