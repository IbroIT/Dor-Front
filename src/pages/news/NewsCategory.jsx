import { useState, useEffect, useRef } from 'react';
import { 
  FiArrowRight, 
  FiArrowLeft, 
  FiMail, 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiMapPin, 
  FiClock, 
  FiPhone,
  FiEye,
  FiCalendar,
  FiShare2,
  FiChevronDown
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { getMainNews, getMarketNews, getPopularNews, getMarkets } from '../../services/api';

const NewsPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState('dordoi');
  const [scrolled, setScrolled] = useState(false);
  const sliderRef = useRef(null);
  
  // Состояния для данных
  const [mainNews, setMainNews] = useState([]);
  const [marketNews, setMarketNews] = useState({});
  const [popularNews, setPopularNews] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загрузка данных
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Загрузка главных новостей
        const mainNewsData = await getMainNews();
        setMainNews(mainNewsData);
        
        // Загрузка популярных новостей
        const popularNewsData = await getPopularNews();
        setPopularNews(popularNewsData);
        
        // Загрузка рынков
        const marketsData = await getMarkets();
        setMarkets(marketsData);
        
        // Загрузка новостей по рынкам
        const marketNewsData = {};
        for (const market of marketsData) {
          const news = await getMarketNews(market.slug);
          marketNewsData[market.slug] = news;
        }
        setMarketNews(marketNewsData);
        
        // Установить первый рынок как активный
        if (marketsData.length > 0) {
          setActiveTab(marketsData[0].slug);
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);


  // Автоматическая смена слайдов
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentSlide((prev) => (prev === mainNews.length - 1 ? 0 : prev + 1));
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [mainNews.length, isHovered]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === mainNews.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? mainNews.length - 1 : prev - 1));
  };


  // Анимации
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5 } },
    exit: { opacity: 0, transition: { duration: 0.8 } }
  };

  const slideUp = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99]
      } 
    }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.15 } }
  };

  const scaleUp = {
    hidden: { scale: 1 },
    visible: { scale: 1.05, transition: { duration: 6, ease: "linear" } }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Полноэкранный слайдер */}
      <section 
        className="relative h-screen w-full overflow-hidden"
        ref={sliderRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentSlide}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeIn}
            className="absolute inset-0"
          >
            <motion.div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${mainNews[currentSlide].image})` }}
              variants={scaleUp}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            </motion.div>
            
            <div className="relative h-full flex flex-col justify-end pb-32">
              <div className="container ml-[100px] px-4">
                <motion.div 
                  variants={slideUp}
                  className="max-w-4xl bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-white/10"
                >
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="inline-block bg-yellow-500 text-blue-900 px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg"
                  >
                    {mainNews[currentSlide].market}
                  </motion.span>
                  <h2 className="text-5xl md:text-6xl text-white/90 font-bold mb-6 leading-tight">
                    {mainNews[currentSlide].title}
                  </h2>
                  <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl">
                    {mainNews[currentSlide].excerpt}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold py-4 px-10 rounded-full transition duration-300 flex items-center shadow-lg"
                    >
                      Читать подробнее <FiArrowRight className="ml-3" />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-transparent hover:bg-white/10 text-white font-bold py-4 px-10 rounded-full transition duration-300 flex items-center border border-white/20"
                    >
                      Смотреть фото <FiShare2 className="ml-3" />
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Кнопки навигации слайдера */}
        <button 
          onClick={prevSlide}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-5 rounded-full hover:bg-black/60 transition duration-300 z-10 shadow-xl backdrop-blur-sm"
        >
          <FiArrowLeft size={28} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-5 rounded-full hover:bg-black/60 transition duration-300 z-10 shadow-xl backdrop-blur-sm"
        >
          <FiArrowRight size={28} />
        </button>
        
        {/* Индикаторы слайдов */}
        <div className="absolute bottom-20 left-0 right-0 flex justify-center space-x-4 z-10">
          {mainNews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${index === currentSlide ? 'bg-yellow-500 w-12' : 'bg-white/50 w-6'}`}
            />
          ))}
        </div>
        
        {/* Кнопка скролла вниз */}
        <motion.div
          animate={{ 
            y: [0, 10, 0],
            opacity: scrolled ? 0 : 1
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut"
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <FiChevronDown size={32} className="text-white/80" />
        </motion.div>
      </section>


      {/* Новости по рынкам с табами */}
      <section className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Новости рынков</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Самые свежие и актуальные новости о крупнейших рынках Бишкека
          </p>
        </motion.div>
        
        {/* Табы для выбора рынка */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 rounded-xl p-1">
            {Object.keys(marketNews).map((market) => (
              <button
                key={market}
                onClick={() => setActiveTab(market)}
                className={`px-6 py-3 rounded-lg font-medium transition duration-300 ${
                  activeTab === market 
                    ? 'bg-blue-700 text-white shadow-md' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {market === 'dordoi' && 'Дордой'}
                {market === 'alamedin' && 'Аламедин'}
                {market === 'madina' && 'Мадина'}
              </button>
            ))}
          </div>
        </div>
        
        {/* Карточки новостей */}
        <motion.div 
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {marketNews[activeTab].map((news, index) => (
            <motion.div 
              key={news.id}
              variants={slideUp}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 group"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <FiCalendar className="mr-2" />
                  <span>{news.date}</span>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">{news.title}</h3>
                <p className="text-gray-600 mb-4">{news.excerpt}</p>
                <div className="flex justify-between items-center">
                  <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center transition duration-300">
                    Читать далее <FiArrowRight className="ml-1" />
                  </button>
                  <button className="text-gray-400 hover:text-blue-600 transition duration-300">
                    <FiShare2 />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Популярные новости */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Популярные новости</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Самые читаемые и обсуждаемые материалы этой недели
            </p>
          </motion.div>
          
          <motion.div 
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {popularNews.map((news, index) => (
              <motion.div 
                key={news.id}
                variants={slideUp}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <span className="text-white text-sm font-medium flex items-center">
                      <FiEye className="mr-1" /> {news.views.toLocaleString()}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-blue-700 text-white text-lg font-bold w-10 h-10 flex items-center justify-center rounded-full">
                    {index + 1}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-blue-900 mb-3">{news.title}</h3>
                  <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center transition duration-300">
                    Читать далее <FiArrowRight className="ml-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Подписка на рассылку */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Будьте в курсе всех новостей</h2>
            <p className="text-blue-200 text-xl max-w-2xl mx-auto mb-8">
              Подпишитесь на нашу рассылку и получайте самые свежие новости о рынках Бишкека прямо на вашу почту
            </p>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="max-w-lg mx-auto flex bg-white rounded-lg overflow-hidden shadow-xl"
            >
              <input 
                type="email" 
                placeholder="Ваш email" 
                className="flex-grow px-6 py-4 text-gray-900 focus:outline-none"
              />
              <button className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold px-8 py-4 transition duration-300 flex items-center">
                <FiMail className="mr-2" /> Подписаться
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Контакты и соцсети */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-6 text-yellow-400 flex items-center">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                О нас
              </h3>
              <p className="text-gray-300 mb-4">
                Самые актуальные новости о рынках Бишкека. Дордой, Аламедин, Мадина и другие.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition duration-300">
                  <FiFacebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition duration-300">
                  <FiTwitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition duration-300">
                  <FiInstagram size={20} />
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-6 text-yellow-400 flex items-center">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                Контакты
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FiMapPin className="mt-1 mr-3 text-yellow-400" />
                  <span>г. Бишкек, ул. Московская 123</span>
                </li>
                <li className="flex items-center">
                  <FiPhone className="mr-3 text-yellow-400" />
                  <span>+996 555 123 456</span>
                </li>
                <li className="flex items-center">
                  <FiMail className="mr-3 text-yellow-400" />
                  <span>info@bazaarki.kg</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-6 text-yellow-400 flex items-center">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                Часы работы
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <FiClock className="mr-3 text-yellow-400" />
                  <span>Пн-Пт: 8:00 - 18:00</span>
                </li>
                <li className="flex items-center">
                  <FiClock className="mr-3 text-yellow-400" />
                  <span>Сб: 9:00 - 15:00</span>
                </li>
                <li className="flex items-center">
                  <FiClock className="mr-3 text-yellow-400" />
                  <span>Вс: выходной</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-6 text-yellow-400 flex items-center">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                Быстрые ссылки
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition duration-300">Главная</a></li>
                <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition duration-300">Новости</a></li>
                <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition duration-300">О рынках</a></li>
                <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition duration-300">Контакты</a></li>
                <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition duration-300">Политика конфиденциальности</a></li>
              </ul>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="border-t border-gray-800 pt-8 text-center text-gray-400"
          >
            <p>© {new Date().getFullYear()} Bazaarki.kg - Новости рынков Бишкека. Все права защищены.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default NewsPage;