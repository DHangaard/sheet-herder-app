import { useContext } from 'react'
import { AuthContext, AuthActionsContext } from './authContext'

export function useAuth() {
    return useContext(AuthContext);
}

export function useAuthActions() {
    return useContext(AuthActionsContext);
}