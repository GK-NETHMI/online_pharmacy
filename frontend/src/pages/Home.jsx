import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import feedbackImage from '../images/feedback.png';

const Home = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  const faqs = [
    {
      question: "1- Can you ship remotely?",
      answer: "Yes, we offer worldwide shipping to most countries. Shipping costs and delivery times vary by location."
    },
    {
      question: "2- Do you offer money back guarantee?",
      answer: "Yes, we offer a 30-day money-back guarantee on all our products. If you're not satisfied, we'll provide a full refund."
    },
    {
      question: "3- How long until we deliver your product.",
      answer: "Delivery times vary by location. Domestic orders typically arrive in 3-5 business days, while international orders may take 7-14 business days."
    },
    {
      question: "4- Do you accept shipping by mainland?",
      answer: "Yes, we accept shipping to mainland addresses and provide tracking information for all shipments."
    },
    {
      question: "5- Do you accept shipping by mainland?",
      answer: "Yes, we accept shipping to mainland addresses and provide tracking information for all shipments."
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
             style={{ backgroundImage: "url('https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent" />
        <div className="absolute top-0 left-0 w-1/3 h-full bg-[#FFD700] rounded-br-[200px] opacity-80" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Perfect Products To
                <span className="text-[#fdba74]"> And Wellness</span>
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                Get the most out of your life and deep health to
                live life like you want. CBD delivers a calm mind
                that is ready for anything.
              </p>
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#FFD700] text-black px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
                  onClick={() => navigate('/product/all')}
                >
                  Shop Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden md:block"
            >
              <div className="absolute -bottom-60 right-0 bg-white p-6 rounded-2xl shadow-xl max-w-xs">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🌟</span>
                  </div>
                  <div>
                    <p className="font-semibold">Trusted by</p>
                    <p className="text-gray-600">2000+ Customers</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What is CBD Oil Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
             style={{ backgroundImage: "url('https://images.pexels.com/photos/4210373/pexels-photo-4210373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }} />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What is CBD Oil?</h2>
            <p className="text-gray-600 text-lg">
              Experience the natural healing power of CBD oil, carefully extracted
              and formulated for optimal wellness benefits.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <img
                src="/images/product-detail.png"
                alt="CBD Oil"
                className="w-full max-w-md mx-auto"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              {[
                {
                  icon: '/icons/natural.svg',
                  title: '100% Natural',
                  description: 'Pure natural ingredients for your wellness'
                },
                {
                  icon: '/icons/legal.svg',
                  title: '100% Legal',
                  description: 'Approved and certified for your safety'
                },
                {
                  icon: '/icons/taste.svg',
                  title: 'No Nasty Taste',
                  description: 'Pleasant experience with every use'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-6"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                    <img src={feature.icon} alt={feature.title} className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Best For Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
             style={{ backgroundImage: "url('https://images.pexels.com/photos/4464819/pexels-photo-4464819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }} />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Best For?</h2>
            <p className="text-gray-600 text-lg">
              Discover the various benefits and applications of our premium CBD products
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: '🧠', title: 'Brain Health' },
              { icon: '😴', title: 'Better Sleep' },
              { icon: '💪', title: 'Pain Relief' },
              { icon: '😊', title: 'Anxiety' },
              { icon: '🏃', title: 'Focus' },
              { icon: '🌙', title: 'Rest' },
              { icon: '😌', title: 'Anxiety' },
              { icon: '🔄', title: 'Hormones' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-2">{item.icon}</div>
                <h3 className="font-semibold">{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Best Products */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
             style={{ backgroundImage: "url('https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/95" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Best Products</h2>
            <p className="text-gray-600 text-lg">
              Explore our carefully curated selection of premium wellness products
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'CBD OIL',
                image: 'https://images.pexels.com/photos/4269507/pexels-photo-4269507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                price: '$29.99'
              },
              {
                name: 'Multivitamins',
                image: 'https://images.pexels.com/photos/4046431/pexels-photo-4046431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                price: '$24.99'
              },
              {
                name: 'CBD Capsules',
                image: 'https://images.pexels.com/photos/4046467/pexels-photo-4046467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                price: '$34.99'
              },
              {
                name: 'Vitamin D3',
                image: 'https://images.pexels.com/photos/4046472/pexels-photo-4046472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                price: '$19.99'
              },
              {
                name: 'Vitamin C',
                image: 'https://images.pexels.com/photos/4046475/pexels-photo-4046475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                price: '$22.99'
              },
              {
                name: 'Omega 3 Fish Oil',
                image: 'https://images.pexels.com/photos/4046477/pexels-photo-4046477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                price: '$27.99'
              }
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-w-1 aspect-h-1 mb-6 overflow-hidden rounded-xl">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                <h3 className="font-semibold text-center text-xl mb-2">{product.name}</h3>
                <p className="text-center text-[#FFD700] font-bold text-lg">{product.price}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-4 bg-[#FFD700] text-black px-6 py-3 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  Add to Cart
                </motion.button>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FFD700] text-black px-12 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => navigate('/products')}
            >
              View All Products
            </motion.button>
          </div>
        </div>
      </section>

      {/* Buyer's Feedback */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
             style={{ backgroundImage: "url('https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">Buyer's Feedback</h2>
              <p className="text-gray-600 mb-8">
                When most of all pills have left side effects, the authentic
                our committed medicines save. Connection lets just
                impossible with significant hesitation.
              </p>
              <div className="flex items-center space-x-4">
                <div>
                  <p className="font-semibold">2,000+ Reviews</p>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={feedbackImage}
                alt="Feedback"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Faqs</h2>
            <p className="text-lg text-gray-800">Every ingredient pulls its weight.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/3683096/pexels-photo-3683096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="CBD Products"
                className="rounded-2xl shadow-lg w-small"
              />
            </motion.div>

            {/* FAQ Items */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="relative bg-white rounded-lg shadow-sm overflow-hidden"
                  initial={false}
                  animate={{ height: openFaq === index ? 'auto' : '64px' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FFD700]" />
                  <button
                    className="w-full pl-8 pr-6 py-5 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="font-medium text-gray-900 text-center">{faq.question}</span>
                    <span className="text-[#FFD700] text-2xl">
                      {openFaq === index ? '−' : '+'}
                    </span>
                  </button>
                  <div 
                    className={`pl-8 pr-6 pb-5 text-gray-600 ${openFaq === index ? 'block' : 'hidden'}`}
                  >
                    {faq.answer}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-32 bg-[#FFD700]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Subscribe To Our Newsletter</h2>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-8 py-3 rounded-full font-semibold"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;
