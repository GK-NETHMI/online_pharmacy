import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    CusName: '',
    CusEmail: '',
    CusPhone: '',
    CusAddress: '',
    CusPassword: '',
    CusAge: '',
    CusGender: '',
    CusProfile: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.CusProfile) {
      newErrors.CusProfile = 'Profile picture is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await axios.post('http://localhost:8071/customer', formData);
        if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data));
          navigate('/home');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/19827821/pexels-photo-19827821/free-photo-of-halves-of-pomegranate.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div 
        className="w-full max-w-2xl p-8 rounded-3xl"
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
            Create your account
          </h2>
          <p className="text-gray-200">
            Join us today and enjoy our services
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

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <input
                type="text"
                name="CusName"
                required
                className="w-full px-4 py-3 rounded-full bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                placeholder="Enter your full name"
                value={formData.CusName}
                onChange={handleChange}
                style={{ backdropFilter: 'blur(5px)' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <input
                type="email"
                name="CusEmail"
                required
                className="w-full px-4 py-3 rounded-full bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                placeholder="Enter your email"
                value={formData.CusEmail}
                onChange={handleChange}
                style={{ backdropFilter: 'blur(5px)' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <input
                type="tel"
                name="CusPhone"
                required
                className="w-full px-4 py-3 rounded-full bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                placeholder="Enter your phone number"
                value={formData.CusPhone}
                onChange={handleChange}
                style={{ backdropFilter: 'blur(5px)' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <input
                type="number"
                name="CusAge"
                required
                className="w-full px-4 py-3 rounded-full bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                placeholder="Enter your age"
                value={formData.CusAge}
                onChange={handleChange}
                style={{ backdropFilter: 'blur(5px)' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <select
                name="CusGender"
                required
                className="w-full px-4 py-3 rounded-full bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                value={formData.CusGender}
                onChange={handleChange}
                style={{ backdropFilter: 'blur(5px)' }}
              >
                <option value="" className="text-gray-700">Select gender</option>
                <option value="Male" className="text-gray-700">Male</option>
                <option value="Female" className="text-gray-700">Female</option>
                <option value="Other" className="text-gray-700">Other</option>
              </select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="md:col-span-2"
            >
              <textarea
                name="CusAddress"
                required
                rows="3"
                className="w-full px-4 py-3 rounded-2xl bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                placeholder="Enter your address"
                value={formData.CusAddress}
                onChange={handleChange}
                style={{ backdropFilter: 'blur(5px)' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="md:col-span-2"
            >
              <input
                type="password"
                name="CusPassword"
                required
                className="w-full px-4 py-3 rounded-full bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                placeholder="Create a password"
                value={formData.CusPassword}
                onChange={handleChange}
                style={{ backdropFilter: 'blur(5px)' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="md:col-span-2"
            >
              <div className="mb-4">
                <label className="block mb-2 text-gray-700" htmlFor="CusProfile">Profile Picture</label>
                <input
                  type="file"
                  name="CusProfile"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#FFD700] transition"
                />
                {errors.CusProfile && <p className="text-red-500 text-xs">{errors.CusProfile}</p>}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-6"
          >
            <motion.button
              type="submit"
              className="w-full py-3 rounded-full bg-[#E67E22] text-white font-semibold hover:bg-[#D35400] transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </motion.button>
          </motion.div>
        </form>

        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <p className="text-white">
            Already have an account?{' '}
            <motion.button
              onClick={() => navigate('/')}
              className="text-[#E67E22] font-semibold hover:text-[#D35400]"
              whileHover={{ scale: 1.05 }}
            >
              Sign in
            </motion.button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUp;
