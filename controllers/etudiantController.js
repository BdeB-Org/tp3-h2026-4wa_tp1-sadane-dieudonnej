const db = require('../config/database');

//-------Jorenso---------

//Get tous les étudiants
exports.getEtudiant = (req, res)=> {
    db.all('SELECT * FROM etudiant', (err,rows) => {
        res.json(rows);
        if (err) {
            return res.status(500).json({ erreur: err.message });
        }
    });
};
//Par Jorenso
// Post ajoute un étudiant

exports.addEtudiant = (req, res) => {
    const { id_etudiant, nom, prenom, email, programme} = req.body;
    db.run(
        "INSERT INTO etudiant (id_etudiant, nom, prenom, email, programme) VALUES (?,?,?,?,?)",
        [ id_etudiant, nom, prenom, email, programme],
        function(err){
            if (err){
                console.log(err);
                return res.status(500).json({erreur:err.message});
            }

            res.json({
                message:"Étudiant ajouté",
                id:this.lastID
            });
        }
    );
};

// ---------------Jorenso-------------------
// UPDATE projet

exports.updateEtudiant = (req, res) => {
    const id = req.params.id;
    const { id_etudiant, nom, prenom, email, programme} = req.body;

    db.run(
        'UPDATE etudiant SET id_etudiant=?, nom=?, prenom=?, email=?, programme=? WHERE id_etudiant=?',
        [id_etudiant, nom, prenom, email, programme, id],
        function(err){
            
            if(err){
                return res.status(500).json({ erreur:err.message});
            }

            res.json({
                message: "Étudiant modifié",
                id: id
            });
        }
    );
};

exports.deleteEtudiant = (req, res)=> {
    const id = req.params.id;

    //Vérifie que l'ID est fourni
    if(!id) {
        return res.status(400).json({ message: "ID manquant"});
    }

    //Execute la requête SQL avec callback
    db.run(
        'DELETE FROM etudiant WHERE id_etudiant = ?',
        [id],
        function(err){
            if (err) {
                console.error(err);
                return res.status(500).json({erreur: err.message});
            }
            
            //Vérifie si une ligne a été supprimé
            if (this.changes ===0) {
                return res.status(404).json({message: "Aucun étudiant trouvé avec cet ID"});
            }

            res.json({message: "Étudiant supprimé", id: id});
        }
    );
};