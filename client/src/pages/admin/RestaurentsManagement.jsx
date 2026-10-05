import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Search, X } from 'lucide-react';

export default function RestaurantsManagement() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    ownerPassword: ''
  });

  // Load actual data from MongoDB on mount
  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/restaurants`);
      const data = await res.json();
      if (data.success) {
        setRestaurants(data.data.restaurants);
      }
    } catch (err) {
      console.error("Failed to fetch restaurants", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/restaurants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      if (data.success) {
        setShowAddModal(false);
        setFormData({ restaurantName: '', ownerName: '', ownerPhone: '', ownerEmail: '', ownerPassword: '' });
        fetchRestaurants(); // Refresh the table
        alert('Restaurant and Owner Account Created Successfully!');
      } else {
        alert(data.message || 'Error creating restaurant');
      }
    } catch (err) {
      alert('Network error. Is the backend running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 relative">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Restaurant Management</h2>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={18} /> Add Restaurant
        </button>
      </div>

      <div className="p-4 border-b border-gray-200 flex gap-4 bg-gray-50">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search restaurants..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-gray-900 bg-white"
          />
        </div>
      </div>
      
      <div className="p-0 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-semibold text-gray-600">Restaurant Name</th>
              <th className="p-4 font-semibold text-gray-600">Owner</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
              <th className="p-4 font-semibold text-gray-600">Plan</th>
              <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500 font-medium">No restaurants found. Add one above!</td>
              </tr>
            ) : restaurants.map(res => (
              <tr key={res._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4 font-bold text-gray-800">{res.name}</td>
                <td className="p-4 font-medium text-gray-600">{res.ownerId?.name || 'N/A'}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${res.isActive ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {res.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-4 font-medium text-gray-600">{res.subscriptionPlan}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={18} /></button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Restaurant Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-xl font-bold text-gray-800">Add New Restaurant</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-200 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form className="p-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Restaurant Name</label>
                <input type="text" name="restaurantName" value={formData.restaurantName} onChange={handleChange} required className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-gray-900 bg-white" placeholder="e.g., Paradise Biryani" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Owner Name</label>
                  <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} required className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-gray-900 bg-white" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Owner Phone</label>
                  <input type="tel" name="ownerPhone" value={formData.ownerPhone} onChange={handleChange} required className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-gray-900 bg-white" placeholder="+91 9876543210" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Owner Email</label>
                <input type="email" name="ownerEmail" value={formData.ownerEmail} onChange={handleChange} required className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-gray-900 bg-white" placeholder="owner@restaurant.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Temporary Password</label>
                <input type="password" name="ownerPassword" value={formData.ownerPassword} onChange={handleChange} required className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-gray-900 bg-white" placeholder="••••••••" />
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isLoading} className="flex-1 px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold shadow-lg shadow-orange-200 transition-colors disabled:opacity-50">
                  {isLoading ? 'Creating...' : 'Create Restaurant'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
