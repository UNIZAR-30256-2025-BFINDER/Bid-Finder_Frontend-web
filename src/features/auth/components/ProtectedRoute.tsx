/**
 * @fileoverview Componente envoltorio para proteger rutas que requieren inicio de sesión.
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../services/authService';

interface ProtectedRouteProps {
    children: React.ReactElement;
}

/**
 * Valida de forma síncrona que el usuario tenga una sesión activa.
 * Si no está autenticado, corta el renderizado y redirige al login.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    if (!authService.isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return children;
};