import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const DordoiAssociationModern = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // 3D Card Component
  const Card3D = ({ children, className = '' }) => {
    const cardRef = useRef(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e) => {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / centerX) * 10;
      const rotateX = ((centerY - y) / centerY) * 10;
      
      setRotation({ x: rotateX, y: rotateY });
    };

    return (
      <motion.div
        ref={cardRef}
        className={`relative transition-all duration-500 ease-out ${className}`}
        style={{
          transform: isHovering 
            ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
          transformStyle: 'preserve-3d'
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setRotation({ x: 0, y: 0 });
        }}
        whileHover={{ scale: 1.02 }}
      >
        {children}
        {isHovering && (
          <motion.div 
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(234, 179, 8, 0.4) 0%, transparent 70%)',
              opacity: 0,
              transition: 'opacity 0.3s ease'
            }}
            animate={{ opacity: 0.4 }}
          />
        )}
      </motion.div>
    );
  };

  // Animated Counter
  const Counter = ({ target, label, duration = 2 }) => {
    const [count, setCount] = useState(0);
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.5
    });

    useEffect(() => {
      if (inView) {
        let start = 0;
        const increment = target / (duration * 60); // 60fps
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 1000/60);

        return () => clearInterval(timer);
      }
    }, [inView, target, duration]);

    return (
      <div ref={ref} className="text-center">
        <motion.div 
          className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {count}+
        </motion.div>
        <motion.div 
          className="text-white/80 text-sm uppercase tracking-wider mt-2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          {label}
        </motion.div>
      </div>
    );
  };

  // Goal Item Component
  const GoalItem = ({ number, title, items }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.3
    });

    return (
      <motion.div
        ref={ref}
        className="bg-gradient-to-br from-blue-900/80 to-blue-800/80 p-6 rounded-2xl border border-white/10 backdrop-blur-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-yellow-400 text-blue-900 flex items-center justify-center font-bold text-lg mr-3">
            {number}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <ul className="space-y-3 pl-2">
          {items.map((item, index) => (
            <motion.li 
              key={index}
              className="flex items-start"
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 * index + 0.3 }}
            >
              <span className="text-yellow-400 mr-2 mt-1">•</span>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div 
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(234, 179, 8, 0.3) 0%, transparent 20%),
            radial-gradient(circle at 80% 70%, rgba(234, 179, 8, 0.3) 0%, transparent 20%)
          `,
          y: yBg
        }}
      />
      
      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-yellow-400/30 pointer-events-none"
          style={{
            width: Math.random() * 10 + 5 + 'px',
            height: Math.random() * 10 + 5 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            opacity: Math.random() * 0.5 + 0.1
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 100],
            x: [0, (Math.random() - 0.5) * 50],
            opacity: [Math.random() * 0.5 + 0.1, Math.random() * 0.5 + 0.3]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-blue-900/50 z-10"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
          />
          <motion.video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 2 }}
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-1084-large.mp4" type="video/mp4" />
          </motion.video>
        </div>

        <div className="container mx-auto relative z-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-5xl md:text-6xl font-bold mb-8 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                  Дордой
                </span>{' '}
                <br />Ассоциация
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl mb-10 leading-relaxed text-white/90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Инновационная платформа для экономического роста и социального развития Кыргызстана
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button 
                  className="relative overflow-hidden group px-8 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-blue-900 font-bold transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('mission')}
                >
                  <span className="relative z-10">Наша Миссия</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </motion.button>
                
                <motion.button 
                  className="relative overflow-hidden group px-8 py-4 rounded-full border-2 border-yellow-500 text-yellow-400 font-bold transition-all duration-300"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(234, 179, 8, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('goals')}
                >
                  <span className="relative z-10">Наши Цели</span>
                  <span className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </motion.button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card3D className="aspect-video">
                <div className="w-full h-full rounded-2xl overflow-hidden border border-white/20 bg-blue-950/50 backdrop-blur-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                    alt="Dordoi Association" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8">
                    <h3 className="text-2xl font-bold mb-2">Строим будущее вместе</h3>
                    <p className="text-white/80">Инвестиции в развитие региона</p>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-blue-900/50 to-blue-950/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="container mx-auto px-6 relative">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
              Дордой
            </span>{' '}
            в цифрах
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Counter target={25} label="Лет опыта" />
            <Counter target={10000} label="Рабочих мест" />
            <Counter target={500} label="Бизнес проектов" />
            <Counter target={50} label="Социальных программ" />
          </div>
        </div>
      </section>

      {/* Mission & Goals Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Navigation */}
            <motion.div 
              className="lg:w-1/4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="sticky top-28 space-y-2 bg-blue-950/50 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                <motion.button 
                  className={`w-full text-left px-6 py-4 rounded-xl transition-all flex items-center ${activeTab === 'mission' ? 'bg-yellow-500 text-blue-900 font-bold' : 'hover:bg-white/5'}`}
                  onClick={() => setActiveTab('mission')}
                  whileHover={{ x: 5 }}
                >
                  <span className="mr-3">🌟</span>
                  <span>Миссия</span>
                </motion.button>
                <motion.button 
                  className={`w-full text-left px-6 py-4 rounded-xl transition-all flex items-center ${activeTab === 'goals' ? 'bg-yellow-500 text-blue-900 font-bold' : 'hover:bg-white/5'}`}
                  onClick={() => setActiveTab('goals')}
                  whileHover={{ x: 5 }}
                >
                  <span className="mr-3">🎯</span>
                  <span>Основные цели</span>
                </motion.button>
                <motion.button 
                  className={`w-full text-left px-6 py-4 rounded-xl transition-all flex items-center ${activeTab === 'quote' ? 'bg-yellow-500 text-blue-900 font-bold' : 'hover:bg-white/5'}`}
                  onClick={() => setActiveTab('quote')}
                  whileHover={{ x: 5 }}
                >
                  <span className="mr-3">💬</span>
                  <span>Наша философия</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Content */}
            <div className="lg:w-3/4">
              <AnimatePresence mode="wait">
                {activeTab === 'mission' && (
                  <motion.div
                    key="mission"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-gradient-to-br from-blue-900/50 to-blue-950/80 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-10"
                  >
                    <div className="flex items-center mb-8">
                      <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center mr-4">
                        <span className="text-2xl">🌟</span>
                      </div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                        Наша Миссия
                      </h2>
                    </div>
                    
                    <motion.p 
                      className="text-xl leading-relaxed mb-10 text-white/90"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Создавать устойчивую бизнес-среду, способствующую экономическому росту Кыргызстана, 
                      поддержке предпринимательства и развитию общества через торговлю, инвестиции, 
                      спорт и социальные инициативы.
                    </motion.p>
                    
                    <div className="relative rounded-2xl overflow-hidden h-80">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-yellow-500 opacity-30 z-10"></div>
                      <img 
                        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                        alt="Business Growth" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 p-6 z-20">
                        <h3 className="text-2xl font-bold mb-2">Стратегия развития</h3>
                        <p className="text-white/90">Долгосрочные инвестиции в человеческий капитал</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'goals' && (
                  <motion.div
                    key="goals"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8"
                  >
                    <motion.div 
                      className="bg-gradient-to-br from-blue-900/50 to-blue-950/80 backdrop-blur-sm rounded-2xl border border-white/10 p-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                        🎯 Основные цели
                      </h2>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <GoalItem
                          number="1"
                          title="Развитие торговли и бизнеса"
                          items={[
                            "Создание современных торговых площадок",
                            "Поддержка малого и среднего бизнеса",
                            "Развитие экспорта и импорта в регионе"
                          ]}
                        />
                        
                        <GoalItem
                          number="2"
                          title="Создание рабочих мест"
                          items={[
                            "Обеспечение занятости тысяч граждан",
                            "Повышение уровня жизни населения"
                          ]}
                        />
                        
                        <GoalItem
                          number="3"
                          title="Социальная ответственность"
                          items={[
                            "Поддержка образования и здравоохранения",
                            "Развитие культуры и спорта",
                            "Реализация благотворительных проектов"
                          ]}
                        />
                        
                        <GoalItem
                          number="4"
                          title="Развитие спортивной инфраструктуры"
                          items={[
                            "Финансирование футбольного клуба «Дордой»",
                            "Поддержка молодежного спорта"
                          ]}
                        />
                        
                        <GoalItem
                          number="5"
                          title="Инвестиции в будущее"
                          items={[
                            "Долгосрочные устойчивые проекты",
                            "Сотрудничество с международными партнёрами"
                          ]}
                        />
                        
                        <GoalItem
                          number="6"
                          title="Развитие региона и страны"
                          items={[
                            "Содействие экономической стабильности",
                            "Развитие торговых связей в Центральной Азии"
                          ]}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {activeTab === 'quote' && (
                  <motion.div
                    key="quote"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-gradient-to-br from-blue-900/50 to-blue-950/80 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-10"
                  >
                    <div className="flex items-center mb-8">
                      <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center mr-4">
                        <span className="text-2xl">💬</span>
                      </div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                        Наша философия
                      </h2>
                    </div>
                    
                    <motion.div 
                      className="relative my-12"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="absolute -top-6 -left-6 text-7xl text-yellow-500/20">"</div>
                      <blockquote className="text-2xl md:text-3xl italic pl-8 py-6 border-l-4 border-yellow-500 font-medium leading-relaxed">
                        Мы не просто строим рынок — мы строим платформу для будущего поколения предпринимателей Кыргызстана.
                      </blockquote>
                      <div className="absolute -bottom-6 -right-6 text-7xl text-yellow-500/20">"</div>
                    </motion.div>
                    
                    <div className="grid md:grid-cols-2 gap-8 mt-16">
                      <Card3D>
                        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 p-8 rounded-2xl border border-yellow-500/30 h-full">
                          <h3 className="text-2xl font-bold mb-6 text-yellow-400">Наши ценности</h3>
                          <ul className="space-y-4">
                            <motion.li 
                              className="flex items-start"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 }}
                              viewport={{ once: true }}
                            >
                              <span className="bg-yellow-400 text-blue-900 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">✓</span>
                              <div>
                                <span className="font-bold">Инновации</span> - Постоянное развитие и внедрение новых подходов
                              </div>
                            </motion.li>
                            <motion.li 
                              className="flex items-start"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 }}
                              viewport={{ once: true }}
                            >
                              <span className="bg-yellow-400 text-blue-900 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">✓</span>
                              <div>
                                <span className="font-bold">Ответственность</span> - Перед обществом и будущими поколениями
                              </div>
                            </motion.li>
                            <motion.li 
                              className="flex items-start"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 }}
                              viewport={{ once: true }}
                            >
                              <span className="bg-yellow-400 text-blue-900 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">✓</span>
                              <div>
                                <span className="font-bold">Единство</span> - Вместе мы достигаем большего
                              </div>
                            </motion.li>
                          </ul>
                        </div>
                      </Card3D>
                      
                      <Card3D>
                        <div className="bg-gradient-to-br from-blue-900/80 to-blue-800/80 p-8 rounded-2xl border border-white/10 h-full">
                          <h3 className="text-2xl font-bold mb-6 text-yellow-400">Наше видение</h3>
                          <motion.p 
                            className="mb-6 text-white/90"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                          >
                            Мы видим Кыргызстан как экономически стабильную страну с развитой инфраструктурой, 
                            где каждый предприниматель имеет возможности для роста, а каждый гражданин - достойный уровень жизни.
                          </motion.p>
                          <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent my-6"></div>
                          <motion.p 
                            className="text-white/90"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            viewport={{ once: true }}
                          >
                            Наша цель - стать катализатором позитивных изменений в регионе Центральной Азии через инновации, 
                            инвестиции и социальные программы.
                          </motion.p>
                        </div>
                      </Card3D>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="container mx-auto px-6 relative">
          <Card3D className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-800/80 to-blue-900/80 rounded-2xl border border-white/10 backdrop-blur-sm p-10 text-center">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Готовы стать частью нашего движения?
              </motion.h2>
              <motion.p 
                className="text-xl mb-10 max-w-2xl mx-auto text-white/90"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                Присоединяйтесь к Дордой Ассоциации и вместе мы создадим лучшее будущее для Кыргызстана
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.button 
                  className="relative overflow-hidden group px-10 py-5 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-blue-900 font-bold text-lg transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Связаться с нами</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </motion.button>
              </motion.div>
            </div>
          </Card3D>
        </div>
      </section>
    </div>
  );
};

export default DordoiAssociationModern;