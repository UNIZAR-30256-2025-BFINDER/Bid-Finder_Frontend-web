import React from 'react';
import { Outlet } from 'react-router-dom';

export const MainLayout: React.FC = () => {
    return (
        <>
            <main>
                <Outlet />
            </main>
        </>
    );
};
