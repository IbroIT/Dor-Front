import { FaStar, FaStore, FaShoppingBag,FaCrown, FaMedal, FaFire  } from 'react-icons/fa';

const VendorsSection = ({ setSelectedShop }) => {
  const vendors = [
    { 
      id: 1, 
      name: 'Автозапчасти "Турбо"', 
      description: 'Оригинальные запчасти для иномарок', 
      rating: 4.9, 
      section: 'a',
      years: 15,
      size: 'крупный',
      badge: <FaCrown className="text-amber-400" />
    },
    { 
      id: 2, 
      name: 'Дизель Сервис', 
      description: 'Запчасти для дизельных двигателей', 
      rating: 4.7, 
      section: 'a',
      years: 12,
      size: 'средний',
      badge: <FaMedal className="text-blue-400" />
    },
    { 
      id: 3, 
      name: 'Автоэлектроника', 
      description: 'Электронные компоненты и диагностика', 
      rating: 4.8, 
      section: 'b',
      years: 10,
      size: 'средний',
      badge: <FaFire className="text-red-500" />
    },
    { 
      id: 4, 
      name: 'Грузовые запчасти', 
      description: 'Запчасти для грузовиков и спецтехники', 
      rating: 4.9, 
      section: 'c',
      years: 18,
      size: 'крупный',
      badge: <FaCrown className="text-amber-400" />
    },
    { 
      id: 5, 
      name: 'Мото-Мир', 
      description: 'Запчасти для мотоциклов и скутеров', 
      rating: 4.7, 
      section: 'd',
      years: 8,
      size: 'средний',
      badge: <FaMedal className="text-blue-400" />
    },
    { 
      id: 6, 
      name: 'Тюнинг Ателье', 
      description: 'Аксессуары и тюнинг для автомобилей', 
      rating: 4.8, 
      section: 'a',
      years: 7,
      size: 'бутик',
      badge: <FaFire className="text-red-500" />
    },
    { 
      id: 7, 
      name: 'Автостекло', 
      description: 'Стекла для любых автомобилей', 
      rating: 4.6, 
      section: 'b',
      years: 9,
      size: 'средний',
      badge: null
    },
    { 
      id: 8, 
      name: 'Масла и автохимия', 
      description: 'Автомасла, смазки, автохимия', 
      rating: 4.7, 
      section: 'e',
      years: 14,
      size: 'крупный',
      badge: <FaCrown className="text-amber-400" />
    },
    { 
      id: 9, 
      name: 'Тормозные системы', 
      description: 'Тормозные колодки, диски, суппорта', 
      rating: 4.9, 
      section: 'a',
      years: 11,
      size: 'средний',
      badge: <FaFire className="text-red-500" />
    },
    { 
      id: 10, 
      name: 'Автооптика', 
      description: 'Фары, фонари, светодиодное освещение', 
      rating: 4.7, 
      section: 'a',
      years: 6,
      size: 'бутик',
      badge: <FaMedal className="text-blue-400" />
    },
    { 
      id: 11, 
      name: 'Подвеска ПРО', 
      description: 'Амортизаторы, пружины, рычаги', 
      rating: 4.8, 
      section: 'b',
      years: 13,
      size: 'крупный',
      badge: null
    },
    { 
      id: 12, 
      name: 'Автоаксессуары', 
      description: 'Чехлы, коврики, автозвук', 
      rating: 4.6, 
      section: 'c',
      years: 5,
      size: 'средний',
      badge: <FaCrown className="text-amber-400" />
    },
  ];

  return (
    <section id='shops' className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-red-100 text-red-800 px-6 py-2 rounded-full mb-4">
            <FaStore className="mr-2" />
            <span>Лучшие магазины автозапчастей</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Знакомьтесь с нашими лидерами</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Самые известные и проверенные временем магазины на рынке Дордой Моторс
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
                <div className="bg-gray-100 border-b border-gray-300 h-40 flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="text-4xl text-red-700 mb-2">
                      <FaStore />
                    </div>
                    <p className="font-medium text-gray-900">{vendor.name}</p>
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
                  <h3 className="font-bold text-lg text-gray-900">{vendor.name}</h3>
                  <div className="flex items-center bg-red-50 text-red-700 px-2 py-1 rounded text-sm">
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
                  className="w-full mt-4 bg-red-50 text-red-700 py-2 rounded-lg hover:bg-red-100 transition flex items-center justify-center"
                >
                  <FaShoppingBag className="mr-2" />
                  Посетить магазин
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-red-700 text-white px-8 py-3 rounded-full hover:bg-red-800 transition inline-flex items-center">
            <FaStore className="mr-2" />
            Смотреть все 500+ магазинов
          </button>
        </div>
      </div>
    </section>
  );
};

export default VendorsSection;
