import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NewsItem = ({ title, excerpt, date, image, categories }) => {
  const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/800x600?text=Дордой';
          }}
        />
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {categories.map(category => (
            <span 
              key={category.id} 
              className="px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full"
            >
              {category.name}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{formattedDate}</span>
          <Link 
            to={`/news/${title.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Читать далее →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsItem;