import React from 'react';

const History = () => {

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">История ассоциации</h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Упрощённый контент без сложных классов */}
        <div className="space-y-8">
          <section className="p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-800 mb-3">1995 год</h2>
            <p className="text-gray-700">
              Основание ассоциации с первоначальным составом из 12 предпринимателей.
            </p>
          </section>

          <section className="p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-800 mb-3">2002 год</h2>
            <p className="text-gray-700">
              Открытие первого совместного проекта - рынка "Дордой".
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default History;