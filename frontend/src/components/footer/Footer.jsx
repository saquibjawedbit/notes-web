import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {Link} from 'react-router-dom';


export function Footer() {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Section */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">HR Science Quest</h3>
            <p className="text-sm">© 2025 All Rights Reserved</p>
          </div>

          {/* Center Section */}
          <div className="flex space-x-4 text-sm">
            <Link to="/privacy-policy" className="hover:text-gray-400 transition">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-gray-400 transition">
              Terms of Service
            </Link>
            <Link to="/contact-us" className="hover:text-gray-400 transition">
              Contact Us
            </Link>
          </div>

          {/* Social Media Section */}
          <div className="flex mt-4 md:mt-0 space-x-5">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-gray-400 transition"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-gray-400 transition"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-gray-400 transition"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-gray-400 transition"
            >
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
