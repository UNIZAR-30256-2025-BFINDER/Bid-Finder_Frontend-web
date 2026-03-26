import React from 'react';
import { DashboardNavbar } from '../../../map/layout/DashboardNavbar';

interface Props {
  id?: string;
}

const SubastaNotFound: React.FC<Props> = ({ id }) => (
  <div className="min-h-screen bg-[#050816] text-white flex flex-col">
    <DashboardNavbar mobileView="map" onToggleMobileView={() => {}} />
    <div className="px-6 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl text-black p-8 shadow-2xl">
        <h1 className="text-3xl font-bold mb-4">Subasta no encontrada</h1>
        <p className="text-gray-700">
          No hemos podido encontrar la subasta con ID: <span className="font-semibold">{id}</span>
        </p>
      </div>
    </div>
  </div>
);

export default SubastaNotFound;
