import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginService, logout as logoutService, getToken, isTokenExpired } from '../services/authService';

const AuthContext = createContext(null);
const AuthActionsContext = createContext(null);

function decodeToken(token) {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return { id: payload.id, username: payload.sub };
    } catch {
        // Malformed or tampered token — treat as unauthenticated
        return null;
    }
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const token = getToken();
        if (!token) return;
        if (isTokenExpired()) {
            logoutService();
            return;
        }
        setCurrentUser(decodeToken(token));
    }, []);

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

export function useAuth() {
    return useContext(AuthContext);
}

export function useAuthActions() {
    return useContext(AuthActionsContext);
}