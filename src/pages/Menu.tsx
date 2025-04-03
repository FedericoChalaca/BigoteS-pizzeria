import { useState, useEffect, useRef } from 'react';
import Slider, { Slider as SliderType } from 'react-slick'; // Importamos el tipo Slider
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { supabase } from '../lib/supabase.ts';
import { useCart } from '../context/CartContext.tsx';
import { Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import pizzaImage from '../assets/gallery1.webp';
import NavigationBar from './NavigationBar.tsx';

interface Product {
  id: string;
  name: string;
  description: string;
  size: string;
  price: number;
  category: string;
  ingredients?: string[];
  image?: string;
}

// Flechas personalizadas para el slider (abajo a la derecha)
const CustomNextArrow = (props: any) => (
  <button
    {...props}
    className="absolute bottom-4 right-4 p-2 bg-amber-800 text-white rounded-full hover:bg-amber-900"
  >
    <ChevronRight className="w-6 h-6" />
  </button>
);

const CustomPrevArrow = (props: any) => (
  <button
    {...props}
    className="absolute bottom-4 left-4 p-2 bg-amber-800 text-white rounded-full hover:bg-amber-900"
  >
    <ChevronLeft className="w-6 h-6" />
  </button>
);

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Bebidas'); // Cambié el valor inicial a 'Bebidas'
  const categories = ['Bebidas', 'Entradas', 'Platos Fuertes'];
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart, updateQuantity } = useCart();
  const [currentPage, setCurrentPage] = useState<{ [key: string]: number }>({});
  const [selectedSize, setSelectedSize] = useState<{ [key: string]: string }>({});
  const [removedIngredients, setRemovedIngredients] = useState<{ [key: string]: string[] }>({});
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
// Referencia al slider con el tipo correcto
const sliderRef = useRef<any>(null); 
  // Configuración del slider
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  // Datos simulados como respaldo
  const mockPizzas: Product[] = [
    {
      id: '1',
      name: 'Pizza Jamón',
      description: 'Pizza clásica con jamón y queso',
      size: 'Mediana',
      price: 27000,
      category: 'pizza',
      ingredients: ['Tomate', 'Queso', 'Jamón'],
      image: pizzaImage,
    },
    {
      id: '2',
      name: 'Pizza Pepperoni',
      description: 'Pizza con pepperoni y salsa picante',
      size: 'Mediana',
      price: 30000,
      category: 'pizza',
      ingredients: ['Tomate', 'Queso', 'Pepperoni'],
      image: pizzaImage,
    },
    {
      id: '3',
      name: 'Pizza Hawaiana',
      description: 'Pizza con piña y jamón',
      size: 'Mediana',
      price: 29000,
      category: 'pizza',
      ingredients: ['Tomate', 'Queso', 'Jamón', 'Piña'],
      image: pizzaImage,
    },
  ];

  // Obtener productos desde Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('pizzas')
          .select('*')
          .order('name', { ascending: true });

        if (error) throw error;

        // Si no hay datos en Supabase, usamos datos simulados
        if (!data || data.length === 0) {
          console.warn('No se encontraron datos en la tabla pizzas, usando datos simulados.');
          setProducts(mockPizzas);
        } else {
          // Mapeamos los datos de Supabase y aseguramos la categoría
          const mappedProducts: Product[] = data.map((item: Product) => ({
            ...item,
            category: 'pizza',
            ingredients: item.ingredients || ['Tomate', 'Queso', 'Pepperoni'],
            image: pizzaImage,
          }));
          setProducts(mappedProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        // En caso de error, usamos datos simulados
        setProducts(mockPizzas);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Mapear categorías a índices del slider
  const categoryToSlideIndex: { [key: string]: number } = {
    Bebidas: 0, // Índice 0: Sección de Bebidas
    Entradas: 1, // Índice 1: Sección de Entradas
    'Platos Fuertes': 2, // Índice 2: Sección de Platos Fuertes
  };

  // Manejar el cambio de categoría y desplazar el slider
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    const slideIndex = categoryToSlideIndex[category];
    if (sliderRef.current && slideIndex !== undefined) {
      sliderRef.current.slickGoTo(slideIndex); // Desplazar el slider al índice correspondiente
    }
  };

  // Manejar la adición al carrito
  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: selectedSize[product.id] || product.size,
      removedIngredients: removedIngredients[product.id] || [],
    });
    setExpandedProduct(null);
  };

  // Obtener la cantidad de un producto en el carrito
  const getQuantityInCart = (productId: string) => {
    const item = cart.find((cartItem) => cartItem.id === productId);
    return item ? item.quantity : 0;
  };

  // Paginación
  const itemsPerPage = 9;
  const paginateItems = (category: string, items: Product[]) => {
    const page = currentPage[category] || 1;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const handlePageChange = (category: string, page: number) => {
    setCurrentPage((prev) => ({ ...prev, [category]: page }));
  };

  const getTotalPages = (items: Product[]) => Math.ceil(items.length / itemsPerPage);

  // Manejar personalización
  const handleSizeChange = (productId: string, size: string) => {
    setSelectedSize((prev) => ({ ...prev, [productId]: size }));
  };

  const handleIngredientToggle = (productId: string, ingredient: string) => {
    setRemovedIngredients((prev) => {
      const current = prev[productId] || [];
      if (current.includes(ingredient)) {
        return { ...prev, [productId]: current.filter((i) => i !== ingredient) };
      }
      return { ...prev, [productId]: [...current, ingredient] };
    });
  };

  // Filtrar productos por categoría
  const pizzas = products.filter((p) => p.category === 'pizza');

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <NavigationBar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange} // Usamos la nueva función
        currentPage={currentPage['pizza'] || 1}
        totalPages={getTotalPages(pizzas)}
        onPageChange={(page) => handlePageChange('pizza', page)}
      />
      {/* Contenido del menú que ocupa toda la página */}
      <div className="flex-1 flex items-left justify-center py-8">
        <div className="w-full px-4">
          <Slider {...sliderSettings} ref={sliderRef}>
            {/* Bebidas */}
            <div className="px-4">
              <h2 className="text-2xl font-bold mb-2 text-amber-900 text-center font-serif">Bebidas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-4 border border-amber-700 flex items-center gap-4">
                  <img
                    src="https://via.placeholder.com/100"
                    alt="Gaseosa"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-xl font-semibold mb-2 font-serif">Gaseosas</h3>
                    <ul className="text-gray-600 mb-2">
                      <li>Hatsu</li>
                      <li>Coca-cola 1.5L</li>
                      <li>Canada Dry</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Entradas */}
            <div className="px-4">
              <h2 className="text-2xl font-bold mb-2 text-amber-900 text-center font-serif">Entradas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-4 border border-amber-700 flex items-center gap-4">
                  <img
                    src="https://via.placeholder.com/100"
                    alt="Salchicha Alemana"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-xl font-semibold mb-2 font-serif">Salchicha Alemana</h3>
                    <p className="text-gray-600 mb-2">Procedente de la Casa con Mostaza Bigotes</p>
                    <p className="text-lg font-bold text-amber-900">$8.000</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 border border-amber-700 flex items-center gap-4">
                  <img
                    src="https://via.placeholder.com/100"
                    alt="Pan con Ajo"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-xl font-semibold mb-2 font-serif">Pan con Ajo</h3>
                    <p className="text-gray-600 mb-2">Panecillos de la Casa con Mantequilla y Ajo Fresco</p>
                    <p className="text-lg font-bold text-amber-900">$5.500</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 border border-amber-700 flex items-center gap-4">
                  <img
                    src="https://via.placeholder.com/100"
                    alt="Pan con Ajo y Queso"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-xl font-semibold mb-2 font-serif">Pan con Ajo y Queso</h3>
                    <p className="text-gray-600 mb-2">Panecillos de la Casa con Mantequilla, Ajo Fresco y Queso</p>
                    <p className="text-lg font-bold text-amber-900">$7.000</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Platos Fuertes (solo Pizzas) */}
            <div className="px-4">
              <h2 className="text-2xl font-bold mb-2 text-amber-900 text-center font-serif">Platos Fuertes</h2>
              {loading ? (
                <p className="text-center text-gray-500">Cargando pizzas...</p>
              ) : pizzas.length === 0 ? (
                <p className="text-center text-gray-500">No se encontraron pizzas.</p>
              ) : (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    {paginateItems('pizza', pizzas).map((product) => {
                      const quantity = getQuantityInCart(product.id);
                      const isExpanded = expandedProduct === product.id;
                      return (
                        <div
                          key={product.id}
                          className="bg-white rounded-lg shadow-md p-4 border border-amber-700 flex flex-col items-center"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-32 h-32 object-cover rounded-full mb-2"
                          />
                          <h3 className="text-xl font-semibold mb-1 font-serif text-center">{product.name}</h3>
                          <p className="text-gray-600 mb-2 text-center text-sm">{product.description}</p>
                          <p className="text-lg font-bold text-amber-900 mb-2">
                            ${product.price.toLocaleString()}
                          </p>
                          <div className="mt-2">
                            {quantity === 0 ? (
                              <button
                                onClick={() => setExpandedProduct(product.id)}
                                className="w-full bg-amber-800 text-white py-2 rounded-lg font-semibold hover:bg-amber-900 transition font-serif"
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
                          {/* Panel de personalización */}
                          {isExpanded && (
                            <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-700 w-full">
                              <h4 className="text-lg font-semibold mb-2 font-serif">Personalizar</h4>
                              {/* Selección de tamaño */}
                              <div className="mb-4">
                                <label className="block text-gray-700 mb-1 font-serif">Tamaño:</label>
                                <select
                                  value={selectedSize[product.id] || product.size}
                                  onChange={(e) => handleSizeChange(product.id, e.target.value)}
                                  className="w-full p-2 border rounded-lg"
                                >
                                  <option value="Pequeña">Pequeña</option>
                                  <option value="Mediana">Mediana</option>
                                  <option value="Grande">Grande</option>
                                </select>
                              </div>
                              {/* Eliminar ingredientes */}
                              <div className="mb-4">
                                <label className="block text-gray-700 mb-1 font-serif">Ingredientes:</label>
                                {product.ingredients?.map((ingredient) => (
                                  <div key={ingredient} className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      checked={(removedIngredients[product.id] || []).includes(
                                        ingredient
                                      )}
                                      onChange={() => handleIngredientToggle(product.id, ingredient)}
                                    />
                                    <span>{ingredient}</span>
                                  </div>
                                ))}
                              </div>
                              <button
                                onClick={() => handleAddToCart(product)}
                                className="w-full bg-amber-800 text-white py-2 rounded-lg font-semibold hover:bg-amber-900 transition font-serif"
                              >
                                Confirmar
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {/* Paginación */}
                  <div className="flex justify-center gap-2 mt-4">
                    {Array.from({ length: getTotalPages(pizzas) }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange('pizza', page)}
                        className={`px-4 py-2 rounded-lg font-serif ${
                          (currentPage['pizza'] || 1) === page ? 'bg-amber-800 text-white' : 'bg-gray-200'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Menu;