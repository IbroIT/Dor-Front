import React from 'react';
import { FaStar, FaStore, FaCrown, FaMedal, FaFire, FaShoppingBag } from 'react-icons/fa';

const VendorsSection = ({ setSelectedShop }) => {
  const vendors = [
    { 
      id: 1, 
      name: 'Бутик "Стиль"', 
      description: 'Модная одежда и аксессуары', 
      rating: 4.8, 
      section: 'a',
      years: 12,
      size: 'большой',
      badge: <FaCrown className="text-amber-400" />
    },
    { 
      id: 2, 
      name: 'Магазин "Спорт"', 
      description: 'Спортивная одежда и обувь', 
      rating: 4.7, 
      section: 'a',
      years: 8,
      size: 'средний',
      badge: <FaMedal className="text-blue-400" />
    },
    { 
      id: 3, 
      name: 'Электроника+', 
      description: 'Техника и гаджеты', 
      rating: 4.6, 
      section: 'b',
      years: 15,
      size: 'огромный',
      badge: <FaFire className="text-red-500" />
    },
    { 
      id: 4, 
      name: 'Восточные ковры', 
      description: 'Ковры ручной работы', 
      rating: 4.9, 
      section: 'c',
      years: 20,
      size: 'семейный',
      badge: <FaCrown className="text-amber-400" />
    },
    { 
      id: 5, 
      name: 'Детский мир', 
      description: 'Все для детей', 
      rating: 4.7, 
      section: 'd',
      years: 10,
      size: 'большой',
      badge: <FaMedal className="text-blue-400" />
    },
    { 
      id: 6, 
      name: 'Элит-мода', 
      description: 'Вечерние и свадебные платья', 
      rating: 4.8, 
      section: 'a',
      years: 7,
      size: 'бутик',
      badge: <FaFire className="text-red-500" />
    },
    { 
      id: 7, 
      name: 'Технодом', 
      description: 'Компьютеры и ноутбуки', 
      rating: 4.5, 
      section: 'b',
      years: 5,
      size: 'средний',
      badge: null
    },
    { 
      id: 8, 
      name: 'Мебель для вас', 
      description: 'Мебель для дома и офиса', 
      rating: 4.7, 
      section: 'e',
      years: 18,
      size: 'огромный',
      badge: <FaCrown className="text-amber-400" />
    },
    { 
      id: 9, 
      name: 'Бутик "Премиум"', 
      description: 'Эксклюзивная одежда из кожи', 
      rating: 4.9, 
      section: 'a',
      years: 6,
      size: 'бутик',
      badge: <FaFire className="text-red-500" />
    },
    { 
      id: 10, 
      name: 'Обувной дворик', 
      description: 'Обувь всех видов и размеров', 
      rating: 4.7, 
      section: 'a',
      years: 14,
      size: 'большой',
      badge: <FaMedal className="text-blue-400" />
    },
    { 
      id: 11, 
      name: 'Гаджет Центр', 
      description: 'Телефоны и планшеты', 
      rating: 4.6, 
      section: 'b',
      years: 4,
      size: 'средний',
      badge: null
    },
    { 
      id: 12, 
      name: 'Текстиль Хаус', 
      description: 'Постельное белье и покрывала', 
      rating: 4.8, 
      section: 'c',
      years: 22,
      size: 'семейный',
      badge: <FaCrown className="text-amber-400" />
    },
  ];

  return (
    <section id='shops' className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-amber-100 text-amber-800 px-6 py-2 rounded-full mb-4">
            <FaStore className="mr-2" />
            <span>Крупные магазины рынка</span>
          </div>
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Знакомьтесь с нашими лидерами</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Самые известные и проверенные временем магазины на рынке Аламедин
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {vendors.map(vendor => (
            <div 
              key={vendor.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer border border-gray-200"
              onClick={() => setSelectedShop(vendor.id)}
            >
              <div className="relative">
                <div className="bg-gray-200 border-b border-gray-300 h-40 flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="text-4xl text-gray-500 mb-2">
                      <FaStore />
                    </div>
                    <p className="font-medium text-gray-700">{vendor.name}</p>
                  </div>
                </div>
                
                {vendor.badge && (
                  <div className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-lg">
                    {vendor.badge}
                  </div>
                )}
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-blue-800">{vendor.name}</h3>
                  <div className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
                    <FaStore className="mr-1 text-sm" />
                    <span className="capitalize">{vendor.size}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{vendor.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex text-amber-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          size={14}
                          className={i < Math.floor(vendor.rating) ? "text-amber-400" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 font-medium">{vendor.rating}</span>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">{vendor.years} лет</span> на рынке
                  </div>
                </div>
                
                <button 
                  className="w-full mt-4 bg-blue-50 text-blue-700 py-2 rounded-lg hover:bg-blue-100 transition flex items-center justify-center"
                >
                  <FaShoppingBag className="mr-2" />
                  Посетить магазин
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-blue-700 text-white px-8 py-3 rounded-full hover:bg-blue-800 transition inline-flex items-center">
            <FaStore className="mr-2" />
            Смотреть все 1000+ магазинов
          </button>
        </div>
      </div>
    </section>
  );
};

export default VendorsSection;