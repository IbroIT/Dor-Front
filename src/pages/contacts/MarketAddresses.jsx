import React, { useState } from 'react';

const DordoiAssociation = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const markets = [
    {
      id: 1,
      name: 'Рынок Дордой',
      address: 'г. Бишкек, ул. Луговая, 1',
      phone: '+996 312 54 12 34',
      hours: '08:00 - 18:00',
      type: 'market',
      description: 'Крупнейший вещевой рынок в Центральной Азии',
      detailedDescription: 'Рынок "Дордой" - это огромный торговый комплекс, занимающий территорию более 100 гектаров. Здесь представлены тысячи магазинов и торговых точек, предлагающих одежду, обувь, текстиль, товары для дома и многое другое. Рынок является важным торговым узлом для всего региона.',
      image: 'https://via.placeholder.com/800x400?text=Дордой',
      website: 'https://dordoi.kg',
      email: 'info@dordoi.kg',
      area: '100 га',
      year: '1992'
    },
    {
      id: 2,
      name: 'Рынок Мадина',
      address: 'г. Бишкек, ул. Московская, 205',
      phone: '+996 312 56 78 90',
      hours: '07:00 - 19:00',
      type: 'market',
      description: 'Популярный рынок электроники и бытовой техники',
      detailedDescription: 'Рынок "Мадина" специализируется на электронике, бытовой технике и компьютерных комплектующих. Здесь можно найти как новые товары известных брендов, так и б/у технику по доступным ценам. Рынок состоит из нескольких корпусов с разными категориями товаров.',
      image: 'https://via.placeholder.com/800x400?text=Мадина',
      website: 'https://madina-market.kg',
      email: 'contact@madina-market.kg',
      area: '15 га',
      year: '1995'
    },
    {
      id: 3,
      name: 'Рынок Аламедин',
      address: 'г. Бишкек, ул. Аламединская, 45',
      phone: '+996 312 34 56 78',
      hours: '08:00 - 17:00',
      type: 'market',
      description: 'Строительные материалы и товары для дома',
      detailedDescription: 'Аламединский рынок - это место, где можно найти все для строительства и ремонта: от гвоздей до сантехники и отделочных материалов. Рынок разделен на секции по категориям товаров, что облегчает поиск нужных материалов.',
      image: 'https://via.placeholder.com/800x400?text=Аламедин',
      website: 'https://alamedin-market.kg',
      email: 'sales@alamedin-market.kg',
      area: '30 га',
      year: '1998'
    },
    {
      id: 4,
      name: 'Дордой Моторс',
      address: 'г. Бишкек, ул. Автомобильная, 12',
      phone: '+996 312 98 76 54',
      hours: '09:00 - 18:00',
      type: 'motors',
      description: 'Авторынок с большим выбором автомобилей и запчастей',
      detailedDescription: 'Дордой Моторс - это крупнейший авторынок в Кыргызстане, где представлены как новые, так и подержанные автомобили всех марок. Также здесь можно найти автозапчасти, аксессуары и услуги по ремонту. Рынок имеет собственную сервисную зону и зону для оформления документов.',
      image: 'https://via.placeholder.com/800x400?text=Дордой+Моторс',
      website: 'https://dordoi-motors.kg',
      email: 'auto@dordoi-motors.kg',
      area: '50 га',
      year: '2005'
    },
    {
      id: 5,
      name: 'ТЦ Дордой Плаза',
      address: 'г. Бишкек, ул. Луговая, 3',
      phone: '+996 312 12 34 56',
      hours: '10:00 - 22:00',
      type: 'mall',
      description: 'Современный торговый центр с бутиками и ресторанами',
      detailedDescription: 'Дордой Плаза - это современный торгово-развлекательный комплекс с европейским уровнем сервиса. Здесь расположены бутики известных брендов, кинотеатр, фудкорт и рестораны, детская зона и паркинг. Центр регулярно проводит мероприятия и акции.',
      image: 'https://via.placeholder.com/800x400?text=Дордой+Плаза',
      website: 'https://dordoi-plaza.kg',
      email: 'plaza@dordoi.kg',
      area: '8 га',
      year: '2018'
    }
  ];

  const filteredMarkets = markets.filter(market => {
    const matchesSearch = market.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         market.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || market.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const openModal = (market) => {
    setSelectedMarket(market);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto'; // Восстанавливаем скролл страницы
  };

  return (
    <div className="min-h-screen bg-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Ассоциация "Дордой"</h1>
          <p className="text-xl text-blue-600">Торговые центры и рынки Бишкека</p>
        </div>

        {/* Поиск и фильтры */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Поиск по названию или адресу..."
                className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
              >
                Все
              </button>
              <button
                onClick={() => setActiveTab('market')}
                className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'market' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
              >
                Рынки
              </button>
              <button
                onClick={() => setActiveTab('motors')}
                className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'motors' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
              >
                Авторынок
              </button>
              <button
                onClick={() => setActiveTab('mall')}
                className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'mall' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
              >
                Торговый центр
              </button>
            </div>
          </div>
        </div>

        {/* Карточки рынков */}
        {filteredMarkets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMarkets.map((market) => (
              <div key={market.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img
                    src={market.image}
                    alt={market.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-blue-800">{market.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      market.type === 'market' ? 'bg-blue-100 text-blue-800' :
                      market.type === 'motors' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-200 text-blue-800'
                    }`}>
                      {market.type === 'market' ? 'Рынок' : 
                       market.type === 'motors' ? 'Авторынок' : 'Торговый центр'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{market.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-blue-600">{market.address}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-blue-600">{market.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-blue-600">Часы работы: {market.hours}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => openModal(market)}
                    className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
                  >
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Подробнее
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <svg className="h-16 w-16 text-blue-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-blue-800 mb-2">Ничего не найдено</h3>
            <p className="text-blue-600">Попробуйте изменить параметры поиска или фильтры</p>
          </div>
        )}

        {/* Модальное окно */}
        {isModalOpen && selectedMarket && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              {/* Фон */}
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeModal}></div>
              </div>

              {/* Контент модального окна */}
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <div className="flex justify-between items-start">
                        <h3 className="text-2xl leading-6 font-bold text-blue-800 mb-4">
                          {selectedMarket.name}
                        </h3>
                        <button
                          onClick={closeModal}
                          className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="mb-6">
                        <img src={selectedMarket.image} alt={selectedMarket.name} className="w-full h-64 object-cover rounded-lg" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-blue-700 mb-2">Основная информация</h4>
                          <p className="text-gray-600 mb-4">{selectedMarket.detailedDescription}</p>
                          
                          <div className="space-y-3">
                            <div className="flex items-start">
                              <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className="text-blue-600">{selectedMarket.address}</span>
                            </div>
                            
                            <div className="flex items-start">
                              <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              <span className="text-blue-600">{selectedMarket.phone}</span>
                            </div>
                            
                            <div className="flex items-start">
                              <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <span className="text-blue-600">{selectedMarket.email}</span>
                            </div>
                            
                            <div className="flex items-start">
                              <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                              </svg>
                              <a href={selectedMarket.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                {selectedMarket.website}
                              </a>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-semibold text-blue-700 mb-2">Дополнительные сведения</h4>
                          
                          <div className="bg-blue-50 rounded-lg p-4 mb-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-blue-500">Часы работы:</p>
                                <p className="font-medium text-blue-800">{selectedMarket.hours}</p>
                              </div>
                              <div>
                                <p className="text-sm text-blue-500">Год открытия:</p>
                                <p className="font-medium text-blue-800">{selectedMarket.year}</p>
                              </div>
                              <div>
                                <p className="text-sm text-blue-500">Площадь:</p>
                                <p className="font-medium text-blue-800">{selectedMarket.area}</p>
                              </div>
                              <div>
                                <p className="text-sm text-blue-500">Тип:</p>
                                <p className="font-medium text-blue-800">
                                  {selectedMarket.type === 'market' ? 'Рынок' : 
                                   selectedMarket.type === 'motors' ? 'Авторынок' : 'Торговый центр'}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                            <h5 className="font-semibold text-yellow-800 mb-2">Как добраться?</h5>
                            <p className="text-yellow-700 text-sm">
                              Рынок расположен в удобной транспортной доступности. Можно доехать на маршрутных такси № 123, 45, 67. 
                              Имеется парковка для личного транспорта.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={closeModal}
                  >
                    Закрыть
                  </button>
                  <a
                    href={selectedMarket.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Перейти на сайт
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Футер */}
        <div className="mt-12 pt-6 border-t border-blue-200 text-center">
          <p className="text-blue-600">© {new Date().getFullYear()} Ассоциация "Дордой". Все права защищены.</p>
        </div>
      </div>
    </div>
  );
};

export default DordoiAssociation;