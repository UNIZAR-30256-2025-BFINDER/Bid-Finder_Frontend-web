import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';

import { LandingPage } from './features/landing/pages/LandingPage';
import Admin from './features/dashboard/pages/Admin';
import DashBoard from './features/map/pages/DashBoard';
import Favorites from './features/dashboard/pages/Favorites';
import SubastaDetail from './features/subastas/pages/SubastaDetail';
import RegisterPage from './features/auth/pages/RegisterPage';
import LoginPage from './features/auth/pages/LoginPage';
import { ProtectedRoute } from './features/auth/components/ProtectedRoute';

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
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
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
              <Favorites />
            </ProtectedRoute>
          ),
        },
        { path: 'subastas/:id', element: <SubastaDetail /> },
        { path: 'register', element: <RegisterPage /> },
        { path: 'login', element: <LoginPage /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);

export const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;