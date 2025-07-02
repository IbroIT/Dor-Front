const ThankLetters = () => {
  const letters = [
    {
      id: 1,
      from: "Министерство экономики",
      date: "3 марта 2025",
      preview: "Благодарность за вклад в развитие торговли"
    },
    // Добавьте больше писем
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Благодарственные письма</h2>
      <div className="space-y-6">
        {letters.map(letter => (
          <div key={letter.id} className="border-b pb-6 last:border-b-0">
            <h3 className="text-xl font-semibold">От: {letter.from}</h3>
            <p className="text-gray-500 mt-1">Дата: {letter.date}</p>
            <p className="mt-2 text-gray-700">{letter.preview}</p>
            <button className="mt-3 text-indigo-600 hover:text-indigo-800">
              Посмотреть письмо →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThankLetters;