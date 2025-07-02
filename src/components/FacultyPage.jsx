import { motion, AnimatePresence } from "framer-motion";
import { FaGraduationCap, FaLaptopCode, FaChartLine, FaFlask, FaUserGraduate, FaGlobe, FaTimes } from "react-icons/fa";
import { useState } from "react";

const ProgramsPage = () => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const programs = [
    {
      icon: <FaLaptopCode className="text-blue-500" size={32} />,
      title: "IT колледж",
      specialties: [
        "Программирование (Python, JS, Java)",
        "Искусственный интеллект",
        "Кибербезопасность",
        "Data Science"
      ],
      color: "from-blue-500 to-blue-700",
      description: "Наша IT-программа готовит специалистов мирового уровня. Обучение включает в себя не только теорию, но и множество практических заданий, хакатоны и стажировки в ведущих компаниях. Выпускники работают в таких компаниях как Google, Amazon и местных IT-гигантах.",
      duration: "3,5 года",
      price: "от $3500 в год"
    },
    {
      icon: <FaChartLine className="text-purple-500" size={32} />,
      title: "Бизнес & Менеджмент",
      specialties: [
        "Цифровой маркетинг",
        "Финансы и аналитика",
        "Управление проектами",
        "Международный бизнес"
      ],
      color: "from-purple-500 to-purple-700",
      description: "Программа разработана совместно с ведущими бизнес-школами Европы и Азии. Студенты учатся на реальных кейсах, участвуют в бизнес-симуляциях и имеют возможность пройти стажировку за рубежом. Наши выпускники становятся руководителями и предпринимателями.",
      duration: "4 года",
      price: "$5000 в год"
    },
    {
      icon: <FaFlask className="text-emerald-500" size={32} />,
      title: "Медицина",
      specialties: [
        "Медицинская информатика",
        "Биотехнологии",
        "Фармацевтика",
        "Лабораторная диагностика"
      ],
      color: "from-emerald-500 to-emerald-700",
      description: "Современное медицинское образование с использованием новейшего оборудования и технологий. Программа включает практику в лучших клиниках страны, исследования в современных лабораториях и возможность участия в международных медицинских проектах.",
      duration: "6 лет",
      price: "@800 в год"
    }
  ];

  const benefits = [
    {
      icon: <FaUserGraduate className="text-yellow-400" size={24} />,
      title: "Практико-ориентированное обучение",
      description: "80% времени - практика на реальных проектах"
    },
    {
      icon: <FaGlobe className="text-blue-400" size={24} />,
      title: "Международные программы",
      description: "Совместные программы с вузами Малайзии, Кореи и России"
    },
    {
      icon: <FaGraduationCap className="text-red-400" size={24} />,
      title: "Гарантированная стажировка",
      description: "Партнерская сеть из нескольких компаний"
    }
  ];

  const openModal = (program) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProgram(null), 300); // Даем время для анимации
  };

  return (
    <div className="bg-gray-50">
      <div className="relative bg-gradient-to-r from-blue-900 to-gray-900 text-white overflow-hidden">
        <div className="container mx-auto px-6 py-24 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Наши <span className="text-blue-400">программы</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-2xl mb-8"
          >
            Выберите направление, которое станет вашей профессией будущего
          </motion.p>
        </div>
        
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-blue-400/20 rounded-full"
            initial={{
              width: 0,
              height: 0,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
            animate={{
              width: Math.random() * 500 + 100,
              height: Math.random() * 500 + 100,
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 py-20 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-[10px]">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className={`bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl`}
            >
              <div className={`bg-gradient-to-r ${program.color} h-2`}></div>
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-white rounded-lg shadow-md mr-4">
                    {program.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{program.title}</h3>
                </div>
                <ul className="space-y-3 mb-6">
                  {program.specialties.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => openModal(program)}
                  className={`w-full py-3 bg-gradient-to-r ${program.color} text-white rounded-lg font-bold hover:opacity-90 transition-opacity`}
                >
                  Подробнее
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Модальное окно */}
      <AnimatePresence>
        {isModalOpen && selectedProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className={`relative bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`bg-gradient-to-r ${selectedProgram.color} h-2`}></div>
              <div className="p-8">
                <button 
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={24} />
                </button>
                
                <div className="flex items-start mb-6">
                  <div className="p-3 bg-white rounded-lg shadow-md mr-4">
                    {selectedProgram.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{selectedProgram.title}</h3>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                        {selectedProgram.duration}
                      </span>
                      <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                        {selectedProgram.price}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">Описание программы</h4>
                  <p className="text-gray-700">{selectedProgram.description}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">Специализации</h4>
                  <ul className="space-y-2">
                    {selectedProgram.specialties.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h4 className="text-lg font-semibold mb-2 text-blue-800">Как поступить?</h4>
                  <ol className="list-decimal list-inside space-y-1 text-gray-700">
                    <li>Подайте заявку онлайн или в приемной комиссии</li>
                    <li>Пройдите вступительное тестирование</li>
                    <li>Предоставьте документы об образовании</li>
                    <li>Заключите договор и оплатите обучение</li>
                  </ol>
                </div>
                <a href="https://forms.gle/7R3HRwzHMfttDcDC7">
                <button className={`w-full py-3 bg-gradient-to-r ${selectedProgram.color} text-white rounded-lg font-bold hover:opacity-90 transition-opacity`}>
                  Подать заявку </button></a>
                
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-gray-100 py-20">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Почему выбирают <span className="text-blue-600">Salymbekov University</span>?
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-blue-50 mr-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold">{benefit.title}</h3>
                </div>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Отзывы <span className="text-blue-600">наших студентов</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gray-50 p-8 rounded-xl border-l-4 border-blue-500"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 mr-4"></div>
                <div>
                  <h4 className="font-bold">Айдай</h4>
                  <p className="text-gray-500">Выпускница 2024, Computer Science</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Обучение дало мне все необходимые навыки для работы в крупной IT-компании. Уже через 2 месяца после выпуска получила оффер с зарплатой выше рынка!"
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gray-50 p-8 rounded-xl border-l-4 border-purple-500"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-500 mr-4"></div>
                <div>
                  <h4 className="font-bold">Виктор</h4>
                  <p className="text-gray-500">Студент, Computer Science</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Преподаватели - практики из топовых компаний. Лаборатории оборудованы по последнему слову техники. Уже на 2 курсе начал работать в отделе информационных технологий банка."
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramsPage;