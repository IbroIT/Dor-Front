import React, { useState } from 'react';

const ContactPage = () => {
  const [activeTab, setActiveTab] = useState('markets');

  const contactsData = {
    markets: [
      {
        name: 'Дордой (основной)',
        phone: '+996 (312) 54-19-41',
        email: 'info@dordoi.kg',
        address: 'г. Бишкек, ул. Кулатова 3'
      },
      {
        name: 'Аламедин',
        phone: '+996 (312) 54-12-34',
        email: 'alamedin@dordoi.kg',
        address: 'г. Бишкек, ул. Аламедин 1'
      },
      {
        name: 'Мадина',
        phone: '+996 (312) 54-56-78',
        email: 'madina@dordoi.kg',
        address: 'г. Бишкек, ул. Мадина 2'
      }
    ],
    motors: [
      {
        name: 'Дордой Моторс',
        phone: '+996 (312) 54-90-12',
        email: 'motors@dordoi.kg',
        address: 'г. Бишкек, ул. Автомобильная 5'
      }
    ],
    plaza: [
      {
        name: 'ТЦ Дордой Плаза',
        phone: '+996 (312) 54-33-45',
        email: 'plaza@dordoi.kg',
        address: 'г. Бишкек, ул. Кулатова 8'
      }
    ],
    universities: [
      {
        name: 'Салымбеков Университет',
        phone: '+996 (312) 54-67-89',
        email: 'info@sualumni.kg',
        address: 'г. Бишкек, ул. Салымбекова 10'
      },
      {
        name: 'Колледж IT и Бизнеса',
        phone: '+996 (312) 54-23-45',
        email: 'itcollege@dordoi.kg',
        address: 'г. Бишкек, ул. Университетская 7'
      },
      {
        name: 'Медицинский колледж',
        phone: '+996 (312) 54-78-90',
        email: 'medcollege@dordoi.kg',
        address: 'г. Бишкек, ул. Здравоохранения 12'
      },
      {
        name: 'Американский институт технологий',
        phone: '+996 (312) 54-11-22',
        email: 'ait@dordoi.kg',
        address: 'г. Бишкек, ул. Технологическая 15'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">Контакты</h1>
          <p className="text-lg text-blue-600">Свяжитесь с нашими компаниями и учреждениями</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="flex flex-wrap bg-blue-800">
            <button
              onClick={() => setActiveTab('markets')}
              className={`px-6 py-3 font-medium text-white transition-colors ${activeTab === 'markets' ? 'bg-yellow-500 text-blue-900' : 'hover:bg-blue-700'}`}
            >
              Рынки
            </button>
            <button
              onClick={() => setActiveTab('motors')}
              className={`px-6 py-3 font-medium text-white transition-colors ${activeTab === 'motors' ? 'bg-yellow-500 text-blue-900' : 'hover:bg-blue-700'}`}
            >
              Дордой Моторс
            </button>
            <button
              onClick={() => setActiveTab('plaza')}
              className={`px-6 py-3 font-medium text-white transition-colors ${activeTab === 'plaza' ? 'bg-yellow-500 text-blue-900' : 'hover:bg-blue-700'}`}
            >
              Дордой Плаза
            </button>
            <button
              onClick={() => setActiveTab('universities')}
              className={`px-6 py-3 font-medium text-white transition-colors ${activeTab === 'universities' ? 'bg-yellow-500 text-blue-900' : 'hover:bg-blue-700'}`}
            >
              Университеты
            </button>
          </div>

          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {contactsData[activeTab].map((contact, index) => (
                <div key={index} className="bg-blue-100 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-blue-800 mb-3">{contact.name}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-yellow-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-blue-700">{contact.phone}</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-yellow-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-blue-700">{contact.email}</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-yellow-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-blue-700">{contact.address}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Есть вопросы?</h2>
          <p className="text-blue-600 mb-6">Заполните форму ниже, и мы свяжемся с вами в ближайшее время</p>
          
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-blue-700 mb-1">Ваше имя</label>
                <input type="text" id="name" className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-blue-700 mb-1">Телефон</label>
                <input type="tel" id="phone" className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-blue-500" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-700 mb-1">Email</label>
              <input type="email" id="email" className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-blue-700 mb-1">Сообщение</label>
              <textarea id="message" rows="4" className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-blue-500"></textarea>
            </div>
            <div>
              <button type="submit" className="px-6 py-3 bg-yellow-500 text-blue-900 font-medium rounded-lg hover:bg-yellow-600 transition-colors shadow-md">
                Отправить сообщение
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;