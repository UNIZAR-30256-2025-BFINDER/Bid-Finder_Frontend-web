/**
 * @fileoverview Página principal de Login.
 * Implementa el componente de navegación global y renderiza el formulario de inicio de sesión.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import { Navbar } from '../../../components/layout/Navbar';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white flex flex-col">
      <Navbar
        logo={
          <div
            className="cursor-pointer select-none text-2xl font-bold tracking-widest"
            onClick={() => navigate('/dashboard')}
          >
            <span className="text-yellow-400">B</span>
            <span className="text-white">-FINDER</span>
          </div>
        }
        actions={
          <button
            onClick={() => navigate('/register')}
            className="rounded-lg bg-yellow-400 px-4 py-2 text-sm font-bold text-black transition hover:bg-yellow-300"
          >
            Registrarse
          </button>
        }
      />

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <LoginForm />
      </main>
    </div>
  );
};

export default LoginPage;
