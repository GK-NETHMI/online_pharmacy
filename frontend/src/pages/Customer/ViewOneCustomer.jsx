import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from '../Header';
import Footer from '../Footer';
import { motion } from "framer-motion";

const ViewCustomerDetails = ({ CusID }) => {
  const [customerData, setCustomerData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    CusName: "",
    CusEmail: "",
    CusPhone: "",
    CusAge: "",
    CusGender: "",
    CusID: "",
    CusProfile: "",
  });

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(`http://localhost:8071/customer/${CusID}`);
        setCustomerData(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching customer details:", error);
      }
    };

    fetchCustomerData();
  }, [CusID]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8071/customer/${CusID}`, formData);
      setCustomerData(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating customer details:", error);
    }
  };

  if (!customerData) return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#A67C52]"></div>
    </div>
  );

  const tabVariants = {
    active: { backgroundColor: "#A67C52", color: "white" },
    inactive: { backgroundColor: "transparent", color: "#666" }
  };

  return (
    <div className="bg-[#F8F9FA] text-gray-900 font-sans min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          {/* Top Banner */}
          <div className="relative h-80 w-full mb-24">
            <div className="absolute inset-0 bg-gradient-to-r from-[#6B9080] to-[#A67C52] opacity-90 z-10"></div>
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: "url('https://images.pexels.com/photos/3728296/pexels-photo-3728296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            ></div>
            
            {/* Profile Image and Info Container */}
            <div className="absolute bottom-0 transform translate-y-1/2 container mx-auto px-4 z-20">
              <div className="flex items-end max-w-6xl mx-auto">
                <div className="relative">
                  <img
                    src={formData.CusProfile || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-36 h-36 rounded-2xl border-4 border-white shadow-2xl object-cover"
                  />
                  {isEditing && (
                    <label htmlFor="profile-upload" 
                      className="absolute -right-2 -bottom-2 bg-white p-2 rounded-xl cursor-pointer shadow-lg hover:bg-[#A67C52] hover:text-white transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      </svg>
                      <input type="file" id="profile-upload" className="hidden" accept="image/*" onChange={handleChange} name="CusProfile" />
                    </label>
                  )}
                </div>
                <div className="ml-8 mb-4 text-white">
                  <h1 className="text-5xl font-bold text-gray-400 drop-shadow-lg">{formData.CusName}</h1>
                </div>
              </div>
            </div>
          </div>

          {/* Content Container */}
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Navigation Tabs */}
              <div className="flex space-x-1 mb-8 bg-white rounded-xl p-2 shadow-md max-w-md mx-auto">
                {['profile', 'security', 'preferences'].map((tab) => (
                  <motion.button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    animate={activeTab === tab ? "active" : "inactive"}
                    variants={tabVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-2 px-4 rounded-lg capitalize font-medium text-sm transition-all duration-300"
                  >
                    {tab}
                  </motion.button>
                ))}
              </div>

              {/* Main Content */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                {activeTab === 'profile' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Personal Information */}
                      <div className="space-y-6">
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
                          {!isEditing && (
                            <button
                              onClick={handleEditToggle}
                              className="flex items-center gap-2 text-[#A67C52] hover:text-[#6B9080] transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                              Edit Profile
                            </button>
                          )}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="space-y-4">
                            <div className="relative">
                              <label className="text-sm font-medium text-gray-600 mb-1 block">Full Name</label>
                              <input
                                type="text"
                                name="CusName"
                                value={formData.CusName}
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#A67C52] focus:border-transparent transition-all"
                                disabled={!isEditing}
                                required
                              />
                            </div>
                            <div className="relative">
                              <label className="text-sm font-medium text-gray-600 mb-1 block">Email</label>
                              <input
                                type="email"
                                name="CusEmail"
                                value={formData.CusEmail}
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#A67C52] focus:border-transparent transition-all"
                                disabled={!isEditing}
                                required
                              />
                            </div>
                            <div className="relative">
                              <label className="text-sm font-medium text-gray-600 mb-1 block">Phone</label>
                              <input
                                type="tel"
                                name="CusPhone"
                                value={formData.CusPhone}
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#A67C52] focus:border-transparent transition-all"
                                disabled={!isEditing}
                                required
                              />
                            </div>
                          </div>
                        </form>
                      </div>

                      {/* Additional Information */}
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Additional Information</h2>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="bg-gray-50 p-6 rounded-xl">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-500">Age</p>
                                <p className="text-lg font-semibold">{formData.CusAge} years</p>
                              </div>
                              <div className="h-12 w-12 bg-[#A67C52] bg-opacity-10 rounded-xl flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#A67C52]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-50 p-6 rounded-xl">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-500">Gender</p>
                                <p className="text-lg font-semibold">{formData.CusGender}</p>
                              </div>
                              <div className="h-12 w-12 bg-[#6B9080] bg-opacity-10 rounded-xl flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#6B9080]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-50 p-6 rounded-xl">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-500">Member Since</p>
                                <p className="text-lg font-semibold">January 2024</p>
                              </div>
                              <div className="h-12 w-12 bg-[#C6C67E] bg-opacity-10 rounded-xl flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#C6C67E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>

                        {isEditing && (
                          <div className="flex justify-end gap-4 mt-8">
                            <button
                              type="button"
                              onClick={() => setIsEditing(false)}
                              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-300"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleSubmit}
                              className="px-6 py-2 bg-[#A67C52] text-white rounded-xl hover:bg-[#8B6642] transition-all duration-300"
                            >
                              Save Changes
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'security' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-8"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-600">Security Settings Coming Soon</h3>
                    <p className="text-gray-500 mt-2">This feature is under development</p>
                  </motion.div>
                )}

                {activeTab === 'preferences' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-8"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-600">Preferences Coming Soon</h3>
                    <p className="text-gray-500 mt-2">This feature is under development</p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewCustomerDetails;
