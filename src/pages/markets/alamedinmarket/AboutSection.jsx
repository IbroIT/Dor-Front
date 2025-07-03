const AboutSection = () => {
  return (
    <section id="aboutus" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center text-gray-700">
              Фото рынка Аламедин
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">О рынке Аламедин</h2>
            <p className="text-gray-700 mb-4">
              Рынок Аламедин - один из крупнейших торговых центров в Центральной Азии,
              работающий с 1992 года. Ежедневно рынок посещают тысячи покупателей
              из Бишкека и всех регионов Кыргызстана.
            </p>
            <p className="text-gray-700 mb-6">
              Территория рынка занимает более 10 гектаров и разделена на 70 специализированных
              рядов. Здесь вы найдете буквально все - от одежды и электроники до
              строительных материалов и автозапчастей.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-3xl font-bold text-blue-800">30+</p>
                <p className="text-gray-700">лет на рынке</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-3xl font-bold text-blue-800">1000+</p>
                <p className="text-gray-700">магазинов</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-3xl font-bold text-blue-800">70</p>
                <p className="text-gray-700">торговых рядов</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-3xl font-bold text-blue-800">12</p>
                <p className="text-gray-700">категорий товаров</p>
              </div>
            </div>
            
           </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;