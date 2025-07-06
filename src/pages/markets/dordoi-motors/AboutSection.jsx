const AboutSection = () => {
  return (
    <section id="aboutus" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center text-gray-700">
              Фото рынка Дордой Моторс
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">О рынке Дордой Моторс</h2>
            <p className="text-gray-700 mb-4">
              Дордой Моторс - крупнейший специализированный рынок автозапчастей в Центральной Азии,
              работающий с 2002 года. Ежедневно рынок посещают тысячи автомобилистов
              из Бишкека и всех регионов Кыргызстана.
            </p>
            <p className="text-gray-700 mb-6">
              Территория рынка занимает более 5 гектаров и разделена на 20 специализированных
              рядов. Здесь вы найдете запчасти для любых автомобилей - от легковых до грузовых,
              оригинальные детали и качественные аналоги.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-3xl font-bold text-red-700">20+</p>
                <p className="text-gray-700">лет на рынке</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-3xl font-bold text-red-700">500+</p>
                <p className="text-gray-700">магазинов</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-3xl font-bold text-red-700">20</p>
                <p className="text-gray-700">торговых рядов</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-3xl font-bold text-red-700">12</p>
                <p className="text-gray-700">категорий запчастей</p>
              </div>
            </div>
            
           </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
