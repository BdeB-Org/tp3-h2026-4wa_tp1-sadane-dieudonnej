const db = require('../config/database');

// ---------------Edgar-------------------
// GET tous les projets
exports.getProjets = (req, res) => {
    db.all('SELECT * FROM projet', (err, rows) => {
        if (err) {
            return res.status(500).json({ erreur: err.message });
        }
        res.json(rows);
    });
};

// ---------------Edgar-------------------
// POST ajouter un projet
exports.addProjet = (req, res) => {
    const { titre, description, date_projet, id_etudiant, id_cours } = req.body;

    db.run(
        `INSERT INTO projet (titre, description, date_projet, id_etudiant, id_cours)
         VALUES (?, ?, ?, ?, ?)`,
        [titre, description, date_projet, id_etudiant, id_cours],
        function(err) {
            if (err) {
                return res.status(500).json({ erreur: err.message });
            }

            res.json({
                message: "Projet ajouté",
                id: this.lastID
            });
        }
    );
};

// ---------------Edgar-------------------
// UPDATE projet
exports.updateProjet = (req, res) => {
    const id = req.params.id;
    const { titre, description, date_projet, id_etudiant, id_cours } = req.body;

    db.run(
        `UPDATE projet
         SET titre=?, description=?, date_projet=?, id_etudiant=?, id_cours=?
         WHERE id_projet=?`,
        [titre, description, date_projet, id_etudiant, id_cours, id],
        function(err) {
            if (err) {
                return res.status(500).json({ erreur: err.message });
            }

            res.json({
                message: "Projet modifié",
                id: id
            });
        }
    );
};

// ---------------Edgar-------------------
// DELETE projet
exports.deleteProjet = (req, res) => {
    const id = req.params.id;

    db.run(
        'DELETE FROM projet WHERE id_projet = ?',
        [id],
        function(err) {
            if (err) {
                return res.status(500).json({ erreur: err.message });
            }

            if (this.changes === 0) {
                return res.status(404).json({ message: "Aucun projet trouvé avec cet ID" });
            }

            res.json({
                message: "Projet supprimé",
                id: id
            });
        }
    );
};