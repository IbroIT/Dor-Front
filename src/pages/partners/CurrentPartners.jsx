import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';

const CurrentPartners = () => {
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredPartner, setHoveredPartner] = useState(null);

  useEffect(() => {
    // Имитация загрузки данных
    const fetchPartners = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockPartners = [
          {
            id: 1,
            name: "ТехноКорп",
            logo: "/logos/technocorp.png",
            description: "Стратегический партнер в области инноваций",
            since: 2023,
            projects: "15 совместных проектов",
            website: "https://technocorp.example",
            benefits: "Эксклюзивные условия для клиентов"
          },
          {
            id: 2,
            name: "ГринЭко",
            logo: "/logos/greeneco.png",
            description: "Партнерство в области устойчивого развития",
            since: 2022,
            projects: "Экологические инициативы",
            website: "https://greeneco.example",
            benefits: "Совместные исследования"
          },
          {
            id: 3,
            name: "ФинТех Альянс",
            logo: "/logos/fintech-alliance.png",
            description: "Финансовые технологии и цифровизация",
            since: 2024,
            projects: "Цифровые платформы",
            website: "https://fintech-alliance.example",
            benefits: "Доступ к инновационным решениям"
          },
          {
            id: 4,
            name: "БиоМед",
            logo: "/logos/biomed.png",
            description: "Медицинские технологии и исследования",
            since: 2021,
            projects: "Разработка медоборудования",
            website: "https://biomed.example",
            benefits: "Совместные лаборатории"
          },
          {
            id: 5,
            name: "КосмосСтрой",
            logo: "/logos/cosmostroy.png",
            description: "Инфраструктурные проекты",
            since: 2023,
            projects: "Крупные строительные объекты",
            website: "https://cosmostroy.example",
            benefits: "Технологическое партнерство"
          },
          {
            id: 6,
            name: "АгроТех Групп",
            logo: "/logos/agrotech-group.png",
            description: "Сельскохозяйственные инновации",
            since: 2020,
            projects: "Умные фермы",
            website: "https://agrotech.example",
            benefits: "Пилотные программы"
          }
        ];
        
        setPartners(mockPartners);
      } catch (error) {
        console.error("Ошибка загрузки партнеров:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-blue-800">Наши партнеры</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="border rounded-xl p-4 h-64 bg-gray-50 animate-pulse">
              <div className="bg-gray-200 h-20 w-20 mx-auto rounded-full mb-4"></div>
              <div className="bg-gray-200 h-6 w-3/4 mx-auto mb-3 rounded"></div>
              <div className="bg-gray-200 h-4 w-5/6 mx-auto mb-2 rounded"></div>
              <div className="bg-gray-200 h-4 w-4/6 mx-auto rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-blue-800 mb-2">Наши партнеры</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Мы сотрудничаем с лидерами индустрии для создания инновационных решений
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {partners.map((partner) => (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5 }}
            className="relative"
          >
            <div 
              className={`border rounded-xl p-6 h-full flex flex-col items-center transition-all duration-300 ${hoveredPartner === partner.id ? 'bg-blue-50 border-blue-200 shadow-md' : 'bg-white border-gray-200'}`}
              onMouseEnter={() => setHoveredPartner(partner.id)}
              onMouseLeave={() => setHoveredPartner(null)}
            >
              <div className="relative mb-4">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-20 w-20 object-contain"
                  data-tooltip-id={`partner-${partner.id}`}
                />
                <Tooltip id={`partner-${partner.id}`} place="top">
                  Нажмите для подробностей
                </Tooltip>
              </div>
              
              <h3 className="text-xl font-semibold text-center text-gray-800 mb-1">
                {partner.name}
              </h3>
              
              <p className="text-gray-600 text-center mb-3">
                {partner.description}
              </p>
              
              <div className="mt-auto w-full">
                <div className="flex justify-between text-sm text-gray-500 mb-3">
                  <span>С {partner.since}</span>
                  <span>{partner.projects}</span>
                </div>
                
                {hoveredPartner === partner.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <a 
                      href={partner.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-block mb-2"
                    >
                      Посетить сайт →
                    </a>
                    <p className="text-xs text-gray-500 bg-blue-100 rounded px-2 py-1">
                      {partner.benefits}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {partners.length > 6 && (
        <div className="text-center mt-10">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
            Показать всех партнеров ({partners.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default CurrentPartners;