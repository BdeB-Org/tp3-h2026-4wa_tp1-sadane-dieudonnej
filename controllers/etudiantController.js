const db = require('../config/database');

//-------Jorenso---------
// Les controllers contiennent la logique de l'application. En gros ça permet de traiter les requêtes reçus.
// Executer les requêtes vers la base de données. 
// Préparer la réponse envoyée au client. En gros le cerveau de l'Application Progamming Interface.


// Post permet de créer une nouvelle rangée d'étudiant.
exports.addEtudiant = (req, res) => {
    const { id_etudiant, nom, prenom, email, programme, password} = req.body;
    //Permet de rentrer des informations obligatoires.
    if(!nom || !programme || !password) {
        return res.status(400).json({
            message: " Tous les champs sont requis"
        });
    }

    db.run( //exécute insert
        "INSERT INTO etudiant (id_etudiant, nom, prenom, email, programme, password) VALUES (?,?,?,?,?,?)",
        [ id_etudiant, nom, prenom, email, programme, password],
        function(err){
            if (err){console.log(err);return res.status(500).json({message: "erreur insertion" });
            }

            res.status(201).json({
                message:"Étudiant ajouté",
                id:this.lastID //retourne l'id généré.
            });
        }
    );
};

//Get permet de lire les informations dans les tableaux.
exports.getEtudiant = (req, res) => {
    db.all('SELECT * FROM etudiant', (err,rows) => { // db.all permet d'exécuter la requête. Rows contient les résulats

        if (err) {return res.status(500).json({ erreur: err.message });}

        res.json(rows); // renvoie les données au client.
    });
};




//Permet de lire une table
exports.getEtudiantById = (req, res) => {
    db.get(
        "SELECT * FROM etudiant WHERE id = ?",
        [req.params.id],
        (err, row) => {
            if (err) return res.status(500).json({message: err.message});
            if(!row) return res.status(404).json({message: 'Étudiant non trouvé'});
        }
    );
};

// ---------------Jorenso-------------------
// UPDATE permet de mettre à jour une information d'un étudiant.

exports.updateEtudiant = (req, res) => {
    const id = req.params.id;
    const { id_etudiant, nom, prenom, email, programme, password} = req.body;

    if (!nom || !programme) {
        return res.status(400).json({ message: 'nom et programme sont obligatoires'});
    }

    db.run(
        'UPDATE etudiant SET id_etudiant=?, nom=?, prenom=?, email=?, programme=? WHERE id_etudiant=?',
        [id_etudiant, nom, prenom, email, programme, id],
        function(err){
            if (err) return res.status(500).json({ erreur:err.message});
            if (this.changes === 0) return res.status(404).json({ message: 'Étudiant non trouvé'});


            res.json({
                message: "L'étudiant a été modifié",
                id: id
            });
        }
    );
};

//Permet de supprimer un étudiant dans la base de donné
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
            if (err) {console.error(err); return res.status(500).json({ erreur: err.message});
        }
            
            //Vérifie si une ligne a été supprimé
            if (this.changes ===0) 
                
                { return res.status(404).json({ message: "Aucun étudiant trouvé avec cet ID"}); }

            res.json({message: "Étudiant supprimé", id: id});
        }
    );
};