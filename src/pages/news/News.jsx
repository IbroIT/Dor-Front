import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { getNewsCategories } from '../../api/news';

const News = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getNewsCategories();
        setCategories(data);
        setLoading(false);
        
        // Перенаправляем на первую категорию по умолчанию
        if (data.length > 0 && !window.location.pathname.includes('/news/')) {
          navigate(`/news/category/${data[0].slug}`);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">📰 Новости DORDOI</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Категории новостей</h2>
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category.id}>
                  <Link 
                    to={`/news/category/${category.slug}`}
                    className="block px-4 py-2 hover:bg-gray-100 rounded transition"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1">
            <Outlet context={{ categories }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;