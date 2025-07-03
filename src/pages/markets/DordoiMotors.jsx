import { useState } from 'react';
import TopBar from './dordoi-motors/TopBar';
import Header from './dordoi-motors/Header';
import HeroSection from './dordoi-motors/HeroSection';
import FeaturesSection from './dordoi-motors/FeaturesSection';
import CategoriesSection from './dordoi-motors/CategoriesSection';
import VendorsSection from './dordoi-motors/VendorsSection';
import ShopPopup from './dordoi-motors/ShopPopup';
import MarketMapSection from './dordoi-motors/MarketMapSection';
import AboutSection from './dordoi-motors/AboutSection';
import HistorySection from './dordoi-motors/HistorySection';
import Footer from './dordoi-motors/Footer';
import { FaCrown, FaMedal, FaFire  } from 'react-icons/fa';


const DordoiMotors = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  
  // Данные о магазинах
  const vendors = [
    { 
      id: 1, 
      name: 'Автозапчасти "Турбо"', 
      description: 'Оригинальные запчасти для иномарок', 
      rating: 4.9, 
      section: 'a',
      years: 15,
      size: 'крупный',
      badge: <FaCrown className="text-amber-400" />
    },
    { 
      id: 2, 
      name: 'Дизель Сервис', 
      description: 'Запчасти для дизельных двигателей', 
      rating: 4.7, 
      section: 'a',
      years: 12,
      size: 'средний',
      badge: <FaMedal className="text-blue-400" />
    },
    { 
      id: 3, 
      name: 'Автоэлектроника', 
      description: 'Электронные компоненты и диагностика', 
      rating: 4.8, 
      section: 'b',
      years: 10,
      size: 'средний',
      badge: <FaFire className="text-red-500" />
    },
    { 
      id: 4, 
      name: 'Грузовые запчасти', 
      description: 'Запчасти для грузовиков и спецтехники', 
      rating: 4.9, 
      section: 'c',
      years: 18,
      size: 'крупный',
      badge: <FaCrown className="text-amber-400" />
    },
    { 
      id: 5, 
      name: 'Мото-Мир', 
      description: 'Запчасти для мотоциклов и скутеров', 
      rating: 4.7, 
      section: 'd',
      years: 8,
      size: 'средний',
      badge: <FaMedal className="text-blue-400" />
    },
    { 
      id: 6, 
      name: 'Тюнинг Ателье', 
      description: 'Аксессуары и тюнинг для автомобилей', 
      rating: 4.8, 
      section: 'a',
      years: 7,
      size: 'бутик',
      badge: <FaFire className="text-red-500" />
    },
    { 
      id: 7, 
      name: 'Автостекло', 
      description: 'Стекла для любых автомобилей', 
      rating: 4.6, 
      section: 'b',
      years: 9,
      size: 'средний',
      badge: null
    },
    { 
      id: 8, 
      name: 'Масла и автохимия', 
      description: 'Автомасла, смазки, автохимия', 
      rating: 4.7, 
      section: 'e',
      years: 14,
      size: 'крупный',
      badge: <FaCrown className="text-amber-400" />
    },
    { 
      id: 9, 
      name: 'Тормозные системы', 
      description: 'Тормозные колодки, диски, суппорта', 
      rating: 4.9, 
      section: 'a',
      years: 11,
      size: 'средний',
      badge: <FaFire className="text-red-500" />
    },
    { 
      id: 10, 
      name: 'Автооптика', 
      description: 'Фары, фонари, светодиодное освещение', 
      rating: 4.7, 
      section: 'a',
      years: 6,
      size: 'бутик',
      badge: <FaMedal className="text-blue-400" />
    },
    { 
      id: 11, 
      name: 'Подвеска ПРО', 
      description: 'Амортизаторы, пружины, рычаги', 
      rating: 4.8, 
      section: 'b',
      years: 13,
      size: 'крупный',
      badge: null
    },
    { 
      id: 12, 
      name: 'Автоаксессуары', 
      description: 'Чехлы, коврики, автозвук', 
      rating: 4.6, 
      section: 'c',
      years: 5,
      size: 'средний',
      badge: <FaCrown className="text-amber-400" />
    },
  ];
  
  // Данные о товарах
  const products = [
    { id: 1, name: 'Тормозные колодки', price: '2500 сом', vendor: 'Автозапчасти "Турбо"' },
    { id: 2, name: 'Масляный фильтр', price: '850 сом', vendor: 'Автозапчасти "Турбо"' },
    { id: 3, name: 'Воздушный фильтр', price: '650 сом', vendor: 'Автозапчасти "Турбо"' },
    { id: 4, name: 'Аккумулятор 60Ah', price: '8500 сом', vendor: 'Автоэлектроника' },
    { id: 5, name: 'Генератор', price: '12 500 сом', vendor: 'Автоэлектроника' },
    { id: 6, name: 'Стартер', price: '9 800 сом', vendor: 'Автоэлектроника' },
    { id: 7, name: 'Масло моторное 5W-40', price: '1800 сом', vendor: 'Масла и автохимия' },
    { id: 8, name: 'Тормозная жидкость', price: '750 сом', vendor: 'Масла и автохимия' },
    { id: 9, name: 'Амортизатор передний', price: '4 500 сом', vendor: 'Подвеска ПРО' },
    { id: 10, name: 'Рычаг подвески', price: '6 200 сом', vendor: 'Подвеска ПРО' },
    { id: 11, name: 'Фара передняя левая', price: '8 900 сом', vendor: 'Автооптика' },
    { id: 12, name: 'Линзованный фонарь', price: '3 500 сом', vendor: 'Автооптика' },
  ];
  
  // Данные о секциях рынка
  const marketSections = [
    {
      id: 'a',
      name: 'Сектор А (Ряд 1-5)',
      description: 'Запчасти для легковых автомобилей',
      position: [42.842, 74.592],
      shops: [1, 2, 6, 9, 10]
    },
    {
      id: 'b',
      name: 'Сектор Б (Ряд 6-10)',
      description: 'Автоэлектроника и диагностика',
      position: [42.844, 74.595],
      shops: [3, 7, 11]
    },
    {
      id: 'c',
      name: 'Сектор В (Ряд 11-15)',
      description: 'Грузовые запчасти и спецтехника',
      position: [42.841, 74.598],
      shops: [4, 8]
    },
    {
      id: 'd',
      name: 'Сектор Г (Ряд 16-20)',
      description: 'Мототехника и тюнинг',
      position: [42.839, 74.601],
      shops: [5, 6, 12]
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CategoriesSection />
        <VendorsSection setSelectedShop={setSelectedShop} />
        <MarketMapSection setSelectedShop={setSelectedShop} />
        <AboutSection />
        <HistorySection />
      </main>
      <Footer />
      
      {selectedShop && (
        <ShopPopup 
          selectedShop={selectedShop} 
          setSelectedShop={setSelectedShop}
          vendors={vendors}
          products={products}
          marketSections={marketSections}
        />
      )}
    </div>
  );
};

export default DordoiMotors;