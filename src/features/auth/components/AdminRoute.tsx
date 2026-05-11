/**
 * @fileoverview Componente de ruta protegida específica para administradores.
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../services/authService';

interface AdminRouteProps {
    children: React.ReactElement;
}

/**
 * Valida que el usuario esté autenticado y tenga el rol de 'admin'.
 * Si no hay sesión activa, redirige al login.
 * Si hay sesión pero no es administrador, redirige al dashboard.
 */
export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
    if (!authService.isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    const user = authService.getCurrentUser();
    if (!user || user.rol !== 'admin') {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};