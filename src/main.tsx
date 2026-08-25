import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './index.css';

import App from './App.tsx';

import { SettingsProvider } from './context/SettingsContext';

createRoot(
  document.getElementById('root')!
).render(
  <StrictMode>

    <SettingsProvider>

      <App />

    </SettingsProvider>

  </StrictMode>
);