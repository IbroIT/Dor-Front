import { 
  FaOilCan, FaCogs, FaCarSide, FaCarBattery, 
  FaFilter, FaCarCrash, FaCarAlt, FaTruck, FaMotorcycle,
  FaShippingFast
} from 'react-icons/fa';

const CategoriesSection = () => {
  const categories = [
    { 
      id: 'engine', 
      name: 'Двигатель', 
      icon: <FaOilCan className="text-3xl" />,
      shops: 120,
      description: 'Запчасти для двигателя',
      color: 'from-red-500 to-red-700'
    },
    { 
      id: 'transmission', 
      name: 'Трансмиссия', 
      icon: <FaCogs className="text-3xl" />,
      shops: 85,
      description: 'КПП, сцепление, приводы',
      color: 'from-gray-500 to-gray-700'
    },
    { 
      id: 'suspension', 
      name: 'Подвеска', 
      icon: <FaCarSide className="text-3xl" />,
      shops: 110,
      description: 'Амортизаторы, рычаги, сайлентблоки',
      color: 'from-blue-500 to-blue-700'
    },
    { 
      id: 'brakes', 
      name: 'Тормоза', 
      icon: <FaCogs className="text-3xl" />,
      shops: 95,
      description: 'Колодки, диски, суппорта',
      color: 'from-yellow-500 to-yellow-700'
    },
    { 
      id: 'electrics', 
      name: 'Электрика', 
      icon: <FaCarBattery className="text-3xl" />,
      shops: 105,
      description: 'Аккумуляторы, генераторы, стартеры',
      color: 'from-green-500 to-green-700'
    },
    { 
      id: 'filters', 
      name: 'Фильтры', 
      icon: <FaFilter className="text-3xl" />,
      shops: 90,
      description: 'Воздушные, масляные, топливные',
      color: 'from-purple-500 to-purple-700'
    },
    { 
      id: 'body', 
      name: 'Кузовные детали', 
      icon: <FaCarCrash className="text-3xl" />,
      shops: 75,
      description: 'Бампера, крылья, фары',
      color: 'from-pink-500 to-pink-700'
    },
    { 
      id: 'wheels', 
      name: 'Колеса и шины', 
      icon: <FaCogs className="text-3xl" />,
      shops: 65,
      description: 'Диски, шины, колпаки',
      color: 'from-indigo-500 to-indigo-700'
    },
    { 
      id: 'interior', 
      name: 'Салон', 
      icon: <FaCarAlt className="text-3xl" />,
      shops: 70,
      description: 'Рули, сиденья, панели',
      color: 'from-teal-500 to-teal-700'
    },
    { 
      id: 'truck', 
      name: 'Грузовые', 
      icon: <FaTruck className="text-3xl" />,
      shops: 60,
      description: 'Запчасти для грузовиков',
      color: 'from-orange-500 to-orange-700'
    },
    { 
      id: 'motorcycle', 
      name: 'Мото', 
      icon: <FaMotorcycle className="text-3xl" />,
      shops: 45,
      description: 'Запчасти для мотоциклов',
      color: 'from-amber-500 to-amber-700'
    },
    { 
      id: 'tuning', 
      name: 'Тюнинг', 
      icon: <FaShippingFast className="text-3xl" />,
      shops: 55,
      description: 'Аксессуары и тюнинг',
      color: 'from-lime-500 to-lime-700'
    },
  ];

  return (
    <section id='parts' className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Категории автозапчастей</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Более 500 магазинов на территории рынка. Выберите категорию, чтобы найти 
            специализированные магазины с нужными вам запчастями.
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
                  <span className="text-xl font-bold">{category.shops}</span>
                  <span className="text-sm ml-1">магазинов</span>
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
              <h3 className="text-xl font-bold text-gray-900">Дордой Моторс в цифрах</h3>
              <p className="text-gray-600">Крупнейший рынок автозапчастей в Кыргызстане</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-700">500+</div>
                <div className="text-gray-600 text-sm">магазинов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-700">20</div>
                <div className="text-gray-600 text-sm">торговых рядов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-700">12</div>
                <div className="text-gray-600 text-sm">основных категорий</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-700">20+</div>
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
