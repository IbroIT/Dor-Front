import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';

const DordoiAssociation = () => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const leaders = [
    {
      id: 1,
      position: 'Почетный президент',
      name: 'Салымбеков Аскар Мааткабылович',
      role: 'Основатель и общественный деятель, меценат. Инициатор создания профсоюза, реализует социальные проекты, оказывает влияние на экономическое и культурное развитие страны.',
      image: '/leaders/askar-salymbekov.jpg',
      achievements: [
        'Основатель Ассоциации "Дордой"',
        'Инициатор более 50 социальных проектов',
        'Награжден государственными наградами КР',
        'Почетный гражданин Бишкека'
      ]
    },
    {
      id: 2,
      position: 'Президент',
      name: 'Салымбеков Улугбек Аскарович',
      role: 'Оперативное руководство деятельностью ассоциации, развитие бизнес-проектов и новых направлений.',
      image: '/leaders/ulugbek-salymbekov.jpg',
      achievements: [
        'Руководитель 20+ успешных бизнес-проектов',
        'Инициатор модернизации инфраструктуры',
        'Куратор образовательных программ',
        'Лидер в привлечении инвестиций'
      ]
    },
    {
      id: 3,
      position: 'Руководитель профсоюза',
      name: 'Дамира Долоталиева',
      role: 'С 2010 года возглавляет профсоюз «Дордой», занимается вопросами социальной защиты предпринимателей.',
      image: '/leaders/damira-dolotalieva.jpg',
      achievements: [
        'Автор программ социальной защиты',
        'Организатор ежегодных бизнес-форумов',
        'Координатор благотворительных акций',
        'Лучший профсоюзный лидер СНГ 2018'
      ]
    },
    {
      id: 4,
      position: 'Вице-президент по развитию',
      name: 'Эркинбаев Темирлан',
      role: 'Курирует стратегическое развитие ассоциации, внедрение инновационных технологий и международное сотрудничество.',
      image: '/leaders/temirlan-erkimbaev.jpg',
      achievements: [
        'Автор 15+ стратегических программ',
        'Инициатор цифровой трансформации',
        'Эксперт в международных экономических отношениях',
        'Куратор IT-направления'
      ]
    }
  ];

  const projects = [
    {
      id: 1,
      title: 'Дордой Академия',
      description: 'Современный образовательный центр для предпринимателей с программами MBA и профессиональной переподготовки. Обеспечивает подготовку кадров для бизнеса и государственного управления.',
      year: '2015',
      image: '/projects/academy.jpg',
      stats: ['2000+ выпускников', '50+ программ', '20 партнерских вузов']
    },
    {
      id: 2,
      title: 'Центр экспорта',
      description: 'Платформа для поддержки местных производителей в выходе на международные рынки. Оказывает консультационные услуги, помогает с сертификацией и логистикой.',
      year: '2018',
      image: '/projects/export-center.jpg',
      stats: ['100+ компаний-экспортеров', '15 стран партнеров', '$50M+ оборот']
    },
    {
      id: 3,
      title: 'IT-инкубатор',
      description: 'Центр поддержки технологических стартапов с полным циклом сопровождения от идеи до выхода на рынок. Предоставляет коворкинг, менторство и доступ к инвестициям.',
      year: '2020',
      image: '/projects/it-incubator.jpg',
      stats: ['30+ стартапов', '$5M инвестиций', '10 патентов']
    },
    {
      id: 4,
      title: 'Социальный фонд',
      description: 'Программы поддержки социально незащищенных слоев населения и начинающих предпринимателей. Финансирует образовательные и медицинские инициативы.',
      year: '2012',
      image: '/projects/social-fund.jpg',
      stats: ['1000+ грантов', '200 рабочих мест', '50 социальных проектов']
    },
    {
      id: 5,
      title: 'Дордой Логистик',
      description: 'Комплекс логистических услуг для предпринимателей, включая таможенное оформление, складирование и доставку товаров по всей Центральной Азии.',
      year: '2016',
      image: '/projects/logistics.jpg',
      stats: ['500+ клиентов', '10 складов', '100+ транспортных единиц']
    },
    {
      id: 6,
      title: 'Центр ремесел',
      description: 'Площадка для сохранения и развития традиционных ремесел Кыргызстана. Проводит обучение, помогает с продвижением продукции на рынке.',
      year: '2019',
      image: '/projects/crafts.jpg',
      stats: ['50 мастеров', '1000+ изделий в год', '10 экспортных рынков']
    },
    {
      id: 7,
      title: 'Агро-инкубатор',
      description: 'Программа поддержки сельскохозяйственных производителей с акцентом на органическое земледелие и переработку продукции.',
      year: '2017',
      image: '/projects/agro.jpg',
      stats: ['200 фермеров', '500 га земель', '30 новых продуктов']
    },
    {
      id: 8,
      title: 'Молодежный бизнес-клуб',
      description: 'Площадка для молодых предпринимателей с программами наставничества, нетворкинга и доступа к финансированию.',
      year: '2021',
      image: '/projects/youth.jpg',
      stats: ['500 участников', '30 успешных стартапов', '10 млн сомов грантов']
    }
  ];

  const stats = [
    { value: '25+', label: 'Лет на рынке', icon: '🏛️' },
    { value: '5000+', label: 'Компаний-участников', icon: '🏢' },
    { value: '50 000+', label: 'Рабочих мест', icon: '👨‍💼' },
    { value: '100+', label: 'Социальных проектов', icon: '❤️' }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white overflow-x-hidden">
      {/* Parallax Background */}
      <motion.div 
        style={{ y: yBg, opacity: opacityBg }}
        className="absolute inset-0 bg-[url('/bg-pattern.jpg')] bg-cover bg-center opacity-10 z-0"
      />
      
      {/* Main Content */}
      <div className="relative z-10" ref={ref}>
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center pt-32 pb-20 px-6 sm:px-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto w-full"
          >
            <div className="mb-8">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mb-6 rounded-full"
              />
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">Ассоциация</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 mt-2">«Дордой»</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-200 max-w-2xl leading-relaxed">
                Лидер бизнес-сообщества Кыргызстана, объединяющий предпринимателей для создания устойчивой экономики будущего
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="bg-blue-900/40 backdrop-blur-lg rounded-xl p-6 border border-blue-700/30 hover:border-yellow-400/50 transition-all duration-300 shadow-lg"
                >
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-3xl font-bold text-yellow-400">{stat.value}</div>
                  <div className="text-sm text-blue-200 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Leaders Section */}
        <section className="py-20 px-6 sm:px-12 bg-gradient-to-b from-blue-900/50 to-blue-950/80">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16 text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">Руководство</span>
              </h2>
              <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
                Профессиональная команда лидеров, определяющих развитие бизнес-сообщества и экономики страны
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {leaders.map((leader, index) => (
                <motion.div
                  key={leader.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative h-full bg-blue-950/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-blue-700/30 group-hover:border-yellow-400/50 transition-all duration-300 shadow-xl hover:shadow-2xl">
                    <div className="h-80 relative overflow-hidden">
                      <motion.img 
                        src={leader.image} 
                        alt={leader.name}
                        className="w-full h-full object-cover object-top"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-6 w-full">
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="bg-blue-950/80 backdrop-blur-sm p-4 rounded-xl"
                        >
                          <h3 className="text-sm font-semibold text-yellow-300">{leader.position}</h3>
                          <h4 className="text-xl font-extrabold text-white">{leader.name}</h4>
                        </motion.div>
                      </div>
                    </div>
                    <motion.div 
                      className="p-6"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <p className="text-blue-200 mb-4 leading-relaxed">{leader.role}</p>
                      <div className="border-t border-blue-800/50 pt-4">
                        <h5 className="text-sm font-semibold text-yellow-300 mb-2">Ключевые достижения:</h5>
                        <ul className="space-y-2">
                          {leader.achievements.map((achievement, idx) => (
                            <motion.li 
                              key={idx} 
                              className="flex items-start"
                              whileHover={{ x: 5 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <svg className="h-5 w-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-blue-100 leading-snug">{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20 px-6 sm:px-12 bg-blue-950">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16 text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">Ключевые проекты</span>
              </h2>
              <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
                Инновационные инициативы, меняющие бизнес-ландшафт страны и создающие новые возможности
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative h-full bg-gradient-to-br from-blue-800/50 to-blue-900/50 rounded-2xl overflow-hidden shadow-xl border border-blue-700/30 group-hover:border-yellow-400/50 transition-all duration-300 hover:shadow-2xl">
                    <div className="h-60 relative overflow-hidden">
                      <motion.img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/40 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <div className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-xs font-bold inline-block shadow-lg">
                          {project.year}
                        </div>
                      </div>
                      <motion.div 
                        className="absolute bottom-0 left-0 p-6 w-full"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h3 className="text-2xl font-bold text-white drop-shadow-lg">{project.title}</h3>
                      </motion.div>
                    </div>
                    <motion.div 
                      className="p-6"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <p className="text-blue-200 mb-4 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.stats.map((stat, idx) => (
                          <motion.span 
                            key={idx} 
                            className="bg-blue-800/50 text-blue-100 text-xs px-3 py-1 rounded-full"
                            whileHover={{ scale: 1.05 }}
                          >
                            {stat}
                          </motion.span>
                        ))}
                      </div>
                      <motion.button 
                        className="text-yellow-400 font-medium flex items-center group"
                        whileHover={{ x: 5 }}
                      >
                        Узнать подробнее
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 px-6 sm:px-12 bg-gradient-to-b from-blue-900/50 to-blue-950/80">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16 text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">Галерея</span>
              </h2>
              <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
                Визуальная история нашей деятельности и достижений
              </p>
            </motion.div>

            <div className="relative">
              <Swiper
                modules={[Autoplay, EffectCreative]}
                effect="creative"
                creativeEffect={{
                  prev: {
                    shadow: true,
                    translate: [0, 0, -400],
                  },
                  next: {
                    translate: ["100%", 0, 0],
                  },
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                loop={true}
                grabCursor={true}
                className="h-96 w-full rounded-2xl overflow-hidden"
              >
                {[1, 2, 3, 4, 5].map((item) => (
                  <SwiperSlide key={item}>
                    <div className="w-full h-full bg-blue-800/50 flex items-center justify-center">
                      <img 
                        src={`/gallery/${item}.jpg`} 
                        alt={`Gallery ${item}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DordoiAssociation;