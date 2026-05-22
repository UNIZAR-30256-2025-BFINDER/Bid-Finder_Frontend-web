/**
 * @fileoverview Sección Hero (principal) de la Landing Page.
 * Es el primer impacto visual del usuario e incluye un buscador directo para maximizar la conversión.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

interface HeroSectionProps {
  title: React.ReactNode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ title }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard', { state: { heroQuery: query.trim() } });
  };

  return (
    <section className="relative py-32 px-8 md:px-16 flex flex-col items-center text-center justify-center min-h-[70vh]">
      <div className="max-w-4xl mx-auto flex flex-col items-center z-10 pt-16">
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tight">
          {title}
        </h1>

        <form
          onSubmit={handleSearch}
          className="w-full max-w-2xl flex items-center bg-white/5 border border-white/20 rounded-full p-2 backdrop-blur-md shadow-2xl focus-within:border-yellow-400 focus-within:bg-white/10 transition-all"
        >
          <div className="pl-4 pr-2 text-gray-400">
            <Search size={24} />
          </div>
          <input
            type="text"
            placeholder="¿En qué provincia o municipio buscas invertir?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400 text-lg py-3 px-2"
          />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-8 rounded-full transition-colors"
          >
            Buscar
          </button>
        </form>
      </div>

      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};
