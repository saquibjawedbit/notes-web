import { useState } from 'react';
import { FiAlignJustify, FiX } from 'react-icons/fi';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth.jsx'; // Add this import

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth(); // Add this line
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleAuthAction = async () => {
    if (isAuthenticated) {
      try {
        await logout();
        navigate('/'); // Redirect to home after logout
      } catch (error) {
        console.error('Logout failed:', error);
      }
    } else {
      navigate('/notes');
    }
  };

  return (
    <div>
      <nav className='px-6 py-4 border-b-2'>
        <div className='flex flex-row justify-between items-center'>
          <div className="flex items-center gap-1">
            <img src="/logo.png" alt="Logo" className='w-8 h-8' />
            <h3 className='font-bold'>
              HR Science Quest
            </h3>
          </div>

          {/* Hamburger Icon */}
          <div className={`${isOpen ? "hidden" : "block"} lg:hidden`} onClick={toggleMenu}>
            <FiAlignJustify size={24} />
          </div>

          <div className={`hidden lg:flex lg:flex-row gap-6 items-center`}>
            <NavLink to="/" className='font-semibold hover:font-bold transition duration-600'>Home</NavLink>
            <NavLink to="/notes" className='font-semibold hover:font-bold transition duration-600'>Notes</NavLink>
            <NavLink to="/contact-us" className='font-semibold hover:font-bold transition duration-600'>Testimonals</NavLink>
            <NavLink to="/about-us" className='font-semibold hover:font-bold transition duration-600'>About Us</NavLink>

            <button 
              onClick={handleAuthAction}
              className='bg-black text-white font-bold px-4 py-2 rounded-3xl hover:bg-gray-900 transition duration-300 hover:scale-105'
            >
              {isAuthenticated ? 'Logout' : 'Buy Notes'}
            </button>
          </div>
        </div>
      </nav>

      {/* Drawer */}
      <div className={`${isOpen ? "translate-x-0" : "translate-x-full"} flex flex-col fixed top-0 right-0 h-full w-64 border-l-2 px-6 py-8 gap-6 bg-white lg:hidden transtion duration-300 ease-in-out z-50`}>
        <FiX size={32} className='self-end' onClick={toggleMenu} />
        <Link to="/" className='font-semibold hover:font-bold transition duration-600'>Home</Link>
        <Link to="/Notes" className='font-semibold hover:font-bold transition duration-600'>Notes</Link>
        <Link to="/contact-us" className='font-semibold hover:font-bold transition duration-600'>Testimonals</Link>
        <Link to="/about-us" className='font-semibold hover:font-bold transition duration-600'>About Us</Link>

        <button
          onClick={handleAuthAction}
          className='bg-black text-white font-bold px-4 py-2 rounded-3xl hover:bg-gray-900 transition duration-300 hover:scale-110'
        >
          {isAuthenticated ? 'Logout' : 'Buy Notes'}
        </button>
      </div>
    </div>
  );
}
