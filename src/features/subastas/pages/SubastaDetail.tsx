import React from 'react';
import { useParams } from 'react-router-dom';

export const SubastaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen px-6 py-10 text-black">
      <h1 className="text-3xl font-bold mb-4">Detalle de la subasta</h1>
      <p className="text-lg text-black-300">ID de la subasta: {id}</p>
    </div>
  );
};

export default SubastaDetail;