import React from 'react';


interface Props {
  price: string;
  label: string;
}

const SubastaPrice: React.FC<Props> = ({ price, label }) => (
  <div className="flex items-end gap-4 flex-wrap">
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl md:text-3xl font-bold text-black">{price}</p>
    </div>
  </div>
);

export default SubastaPrice;
