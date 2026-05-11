// ---------------Edgar-------------------

// Sauvegarde le token dans le localStorage
function saveToken(token) {
    localStorage.setItem('token', token);
}

// Retourne le token sauvegardé
function getToken() {
    return localStorage.getItem('token');
}

// Déconnexion - supprime le token et redirige
function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
}

// Redirige vers login si pas de token
function requireAuth() {
    const token = getToken();
    if (!token) {
        window.location.href = '/login.html';
    }
}

// ---------------Edgar-------------------
// fetch avec le token JWT dans le header
async function apiFetch(url, options = {}) {
    const token = getToken();

    const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {})
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers
    });

    // Si token expiré ou invalide, on déconnecte
    if (response.status === 401 || response.status === 403) {
        logout();
        throw new Error('Session expirée. Veuillez vous reconnecter.');
    }

    return response;
}
