import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Añadimos useLocation
import { Facebook, Instagram, ShoppingCart, User, Sun, Moon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation(); // Obtenemos la ruta actual

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determinamos si estamos en la página del menú
  const isMenuPage = location.pathname === '/menu';

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-stone-50'}`}>
      <header
        className={`bg-amber-900 text-white dark:bg-gray-800 dark:text-gray-200 sticky top-0 z-50 shadow-md transition-all duration-300 ${
          isScrolled ? 'py-0.2' : 'py-3'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <img src="https://i.postimg.cc/mg57q6pf/Logo.webp" alt="Bigotes" className="h-14" />
              BigoteS
            </Link>

            {isScrolled ? (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="hover:text-amber-200 transition dark:hover:text-amber-300">
                  <User size={24} />
                </Link>
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 bg-amber-900 text-white rounded-full hover:bg-amber-800 transition dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                  </button>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-200 transition dark:hover:text-amber-300"
                  >
                    <Facebook size={24} />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-200 transition dark:hover:text-amber-300"
                  >
                    <Instagram size={24} />
                  </a>
                  <Link to="/cart" className="hover:text-amber-200 transition dark:hover:text-amber-300">
                    <ShoppingCart size={24} />
                  </Link>
                  <Link to="/login" className="hover:text-amber-200 transition dark:hover:text-amber-300">
                    <User size={24} />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="flex-1 bg-amber-900 text-white dark:bg-gray-800 dark:text-gray-200">
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

      {/* Mostramos el botón solo si NO estamos en la página del menú */}
      {!isMenuPage && (
        <Link
          to="/menu"
          className="fixed bottom-8 right-8 bg-amber-600 text-white rounded-full shadow-lg hover:bg-amber-700 transition transform hover:scale-105 dark:bg-amber-500 dark:hover:bg-amber-600 w-14 h-14 flex items-center justify-center"
        >
          <ShoppingCart size={24} />
        </Link>
      )}
    </div>
  );
};

export default Layout;