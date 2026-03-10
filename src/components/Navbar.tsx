import React from 'react';

interface NavbarProps {
    logo?: React.ReactNode;
    children?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ logo, children }) => {
    return (
        <header className="w-full py-4 px-8 md:px-16 flex items-center justify-between sticky top-0 z-50 bg-ultra-black border-b border-white/10 shadow-lg backdrop-blur-sm">
            {logo}

            <div className="flex items-center gap-3">
                {children}
            </div>
        </header>
    );
};
