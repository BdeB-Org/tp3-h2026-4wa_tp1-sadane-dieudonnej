// ---------------Edgar-------------------
requireAuth();

const form = document.getElementById('formAjout');
const tbody = document.getElementById('tbodyProjets');
const message = document.getElementById('message');

// Affiche un message de succès ou d'erreur
function showMessage(text, isError = false) {
    message.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

// Échappe les caractères HTML pour éviter les injections
function escapeHtml(value) {
    if (value === null || value === undefined) return '-';
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

// ---------------Edgar-------------------
// Charge tous les projets depuis l'API
async function chargerDonnees() {
    document.getElementById('champRecherche').value = '';

    try {
        const res = await apiFetch('/projets');
        const projets = await res.json();
        afficherDonnees(projets);
    } catch (err) {
        showMessage(err.message, true);
    }
}

// ---------------Edgar-------------------
// Affiche les projets dans le tableau
function afficherDonnees(projets) {
    tbody.innerHTML = '';

    if (projets.length === 0) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 7;
        td.textContent = 'Aucun projet trouvé.';
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
    }

    projets.forEach(projet => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${escapeHtml(projet.id_projet)}</td>
            <td>${escapeHtml(projet.titre)}</td>
            <td>${escapeHtml(projet.description)}</td>
            <td>${escapeHtml(projet.date_projet)}</td>
            <td>${escapeHtml(projet.id_etudiant)}</td>
            <td>${escapeHtml(projet.id_cours)}</td>
            <td>
                <a class="btn-link" href="/edit.html?id=${projet.id_projet}">Modifier</a>
                <button class="danger" onclick="supprimerDonnee(${projet.id_projet})">Supprimer</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// ---------------Edgar-------------------
// Recherche par titre dans la liste
async function rechercherDonnees() {
    const texte = document.getElementById('champRecherche').value.trim().toLowerCase();

    if (texte === '') {
        await chargerDonnees();
        return;
    }

    try {
        const res = await apiFetch('/projets');
        const projets = await res.json();
        const resultats = projets.filter(p => p.titre.toLowerCase().includes(texte));
        afficherDonnees(resultats);
    } catch (err) {
        showMessage(err.message, true);
    }
}

// ---------------Edgar-------------------
// Ajout d'un projet
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const titre = document.getElementById('titre').value.trim();
    const description = document.getElementById('description').value.trim();
    const date_projet = document.getElementById('date_projet').value;
    const id_etudiant = document.getElementById('id_etudiant').value;
    const id_cours = document.getElementById('id_cours').value;

    try {
        const res = await apiFetch('/projets', {
            method: 'POST',
            body: JSON.stringify({ titre, description, date_projet, id_etudiant: parseInt(id_etudiant), id_cours: parseInt(id_cours) })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.erreur || 'Erreur lors de l\'ajout');

        form.reset();
        showMessage('Projet ajouté avec succès !');
        await chargerDonnees();

    } catch (err) {
        showMessage(err.message, true);
    }
});

// ---------------Edgar-------------------
// Suppression d'un projet
async function supprimerDonnee(id) {
    if (!confirm(`Voulez-vous vraiment supprimer le projet #${id} ?`)) return;

    try {
        const res = await apiFetch('/projets/' + id, { method: 'DELETE' });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Erreur lors de la suppression');

        showMessage(data.message);
        await chargerDonnees();

    } catch (err) {
        showMessage(err.message, true);
    }
}

chargerDonnees();
