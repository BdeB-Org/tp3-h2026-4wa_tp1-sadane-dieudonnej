const db = require('../config/database');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const { nom, password} = req.body;

    if(!nom || !password) {
        return res.status(400).json({
            message: "Nom et mot de passe requis"
        });
    }

    db.get (
        "SELECT * FROM etudiant WHERE nom = ? AND password = ?",
        [nom, password], 
        (err, row) => {

            if (err) {
                return res.status(500).json({ message: "Erreur serveur"});
            }

            if (!row) {
                return res.status(401).json({
                    message: "Identifiants invalides"
                });
            }

            const token = jwt.sign (
                { id: row.id, nom: row.nom },
                "secretkey",
                {expiresIn: "3h"}
            );

            res.json({
                message: "Authentification réussi",
                token: token
            });
        }
    );
};