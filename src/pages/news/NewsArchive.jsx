import { useState, useEffect } from 'react';
import NewsItem from './ArchiveItem';
import { getNewsArchive, getNewsCategories } from '../../services/api';

export default function NewsArchive() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('Все');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [newsData, setNewsData] = useState([]);
  const [categories, setCategories] = useState(['Все']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Загрузка категорий
        const categoriesData = await getNewsCategories();
        setCategories(['Все', ...categoriesData.map(cat => cat.name)]);
        
        // Загрузка новостей
        const news = await getNewsArchive();
        setNewsData(news);
      } catch (error) {
        console.error('Error fetching news archive:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Получаем уникальные года из данных
  const years = ['Все', ...new Set(newsData.map(item => new Date(item.date).getFullYear()))].sort((a, b) => b - a);
  
  // Фильтрация данных
  const filteredNews = newsData.filter(item => {
    const itemYear = new Date(item.date).getFullYear();
    const itemCategories = item.categories.map(cat => cat.name);
    
    const matchesYear = selectedYear === 'Все' || itemYear === selectedYear;
    const matchesCategory = selectedCategory === 'Все' || itemCategories.includes(selectedCategory);
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesYear && matchesCategory && matchesSearch;
  });


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl mb-4">
            Архив новостей
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Все значимые события и announcements ассоциации "ДОРДОЙ" за предыдущие годы
          </p>
        </div>

        {/* Фильтры */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Фильтр по году */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Год публикации</label>
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value === 'Все' ? 'Все' : parseInt(e.target.value))}
                  className="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Фильтр по категории */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Категория</label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Поиск */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Поиск по новостям</label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Введите ключевые слова..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Результаты */}
        <div className="mb-12">
          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map(news => (
                <NewsItem key={news.id} news={news} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-lg">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Новости не найдены</h3>
              <p className="mt-1 text-gray-500">Попробуйте изменить параметры поиска</p>
            </div>
          )}
        </div>

        {/* Кнопка возврата */}
        <div className="text-center">
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <svg className="-ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Вернуться на главную
          </a>
        </div>
      </div>
    </div>
  );
}