import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GlobeAltIcon, 
  ArrowTopRightOnSquareIcon, 
  CalendarIcon, 
  UsersIcon, 
  ChartBarIcon,
  ChevronDownIcon,
  LightBulbIcon,
  CheckBadgeIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
  MapPinIcon,
  CurrencyEuroIcon,
  FlagIcon
} from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';

const InternationalProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedProject, setExpandedProject] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState(4);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Добавляем прогресс загрузки для лучшего UX
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 10;
          if (progress >= 100) clearInterval(interval);
        }, 100);

        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockProjects = [
          {
            id: 1,
            name: "Глобальная торговая инициатива",
            country: "Германия",
            countryCode: "DE",
            flag: "🇩🇪",
            description: "Создание трансграничных торговых платформ для малого и среднего бизнеса с использованием блокчейн-технологий",
            status: "active",
            startDate: "2023-05-15",
            endDate: "2025-12-31",
            participants: 24,
            budget: "€2.5M",
            results: [
              "Увеличение экспорта на 35% среди участников",
              "Запуск 3 новых торговых платформ",
              "Обучение 150+ предпринимателей"
            ],
            website: "https://global-trade.example",
            partners: ["Торговая палата Германии", "Европейский бизнес-альянс", "Deutsche Bank"],
            impact: "very-high",
            progress: 65,
            tags: ["блокчейн", "торговля", "МСБ"],
            image: "/project-images/global-trade.jpg"
          },
          {
            id: 2,
            name: "Зеленые технологии для городов",
            country: "Швеция",
            countryCode: "SE",
            flag: "🇸🇪",
            description: "Внедрение экологичных решений для городской инфраструктуры с акцентом на умные энергосистемы",
            status: "completed",
            startDate: "2022-01-10",
            endDate: "2023-11-30",
            participants: 18,
            budget: "€1.8M",
            results: [
              "Снижение углеродного следа на 28% в пилотных городах",
              "Внедрение 12 зеленых технологий",
              "Экономия €450K в год на энергозатратах"
            ],
            website: "https://green-cities.example",
            partners: ["Шведское агентство по охране окружающей среды", "Nordic Eco Solutions", "Stockholm City Council"],
            impact: "high",
            progress: 100,
            tags: ["экология", "умный город", "энергетика"],
            image: "/project-images/green-tech.jpg"
          },
          {
            id: 3,
            name: "Цифровая трансформация образования",
            country: "Эстония",
            countryCode: "EE",
            flag: "🇪🇪",
            description: "Обмен опытом по цифровизации образовательных процессов с использованием ИИ и VR технологий",
            status: "active",
            startDate: "2024-02-01",
            endDate: "2026-06-30",
            participants: 32,
            budget: "€3.2M",
            results: [
              "Внедрено 15 инновационных образовательных платформ",
              "Обучено 200+ преподавателей",
              "Охват 5000+ студентов"
            ],
            website: "https://digital-edu.example",
            partners: ["Министерство образования Эстонии", "Tallinn Tech University", "Estonian EdTech Alliance"],
            impact: "high",
            progress: 30,
            tags: ["образование", "ИИ", "VR"],
            image: "/project-images/digital-edu.jpg"
          },
          {
            id: 4,
            name: "Инновации в здравоохранении",
            country: "Израиль",
            countryCode: "IL",
            flag: "🇮🇱",
            description: "Совместные исследования в области медицинских технологий и телемедицины",
            status: "planned",
            startDate: "2025-09-01",
            endDate: "2027-08-31",
            participants: 0,
            budget: "€4.0M",
            results: [],
            website: "https://health-innovations.example",
            partners: ["Израильская ассоциация биотехнологий", "Медицинский центр Хадасса", "Weizmann Institute"],
            impact: "very-high",
            progress: 0,
            tags: ["медицина", "биотех", "телемедицина"],
            image: "/project-images/health-tech.jpg"
          },
          {
            id: 5,
            name: "Умные транспортные системы",
            country: "Нидерланды",
            countryCode: "NL",
            flag: "🇳🇱",
            description: "Разработка интеллектуальных систем управления городским транспортом",
            status: "active",
            startDate: "2023-08-15",
            endDate: "2025-05-20",
            participants: 22,
            budget: "€2.8M",
            results: [
              "Снижение пробок на 18% в Амстердаме",
              "Внедрение 5 новых алгоритмов маршрутизации"
            ],
            website: "https://smart-transport.example",
            partners: ["Министерство инфраструктуры Нидерландов", "Amsterdam Smart City", "ING Bank"],
            impact: "medium",
            progress: 45,
            tags: ["транспорт", "логистика", "ИИ"],
            image: "/project-images/smart-transport.jpg"
          },
          {
            id: 6,
            name: "Кибербезопасность для бизнеса",
            country: "Эстония",
            countryCode: "EE",
            flag: "🇪🇪",
            description: "Совместная программа по защите цифровой инфраструктуры предприятий",
            status: "completed",
            startDate: "2021-03-10",
            endDate: "2023-07-15",
            participants: 28,
            budget: "€3.5M",
            results: [
              "Защита 120+ компаний от кибератак",
              "Разработка 8 новых протоколов безопасности",
              "Снижение инцидентов на 42%"
            ],
            website: "https://cyber-security.example",
            partners: ["НАТО CCDCOE", "Эстонский центр кибербезопасности", "Guardtime"],
            impact: "high",
            progress: 100,
            tags: ["кибербезопасность", "IT", "защита данных"],
            image: "/project-images/cyber-security.jpg"
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

  // Функции для фильтрации и сортировки
  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === 'all' || project.status === activeFilter;
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.startDate) - new Date(a.startDate);
    if (sortBy === 'oldest') return new Date(a.startDate) - new Date(b.startDate);
    if (sortBy === 'budget-high') return parseFloat(b.budget.replace('€', '').replace('M', '')) - parseFloat(a.budget.replace('€', '').replace('M', ''));
    if (sortBy === 'budget-low') return parseFloat(a.budget.replace('€', '').replace('M', '')) - parseFloat(b.budget.replace('€', '').replace('M', ''));
    if (sortBy === 'impact') {
      const impactOrder = { 'very-high': 4, 'high': 3, 'medium': 2, 'low': 1 };
      return impactOrder[b.impact] - impactOrder[a.impact];
    }
    return 0;
  });

  const getStatusConfig = (status) => {
    switch(status) {
      case 'active': return {
        color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
        icon: <LightBulbIcon className="w-4 h-4" />,
        text: 'Активный'
      };
      case 'completed': return {
        color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
        icon: <CheckBadgeIcon className="w-4 h-4" />,
        text: 'Завершен'
      };
      case 'planned': return {
        color: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
        icon: <ClockIcon className="w-4 h-4" />,
        text: 'Планируемый'
      };
      default: return {
        color: 'bg-gray-100 text-gray-800',
        icon: null,
        text: 'Неизвестно'
      };
    }
  };

  const getImpactColor = (impact) => {
    switch(impact) {
      case 'very-high': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'high': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'low': return 'bg-green-500/10 text-green-600 border-green-500/20';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const showMoreProjects = () => {
    setVisibleProjects(prev => prev + 2);
  };

  const resetFilters = () => {
    setActiveFilter('all');
    setSearchQuery('');
    setSortBy('newest');
  };

  if (isLoading) {
    return (
      <div className="relative bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 py-16 px-4 sm:px-6 lg:px-8 rounded-3xl overflow-hidden">
        {/* Анимированный фон */}
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
            className="text-4xl md:text-5xl font-extrabold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 animate-gradient-x">
              Международные проекты
            </span>
          </motion.h2>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '40%' }}
            transition={{ duration: 1 }}
            className="h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 rounded-full mx-auto mb-6"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg text-gray-700 max-w-3xl mx-auto"
          >
            Наши глобальные инициативы и сотрудничество с ведущими организациями мира
          </motion.p>
        </div>
        
        <div className="relative z-10 space-y-6">
          {[...Array(4)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="border-2 border-blue-100/50 rounded-2xl p-6 bg-white/80 backdrop-blur-sm animate-pulse shadow-lg">
                <div className="flex justify-between">
                  <div className="h-7 bg-gray-200 rounded w-3/4 mb-6"></div>
                  <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
                <div className="h-8 bg-gray-200 rounded-lg w-full"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 py-16 px-4 sm:px-6 lg:px-8 rounded-3xl overflow-hidden">
      {/* Анимированный фон */}
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
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 gap-6">
          <div>
            <motion.h2 
              className="text-4xl md:text-5xl font-extrabold mb-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 animate-gradient-x">
                Международные проекты
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-gray-700 max-w-2xl"
            >
              Наши глобальные инициативы и сотрудничество с ведущими организациями мира
            </motion.p>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '40%' }}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 rounded-full mt-4"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {['all', 'active', 'completed', 'planned'].map((filter) => {
              const config = getStatusConfig(filter === 'all' ? '' : filter);
              return (
                <motion.button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all border ${
                    activeFilter === filter 
                      ? filter === 'all' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border-transparent' 
                        : `${config.color} border ${config.color.split(' ')[0].replace('bg-', 'border-')} shadow-md`
                      : 'bg-white/80 text-gray-700 hover:bg-gray-100/50 border border-gray-200/50 backdrop-blur-sm'
                  }`}
                >
                  {filter !== 'all' && config.icon}
                  {filter === 'all' ? 'Все проекты' : config.text}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Поиск и сортировка */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Поиск проектов..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-200/50 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </motion.div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-between w-full px-4 py-3 border border-gray-200/50 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:bg-gray-50/50 transition-all"
            >
              <div className="flex items-center">
                <FunnelIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-700">
                  {sortBy === 'newest' && 'Сначала новые'}
                  {sortBy === 'oldest' && 'Сначала старые'}
                  {sortBy === 'budget-high' && 'По бюджету (высокий)'}
                  {sortBy === 'budget-low' && 'По бюджету (низкий)'}
                  {sortBy === 'impact' && 'По значимости'}
                </span>
              </div>
              <ChevronDownIcon className={`h-5 w-5 text-gray-400 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-10 mt-1 w-full bg-white rounded-xl shadow-lg border border-gray-200/50 overflow-hidden"
                >
                  {[
                    { value: 'newest', label: 'Сначала новые' },
                    { value: 'oldest', label: 'Сначала старые' },
                    { value: 'budget-high', label: 'По бюджету (высокий)' },
                    { value: 'budget-low', label: 'По бюджету (низкий)' },
                    { value: 'impact', label: 'По значимости' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsFilterOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 hover:bg-blue-50/50 transition-colors ${
                        sortBy === option.value ? 'bg-blue-100/50 text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {(activeFilter !== 'all' || searchQuery || sortBy !== 'newest') && (
            <motion.button
              onClick={resetFilters}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200/50 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:bg-gray-50/50 transition-all text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <XMarkIcon className="h-5 w-5" />
              Сбросить фильтры
            </motion.button>
          )}
        </div>

        {/* Статистика */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Всего проектов</div>
            <div className="text-2xl font-bold text-blue-600">{projects.length}</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Активные</div>
            <div className="text-2xl font-bold text-emerald-600">{projects.filter(p => p.status === 'active').length}</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Завершенные</div>
            <div className="text-2xl font-bold text-blue-600">{projects.filter(p => p.status === 'completed').length}</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Средний бюджет</div>
            <div className="text-2xl font-bold text-purple-600">
              €{(projects.reduce((sum, p) => sum + parseFloat(p.budget.replace('€', '').replace('M', '')), 0) / projects.length).toFixed(1)}M
            </div>
          </div>
        </motion.div>

        {/* Список проектов */}
        <div className="space-y-6">
          <AnimatePresence>
            {filteredProjects.length > 0 ? (
              filteredProjects.slice(0, visibleProjects).map(project => {
                const statusConfig = getStatusConfig(project.status);
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, type: 'spring', stiffness: 100 }}
                    className={`rounded-2xl overflow-hidden ${
                      expandedProject === project.id 
                        ? 'ring-2 ring-indigo-500 shadow-xl' 
                        : 'shadow-lg hover:shadow-xl'
                    } bg-white/90 backdrop-blur-sm transition-all`}
                  >
                    <motion.div 
                      className="cursor-pointer"
                      onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                    >
                      <div className="relative">
                        {/* Фоновое изображение проекта */}
                        <div className="h-48 w-full bg-gradient-to-r from-blue-100 to-indigo-100 overflow-hidden">
                          <img 
                            src={project.image} 
                            alt={project.name} 
                            className="w-full h-full object-cover opacity-70"
                          />
                        </div>
                        
                        {/* Основная информация */}
                        <div className="p-6">
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-4">
                                <span className="text-3xl">{project.flag}</span>
                                <div>
                                  <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 border ${statusConfig.color}`}>
                                      {statusConfig.icon}
                                      {statusConfig.text}
                                    </span>
                                    {project.impact && (
                                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getImpactColor(project.impact)}`}>
                                        {project.impact === 'very-high' && 'Очень высокий'}
                                        {project.impact === 'high' && 'Высокий'}
                                        {project.impact === 'medium' && 'Средний'}
                                        {project.impact === 'low' && 'Низкий'}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              <p className="text-gray-700 mb-4">{project.description}</p>
                              
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center">
                                  <MapPinIcon className="w-4 h-4 mr-2 text-blue-500" />
                                  {project.country}
                                </div>
                                <div className="flex items-center">
                                  <CalendarIcon className="w-4 h-4 mr-2 text-blue-500" />
                                  {project.startDate} — {project.endDate}
                                </div>
                                <div className="flex items-center">
                                  <UsersIcon className="w-4 h-4 mr-2 text-blue-500" />
                                  {project.participants} участников
                                </div>
                                <div className="flex items-center">
                                  <CurrencyEuroIcon className="w-4 h-4 mr-2 text-blue-500" />
                                  {project.budget}
                                </div>
                              </div>
                            </div>
                            
                            <motion.div
                              animate={{ rotate: expandedProject === project.id ? 180 : 0 }}
                              className="text-gray-400 hover:text-indigo-500"
                            >
                              <ChevronDownIcon className="h-6 w-6" />
                            </motion.div>
                          </div>
                          
                          {/* Теги проекта */}
                          <div className="flex flex-wrap gap-2 mt-4">
                            {project.tags.map((tag, index) => (
                              <motion.span
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
                              >
                                #{tag}
                              </motion.span>
                            ))}
                          </div>
                          
                          {project.status !== 'planned' && (
                            <div className="mt-6">
                              <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Прогресс</span>
                                <span>{project.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div 
                                  className={`h-2.5 rounded-full ${
                                    project.progress < 30 ? 'bg-red-400' :
                                    project.progress < 70 ? 'bg-yellow-400' :
                                    'bg-green-500'
                                  }`} 
                                  style={{ width: `${project.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <AnimatePresence>
                        {expandedProject === project.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="px-6 pb-6"
                          >
                            <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div>
                                <h4 className="font-bold text-gray-900 mb-4 flex items-center text-lg">
                                  <UsersIcon className="w-5 h-5 mr-2 text-indigo-600" />
                                  Детали проекта
                                </h4>
                                <ul className="space-y-3 text-gray-700">
                                  <li className="flex justify-between">
                                    <span className="text-gray-600">Бюджет:</span>
                                    <span className="font-medium">{project.budget}</span>
                                  </li>
                                  <li className="flex justify-between">
                                    <span className="text-gray-600">Участники:</span>
                                    <span className="font-medium">{project.participants}</span>
                                  </li>
                                  <li className="flex justify-between">
                                    <span className="text-gray-600">Сроки:</span>
                                    <span className="font-medium">{project.startDate} — {project.endDate}</span>
                                  </li>
                                  <li className="flex justify-between">
                                    <span className="text-gray-600">Страна:</span>
                                    <span className="font-medium">{project.country} {project.flag}</span>
                                  </li>
                                </ul>
                              </div>
                              
                              <div>
                                <h4 className="font-bold text-gray-900 mb-4 flex items-center text-lg">
                                  <ChartBarIcon className="w-5 h-5 mr-2 text-indigo-600" />
                                  {project.results.length > 0 ? 'Достигнутые результаты' : 'Ожидаемые результаты'}
                                </h4>
                                {project.results.length > 0 ? (
                                  <ul className="space-y-3">
                                    {project.results.map((result, index) => (
                                      <motion.li 
                                        key={index} 
                                        className="flex items-start"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                      >
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span className="text-gray-700">{result}</span>
                                      </motion.li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p className="text-gray-500 italic">Результаты будут доступны после реализации проекта</p>
                                )}
                              </div>
                              
                              <div className="md:col-span-2">
                                <h4 className="font-bold text-gray-900 mb-4 flex items-center text-lg">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                                  </svg>
                                  Партнеры проекта
                                </h4>
                                <div className="flex flex-wrap gap-3">
                                  {project.partners.map((partner, index) => (
                                    <motion.div
                                      key={index}
                                      whileHover={{ y: -2 }}
                                      className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-lg border border-blue-100 text-gray-700 shadow-sm"
                                    >
                                      {partner}
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-8 text-center">
                              <motion.a 
                                href={project.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Официальный сайт проекта
                                <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-2" />
                              </motion.a>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-gradient-to-br from-blue-50/50 to-white rounded-2xl border-2 border-dashed border-blue-200/50"
              >
                <div className="max-w-md mx-auto">
                  <GlobeAltIcon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Проекты не найдены</h3>
                  <p className="text-gray-600 mb-6">Попробуйте изменить параметры поиска или фильтрации</p>
                  <motion.button 
                    onClick={resetFilters}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Сбросить фильтры
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {visibleProjects < filteredProjects.length && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button 
              onClick={showMoreProjects}
              className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all overflow-hidden"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <SparklesIcon className="w-5 h-5" />
                Показать еще ({filteredProjects.length - visibleProjects})
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 opacity-0 hover:opacity-100 transition-opacity"></span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InternationalProjects;