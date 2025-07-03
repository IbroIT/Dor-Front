import React, { useState } from 'react';

const Statute = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedDoc, setSelectedDoc] = useState(null);
  
  // Категории документов
  const categories = [
    { id: 'all', name: 'Все документы' },
    { id: 'charter', name: 'Уставные документы' },
    { id: 'regulations', name: 'Внутренние положения' },
    { id: 'rules', name: 'Регламенты' },
    { id: 'policies', name: 'Политики' },
  ];
  
  // Документы
  const documents = [
    {
      id: 1,
      title: "Устав Торговой Ассоциации 'Дордой'",
      category: "charter",
      date: "15.01.2023",
      description: "Основной документ, определяющий цели, задачи, структуру и принципы деятельности ассоциации",
      fileSize: "2.4 МБ",
      pages: 24
    },
    {
      id: 2,
      title: "Положение о членстве",
      category: "regulations",
      date: "22.03.2023",
      description: "Правила вступления в ассоциацию, права и обязанности членов, процедуры выхода",
      fileSize: "1.1 МБ",
      pages: 12
    },
    {
      id: 3,
      title: "Регламент торговой деятельности",
      category: "rules",
      date: "30.04.2023",
      description: "Правила ведения торговых операций на территории ассоциации",
      fileSize: "1.8 МБ",
      pages: 18
    },
    {
      id: 4,
      title: "Политика конфиденциальности",
      category: "policies",
      date: "10.05.2023",
      description: "Правила обработки персональных данных сотрудников и партнеров",
      fileSize: "0.9 МБ",
      pages: 8
    },
    {
      id: 5,
      title: "Положение о правлении",
      category: "regulations",
      date: "18.06.2023",
      description: "Правила формирования и деятельности правления ассоциации",
      fileSize: "1.5 МБ",
      pages: 14
    },
    {
      id: 6,
      title: "Ревизионный регламент",
      category: "rules",
      date: "05.07.2023",
      description: "Порядок проведения финансовых проверок и аудита",
      fileSize: "1.2 МБ",
      pages: 10
    },
    {
      id: 7,
      title: "Положение о реорганизации",
      category: "charter",
      date: "22.08.2023",
      description: "Процедуры слияния, присоединения и других форм реорганизации",
      fileSize: "1.7 МБ",
      pages: 16
    },
    {
      id: 8,
      title: "Антикоррупционная политика",
      category: "policies",
      date: "12.09.2023",
      description: "Меры по предотвращению коррупционных проявлений в деятельности ассоциации",
      fileSize: "1.3 МБ",
      pages: 11
    }
  ];
  
  const filteredDocuments = activeTab === 'all' 
    ? documents 
    : documents.filter(doc => doc.category === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Шапка страницы */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Устав и внутренние положения</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Основополагающие документы, регулирующие деятельность Торговой Ассоциации "Дордой"
          </p>
        </div>
        
        {/* Информационный блок */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 border border-blue-200">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Нормативная база деятельности</h2>
              <p className="text-gray-700 mb-4">
                Уставные документы и внутренние положения Торговой Ассоциации "Дордой" определяют правовые основы, 
                структуру управления и принципы функционирования организации в соответствии с законодательством 
                Кыргызской Республики и международными стандартами.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Прозрачность</h3>
                    <p className="text-sm text-gray-600">Все документы доступны для ознакомления</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Актуальность</h3>
                    <p className="text-sm text-gray-600">Регулярное обновление нормативной базы</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="bg-blue-600 text-white rounded-xl p-8 w-full max-w-xs">
                <h3 className="font-bold text-xl mb-3">Важно знать</h3>
                <p className="text-blue-100 mb-4">
                  Все члены ассоциации обязаны соблюдать положения устава и внутренних документов
                </p>
                <div className="flex items-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Действующая редакция</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Фильтры по категориям */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-5 py-2.5 rounded-full transition-all duration-300 ${
                activeTab === category.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Список документов */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDocuments.map(doc => (
            <div 
              key={doc.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full mb-2">
                      {categories.find(c => c.id === doc.category)?.name}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{doc.title}</h3>
                  </div>
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex-shrink-0 ml-4" />
                </div>
                
                <p className="text-gray-600 mb-4">{doc.description}</p>
                
                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                  <div className="text-sm text-gray-500">
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {doc.date}
                    </span>
                    <span className="flex items-center mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {doc.pages} страниц
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                      onClick={() => setSelectedDoc(doc)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Просмотр
                    </button>
                    <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Скачать
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Модальное окно просмотра документа */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-block px-3 py-1 text-sm font-semibold bg-blue-100 text-blue-800 rounded-full mb-2">
                    {categories.find(c => c.id === selectedDoc.category)?.name}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedDoc.title}</h2>
                </div>
                <button 
                  onClick={() => setSelectedDoc(null)}
                  className="text-gray-400 hover:text-gray-500 text-3xl"
                >
                  &times;
                </button>
              </div>
              
              <div className="mt-6 flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="bg-gray-100 rounded-lg p-6">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center mb-6">
                      <span className="text-gray-500">Предпросмотр документа</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Дата принятия</h3>
                        <p className="text-lg">{selectedDoc.date}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Объем документа</h3>
                        <p className="text-lg">{selectedDoc.pages} страниц • {selectedDoc.fileSize}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Статус</h3>
                        <p className="text-lg font-medium text-green-600">Действующая редакция</p>
                      </div>
                      
                      <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center mt-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Скачать документ (PDF)
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Описание документа</h3>
                  <p className="text-gray-700 mb-6">{selectedDoc.description}</p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Основные разделы</h3>
                  <div className="bg-blue-50 rounded-xl p-6">
                    <ul className="space-y-3">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <li key={item} className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mt-0.5">
                            {item}
                          </div>
                          <p className="ml-3 text-gray-700">Основные положения и терминология</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <div className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <p className="text-yellow-700">
                        Для членов ассоциации обязательно ознакомление со всеми положениями устава и внутренних документов. 
                        Несоблюдение установленных правил может повлечь применение санкций согласно регламенту.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Футер */}
      <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Торговая Ассоциация "Дордой"</h3>
            <p className="text-gray-600">Нормативно-правовая документация</p>
          </div>
          <div className="flex gap-4">
            <button className="text-blue-600 hover:text-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              </svg>
            </button>
            <button className="text-blue-600 hover:text-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </button>
            <button className="text-blue-600 hover:text-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </button>
          </div>
        </div>
        <p className="text-center text-gray-500 text-sm mt-8">© {new Date().getFullYear()} Торговая Ассоциация "Дордой". Все права защищены.</p>
      </div>
    </div>
  );
};

export default Statute;