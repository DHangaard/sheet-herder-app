const BASE_URL = 'https://sheet-herder-api.dhangaard.dk/api/v1/';

export async function login(credentials) {
    const response = await fetch(BASE_URL + 'auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    if (!response.ok) throw new Error('Could not login');
    const { token } = await response.json();
    localStorage.setItem('token', token);
    return token;
}

export function logout() {
    localStorage.removeItem('token');
}

export function getToken() {
    return localStorage.getItem('token');
}

export function loggedIn() {
    return getToken() != null && !isTokenExpired();
}

export function isTokenExpired() {
    const token = getToken();
    if (!token) return true;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 < Date.now();
    } catch {
        // Malformed or tampered token — treat as expired
        return true;
    }
}

export function buildOptions(method, addToken, body) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' }
    };
    if (addToken && loggedIn()) {
        options.headers['Authorization'] = `Bearer ${getToken()}`;
    }
    if (body) {
        options.body = JSON.stringify(body);
    }
    return options;
}