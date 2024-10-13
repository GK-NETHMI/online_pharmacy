import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleProfile = () => navigate('/customers/viewone')

  return (
    <header className="bg-[#F5E0C3] shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between px-5">
        {/* Logo */}
        <div className="text-3xl font-bold text-[#A67C52]">
          MediTrust
        </div>

        {/* Navigation */}
        <nav className="space-x-6">
          <a href="#" className="text-[#3B3A30] hover:text-[#6B9080]">
            Home
          </a>
          <a href="#" className="text-[#3B3A30] hover:text-[#6B9080]">
            Shop
          </a>
          <a href="#" className="text-[#3B3A30] hover:text-[#6B9080]">
            About
          </a>
          <a href="#" className="text-[#3B3A30] hover:text-[#6B9080]">
            Contact
          </a>
        </nav>

        {/* Cart Icon */}
        <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="text-[#6B9080] hover:text-[#557F6C]">
            🛒
          </button>
          </div>
          {/* Profile Icon */}
          <div className="relative">
            <button onClick={handleProfile} className="text-[#6B9080] hover:text-[#557F6C]">
              👤
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
