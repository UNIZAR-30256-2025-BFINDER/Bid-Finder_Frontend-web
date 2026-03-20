import React from 'react';
import { Navbar } from '../../../components/layout/Navbar';
import { Logo } from '../../../components/ui/Logo';
import { HeroSection } from '../components/HeroSection';
import { MapSection } from '../components/MapSection';
import { ProblemSolutionSection } from '../components/ProblemSolutionSection';
import { FeaturesSection, Feature } from '../components/FeaturesSection';
import { Footer } from '../../../components/layout/Footer';
import { useNavigate } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => navigate('/login');
  const handleRegister = () => navigate('/register');
  const viewMockDetails = () => navigate('/subastas/123');

  const appFeatures: Feature[] = [
    {
      iconType: 'shield',
      title: 'Traductor Legal',
      description: 'Nuestra IA convierte documentos legales del BOE en información clara.',
    },
    {
      iconType: 'map',
      title: 'Mapa Interactivo',
      description: 'Visualiza todas las subastas geolocalizadas en tiempo real.',
    },
    {
      iconType: 'signal',
      title: 'Semáforo de Riesgo',
      description: 'Alertas inteligentes que detectan riesgos y priorizan tus pujas.',
    },
    {
      iconType: 'bell',
      title: 'Alertas Inteligentes',
      description: 'Notificaciones instantáneas que coinciden con tus criterios.',
    },
    {
      iconType: 'clock',
      title: 'Histórico Completo',
      description: 'Consulta el historial y analiza las tendencias de mercado en la zona.',
    },
    {
      iconType: 'users',
      title: 'Comunidad Activa',
      description: 'Comparte experiencias con inversores de la misma comunidad.',
    },
  ];

  return (
    <div className="min-h-screen bg-ultra-black text-white font-sans selection:bg-primary-yellow selection:text-black">
      <Navbar
        logo={<Logo />}
        actions={
          <>
            <button
              onClick={handleRegister}
              className="hidden md:flex items-center text-sm font-semibold hover:text-primary-yellow transition-colors border border-white/20 hover:border-white px-4 py-1.5 rounded-lg"
            >
              Register
            </button>
            <button
              onClick={handleLogin}
              className="btn btn-primary text-sm font-semibold px-4 py-1.5 rounded-lg shadow-md hover:shadow-lg bg-primary-yellow text-black"
              style={{ textTransform: 'none' }}
            >
              Login
            </button>
          </>
        }
      />

      <main>
        <HeroSection
          title={
            <>
              Oportunidades del <br /> BOE,{' '}
              <span className="text-primary-yellow">traducidas para ti</span>
            </>
          }
        />
        <MapSection
          title="¿Qué puedo hacer por ti?"
          description="Traducimos el lenguaje legal del BOE en información clara para que visualices cada oportunidad geolocalizada en tiempo real. Filtra por ubicación, precio y tipo de activo directamente sobre el mapa."
        />
        <ProblemSolutionSection
          title={
            <>
              ¿Cansado de leer <br /> PDFs imposibles?
            </>
          }
          description="B-FINDER procesa miles de subastas estatales para ofrecerte solo lo que importa. Clasificamos cada oportunidad por metros cuadrados, rentabilidad real y nivel de peligrosidad jurídica. Inteligencia aplicada a tu inversión."
          onViewDetails={viewMockDetails}
        />
        <FeaturesSection
          title="Todo lo que necesitas para ganar tus subastas"
          subtitle="Tecnología punta al servicio de tu próxima inversión"
          features={appFeatures}
        />
      </main>

      <Footer />
    </div>
  );
};