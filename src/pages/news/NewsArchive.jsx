import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import NewsItem from './ArchiveItem'; // Предполагается, что у вас есть этот компонент

const NewsArchive = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('Все');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [newsData, setNewsData] = useState([]);
  const [categories, setCategories] = useState(['Все']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Базовый URL API (должен совпадать с вашим Django бэкендом)
 const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'; // для Vite


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Загрузка категорий
        const categoriesResponse = await axios.get(`${API_BASE_URL}/api/news/categories/`);
        setCategories(['Все', ...categoriesResponse.data.map(cat => cat.name)]);
        
        // Загрузка новостей
        const newsResponse = await axios.get(`${API_BASE_URL}/api/news/archive/`);
        setNewsData(newsResponse.data);
      } catch (err) {
        console.error('Error fetching news archive:', err);
        setError('Не удалось загрузить данные. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [API_BASE_URL]);

  // Получаем уникальные года из данных
  const years = ['Все', ...new Set(newsData.map(item => new Date(item.date).getFullYear()))].sort((a, b) => b - a);
  
  // Фильтрация данных
  const filteredNews = newsData.filter(item => {
    const itemYear = new Date(item.date).getFullYear();
    const itemCategories = item.categories.map(cat => cat.name);
    
    const matchesYear = selectedYear === 'Все' || itemYear === parseInt(selectedYear);
    const matchesCategory = selectedCategory === 'Все' || itemCategories.includes(selectedCategory);
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesYear && matchesCategory && matchesSearch;
  });

  // Анимации
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-800 sm:text-5xl mb-4">
            Архив новостей
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Все значимые события и анонсы ассоциации "ДОРДОЙ"
          </p>
        </motion.div>

        {/* Сообщение об ошибке */}
        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg"
          >
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Кнопка для мобильных фильтров */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <span className="font-medium text-gray-700">Фильтры</span>
            <svg
              className={`h-5 w-5 text-gray-500 transform transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Фильтры */}
        <div className={`${isFiltersOpen ? 'block' : 'hidden'} md:block bg-white rounded-xl shadow-lg p-6 mb-12`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Фильтр по году */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Год публикации</label>
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg appearance-none bg-white"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Фильтр по категории */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Категория</label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg appearance-none bg-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Поиск */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Поиск по новостям</label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Введите ключевые слова..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Результаты */}
        <div className="mb-12">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredNews.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {filteredNews.map(news => (
                  <motion.div
                    key={news.id}
                    variants={itemVariants}
                    layout
                  >
                    <NewsItem 
                      title={news.title}
                      excerpt={news.excerpt}
                      date={news.date}
                      image={news.image}
                      categories={news.categories}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 bg-white rounded-xl shadow-lg"
            >
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Новости не найдены</h3>
              <p className="mt-1 text-gray-500">Попробуйте изменить параметры поиска</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedYear('Все');
                  setSelectedCategory('Все');
                }}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Сбросить фильтры
              </button>
            </motion.div>
          )}
        </div>

        {/* Кнопка возврата */}
        <div className="text-center">
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            Вернуться на главную
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsArchive;