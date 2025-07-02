const InternationalProjects = () => {
  const projects = [
    {
      id: 1,
      name: "Международный проект X",
      country: "Германия",
      description: "Совместная торговая инициатива"
    },
    // Добавьте больше проектов
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Международные проекты</h2>
      <div className="space-y-6">
        {projects.map(project => (
          <div key={project.id} className="border-b pb-6 last:border-b-0">
            <h3 className="text-xl font-semibold">{project.name}</h3>
            <p className="text-gray-500 mt-1">{project.country}</p>
            <p className="mt-2 text-gray-700">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternationalProjects;