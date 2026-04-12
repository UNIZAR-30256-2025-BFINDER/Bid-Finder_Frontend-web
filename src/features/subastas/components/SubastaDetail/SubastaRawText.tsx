import React from 'react';

interface Props {
  descripcion: string;
}

const SubastaRawText: React.FC<Props> = ({ descripcion }) => {
  if (!descripcion) return null;

  return (
    <details className="bg-[#111827] border border-gray-800 rounded-xl group overflow-hidden mt-6">
      <summary className="p-4 cursor-pointer font-semibold text-gray-300 hover:bg-white/5 transition-colors focus:outline-none list-none flex justify-between items-center select-none">
        <span className="flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Leer texto legal original (BOE)
        </span>
        <span className="group-open:rotate-180 transition-transform duration-300 text-gray-500">
          ▼
        </span>
      </summary>
      
      <div className="p-5 border-t border-gray-800 bg-[#0a0f1a]">
        <pre className="whitespace-pre-wrap break-words text-sm text-gray-400 leading-relaxed font-sans">
          {descripcion}
        </pre>
      </div>
    </details>
  );
};

export default SubastaRawText;