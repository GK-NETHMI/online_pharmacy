import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Header from './Header';
import Footer from './Footer';

const About = () => {
  const { ref: section1Ref, inView: section1InView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const { ref: section2Ref, inView: section2InView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const { ref: section3Ref, inView: section3InView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const { ref: section4Ref, inView: section4InView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div className="bg-white text-gray-900 font-sans min-h-screen">
      <Header />

      {/* Hero Section */}
      <motion.section
        ref={section1Ref}
        className="py-24 px-6 bg-cover bg-center text-center relative overflow-hidden"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/3861462/pexels-photo-3861462.jpeg')",
        }}
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: section1InView ? 1 : 0,
          y: section1InView ? 0 : 100,
        }}
        transition={{ duration: 1 }}
      >
        <div>
          <motion.h1 className="text-5xl font-bold mb-6 leading-tight text-white">
            Welcome to MediTrust Online Pharmacy
          </motion.h1>
          <motion.p className="text-xl mb-10 max-w-3xl mx-auto opacity-80 text-black">
            Bringing healthcare right to your doorstep with expert advice and fast delivery.
          </motion.p>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <motion.section
        ref={section2Ref}
        className="py-24 px-6 bg-[#f9f9f9] text-center flex justify-between items-center"
        initial={{ opacity: 0, x: -100 }}
        animate={{
          opacity: section2InView ? 1 : 0,
          x: section2InView ? 0 : -100,
        }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-semibold text-blue-800 mb-6">Our Story</h2>
          <p className="text-lg text-gray-700 mb-10">
            MediTrust started with a vision to bridge the gap between accessible healthcare and trusted medication. We aim to make your healthcare journey easier, offering a wide variety of prescription and over-the-counter medicines at your fingertips.
          </p>
        </div>

        {/* Image on the right side */}
        <motion.img
          className="max-w-xs rounded-lg shadow-lg"
          src="https://images.pexels.com/photos/3862627/pexels-photo-3862627.jpeg"
          alt="Our Story"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.section>

      {/* Our Mission Section */}
      <motion.section
        ref={section3Ref}
        className="py-24 px-6 bg-white text-center flex justify-between items-center"
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: section3InView ? 1 : 0,
          y: section3InView ? 0 : 100,
        }}
        transition={{ duration: 1 }}
      >
        {/* Image on the left side */}
        <motion.img
          className="max-w-xs rounded-lg shadow-lg"
          src="https://images.pexels.com/photos/3184461/pexels-photo-3184461.jpeg"
          alt="Our Mission"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />

        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-semibold text-blue-800 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-10">
            At MediTrust, our mission is to empower individuals to take control of their health through easy access to medications and consultations with professional pharmacists. We are committed to providing the best products and services with a focus on quality, convenience, and affordability.
          </p>
        </div>
      </motion.section>

      {/* Our Services Section */}
      <motion.section
        ref={section4Ref}
        className="py-24 px-6 bg-[#F5F5F5] text-center"
        initial={{ opacity: 0, x: 100 }}
        animate={{
          opacity: section4InView ? 1 : 0,
          x: section4InView ? 0 : 100,
        }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-semibold text-blue-800 mb-6">Our Services</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <motion.div
            className="bg-white p-8 rounded-lg shadow-xl max-w-xs"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: section4InView ? 1 : 0,
              scale: section4InView ? 1 : 0.8,
            }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Prescription Fulfillment</h3>
            <p className="text-gray-700 mb-3">
              Fast and reliable delivery of prescribed medications directly to your door.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-lg shadow-xl max-w-xs"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: section4InView ? 1 : 0,
              scale: section4InView ? 1 : 0.8,
            }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Health Consultations</h3>
            <p className="text-gray-700 mb-3">
              Consult with professional pharmacists and get advice on your medications and health products.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-lg shadow-xl max-w-xs"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: section4InView ? 1 : 0,
              scale: section4InView ? 1 : 0.8,
            }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Free Delivery</h3>
            <p className="text-gray-700 mb-3">
              Enjoy free, fast, and secure delivery of your medications with no extra cost.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default About;
