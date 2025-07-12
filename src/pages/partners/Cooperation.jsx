import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, FiX, FiDownload, FiShare2, FiPlus, 
  FiChevronDown, FiChevronUp, FiClock, 
  FiCheckCircle, FiZap, FiBarChart2, FiFileText 
} from 'react-icons/fi';

const Cooperation = () => {
  const [cooperations, setCooperations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const searchInputRef = useRef(null);

  // Mock data with more entries and categories
  const mockData = [
    {
      id: 1,
      title: "Стратегическое партнерство в бизнесе",
      partner: "Ассоциация предпринимателей",
      date: "12 мая 2025",
      description: "Совместные проекты в области развития предпринимательства и инноваций. Включает обмен знаниями, совместные инвестиции и развитие стартапов.",
      logo: "business-association.png",
      category: "Бизнес",
      status: "Активно",
      documents: [
        { name: "Соглашение.pdf", url: "#", size: "2.4 MB" },
        { name: "Приложение.docx", url: "#", size: "1.1 MB" }
      ],
      detailsLink: "#/partnership/1",
      progress: 85,
      updates: [
        { date: "10 июн 2025", text: "Подписано дополнительное соглашение" },
        { date: "28 мая 2025", text: "Проведена первая рабочая встреча" }
      ]
    },
    {
      id: 2,
      title: "Меморандум о взаимопонимании",
      partner: "Технологический университет",
      date: "28 июня 2025",
      description: "Сотрудничество в области научных исследований, студенческих обменов и совместных образовательных программ.",
      logo: "tech-university.png",
      category: "Образование",
      status: "Активно",
      documents: [
        { name: "Меморандум.pdf", url: "#", size: "3.2 MB" }
      ],
      detailsLink: "#/partnership/2",
      progress: 100,
      updates: [
        { date: "15 июл 2025", text: "Запущена совместная программа стажировок" }
      ]
    },
    {
      id: 3,
      title: "Соглашение о технологическом обмене",
      partner: "Инновационный центр",
      date: "15 марта 2025",
      description: "Обмен технологиями и патентами для ускорения разработки новых продуктов.",
      logo: "innovation-center.png",
      category: "Технологии",
      status: "В процессе",
      documents: [
        { name: "Техническое соглашение.pdf", url: "#", size: "4.7 MB" },
        { name: "Список технологий.xlsx", url: "#", size: "1.8 MB" }
      ],
      detailsLink: "#/partnership/3",
      progress: 45,
      updates: [
        { date: "20 мар 2025", text: "Переданы первые технические спецификации" }
      ]
    },
    {
      id: 4,
      title: "Экологическая инициатива",
      partner: "Зеленый альянс",
      date: "3 января 2025",
      description: "Совместная программа по снижению углеродного следа и внедрению экологичных практик.",
      logo: "green-alliance.png",
      category: "Экология",
      status: "Активно",
      documents: [
        { name: "Экологический протокол.pdf", url: "#", size: "5.1 MB" }
      ],
      detailsLink: "#/partnership/4",
      progress: 72,
      updates: [
        { date: "15 янв 2025", text: "Установлены первые солнечные панели" },
        { date: "10 фев 2025", text: "Снижение энергопотребления на 18%" }
      ]
    },
    {
      id: 5,
      title: "Культурный обмен",
      partner: "Международный фонд культуры",
      date: "22 апреля 2024",
      description: "Организация совместных культурных мероприятий и выставок.",
      logo: "culture-fund.png",
      category: "Культура",
      status: "Завершено",
      documents: [
        { name: "Культурное соглашение.pdf", url: "#", size: "2.9 MB" },
        { name: "План мероприятий.docx", url: "#", size: "0.8 MB" }
      ],
      detailsLink: "#/partnership/5",
      progress: 100,
      updates: [
        { date: "30 апр 2024", text: "Проведена итоговая выставка" },
        { date: "25 апр 2024", text: "Организовано 5 культурных мероприятий" }
      ]
    },
    {
      id: 6,
      title: "Спортивное партнерство",
      partner: "Городская спортивная лига",
      date: "8 июля 2025",
      description: "Поддержка местных спортивных команд и мероприятий.",
      logo: "sport-league.png",
      category: "Спорт",
      status: "Активно",
      documents: [
        { name: "Спортивное соглашение.pdf", url: "#", size: "3.5 MB" }
      ],
      detailsLink: "#/partnership/6",
      progress: 30,
      updates: [
        { date: "10 июл 2025", text: "Подписано соглашение о спонсорстве" }
      ]
    }
  ];

  // Загрузка данных
  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCooperations(mockData);
      } catch (error) {
        showNotification("Ошибка загрузки данных", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredCooperations = cooperations.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      activeFilter === 'all' || 
      (activeFilter === 'active' && item.status === 'Активно') ||
      (activeFilter === 'in-progress' && item.status === 'В процессе') ||
      (activeFilter === 'completed' && item.status === 'Завершено');
    
    return matchesSearch && matchesFilter;
  });

  const statusConfig = (status) => {
    switch(status) {
      case 'Активно': 
        return { 
          color: 'bg-blue-100 text-blue-800',
          icon: <FiZap className="text-blue-500" />,
          border: 'border-blue-200'
        };
      case 'В процессе': 
        return { 
          color: 'bg-yellow-100 text-yellow-800',
          icon: <FiClock className="text-yellow-500" />,
          border: 'border-yellow-200'
        };
      case 'Завершено': 
        return { 
          color: 'bg-green-100 text-green-800',
          icon: <FiCheckCircle className="text-green-500" />,
          border: 'border-green-200'
        };
      default: 
        return { 
          color: 'bg-gray-100 text-gray-800',
          icon: null,
          border: 'border-gray-200'
        };
    }
  };

  const handleViewDetails = (link) => {
    window.location.href = link;
    showNotification("Переход к деталям соглашения", "info");
  };

  const handleShare = async (item) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: item.title,
          text: `Соглашение с ${item.partner}`,
          url: window.location.origin + item.detailsLink,
        });
        showNotification("Успешно поделились", "success");
      } else {
        showNotification("Функция 'Поделиться' недоступна", "warning");
      }
    } catch (error) {
      showNotification("Ошибка при попытке поделиться", "error");
    }
  };

  const handleDownload = (doc) => {
    showNotification(`Скачивание: ${doc.name}`, "info");
    const link = document.createElement('a');
    link.href = doc.url;
    link.download = doc.name;
    link.click();
  };

  const handleAddNew = () => {
    showNotification("Открытие формы добавления", "info");
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setActiveFilter('all');
    searchInputRef.current.focus();
    showNotification("Фильтры сброшены", "success");
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Бизнес': 'from-blue-50 to-blue-100 text-blue-700',
      'Образование': 'from-purple-50 to-purple-100 text-purple-700',
      'Технологии': 'from-indigo-50 to-indigo-100 text-indigo-700',
      'Экология': 'from-green-50 to-green-100 text-green-700',
      'Культура': 'from-yellow-50 to-yellow-100 text-yellow-700',
      'Спорт': 'from-red-50 to-red-100 text-red-700'
    };
    return colors[category] || 'from-gray-50 to-gray-100 text-gray-700';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl w-1/3 mb-8 animate-pulse"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 sm:p-6">
      {/* Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center backdrop-blur-sm ${
              notification.type === 'error' ? 'bg-red-100/90 text-red-800 border-l-4 border-red-500' :
              notification.type === 'success' ? 'bg-green-100/90 text-green-800 border-l-4 border-green-500' :
              notification.type === 'warning' ? 'bg-yellow-100/90 text-yellow-800 border-l-4 border-yellow-500' :
              'bg-blue-100/90 text-blue-800 border-l-4 border-blue-500'
            }`}
          >
            {notification.type === 'success' && <FiCheckCircle className="mr-2" />}
            {notification.type === 'error' && <FiX className="mr-2" />}
            {notification.type === 'warning' && <FiClock className="mr-2" />}
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center md:text-left"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Партнерские <span className="text-blue-600">соглашения</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Все действующие и завершенные партнерские программы и соглашения
          </p>
          <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full w-24 mt-4 mx-auto md:mx-0"></div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Поиск соглашений</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  ref={searchInputRef}
                  placeholder="По названию, партнеру или категории..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <FiX className="text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </div>
            
            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-sm flex items-center ${
                    activeFilter === 'all' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Все
                </button>
                <button
                  onClick={() => setActiveFilter('active')}
                  className={`px-3 py-1.5 rounded-lg text-sm flex items-center ${
                    activeFilter === 'active' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <FiZap className="mr-1.5" /> Активные
                </button>
                <button
                  onClick={() => setActiveFilter('in-progress')}
                  className={`px-3 py-1.5 rounded-lg text-sm flex items-center ${
                    activeFilter === 'in-progress' 
                      ? 'bg-yellow-500 text-white shadow-md' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <FiClock className="mr-1.5" /> В процессе
                </button>
                <button
                  onClick={() => setActiveFilter('completed')}
                  className={`px-3 py-1.5 rounded-lg text-sm flex items-center ${
                    activeFilter === 'completed' 
                      ? 'bg-green-500 text-white shadow-md' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <FiCheckCircle className="mr-1.5" /> Завершённые
                </button>
              </div>
            </div>

            {(searchTerm || activeFilter !== 'all') && (
              <button
                onClick={handleResetFilters}
                className="px-3 py-1.5 rounded-lg text-sm bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 flex items-center"
              >
                <FiX className="mr-1.5" /> Сбросить
              </button>
            )}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-50 text-blue-600 mr-4">
                <FiFileText size={20} />
              </div>
              <div>
                <div className="text-sm text-gray-500">Всего соглашений</div>
                <div className="text-2xl font-bold text-gray-800">{cooperations.length}</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-50 text-green-600 mr-4">
                <FiCheckCircle size={20} />
              </div>
              <div>
                <div className="text-sm text-gray-500">Активных</div>
                <div className="text-2xl font-bold text-gray-800">
                  {cooperations.filter(i => i.status === 'Активно').length}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-50 text-yellow-600 mr-4">
                <FiBarChart2 size={20} />
              </div>
              <div>
                <div className="text-sm text-gray-500">В процессе</div>
                <div className="text-2xl font-bold text-gray-800">
                  {cooperations.filter(i => i.status === 'В процессе').length}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Найдено <span className="text-blue-600">{filteredCooperations.length}</span> соглашений
            </h2>
            
          </div>

          {filteredCooperations.length > 0 ? (
            <motion.div 
              layout
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredCooperations.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ y: -5 }}
                  className={`bg-white rounded-xl shadow-sm border ${statusConfig(item.status).border} overflow-hidden`}
                >
                  <div 
                    className="p-5 cursor-pointer"
                    onClick={() => toggleExpand(item.id)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig(item.status).color} flex items-center`}>
                        {statusConfig(item.status).icon}
                        <span className="ml-1">{item.status}</span>
                      </div>
                      <span className="text-xs text-gray-500">{item.date}</span>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.partner}</p>
                    </div>

                    <div className={`px-3 py-1 rounded-lg text-xs font-medium ${getCategoryColor(item.category)} bg-gradient-to-r w-fit`}>
                      {item.category}
                    </div>

                    {(item.status === 'Активно' || item.status === 'В процессе') && (
                      <div className="mt-4">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Прогресс выполнения:</span>
                          <span>{item.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              item.progress < 50 ? 'bg-yellow-500' : 
                              item.progress < 80 ? 'bg-blue-500' : 'bg-green-500'
                            }`} 
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <AnimatePresence>
                    {expandedId === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-5 pb-5"
                      >
                        <div className="border-t pt-4">
                          <p className="text-gray-700 text-sm mb-4">{item.description}</p>
                          
                          {item.updates && item.updates.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-medium text-sm text-gray-800 mb-2 flex items-center">
                                <FiClock className="mr-2 text-gray-500" /> Последние обновления
                              </h4>
                              <div className="space-y-2">
                                {item.updates.map((update, i) => (
                                  <div key={i} className="text-xs bg-gray-50 p-2 rounded">
                                    <span className="font-medium text-gray-500">{update.date}: </span>
                                    <span className="text-gray-700">{update.text}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="mb-4">
                            <h4 className="font-medium text-sm text-gray-800 mb-2 flex items-center">
                              <FiFileText className="mr-2 text-gray-500" /> Документы
                            </h4>
                            <div className="space-y-2">
                              {item.documents.map((doc, index) => (
                                <motion.div 
                                  key={index}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="flex items-center justify-between bg-gray-50 p-2 rounded hover:bg-gray-100"
                                >
                                  <div className="truncate">
                                    <span className="text-xs font-medium text-gray-800 truncate">{doc.name}</span>
                                    <span className="block text-xs text-gray-500">{doc.size}</span>
                                  </div>
                                  <button
                                    onClick={() => handleDownload(doc)}
                                    className="text-blue-600 hover:text-blue-800 text-xs flex items-center px-2 py-1 bg-white rounded border border-gray-200"
                                  >
                                    <FiDownload className="mr-1" />
                                    Скачать
                                  </button>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => handleViewDetails(item.detailsLink)}
                              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm flex items-center flex-1 justify-center"
                            >
                              Подробнее
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => handleShare(item)}
                              className="px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-sm flex items-center border border-gray-300 flex-1 justify-center"
                            >
                              <FiShare2 className="mr-1.5" />
                              Поделиться
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <FiSearch className="text-blue-500 text-3xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Соглашения не найдены</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Попробуйте изменить параметры поиска или сбросить фильтры
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleResetFilters}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg inline-flex items-center shadow-md"
              >
                <FiX className="mr-2" />
                Сбросить фильтры
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cooperation;