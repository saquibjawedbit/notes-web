import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {Link} from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-black text-white py-8 border-t border-amber-700/30 shadow-xl">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
         { /* Left Section */}
                <div className="text-center md:text-left">
                <h3 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
                  HR Science Quest
                </h3>
                <p className="text-amber-300/70 mt-2 text-sm">© 2025 All Rights Reserved</p>
                </div>

                {/* Center Section */}
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6 text-sm">
            <Link to="/privacy-policy" className="text-amber-200/90 hover:text-amber-400 transition-colors duration-300 relative group">
              Privacy Policy
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/terms-of-service" className="text-amber-200/90 hover:text-amber-400 transition-colors duration-300 relative group">
              Terms of Service
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/contact-us" className="text-amber-200/90 hover:text-amber-400 transition-colors duration-300 relative group">
              Contact Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Social Media Section */}
          <div className="flex space-x-6">
            {['facebook-f', 'twitter', 'instagram', 'youtube'].map((platform) => (
              <a
                key={platform}
                href={`https://www.${platform}.com`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={platform}
                className="text-amber-200/80 hover:text-amber-400 transform hover:scale-110 transition-all duration-300"
              >
                <i className={`fab fa-${platform} text-xl`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
