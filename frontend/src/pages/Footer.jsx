import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import logopng from '../images/logo.png'; 

const Footer = () => {
  return (
    <footer className="bg-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logopng} alt="Logo" className="h-16 w-auto" />
              <span className="text-xl font-bold">Medi Trust</span>
            </Link>
            <p className="text-gray-600">
              Design amazing digital experiences that create more happy in the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#FFD700] hover:text-white transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#FFD700] hover:text-white transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#FFD700] hover:text-white transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#FFD700] hover:text-white transition-colors">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Company</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-gray-600 hover:text-[#FFD700]">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-[#FFD700]">Careers</Link></li>
              <li><Link to="/services" className="text-gray-600 hover:text-[#FFD700]">Services</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-[#FFD700]">Blog</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-4">
              <li><Link to="/contact" className="text-gray-600 hover:text-[#FFD700]">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-[#FFD700]">FAQ</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-[#FFD700]">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-[#FFD700]">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-6">Newsletter</h3>
            <p className="text-gray-600 mb-4">Subscribe to our newsletter for the latest updates</p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              />
              <button
                type="submit"
                className="w-full bg-[#FFD700] text-black font-semibold py-3 rounded-lg hover:bg-[#E6C200] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t pt-8">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} Medi Trust. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
