import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip } from 'react-tooltip';

const CurrentPartners = () => {
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredPartner, setHoveredPartner] = useState(null);
  const [expandedPartner, setExpandedPartner] = useState(null);
  const [visiblePartners, setVisiblePartners] = useState(6);
  const [isHoveringShowMore, setIsHoveringShowMore] = useState(false);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        // Добавим более реалистичную задержку с прогрессом
        await new Promise(resolve => {
          const interval = setInterval(() => {
            setIsLoading(prev => ({
              ...prev,
              progress: (prev.progress || 0) + Math.random() * 10
            }));
          }, 100);
          
          setTimeout(() => {
            clearInterval(interval);
            resolve();
          }, 800);
        });
        
        const mockPartners = [
          {
            id: 1,
            name: "ТехноКорп",
            logo: "/logos/technocorp.png",
            description: "Стратегический партнер в области инноваций и цифровых технологий",
            since: 2023,
            projects: "15 совместных проектов",
            website: "https://technocorp.example",
            benefits: [
              "Эксклюзивные условия для клиентов",
              "Совместные R&D центры",
              "Приоритетный доступ к новым технологиям"
            ],
            stats: {
              growth: "+42%",
              satisfaction: "98%"
            },
            accentColor: "from-blue-600 to-indigo-600"
          },
          {
            id: 2,
            name: "ГринЭко",
            logo: "/logos/greeneco.png",
            description: "Лидер в области устойчивого развития и экологических решений",
            since: 2022,
            projects: "8 экологических инициатив",
            website: "https://greeneco.example",
            benefits: [
              "Совместные исследования",
              "Зеленые технологии",
              "Сертификация экопродукции"
            ],
            stats: {
              growth: "+35%",
              satisfaction: "95%"
            },
            accentColor: "from-emerald-500 to-teal-600"
          },
          {
            id: 3,
            name: "ФинТех Альянс",
            logo: "/logos/fintech-alliance.png",
            description: "Инновации в финансовых технологиях и цифровизации банкинга",
            since: 2024,
            projects: "5 цифровых платформ",
            website: "https://fintech-alliance.example",
            benefits: [
              "Доступ к инновационным решениям",
              "Обучение специалистов",
              "Пилотные программы"
            ],
            stats: {
              growth: "+58%",
              satisfaction: "97%"
            },
            accentColor: "from-purple-600 to-fuchsia-500"
          },
          {
            id: 4,
            name: "БиоМед",
            logo: "/logos/biomed.png",
            description: "Передовые медицинские технологии и клинические исследования",
            since: 2021,
            projects: "12 разработок медоборудования",
            website: "https://biomed.example",
            benefits: [
              "Совместные лаборатории",
              "Клинические испытания",
              "Медицинские инновации"
            ],
            stats: {
              growth: "+29%",
              satisfaction: "99%"
            },
            accentColor: "from-rose-500 to-pink-600"
          },
          {
            id: 5,
            name: "КосмосСтрой",
            logo: "/logos/cosmostroy.png",
            description: "Крупнейшие инфраструктурные проекты и умные города",
            since: 2023,
            projects: "7 мега-объектов",
            website: "https://cosmostroy.example",
            benefits: [
              "Технологическое партнерство",
              "Инженерные решения",
              "Управление проектами"
            ],
            stats: {
              growth: "+47%",
              satisfaction: "96%"
            },
            accentColor: "from-amber-500 to-orange-500"
          },
          {
            id: 6,
            name: "АгроТех Групп",
            logo: "/logos/agrotech-group.png",
            description: "Инновации в сельском хозяйстве и пищевой промышленности",
            since: 2020,
            projects: "20 умных ферм",
            website: "https://agrotech.example",
            benefits: [
              "Пилотные программы",
              "Агроаналитика",
              "Автоматизация процессов"
            ],
            stats: {
              growth: "+63%",
              satisfaction: "94%"
            },
            accentColor: "from-lime-500 to-green-500"
          },
          {
            id: 7,
            name: "КвантТех",
            logo: "/logos/quanttech.png",
            description: "Квантовые вычисления и искусственный интеллект",
            since: 2023,
            projects: "4 исследовательских центра",
            website: "https://quanttech.example",
            benefits: [
              "Доступ к суперкомпьютерам",
              "Совместные алгоритмы",
              "Обучение ИИ"
            ],
            stats: {
              growth: "+71%",
              satisfaction: "97%"
            },
            accentColor: "from-violet-600 to-indigo-600"
          },
          {
            id: 8,
            name: "ОкеанЭнерджи",
            logo: "/logos/oceanenergy.png",
            description: "Возобновляемая энергия морских течений и волн",
            since: 2022,
            projects: "3 морские станции",
            website: "https://oceanenergy.example",
            benefits: [
              "Зеленая энергия",
              "Технологии будущего",
              "Экологичные решения"
            ],
            stats: {
              growth: "+39%",
              satisfaction: "93%"
            },
            accentColor: "from-cyan-500 to-blue-500"
          }
        ];
        
        setPartners(mockPartners);
      } catch (error) {
        console.error("Ошибка загрузки партнеров:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, []);

  const toggleExpandPartner = (id) => {
    setExpandedPartner(expandedPartner === id ? null : id);
  };

  const showMorePartners = () => {
    setVisiblePartners(prev => {
      const newValue = prev + 4;
      if (newValue >= partners.length) {
        setIsHoveringShowMore(false);
      }
      return newValue;
    });
  };

  if (isLoading) {
    return (
      <div className="relative bg-gradient-to-br from-blue-900/5 via-white to-blue-50 py-16 px-4 sm:px-6 lg:px-8 rounded-3xl overflow-hidden">
        {/* Анимированный фон */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-100/20"
              initial={{
                x: Math.random() * 100 + 'vw',
                y: Math.random() * 100 + 'vh',
                width: Math.random() * 300 + 100 + 'px',
                height: Math.random() * 300 + 100 + 'px',
                opacity: 0.1
              }}
              animate={{
                x: Math.random() * 100 + 'vw',
                y: Math.random() * 100 + 'vh',
                transition: {
                  duration: Math.random() * 20 + 10,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 text-center mb-16">
          <motion.h2 
            className="text-5xl md:text-6xl font-extrabold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-yellow-500 to-blue-600 animate-gradient-x">
              Наши партнеры
            </span>
          </motion.h2>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '40%' }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-1.5 bg-gradient-to-r from-blue-400 via-yellow-400 to-blue-400 rounded-full mx-auto mb-6"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-blue-800/90 max-w-3xl mx-auto"
          >
            Формируем будущее через стратегические альянсы с лидерами индустрии
          </motion.p>
        </div>
        
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="border-2 border-blue-100/50 rounded-2xl p-6 h-80 bg-white/80 backdrop-blur-sm animate-pulse shadow-lg">
                <div className="bg-gradient-to-br from-blue-50/50 to-yellow-50/50 h-24 w-24 mx-auto rounded-2xl mb-6"></div>
                <div className="bg-gradient-to-r from-blue-100/50 to-blue-50/50 h-6 w-3/4 mx-auto mb-4 rounded-full"></div>
                <div className="bg-gradient-to-r from-blue-50/50 to-yellow-50/50 h-4 w-5/6 mx-auto mb-3 rounded-full"></div>
                <div className="bg-gradient-to-r from-yellow-50/50 to-blue-50/50 h-4 w-4/6 mx-auto rounded-full"></div>
                <div className="mt-6 bg-gradient-to-r from-blue-100/50 to-yellow-100/50 h-8 w-full rounded-lg"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-blue-900/5 via-white to-blue-50 py-16 px-4 sm:px-6 lg:px-8 rounded-3xl overflow-hidden">
      {/* Анимированный фон с пузырьками */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-100/20"
            initial={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
              width: Math.random() * 300 + 100 + 'px',
              height: Math.random() * 300 + 100 + 'px',
              opacity: 0.1
            }}
            animate={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
              transition: {
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: 'reverse'
              }
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 text-center mb-16">
        <motion.h2 
          className="text-5xl md:text-6xl font-extrabold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-yellow-500 to-blue-600 animate-gradient-x">
            Наши партнеры
          </span>
        </motion.h2>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '40%' }}
          transition={{ duration: 1 }}
          className="h-1.5 bg-gradient-to-r from-blue-400 via-yellow-400 to-blue-400 rounded-full mx-auto mb-6"
        />
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl text-blue-800/90 max-w-3xl mx-auto"
        >
          Формируем будущее через стратегические альянсы с лидерами индустрии
        </motion.p>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {partners.slice(0, visiblePartners).map((partner) => (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
            whileHover={{ y: -10 }}
            className="relative"
          >
            <div 
              className={`border-2 rounded-2xl p-6 h-full flex flex-col items-center transition-all duration-300 shadow-lg overflow-hidden
                ${hoveredPartner === partner.id ? 'border-yellow-400 bg-gradient-to-b from-white to-yellow-50 shadow-xl' : 'border-blue-100/50 bg-white/80 backdrop-blur-sm'}
                ${expandedPartner === partner.id ? '!bg-blue-50/80 !border-blue-300' : ''}
              `}
              onMouseEnter={() => setHoveredPartner(partner.id)}
              onMouseLeave={() => setHoveredPartner(null)}
            >
              {/* Акцентная полоса */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${partner.accentColor}`}></div>
              
              <div className="relative mb-6">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleExpandPartner(partner.id)}
                  className="cursor-pointer"
                >
                  <div className={`bg-gradient-to-br ${partner.accentColor} bg-opacity-10 p-3 rounded-2xl shadow-inner`}>
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="h-20 w-20 object-contain"
                      data-tooltip-id={`partner-${partner.id}`}
                    />
                  </div>
                </motion.div>
                <Tooltip 
                  id={`partner-${partner.id}`} 
                  place="top" 
                  className="!bg-blue-600 !text-white !px-3 !py-2 !rounded-lg !text-sm"
                >
                  Нажмите для подробностей
                </Tooltip>
              </div>
              
              <motion.h3 
                className="text-2xl font-bold text-center text-blue-900 mb-2"
                whileHover={{ scale: 1.05 }}
              >
                {partner.name}
              </motion.h3>
              
              <motion.p 
                className="text-blue-800/90 text-center mb-4"
                whileHover={{ scale: 1.02 }}
              >
                {partner.description}
              </motion.p>
              
              <div className="flex justify-between w-full text-sm mb-4">
                <motion.span 
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  С {partner.since}
                </motion.span>
                <motion.span 
                  className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  {partner.projects}
                </motion.span>
              </div>
              
              <AnimatePresence>
                {expandedPartner === partner.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="w-full overflow-hidden"
                  >
                    <div className="pt-4 border-t border-blue-200/50">
                      <h4 className="font-semibold text-blue-900 mb-2">Преимущества сотрудничества:</h4>
                      <ul className="space-y-2 mb-4">
                        {partner.benefits.map((benefit, index) => (
                          <motion.li 
                            key={index} 
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${partner.accentColor} mr-2`}>•</span>
                            <span className="text-blue-800/90">{benefit}</span>
                          </motion.li>
                        ))}
                      </ul>
                      
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <motion.div 
                          className="bg-blue-100/50 p-2 rounded-lg text-center backdrop-blur-sm"
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="text-xs text-blue-600">Рост</div>
                          <div className="text-lg font-bold text-blue-800">{partner.stats.growth}</div>
                        </motion.div>
                        <motion.div 
                          className="bg-yellow-100/50 p-2 rounded-lg text-center backdrop-blur-sm"
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className="text-xs text-yellow-600">Удовлетворенность</div>
                          <div className="text-lg font-bold text-yellow-800">{partner.stats.satisfaction}</div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="mt-auto w-full">
                <AnimatePresence>
                  {hoveredPartner === partner.id && expandedPartner !== partner.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="text-center"
                    >
                      <motion.a 
                        href={partner.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`inline-block px-4 py-2 bg-gradient-to-r ${partner.accentColor} text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all`}
                        whileHover={{ scale: 1.05, boxShadow: `0 8px 20px -5px rgba(var(--${partner.accentColor.split('-')[0]}-500), 0.4)` }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Посетить сайт
                      </motion.a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {visiblePartners < partners.length && (
        <motion.div 
          className="text-center mt-16 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onHoverStart={() => setIsHoveringShowMore(true)}
          onHoverEnd={() => setIsHoveringShowMore(false)}
        >
          <motion.button 
            onClick={showMorePartners}
            className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-yellow-500 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all overflow-hidden"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Показать еще ({partners.length - visiblePartners})</span>
            
            {/* Эффект частиц при наведении */}
            <AnimatePresence>
              {isHoveringShowMore && (
                <>
                  {[...Array(8)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute rounded-full bg-white/20"
                      initial={{
                        x: Math.random() * 100 - 50 + '%',
                        y: Math.random() * 100 - 50 + '%',
                        width: Math.random() * 20 + 5 + 'px',
                        height: Math.random() * 20 + 5 + 'px',
                        opacity: 0
                      }}
                      animate={{
                        x: Math.random() * 200 - 100 + '%',
                        y: Math.random() * 200 - 100 + '%',
                        opacity: [0, 0.7, 0],
                        scale: [0, 1.5, 0],
                        transition: {
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: Math.random() * 2,
                          delay: i * 0.1
                        }
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      )}
      
      {/* Декоративные элементы */}
      <motion.div 
        className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-blue-400/10 blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      />
      
      <motion.div 
        className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-yellow-400/10 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
          delay: 2
        }}
      />
    </div>
  );
};

export default CurrentPartners;