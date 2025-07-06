import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPressReleases } from '../../services/api';

const PressReleasesPage = () => {
  const [activeRelease, setActiveRelease] = useState(null);
  const [filterYear, setFilterYear] = useState('Все');
  const [filterCategory, setFilterCategory] = useState('Все');
  const [pressReleases, setPressReleases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPressReleases();
        setPressReleases(data);
      } catch (error) {
        console.error('Error fetching press releases:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Получаем уникальные года и категории из данных
  const years = ['Все', ...new Set(pressReleases.map(item => item.year))];
  const categories = ['Все', ...new Set(pressReleases.map(item => item.category))];

  const filteredReleases = pressReleases.filter(release => {
    return (
      (filterYear === 'Все' || release.year === filterYear) &&
      (filterCategory === 'Все' || release.category === filterCategory)
    );
  });


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const openRelease = (id) => {
    setActiveRelease(pressReleases.find(item => item.id === id));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeRelease = () => {
    setActiveRelease(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-blue-700">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat"></div>
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Пресс-релизы
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Новости и события Ассоциации "Дордой"
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeRelease ? (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-xl shadow-xl overflow-hidden"
            >
              <div className="relative h-64 md:h-80 bg-blue-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-80"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-[url('/images/pattern-light.svg')] opacity-10 absolute inset-0"></div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white text-center px-8 relative z-10">
                    {activeRelease.title}
                  </h2>
                </div>
                <button 
                  onClick={closeRelease}
                  className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-300 z-20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                    {activeRelease.category}
                  </span>
                  <span className="text-gray-500">
                    {activeRelease.date}
                  </span>
                </div>
                
                <div 
                  className="prose max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: activeRelease.content }}
                />
                
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">О компании</h3>
                  <p className="text-gray-700 mb-6">
                    Ассоциация «Дордой» — крупнейший торгово-логистический комплекс в Центральной Азии, основанный в 1991 году. За более чем 30 лет работы «Дордой» превратился в мощный экономический и социальный институт, оказывающий значительное влияние на развитие экономики Кыргызстана и поддержку социальных инициатив.
                  </p>
                  
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Контактная информация для СМИ</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Пресс-служба Ассоциации «Дордой»</h4>
                      <p className="text-gray-600">Телефон: <a href="tel:+996312123456" className="text-blue-600 hover:underline">+996 (312) 123-456</a></p>
                      <p className="text-gray-600">Электронная почта: <a href="mailto:press@dordoi.kg" className="text-blue-600 hover:underline">press@dordoi.kg</a></p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Адрес</h4>
                      <p className="text-gray-600">г. Бишкек, ул. Дордой, 1</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <>
            {/* Filters */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md p-6 mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="year-filter" className="block text-sm font-medium text-gray-700 mb-1">Год</label>
                  <select
                    id="year-filter"
                    value={filterYear}
                    onChange={(e) => setFilterYear(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
                  <select
                    id="category-filter"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Releases List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredReleases.map((release, index) => (
                <motion.div
                  key={release.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => openRelease(release.id)}
                >
                  <div className="h-48 bg-gradient-to-r from-blue-800 to-blue-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] opacity-10"></div>
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <h3 className="text-xl font-bold text-white text-center line-clamp-3">
                        {release.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                        {release.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {release.date}
                      </span>
                    </div>
                    <button className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                      Читать далее
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredReleases.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Ничего не найдено</h3>
                <p className="text-gray-600">Попробуйте изменить параметры фильтрации</p>
              </motion.div>
            )}

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <nav className="inline-flex rounded-md shadow">
                <a
                  href="#"
                  className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-blue-600 hover:bg-gray-50"
                >
                  Назад
                </a>
                <a
                  href="#"
                  className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-blue-600 hover:bg-gray-50"
                >
                  1
                </a>
                <a
                  href="#"
                  className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  2
                </a>
                <a
                  href="#"
                  className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  3
                </a>
                <a
                  href="#"
                  className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-blue-600 hover:bg-gray-50"
                >
                  Вперед
                </a>
              </nav>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PressReleasesPage;