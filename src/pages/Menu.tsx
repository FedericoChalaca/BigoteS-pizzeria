import React from 'react';

const Menu = () => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pizza cards will be populated from database */}
        </div>
      </section>

      {/* Bebidas Section */}
      <section>
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
    </div>
  );
};

export default Menu;