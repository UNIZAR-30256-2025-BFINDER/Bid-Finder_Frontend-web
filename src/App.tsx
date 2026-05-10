import React from 'react';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 
import { MainLayout } from './components/layout/MainLayout';

import { LandingPage } from './features/landing/pages/LandingPage';
import Admin from './features/dashboard/pages/Admin';
import DashBoard from './features/map/pages/DashBoard';
import SubastaDetail from './features/subastas/pages/SubastaDetail';
import RegisterPage from './features/auth/pages/RegisterPage';
import LoginPage from './features/auth/pages/LoginPage';
import { FavoritosPage } from './features/favoritos/pages/FavoritosPage';
import { ProtectedRoute } from './features/auth/components/ProtectedRoute';
import { AdminRoute } from './features/auth/components/AdminRoute';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <LandingPage /> },
        {
          path: 'admin',
          element: (
            <AdminRoute>
              <Admin />
            </AdminRoute>
          ),
        },
        {
          path: 'dashboard',
          element: (
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          ),
        },
        {
          path: 'favorites',
          element: (
            <ProtectedRoute>
              <FavoritosPage />
            </ProtectedRoute>
          ),
        },
        { path: 'subastas/:id', element: <SubastaDetail /> },
        { path: 'register', element: <RegisterPage /> },
        { path: 'login', element: <LoginPage /> },
        
        { 
          path: '*', 
          element: (
            <div className="flex flex-col items-center justify-center flex-1 bg-[#0b0f19] text-white p-8">
              <h1 className="text-6xl font-bold text-yellow-400 mb-4">404</h1>
              <p className="text-xl text-gray-300 mb-8">Oops... Esta página no existe o ha sido movida.</p>
              <Link to="/dashboard" className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors">
                Volver al mapa
              </Link>
            </div>
          )
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);

export const App: React.FC = () => {
  return (
    <>
      <Toaster position="bottom-right" toastOptions={{ style: { background: '#333', color: '#fff' } }} />
      <RouterProvider router={router} />
    </>
  );
};

export default App;