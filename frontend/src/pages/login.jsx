import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    CusEmail: '',
    CusPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8071/customer/login', formData);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/7615463/pexels-photo-7615463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div 
        className="w-full max-w-md p-8 rounded-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-2">
            Sign in to your account
          </h2>
          <p className="text-gray-200">
            Welcome back! Please enter your details
          </p>
        </motion.div>

        {error && (
          <motion.div
            className="bg-red-100 bg-opacity-90 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <input
              type="email"
              name="CusEmail"
              required
              className="w-full px-4 py-3 rounded-full bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              placeholder="Enter your Username"
              value={formData.CusEmail}
              onChange={handleChange}
              style={{
                backdropFilter: 'blur(5px)',
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <input
              type="password"
              name="CusPassword"
              required
              className="w-full px-4 py-3 rounded-full bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              placeholder="Enter your Password"
              value={formData.CusPassword}
              onChange={handleChange}
              style={{
                backdropFilter: 'blur(5px)',
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-right"
          >
            <button
              type="button"
              className="text-white hover:text-gray-200 text-sm"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot Password?
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              type="submit"
              className="w-full py-3 rounded-full bg-[#E67E22] text-white font-semibold hover:bg-[#D35400] transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Log In'}
            </motion.button>
          </motion.div>
        </form>

        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-white">
            Don't have an account?{' '}
            <motion.button
              onClick={() => navigate('/register')}
              className="text-[#E67E22] font-semibold hover:text-[#D35400]"
              whileHover={{ scale: 1.05 }}
            >
              Create One!
            </motion.button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
