import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css'
import App from './App.jsx'
import { Layout } from './Layout.jsx';
import { Home } from './components/notes/Home.jsx';
import { AboutUs } from './components/about-us/AboutUs.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<App />} />
        <Route path='/about-us' element={<AboutUs />}/>
        <Route path='/notes' element={<Home />}/>
      </Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
