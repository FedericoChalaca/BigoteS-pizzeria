import { Link, useLocation } from 'react-router-dom';

const Confirmation = () => {
  const location = useLocation();
  const { orderId } = location.state || {};

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">¡Gracias por tu pedido!</h1>
        <p className="text-lg text-gray-600 mb-4">
          Tu pedido ha sido procesado con éxito. Tu número de pedido es: <strong>{orderId || 'N/A'}</strong>.
        </p>
        <p className="text-lg text-gray-600 mb-8">
          Te enviaremos una confirmación por correo electrónico con los detalles de tu pedido.
        </p>
        <Link
          to="/"
          className="bg-amber-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-700 transition"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;