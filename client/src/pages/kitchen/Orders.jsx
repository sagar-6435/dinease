import React, { useState } from 'react';
import { Clock, CheckCircle, ChefHat } from 'lucide-react';

const mockOrders = [
  {
    id: '#DN1024',
    table: '12',
    status: 'NEW',
    time: new Date(Date.now() - 5 * 60000), // 5 mins ago
    items: [
      { name: 'Chicken Biryani', qty: 2, note: 'Extra spicy', addons: ['Raita'] },
      { name: 'Coke', qty: 2 }
    ]
  },
  {
    id: '#DN1025',
    table: '4',
    status: 'PREPARING',
    time: new Date(Date.now() - 15 * 60000), // 15 mins ago
    items: [
      { name: 'Paneer Tikka', qty: 1 }
    ]
  }
];

export default function KitchenOrders() {
  const [orders, setOrders] = useState(mockOrders);

  // Future: Socket.io logic will go here

  const moveOrder = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const renderColumn = (status, title, bgColor, icon) => (
    <div className="flex flex-col flex-1 bg-gray-50 rounded-xl p-4 overflow-hidden h-full">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-gray-200">
        {icon}
        <h2 className="font-bold text-xl text-gray-800">{title}</h2>
        <span className="ml-auto bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-sm font-semibold">
          {orders.filter(o => o.status === status).length}
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-2">
        {orders.filter(o => o.status === status).map(order => (
          <div key={order.id} className={`bg-white rounded-lg shadow-sm border-l-4 ${bgColor} p-4`}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-lg">{order.id}</h3>
                <span className="text-gray-500 text-sm">Table {order.table}</span>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-orange-600 font-medium">
                  <Clock size={16} />
                  <span>{Math.floor((Date.now() - order.time) / 60000)}m</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="bg-gray-50 rounded p-2 text-sm">
                  <div className="font-medium flex justify-between">
                    <span>{item.qty}x {item.name}</span>
                  </div>
                  {(item.note || item.addons) && (
                    <div className="text-gray-500 mt-1 pl-2 border-l-2 border-gray-300">
                      {item.note && <div className="italic text-xs">Note: {item.note}</div>}
                      {item.addons && <div className="text-xs">Add: {item.addons?.join(', ')}</div>}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-auto">
              {status === 'NEW' && (
                <button 
                  onClick={() => moveOrder(order.id, 'PREPARING')}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors"
                >
                  Accept & Prepare
                </button>
              )}
              {status === 'PREPARING' && (
                <button 
                  onClick={() => moveOrder(order.id, 'READY')}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition-colors"
                >
                  Mark Ready
                </button>
              )}
              {status === 'READY' && (
                <button 
                  onClick={() => moveOrder(order.id, 'SERVED')}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-medium transition-colors"
                >
                  Mark Served
                </button>
              )}
            </div>
          </div>
        ))}
        
        {orders.filter(o => o.status === status).length === 0 && (
          <div className="text-center text-gray-400 py-10">
            No orders here
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-gray-100 p-4 flex flex-col">
      <header className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kitchen Display System</h1>
          <p className="text-gray-500 text-sm">Paradise Biryani</p>
        </div>
        <div className="flex items-center gap-4">
           {/* Connection status can go here */}
           <span className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             Live
           </span>
        </div>
      </header>

      <div className="flex-1 flex gap-4 overflow-hidden">
        {renderColumn('NEW', 'New Orders', 'border-blue-500', <Clock className="text-blue-500" />)}
        {renderColumn('PREPARING', 'Preparing', 'border-orange-500', <ChefHat className="text-orange-500" />)}
        {renderColumn('READY', 'Ready', 'border-green-500', <CheckCircle className="text-green-500" />)}
      </div>
    </div>
  );
}
