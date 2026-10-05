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
import RestaurantsManagement from './pages/admin/RestaurentsManagement';
import About from './pages/About';

function App() {
  const hostname = window.location.hostname;
  let subdomain = null;

  // Detect if we are on a custom subdomain like "test.dinease.in"
  if (hostname.includes('dinease.in') && hostname !== 'dinease.in' && hostname !== 'www.dinease.in') {
    subdomain = hostname.split('.')[0];
  }
  // For local development testing (optional): if you set hosts file for test.localhost
  if (hostname.includes('localhost') && hostname !== 'localhost') {
    subdomain = hostname.split('.')[0];
  }

  // If a valid restaurant subdomain is detected, isolate the routing to just that restaurant
  if (subdomain && subdomain !== 'admin' && subdomain !== 'www') {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage forcedSlug={subdomain} />} />
          <Route path="/item/:id" element={<ItemDescription />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="*" element={<div className="min-h-screen flex flex-col items-center justify-center p-10 text-center font-bold text-gray-400"><h1 className="text-4xl text-gray-800 mb-2">404</h1>Page not found on this restaurant</div>} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        
        {/* Customer Routes (Fallback for local dev like /r/test) */}
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
