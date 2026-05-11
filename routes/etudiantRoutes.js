const express = require("express");
const router = express.Router();

const etudiantController = require('../controllers/etudiantController');
//Vérification des tokens
const verifyToken = require('../middleware/authMiddleWare');

// ---------------Jorenso-------------------

// Définit les routes liées aux étudiants et appelle une fonction du controller. Get permet de lire les informations du tableau.
router.get('/etudiant', verifyToken, etudiantController.getEtudiant);
// ---------------Jorenso-------------------

// POST Ajoute un nouveau étudiant
router.post('/etudiant', verifyToken, etudiantController.addEtudiant);
// ---------------Jorenso-------------------

// UPDATE mise à jour d'un étudiant
router.put("/etudiant/:id", verifyToken, etudiantController.updateEtudiant);
// ---------------Jorenso-------------------

// DELETE supprime un étudiant
router.delete('/etudiant/:id', verifyToken, etudiantController.deleteEtudiant);

module.exports = router;