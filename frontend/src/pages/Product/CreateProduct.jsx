import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to install axios: npm install axios

const CreateProduct = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    PName: '',
    PDescription: '',
    PPrice: '',
    PQuantity: '',
    PCategory: '',
    PImage: ''
  });

  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    'Pain Relief',
    'Cold & Flu',
    'Vitamins',
    'First Aid',
    'Skin Care',
    'Baby Care',
    'Prescription Medicines',
    'Health Supplements'
  ];

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:5000/product');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'PPrice' || name === 'PQuantity' ? parseFloat(value) || '' : value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.PName) newErrors.PName = 'Product name is required';
    if (!formData.PDescription) newErrors.PDescription = 'Description is required';
    if (!formData.PPrice || formData.PPrice <= 0) newErrors.PPrice = 'Valid price is required';
    if (!formData.PQuantity || formData.PQuantity < 0) newErrors.PQuantity = 'Valid quantity is required';
    if (!formData.PCategory) newErrors.PCategory = 'Category is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsLoading(true);
      
      if (editMode) {
        // Update existing product
        await axios.put(`http://localhost:5000/product/${editId}`, formData);
      } else {
        // Add new product
        await axios.post('http://localhost:5000/product', formData);
      }
      
      // Refresh the product list
      await fetchProducts();
      
      // Reset form
      setFormData({
        PName: '',
        PDescription: '',
        PPrice: '',
        PQuantity: '',
        PCategory: '',
        PImage: ''
      });
      
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      PName: product.PName,
      PDescription: product.PDescription,
      PPrice: product.PPrice,
      PQuantity: product.PQuantity,
      PCategory: product.PCategory,
      PImage: product.PImage
    });
    setEditMode(true);
    setEditId(product._id); // Using MongoDB's _id for updates
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        setIsLoading(true);
        await axios.delete(`http://localhost:5000/product/${id}`);
        await fetchProducts(); // Refresh the list
      } catch (error) {
        console.error('Error deleting product:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50">
      <header className="bg-yellow-400 p-6 shadow-md">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800">PharmaCare Admin Panel</h1>
          <p className="text-gray-700">Manage Pharmacy Products</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editMode ? 'Edit Product' : 'Add New Product'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product ID */}
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="PID">
                  Product ID*
                </label>
                <input
                  type="text"
                  id="PID"
                  name="PID"
                  value={formData.PID}
                  onChange={handleChange}
                  disabled={editMode}
                  className={`w-full p-2 border rounded-md ${
                    errors.PID ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                />
                {errors.PID && (
                  <p className="text-red-500 text-sm mt-1">{errors.PID}</p>
                )}
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="PName">
                  Product Name*
                </label>
                <input
                  type="text"
                  id="PName"
                  name="PName"
                  value={formData.PName}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${
                    errors.PName ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                />
                {errors.PName && (
                  <p className="text-red-500 text-sm mt-1">{errors.PName}</p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="PPrice">
                  Price ($)*
                </label>
                <input
                  type="number"
                  id="PPrice"
                  name="PPrice"
                  value={formData.PPrice}
                  onChange={handleChange}
                  step="0.01"
                  min="0.01"
                  className={`w-full p-2 border rounded-md ${
                    errors.PPrice ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                />
                {errors.PPrice && (
                  <p className="text-red-500 text-sm mt-1">{errors.PPrice}</p>
                )}
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="PQuantity">
                  Quantity*
                </label>
                <input
                  type="number"
                  id="PQuantity"
                  name="PQuantity"
                  value={formData.PQuantity}
                  onChange={handleChange}
                  min="0"
                  className={`w-full p-2 border rounded-md ${
                    errors.PQuantity ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                />
                {errors.PQuantity && (
                  <p className="text-red-500 text-sm mt-1">{errors.PQuantity}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="PCategory">
                  Category*
                </label>
                <select
                  id="PCategory"
                  name="PCategory"
                  value={formData.PCategory}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${
                    errors.PCategory ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.PCategory && (
                  <p className="text-red-500 text-sm mt-1">{errors.PCategory}</p>
                )}
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="PImage">
                  Image URL
                </label>
                <input
                  type="text"
                  id="PImage"
                  name="PImage"
                  value={formData.PImage}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <label className="block text-gray-700 mb-2" htmlFor="PDescription">
                Description*
              </label>
              <textarea
                id="PDescription"
                name="PDescription"
                value={formData.PDescription}
                onChange={handleChange}
                rows="4"
                className={`w-full p-2 border rounded-md ${
                  errors.PDescription ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-yellow-400`}
              ></textarea>
              {errors.PDescription && (
                <p className="text-red-500 text-sm mt-1">{errors.PDescription}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-2 px-6 rounded-md transition duration-300"
              >
                {editMode ? 'Update Product' : 'Add Product'}
              </button>
              {editMode && (
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    setEditId(null);
                    setFormData({
                      PID: '',
                      PName: '',
                      PDescription: '',
                      PPrice: '',
                      PQuantity: '',
                      PCategory: '',
                      PImage: ''
                    });
                  }}
                  className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-md transition duration-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Product Inventory</h2>
          
          {products.length === 0 ? (
            <p className="text-gray-500 text-center py-6">No products added yet. Add your first product above.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-yellow-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      PID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Qty
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.PID} className="hover:bg-yellow-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {product.PID}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {product.PImage && (
                            <div className="flex-shrink-0 h-10 w-10 mr-4">
                              <img
                                className="h-10 w-10 object-cover rounded-md"
                                src={product.PImage}
                                alt={product.PName}
                              />
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {product.PName}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {product.PDescription.substring(0, 50)}
                              {product.PDescription.length > 50 ? '...' : ''}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.PCategory}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${product.PPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.PQuantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-yellow-600 hover:text-yellow-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.PID)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-yellow-400 p-6 mt-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-800">© 2025 PharmaCare Admin Panel</p>
        </div>
      </footer>
    </div>
  );
};

export default CreateProduct;