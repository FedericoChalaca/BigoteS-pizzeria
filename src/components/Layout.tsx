import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, ShoppingCart, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-stone-50'}`}>
      <header className="bg-amber-900 text-white dark:bg-gray-800 dark:text-gray-200 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="Bigotes" className="h-12" />
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="hover:text-amber-200 transition dark:hover:text-amber-300">Inicio</Link>
              <Link to="/menu" className="hover:text-amber-200 transition dark:hover:text-amber-300">Menú</Link>
              <a href="#about" className="hover:text-amber-200 transition dark:hover:text-amber-300">Nosotros</a>
              <a href="#contact" className="hover:text-amber-200 transition dark:hover:text-amber-300">Contacto</a>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition dark:bg-gray-700 dark:text-white"
              >
                {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
              </button>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-200 transition dark:hover:text-amber-300">
                <Facebook size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-200 transition dark:hover:text-amber-300">
                <Instagram size={24} />
              </a>
              <Link to="/cart" className="hover:text-amber-200 transition dark:hover:text-amber-300">
                <ShoppingCart size={24} />
              </Link>
              <Link to="/login" className="hover:text-amber-200 transition dark:hover:text-amber-300">
                <User size={24} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        {children}
      </main>

      <footer className="bg-amber-900 text-white mt-20 dark:bg-gray-800 dark:text-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Horarios</h3>
              <p>Lunes a Domingo</p>
              <p>12:00 PM - 10:00 PM</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contacto</h3>
              <p>Teléfono: (123) 456-7890</p>
              <p>Email: info@bigotespizzeria.com</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Ubicación</h3>
              <p>Calle Principal #123</p>
              <p>Ciudad, País</p>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-amber-200 hover:text-amber-100 transition dark:text-amber-300 dark:hover:text-amber-400"
              >
                Ver en Google Maps
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Botón fijo flotante ajustado */}
      <Link
        to="/Menu" // Corregí a "/menu" para consistencia con las rutas
        className="fixed bottom-8 right-8 bg-amber-600 text-white rounded-full shadow-lg hover:bg-amber-700 transition transform hover:scale-105 dark:bg-amber-500 dark:hover:bg-amber-600 w-14 h-14 flex items-center justify-center"
      >
        <ShoppingCart size={24} />
      </Link>
    </div>
  );
};

export default Layout;