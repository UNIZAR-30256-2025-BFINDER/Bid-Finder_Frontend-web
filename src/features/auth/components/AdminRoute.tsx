import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../services/authService';

interface AdminRouteProps {
    children: React.ReactElement;
}

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