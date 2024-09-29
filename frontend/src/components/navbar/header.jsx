import React from 'react';

const Header = () => {
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
        <div className="relative">
          <button className="text-[#6B9080] hover:text-[#557F6C]">
            🛒 Cart
          </button>
          <span className="absolute top-0 right-0 bg-[#A67C52] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            2
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
