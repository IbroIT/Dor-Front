import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNews } from '../../api/news';

const NewsCategory = () => {
  const { slug } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews(slug);
        setNews(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, [slug]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Новости</h2>
      <div className="space-y-6">
        {news.map(item => (
          <article key={item.id} className="border-b pb-6 last:border-b-0">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-500 text-sm mt-1">
              {new Date(item.published_date).toLocaleDateString()}
            </p>
            <p className="mt-2 text-gray-700">{item.excerpt}</p>
            <Link 
              to={`/news/${item.slug}`}
              className="mt-3 inline-block text-indigo-600 hover:text-indigo-800"
            >
              Читать далее →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default NewsCategory;