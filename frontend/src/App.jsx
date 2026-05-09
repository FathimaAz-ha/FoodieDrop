import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Notification from './components/Notification';
import { useCart } from './context/CartContext';

function App() {
  const { notification } = useCart();

  return (
    <HashRouter>
      <Navbar />
      {notification && <Notification message={notification} />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  );
}

export default App;
