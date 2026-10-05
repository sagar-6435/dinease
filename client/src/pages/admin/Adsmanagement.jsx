import React, { useState } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';

export default function AdsManagement() {
  const [ads, setAds] = useState([
    { id: 1, title: 'Summer Special Offer', status: 'Active', clicks: 120, image: 'https://placehold.co/150x150/orange/white?text=Ad+1' },
    { id: 2, title: 'Welcome Bonus 20%', status: 'Inactive', clicks: 45, image: 'https://placehold.co/150x150/orange/white?text=Ad+2' },
  ]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Ads Management</h2>
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
          <Plus size={18} /> Add New Ad
        </button>
      </div>
      
      <div className="p-0 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-semibold text-gray-600">Ad Title</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
              <th className="p-4 font-semibold text-gray-600">Clicks</th>
              <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map(ad => (
              <tr key={ad.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4 flex items-center gap-4">
                  <img src={ad.image} alt={ad.title} className="w-14 h-14 object-cover rounded-lg shadow-sm" />
                  <span className="font-semibold text-gray-800">{ad.title}</span>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${ad.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                    {ad.status}
                  </span>
                </td>
                <td className="p-4 font-medium text-gray-600">{ad.clicks}</td>
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
    </div>
  );
}
