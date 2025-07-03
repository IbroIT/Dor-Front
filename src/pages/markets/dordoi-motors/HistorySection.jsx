import React, { useState, useEffect, useRef } from 'react';
import { FaCalendarAlt, FaBuilding, FaUsers, FaChartLine, FaCar, FaTools } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const HistorySection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef(null);
  
  const historyItems = [
    {
      year: "2002",
      title: "Основание рынка",
      description: "Дордой Моторс начал свою работу как специализированный рынок автозапчастей на окраине Бишкека. Первые 50 торговых мест положили начало крупнейшему авторынку страны.",
      icon: <FaCalendarAlt className="text-4xl text-red-500" />
    },
    {
      year: "2005-2010",
      title: "Период роста",
      description: "Быстрое расширение до 200 магазинов, появление первых капитальных строений и специализированных секций: двигатели, подвеска, электроника.",
      icon: <FaBuilding className="text-4xl text-amber-500" />
    },
    {
      year: "2012",
      title: "Становление лидером",
      description: "Рынок становится крупнейшим центром автозапчастей в Кыргызстане с 300+ магазинами и 15 торговыми рядами. Ежедневный поток покупателей превысил 3000 человек.",
      icon: <FaChartLine className="text-4xl text-green-500" />
    },
    {
      year: "2015",
      title: "Модернизация",
      description: "Проведена масштабная реконструкция: асфальтирование дорог, установка навесов, строительство административного здания и современной парковки.",
      icon: <FaUsers className="text-4xl text-blue-500" />
    },
    {
      year: "2020",
      title: "Современный этап",
      description: "Рынок занимает территорию более 5 гектаров с 500+ магазинами и 20 торговыми рядами. Ежедневно рынок посещают 5000+ покупателей.",
      icon: <FaCar className="text-4xl text-gray-500" />
    }
  ];

  // Автоматическая прокрутка
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % historyItems.length);
      }, 5000);
    }
    
    return () => clearInterval(timerRef.current);
  }, [isPlaying, historyItems.length]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 10000);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % historyItems.length);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 10000);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + historyItems.length) % historyItems.length);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 10000);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-red-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-2 rounded-full mb-4">
            <span>Наша история</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">20 лет развития рынка Дордой Моторс</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            От маленькой торговой площадки до крупнейшего авторынка в Центральной Азии
          </p>
        </div>
        
        {/* Горизонтальный слайдер */}
        <div className="relative max-w-5xl mx-auto">
          {/* Кнопки навигации */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-xl hover:bg-red-100 transition -ml-4"
            aria-label="Предыдущий слайд"
          >
            <div className="w-6 h-6 border-t-2 border-l-2 border-red-800 transform rotate-[-45deg]"></div>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-xl hover:bg-red-100 transition -mr-4"
            aria-label="Следующий слайд"
          >
            <div className="w-6 h-6 border-t-2 border-r-2 border-red-800 transform rotate-45"></div>
          </button>
          
          {/* Контейнер слайдов */}
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="relative"
              >
                {/* Фоновое изображение (заглушка) */}
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center">
                  <div className="text-gray-500 text-center">
                    <div className="text-6xl mb-4">{historyItems[activeIndex].icon}</div>
                    <p className="text-xl">Историческое фото рынка {historyItems[activeIndex].year}</p>
                  </div>
                </div>
                
                {/* Текстовый оверлей */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                  <div className="text-white max-w-md p-8">
                    <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm mb-4">
                      {historyItems[activeIndex].year}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">{historyItems[activeIndex].title}</h3>
                    <p className="text-lg">{historyItems[activeIndex].description}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Индикаторы прогресса */}
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              {historyItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeIndex ? 'bg-red-800 w-8' : 'bg-gray-300'
                  }`}
                  aria-label={`Перейти к событию ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Текстовый таймлайн под слайдером */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="relative">
            {/* Линия прогресса */}
            <div className="absolute left-0 top-5 h-1 bg-red-200 w-full"></div>
            
            <div className="grid grid-cols-5 gap-4 relative z-10">
              {historyItems.map((item, index) => (
                <div 
                  key={index} 
                  className={`text-center cursor-pointer transition-all ${
                    index === activeIndex ? 'scale-110' : 'opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => handleDotClick(index)}
                >
                  <div className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    index === activeIndex 
                      ? 'bg-red-800 text-white' 
                      : 'bg-white text-red-800 border-2 border-red-300'
                  }`}>
                    <span className="font-bold">{item.year.split('-')[0]}</span>
                  </div>
                  <p className={`text-sm font-medium ${
                    index === activeIndex ? 'text-red-800' : 'text-gray-600'
                  }`}>
                    {item.title.split(' ')[0]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Цифры в конце */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-red-800 to-red-900 text-white rounded-2xl p-8 shadow-xl max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">20+</div>
              <p>Лет на рынке</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <p>Магазинов</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">20</div>
              <p>Торговых рядов</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5 000+</div>
              <p>Посетителей ежедневно</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HistorySection;
