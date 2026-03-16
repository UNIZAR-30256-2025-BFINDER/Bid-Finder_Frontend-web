import React from 'react';

interface SidebarProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const Sidebar = ({ title, description, children }: SidebarProps) => {
  return (
    <div className="w-full md:w-2/5 p-4 overflow-y-auto border-b md:border-b-0 md:border-r border-gray-200 bg-white">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">{title}</h1>

      {description && <p className="text-gray-600 mb-4 text-sm md:text-base">{description}</p>}

      {}
      <div className="w-full">{children}</div>
    </div>
  );
};
