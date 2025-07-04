import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Cooperation = () => {
  const [cooperations, setCooperations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    // Имитация загрузки данных из API
    const fetchData = async () => {
      try {
        // В реальном приложении здесь был бы fetch запрос
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockData = [
          {
            id: 1,
            title: "Соглашение о стратегическом партнерстве",
            partner: "Ассоциация предпринимателей",
            date: "12 мая 2025",
            description: "Совместные проекты в области развития предпринимательства и инноваций",
            logo: "business-association.png"
          },
          {
            id: 2,
            title: "Меморандум о взаимопонимании",
            partner: "Технологический университет",
            date: "28 июня 2025",
            description: "Сотрудничество в области научных исследований и подготовки кадров",
            logo: "tech-university.png"
          },
          {
            id: 3,
            title: "Соглашение о совместной деятельности",
            partner: "Экологическая организация 'Зеленый мир'",
            date: "15 апреля 2025",
            description: "Реализация проектов по устойчивому развитию и экологическому просвещению",
            logo: "green-world.png"
          }
        ];
        
        setCooperations(mockData);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Партнерство и сотрудничество</h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-100 rounded w-1/2 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-indigo-700">Партнерство и сотрудничество</h2>
      
      <div className="space-y-6">
        <AnimatePresence>
          {cooperations.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-b border-gray-100 pb-6 last:border-b-0"
            >
              <div 
                className="flex justify-between items-start cursor-pointer"
                onClick={() => toggleExpand(item.id)}
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center mt-2">
                    {item.logo && (
                      <img 
                        src={`/logos/${item.logo}`} 
                        alt={item.partner} 
                        className="w-8 h-8 mr-3 object-contain"
                      />
                    )}
                    <p className="text-gray-600">С партнером: <span className="font-medium">{item.partner}</span></p>
                  </div>
                  <p className="text-gray-500 mt-1">Дата подписания: {item.date}</p>
                </div>
                <motion.div
                  animate={{ rotate: expandedId === item.id ? 180 : 0 }}
                  className="text-gray-400 text-2xl"
                >
                  ▼
                </motion.div>
              </div>

              {expandedId === item.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pl-2 border-l-4 border-indigo-200"
                >
                  <p className="text-gray-700">{item.description}</p>
                  <button className="mt-3 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors">
                    Подробнее о сотрудничестве
                  </button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {cooperations.length === 0 && !isLoading && (
        <div className="text-center py-8">
          <p className="text-gray-500">На данный момент нет активных соглашений о сотрудничестве</p>
          <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
            Стать партнером
          </button>
        </div>
      )}
    </div>
  );
};

export default Cooperation;