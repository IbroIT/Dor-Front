const MarketNews = () => {
  const news = [
    {
      id: 1,
      title: "Новые торговые возможности на рынке",
      date: "15 июля 2025",
      excerpt: "Расширение ассортимента товаров на рынке Дордой"
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Новости рынков</h2>
      <div className="space-y-6">
        {news.map(item => (
          <article key={item.id} className="border-b pb-6 last:border-b-0">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-500 text-sm mt-1">{item.date}</p>
            <p className="mt-2 text-gray-700">{item.excerpt}</p>
            <button className="mt-3 text-indigo-600 hover:text-indigo-800">
              Читать далее →
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};

export default MarketNews;