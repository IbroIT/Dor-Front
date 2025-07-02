const PressReleases = () => {
  const releases = [
    {
      id: 1,
      title: "Подписание соглашения с международными партнерами",
      date: "10 июля 2025",
      excerpt: "Ассоциация Дордой подписала важное соглашение"
    },
    // Добавьте больше релизов
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Пресс-релизы</h2>
      <div className="space-y-6">
        {releases.map(item => (
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

export default PressReleases;