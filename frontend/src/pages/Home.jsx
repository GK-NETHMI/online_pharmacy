import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';

const Home = () => {
  return (   
    <div className="bg-[#FDF6E3] min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <motion.section 
        className="bg-gradient-to-r from-[#F5E0C3] to-[#DDBEA9] text-[#3B3A30] h-screen relative overflow-hidden"
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <img
          src="https://images.pexels.com/photos/3882516/pexels-photo-3882516.jpeg" 
          alt="Pharmacy products"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-5 h-full relative z-10">
          <div className="text-center md:text-left">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-[#3B3A30]" // Darker color for contrast
              initial={{ x: -20 }} 
              animate={{ x: [0, -10, 0] }} // Slide effect
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }} // Continuous animation
            >
              <p>Welcome to </p>
              <span className="text-[#A67C52]">MediTrust</span> Online Pharmacy
            </motion.h1>

            <motion.p 
              className="text-lg mt-4 mb-6 text-[#4A4A3A]" // Slightly darker for clarity
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Safe, reliable, and fast delivery of medications to your door.
            </motion.p>
            <motion.button 
              className="bg-[#6B9080] text-white px-8 py-3 rounded-full shadow-lg hover:bg-[#557F6C] transition-all"
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Now
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Featured Products Section */}
      <motion.section 
        className="py-20"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-4xl font-bold text-[#3B3A30] mb-10">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {["Product 1", "Product 2", "Product 3"].map((product, index) => (
              <motion.div 
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                initial={{ y: 50 }} 
                animate={{ y: 0 }} 
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img src="https://via.placeholder.com/300" alt={product} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#A67C52] mb-2">{product}</h3>
                  <p className="text-gray-600">${(index + 1) * 25}.99</p>
                  <motion.button 
                    className="bg-[#6B9080] text-white px-4 py-2 mt-4 rounded-lg hover:bg-[#557F6C]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section 
        className="bg-[#DDBEA9] text-[#3B3A30] py-20"
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="container mx-auto text-center px-5">
          <h2 className="text-4xl font-bold mb-6">Sign up for Exclusive Offers</h2>
          <p className="text-lg mb-8">
            Join our mailing list and enjoy discounts and promotions.
          </p>
          <form className="flex justify-center">
            <input
              type="email"
              className="p-3 w-full md:w-1/2 text-gray-700 rounded-l-lg focus:outline-none"
              placeholder="Enter your email"
            />
            <motion.button 
              className="bg-[#6B9080] text-white px-8 py-3 rounded-r-lg hover:bg-[#557F6C] transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </form>
        </div>
      </motion.section>
      
      <Footer />
    </div>
  );
};

export default Home;
