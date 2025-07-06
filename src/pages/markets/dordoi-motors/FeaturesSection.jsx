import { FaCar, FaTools, FaSearchDollar, FaHeadset, FaShippingFast, FaShieldAlt } from 'react-icons/fa';

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Почему выбирают Дордой Моторс?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Лучшие условия для покупки автозапчастей с гарантией качества
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl hover:shadow-lg transition-shadow border border-gray-200">
            <div className="bg-red-700 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCar className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Все для автомобиля</h3>
            <p className="text-gray-700">
              Запчасти для любых марок и моделей автомобилей
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl hover:shadow-lg transition-shadow border border-gray-200">
            <div className="bg-red-700 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaTools className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Профессиональный подбор</h3>
            <p className="text-gray-700">
              Помощь в выборе правильных запчастей для вашего авто
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl hover:shadow-lg transition-shadow border border-gray-200">
            <div className="bg-red-700 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaSearchDollar className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Лучшие цены</h3>
            <p className="text-gray-700">
              Прямые поставки от производителей без посредников
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl hover:shadow-lg transition-shadow border border-gray-200">
            <div className="bg-red-700 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaHeadset className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Экспертная поддержка</h3>
            <p className="text-gray-700">
              Консультации по подбору и установке запчастей
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl hover:shadow-lg transition-shadow border border-gray-200">
            <div className="bg-red-700 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaShippingFast className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Быстрая доставка</h3>
            <p className="text-gray-700">
              Доставка по городу и в регионы в кратчайшие сроки
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl hover:shadow-lg transition-shadow border border-gray-200">
            <div className="bg-red-700 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaShieldAlt className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Гарантия качества</h3>
            <p className="text-gray-700">
              Гарантия на все запчасти от 3 месяцев до 2 лет
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
