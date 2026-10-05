import React from 'react';
import { Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart() {
  // Mock cart context
  const cartItems = [
    { id: 1, name: 'Chicken Biryani', price: 299, qty: 1, type: 'non-veg', note: 'Extra spicy' },
    { id: 2, name: 'Fresh Lime Soda', price: 99, qty: 2, type: 'veg' },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto relative shadow-2xl">
      <header className="bg-white px-4 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900">Your Cart</h1>
        <div className="text-orange-600 font-semibold bg-orange-50 px-3 py-1 rounded-full">Table 12</div>
      </header>

      <main className="flex-1 p-4 pb-32">
        {cartItems.length > 0 ? (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-3 h-3 rounded-full ${item.type === 'veg' ? 'bg-green-500' : 'bg-red-500'}`} />
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  </div>
                  <p className="text-orange-600 font-medium mb-3">₹{item.price}</p>
                  {item.note && <p className="text-xs text-gray-500 mb-3">Note: {item.note}</p>}
                  
                  <div className="flex items-center gap-3 bg-gray-100 rounded-full w-max p-1">
                    <button className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-600">
                      <Minus size={14} />
                    </button>
                    <span className="font-semibold text-sm w-4 text-center">{item.qty}</span>
                    <button className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center shadow-sm text-white">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div className="font-bold text-gray-900">
                  ₹{item.price * item.qty}
                </div>
              </div>
            ))}

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mt-6">
              <h3 className="font-bold mb-4 text-gray-800">Bill Details</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Item Total</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & Charges (5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-100 my-2 pt-2 flex justify-between font-bold text-gray-900 text-lg">
                  <span>To Pay</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center mt-20">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6 text-gray-400">
              <ShoppingBag size={48} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
            <Link to="/r/demo" className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-orange-200">
              Browse Menu
            </Link>
          </div>
        )}
      </main>

      {cartItems.length > 0 && (
        <div className="fixed bottom-0 w-full max-w-md bg-white p-4 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] border-t border-gray-100">
          <Link to="/order/tracking" className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-orange-200">
            Place Order <ArrowRight size={20} />
          </Link>
        </div>
      )}
    </div>
  );
}
