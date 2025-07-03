import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const HistoryTwo = () => {
  const [activeTab, setActiveTab] = useState('economic');
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear() - 1991);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYear(prev => (prev >= 32 ? 0 : prev + 1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const stats = {
    economic: [
      { value: "50K+", label: "Прямая занятость", icon: "👨‍💼" },
      { value: "$3B+", label: "Годовой оборот", icon: "💰" },
      { value: "18", label: "Отрасли экономики", icon: "🏗️" },
      { value: "40K", label: "Торговых точек", icon: "🏪" },
      { value: "100+", label: "Гектаров площадь", icon: "🗺️" },
      { value: "600K", label: "Всего задействовано", icon: "👥" }
    ],
    social: [
      { value: "13x", label: "Чемпион футбольный", icon: "⚽" },
      { value: "5x", label: "Чемпион хоккейный", icon: "🏒" },
      { value: "100+", label: "Мечети/храмы", icon: "🕌" },
      { value: "1K+", label: "Стипендий", icon: "🎓" },
      { value: "50+", label: "Книг издано", icon: "📚" },
      { value: "10+", label: "Экспедиций", icon: "⛏️" }
    ]
  };

  const timeline = [
    { year: 1991, event: "Основание рынка на заболоченных землях" },
    { year: 1995, event: "Первые международные торговые связи" },
    { year: 2000, event: "Внедрение контейнерной системы торговли" },
    { year: 2008, event: "Признание Всемирным банком" },
    { year: 2015, event: "Запуск местных производств" },
    { year: 2020, event: "Пандемийная помощь и цифровизация" },
    { year: 2023, event: "Вхождение в топ-10 мировых рынков" }
  ];

  const partners = [
    { name: "Китай", flag: "🇨🇳", volume: "35%" },
    { name: "Россия", flag: "🇷🇺", volume: "25%" },
    { name: "Турция", flag: "🇹🇷", volume: "15%" },
    { name: "Казахстан", flag: "🇰🇿", volume: "10%" },
    { name: "Европа", flag: "🇪🇺", volume: "10%" },
    { name: "США", flag: "🇺🇸", volume: "5%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-yellow-400/20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              opacity: 0.1
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
              transition: {
                duration: Math.random() * 30 + 20,
                repeat: Infinity,
                repeatType: 'reverse'
              }
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="text-yellow-400 font-bold mb-4 flex items-center">
              <span className="mr-2">✦</span> С 1991 года
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-yellow-400">Дордой</span> - <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
                экономическое сердце
              </span> Центральной Азии
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl">
              Крупнейший торгово-логистический хаб, формирующий экономику и социум Кыргызстана
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold py-4 px-8 rounded-full transition-all shadow-lg"
              >
                История успеха
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 font-bold py-4 px-8 rounded-full transition-all"
              >
                Виртуальный тур
              </motion.button>
            </div>
          </motion.div>

          {/* Year Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-20 bg-blue-800/50 backdrop-blur-sm p-6 rounded-xl max-w-md border border-blue-700"
          >
            <div className="text-sm text-blue-300 mb-2">Годы развития</div>
            <div className="flex items-end">
              <span className="text-5xl md:text-6xl font-bold text-yellow-400 mr-2">
                {currentYear}
              </span>
              <span className="text-xl text-blue-200 mb-1">лет</span>
            </div>
            <div className="h-1 bg-gradient-to-r from-yellow-500 to-yellow-200 mt-2 rounded-full"></div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16 bg-gradient-to-b from-blue-800/50 to-blue-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex bg-blue-900 rounded-full p-1 border border-blue-700">
              <button
                onClick={() => setActiveTab('economic')}
                className={`px-6 py-2 rounded-full transition-all ${activeTab === 'economic' ? 'bg-yellow-500 text-blue-900 font-bold' : 'text-blue-200'}`}
              >
                Экономика
              </button>
              <button
                onClick={() => setActiveTab('social')}
                className={`px-6 py-2 rounded-full transition-all ${activeTab === 'social' ? 'bg-yellow-500 text-blue-900 font-bold' : 'text-blue-200'}`}
              >
                Социум
              </button>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
            >
              {stats[activeTab].map((stat, index) => (
                <motion.div
                  whileHover={{ y: -5 }}
                  key={index}
                  className="bg-blue-900/50 backdrop-blur-sm p-6 rounded-xl border border-blue-700 text-center"
                >
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">{stat.value}</div>
                  <div className="text-sm md:text-base text-blue-200">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            <span className="text-yellow-400">История</span> развития
          </motion.h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 h-full w-1 bg-gradient-to-b from-yellow-500 to-blue-900 -translate-x-1/2"></div>
            
            <div className="space-y-16">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
                >
                  {/* Year circle */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-yellow-500 border-4 border-blue-900 flex items-center justify-center z-10">
                    <span className="font-bold text-blue-900">{item.year}</span>
                  </div>
                  
                  {/* Event card */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'ml-8 text-left' : 'mr-8 text-right'}`}>
                    <div className="bg-blue-900/70 backdrop-blur-sm p-6 rounded-xl border border-blue-700">
                      <p className="text-lg">{item.event}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="relative z-10 py-16 bg-gradient-to-b from-blue-900/50 to-blue-800/50">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Международные <span className="text-yellow-400">партнёры</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Swiper
              slidesPerView={2}
              spaceBetween={20}
              breakpoints={{
                640: { slidesPerView: 3 },
                1024: { slidesPerView: 6 }
              }}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              loop={true}
              modules={[Autoplay]}
              className="mySwiper"
            >
              {partners.map((partner, index) => (
                <SwiperSlide key={index}>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-blue-900/50 backdrop-blur-sm p-6 rounded-xl border border-blue-700 text-center"
                  >
                    <div className="text-4xl mb-3">{partner.flag}</div>
                    <div className="font-bold mb-1">{partner.name}</div>
                    <div className="text-sm text-blue-300">{partner.volume} товарооборота</div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section>

      {/* Production Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                <span className="text-yellow-400">Местное</span> производство
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-yellow-400 text-2xl mr-4">✓</div>
                  <div>
                    <h3 className="font-bold text-lg">Мебельная продукция</h3>
                    <p className="text-blue-200">Высококачественная мебель по международным стандартам</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-yellow-400 text-2xl mr-4">✓</div>
                  <div>
                    <h3 className="font-bold text-lg">Джуто-кенафные изделия</h3>
                    <p className="text-blue-200">Экологичная упаковка и текстильные материалы</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-yellow-400 text-2xl mr-4">✓</div>
                  <div>
                    <h3 className="font-bold text-lg">Пластик и алюминий</h3>
                    <p className="text-blue-200">Современные изделия для строительства и промышленности</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-yellow-400 text-2xl mr-4">✓</div>
                  <div>
                    <h3 className="font-bold text-lg">Карго-доставка</h3>
                    <p className="text-blue-200">Эффективная логистика в крупные города России и СНГ</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative aspect-video bg-blue-900/50 rounded-xl overflow-hidden border border-blue-700">
                {/* Placeholder for production video/image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl">🏭</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="text-xl font-bold">Дордой - это не только торговля</div>
                  <div className="text-blue-200">Но и мощное производство</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Impact */}
      <section className="relative z-10 py-16 bg-gradient-to-br from-blue-900 to-blue-800">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            <span className="text-yellow-400">Социальная</span> миссия
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-blue-800/50 backdrop-blur-sm p-8 rounded-xl border-t-4 border-yellow-500"
            >
              <div className="text-yellow-400 text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold mb-3">Образование</h3>
              <p className="text-blue-200">Стипендии, издание книг, поддержка науки и археологических экспедиций</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-blue-800/50 backdrop-blur-sm p-8 rounded-xl border-t-4 border-yellow-500"
            >
              <div className="text-yellow-400 text-4xl mb-4">⚽</div>
              <h3 className="text-xl font-bold mb-3">Спорт</h3>
              <p className="text-blue-200">13-кратный чемпион по футболу, 5-кратный по хоккею, поддержка команд</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-blue-800/50 backdrop-blur-sm p-8 rounded-xl border-t-4 border-yellow-500"
            >
              <div className="text-yellow-400 text-4xl mb-4">🕌</div>
              <h3 className="text-xl font-bold mb-3">Религия</h3>
              <p className="text-blue-200">Строительство мечетей и медресе, ремонт православных храмов</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-blue-800/50 backdrop-blur-sm p-8 rounded-xl border-t-4 border-yellow-500"
            >
              <div className="text-yellow-400 text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-bold mb-3">Кризисная помощь</h3>
              <p className="text-blue-200">Помощь во время пандемии, стационары, восстановление приграничья</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Future Section */}
      <section className="relative z-10 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-yellow-500">
          <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
        </div>
        
        <div className="relative container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-blue-900 font-bold mb-4">✦ Будущее ✦</div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-blue-900">
              <span className="underline decoration-blue-900/30">Цифровой Дордой</span>
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-blue-900/90 max-w-3xl mx-auto">
              Переход на цифровые платформы, безналичные операции и расширение международных связей
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 px-12 rounded-full transition-all shadow-lg"
            >
              Стать частью будущего
            </motion.button>
            
            <div className="mt-16 flex justify-center">
              <div className="text-8xl animate-bounce">🚀</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HistoryTwo;