import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import NewsCarousel from './NewsCarousel';

const News = () => {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [visibleNews, setVisibleNews] = useState(6);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        
        // Загружаем featured новости
        const featuredResponse = await axios.get(
          'https://dor-back.onrender.com/api/news/featured/'
        );
        
        // Загружаем все новости
        const allNewsResponse = await axios.get(
          'https://dor-back.onrender.com/api/news/'
        );
        
        setFeaturedNews(featuredResponse.data);
        setAllNews(allNewsResponse.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const loadMoreNews = () => {
    setVisibleNews(prev => prev + 3);
  };

  const openModal = (news) => {
    setSelectedNews(news);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedNews(null);
    document.body.style.overflow = 'auto';
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.8 }}
        className="flex flex-col items-center"
      >
        <div className="h-16 w-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p className="text-blue-800 font-medium text-lg">Загружаем свежие новости...</p>
      </motion.div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-8 rounded-2xl shadow-2xl max-w-md text-center border border-blue-100"
      >
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-blue-800 mb-2">Ошибка загрузки</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.reload()}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-8 rounded-full shadow-md transition-all duration-300"
        >
          Попробовать снова
        </motion.button>
      </motion.div>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Карусель с главными новостями */}
        <NewsCarousel news={featuredNews} openModal={openModal} />
        
        {/* Секция с последними новостями */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16 mt-10"
        >
          <motion.h2 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold mb-12 text-center text-blue-900 relative inline-block mx-auto"
          >
            Последние новости
            <motion.span 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
            ></motion.span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allNews.slice(0, visibleNews).map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                onClick={() => openModal(news)}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className="relative overflow-hidden h-64">
                  <motion.img 
                    src={news.image || '/default-news.jpg'} 
                    alt={news.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    onError={(e) => {
                      e.target.src = '/default-news.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent p-4 flex flex-col justify-end">
                    <span className="text-white text-sm bg-blue-600/90 px-3 py-1 rounded-full inline-block self-start">
                      {new Date(news.date_published).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-blue-800 group-hover:text-blue-600 transition-colors">{news.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{news.short_description}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-blue-600 font-medium flex items-center group">
                      Читать далее
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Кнопка "Показать еще" */}
        {visibleNews < allNews.length && (
          <div className="text-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loadMoreNews}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center"
            >
              Показать еще
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
              </svg>
            </motion.button>
          </div>
        )}
      </div>

      {/* Модальное окно */}
      <AnimatePresence>
        {selectedNews && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
                <div className="relative h-64 md:h-80 bg-blue-50 overflow-hidden">
                  <img 
                    src={selectedNews.image || '/default-news.jpg'} 
                    alt={selectedNews.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/default-news.jpg';
                    }}
                  />
                  <button 
                    onClick={closeModal}
                    className="absolute top-4 right-4 bg-white/80 hover:bg-white text-blue-800 rounded-full p-2 shadow-md transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="p-6 md:p-8 overflow-y-auto flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-blue-600 bg-blue-100 px-3 py-1 rounded-full text-sm">
                      {new Date(selectedNews.date_published).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">{selectedNews.title}</h2>
                  
                  <div className="prose max-w-none text-gray-700">
                    {selectedNews.content.split('\n').map((paragraph, i) => (
                      <p key={i} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-gray-100 p-4 bg-blue-50">
                  <button 
                    onClick={closeModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors mx-auto block"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default News;