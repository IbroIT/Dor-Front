import { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp, FiExternalLink, FiBriefcase, FiHome, FiTruck, FiShoppingCart, FiGlobe, FiUsers, FiAward, FiBarChart2, FiLayers, FiTarget, FiHeart, FiArrowRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const DordoyAssociation = () => {
  const [expandedCompany, setExpandedCompany] = useState(null);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const companies = [
    {
      id: 'dordoi-market',
      name: 'Рынок "Дордой"',
      description: 'Крупнейший торговый комплекс в Центральной Азии, занимающий площадь более 100 гектаров',
      sectors: ['Оптовая торговля', 'Розничная торговля', 'Логистические услуги', 'Складские помещения'],
      stats: [
        { label: 'Торговых мест', value: '10,000+' },
        { label: 'Ежедневный трафик', value: '50,000+' },
        { label: 'Страны-поставщики', value: '30+' }
      ],
      icon: <FiShoppingCart className="text-yellow-500 text-3xl" />,
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 'dordoi-ordo',
      name: 'Дордой Ордо',
      description: 'Производство пластиковых окон, дверей, строительство и гостиничный бизнес',
      sectors: ['Производство ПВХ изделий', 'Строительство', 'Гостиничный бизнес', 'Коммерческая недвижимость'],
      stats: [
        { label: 'Произведено окон в год', value: '50,000+' },
        { label: 'Гостиничных номеров', value: '120' },
        { label: 'Строительных проектов', value: '25+' }
      ],
      icon: <FiHome className="text-blue-500 text-3xl" />,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'dordoi-plaza',
      name: 'Dordoi Plaza',
      description: 'Современный деловой и торговый комплекс класса А',
      sectors: ['Офисные помещения', 'Торговые площади', 'Конференц-залы', 'Рестораны'],
      stats: [
        { label: 'Общая площадь', value: '25,000 м²' },
        { label: 'Арендаторов', value: '150+' },
        { label: 'Ежегодных мероприятий', value: '80+' }
      ],
      icon: <FiBriefcase className="text-yellow-400 text-3xl" />,
      color: 'from-purple-600 to-purple-800'
    },
    {
      id: 'muras-sport',
      name: 'Мурас Спорт',
      description: 'Спортивные клубы и образовательные программы для развития спорта в Кыргызстане',
      sectors: ['Футбольные академии', 'Фитнес-центры', 'Спортивные мероприятия', 'Детские программы'],
      stats: [
        { label: 'Тренирующихся детей', value: '1,200+' },
        { label: 'Профессиональных тренеров', value: '45' },
        { label: 'Проведено турниров', value: '15+' }
      ],
      icon: <FiAward className="text-blue-400 text-3xl" />,
      color: 'from-green-600 to-green-800'
    }
  ];

  const stats = [
    { id: 1, value: '14', label: 'Компаний в холдинге', icon: <FiLayers />, color: 'bg-blue-100 text-blue-600' },
    { id: 2, value: '25+', label: 'Лет успешной работы', icon: <FiBarChart2 />, color: 'bg-yellow-100 text-yellow-600' },
    { id: 3, value: '5,000+', label: 'Создано рабочих мест', icon: <FiUsers />, color: 'bg-blue-100 text-blue-600' },
    { id: 4, value: '10+', label: 'Стран партнеров', icon: <FiGlobe />, color: 'bg-yellow-100 text-yellow-600' }
  ];

  const structure = [
    {
      title: "Головная компания",
      description: "Осуществляет стратегическое управление холдингом, контроль за деятельностью дочерних предприятий и развитие новых направлений",
      functions: [
        "Разработка единой стратегии развития",
        "Управление активами холдинга",
        "Координация между предприятиями",
        "Финансовый контроль и аудит",
        "Международное сотрудничество"
      ],
      icon: <FiBriefcase className="text-yellow-400 text-2xl" />
    },
    {
      title: "Дочерние предприятия",
      description: "Самостоятельные юридические лица, работающие в рамках общей стратегии холдинга",
      functions: [
        "Оперативное управление бизнес-направлением",
        "Реализация продукции и услуг",
        "Развитие клиентской базы",
        "Внедрение инновационных решений",
        "Социальная ответственность"
      ],
      icon: <FiHome className="text-yellow-400 text-2xl" />
    },
    {
      title: "Функциональные департаменты",
      description: "Обеспечивающие подразделения, поддерживающие деятельность всех предприятий холдинга",
      functions: [
        "Финансы и бухгалтерия",
        "Юридический отдел",
        "HR и обучение персонала",
        "Маркетинг и PR",
        "IT и цифровизация"
      ],
      icon: <FiUsers className="text-yellow-400 text-2xl" />
    }
  ];

  const toggleCompany = (id) => {
    setExpandedCompany(expandedCompany === id ? null : id);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-x-hidden">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-blue-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        
        <div className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col md:flex-row items-center"
          >
            <motion.div 
              variants={fadeIn}
              className="md:w-1/2 mb-10 md:mb-0"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="text-yellow-400">Ассоциация</span> <span className="text-white">«Дордой»</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-lg">
                Крупнейший многопрофильный холдинг Кыргызстана, объединяющий 14 компаний в различных секторах экономики
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="md:w-1/2 flex justify-center"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-yellow-400 rounded-full opacity-20"
                ></motion.div>
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-8 bg-blue-300 rounded-full opacity-10"
                ></motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-white bg-opacity-90 rounded-xl p-6 shadow-2xl text-center w-48 h-48 flex flex-col items-center justify-center"
                  >
                    <FiTarget className="text-blue-900 text-4xl mb-4" />
                    <p className="text-blue-900 font-bold">Стратегия</p>
                    <p className="text-blue-900 font-bold">Развития</p>
                    <p className="text-blue-900 font-bold">2021-2030</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <motion.div 
              key={stat.id}
              whileHover={{ y: -5 }}
              className={`p-6 rounded-xl shadow-md transition-all duration-300 ${stat.color} ${hoveredStat === stat.id ? 'shadow-lg' : ''}`}
              onMouseEnter={() => setHoveredStat(stat.id)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-white bg-opacity-30 mr-4">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm opacity-90">{stat.label}</p>
                </div>
              </div>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: hoveredStat === stat.id ? '100%' : '50%' }}
                className="h-1 bg-current opacity-20 rounded-full"
              ></motion.div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Companies Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-blue-900 mb-4"
          >
            Наши компании
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-yellow-500 mx-auto mb-6"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700 max-w-3xl mx-auto"
          >
            В состав ассоциации входят самостоятельные компании, работающие в различных сферах экономики Кыргызстана
          </motion.p>
        </div>

        <div className="space-y-6">
          {companies.map((company) => (
            <motion.div 
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div 
                className={`bg-gradient-to-r ${company.color} rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${expandedCompany === company.id ? 'ring-2 ring-yellow-400' : 'hover:shadow-xl'}`}
              >
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 cursor-pointer"
                  onClick={() => toggleCompany(company.id)}
                >
                  <div className="flex items-start mb-4 md:mb-0">
                    <div className="mr-6">
                      {company.icon}
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">{company.name}</h3>
                      <p className="text-blue-100 mt-1">{company.description}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {company.sectors.map((sector, i) => (
                          <motion.span 
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-xs"
                          >
                            {sector}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-white self-center">
                    {expandedCompany === company.id ? 
                      <FiChevronUp size={28} className="text-yellow-300" /> : 
                      <FiChevronDown size={28} />}
                  </div>
                </motion.div>
                
                <AnimatePresence>
                  {expandedCompany === company.id && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-8 pt-2 bg-white"
                    >
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-bold text-blue-900 mb-3 text-lg">Основные показатели:</h4>
                          <div className="space-y-4">
                            {company.stats.map((stat, i) => (
                              <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center"
                              >
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mr-3">
                                  {i+1}
                                </div>
                                <div>
                                  <p className="font-medium">{stat.label}</p>
                                  <p className="text-xl font-bold text-blue-900">{stat.value}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-blue-900 mb-3 text-lg">Достижения:</h4>
                          <ul className="space-y-3 text-gray-700">
                            {[
                              "Лидер в своем сегменте рынка",
                              "Международные сертификаты качества",
                              "Инновационные технологии производства",
                              "Социально ответственный бизнес"
                            ].map((item, i) => (
                              <motion.li 
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start"
                              >
                                <span className="text-yellow-500 mr-2 mt-1">•</span> {item}
                              </motion.li>
                            ))}
                          </ul>
                          <motion.button 
                            whileHover={{ x: 5 }}
                            className="mt-6 flex items-center text-blue-900 font-medium hover:text-yellow-500 transition-colors"
                          >
                            Подробнее о компании <FiExternalLink className="ml-2" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Structure Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-blue-900 text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Организационная структура
            </motion.h2>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-24 h-1 bg-yellow-400 mx-auto mb-6"
            ></motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-lg text-blue-200 max-w-3xl mx-auto"
            >
              Холдинговая система управления с централизацией стратегических функций и децентрализацией операционной деятельности
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {structure.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white bg-opacity-10 rounded-xl p-8 backdrop-blur-sm border border-white border-opacity-20 hover:bg-opacity-20 transition-all"
              >
                <div className="mb-6 text-yellow-400">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-yellow-400">{item.title}</h3>
                <p className="text-blue-100 mb-6">{item.description}</p>
                <ul className="space-y-3">
                  {item.functions.map((func, i) => (
                    <motion.li 
                      key={i}
                      initial={{ x: -10, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <span className="text-yellow-400 mr-2 mt-1">•</span> {func}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 bg-yellow-400 text-blue-900 rounded-xl p-8 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h3 className="text-2xl font-bold mb-4">Гибкость и адаптивность</h3>
                <p className="mb-6">
                  Организационная структура ассоциации динамично развивается и адаптируется к изменениям рынка, новым технологиям и вызовам времени.
                </p>
                <div className="flex items-center">
                  <FiHeart className="text-blue-900 mr-2" />
                  <span className="font-medium">Мы постоянно развиваемся</span>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative w-64 h-64">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-blue-900 border-opacity-20 rounded-full"
                  ></motion.div>
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-6 border-4 border-blue-900 border-opacity-30 rounded-full"
                  ></motion.div>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-12 border-4 border-blue-900 border-opacity-40 rounded-full"
                  ></motion.div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">14</div>
                      <div className="text-sm font-medium">компаний</div>
                      <div className="text-sm">в единой системе</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* International Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="md:w-1/2 mb-10 md:mb-0"
          >
            <motion.h2 
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold text-blue-900 mb-6"
            >
              Международное сотрудничество
            </motion.h2>
            <motion.div 
              variants={fadeIn}
              className="w-24 h-1 bg-yellow-500 mb-6"
            ></motion.div>
            <motion.p 
              variants={fadeIn}
              className="text-lg text-gray-700 mb-8"
            >
              Ассоциация «Дордой» развивает партнерские отношения с компаниями из стран СНГ, Европы, Азии и США, что способствует обмену опытом и технологиями.
            </motion.p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Экспортные поставки', value: '15 стран' },
                { label: 'Иностранные партнеры', value: '200+ компаний' },
                { label: 'Международные сертификаты', value: '50+' },
                { label: 'Совместные предприятия', value: '12' }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  variants={fadeIn}
                  whileHover={{ y: -3 }}
                  className="bg-blue-50 p-4 rounded-lg"
                >
                  <p className="text-sm text-gray-600">{item.label}</p>
                  <p className="text-xl font-bold text-blue-900">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:w-1/2 flex justify-center"
          >
            <div className="relative">
              <div className="grid grid-cols-3 gap-4">
                {['🇰🇬', '🇷🇺', '🇰🇿', '🇨🇳', '🇹🇷', '🇺🇸', '🇩🇪', '🇰🇷', '🇦🇪'].map((flag, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl bg-white shadow-md p-4 rounded-xl cursor-pointer"
                    title={['Кыргызстан', 'Россия', 'Казахстан', 'Китай', 'Турция', 'США', 'Германия', 'Корея', 'ОАЭ'][i]}
                  >
                    {flag}
                  </motion.div>
                ))}
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -right-6 bg-yellow-400 text-blue-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg"
              >
                Глобальные партнеры
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Social Responsibility */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Социальная ответственность
            </motion.h2>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-24 h-1 bg-yellow-400 mx-auto mb-6"
            ></motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-lg text-blue-200 max-w-3xl mx-auto"
            >
              Ассоциация активно участвует в социальных и благотворительных проектах, поддерживая образование, спорт и здравоохранение в Кыргызстане
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Поддержка образования",
                description: "Строительство школ, предоставление стипендий, оснащение учебных заведений",
                icon: <FiAward className="text-yellow-400 text-3xl" />,
                projects: ["10+ школ", "500+ стипендий", "20 компьютерных классов"]
              },
              {
                title: "Развитие спорта",
                description: "Строительство спортивных объектов, поддержка молодых спортсменов, организация турниров",
                icon: <FiHeart className="text-yellow-400 text-3xl" />,
                projects: ["5 спортивных комплексов", "100+ спортсменов", "Ежегодные турниры"]
              },
              {
                title: "Здравоохранение",
                description: "Поддержка медицинских учреждений, закупка оборудования, благотворительные акции",
                icon: <FiUsers className="text-yellow-400 text-3xl" />,
                projects: ["Медоборудование", "Бесплатные обследования", "Поддержка больниц"]
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white bg-opacity-10 rounded-xl p-8 backdrop-blur-sm border border-white border-opacity-20 hover:bg-opacity-20 transition-all"
              >
                <div className="mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-blue-100 mb-6">{item.description}</p>
                <ul className="space-y-2">
                  {item.projects.map((project, j) => (
                    <motion.li 
                      key={j}
                      initial={{ x: -10, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: j * 0.05 + i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center"
                    >
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                      <span>{project}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default DordoyAssociation;