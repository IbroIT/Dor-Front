import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DocumentTextIcon, EnvelopeOpenIcon, ArrowDownTrayIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const ThankLetters = () => {
  const [letters, setLetters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Имитация загрузки данных
    const fetchLetters = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockLetters = [
          {
            id: 1,
            from: "Министерство экономики РФ",
            fromLogo: "/logos/min-economy.png",
            date: "2025-03-03",
            preview: "Благодарность за значительный вклад в развитие международной торговли и экономического сотрудничества",
            fullText: "Уважаемые коллеги!\n\nВыражаем искреннюю благодарность за ваш весомый вклад в развитие международных торговых отношений. Ваши инициативы и профессиональный подход способствовали укреплению экономических связей и созданию новых возможностей для бизнеса.\n\nОсобо отмечаем ваш проект «Международные торговые мосты», который показал впечатляющие результаты.\n\nС уважением,\nМинистерство экономики РФ",
            fileUrl: "/documents/thanks-letter-1.pdf",
            tags: ["торговля", "экономика"]
          },
          {
            id: 2,
            from: "Ассоциация европейского бизнеса",
            fromLogo: "/logos/european-business.png",
            date: "2025-01-15",
            preview: "Признание за вклад в развитие делового сотрудничества между странами",
            fullText: "Дорогие партнеры!\n\nАссоциация европейского бизнеса высоко оценивает вашу работу по развитию деловых связей между нашими странами. Ваша профессиональная деятельность заслуживает наивысшей оценки.\n\nОсобенно хочется отметить организацию Бизнес-форума 2024, который стал важной площадкой для диалога.\n\nС наилучшими пожеланиями,\nАссоциация европейского бизнеса",
            fileUrl: "/documents/thanks-letter-2.pdf",
            tags: ["бизнес", "сотрудничество"]
          },
          {
            id: 3,
            from: "Фонд развития инноваций",
            fromLogo: "/logos/innovation-fund.png",
            date: "2024-11-28",
            preview: "Благодарность за инновационный подход и технологическое лидерство",
            fullText: "Уважаемая команда!\n\nФонд развития инноваций выражает благодарность за ваш передовой подход и лидерство в области технологических решений. Ваши проекты в сфере искусственного интеллекта и анализа данных задают новые стандарты в отрасли.\n\nЖелаем дальнейших успехов в реализации смелых идей!\n\nС уважением,\nФонд развития инноваций",
            fileUrl: "/documents/thanks-letter-3.pdf",
            tags: ["инновации", "технологии"]
          },
          {
            id: 4,
            from: "Городская администрация",
            fromLogo: "/logos/city-hall.png",
            date: "2024-09-10",
            preview: "Благодарность за вклад в развитие городской инфраструктуры",
            fullText: "Уважаемые партнеры!\n\nАдминистрация города выражает признательность за ваш вклад в модернизацию городской инфраструктуры. Реализованные проекты значительно улучшили качество жизни горожан.\n\nОсобенно отмечаем ваш подход к экологичности и устойчивому развитию.\n\nС благодарностью,\nГородская администрация",
            fileUrl: "/documents/thanks-letter-4.pdf",
            tags: ["инфраструктура", "город"]
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

  const filteredLetters = letters.filter(letter => 
    letter.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    letter.preview.toLowerCase().includes(searchTerm.toLowerCase()) ||
    letter.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  if (isLoading) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Благодарственные письма</h2>
        <div className="space-y-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="h-7 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
              <div className="h-5 bg-gray-100 rounded w-1/2 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-100 rounded w-full mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-100 rounded w-1/3 animate-pulse"></div>
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
          <h2 className="text-3xl font-bold text-gray-800">Благодарственные письма</h2>
          <p className="text-gray-600 mt-2">Признание нашей работы от партнеров и организаций</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Поиск писем..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {filteredLetters.length > 0 ? (
            filteredLetters.map(letter => (
              <motion.div
                key={letter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`border rounded-xl overflow-hidden ${selectedLetter === letter.id ? 'border-indigo-300 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div 
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setSelectedLetter(selectedLetter === letter.id ? null : letter.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                      {letter.fromLogo && (
                        <img 
                          src={letter.fromLogo} 
                          alt={letter.from} 
                          className="h-12 w-12 object-contain rounded-md"
                        />
                      )}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{letter.from}</h3>
                        <div className="flex items-center mt-2 text-gray-500 text-sm">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          {formatDate(letter.date)}
                        </div>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: selectedLetter === letter.id ? 180 : 0 }}
                      className="text-gray-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  </div>
                  
                  <p className="mt-4 text-gray-700">{letter.preview}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {letter.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <AnimatePresence>
                  {selectedLetter === letter.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <div className="border-t pt-6">
                        <div className="flex items-center mb-4 text-gray-800">
                          <DocumentTextIcon className="w-5 h-5 mr-2 text-indigo-500" />
                          <h4 className="font-medium">Полный текст письма:</h4>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-line text-gray-700">
                          {letter.fullText}
                        </div>
                        
                        <div className="mt-6 flex flex-wrap gap-3">
                          <a 
                            href={letter.fileUrl} 
                            download
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                          >
                            <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                            Скачать оригинал
                          </a>
                          <button
                            onClick={() => setSelectedLetter(null)}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <EnvelopeOpenIcon className="w-5 h-5 mr-2" />
                            Свернуть письмо
                          </button>
                        </div>
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
              <EnvelopeOpenIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="text-gray-500 mt-4">Не найдено писем по вашему запросу</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Сбросить поиск
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ThankLetters;