import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#FDF6E3] py-8 mt-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-5">
        {/* Company Info */}
        <div>
          <h2 className="text-[#A67C52] font-bold text-xl mb-4">MediTrust Pharmacy</h2>
          <p className="text-[#3B3A30]">
            Your trusted online pharmacy, offering quality medications delivered directly to your door.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-[#A67C52] font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-[#3B3A30] hover:text-[#6B9080]">Shop</a></li>
            <li><a href="#" className="text-[#3B3A30] hover:text-[#6B9080]">Contact</a></li>
            <li><a href="./about" className="text-[#3B3A30] hover:text-[#6B9080]">About Us</a></li>
            <li><a href="#" className="text-[#3B3A30] hover:text-[#6B9080]">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Info & Socials */}
        <div>
          <h3 className="text-[#A67C52] font-bold text-lg mb-4">Contact Us</h3>
          <p className="text-[#3B3A30]">Email: support@meditrust.com</p>
          <p className="text-[#3B3A30]">Phone: +1 (800) 123-4567</p>
          
          <div className="mt-4 flex space-x-4">
            <a href="#" className="text-[#6B9080] hover:text-[#557F6C]">Facebook</a>
            <a href="#" className="text-[#6B9080] hover:text-[#557F6C]">Twitter</a>
            <a href="#" className="text-[#6B9080] hover:text-[#557F6C]">Instagram</a>
          </div>
        </div>
      </div>

      <div className="text-center text-[#3B3A30] mt-10">
        &copy; 2024 MediTrust Pharmacy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
