import { useState } from 'react';
import { FiSearch, FiMapPin, FiPhone, FiClock, FiChevronDown, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const ShopsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все категории');
  const [selectedFloor, setSelectedFloor] = useState('Все этажи');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  // Пример данных магазинов
  const shops = [
    {
      id: 1,
      name: 'ZARA',
      category: 'Одежда',
      floor: '2 этаж',
      location: 'Секция A12',
      phone: '+996 555 123 456',
      hours: '10:00 - 22:00',
      logo: 'https://logo.clearbit.com/zara.com',
      isNew: true
    },
    {
      id: 2,
      name: 'Samsung',
      category: 'Электроника',
      floor: '1 этаж',
      location: 'Секция B05',
      phone: '+996 555 789 012',
      hours: '10:00 - 22:00',
      logo: 'https://logo.clearbit.com/samsung.com'
    },
    // ... другие магазины
  ];

  // Категории и этажи для фильтров
  const categories = ['Все категории', 'Одежда', 'Электроника', 'Обувь', 'Аксессуары', 'Красота', 'Детские товары'];
  const floors = ['Все этажи', '1 этаж', '2 этаж', '3 этаж', '4 этаж'];

  // Фильтрация магазинов
  const filteredShops = shops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все категории' || shop.category === selectedCategory;
    const matchesFloor = selectedFloor === 'Все этажи' || shop.floor === selectedFloor;
    
    return matchesSearch && matchesCategory && matchesFloor;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Шапка с поиском */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Магазины</h1>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Поиск магазинов..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <FiX className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
            
            <button 
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="md:hidden px-4 py-3 bg-white border border-gray-300 rounded-lg flex items-center justify-center gap-2"
            >
              <span>Фильтры</span>
              <FiChevronDown className={`transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {/* Фильтры для десктопа */}
          <div className="hidden md:flex gap-4 mb-6">
            <div className="relative flex-grow max-w-xs">
              <select
                className="block w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 appearance-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FiChevronDown className="text-gray-400" />
              </div>
            </div>
            
            <div className="relative flex-grow max-w-xs">
              <select
                className="block w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 appearance-none"
                value={selectedFloor}
                onChange={(e) => setSelectedFloor(e.target.value)}
              >
                {floors.map(floor => (
                  <option key={floor} value={floor}>{floor}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FiChevronDown className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Мобильные фильтры */}
      <AnimatePresence>
        {isFiltersOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-md overflow-hidden"
          >
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
                <select
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg bg-white"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Этаж</label>
                <select
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg bg-white"
                  value={selectedFloor}
                  onChange={(e) => setSelectedFloor(e.target.value)}
                >
                  {floors.map(floor => (
                    <option key={floor} value={floor}>{floor}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Список магазинов */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredShops.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShops.map(shop => (
              <motion.div
                key={shop.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{shop.name}</h3>
                      <p className="text-gray-500">{shop.category}</p>
                    </div>
                    {shop.logo && (
                      <img 
                        src={shop.logo} 
                        alt={`${shop.name} logo`} 
                        className="h-10 w-10 object-contain"
                      />
                    )}
                  </div>
                  
                  {shop.isNew && (
                    <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-3">
                      Новый
                    </span>
                  )}
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiMapPin className="text-blue-500" />
                      <span>{shop.floor}, {shop.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiPhone className="text-blue-500" />
                      <a href={`tel:${shop.phone}`} className="hover:text-blue-600">{shop.phone}</a>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiClock className="text-blue-500" />
                      <span>{shop.hours}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Магазины не найдены</h3>
            <p className="text-gray-500 mt-2">Попробуйте изменить параметры поиска</p>
          </div>
        )}
      </div>
      
      {/* Карта этажей */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Карта этажей</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {floors.filter(f => f !== 'Все этажи').map(floor => (
              <div key={floor} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">{floor}</h3>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition">
                  Посмотреть карту
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopsPage;