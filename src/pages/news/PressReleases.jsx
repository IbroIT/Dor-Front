import { useState, useEffect, useRef } from 'react';
import { FiCalendar, FiChevronDown, FiChevronRight, FiMail, FiShare2, FiX, FiSearch } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const PressReleases = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedRelease, setExpandedRelease] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [pressReleases, setPressReleases] = useState([]);
  const [popularReleases, setPopularReleases] = useState([]);
  const searchRef = useRef(null);

  // Загрузка данных с бэкенда
  useEffect(() => {
  const fetchData = async () => {
  try {
    setIsLoading(true);
    
    // Загружаем все пресс-релизы
    const releasesResponse = await axios.get(
      'https://dor-back.onrender.com/api/press-releases/'
    );
    setPressReleases(releasesResponse.data);
    
    // Загружаем популярные релизы
    const popularResponse = await axios.get(
      'https://dor-back.onrender.com/api/press-releases/popular/'
    );
    setPopularReleases(popularResponse.data);
    
  } catch (error) {
    console.error('Error fetching press releases:', error);
    // Можно добавить уведомление пользователю об ошибке
  } finally {
    setIsLoading(false);
  }
};

  fetchData();
}, []);

  // Эффект для отслеживания прокрутки
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Фокус на поиск при нажатии Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Фильтрация релизов
  const filteredReleases = pressReleases.filter(release => {
    const matchesFilter = activeFilter === 'all' || 
                         release.market.includes(activeFilter) || 
                         release.type === activeFilter;
    const matchesSearch = release.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         release.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  const toggleRelease = (id) => {
    setExpandedRelease(expandedRelease === id ? null : id);
    if (expandedRelease !== id) {
      setTimeout(() => {
        document.getElementById(`release-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  };

  const shareRelease = (title, id) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: 'Посмотрите этот пресс-релиз от Дордой',
        url: `${window.location.origin}?release=${id}`
      }).catch(() => {});
    } else {
      const url = `${window.location.origin}?release=${id}`;
      navigator.clipboard.writeText(url).then(() => {
        alert('Ссылка скопирована в буфер обмена');
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Герой-секция */}
      <div className="relative h-96 bg-gradient-to-r from-blue-800 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.div 
            className="text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Пресс-релизы</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Официальные заявления, новости и анонсы мероприятий ассоциации "Дордой"
            </p>
          </motion.div>
        </div>
        <motion.div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
      </div>

      {/* Основной контент */}
      <main className="container mx-auto px-4 py-12 -mt-16 relative z-30">
        {/* Фильтры */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="w-full md:w-auto">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Фильтровать по:</h2>
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveFilter('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === 'all' ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                >
                  Все релизы
                </motion.button>
                
                <div className="relative group">
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1 transition-all ${['Дордой базар', 'Аламедин базар', 'Мадина базар'].includes(activeFilter) ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                  >
                    Рынки <FiChevronDown className="text-xs transition-transform group-hover:rotate-180" />
                  </motion.button>
                  <motion.div 
                    className="absolute z-10 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 hidden group-hover:block origin-top"
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    exit={{ scaleY: 0, opacity: 0 }}
                  >
                    {['Дордой базар', 'Аламедин базар', 'Мадина базар'].map(market => (
                      <button
                        key={market}
                        onClick={() => setActiveFilter(market)}
                        className={`block w-full text-left px-4 py-2 text-sm transition-colors ${activeFilter === market ? 'bg-blue-100 text-blue-800 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                      >
                        {market}
                      </button>
                    ))}
                  </motion.div>
                </div>
                
                <div className="relative group">
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1 transition-all ${['announcement', 'event_results', 'new_project', 'partnership'].includes(activeFilter) ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                  >
                    Тип <FiChevronDown className="text-xs transition-transform group-hover:rotate-180" />
                  </motion.button>
                  <motion.div 
                    className="absolute z-10 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 hidden group-hover:block origin-top"
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    exit={{ scaleY: 0, opacity: 0 }}
                  >
                    {[
                      { value: 'announcement', label: 'Анонсы' },
                      { value: 'event_results', label: 'Итоги мероприятий' },
                      { value: 'new_project', label: 'Новые проекты' },
                      { value: 'partnership', label: 'Партнерства' }
                    ].map(type => (
                      <button
                        key={type.value}
                        onClick={() => setActiveFilter(type.value)}
                        className={`block w-full text-left px-4 py-2 text-sm transition-colors ${activeFilter === type.value ? 'bg-blue-100 text-blue-800 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/3">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  ref={searchRef}
                  placeholder="Поиск по релизам..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FiX />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Список пресс-релизов */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Основной блок с релизами */}
          <div className="lg:col-span-2 space-y-8">
            <motion.h2 
              className="text-2xl font-bold text-blue-900 mb-6 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="w-3 h-8 bg-blue-600 rounded-full mr-3"></span>
              {activeFilter === 'all' ? 'Все пресс-релизы' : `Фильтр: ${activeFilter}`}
              <span className="text-blue-400 ml-2 text-lg font-normal">
                ({filteredReleases.length} {filteredReleases.length % 10 === 1 ? 'релиз' : filteredReleases.length % 10 < 5 ? 'релиза' : 'релизов'})
              </span>
            </motion.h2>

            {isLoading ? (
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <motion.div 
                    key={i} 
                    className="bg-white rounded-2xl shadow-md overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="h-48 bg-gradient-to-r from-blue-100 to-blue-50 animate-pulse"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-6 bg-blue-100 rounded w-3/4 animate-pulse"></div>
                      <div className="h-4 bg-blue-100 rounded w-1/4 animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-blue-100 rounded animate-pulse"></div>
                        <div className="h-4 bg-blue-100 rounded w-5/6 animate-pulse"></div>
                      </div>
                      <div className="h-10 bg-blue-100 rounded w-1/3 animate-pulse"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : filteredReleases.length > 0 ? (
              <AnimatePresence>
                {filteredReleases.map((release, index) => (
                  <motion.div
                    key={release.id}
                    id={`release-${release.id}`}
                    className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all ${expandedRelease === release.id ? 'ring-2 ring-blue-500' : 'hover:shadow-xl'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    exit={{ opacity: 0, y: -20 }}
                    layout
                  >
                    <motion.div className="md:flex" layout>
                      <div className="md:w-1/3 relative">
                        <img 
                          src={release.image} 
                          alt={release.title} 
                          className="w-full h-48 md:h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/800x600?text=Дордой';
                          }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-blue-600/90 rounded-full backdrop-blur-sm">
                            {release.market}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex justify-between items-start mb-3">
                          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                            {release.type === 'announcement' ? 'Анонс' : 
                             release.type === 'event_results' ? 'Итоги мероприятий' :
                             release.type === 'new_project' ? 'Новые проекты' : 'Партнерства'}
                          </span>
                          <div className="flex items-center text-sm text-blue-600">
                            <FiCalendar className="mr-1" />
                            {formatDate(release.date_published)}
                          </div>
                        </div>
                        
                        <motion.h3 
                          className="text-xl font-bold text-blue-900 mb-3"
                          layout="position"
                        >
                          {release.title}
                        </motion.h3>
                        <p className="text-blue-800 mb-4">{release.summary}</p>
                        
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <span className="text-sm text-blue-500 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                            </svg>
                            {release.views} просмотров
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => toggleRelease(release.id)}
                            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-md"
                          >
                            {expandedRelease === release.id ? 'Свернуть' : 'Подробнее'} 
                            <FiChevronRight className={`ml-1 transition-transform ${expandedRelease === release.id ? 'rotate-90' : ''}`} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                    
                    <AnimatePresence>
                      {expandedRelease === release.id && (
                        <motion.div 
                          className="p-6 border-t border-blue-100 bg-blue-50"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          layout
                        >
                          <div 
                            className="prose prose-blue max-w-none"
                            dangerouslySetInnerHTML={{ __html: release.content }}
                          />
                          
                          <motion.div 
                            className="mt-6 p-4 bg-white rounded-lg border border-blue-200 shadow-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                              <FiMail className="mr-2 text-blue-600" />
                              Контакты для СМИ:
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="font-medium text-blue-800">{release.contact_name}</p>
                                <p className="text-sm text-blue-700">{release.contact_position}</p>
                              </div>
                              <div>
                                <a href={`tel:${release.contact_phone}`} className="block text-blue-600 hover:text-blue-800 transition-colors">
                                  {release.contact_phone}
                                </a>
                                <a href={`mailto:${release.contact_email}`} className="block text-blue-600 hover:text-blue-800 transition-colors">
                                  {release.contact_email}
                                </a>
                              </div>
                            </div>
                          </motion.div>
                          
                          <div className="mt-4 flex items-center justify-between">
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => shareRelease(release.title, release.id)}
                              className="flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg border border-blue-200 hover:bg-blue-50 transition-all"
                            >
                              <FiShare2 className="mr-2" /> Поделиться
                            </motion.button>
                            <span className="text-sm text-blue-400">
                              Опубликовано: {formatDate(release.date_published)}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <motion.div 
                className="bg-white rounded-2xl shadow-xl p-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="max-w-md mx-auto">
                  <svg className="w-16 h-16 mx-auto text-blue-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <h3 className="text-xl font-medium text-blue-900 mb-2">Ничего не найдено</h3>
                  <p className="text-blue-700 mb-6">Попробуйте изменить параметры поиска или фильтрации</p>
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setActiveFilter('all'); setSearchTerm(''); }}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-md"
                  >
                    Сбросить фильтры
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Боковая панель */}
          <div className="space-y-8">
            {/* Популярные релизы */}
            <motion.div 
              className="bg-white rounded-2xl shadow-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                <span className="w-2 h-6 bg-gradient-to-b from-blue-500 to-blue-400 rounded-full mr-3"></span>
                Популярные релизы
              </h3>
              <div className="space-y-4">
                {popularReleases.map(release => (
                  <motion.div 
                    key={release.id} 
                    className="p-4 border border-blue-100 rounded-xl hover:border-blue-300 cursor-pointer transition-all hover:shadow-md"
                    whileHover={{ y: -2 }}
                    onClick={() => setExpandedRelease(release.id)}
                  >
                    <div className="flex items-start">
                      <div className="w-16 h-16 rounded-md overflow-hidden mr-3 flex-shrink-0">
                        <img 
                          src={release.image} 
                          alt={release.title} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/150?text=Дордой';
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-900 line-clamp-2">{release.title}</h4>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-blue-500">{formatDate(release.date_published)}</span>
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                            </svg>
                            {release.views}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Подписка */}
            <motion.div 
              className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl shadow-xl p-6 text-white overflow-hidden relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-white/10"></div>
              <div className="absolute -left-5 -bottom-5 w-24 h-24 rounded-full bg-white/5"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-3">Подписка для СМИ</h3>
                <p className="mb-4">Получайте новые пресс-релизы на электронную почту</p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Ваш email"
                    className="w-full px-4 py-3 rounded-lg text-blue-900 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 placeholder-blue-400"
                    required
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-4 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors shadow-md"
                  >
                    Подписаться
                  </motion.button>
                </form>
                <p className="text-blue-100 text-xs mt-3">Мы не рассылаем спам и не передаем ваши данные</p>
              </div>
            </motion.div>
            
            {/* Контакты */}
            <motion.div 
              className="bg-white rounded-2xl shadow-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                <span className="w-2 h-6 bg-gradient-to-b from-blue-500 to-blue-400 rounded-full mr-3"></span>
                Контакты пресс-службы
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <FiMail className="text-blue-600 text-lg" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900">Электронная почта</h4>
                    <a href="mailto:press@dordoi.kg" className="text-blue-600 hover:text-blue-800 transition-colors">
                      press@dordoi.kg
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900">Телефон</h4>
                    <a href="tel:+996312123456" className="text-blue-600 hover:text-blue-800 transition-colors">
                      +996 (312) 123-456
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900">Адрес</h4>
                    <p className="text-blue-800">
                      г. Бишкек, ул. Ленина 1, офис 201 (Пресс-центр Ассоциации "Дордой")
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Футер */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">Пресс-центр</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-300 transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Архив релизов</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Фото и видео</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Для СМИ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Рынки</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-300 transition-colors">Дордой базар</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Аламедин базар</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Мадина базар</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Дордой Плаза</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Ресурсы</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-300 transition-colors">Годовые отчеты</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Презентации</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Бренд-бук</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Логотипы</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Контакты</h4>
              <address className="not-italic space-y-2">
                <p>г. Бишкек, Кыргызстан</p>
                <p>ул. Ленина 1, офис 201</p>
                <p>press@dordoi.kg</p>
                <p>+996 (312) 123-456</p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-blue-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img 
                src="https://via.placeholder.com/150x60/1e3a8a/ffffff?text=Дордой" 
                alt="Логотип Дордой" 
                className="h-10"
              />
              <span className="ml-3 text-blue-300">© 2023 Ассоциация "Дордой"</span>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center hover:bg-blue-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center hover:bg-blue-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center hover:bg-blue-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center hover:bg-blue-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PressReleases;