// ---------------Edgar-------------------
requireAuth();

const form = document.getElementById('formEdit');
const message = document.getElementById('message');

// Récupère l'ID dans l'URL (?id=3)
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

function showMessage(text, isError = false) {
    message.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

// ---------------Edgar-------------------
// Charge le projet et remplit le formulaire
async function chargerDonnees() {
    try {
        const res = await apiFetch('/projets');
        const projets = await res.json();

        const projet = projets.find(p => p.id_projet == id);

        if (!projet) throw new Error('Projet introuvable');

        document.getElementById('titre').value = projet.titre || '';
        document.getElementById('description').value = projet.description || '';
        document.getElementById('date_projet').value = projet.date_projet || '';
        document.getElementById('id_etudiant').value = projet.id_etudiant || '';
        document.getElementById('id_cours').value = projet.id_cours || '';

    } catch (err) {
        showMessage(err.message, true);
    }
}

// ---------------Edgar-------------------
// Modification du projet
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const titre = document.getElementById('titre').value.trim();
    const description = document.getElementById('description').value.trim();
    const date_projet = document.getElementById('date_projet').value;
    const id_etudiant = document.getElementById('id_etudiant').value;
    const id_cours = document.getElementById('id_cours').value;

    try {
        const res = await apiFetch('/projets/' + id, {
            method: 'PUT',
            body: JSON.stringify({ titre, description, date_projet, id_etudiant: parseInt(id_etudiant), id_cours: parseInt(id_cours) })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.erreur || 'Erreur lors de la modification');

        showMessage(data.message);
        setTimeout(() => { window.location.href = '/index.html'; }, 800);

    } catch (err) {
        showMessage(err.message, true);
    }
});

if (!id) {
    showMessage('ID du projet manquant', true);
} else {
    chargerDonnees();
}
