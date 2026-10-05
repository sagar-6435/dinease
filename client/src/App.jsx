import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import HomePage from './pages/customer/HomePage';
import ItemDescription from './pages/customer/ItemDescription';
import Cart from './pages/customer/Cart';
import FeedbackForm from './pages/customer/FeedbackForm';
import KitchenOrders from './pages/kitchen/Orders';
import TablesManagement from './pages/restaurant/TablesManagement';
import AdminLayout from './pages/admin/AdminLayout';
import AdsManagement from './pages/admin/Adsmanagement';
import RestaurantsManagement from './pages/admin/RestaurentsManagement.jsx';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        
        {/* Customer Routes */}
        <Route path="/r/:slug" element={<HomePage />} />
        <Route path="/item/:id" element={<ItemDescription />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        
        {/* Kitchen Routes */}
        <Route path="/kitchen/orders" element={<KitchenOrders />} />
        
        {/* Restaurant Routes */}
        <Route path="/restaurant/tables" element={<TablesManagement />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<div className="p-6 font-bold text-xl text-gray-800">Admin Dashboard</div>} />
          <Route path="restaurants" element={<RestaurantsManagement />} />
          <Route path="ads" element={<AdsManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
