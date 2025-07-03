import { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaBuilding, FaUsers, FaHeadset } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

const ContactsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('office');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="h-16 w-16 border-4 border-blue-600 border-t-transparent rounded-full mb-4"
          ></motion.div>
          <h2 className="text-2xl font-semibold text-blue-800">Dordoi Association</h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Шапка */}
      <header className="bg-white py-12 border-b border-blue-100">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-blue-900 mb-3"
          >
            Контакты центрального офиса
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-blue-600 text-lg"
          >
            Бишкек, Кыргызстан
          </motion.p>
        </div>
      </header>

      {/* Основное содержимое */}
      <main className="container mx-auto px-4 py-12">
        {/* Вкладки */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-blue-50 rounded-lg p-1">
            {[
              { id: 'office', label: 'Центральный офис', icon: <FaBuilding className="mr-2" /> },
              { id: 'departments', label: 'Отделы', icon: <FaUsers className="mr-2" /> },
              { id: 'feedback', label: 'Обратная связь', icon: <FaHeadset className="mr-2" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-blue-700 hover:bg-blue-100'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Контент вкладок */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mb-20"
          >
            {activeTab === 'office' && <OfficeInfo />}
            {activeTab === 'departments' && <DepartmentsInfo />}
            {activeTab === 'feedback' && <FeedbackForm />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

// Компонент информации о центральном офисе
const OfficeInfo = () => {
  const contactItems = [
    {
      icon: <FaMapMarkerAlt className="text-blue-600 text-xl" />,
      title: "Адрес",
      content: "г. Бишкек, пр. Чуй, 123, офис 501"
    },
    {
      icon: <FaPhone className="text-blue-600 text-xl" />,
      title: "Телефон",
      content: ["+996 (312) 123-456", "+996 (555) 123-456 (мобильный)"]
    },
    {
      icon: <FaEnvelope className="text-blue-600 text-xl" />,
      title: "Email",
      content: ["office@dordoi.kg", "info@dordoi.kg"]
    },
    {
      icon: <FaClock className="text-blue-600 text-xl" />,
      title: "Часы работы",
      content: ["Пн-Пт: 8:00 - 18:00", "Сб: 10:00 - 15:00", "Вс: выходной"]
    }
  ];

  // Координаты офиса Dordoi в Бишкеке
  const officeCoordinates = [42.8746, 74.5698];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden"
      >
        <div className="h-96">
          <YMaps>
            <Map
              defaultState={{
                center: officeCoordinates,
                zoom: 15,
                controls: ['zoomControl']
              }}
              width="100%"
              height="100%"
              modules={['control.ZoomControl']}
            >
              <Placemark 
                geometry={officeCoordinates}
                options={{
                  iconLayout: 'default#image',
                  iconImageHref: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                  iconImageSize: [40, 40],
                  iconImageOffset: [-20, -40]
                }}
                properties={{
                  hintContent: 'Центральный офис Dordoi Association',
                  balloonContent: `
                    <div style="padding: 10px;">
                      <strong>Dordoi Association</strong><br/>
                      пр. Чуй, 123, офис 501<br/>
                      <a href="https://yandex.ru/maps/?pt=${officeCoordinates[1]},${officeCoordinates[0]}&z=15&l=map" 
                         target="_blank" 
                         style="color: #2563EB; text-decoration: underline;">
                        Открыть в Яндекс.Картах
                      </a>
                    </div>
                  `
                }}
              />
            </Map>
          </YMaps>
        </div>
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-blue-900 mb-6">Контактная информация</h2>
          <div className="space-y-6">
            {contactItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start"
              >
                <div className="bg-blue-50 p-2 rounded-lg mr-4">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-medium text-blue-800">{item.title}</h3>
                  {Array.isArray(item.content) ? (
                    item.content.map((text, i) => (
                      <p key={i} className="text-gray-600">{text}</p>
                    ))
                  ) : (
                    <p className="text-gray-600">{item.content}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-blue-100 shadow-sm p-8"
        >
          <h2 className="text-2xl font-semibold text-blue-900 mb-6">Как добраться</h2>
          <p className="text-gray-600 mb-6">
            Наш офис расположен в центре Бишкека, в деловом районе с хорошей транспортной доступностью.
          </p>
          <ul className="space-y-4">
            {[
              "Метро 'Ала-Тоо' - 7 минут пешком",
              "Автобусы № 1, 5, 12 - остановка 'Дубовый парк'",
              "Маршрутки № 107, 110, 115 - остановка 'ЦУМ'",
              "Парковка для посетителей доступна с 8:00 до 18:00"
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-start"
              >
                <span className="bg-blue-100 text-blue-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0 text-xs">
                  {index + 1}
                </span>
                <span className="text-gray-600">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-blue-50 rounded-xl border border-blue-200 p-8"
        >
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">Экстренная связь</h2>
          <p className="text-blue-700 mb-6">
            Для срочных вопросов в нерабочее время:
          </p>
          <motion.div 
            whileHover={{ y: -2 }}
            className="bg-blue-600 text-white rounded-lg p-6 flex items-center justify-between"
          >
            <div className="flex items-center">
              <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                <FaPhone className="text-white" />
              </div>
              <div>
                <p className="text-blue-100 text-sm">Круглосуточная поддержка</p>
                <p className="text-xl font-semibold">+996 (555) 987-654</p>
              </div>
            </div>
            <FaPaperPlane className="text-white opacity-80" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// Компонент информации об отделах
const DepartmentsInfo = () => {
  const departments = [
    {
      name: "Техническая поддержка",
      phone: "+996 (312) 111-222",
      email: "support@dordoi.kg",
      hours: "Круглосуточно",
      icon: <FaHeadset className="text-blue-600" />
    },
    {
      name: "Отдел продаж",
      phone: "+996 (312) 222-333",
      email: "sales@dordoi.kg",
      hours: "Пн-Пт: 8:00 - 20:00",
      icon: <FaUsers className="text-blue-600" />
    },
    {
      name: "Бухгалтерия",
      phone: "+996 (312) 333-444",
      email: "accounting@dordoi.kg",
      hours: "Пн-Пт: 9:00 - 17:00",
      icon: <FaBuilding className="text-blue-600" />
    },
    {
      name: "Отдел кадров",
      phone: "+996 (312) 444-555",
      email: "hr@dordoi.kg",
      hours: "Пн-Пт: 10:00 - 18:00",
      icon: <FaUsers className="text-blue-600" />
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden"
    >
      <div className="bg-blue-600 p-8">
        <h2 className="text-2xl font-semibold text-white mb-2">Наши отделы</h2>
        <p className="text-blue-100">Свяжитесь напрямую с нужным вам отделом</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
        {departments.map((dept, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="border border-blue-100 rounded-lg p-6 hover:shadow-md transition-all"
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-50 p-3 rounded-lg mr-4">
                {dept.icon}
              </div>
              <h3 className="text-lg font-semibold text-blue-900">{dept.name}</h3>
            </div>
            
            <div className="space-y-3 pl-16">
              <div className="flex items-center text-gray-600">
                <FaPhone className="text-blue-500 mr-3" />
                <span>{dept.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaEnvelope className="text-blue-500 mr-3" />
                <span>{dept.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaClock className="text-blue-500 mr-3" />
                <span>{dept.hours}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Компонент формы обратной связи
const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    department: 'general',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Имитация отправки формы
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        department: 'general',
      });
      
      // Сброс сообщения об успехе через 5 секунд
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto"
    >
      <div className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden">
        <div className="bg-blue-600 p-8">
          <h2 className="text-2xl font-semibold text-white mb-2">Обратная связь</h2>
          <p className="text-blue-100">Мы ответим вам в течение рабочего дня</p>
        </div>
        
        <AnimatePresence>
          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mx-8 mt-8"
            >
              <p>Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-blue-800 mb-2">
                Ваше имя <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-800 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-blue-800 mb-2">
                Телефон
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-blue-800 mb-2">
                Отдел
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzNzYwQTUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGV2cm9uLWRvd24iPjxwYXRoIGQ9Im02IDkgNiA2IDYtNiIvPjwvc3ZnPg==')] bg-no-repeat bg-[center_right_1rem]"
              >
                <option value="general">Общие вопросы</option>
                <option value="support">Техническая поддержка</option>
                <option value="sales">Отдел продаж</option>
                <option value="hr">Отдел кадров</option>
                <option value="accounting">Бухгалтерия</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6">
            <label htmlFor="message" className="block text-sm font-medium text-blue-800 mb-2">
              Сообщение <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            ></textarea>
          </div>
          
          <div className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${
                isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Отправка...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <FaPaperPlane className="mr-2" />
                  Отправить сообщение
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactsPage;