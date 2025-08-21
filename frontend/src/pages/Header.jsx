import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="py-4 fixed w-full top-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/images/logo.png" alt="Logo" className="h-10" />
            <span className="text-xl font-bold text-gray-800">Medi Trust</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/home" className="text-gray-800 hover:text-[#FFD700] transition-colors">
              Home
            </Link>
            <Link to="/product/all" className="text-gray-800 hover:text-[#FFD700] transition-colors">
              Products
            </Link>
            <Link to="/about" className="text-gray-800 hover:text-[#FFD700] transition-colors">
              About
            </Link>
            <Link to="/services" className="text-gray-800 hover:text-[#FFD700] transition-colors">
              Services
            </Link>
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-6">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              <FiSearch className="w-6 h-6 text-gray-600 hover:text-[#FFD700] cursor-pointer" />
            </motion.div>
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              <FiShoppingCart className="w-6 h-6 text-gray-600 hover:text-[#FFD700] cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-[#FFD700] text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="hidden md:block"
            >
              <Link to="/customer/viewone" className="flex items-center space-x-2 text-gray-600 hover:text-[#FFD700]">
                <FiUser className="w-6 h-6" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
