import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Añadimos Link para navegar al carrito
import { supabase } from '../lib/supabase.ts';
import { useCart } from '../context/CartContext.tsx';
import { Plus, Minus } from 'lucide-react';

interface Product {
  id: string; // El id en la tabla products es un UUID (texto)
  name: string;
  description: string;
  size: string;
  price: number;
}

const Menu = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart, updateQuantity } = useCart();

  // Obtener los productos desde Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('name', { ascending: true });

        if (error) {
          throw error;
        }

        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Manejar la adición al carrito
  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  };

  // Obtener la cantidad de un producto en el carrito
  const getQuantityInCart = (productId: string) => {
    const item = cart.find((cartItem) => cartItem.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Nuestro Menú</h1>

      {/* Entradas Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Entradas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Salchicha Alemana</h3>
            <p className="text-gray-600 mb-4">Procedente de la Casa con Mostaza Bigotes</p>
            <p className="text-lg font-bold text-amber-900">$8.000</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Pan con Ajo</h3>
            <p className="text-gray-600 mb-4">Panecillos de la Casa con Mantequilla y Ajo Fresco</p>
            <p className="text-lg font-bold text-amber-900">$5.500</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Pan con Ajo y Queso</h3>
            <p className="text-gray-600 mb-4">Panecillos de la Casa con Mantequilla, Ajo Fresco y Queso</p>
            <p className="text-lg font-bold text-amber-900">$7.000</p>
          </div>
        </div>
      </section>

      {/* Pizzas Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Pizzas</h2>
        {loading ? (
          <p className="text-center text-gray-500">Cargando pizzas...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const quantity = getQuantityInCart(product.id);
              return (
                <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  <p className="text-gray-500 mb-4">Tamaño: {product.size}</p>
                  <p className="text-lg font-bold text-amber-900">${product.price.toLocaleString()}</p>
                  <div className="mt-4">
                    {quantity === 0 ? (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-amber-600 text-white py-2 rounded-lg font-semibold hover:bg-amber-700 transition"
                      >
                        Agregar al Carrito
                      </button>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                        <span className="text-lg font-semibold">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Bebidas Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Bebidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Cerveza Artesanal</h3>
            <ul className="text-gray-600 mb-4">
              <li>IB (Holzbrauhaus München)</li>
              <li>Dorada Negra</li>
              <li>Cordillera Rosé</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Gaseosas</h3>
            <ul className="text-gray-600 mb-4">
              <li>Hatsu</li>
              <li>Coca-cola 1.5L</li>
              <li>Canada Dry</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Botón para ir al carrito */}
      <section className="text-center">
        <Link
          to="/cart"
          className="inline-block bg-amber-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-700 transition"
        >
          Ver Carrito ({cart.length} ítems)
        </Link>
      </section>
    </div>
  );
};

export default Menu;