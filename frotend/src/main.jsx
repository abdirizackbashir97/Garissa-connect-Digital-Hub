// src/main.jsx
//
// Entry point of the React app.
// Imports the i18n config (side effect) before mounting App.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'   // ← initialises i18next with EN / SW / SO
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)