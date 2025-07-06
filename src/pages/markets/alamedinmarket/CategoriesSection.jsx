import { 
  FaTshirt, FaShoePrints, FaLaptop, FaHome, FaChild, FaChair, 
  FaBed, FaGlasses, FaSmile, FaBasketballBall, FaCar, FaShoppingCart,
  FaStore
} from 'react-icons/fa';

const CategoriesSection = () => {
  const categories = [
    { 
      id: 'clothing', 
      name: 'Одежда', 
      icon: <FaTshirt className="text-3xl" />,
      shops: 320,
      description: 'От повседневной до дизайнерской одежды',
      color: 'from-blue-500 to-blue-700'
    },
    { 
      id: 'shoes', 
      name: 'Обувь', 
      icon: <FaShoePrints className="text-3xl" />,
      shops: 180,
      description: 'Все виды обуви для любого сезона',
      color: 'from-green-500 to-green-700'
    },
    { 
      id: 'electronics', 
      name: 'Электроника', 
      icon: <FaLaptop className="text-3xl" />,
      shops: 150,
      description: 'Техника, гаджеты и аксессуары',
      color: 'from-purple-500 to-purple-700'
    },
    { 
      id: 'home', 
      name: 'Товары для дома', 
      icon: <FaHome className="text-3xl" />,
      shops: 220,
      description: 'Все для вашего домашнего уюта',
      color: 'from-yellow-500 to-yellow-700'
    },
    { 
      id: 'kids', 
      name: 'Детские товары', 
      icon: <FaChild className="text-3xl" />,
      shops: 120,
      description: 'Одежда, игрушки и товары для детей',
      color: 'from-pink-500 to-pink-700'
    },
    { 
      id: 'furniture', 
      name: 'Мебель', 
      icon: <FaChair className="text-3xl" />,
      shops: 85,
      description: 'Мебель для дома и офиса',
      color: 'from-amber-500 to-amber-700'
    },
    { 
      id: 'textiles', 
      name: 'Текстиль', 
      icon: <FaBed className="text-3xl" />,
      shops: 95,
      description: 'Постельное белье, ковры, шторы',
      color: 'from-teal-500 to-teal-700'
    },
    { 
      id: 'accessories', 
      name: 'Аксессуары', 
      icon: <FaGlasses className="text-3xl" />,
      shops: 210,
      description: 'Сумки, украшения, часы и многое другое',
      color: 'from-indigo-500 to-indigo-700'
    },
    { 
      id: 'beauty', 
      name: 'Косметика', 
      icon: <FaSmile className="text-3xl" />,
      shops: 110,
      description: 'Косметика, парфюмерия, уход',
      color: 'from-rose-500 to-rose-700'
    },
    { 
      id: 'sports', 
      name: 'Спорттовары', 
      icon: <FaBasketballBall className="text-3xl" />,
      shops: 75,
      description: 'Спортивные товары и инвентарь',
      color: 'from-orange-500 to-orange-700'
    },
    { 
      id: 'auto', 
      name: 'Автозапчасти', 
      icon: <FaCar className="text-3xl" />,
      shops: 65,
      description: 'Автозапчасти и аксессуары',
      color: 'from-gray-500 to-gray-700'
    },
    { 
      id: 'food', 
      name: 'Продукты', 
      icon: <FaShoppingCart className="text-3xl" />,
      shops: 140,
      description: 'Продукты питания и напитки',
      color: 'from-lime-500 to-lime-700'
    },
  ];

  return (
    <section id='tovars' className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Торговые ряды Аламедин</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Более 1000 магазинов и бутиков на территории рынка. Выберите категорию, чтобы найти 
            специализированные магазины с нужными вам товарами.
          </p>
        </div>
        
        {/* Карточки категорий */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">
          {categories.map(category => (
            <div 
              key={category.id}
              className={`bg-gradient-to-br ${category.color} text-white rounded-xl shadow-lg overflow-hidden`}
            >
              <div className="p-4">
                <div className="bg-white/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                  {category.icon}
                </div>
                <h3 className="font-bold text-lg text-center mb-1">{category.name}</h3>
                <div className="flex items-center justify-center">
                  <FaStore className="mr-2 text-white/80" />
                  <span className="text-xl font-bold">{category.shops}</span>
                </div>
                <p className="text-white/90 text-xs text-center mt-2">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Общая статистика рынка */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-blue-800">Рынок Аламедин в цифрах</h3>
              <p className="text-gray-600">Крупнейший торговый центр в Бишкеке</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700">1000+</div>
                <div className="text-gray-600 text-sm">магазинов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700">70</div>
                <div className="text-gray-600 text-sm">торговых рядов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700">12</div>
                <div className="text-gray-600 text-sm">основных категорий</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700">30+</div>
                <div className="text-gray-600 text-sm">лет работы</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;