const BASE_URL = 'https://sheet-herder-api.dhangaard.dk/api/v1/';

export async function register(credentials) {
    const response = await fetch(BASE_URL + 'auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
    }
}