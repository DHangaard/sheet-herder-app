import { useState } from 'react';
import { AuthContext, AuthActionsContext } from './authContext';
import { login as loginService, logout as logoutService, getToken, isTokenExpired } from '../../services/authService';

function decodeToken(token) {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return { id: payload.id, username: payload.sub };
    } catch {
        // Malformed or tampered token — treat as unauthenticated
        return null;
    }
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(() => {
        const token = getToken();
        if (!token || isTokenExpired()) {
            logoutService();
            return null;
        }
        return decodeToken(token);
    });

    async function login(credentials) {
        const token = await loginService(credentials);
        setCurrentUser(decodeToken(token));
    }

    function logout() {
        logoutService();
        setCurrentUser(null);
    }

    return (
        <AuthContext.Provider value={{ currentUser, isLoggedIn: currentUser !== null }}>
            <AuthActionsContext.Provider value={{ login, logout }}>
                {children}
            </AuthActionsContext.Provider>
        </AuthContext.Provider>
    );
}
