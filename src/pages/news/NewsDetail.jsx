import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleNews } from '../../api/news';

const NewsDetail = () => {
  const { slug } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getSingleNews(slug);
        setNewsItem(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (!newsItem) return <div>News not found</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{newsItem.title}</h1>
      <p className="text-gray-500 mb-6">
        {new Date(newsItem.published_date).toLocaleDateString()} | {newsItem.category.name}
      </p>
      
      {newsItem.image && (
        <img 
          src={`http://localhost:8000/media/${newsItem.image}`} 
          alt={newsItem.title}
          className="w-full h-auto mb-6 rounded-lg"
        />
      )}
      
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: newsItem.content }} />
      
      <Link 
        to={`/news/category/${newsItem.category.slug}`}
        className="mt-6 inline-block text-indigo-600 hover:text-indigo-800"
      >
        ← Назад к новостям
      </Link>
    </div>
  );
};

export default NewsDetail;