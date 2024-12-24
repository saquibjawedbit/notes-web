import { StrictMode } from 'react'
import './index.css'
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import axios from "axios";
import { AuthProvider } from './context/useAuth.jsx';
import Router from './Router.jsx';
import { createRoot } from 'react-dom/client';





if (import.meta.env.MODE === 'production') {
  // Safely remove React DevTools in production
  disableReactDevTools();
}

axios.defaults.withCredentials = true;


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Router/>
    </AuthProvider>
  </StrictMode>,
)
