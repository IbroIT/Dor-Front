import { useState } from 'react';

const Certificates = () => {
  const categories = ['Все', 'Лицензии', 'Сертификаты', 'Награды'];
  const [activeCategory, setActiveCategory] = useState('Все');
  
  const certificatesData = [
    {
      id: 1,
      title: "Лицензия на торговую деятельность",
      issuer: "Министерство экономики КР",
      date: "15.03.2022",
      category: "Лицензии",
      description: "Официальное разрешение на осуществление оптовой и розничной торговли на территории Кыргызской Республики",
      image: "/certs/trade-license.jpg"
    },
    {
      id: 2,
      title: "Сертификат соответствия ГОСТ",
      issuer: "Национальный институт стандартов",
      date: "22.07.2021",
      category: "Сертификаты",
      description: "Подтверждение соответствия продукции международным стандартам качества и безопасности",
      image: "/certs/gost-certificate.jpg"
    },
    {
      id: 3,
      title: "Лучший работодатель года",
      issuer: "Ассоциация предприятий Кыргызстана",
      date: "10.12.2020",
      category: "Награды",
      description: "Награда за создание лучших условий труда и социальную ответственность бизнеса",
      image: "/certs/best-employer.jpg"
    },
    {
      id: 4,
      title: "Экологический сертификат",
      issuer: "Министерство природных ресурсов",
      date: "30.05.2023",
      category: "Сертификаты",
      description: "Сертификация экологичных производственных процессов и устойчивого развития",
      image: "/certs/eco-cert.jpg"
    },
    {
      id: 5,
      title: "Лицензия на импорт/экспорт",
      issuer: "Таможенная служба КР",
      date: "18.09.2022",
      category: "Лицензии",
      description: "Разрешение на осуществление международных торговых операций",
      image: "/certs/import-export.jpg"
    },
    {
      id: 6,
      title: "Золотой партнер",
      issuer: "Международная торговая палата",
      date: "05.11.2023",
      category: "Награды",
      description: "Признание за вклад в развитие международных торговых отношений",
      image: "/certs/gold-partner.jpg"
    }
  ];

  const [selectedCert, setSelectedCert] = useState(null);
  
  const filteredCerts = activeCategory === 'Все' 
    ? certificatesData 
    : certificatesData.filter(cert => cert.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Шапка */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Сертификаты и лицензии</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Документальное подтверждение качества, соответствия стандартам и профессиональных достижений
          Торговой Ассоциации "Дордой"
        </p>
      </div>

      {/* Фильтры */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 text-sm font-medium rounded-md ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border'
              } transition-colors duration-200`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Сетка сертификатов */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCerts.map((cert) => (
          <div 
            key={cert.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => setSelectedCert(cert)}
          >
            <div className="p-5">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-900">{cert.title}</h3>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {cert.category}
                </span>
              </div>
              <p className="mt-2 text-gray-600 text-sm">{cert.issuer}</p>
              <p className="mt-1 text-gray-400 text-sm">{cert.date}</p>
              <p className="mt-3 text-gray-700">{cert.description}</p>
            </div>
            <div className="bg-gray-200 border-t p-4 flex justify-center">
              <div className="bg-gray-300 border-2 border-dashed rounded-xl w-16 h-16" />
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно */}
      {selectedCert && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-gray-900">{selectedCert.title}</h2>
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="text-gray-400 hover:text-gray-500 text-2xl"
                >
                  &times;
                </button>
              </div>
              
              <div className="mt-4 flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                  <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center">
                    <div className="bg-gray-300 border-2 border-dashed rounded-xl w-48 h-64" />
                  </div>
                </div>
                
                <div className="md:w-1/2">
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500">Организация</h3>
                    <p className="text-lg">{selectedCert.issuer}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500">Дата выдачи</h3>
                    <p className="text-lg">{selectedCert.date}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500">Категория</h3>
                    <p className="text-lg">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {selectedCert.category}
                      </span>
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Описание</h3>
                    <p className="text-gray-700 mt-1">{selectedCert.description}</p>
                  </div>
                  
                  <button className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Скачать PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Информационный блок */}
      <div className="max-w-4xl mx-auto mt-20 bg-blue-50 rounded-2xl p-8 border border-blue-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Наши стандарты качества</h2>
        <p className="text-gray-700 mb-4">
          Торговая Ассоциация "Дордой" строго соблюдает все требования законодательства и международных стандартов.
          Наши сертификаты подтверждают:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 text-blue-600 mt-0.5">✓</div>
            <p className="ml-3 text-gray-700">Соответствие продукции международным нормам</p>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 text-blue-600 mt-0.5">✓</div>
            <p className="ml-3 text-gray-700">Прозрачность ведения бизнеса</p>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 text-blue-600 mt-0.5">✓</div>
            <p className="ml-3 text-gray-700">Соблюдение экологических стандартов</p>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 text-blue-600 mt-0.5">✓</div>
            <p className="ml-3 text-gray-700">Высокие стандарты трудовых отношений</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Certificates;