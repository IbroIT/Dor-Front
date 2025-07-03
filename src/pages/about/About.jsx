import { useState, useEffect, useRef } from 'react';
import { FaUsers, FaHandshake, FaChartLine, FaLightbulb, FaQuoteLeft } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { motion, useScroll, useTransform } from 'framer-motion';

const AboutUsPage = () => {
  const [animatedValues, setAnimatedValues] = useState({
    members: 0,
    projects: 0,
    partners: 0,
    years: 0
  });

  const finalValues = {
    members: 150,
    projects: 42,
    partners: 28,
    years: 5
  };

  // Анимация чисел с easing-функцией для более естественного движения
  useEffect(() => {
    const duration = 2500;
    const startTime = performance.now();

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeOutQuart(progress);

      setAnimatedValues({
        members: Math.floor(easedProgress * finalValues.members),
        projects: Math.floor(easedProgress * finalValues.projects),
        partners: Math.floor(easedProgress * finalValues.partners),
        years: Math.floor(easedProgress * finalValues.years)
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  const teamMembers = [
    { 
      id: 1, 
      name: 'Алексей Петров', 
      role: 'Основатель', 
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Эксперт в области социальных инноваций с 10-летним опытом управления международными проектами.'
    },
    { 
      id: 2, 
      name: 'Мария Иванова', 
      role: 'Директор', 
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Специалист по стратегическому развитию и партнерским отношениям.'
    },
    { 
      id: 3, 
      name: 'Дмитрий Смирнов', 
      role: 'Менеджер проектов', 
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      bio: 'Координирует реализацию наших ключевых инициатив и работу с волонтерами.'
    },
    { 
      id: 4, 
      name: 'Елена Кузнецова', 
      role: 'Координатор', 
      image: 'https://randomuser.me/api/portraits/women/63.jpg',
      bio: 'Организует образовательные программы и мероприятия сообщества.'
    },
  ];

  const [activeMember, setActiveMember] = useState(null);
  const [hoveredValue, setHoveredValue] = useState(null);

  // Параллакс эффекты
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section с параллакс эффектом */}
      <motion.div 
        className="relative bg-gradient-to-br from-blue-700 to-blue-900 text-white py-32 overflow-hidden"
        style={{ y: yBg }}
        ref={ref}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <motion.div 
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl"
              animate={{
                x: [0, 40, 0],
                y: [0, -60, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div 
              className="absolute top-1/3 right-1/4 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-3xl"
              animate={{
                x: [0, -30, 0],
                y: [0, 40, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 2
              }}
            />
            <motion.div 
              className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl"
              animate={{
                x: [0, 20, 0],
                y: [0, -30, 0],
                scale: [1, 0.9, 1]
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 4
              }}
            />
          </div>
        </div>
        
        <motion.div 
          className="container mx-auto px-6 relative z-10"
          style={{ y: yText }}
        >
          <motion.h1 
            className="text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            О <span className="text-yellow-400">Doorway</span> Association
          </motion.h1>
          <motion.p 
            className="text-2xl max-w-2xl mb-10 opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Мы - команда энтузиастов, объединенных общей целью создавать возможности и строить мосты между людьми и идеями.
          </motion.p>
          <motion.button 
            className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Присоединиться к нам
            <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Mission Section */}
      <div className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <motion.h2 
                className="text-4xl font-bold text-blue-800 mb-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Наша миссия
              </motion.h2>
              
              <motion.p 
                className="text-gray-700 mb-6 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Мы стремимся создавать инновационные решения, которые помогают людям находить новые возможности и реализовывать свой потенциал.
              </motion.p>
              
              <motion.p 
                className="text-gray-700 mb-8 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Наша ассоциация работает на стыке технологий, образования и социальных инициатив, чтобы сделать мир более открытым и доступным.
              </motion.p>
              
              <motion.div 
                className="bg-yellow-50 p-8 rounded-xl border-l-4 border-yellow-400 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <FaQuoteLeft className="text-yellow-400 text-4xl opacity-20 absolute top-4 left-4" />
                <h3 className="text-xl font-semibold text-blue-800 mb-2 relative z-10">Наш девиз</h3>
                <p className="text-gray-800 italic text-lg relative z-10">"Открывая двери к новым возможностям"</p>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-yellow-400 rounded-full filter blur-3xl opacity-20" />
              </motion.div>
            </div>
            
            <div className="lg:w-1/2">
              <motion.div 
                className="bg-gradient-to-br from-blue-600 to-blue-800 p-1 rounded-2xl shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="bg-white p-8 rounded-xl">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { icon: <FaUsers className="text-4xl" />, title: "Участники", value: animatedValues.members, suffix: "+", color: "from-blue-500 to-blue-600" },
                      { icon: <FaHandshake className="text-4xl" />, title: "Партнеры", value: animatedValues.partners, suffix: "+", color: "from-yellow-500 to-yellow-600" },
                      { icon: <FaChartLine className="text-4xl" />, title: "Проекты", value: animatedValues.projects, suffix: "+", color: "from-green-500 to-green-600" },
                      { icon: <FaLightbulb className="text-4xl" />, title: "Опыт", value: animatedValues.years, suffix: " лет", color: "from-purple-500 to-purple-600" },
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        className={`bg-gradient-to-br ${item.color} text-white p-6 rounded-xl shadow-md cursor-default relative overflow-hidden group`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                        viewport={{ once: true }}
                        onMouseEnter={() => setHoveredValue(index)}
                        onMouseLeave={() => setHoveredValue(null)}
                        whileHover={{ y: -5 }}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                            {item.icon}
                          </div>
                          <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                          <p className="text-3xl font-bold">
                            {item.value}
                            <span className="text-2xl opacity-80">{item.suffix}</span>
                          </p>
                        </div>
                        <motion.div 
                          className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                          initial={{ scale: 0.5 }}
                          animate={{ scale: hoveredValue === index ? 1.2 : 0.5 }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-24 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.h2 
            className="text-4xl font-bold text-center text-blue-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Наша команда
          </motion.h2>
          
          <motion.p 
            className="text-xl text-center text-gray-600 max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Профессионалы, которые делают Doorway Association таким, какой он есть
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.id}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setActiveMember(member.id)}
                onMouseLeave={() => setActiveMember(null)}
              >
                <div className={`bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-500 ${activeMember === member.id ? 'transform -translate-y-4 shadow-2xl' : ''}`}>
                  <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center relative overflow-hidden">
                    <motion.img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg z-10"
                      animate={{
                        scale: activeMember === member.id ? 1.1 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-blue-800 mb-1">{member.name}</h3>
                    <p className="text-yellow-600 font-medium mb-4">{member.role}</p>
                    
                    <motion.div
                      className="overflow-hidden"
                      initial={{ height: 0 }}
                      animate={{ 
                        height: activeMember === member.id ? 'auto' : 0 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                    </motion.div>
                    
                    <div className="flex justify-center space-x-4">
                      {['facebook', 'twitter', 'linkedin'].map((social, i) => (
                        <motion.a 
                          key={i}
                          href="#"
                          className="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded-full"
                          whileHover={{ y: -3, scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            {social === 'facebook' && (
                              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                            )}
                            {social === 'twitter' && (
                              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            )}
                            {social === 'linkedin' && (
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            )}
                          </svg>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-4xl font-bold text-center text-blue-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Наши ценности
          </motion.h2>
          
          <motion.p 
            className="text-xl text-center text-gray-600 max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Принципы, которые направляют нашу работу каждый день
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Инновации",
                description: "Мы постоянно ищем новые подходы и решения, чтобы оставаться на передовой в нашей области.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                ),
                color: "bg-blue-100 text-blue-800",
                hover: "hover:bg-blue-600 hover:text-white"
              },
              {
                title: "Сообщество",
                description: "Мы верим в силу сообщества и сотрудничества для достижения значимых результатов.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                ),
                color: "bg-yellow-100 text-yellow-800",
                hover: "hover:bg-yellow-600 hover:text-white"
              },
              {
                title: "Надежность",
                description: "Наши партнеры и участники могут рассчитывать на нас - мы выполняем свои обязательства.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                ),
                color: "bg-green-100 text-green-800",
                hover: "hover:bg-green-600 hover:text-white"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                className={`p-8 rounded-2xl shadow-md transition-all duration-300 ${value.color} ${value.hover} cursor-default`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 mx-auto shadow-inner">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-center mb-4">{value.title}</h3>
                <p className="text-center">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-800/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.h2 
            className="text-4xl font-bold text-center text-blue-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Отзывы партнеров
          </motion.h2>
          
          <div className="max-w-5xl mx-auto mt-16">
            <motion.div 
              className="bg-white p-10 rounded-3xl shadow-xl relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <FaQuoteLeft className="text-blue-200 text-6xl absolute top-6 left-6" />
              <div className="relative z-10">
                <p className="text-xl text-gray-700 mb-8 italic">
                  "Сотрудничество с Doorway Association открыло для нашей компании новые горизонты. Их инновационный подход и профессионализм команды помогли нам реализовать проекты, которые мы не смогли бы сделать самостоятельно."
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://randomuser.me/api/portraits/women/68.jpg" 
                    alt="Ольга Семенова" 
                    className="w-16 h-16 rounded-full object-cover border-4 border-blue-100 mr-4" 
                  />
                  <div>
                    <h4 className="font-bold text-blue-800">Ольга Семенова</h4>
                    <p className="text-gray-600">Директор по развитию, TechSolutions</p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-100 rounded-full filter blur-3xl opacity-50" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-32 bg-gradient-to-r from-blue-700 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h2 
            className="text-4xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Готовы стать частью нашего сообщества?
          </motion.h2>
          
          <motion.p 
            className="text-xl mb-12 max-w-2xl mx-auto opacity-90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Присоединяйтесь к Doorway Association сегодня и откройте для себя новые возможности для роста и развития.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.button 
              className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-lg flex items-center justify-center group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Присоединиться
              <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
            
            <motion.button 
              className="bg-transparent hover:bg-white/10 text-white font-bold py-4 px-10 border-2 border-white rounded-full transition-all duration-300 flex items-center justify-center group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Узнать больше
              <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Doorway Association</h3>
              <p className="text-blue-300">Открывая двери к новым возможностям</p>
            </div>
            <div className="flex space-x-6">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social, index) => (
                <motion.a 
                  key={index}
                  href="#"
                  className="text-blue-300 hover:text-white"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    {social === 'facebook' && (
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    )}
                    {social === 'twitter' && (
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    )}
                    {social === 'instagram' && (
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    )}
                    {social === 'linkedin' && (
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    )}
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-300">
            <p>© {new Date().getFullYear()} Doorway Association. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default AboutUsPage;