import { HashRouter as Router, Routes, Route } from 'react-router-dom';import Layout from './components/Layout'; // Mantenemos el Layout para el header
import Home from './pages/Home';
import Menu from './pages/Menu.tsx';
import Cart from './pages/Cart.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Profile from './pages/Profile.tsx';
import Confirmation from './pages/Confirmation.tsx'; // Agregamos la ruta Confirmation
import { CartProvider } from './context/CartContext.tsx'; // Agregamos el CartProvider

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
};

export default App;