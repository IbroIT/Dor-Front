import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DocumentTextIcon, 
  EnvelopeOpenIcon, 
  ArrowDownTrayIcon, 
  MagnifyingGlassIcon,
  CalendarIcon,
  XMarkIcon,
  ChevronDownIcon,
  StarIcon,
  TrophyIcon,
  LightBulbIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

const ThankLetters = () => {
  const [letters, setLetters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState(null);
  const [isHovered, setIsHovered] = useState(null);

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        // Эффект загрузки с прогресс-баром
        await new Promise(resolve => {
          const interval = setInterval(() => {
            const progress = document.getElementById('loading-progress');
            if (progress) {
              const currentWidth = parseFloat(progress.style.width) || 0;
              if (currentWidth >= 100) {
                clearInterval(interval);
                resolve();
              } else {
                progress.style.width = `${currentWidth + 10}%`;
              }
            }
          }, 100);
        });
        
        const mockLetters = [
          {
            id: 1,
            from: "Министерство экономики РФ",
            fromLogo: "/logos/min-economy.png",
            date: "2025-03-03",
            preview: "Благодарность за значительный вклад в развитие международной торговли и экономического сотрудничества",
            fullText: "Уважаемые коллеги!\n\nВыражаем искреннюю благодарность за ваш весомый вклад в развитие международных торговых отношений. Ваши инициативы и профессиональный подход способствовали укреплению экономических связей и созданию новых возможностей для бизнеса.\n\nОсобо отмечаем ваш проект «Международные торговые мосты», который показал впечатляющие результаты.\n\nС уважением,\nМинистерство экономики РФ",
            fileUrl: "/documents/thanks-letter-1.pdf",
            tags: ["торговля", "экономика"],
            highlight: true,
            icon: <TrophyIcon className="h-6 w-6 text-yellow-500" />
          },
          {
            id: 2,
            from: "Ассоциация европейского бизнеса",
            fromLogo: "/logos/european-business.png",
            date: "2025-01-15",
            preview: "Признание за вклад в развитие делового сотрудничества между странами",
            fullText: "Дорогие партнеры!\n\nАссоциация европейского бизнеса высоко оценивает вашу работу по развитию деловых связей между нашими странами. Ваша профессиональная деятельность заслуживает наивысшей оценки.\n\nОсобенно хочется отметить организацию Бизнес-форума 2024, который стал важной площадкой для диалога.\n\nС наилучшими пожеланиями,\nАссоциация европейского бизнеса",
            fileUrl: "/documents/thanks-letter-2.pdf",
            tags: ["бизнес", "сотрудничество"],
            icon: <StarIcon className="h-6 w-6 text-blue-500" />
          },
          {
            id: 3,
            from: "Фонд развития инноваций",
            fromLogo: "/logos/innovation-fund.png",
            date: "2024-11-28",
            preview: "Благодарность за инновационный подход и технологическое лидерство",
            fullText: "Уважаемая команда!\n\nФонд развития инноваций выражает благодарность за ваш передовой подход и лидерство в области технологических решений. Ваши проекты в сфере искусственного интеллекта и анализа данных задают новые стандарты в отрасли.\n\nЖелаем дальнейших успехов в реализации смелых идей!\n\nС уважением,\nФонд развития инноваций",
            fileUrl: "/documents/thanks-letter-3.pdf",
            tags: ["инновации", "технологии"],
            icon: <LightBulbIcon className="h-6 w-6 text-purple-500" />
          },
          {
            id: 4,
            from: "Городская администрация",
            fromLogo: "/logos/city-hall.png",
            date: "2024-09-10",
            preview: "Благодарность за вклад в развитие городской инфраструктуры",
            fullText: "Уважаемые партнеры!\n\nАдминистрация города выражает признательность за ваш вклад в модернизацию городской инфраструктуры. Реализованные проекты значительно улучшили качество жизни горожан.\n\nОсобенно отмечаем ваш подход к экологичности и устойчивому развитию.\n\nС благодарностью,\nГородская администрация",
            fileUrl: "/documents/thanks-letter-4.pdf",
            tags: ["инфраструктура", "город"],
            icon: <BuildingOfficeIcon className="h-6 w-6 text-green-500" />
          }
        ];
        
        setLetters(mockLetters);
      } catch (error) {
        console.error("Ошибка загрузки писем:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLetters();
  }, []);

  const allTags = [...new Set(letters.flatMap(letter => letter.tags))];

  const filteredLetters = letters.filter(letter => 
    (letter.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    letter.preview.toLowerCase().includes(searchTerm.toLowerCase()) ||
    letter.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (activeTag ? letter.tags.includes(activeTag) : true)
  );

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setActiveTag(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 p-8 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white/10 backdrop-blur-md p-12 rounded-3xl shadow-2xl border border-white/20 text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="mx-auto w-20 h-20 mb-8"
          >
            <EnvelopeOpenIcon className="h-full w-full text-white/80" />
          </motion.div>
          
          <h2 className="text-4xl font-bold text-white mb-4">Загрузка благодарностей</h2>
          <p className="text-white/80 mb-6">Собираем все признания вашей работы...</p>
          
          <div className="w-full bg-white/20 rounded-full h-3 mb-2">
            <div 
              id="loading-progress"
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: '0%' }}
            ></div>
          </div>
          <p className="text-white/60 text-sm">Подготовка данных...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        {/* Анимированный заголовок */}
        <div className="relative mb-12">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="absolute bottom-0 left-0 h-1 bg-yellow-400 rounded-full"
          />
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 pb-4">
            <div>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-4xl md:text-5xl font-bold text-white"
              >
                Благодарственные <span className="text-yellow-400">письма</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-blue-200 mt-2 text-lg"
              >
                Признание наших достижений от ведущих организаций
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="relative w-full md:w-96"
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-blue-300" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-blue-400/30 rounded-xl bg-blue-900/50 backdrop-blur-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-white placeholder-blue-300 transition-all"
                placeholder="Найти благодарность..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <XMarkIcon className="h-5 w-5 text-blue-300 hover:text-white transition-colors" />
                </button>
              )}
            </motion.div>
          </div>
        </div>

        {/* Фильтры по тегам */}
        {allTags.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mb-10"
          >
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTag(null)}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 ${!activeTag ? 'bg-yellow-500 text-blue-900 shadow-lg' : 'bg-blue-800/50 text-white border border-blue-600 hover:bg-blue-700/50 shadow-md'}`}
              >
                <span>Все письма</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {letters.length}
                </span>
              </motion.button>
              
              {allTags.map(tag => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`px-5 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 ${activeTag === tag ? 'bg-white text-blue-900 shadow-lg' : 'bg-blue-800/50 text-white border border-blue-600 hover:bg-blue-700/50 shadow-md'}`}
                >
                  #{tag}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {filteredLetters.length > 0 ? (
              filteredLetters.map(letter => (
                <motion.div
                  key={letter.id}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  whileHover={{ y: -5 }}
                  className={`relative rounded-2xl overflow-hidden backdrop-blur-sm ${letter.highlight ? 'ring-2 ring-yellow-400' : ''} ${selectedLetter === letter.id ? 'bg-white/10 border border-white/20' : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'}`}
                  onMouseEnter={() => setIsHovered(letter.id)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  {/* Эффект свечения при наведении */}
                  {isHovered === letter.id && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                      className="absolute inset-0 bg-yellow-400 rounded-2xl blur-xl -z-10"
                    />
                  )}
                  
                  <div 
                    className={`p-6 cursor-pointer transition-all ${selectedLetter === letter.id ? 'pb-2' : ''}`}
                    onClick={() => setSelectedLetter(selectedLetter === letter.id ? null : letter.id)}
                  >
                    <div className="flex justify-between items-start gap-6">
                      <div className="flex items-start gap-6">
                        {letter.fromLogo ? (
                          <motion.div 
                            className="relative"
                            whileHover={{ scale: 1.1 }}
                          >
                            <motion.img 
                              src={letter.fromLogo} 
                              alt={letter.from} 
                              className="h-16 w-16 object-contain rounded-xl bg-white p-2 shadow-md"
                            />
                            {letter.highlight && (
                              <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                                className="absolute -top-2 -right-2"
                              >
                                <div className="bg-yellow-400 rounded-full p-1 shadow-lg">
                                  <StarIcon className="h-4 w-4 text-blue-900" />
                                </div>
                              </motion.div>
                            )}
                          </motion.div>
                        ) : (
                          <motion.div 
                            className="h-16 w-16 bg-blue-800/50 rounded-xl flex items-center justify-center shadow-md border border-white/10"
                            whileHover={{ scale: 1.1 }}
                          >
                            {letter.icon || <EnvelopeOpenIcon className="h-8 w-8 text-white" />}
                          </motion.div>
                        )}
                        
                        <div>
                          <h3 className="text-xl font-bold text-white">{letter.from}</h3>
                          <div className="flex items-center mt-2 text-blue-200 text-sm">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {formatDate(letter.date)}
                          </div>
                        </div>
                      </div>
                      
                      <motion.div
                        animate={{ 
                          rotate: selectedLetter === letter.id ? 180 : 0,
                          scale: isHovered === letter.id ? 1.2 : 1
                        }}
                        className="text-blue-300"
                      >
                        <ChevronDownIcon className="h-6 w-6" />
                      </motion.div>
                    </div>
                    
                    <p className="mt-4 text-blue-100">{letter.preview}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-5">
                      {letter.tags.map((tag, index) => (
                        <motion.span 
                          key={index}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium ${activeTag === tag ? 'bg-yellow-400 text-blue-900 shadow-md' : 'bg-blue-800/70 text-white border border-blue-600 hover:bg-blue-700'}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTag(activeTag === tag ? null : tag);
                          }}
                        >
                          #{tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence>
                    {selectedLetter === letter.id && (
                      <motion.div
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="px-6 pb-6"
                      >
                        <div className="border-t border-white/20 pt-6">
                          <div className="flex items-center mb-5 text-white">
                            <DocumentTextIcon className="w-6 h-6 mr-3 text-yellow-400" />
                            <h4 className="font-bold text-xl">Полный текст письма:</h4>
                          </div>
                          
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-blue-900/30 p-6 rounded-xl whitespace-pre-line text-blue-50 border border-white/10 backdrop-blur-sm shadow-inner"
                          >
                            {letter.fullText}
                          </motion.div>
                          
                          <motion.div 
                            className="mt-8 flex flex-wrap gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <motion.a 
                              href={letter.fileUrl} 
                              download
                              whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(234, 179, 8, 0.4)" }}
                              whileTap={{ scale: 0.95 }}
                              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-900 rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg font-bold"
                            >
                              <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                              Скачать оригинал
                            </motion.a>
                            
                            <motion.button
                              onClick={() => setSelectedLetter(null)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="inline-flex items-center px-6 py-3 border border-white/20 bg-blue-800/50 text-white rounded-xl hover:bg-blue-700/50 transition-all font-medium"
                            >
                              <EnvelopeOpenIcon className="w-5 h-5 mr-2" />
                              Свернуть письмо
                            </motion.button>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-20 bg-blue-900/30 rounded-2xl shadow-inner border-2 border-dashed border-white/20 backdrop-blur-sm"
              >
                <motion.div
                  animate={{ 
                    y: [-5, 5, -5],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  <EnvelopeOpenIcon className="mx-auto h-20 w-20 text-white/50" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mt-6">Благодарности не найдены</h3>
                <p className="text-blue-200 mt-3 mb-8 max-w-md mx-auto">
                  {searchTerm || activeTag 
                    ? "Попробуйте изменить параметры поиска или сбросить фильтры" 
                    : "Кажется, у нас пока нет благодарностей по выбранным критериям"}
                </p>
                
                <motion.button 
                  onClick={resetFilters}
                  whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(255, 255, 255, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg font-medium"
                >
                  Сбросить фильтры
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ThankLetters;