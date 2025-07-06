import { motion } from 'framer-motion';
import { useState } from 'react';

// Пример данных всех партнеров (объединенные из всех категорий)
const allPartners = [
  { id: 1, name: 'Партнер 1', logo: '/logos/partner1.png', category: 'Текущие партнеры' },
  { id: 2, name: 'Партнер 2', logo: '/logos/partner2.png', category: 'Текущие партнеры' },
  { id: 3, name: 'Международный партнер 1', logo: '/logos/intl1.png', category: 'Международные проекты' },
  { id: 4, name: 'Партнерство 1', logo: '/logos/coop1.png', category: 'Партнерство и сотрудничество' },
  { id: 5, name: 'Организация 1', logo: '/logos/letter1.png', category: 'Благодарственные письма' },
];

// Градиентный фон в сине-желтых тонах
const EpicBackground = () => (
  <div
    className="fixed inset-0 z-0"
    style={{
      background: 'radial-gradient(circle at 70% 30%, #3b82f6 0%, #ffffff 100%)',
      animation: 'bgMove 12s ease-in-out infinite alternate',
    }}
  />
);

// Анимация для секций
const fadeIn = (direction = 'up', type = 'spring', delay = 0, duration = 0.7) => ({
  hidden: {
    opacity: 0,
    y: direction === 'up' ? 40 : 0,
    x: direction === 'left' ? -40 : 0,
  },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { type, delay, duration },
  },
});

const Partners = () => {
  const [search, setSearch] = useState('');

  // Фильтрация партнеров по поиску
  const filteredPartners = allPartners.filter(partner =>
    partner.name.toLowerCase().includes(search.toLowerCase()) ||
    partner.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <EpicBackground />
      <div className="relative z-10 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn('up', 'spring', 0.1, 1)}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-4 drop-shadow-lg tracking-tight">
            🤝
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
              Все партнеры DORDOI
            </span>
          </h1>
          <p className="text-center text-lg text-gray-700 mb-10 font-medium">
            Ассоциация «Дордой» — образование торговли и оплот гармоничного развития
          </p>
        </motion.div>

        {/* Основное содержимое */}
        <motion.main
          initial="hidden"
          animate="show"
          variants={fadeIn('up', 'spring', 0.3, 1)}
          className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl px-6 py-8"
        >
          {/* Поиск */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="🔍 Поиск по партнёрам или категориям..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Все партнеры */}
          <motion.section
            variants={fadeIn('up', 'spring', 0.4, 1)}
          >
            {filteredPartners.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {filteredPartners.map((partner) => (
                  <motion.div
                    key={partner.id}
                    whileHover={{
                      scale: 1.07,
                      boxShadow: '0 8px 32px 0 rgba(59, 130, 246, 0.25)',
                    }}
                    className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 flex flex-col items-center shadow hover:shadow-2xl transition-all duration-200 group"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-20 w-20 object-contain mb-3 drop-shadow-lg group-hover:scale-110 group-hover:brightness-110 transition-all duration-200"
                    />
                    <h3 className="text-base font-semibold text-center text-gray-700 group-hover:text-blue-600 transition">
                      {partner.name}
                    </h3>
                    <span className="text-xs text-blue-500 mt-1">{partner.category}</span>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">Партнеры не найдены</p>
            )}
          </motion.section>
        </motion.main>
      </div>

      {/* Анимация фона (CSS) */}
      <style>
        {`
          @keyframes bgMove {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
        `}
      </style>
    </div>
  );
};

export default Partners;