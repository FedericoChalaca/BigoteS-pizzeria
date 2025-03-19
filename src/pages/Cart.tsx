import React from 'react';
import { ShoppingCart } from 'lucide-react';

const Cart = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <ShoppingCart className="w-8 h-8" />
          Carrito de Compras
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <p className="text-gray-500 text-center">Tu carrito está vacío</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-semibold">$0</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Envío:</span>
            <span className="font-semibold">$0</span>
          </div>
          <div className="flex justify-between mb-6">
            <span className="text-gray-600">Total:</span>
            <span className="font-bold text-xl">$0</span>
          </div>
          <button 
            className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition"
            disabled
          >
            Proceder al Pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;