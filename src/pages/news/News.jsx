import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Пример данных (замените на свои)
const newsCategories = [
  {
    title: 'Новости рынков',
    news: [
      {
        id: 1,
        title: 'Открытие нового павильона',
        date: '2025-06-10',
        excerpt: 'В Дордое открылся новый современный павильон для предпринимателей...',
      },
      // ...
    ],
  },
  {
    title: 'Пресс-релизы',
    news: [
      {
        id: 2,
        title: 'Ассоциация Дордой подписала соглашение',
        date: '2025-05-28',
        excerpt: 'Подписано стратегическое соглашение с международными партнёрами...',
      },
      // ...
    ],
  },
  {
    title: 'Архив',
    news: [
      {
        id: 3,
        title: 'История успеха рынка',
        date: '2024-12-15',
        excerpt: 'Как рынок Дордой стал крупнейшим торговым центром региона...',
      },
      // ...
    ],
  },
];

// Анимации
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
const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const menuItems = [
  { to: 'market-news', label: 'Новости рынков', icon: '🛒' },
  { to: 'press', label: 'Пресс-релизы', icon: '📰' },
  { to: 'archive', label: 'Архив', icon: '📦' },
];

// Градиентный фон
const EpicBackground = () => (
  <div
    className="fixed inset-0 z-0 pointer-events-none"
    style={{
      background: 'radial-gradient(circle at 70% 30%, #a7f3d0 0%, #f0abfc 50%, #6366f1 100%)',
      animation: 'bgMove 12s ease-in-out infinite alternate',
    }}
  />
);

const News = () => {
  const location = useLocation();
  const [search, setSearch] = useState('');

  // Фильтрация новостей по поиску
  const filteredCategories = newsCategories.map(category => ({
    ...category,
    news: category.news.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(search.toLowerCase())
    ),
  }));

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
            <span className="bg-gradient-to-r from-purple-500 via-pink-400 to-green-400 bg-clip-text text-transparent">
              📰 Новости DORDOI
            </span>
          </h1>
          <p className="text-center text-lg text-gray-700 mb-10 font-medium">
            Ассоциация «Дордой» — образование торговли и оплот гармоничного развития
          </p>
        </motion.div>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Боковое меню */}
          <motion.aside
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { delay: 0.2, type: 'spring' } }}
            className="w-full md:w-72 bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-2xl border border-purple-100"
          >
            <h2 className="text-2xl font-bold mb-6 text-purple-700 flex items-center gap-2">
              <span>Категории</span>
              <span className="animate-pulse">✨</span>
            </h2>
            <ul className="space-y-2">
              {menuItems.map(item => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`flex items-center gap-3 px-5 py-3 rounded-lg font-semibold transition-all duration-200
                      ${
                        location.pathname.endsWith(item.to)
                          ? 'bg-gradient-to-r from-purple-400 via-pink-300 to-green-200 text-white shadow-lg scale-105'
                          : 'hover:bg-purple-50 text-gray-800'
                      }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.aside>

          {/* Основное содержимое */}
          <motion.main
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="flex-1 bg-white/90 backdrop-blur-lg rounded-xl shadow-xl px-6 py-8"
          >
            {/* Поиск */}
            <div className="mb-8 flex justify-end">
              <input
                type="text"
                placeholder="🔍 Поиск новости..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              />
            </div>
            {/* Категории и новости */}
            {filteredCategories.map(
              (category, idx) =>
                category.news.length > 0 && (
                  <motion.section
                    key={category.title}
                    variants={fadeIn('up', 'spring', idx * 0.15 + 0.4, 1)}
                    className="mb-14"
                  >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-purple-200 pb-2 flex items-center gap-2">
                      <span className="text-purple-500">★</span>
                      {category.title}
                    </h2>
                    <div className="space-y-6">
                      {category.news.map(item => (
                        <motion.article
                          key={item.id}
                          whileHover={{
                            scale: 1.025,
                            x: 8,
                            boxShadow: '0 8px 32px 0 rgba(168, 85, 247, 0.15)',
                          }}
                          className="border-l-4 border-indigo-500 pl-6 py-4 bg-gradient-to-br from-purple-50 via-pink-50 to-green-50 rounded-lg shadow transition-all duration-200 group"
                        >
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                          <p className="text-gray-700">{item.excerpt}</p>
                          <button className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium transition">
                            Читать далее →
                          </button>
                        </motion.article>
                      ))}
                    </div>
                  </motion.section>
                )
            )}
            {/* Дочерние роуты */}
            <div className="mt-8">
              <Outlet />
            </div>
          </motion.main>
        </div>
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

export default News;
