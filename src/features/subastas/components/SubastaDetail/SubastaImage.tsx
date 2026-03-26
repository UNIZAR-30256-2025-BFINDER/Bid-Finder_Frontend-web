import React from 'react';

interface Props {
  src: string;
  alt: string;
}

const SubastaImage: React.FC<Props> = ({ src, alt }) => (
  <div className="overflow-hidden rounded-2xl bg-gray-100 border border-gray-200">
    <img
      src={src}
      alt={alt}
      className="w-full h-[260px] md:h-[380px] object-cover"
    />
  </div>
);

export default SubastaImage;
