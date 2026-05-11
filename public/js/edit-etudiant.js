// ---------------Jorenso-------------------
requireAuth();

const form = document.getElementById('formEdit');
const message = document.getElementById('message');

// Récupère l'ID dans l'URL (?id=1)
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

function showMessage(text, isError = false) {
    message.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

// ---------------Jorenso-------------------
// Charge l'étudiant et remplit le formulaire
async function chargerDonnees() {
    try {
        const res = await apiFetch('/etudiant');
        const etudiants = await res.json();

        const etudiant = etudiants.find(e => e.id_etudiant == id);

        if (!etudiant) throw new Error('Étudiant introuvable');

        document.getElementById('nom').value = etudiant.nom || '';
        document.getElementById('prenom').value = etudiant.prenom || '';
        document.getElementById('email').value = etudiant.email || '';
        document.getElementById('programme').value = etudiant.programme || '';

    } catch (err) {
        showMessage(err.message, true);
    }
}

// ---------------Jorenso-------------------
// Modification de l'étudiant
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nom = document.getElementById('nom').value.trim();
    const prenom = document.getElementById('prenom').value.trim();
    const email = document.getElementById('email').value.trim();
    const programme = document.getElementById('programme').value.trim();

    try {
        const res = await apiFetch('/etudiant/' + id, {
            method: 'PUT',
            body: JSON.stringify({ id_etudiant: parseInt(id), nom, prenom, email, programme })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Erreur lors de la modification');

        showMessage(data.message);
        setTimeout(() => { window.location.href = '/etudiants.html'; }, 800);

    } catch (err) {
        showMessage(err.message, true);
    }
});

if (!id) {
    showMessage("ID de l'étudiant manquant", true);
} else {
    chargerDonnees();
}
