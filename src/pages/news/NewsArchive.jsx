const NewsArchive = () => {
  const archive = [
    {
      year: "2025",
      items: [
        { id: 1, title: "Итоги первого квартала 2025", date: "5 апреля 2025" },
        // Добавьте больше архивных записей
      ]
    },
    // Добавьте больше годов
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Архив новостей</h2>
      <div className="space-y-8">
        {archive.map(({ year, items }) => (
          <div key={year}>
            <h3 className="text-xl font-semibold mb-4">{year} год</h3>
            <ul className="space-y-3">
              {items.map(item => (
                <li key={item.id}>
                  <a href="#" className="flex justify-between hover:text-indigo-600">
                    <span>{item.title}</span>
                    <span className="text-gray-500">{item.date}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsArchive;