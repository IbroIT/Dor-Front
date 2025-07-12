import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGlobe, FaTrophy, FaUsers, FaChartLine, FaFutbol, FaLightbulb, FaHandshake } from 'react-icons/fa';
import { GiTrade, GiGrowth, GiThreeFriends } from 'react-icons/gi';
import { RiGovernmentFill } from 'react-icons/ri';
import { HistoryTwo } from './HistoryTwo';
// Компонент модального окна для эпохи
const EraModal = ({ era, onClose }) => {
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="relative bg-gray-900 border border-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <div className="p-8">
          <div className="flex items-center mb-8">
            <div className="bg-yellow-500 text-gray-900 p-3 rounded-xl mr-6">
              {era.icon}
            </div>
            <div>
              <h3 className="text-3xl font-bold text-yellow-400">{era.title}</h3>
              <p className="text-lg text-gray-400">{era.period}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-4 text-white border-b border-gray-800 pb-2">Исторический контекст</h4>
              <p className="text-gray-300 mb-6 leading-relaxed">{era.fullDescription}</p>
              
              <h4 className="text-xl font-semibold mb-4 text-white border-b border-gray-800 pb-2">Ключевые достижения</h4>
              <ul className="space-y-3">
                {era.achievements.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="bg-yellow-500/20 text-yellow-400 p-1 rounded-full mr-3 mt-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <div className="relative rounded-xl overflow-hidden border border-gray-700 mb-6">
                <img 
                  src={era.image} 
                  alt={era.title} 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <span className="text-xl font-bold text-yellow-400">{era.period}</span>
                </div>
              </div>
              
              <h4 className="text-xl font-semibold mb-4 text-white border-b border-gray-800 pb-2">Статистика периода</h4>
              <div className="grid grid-cols-2 gap-4">
                {era.stats.map((stat, i) => (
                  <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <div className="text-yellow-400 font-bold text-xl">{stat.value}</div>
                    <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Компонент карточки эпохи
const EraCard = ({ era, isActive, onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`bg-gradient-to-br ${era.color} rounded-3xl overflow-hidden shadow-2xl border border-gray-800 cursor-pointer transition-all duration-300 ${isActive ? 'scale-100' : 'scale-95 opacity-70'}`}
        onClick={onClick}
      >
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-8 md:p-12">
            <div className="flex items-center mb-8">
              <div className="bg-gray-900/50 border border-gray-800 p-3 rounded-xl mr-6 backdrop-blur-sm">
                {era.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-400">{era.title}</h3>
            </div>
            
            <p className="text-lg md:text-xl mb-8 leading-relaxed text-gray-300">
              {era.description}
            </p>
            
            <ul className="space-y-4 mb-6">
              {era.stats.slice(0, 3).map((stat, i) => (
                <li key={i} className="flex items-start">
                  <svg className="flex-shrink-0 w-5 h-5 text-yellow-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">{stat.label || stat}</span>
                </li>
              ))}
            </ul>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className="text-yellow-400 hover:text-yellow-300 font-medium flex items-center group"
            >
              Подробнее
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
          
          <div className="lg:w-1/2 relative min-h-64">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
            <img 
              src={era.image} 
              alt={era.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-8 left-8 z-20">
              <span className="text-5xl md:text-7xl font-bold text-yellow-400/20">{era.period}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <EraModal 
            era={era} 
            onClose={() => setIsModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

// Компонент счетчика для статистики
const Counter = ({ target, duration = 2 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const increment = target / (duration * 60);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 1000/60);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{new Intl.NumberFormat().format(count)}</span>;
};

// Данные по эпохам развития
const eras = [
  {
    period: "1991-1995",
    title: "Рождение Легенды",
    description: "Аскар Салымбеков закладывает фундамент будущей империи в эпоху экономических перемен",
    fullDescription: "В 1991 году, после распада СССР, Аскар Салымбеков основал торговое объединение 'Дордой' в Бишкеке. В условиях экономического кризиса и переходного периода это стало смелым предпринимательским шагом. Первые годы были посвящены созданию инфраструктуры, налаживанию связей с местными производителями и формированию команды. Несмотря на сложности, уже к 1995 году объединение стало значимым игроком на местном рынке, объединив десятки предпринимателей.",
    icon: <GiTrade className="text-4xl" />,
    image: "https://www.open.kg/uploads/posts/2015-04/1429450409_vhod-na-dordoj.jpg",
    stats: [
      { value: "1991", label: "Год основания" },
      { value: "Бишкек", label: "Место создания" },
      { value: "50+", label: "Первых участников" },
      { value: "5", label: "Направлений деятельности" }
    ],
    achievements: [
      "Создание первой организованной торговой площадки",
      "Установление партнерских отношений с местными производителями",
      "Разработка стандартов ведения бизнеса",
      "Формирование команды управленцев"
    ],
    color: "from-blue-900 to-indigo-900"
  },
  {
    period: "1995-2005",
    title: "Эра Экспансии",
    description: "Трансформация в крупнейший торговый хаб Центральной Азии с международным влиянием",
    fullDescription: "Этот десятилетний период стал временем стремительного роста для ассоциации 'Дордой'. Были значительно расширены торговые площади, усовершенствована логистическая инфраструктура, установлены международные связи. Ассоциация стала ключевым экономическим игроком в регионе, способствуя развитию не только торговли, но и смежных отраслей. К 2005 году 'Дордой' превратился в настоящий торговый город со своей инфраструктурой и сервисами.",
    icon: <GiGrowth className="text-4xl" />,
    image: "https://kyrtag.kg/upload/iblock/1ed/1edc66782292a1aa311f5af89fd0ff32.jpg",
    stats: [
      { value: "1000+", label: "Предпринимателей" },
      { value: "5", label: "Стран-партнёров" },
      { value: "10x", label: "Рост территории" },
      { value: "200%", label: "Увеличение оборота" }
    ],
    achievements: [
      "Создание международной торговой платформы",
      "Развитие транспортной логистики",
      "Внедрение современных стандартов торговли",
      "Установление связей с зарубежными партнерами"
    ],
    color: "from-indigo-900 to-purple-900"
  },
  {
    period: "2005-2015",
    title: "Технологическая Революция",
    description: "Цифровизация процессов и выход на глобальные рынки с инновационными решениями",
    fullDescription: "В этот период ассоциация 'Дордой' сделала качественный скачок в своем развитии, внедрив современные технологии управления и логистики. Были автоматизированы ключевые бизнес-процессы, созданы электронные торговые площадки, внедрены системы электронного документооборота. Ассоциация начала активно участвовать в международных экономических форумах, завоевывая признание как одна из самых прогрессивных бизнес-структур региона. Особое внимание уделялось образовательным программам для предпринимателей.",
    icon: <FaLightbulb className="text-4xl" />,
    image: "https://dordoisecurity.kg/images/dp.jpg",
    stats: [
      { value: "15+", label: "Инвестпроектов" },
      { value: "100%", label: "Автоматизация учета" },
      { value: "7", label: "Образовательных программ" },
      { value: "3", label: "Международные награды" }
    ],
    achievements: [
      "Внедрение ERP-системы управления",
      "Создание образовательного центра для предпринимателей",
      "Запуск электронной торговой площадки",
      "Получение международных сертификатов качества"
    ],
    color: "from-purple-900 to-violet-900"
  },
  {
    period: "2015-н.в.",
    title: "Эра Глобального Влияния",
    description: "Стратегические партнёрства и формирование новой экономической экосистемы региона",
    fullDescription: "Современный этап развития ассоциации 'Дордой' характеризуется выходом на качественно новый уровень. Сегодня это не просто торговая площадка, а многофункциональный экономический кластер, включающий в себя торговые комплексы, логистические центры, производственные мощности и социальные объекты. Ассоциация активно участвует в государственных программах развития предпринимательства, поддерживает стартапы, инвестирует в инновационные проекты. Особое внимание уделяется устойчивому развитию и социальной ответственности бизнеса.",
    icon: <FaGlobe className="text-4xl" />,
    image: "https://avatars.mds.yandex.net/get-altay/6319069/2a0000017f976787c1c7068474d2aeb58660/orig",
    stats: [
      { value: "10,000+", label: "Рабочих мест" },
      { value: "12", label: "Стран партнеров" },
      { value: "1%", label: "ВВП Кыргызстана" },
      { value: "50+", label: "Социальных проектов" }
    ],
    achievements: [
      "Создание инновационного бизнес-инкубатора",
      "Развитие программы социальной ответственности",
      "Участие в международных экономических форумах",
      "Реализация экологических инициатив"
    ],
    color: "from-violet-900 to-blue-900"
  }
];

// Достижения ассоциации
const achievements = [
  { 
    icon: <FaFutbol className="text-3xl" />, 
    title: "ФК 'Дордой'", 
    description: "Легендарный футбольный клуб", 
    stat: "9 титулов",
    details: {
      description: "Футбольный клуб 'Дордой', основанный в 1997 году, стал одним из самых успешных спортивных проектов ассоциации. Команда 9 раз становилась чемпионом Кыргызстана, многократно участвовала в международных турнирах. Клуб уделяет особое внимание развитию молодёжного футбола, имея одну из лучших футбольных академий в регионе.",
      stats: [
        { value: "1997", label: "Год основания" },
        { value: "9", label: "Чемпионских титулов" },
        { value: "25+", label: "Международных матчей" },
        { value: "50+", label: "Воспитанников академии" }
      ]
    }
  },
  { 
    icon: <FaChartLine className="text-3xl" />, 
    title: "Экономика", 
    description: "Крупнейший рынок Центральной Азии", 
    stat: "1 в регионе",
    details: {
      description: "Ассоциация 'Дордой' является крупнейшим торгово-экономическим кластером в Центральной Азии, ежегодно обеспечивающим товарооборот в миллиарды долларов. Это важнейший узел международной торговли, связывающий производителей и потребителей из десятков стран.",
      stats: [
        { value: "1", label: "Место в регионе" },
        { value: "10,000+", label: "Предпринимателей" },
        { value: "12", label: "Стран-партнеров" },
        { value: "1%", label: "ВВП Кыргызстана" }
      ]
    }
  },
  { 
    icon: <FaUsers className="text-3xl" />, 
    title: "Социальные программы", 
    description: "Поддержка образования и культуры", 
    stat: "50+ инициатив",
    details: {
      description: "Ассоциация 'Дордой' реализует масштабные социальные программы, направленные на развитие образования, культуры и спорта. Ежегодно выделяются средства на строительство школ, поддержку талантливой молодёжи, организацию культурных мероприятий.",
      stats: [
        { value: "50+", label: "Социальных проектов" },
        { value: "5", label: "Построенных школ" },
        { value: "100+", label: "Стипендиатов" },
        { value: "10", label: "Культурных мероприятий ежегодно" }
      ]
    }
  },
  { 
    icon: <RiGovernmentFill className="text-3xl" />, 
    title: "Международные связи", 
    description: "Участие в глобальных форумах", 
    stat: "12 стран",
    details: {
      description: "Ассоциация 'Дордой' активно развивает международное сотрудничество, участвуя в ключевых экономических форумах и выставках по всему миру. Установлены прочные партнерские отношения с бизнес-ассоциациями из Европы, Азии и Ближнего Востока.",
      stats: [
        { value: "12", label: "Стран партнеров" },
        { value: "20+", label: "Международных форумов" },
        { value: "5", label: "Языков делового общения" },
        { value: "100+", label: "Международных делегаций ежегодно" }
      ]
    }
  }
];

// Модальное окно для достижений
const AchievementModal = ({ achievement, onClose }) => {
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="relative bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <div className="p-8">
          <div className="flex items-center mb-8">
            <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900 w-16 h-16 rounded-xl flex items-center justify-center mr-6">
              {achievement.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-yellow-400">{achievement.title}</h3>
              <p className="text-gray-400">{achievement.description}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-4 text-white border-b border-gray-800 pb-2">Описание</h4>
            <p className="text-gray-300 leading-relaxed">{achievement.details.description}</p>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-4 text-white border-b border-gray-800 pb-2">Показатели</h4>
            <div className="grid grid-cols-2 gap-4">
              {achievement.details.stats.map((stat, i) => (
                <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <div className="text-yellow-400 font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Компонент карточки достижения
const AchievementCard = ({ achievement }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ y: -10 }}
        className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="p-8 text-center">
          <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
            {achievement.icon}
          </div>
          <h3 className="text-xl font-bold mb-3 text-yellow-400">{achievement.title}</h3>
          <p className="text-gray-400 mb-4">{achievement.description}</p>
          <div className="text-3xl font-bold text-white">{achievement.stat}</div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <AchievementModal 
            achievement={achievement} 
            onClose={() => setIsModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

// Главный компонент страницы
const ModernDordoyHistory = () => {
  const [currentYear] = useState(new Date().getFullYear());
  const [activeEra, setActiveEra] = useState(0);
  const intervalRef = useRef(null);

  // Автоматическая смена эпох
  useEffect(() => {
    const startAutoChange = () => {
      intervalRef.current = setInterval(() => {
        setActiveEra(prev => (prev + 1) % eras.length);
      }, 5000); // Меняем каждые 5 секунд
    };

    startAutoChange();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Сброс таймера при ручном изменении эпохи
  const handleEraChange = (index) => {
    setActiveEra(index);
    // Сбрасываем таймер
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    // Запускаем заново
    intervalRef.current = setInterval(() => {
      setActiveEra(prev => (prev + 1) % eras.length);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/dordoy-hero-bg.jpg')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-gray-900/80 to-gray-900/90"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="block bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Дордой</span>
              <span className="text-2xl md:text-4xl font-light text-gray-300">История становления легенды</span>
            </h1>
            
            <motion.p
              className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              От локального торгового объединения до глобального экономического игрока
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden group bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900 font-bold py-4 px-10 rounded-full text-lg shadow-lg"
              >
                <span className="relative z-10">Исследовать историю</span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden group bg-transparent text-white font-bold py-4 px-10 border-2 border-yellow-500 rounded-full text-lg"
              >
                <span className="relative z-10">О нас</span>
                <span className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Основатель */}
      <section className="relative py-28 bg-gradient-to-br from-gray-900 to-blue-900/50 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="flex flex-col lg:flex-row items-center gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: {}
            }}
          >
            <motion.div 
              className="lg:w-1/2"
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: -100 }
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative">
                <div className="relative z-10 w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden border-2 border-yellow-400/30 shadow-2xl">
                  <img 
                    src="/img/swordman-partial.webp" 
                    alt="Аскар Салымбеков" 
                    className="pl-24 object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900 py-3 px-8 rounded-full shadow-xl font-bold text-lg">
                  Основатель
                </div>
                <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-blue-700/80 border-2 border-yellow-400/50 flex items-center justify-center shadow-lg">
                  <GiThreeFriends className="text-3xl text-yellow-400" />
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: 100 }
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Аскар Салымбеков
              </h2>
              
              <p className="text-xl mb-8 leading-relaxed text-gray-300">
                В 1991 году, в период радикальных экономических преобразований, Аскар Салымбеков заложил основы того, что сегодня стало одной из самых влиятельных бизнес-структур Центральной Азии.
              </p>
              
              <p className="text-xl mb-12 leading-relaxed text-gray-300">
                Его стратегическое видение и предпринимательская интуиция позволили трансформировать небольшую торговую инициативу в многопрофильный экономический кластер международного значения.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center backdrop-blur-sm"
                >
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    <Counter target={currentYear - 1991} />
                  </div>
                  <div className="text-sm text-gray-400">лет истории</div>
                </motion.div>
                                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center backdrop-blur-sm"
                >
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    <Counter target={10000} />
                  </div>
                  <div className="text-sm text-gray-400">рабочих мест</div>
                </motion.div>
                
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center backdrop-blur-sm"
                >
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    <Counter target={12} />
                  </div>
                  <div className="text-sm text-gray-400">стран-партнеров</div>
                </motion.div>
                
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center backdrop-blur-sm"
                >
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    <Counter target={50} />
                  </div>
                  <div className="text-sm text-gray-400">социальных проектов</div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-yellow-400/10 blur-3xl"></div>
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
      </section>

      {/* Эпохи развития */}
      <section className="py-28 bg-gray-900/50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Эпохи развития</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              От скромных начинаний до статуса ключевого экономического игрока региона
            </p>
          </motion.div>
          
          <div className="mb-16">
            <div className="relative h-2 bg-gray-800 rounded-full max-w-4xl mx-auto">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-0 left-0 h-full bg-yellow-400 rounded-full"
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
                key={activeEra}
              />
            </div>
            
            <div className="flex justify-between max-w-4xl mx-auto mt-4">
              {eras.map((era, i) => (
                <button
                  key={i}
                  onClick={() => handleEraChange(i)}
                  className={`text-sm font-medium transition-colors ${activeEra === i ? 'text-yellow-400' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  {era.period}
                </button>
              ))}
            </div>
          </div>
          
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeEra}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              <EraCard 
                era={eras[activeEra]} 
                isActive={true}
                onClick={() => handleEraChange((activeEra + 1) % eras.length)}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="absolute -top-20 right-0 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-yellow-400/10 blur-3xl"></div>
      </section>

      {/* Достижения */}
      <section className="py-28 bg-gradient-to-br from-gray-900 to-blue-900/50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Ключевые достижения</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Многогранный вклад в экономику, спорт и социальное развитие страны
            </p>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: {}
            }}
          >
            {achievements.map((achievement, i) => (
              <motion.div
                key={i}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 50 }
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <AchievementCard achievement={achievement} />
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <div className="absolute -bottom-20 left-0 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl"></div>
      </section>

      {/* Цитата */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="text-yellow-400 text-6xl mb-8">“</div>
            <h3 className="text-2xl md:text-3xl font-medium leading-relaxed mb-10 text-gray-300">
              Успех измеряется не только финансовыми показателями, но и вкладом в развитие общества. 
              <span className="block mt-4 text-yellow-400">Дордой — это история о том, как предпринимательская инициатива может изменить жизнь целого региона.</span>
            </h3>
            <div className="text-lg text-gray-500">Аскар Салымбеков</div>
          </motion.div>
        </div>
        
        <div className="absolute inset-0 bg-[url('/dordoy-pattern.png')] opacity-[0.02]"></div>
      </section>
      <HistoryTwo/>
      
    </div>
  );
};

export default ModernDordoyHistory;