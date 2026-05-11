/**
 * @fileoverview Punto de entrada principal de la aplicación React.
 * Inicializa el árbol de componentes en el DOM y carga los estilos globales y dependencias.
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

import './config/chartConfig';

import './styles.css';
import 'leaflet/dist/leaflet.css';
import './leaflet-popup-overrides.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);