import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewCustomerDetails = ({ customerId }) => {
  const [customerData, setCustomerData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
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
        const response = await axios.get(`/api/customers/${customerId}`);
        setCustomerData(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching customer details:", error);
      }
    };

    fetchCustomerData();
  }, [customerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/customers/${customerId}`, formData);
      setCustomerData(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating customer details:", error);
    }
  };

  if (!customerData) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-poppins">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-[#A67C52] mb-6 text-center">Customer Details</h1>
        
        {/* Profile Section */}
        <div className="flex flex-col items-center">
          <img
            src={formData.CusProfile || "https://via.placeholder.com/150"}
            alt="Profile"
            className="h-28 w-28 rounded-full border-4 border-gray-300 shadow-md"
          />
          <h2 className="mt-3 text-lg font-semibold text-gray-700">{formData.CusName}</h2>
          <p className="text-gray-500">{formData.CusEmail}</p>
        </div>

        {/* Details Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 font-medium">Full Name</label>
              <input
                type="text"
                name="CusName"
                value={formData.CusName}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring focus:ring-[#F5E0C3]"
                disabled={!isEditing}
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Email</label>
              <input
                type="email"
                name="CusEmail"
                value={formData.CusEmail}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring focus:ring-[#F5E0C3]"
                disabled={!isEditing}
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Phone</label>
              <input
                type="tel"
                name="CusPhone"
                value={formData.CusPhone}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring focus:ring-[#F5E0C3]"
                disabled={!isEditing}
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Age</label>
              <input
                type="number"
                name="CusAge"
                value={formData.CusAge}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring focus:ring-[#F5E0C3]"
                disabled={!isEditing}
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Gender</label>
              <select
                name="CusGender"
                value={formData.CusGender}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring focus:ring-[#F5E0C3]"
                disabled={!isEditing}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Customer ID</label>
              <input
                type="text"
                name="CusID"
                value={formData.CusID}
                className="w-full p-3 border rounded-lg bg-gray-200 cursor-not-allowed"
                disabled
              />
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-4">
            {isEditing ? (
              <>
                <button
                  type="submit"
                  className="bg-[#C6C67E] text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#A67C52] transition-all"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-400 text-white py-2 px-6 rounded-lg shadow-md hover:bg-gray-500 transition-all"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEditToggle}
                className="bg-[#6B9080] text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#557F6C] transition-all"
              >
                Edit Details
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewCustomerDetails;
