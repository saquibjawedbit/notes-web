import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css'
import App from './pages/landing/App.jsx'
import { Layout } from './Layout.jsx';
import { Home } from './pages/home/Home.jsx';
import { AboutUs } from './components/about-us/AboutUs.jsx';
import { Login } from './pages/authentication/Login.jsx';
import { Layout as AuthLayout } from './pages/authentication/common/Layout.jsx';
import { SignUp } from './pages/authentication/SignUp.jsx';
import { ForgotPassword } from './pages/authentication/ForgotPassword.jsx';
import Chapters from './pages/chapters/Chapters.jsx';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import axios from "axios";
import AdminPage from './pages/admin/AdminPage.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import EditPage from './pages/admin/EditPage.jsx';
import ProtectedRoute from './components/Protected-Route/ProtectedRoute.jsx';




if (import.meta.env.MODE === 'production') {
  // Safely remove React DevTools in production
  disableReactDevTools();
}

axios.defaults.withCredentials = true;


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<App />} />
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='' element={<ProtectedRoute/>}>
              <Route path='/notes' element={<Home />} />
              <Route path='/notes/:subject/:chapter' element={<Chapters />} />
            </Route>
          </Route>
          <Route path='/' element={<AuthLayout />}>
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='forgotPassword' element={<ForgotPassword />} />
          </Route>
          <Route path='/admin' element={<AdminLayout/>} >
            <Route path='create-subject' element={<AdminPage/>}/>
            <Route path='subjects' element={<EditPage/>}/>
          </Route>
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
