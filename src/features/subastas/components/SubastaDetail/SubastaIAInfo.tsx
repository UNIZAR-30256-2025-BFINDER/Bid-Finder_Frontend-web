import React from 'react';


interface IAInfoBlock {
  title: string;
  content: string;
}

interface Props {
  blocks: IAInfoBlock[];
}

const SubastaIAInfo: React.FC<Props> = ({ blocks }) => (
  <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {blocks.map((block, idx) => (
      <div key={idx} className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
        <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">{block.title}</p>
        <p className="text-sm text-gray-700 leading-6">{block.content}</p>
      </div>
    ))}
  </section>
);

export default SubastaIAInfo;
