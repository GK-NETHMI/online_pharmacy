import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; 

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    CusID: '',
    CusName: '',
    CusEmail: '',
    CusPhone: '',
    CusAddress: '',
    CusPassword: '',
    CusConfirmPassword: '',
    CusAge: '',
    CusGender: '',
    CusProfile: ''
  });

  const [errors, setErrors] = useState({});
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // To control confirm password field visibility
  const [showPersonalInfo, setShowPersonalInfo] = useState(true); // Toggle Personal Info section
  const [showAccountInfo, setShowAccountInfo] = useState(false); // Toggle Account Info section

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'CusPassword' && value) {
      setShowConfirmPassword(true); // Show confirm password field when password is entered
    } else if (name === 'CusPassword' && !value) {
      setShowConfirmPassword(false); // Hide confirm password field when password is cleared
    }
  };

  const validateEmail = (CusEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(CusEmail);
  };

  const validatePhone = (CusPhone) => {
    const phoneRegex = /^\d{10}$/; // Adjust this regex based on your phone format
    return phoneRegex.test(CusPhone);
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.CusID) newErrors.CusID = "Username is required";
    if (!formData.CusName) newErrors.CusName = "Name is required";
    if (!formData.CusEmail) {
      newErrors.CusEmail = "Email is required";
    } else if (!validateEmail(formData.CusEmail)) {
      newErrors.CusEmail = "Invalid email format";
    }
    if (!formData.CusPhone) {
      newErrors.CusPhone = "Phone number is required";
    } else if (!validatePhone(formData.CusPhone)) {
      newErrors.CusPhone = "Phone number must be 10 digits";
    }
    if (!formData.CusAddress) newErrors.CusAddress = "Address is required";
    if (!formData.CusAge) newErrors.CusAge = "Age is required";
    if (!formData.CusGender) newErrors.CusGender = "Gender is required";
    if (!formData.CusPassword) {
      newErrors.CusPassword = "Password is required";
    } else if (formData.CusPassword !== formData.CusConfirmPassword) {
      newErrors.CusConfirmPassword = "Passwords do not match";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
        try {
             await axios.post('http://localhost:8071/customers', formData); // POST request to the backend
    
            // Show success message using SweetAlert2
            Swal.fire({
              title: 'Success!',
              text: 'Customer registration completed successfully.',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              // Navigate to '/customers/all' after successful submission
              navigate('/customers/all');
            });
    
      setFormData({
        CusID: '',
        CusName: '',
        CusEmail: '',
        CusPhone: '',
        CusAddress: '',
        CusPassword: '',
        CusConfirmPassword: '',
        CusAge: '',
        CusGender: '',
        CusProfile: ''
      });
      setErrors({});
      setShowConfirmPassword(false); // Hide confirm password after form submission
    }catch (error) {
        // Handle any errors during submission
        Swal.fire({
          title: 'Error!',
          text: 'There was an error submitting the form.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.error('Error submitting the form:', error);
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/1181465/pexels-photo-1181465.jpeg')`,
      }}
    >
      <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#6B9080]">Customer Registration</h2>
        <form onSubmit={handleSubmit}>

          {/* Collapsible Personal Information Section */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setShowPersonalInfo(!showPersonalInfo)}
              className="text-lg font-bold text-gray-700"
            >
              {showPersonalInfo ? '▼ Personal Information' : '► Personal Information'}
            </button>
            {showPersonalInfo && (
              <div>
                <div className="mb-4">
                  <label className="block mb-2 text-gray-700" htmlFor="CusName">Name with initials</label>
                  <input
                    type="text"
                    name="CusName"
                    value={formData.CusName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#6B9080] transition"
                    required
                  />
                  {errors.CusName && <p className="text-red-500 text-xs">{errors.CusName}</p>}
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-gray-700" htmlFor="CusEmail">Email</label>
                  <input
                    type="email"
                    name="CusEmail"
                    placeholder='xxx@example.com'
                    value={formData.CusEmail}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#6B9080] transition"
                    required
                  />
                  {errors.CusEmail && <p className="text-red-500 text-xs">{errors.CusEmail}</p>}
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-gray-700" htmlFor="CusPhone">Phone Number</label>
                  <input
                    type="number"
                    name="CusPhone"
                    value={formData.CusPhone}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#6B9080] transition"
                    required
                  />
                  {errors.CusPhone && <p className="text-red-500 text-xs">{errors.CusPhone}</p>}
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-gray-700" htmlFor="CusAddress">Address</label>
                  <input
                    type="text"
                    name="CusAddress"
                    value={formData.CusAddress}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#6B9080] transition"
                    required
                  />
                  {errors.CusAddress && <p className="text-red-500 text-xs">{errors.CusAddress}</p>}
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-gray-700" htmlFor="CusAge">Age</label>
                  <input
                    type="number"
                    name="CusAge"
                    value={formData.CusAge}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#6B9080] transition"
                    required
                  />
                  {errors.CusAge && <p className="text-red-500 text-xs">{errors.CusAge}</p>}
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-gray-700" htmlFor="CusGender">Gender</label>
                  <select
                    name="CusGender"
                    value={formData.CusGender}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#6B9080] transition"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.CusGender && <p className="text-red-500 text-xs">{errors.CusGender}</p>}
                </div>
              </div>
            )}
          </div>

          {/* Collapsible Account Information Section */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setShowAccountInfo(!showAccountInfo)}
              className="text-lg font-bold text-gray-700"
            >
              {showAccountInfo ? '▼ Account Information' : '► Account Information'}
            </button>
            {showAccountInfo && (
              <div>
                <div className="mb-4">
                  <label className="block mb-2 text-gray-700" htmlFor="CusID">Username</label>
                  <input
                    type="text"
                    name="CusID"
                    value={formData.CusID}
                    onChange={handleChange}
                    placeholder='Tomy123...'
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#6B9080] transition"
                    required
                  />
                  {errors.CusID && <p className="text-red-500 text-xs">{errors.CusID}</p>}
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-gray-700" htmlFor="CusPassword">Password</label>
                  <input
                    type="password"
                    name="CusPassword"
                    value={formData.CusPassword}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#6B9080] transition"
                    required
                  />
                  {errors.CusPassword && <p className="text-red-500 text-xs">{errors.CusPassword}</p>}
                </div>

                {showConfirmPassword && (
                  <div className="mb-4">
                    <label className="block mb-2 text-gray-700" htmlFor="CusConfirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      name="CusConfirmPassword"
                      value={formData.CusConfirmPassword}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#6B9080] transition"
                      required
                    />
                    {errors.CusConfirmPassword && <p className="text-red-500 text-xs">{errors.CusConfirmPassword}</p>}
                  </div>
                )}

                <div className="mb-4">
                  <label className="block mb-2 text-gray-700" htmlFor="CusProfile">Upload Profile</label>
                  <input
                    type="file"
                    name="CusProfile"
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#6B9080] transition"
                  />
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#6B9080] text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition w-[150px]"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
