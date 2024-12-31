import AdminPage from './pages/admin/AdminPage.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import EditPage from './pages/admin/EditPage.jsx';
import ProtectedRoute from './components/Protected-Route/ProtectedRoute.jsx';
import App from './pages/landing/App.jsx'
import { Layout } from './Layout.jsx';
import { Home } from './pages/home/Home.jsx';
import { AboutUs } from './components/about-us/AboutUs.jsx';
import { Login } from './pages/authentication/Login.jsx';
import { Layout as AuthLayout } from './pages/authentication/common/Layout.jsx';
import { SignUp } from './pages/authentication/SignUp.jsx';
import { ForgotPassword } from './pages/authentication/ForgotPassword.jsx';
import Chapters from './pages/chapters/Chapters.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { useAuth } from './context/useAuth.jsx';
import EditNote from './pages/admin/EditNote.jsx';
import CreateNote from './pages/admin/CreateNote.jsx';


export default function Router() {

  const { isAuthenticated, verified} = useAuth();

  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<App />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='' element={<ProtectedRoute />}>
            <Route path='/notes' element={<Home />} />
            <Route path='/notes/:subject/:chapter' element={<Chapters />} />
          </Route>
        </Route>
        
        <Route path='/' element={<AuthLayout />}>
          {(isAuthenticated && verified) ? (
            <Route path="*" element={<Navigate to="/notes" />} />
          ) : (
            <>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="forgotPassword" element={<ForgotPassword />} />
            </>
          )}
        </Route>
        <Route path='/admin' element={<AdminLayout />} >
              <Route path='create-subject' element={<AdminPage />} />
              <Route path='subjects' element={<EditPage />} />
              <Route path='edit-note/:noteId' element={<EditNote/>}/>
              <Route path='create-note/:subjectId/:chapterIndex' element={<CreateNote />}/>
        </Route>

      </Routes>
    </BrowserRouter>
  </>;
}