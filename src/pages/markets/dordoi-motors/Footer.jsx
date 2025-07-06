import { 
  FaCar, FaFacebookF, FaInstagram, FaTwitter, FaYoutube, 
  FaMapMarkerAlt, FaPhone, FaClock 
} from 'react-icons/fa';
import { Link } from 'react-scroll'; // Для плавной прокрутки

const Footer = () => {

  // Социальные сети с реальными ссылками
  const socialLinks = [
    { 
      icon: <FaFacebookF />, 
      url: 'https://facebook.com/dordoi-motors', 
      name: 'Facebook' 
    },
    { 
      icon: <FaInstagram />, 
      url: 'https://instagram.com/dordoi-motors', 
      name: 'Instagram' 
    },
    { 
      icon: <FaTwitter />, 
      url: 'https://twitter.com/dordoi-motors', 
      name: 'Twitter' 
    },
    { 
      icon: <FaYoutube />, 
      url: 'https://youtube.com/dordoi-motors', 
      name: 'YouTube' 
    },
  ];

  return (
    <footer id='contacts' className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-red-700 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3">
                <FaCar className="text-xl" />
              </div>
              <h3 className="text-xl font-bold">Дордой Моторс</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Крупнейший рынок автозапчастей в Бишкеке с 2002 года. Все для вашего автомобиля по оптовым и розничным ценам.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Навигация</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="hero" 
                  spy={true} 
                  smooth={true} 
                  duration={500} 
                  offset={-80}
                  className="text-gray-400 hover:text-white transition cursor-pointer"
                >
                  Главная
                </Link>
              </li>
              <li>
                <Link 
                  to="parts" 
                  spy={true} 
                  smooth={true} 
                  duration={500} 
                  offset={-80}
                  className="text-gray-400 hover:text-white transition cursor-pointer"
                >
                  Запчасти
                </Link>
              </li>
              <li>
                <Link 
                  to="shops" 
                  spy={true} 
                  smooth={true} 
                  duration={500} 
                  offset={-80}
                  className="text-gray-400 hover:text-white transition cursor-pointer"
                >
                  Магазины
                </Link>
              </li>
              <li>
                <Link 
                  to="map" 
                  spy={true} 
                  smooth={true} 
                  duration={500} 
                  offset={-80}
                  className="text-gray-400 hover:text-white transition cursor-pointer"
                >
                  Схема рынка
                </Link>
              </li>
              <li>
                <Link 
                  to="aboutus" 
                  spy={true} 
                  smooth={true} 
                  duration={500} 
                  offset={-80}
                  className="text-gray-400 hover:text-white transition cursor-pointer"
                >
                  О нас
                </Link>
              </li>
              <li>
                <Link 
                  to="contacts" 
                  spy={true} 
                  smooth={true} 
                  duration={500} 
                  className="text-gray-400 hover:text-white transition cursor-pointer"
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </div>          
          <div>
            <h4 className="text-lg font-bold mb-6">Контакты</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3" />
                <span>г. Бишкек, ул. Логвиненко 55</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3" />
                <a href="tel:+9963129876543" className="hover:text-white transition">
                  +996 (312) 987-65-43
                </a>
              </li>
              <li className="flex items-center">
                <FaClock className="mr-3" />
                <span>Ежедневно 8:00 - 20:00</span>
              </li>
            </ul>
            
            <div className="mt-4">
              <a 
                href="https://maps.app.goo.gl/example" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-red-400 hover:text-red-300 transition"
              >
                <FaMapMarkerAlt className="mr-2" />
                Открыть в Google Maps
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Рынок Дордой Моторс. Все права защищены.</p>
          <div className="mt-2 flex justify-center space-x-6">
            <a href="/privacy" className="hover:text-gray-400 transition">Политика конфиденциальности</a>
            <a href="/terms" className="hover:text-gray-400 transition">Условия использования</a>
            <a href="/sitemap.xml" className="hover:text-gray-400 transition">Карта сайта</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;