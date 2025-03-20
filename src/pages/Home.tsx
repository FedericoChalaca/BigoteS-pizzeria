import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { supabase } from '../lib/supabase'; // Importa el cliente de Supabase



const Home = () => {
  const images = [
    'https://i.postimg.cc/XNhnPw3B/gallery1.webp',
    'https://i.postimg.cc/HnJdxL0L/gallery2.webp',
    'https://i.postimg.cc/NMjQ3D5m/gallery3.webp',
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Estado para el formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
        ]);

      if (error) {
        throw error;
      }

      setSubmitMessage('¡Mensaje enviado con éxito!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitMessage('Error al enviar el mensaje. Intenta de nuevo.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-cover bg-center" style={{ backgroundImage: "url('https://i.postimg.cc/Bbds1GNB/hero.webp')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-70" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">Bigotes Pizzería Artesanal Alemana</h1>
            <p className="text-xl mb-8">Descubre el auténtico sabor de la pizza artesanal con un toque alemán</p>
            <Link to="/menu" className="bg-amber-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-amber-700 transition dark:bg-amber-500 dark:hover:bg-amber-600">
              Ver Menú
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">Quiénes Somos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
            <img
  src="https://i.postimg.cc/1t7ysFqT/restaurant.webp"
  alt="Restaurant"
  className="rounded-lg shadow-lg"
  loading="lazy"
/>  

            </div>
            <div>
              <p className="text-lg text-gray-700 mb-6 dark:text-gray-300">
                Bigotes nació de la pasión por la pizza artesanal y la tradición alemana. 
                Nuestro chef, con más de 20 años de experiencia, combina técnicas tradicionales 
                con ingredientes frescos y de alta calidad para crear pizzas únicas que no 
                encontrarás en ningún otro lugar.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                En nuestro acogedor restaurante, cada pizza es preparada con dedicación y 
                horneada en nuestro horno artesanal, garantizando ese sabor auténtico que 
                nos caracteriza.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section (Carrusel) */}
      <section className="py-20 bg-stone-100 dark:bg-gray-700">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">Nuestra Galería</h2>
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className="px-2">
                <img src={image} alt={`Galería ${index + 1}`} className="rounded-lg shadow-md w-full h-64 object-cover" loading="lazy"/>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">Descubre el Arte de Nuestra Pizza</h2>
          <div className="relative overflow-hidden rounded-lg shadow-md bg-gray-800">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-64 md:h-96"
            ></iframe>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-50"></div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">Contacto</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Información</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  <strong>Dirección:</strong><br />
                  Calle Principal #123<br />
                  Ciudad, País
                </p>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  <strong>Teléfono:</strong><br />
                  (123) 456-7890
                </p>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  <strong>Email:</strong><br />
                  info@bigotespizzeria.com
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Horario:</strong><br />
                  Lunes a Domingo<br />
                  12:00 PM - 10:00 PM
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Envíanos un mensaje</h3>
                {submitMessage && (
                  <p className={`mb-4 ${submitMessage.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                    {submitMessage}
                  </p>
                )}
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-gray-700 dark:text-gray-300">Nombre</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300">Asunto</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-700 dark:text-gray-300">Mensaje</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-amber-600 text-white p-2 rounded-lg hover:bg-amber-700 transition dark:bg-amber-500 dark:hover:bg-amber-600 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                  </button>
                </form>
              </div>
            </div>
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">Nuestra ubicación</h3>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.8100753999007!2d-74.0721!3d4.6097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMzYnMzQuOSJOIDc0wrAwNCcxOS42Ilc!5e0!3m2!1sen!2s!4v1635959562000!5m2!1sen!2s" 
                width="100%" 
                height="400"
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                className="rounded-lg shadow-md"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;