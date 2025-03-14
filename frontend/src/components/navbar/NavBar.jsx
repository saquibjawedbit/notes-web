import { useState, useEffect } from 'react';
import { FiAlignJustify, FiX } from 'react-icons/fi';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/useAuth.jsx';
import { motion, AnimatePresence } from 'framer-motion';

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const navLinkClass = (path) => `
    relative font-semibold text-gray-300 hover:text-amber-400
    after:content-[''] after:absolute after:w-full after:h-0.5
    after:bg-amber-400 after:left-0 after:bottom-[-4px]
    after:rounded-full after:transition-all after:duration-300
    ${location.pathname === path ? 
      'text-amber-400 after:opacity-100 after:scale-x-100' : 
      'after:opacity-0 after:scale-x-0 hover:after:opacity-100 hover:after:scale-x-100'}
  `;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md shadow-md' : 'bg-black'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center gap-2">
              <motion.img 
                src="/logo.png" 
                alt="Logo" 
                className='w-8 h-8'
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              />
              <h3 className='font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent'>
                HR Science Quest
              </h3>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex items-center gap-8'>
            {['/', '/notes', '/contact-us', '/about-us'].map((path) => (
              <NavLink 
                key={path} 
                to={path} 
                className={navLinkClass(path)}
              >
                {path === '/' ? 'Home' : 
                 path.slice(1).split('-').map(word => 
                   word.charAt(0).toUpperCase() + word.slice(1)
                 ).join(' ')}
              </NavLink>
            ))}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAuthAction}
              className='bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-bold 
                       px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300'
            >
              {isAuthenticated ? 'Logout' : 'Buy Notes'}
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="lg:hidden text-amber-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FiAlignJustify size={24} className={!isOpen ? "block" : "hidden"} />
            <FiX size={24} className={isOpen ? "block" : "hidden"} />
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black border-t border-gray-800"
          >
            <div className="px-4 pt-2 pb-4 space-y-4">
              {['/', '/notes', '/contact-us', '/about-us'].map((path) => (
                <motion.div
                  key={path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <NavLink 
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className={`block py-2 ${navLinkClass(path)}`}
                  >
                    {path === '/' ? 'Home' : 
                     path.slice(1).split('-').map(word => 
                       word.charAt(0).toUpperCase() + word.slice(1)
                     ).join(' ')}
                  </NavLink>
                </motion.div>
              ))}
              <motion.button
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                onClick={() => {
                  handleAuthAction();
                  setIsOpen(false);
                }}
                className='w-full bg-gradient-to-r from-amber-400 to-yellow-600 text-black 
                         font-bold py-2 rounded-full hover:shadow-lg transition-all duration-300'
              >
                {isAuthenticated ? 'Logout' : 'Buy Notes'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
