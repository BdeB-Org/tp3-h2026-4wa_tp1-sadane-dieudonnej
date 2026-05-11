// ---------------Jorenso-------------------
requireAuth();

const form = document.getElementById('formAjout');
const tbody = document.getElementById('tbodyEtudiants');
const message = document.getElementById('message');

function showMessage(text, isError = false) {
    message.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

function escapeHtml(value) {
    if (value === null || value === undefined) return '-';
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

// ---------------Jorenso-------------------
// Charge tous les étudiants depuis l'API
async function chargerDonnees() {
    document.getElementById('champRecherche').value = '';

    try {
        const res = await apiFetch('/etudiant');
        const etudiants = await res.json();
        afficherDonnees(etudiants);
    } catch (err) {
        showMessage(err.message, true);
    }
}

// ---------------Jorenso-------------------
// Affiche les étudiants dans le tableau
function afficherDonnees(etudiants) {
    tbody.innerHTML = '';

    if (etudiants.length === 0) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 6;
        td.textContent = 'Aucun étudiant trouvé.';
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
    }

    etudiants.forEach(etudiant => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${escapeHtml(etudiant.id_etudiant)}</td>
            <td>${escapeHtml(etudiant.nom)}</td>
            <td>${escapeHtml(etudiant.prenom)}</td>
            <td>${escapeHtml(etudiant.email)}</td>
            <td>${escapeHtml(etudiant.programme)}</td>
            <td>
                <a class="btn-link" href="/edit-etudiant.html?id=${etudiant.id_etudiant}">Modifier</a>
                <button class="danger" onclick="supprimerDonnee(${etudiant.id_etudiant})">Supprimer</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// ---------------Jorenso-------------------
// Recherche par nom
async function rechercherDonnees() {
    const texte = document.getElementById('champRecherche').value.trim().toLowerCase();

    if (texte === '') {
        await chargerDonnees();
        return;
    }

    try {
        const res = await apiFetch('/etudiant');
        const etudiants = await res.json();
        const resultats = etudiants.filter(e => e.nom.toLowerCase().includes(texte));
        afficherDonnees(resultats);
    } catch (err) {
        showMessage(err.message, true);
    }
}

// ---------------Jorenso-------------------
// Ajout d'un étudiant
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id_etudiant = document.getElementById('id_etudiant').value;
    const nom = document.getElementById('nom').value.trim();
    const prenom = document.getElementById('prenom').value.trim();
    const email = document.getElementById('email').value.trim();
    const programme = document.getElementById('programme').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        const res = await apiFetch('/etudiant', {
            method: 'POST',
            body: JSON.stringify({ id_etudiant: parseInt(id_etudiant), nom, prenom, email, programme, password })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Erreur lors de l\'ajout');

        form.reset();
        showMessage('Étudiant ajouté avec succès !');
        await chargerDonnees();

    } catch (err) {
        showMessage(err.message, true);
    }
});

// ---------------Jorenso-------------------
// Suppression d'un étudiant
async function supprimerDonnee(id) {
    if (!confirm(`Voulez-vous vraiment supprimer l'étudiant #${id} ?`)) return;

    try {
        const res = await apiFetch('/etudiant/' + id, { method: 'DELETE' });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Erreur lors de la suppression');

        showMessage(data.message);
        await chargerDonnees();

    } catch (err) {
        showMessage(err.message, true);
    }
}

chargerDonnees();
