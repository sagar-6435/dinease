import React from 'react';
import { Search, ShoppingBag, Star, Clock } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export default function HomePage({ forcedSlug }) {
  const { slug: paramSlug } = useParams();
  const activeSlug = forcedSlug || paramSlug;
  // We can now use activeSlug to fetch specific restaurant data!

  const categories = ['Starters', 'Main Course', 'Biryani', 'Desserts', 'Beverages'];
  const menuItems = [
    { id: 1, name: 'Chicken Dum Biryani', price: 299, type: 'non-veg', img: 'https://placehold.co/200x200/orange/white?text=Biryani', desc: 'Aromatic basmati rice layered with marinated chicken, cooked to perfection.' },
    { id: 2, name: 'Paneer Tikka', price: 249, type: 'veg', img: 'https://placehold.co/200x200/green/white?text=Paneer', desc: 'Cottage cheese cubes marinated in spices and grilled in a tandoor.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative pb-24 shadow-2xl">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Paradise Biryani</h1>
            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
              <span className="flex items-center gap-1 text-yellow-500 font-medium"><Star size={16} className="fill-current" /> 4.8</span>
              <span className="flex items-center gap-1"><Clock size={16} /> 20-30 min</span>
            </div>
          </div>
          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            Open
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search for dishes..." 
            className="w-full bg-gray-100 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium"
          />
        </div>
      </header>

      {/* Categories */}
      <div className="py-6 px-4">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Categories</h2>
        <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
          {categories.map((cat, idx) => (
            <button key={idx} className={`whitespace-nowrap px-5 py-2 rounded-full font-medium transition-colors ${idx === 0 ? 'bg-orange-600 text-white shadow-md shadow-orange-200' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="px-4">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Recommended</h2>
        <div className="space-y-4">
          {menuItems.map(item => (
            <Link to={`/item/${item.id}`} key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 block hover:shadow-md transition-shadow">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-3 h-3 rounded-full ${item.type === 'veg' ? 'bg-green-500' : 'bg-red-500'}`} />
                  <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                </div>
                <p className="text-orange-600 font-bold mb-2">₹{item.price}</p>
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{item.desc}</p>
              </div>
              <div className="relative shrink-0">
                <img src={item.img} alt={item.name} className="w-28 h-28 object-cover rounded-xl shadow-sm" />
                <button 
                  onClick={(e) => { e.preventDefault(); /* Add to cart logic */ }}
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white text-orange-600 border border-orange-200 font-bold px-5 py-1.5 rounded-lg shadow-sm hover:bg-orange-50 transition-colors uppercase text-sm"
                >
                  ADD
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      <div className="fixed bottom-6 w-full max-w-md px-4 z-20">
        <Link to="/cart" className="bg-orange-600 text-white p-4 rounded-2xl shadow-xl shadow-orange-200/50 flex justify-between items-center transition-transform hover:-translate-y-1">
          <div className="font-bold">
            <div className="text-lg">2 Items</div>
            <div className="text-sm text-orange-200 font-medium">Extra charges may apply</div>
          </div>
          <div className="flex items-center gap-2 font-bold text-lg bg-orange-700/50 px-4 py-2 rounded-xl">
            View Cart <ShoppingBag size={20} />
          </div>
        </Link>
      </div>
    </div>
  );
}
