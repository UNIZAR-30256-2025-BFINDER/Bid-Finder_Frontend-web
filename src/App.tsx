import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { LandingPage } from './pages/LandingPage';

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <MainLayout />,
            children: [
                { index: true, element: <LandingPage /> },
            ],
        },
    ],
    {
        basename: import.meta.env.BASE_URL,
    }
);

export const App: React.FC = () => {
    return <RouterProvider router={router} />;
};

export default App;
