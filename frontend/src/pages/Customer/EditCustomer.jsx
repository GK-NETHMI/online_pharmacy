import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Header from '../Header';
import Footer from '../Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCustomer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    CusName: '',
    CusEmail: '',
    CusPhone: '',
    CusAddress: '',
    CusAge: '',
    CusGender: '',
    CusPassword: '',
    CusProfile: null
  });

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(`http://localhost:8071/customer/${id}`);
        const customer = response.data;
        setFormData({
          CusName: customer.CusName || '',
          CusEmail: customer.CusEmail || '',
          CusPhone: customer.CusPhone || '',
          CusAddress: customer.CusAddress || '',
          CusAge: customer.CusAge || '',
          CusGender: customer.CusGender || '',
          CusPassword: customer.CusPassword || '',
          CusProfile: customer.CusProfile || null
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching customer data:', error);
        toast.error('Failed to fetch customer data');
        setIsLoading(false);
      }
    };

    fetchCustomerData();
  }, [id]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.CusName.trim()) {
      newErrors.CusName = 'Name is required';
    } else if (formData.CusName.length < 3) {
      newErrors.CusName = 'Name must be at least 3 characters long';
    }

    if (!formData.CusEmail.trim()) {
      newErrors.CusEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.CusEmail)) {
      newErrors.CusEmail = 'Please enter a valid email address';
    }

    if (!formData.CusPhone.trim()) {
      newErrors.CusPhone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.CusPhone)) {
      newErrors.CusPhone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.CusAddress.trim()) {
      newErrors.CusAddress = 'Address is required';
    }

    if (!formData.CusAge) {
      newErrors.CusAge = 'Age is required';
    } else if (formData.CusAge < 18 || formData.CusAge > 100) {
      newErrors.CusAge = 'Age must be between 18 and 100';
    }

    if (!formData.CusGender) {
      newErrors.CusGender = 'Gender is required';
    }

    if (!formData.CusPassword.trim()) {
      newErrors.CusPassword = 'Password is required';
    } else if (formData.CusPassword.length < 6) {
      newErrors.CusPassword = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'CusProfile' && files) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      await axios.put(`http://localhost:8071/customer/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Customer updated successfully!');
      setTimeout(() => {
        navigate('/customers');
      }, 2000);
    } catch (error) {
      console.error('Error updating customer:', error);
      toast.error('Failed to update customer');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#A67C52]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#F3E9DD] to-[#F8F3ED]">
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-center text-[#A67C52] mb-8">Edit Customer Profile</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Image Upload */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <img
                    src={formData.CusProfile ? URL.createObjectURL(formData.CusProfile) : 'https://via.placeholder.com/150'}
                    alt="Profile Preview"
                    className="w-32 h-32 rounded-full object-cover border-4 border-[#A67C52]"
                  />
                  <label
                    htmlFor="CusProfile"
                    className="absolute bottom-0 right-0 bg-[#A67C52] text-white p-2 rounded-full cursor-pointer hover:bg-[#8B6642] transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <input
                      type="file"
                      id="CusProfile"
                      name="CusProfile"
                      onChange={handleChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="CusName"
                    value={formData.CusName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${errors.CusName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#A67C52] focus:border-transparent transition-colors bg-white/50`}
                    placeholder="Enter your full name"
                  />
                  {errors.CusName && <p className="text-red-500 text-xs mt-1">{errors.CusName}</p>}
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="CusEmail"
                    value={formData.CusEmail}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${errors.CusEmail ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#A67C52] focus:border-transparent transition-colors bg-white/50`}
                    placeholder="Enter your email"
                  />
                  {errors.CusEmail && <p className="text-red-500 text-xs mt-1">{errors.CusEmail}</p>}
                </div>

                {/* Phone Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="CusPhone"
                    value={formData.CusPhone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${errors.CusPhone ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#A67C52] focus:border-transparent transition-colors bg-white/50`}
                    placeholder="Enter your phone number"
                  />
                  {errors.CusPhone && <p className="text-red-500 text-xs mt-1">{errors.CusPhone}</p>}
                </div>

                {/* Age Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    name="CusAge"
                    value={formData.CusAge}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${errors.CusAge ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#A67C52] focus:border-transparent transition-colors bg-white/50`}
                    placeholder="Enter your age"
                  />
                  {errors.CusAge && <p className="text-red-500 text-xs mt-1">{errors.CusAge}</p>}
                </div>

                {/* Gender Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    name="CusGender"
                    value={formData.CusGender}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${errors.CusGender ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#A67C52] focus:border-transparent transition-colors bg-white/50`}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.CusGender && <p className="text-red-500 text-xs mt-1">{errors.CusGender}</p>}
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    name="CusPassword"
                    value={formData.CusPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${errors.CusPassword ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#A67C52] focus:border-transparent transition-colors bg-white/50`}
                    placeholder="Enter your password"
                  />
                  {errors.CusPassword && <p className="text-red-500 text-xs mt-1">{errors.CusPassword}</p>}
                </div>
              </div>

              {/* Address Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  name="CusAddress"
                  value={formData.CusAddress}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full px-4 py-2 rounded-lg border ${errors.CusAddress ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#A67C52] focus:border-transparent transition-colors bg-white/50`}
                  placeholder="Enter your address"
                />
                {errors.CusAddress && <p className="text-red-500 text-xs mt-1">{errors.CusAddress}</p>}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-[#A67C52] to-[#8B6642] text-white rounded-xl shadow-lg hover:from-[#8B6642] hover:to-[#725538] transition-all duration-300 flex items-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <span>Update Profile</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EditCustomer;
