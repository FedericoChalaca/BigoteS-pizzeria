import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  // Calcular el subtotal
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // Supongamos un costo de envío fijo (puedes ajustarlo según tu lógica)
  const shipping = cart.length > 0 ? 5000 : 0; // $5.000 de envío si hay ítems
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <ShoppingCart className="w-8 h-8" />
            Carrito de Compras
          </h1>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <p className="text-gray-500 text-center">Tu carrito está vacío</p>
            <div className="text-center mt-4">
              <Link
                to="/menu"
                className="inline-block bg-amber-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-amber-700 transition"
              >
                Volver al Menú
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <ShoppingCart className="w-8 h-8" />
          Carrito de Compras
        </h1>

        {/* Lista de ítems */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-4 last:border-b-0"
            >
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">
                  ${item.price.toLocaleString()} x {item.quantity}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                >
                  <Plus className="w-5 h-5" />
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={clearCart}
            className="mt-4 text-red-500 hover:underline flex items-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Vaciar Carrito
          </button>
        </div>

        {/* Resumen del pedido */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-semibold">${subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Envío:</span>
            <span className="font-semibold">${shipping.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-6">
            <span className="text-gray-600">Total:</span>
            <span className="font-bold text-xl">${total.toLocaleString()}</span>
          </div>
          <Link
            to="/confirmation"
            className="w-full block bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition text-center"
          >
            Proceder al Pago
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;