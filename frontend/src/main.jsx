import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PreferencesProvider } from './context/PreferencesContext.jsx'
import { UserProvider } from './context/UserContext.jsx'

import './assets/css/juegos.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PreferencesProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </PreferencesProvider>
  </StrictMode>,
)
