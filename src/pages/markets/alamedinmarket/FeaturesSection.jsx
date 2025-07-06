import { FaShoppingBag, FaStar, FaClock, FaUsers } from 'react-icons/fa';

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Почему выбирают рынок Аламедин?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Мы предлагаем лучшие условия для покупок и продаж уже более 30 лет
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-blue-50 rounded-xl hover:shadow-lg transition-shadow">
            <div className="bg-blue-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaShoppingBag className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-blue-800 mb-3">Огромный выбор</h3>
            <p className="text-gray-700">
              Более 1000 магазинов в 70 торговых рядах
            </p>
          </div>
          
          <div className="text-center p-6 bg-blue-50 rounded-xl hover:shadow-lg transition-shadow">
            <div className="bg-blue-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaStar className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-blue-800 mb-3">Лучшие цены</h3>
            <p className="text-gray-700">
              Прямые поставки от производителей без посредников
            </p>
          </div>
          
          <div className="text-center p-6 bg-blue-50 rounded-xl hover:shadow-lg transition-shadow">
            <div className="bg-blue-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaClock className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-blue-800 mb-3">Удобный график</h3>
            <p className="text-gray-700">
              Работаем без выходных с 8:00 до 20:00
            </p>
          </div>
          
          <div className="text-center p-6 bg-blue-50 rounded-xl hover:shadow-lg transition-shadow">
            <div className="bg-blue-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaUsers className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-blue-800 mb-3">Посетители</h3>
            <p className="text-gray-700">
              Ежедневно более 10 000 покупателей
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;