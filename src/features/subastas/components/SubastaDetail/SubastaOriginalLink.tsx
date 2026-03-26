import React from 'react';


interface Props {
  url: string;
  text: string;
}

const SubastaOriginalLink: React.FC<Props> = ({ url, text }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center rounded-lg bg-[#0a1020] text-white px-4 py-3 text-sm font-semibold hover:bg-[#111a33] transition-colors"
  >
    {text}
  </a>
);

export default SubastaOriginalLink;
