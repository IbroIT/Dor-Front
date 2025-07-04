import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlobeAltIcon, ArrowTopRightOnSquareIcon, CalendarIcon, UsersIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const InternationalProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedProject, setExpandedProject] = useState(null);

  useEffect(() => {
    // Имитация загрузки данных
    const fetchProjects = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockProjects = [
          {
            id: 1,
            name: "Глобальная торговая инициатива",
            country: "Германия",
            flag: "🇩🇪",
            description: "Создание трансграничных торговых платформ для малого и среднего бизнеса",
            status: "active",
            startDate: "2023-05-15",
            endDate: "2025-12-31",
            participants: 24,
            budget: "€2.5M",
            results: "Увеличение экспорта на 35% среди участников",
            website: "https://global-trade.example",
            partners: ["Торговая палата Германии", "Европейский бизнес-альянс"]
          },
          {
            id: 2,
            name: "Зеленые технологии для городов",
            country: "Швеция",
            flag: "🇸🇪",
            description: "Внедрение экологичных решений для городской инфраструктуры",
            status: "completed",
            startDate: "2022-01-10",
            endDate: "2023-11-30",
            participants: 18,
            budget: "€1.8M",
            results: "Снижение углеродного следа на 28% в пилотных городах",
            website: "https://green-cities.example",
            partners: ["Шведское агентство по охране окружающей среды", "Nordic Eco Solutions"]
          },
          {
            id: 3,
            name: "Цифровая трансформация образования",
            country: "Эстония",
            flag: "🇪🇪",
            description: "Обмен опытом по цифровизации образовательных процессов",
            status: "active",
            startDate: "2024-02-01",
            endDate: "2026-06-30",
            participants: 32,
            budget: "€3.2M",
            results: "Внедрено 15 инновационных образовательных платформ",
            website: "https://digital-edu.example",
            partners: ["Министерство образования Эстонии", "Tallinn Tech University"]
          },
          {
            id: 4,
            name: "Инновации в здравоохранении",
            country: "Израиль",
            flag: "🇮🇱",
            description: "Совместные исследования в области медицинских технологий",
            status: "planned",
            startDate: "2025-09-01",
            endDate: "2027-08-31",
            participants: 0,
            budget: "€4.0M",
            results: "",
            website: "https://health-innovations.example",
            partners: ["Израильская ассоциация биотехнологий", "Медицинский центр Хадасса"]
          }
        ];
        
        setProjects(mockProjects);
      } catch (error) {
        console.error("Ошибка загрузки проектов:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.status === activeFilter);

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'planned': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Международные проекты</h2>
        <div className="space-y-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="h-7 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
              <div className="h-5 bg-gray-100 rounded w-1/2 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-100 rounded w-full animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Международные проекты</h2>
          <p className="text-gray-600 mt-2">Наше сотрудничество с зарубежными партнерами</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${activeFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Все проекты
          </button>
          <button 
            onClick={() => setActiveFilter('active')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${activeFilter === 'active' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Активные
          </button>
          <button 
            onClick={() => setActiveFilter('completed')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${activeFilter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Завершенные
          </button>
          <button 
            onClick={() => setActiveFilter('planned')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${activeFilter === 'planned' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Планируемые
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`border rounded-xl overflow-hidden ${expandedProject === project.id ? 'border-indigo-300 shadow-md' : 'border-gray-200'}`}
              >
                <div 
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{project.flag}</span>
                        <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
                      </div>
                      <div className="flex items-center mt-3 gap-4 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status === 'active' && 'Активный'}
                          {project.status === 'completed' && 'Завершен'}
                          {project.status === 'planned' && 'Планируемый'}
                        </span>
                        <div className="flex items-center text-gray-600 text-sm">
                          <GlobeAltIcon className="w-4 h-4 mr-1" />
                          {project.country}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          {project.startDate} - {project.endDate}
                        </div>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedProject === project.id ? 180 : 0 }}
                      className="text-gray-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  </div>
                  
                  <p className="mt-4 text-gray-700">{project.description}</p>
                </div>

                <AnimatePresence>
                  {expandedProject === project.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                            <UsersIcon className="w-5 h-5 mr-2 text-indigo-500" />
                            Участники и бюджет
                          </h4>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex justify-between">
                              <span>Количество участников:</span>
                              <span className="font-medium">{project.participants}</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Бюджет проекта:</span>
                              <span className="font-medium">{project.budget}</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                            <ChartBarIcon className="w-5 h-5 mr-2 text-indigo-500" />
                            Результаты
                          </h4>
                          {project.results ? (
                            <p className="text-gray-700">{project.results}</p>
                          ) : (
                            <p className="text-gray-500">Результаты будут доступны после завершения проекта</p>
                          )}
                        </div>
                        
                        <div className="md:col-span-2">
                          <h4 className="font-medium text-gray-800 mb-3">Партнеры проекта</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.partners.map((partner, index) => (
                              <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                                {partner}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <a 
                          href={project.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          Официальный сайт проекта
                          <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-gray-50 rounded-xl"
            >
              <p className="text-gray-500">Нет проектов по выбранному фильтру</p>
              <button 
                onClick={() => setActiveFilter('all')}
                className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Показать все проекты
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InternationalProjects;