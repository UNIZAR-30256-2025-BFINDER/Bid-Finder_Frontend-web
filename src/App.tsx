import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';

import { LandingPage } from './features/landing/pages/LandingPage';
import Admin from './features/dashboard/pages/Admin';
import DashBoard from './features/map/pages/DashBoard';
import Favorites from './features/dashboard/pages/Favorites';
import SubastaDetail from './features/subastas/pages/SubastaDetail';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <LandingPage /> },
        { path: 'admin', element: <Admin /> },
        { path: 'dashboard', element: <DashBoard /> },
        { path: 'favorites', element: <Favorites /> },
        { path: 'subastas/:id', element: <SubastaDetail /> },
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