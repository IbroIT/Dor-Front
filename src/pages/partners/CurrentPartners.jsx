const CurrentPartners = () => {
  const partners = [
    {
      id: 1,
      name: "Компания А",
      logo: "/logos/company-a.png",
      description: "Официальный партнер с 2023 года"
    },
    // Добавьте больше партнеров
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Текущие партнеры</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map(partner => (
          <div key={partner.id} className="border rounded-lg p-4 flex flex-col items-center">
            <img 
              src={partner.logo} 
              alt={partner.name} 
              className="h-20 w-20 object-contain mb-3"
            />
            <h3 className="text-lg font-semibold">{partner.name}</h3>
            <p className="text-gray-600 text-center mt-2">{partner.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentPartners;