const Cooperation = () => {
  const cooperations = [
    {
      id: 1,
      title: "Соглашение о сотрудничестве",
      partner: "Ассоциация предпринимателей",
      date: "12 мая 2025"
    },
    // Добавьте больше соглашений
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Партнерство и сотрудничество</h2>
      <div className="space-y-6">
        {cooperations.map(item => (
          <div key={item.id} className="border-b pb-6 last:border-b-0">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-500 mt-1">С партнером: {item.partner}</p>
            <p className="text-gray-500">Дата: {item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cooperation;