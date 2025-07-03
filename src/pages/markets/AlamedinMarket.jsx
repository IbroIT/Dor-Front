import  { useState }  from 'react';
import  TopBar  from './alamedinmarket/TopBar';
import  Header  from './alamedinmarket/Header';
import  HeroSection  from './alamedinmarket/HeroSection';
import  FeaturesSection  from './alamedinmarket/FeaturesSection';
import  CategoriesSection  from './alamedinmarket/CategoriesSection';
import  VendorsSection  from './alamedinmarket/VendorsSection';
import MarketMapSection  from './alamedinmarket/MarketMapSection';
import  AboutSection  from './alamedinmarket/AboutSection';
import  Footer  from './alamedinmarket/Footer';
import  ShopPopup  from './alamedinmarket/ShopPopup';
import HistorySection from './alamedinmarket/HistorySection';

const AlamedinMarket = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Данные для приложения
  const vendors = [
    { id: 1, name: 'Бутик "Стиль"', description: 'Модная одежда и аксессуары', rating: 4.8, section: 'a' },
    { id: 2, name: 'Магазин "Спорт"', description: 'Спортивная одежда и обувь', rating: 4.7, section: 'a' },
    { id: 3, name: 'Электроника+', description: 'Техника и гаджеты', rating: 4.6, section: 'b' },
    { id: 4, name: 'Восточные ковры', description: 'Ковры ручной работы', rating: 4.9, section: 'c' },
    { id: 5, name: 'Детский мир', description: 'Все для детей', rating: 4.7, section: 'd' },
    { id: 6, name: 'Элит-мода', description: 'Вечерние и свадебные платья', rating: 4.8, section: 'a' },
    { id: 7, name: 'Технодом', description: 'Компьютеры и ноутбуки', rating: 4.5, section: 'b' },
    { id: 8, name: 'Мебель для вас', description: 'Мебель для дома и офиса', rating: 4.7, section: 'e' },
    { id: 9, name: 'Бутик "Премиум"', description: 'Эксклюзивная одежда из кожи', rating: 4.9, section: 'a' },
    { id: 10, name: 'Обувной дворик', description: 'Обувь всех видов и размеров', rating: 4.7, section: 'a' },
    { id: 11, name: 'Гаджет Центр', description: 'Телефоны и планшеты', rating: 4.6, section: 'b' },
    { id: 12, name: 'Текстиль Хаус', description: 'Постельное белье и покрывала', rating: 4.8, section: 'c' },
    { id: 13, name: 'Мебель Плюс', description: 'Кухни и гостиные', rating: 4.7, section: 'e' },
    { id: 14, name: 'АвтоГаджет', description: 'Автоэлектроника и аксессуары', rating: 4.5, section: 'f' },
    { id: 15, name: 'Спортмастер', description: 'Тренажеры и спортинвентарь', rating: 4.8, section: 'g' },
  ];

  const products = [
    { id: 1, name: 'Джинсы Levis', category: 'clothing', price: '1200 сом', vendor: 'Бутик "Стиль"' },
    { id: 2, name: 'Кроссовки Nike', category: 'shoes', price: '2500 сом', vendor: 'Магазин "Спорт"' },
    { id: 3, name: 'Смартфон Samsung', category: 'electronics', price: '18000 сом', vendor: 'Электроника+"' },
    { id: 4, name: 'Ковер ручной работы', category: 'textiles', price: '5000 сом', vendor: 'Восточные ковры' },
    { id: 5, name: 'Детский комбинезон', category: 'kids', price: '800 сом', vendor: 'Детский мир' },
    { id: 6, name: 'Платье вечернее', category: 'clothing', price: '3500 сом', vendor: 'Элит-мода' },
    { id: 7, name: 'Ноутбук HP', category: 'electronics', price: '32000 сом', vendor: 'Технодом' },
    { id: 8, name: 'Диван угловой', category: 'furniture', price: '28000 сом', vendor: 'Мебель для вас' },
    { id: 9, name: 'Кожаная куртка', category: 'clothing', price: '4500 сом', vendor: 'Бутик "Премиум"' },
    { id: 10, name: 'Туфли кожаные', category: 'shoes', price: '3200 сом', vendor: 'Обувной дворик' },
    { id: 11, name: 'Планшет Samsung', category: 'electronics', price: '12500 сом', vendor: 'Гаджет Центр' },
    { id: 12, name: 'Шерстяное одеяло', category: 'textiles', price: '2800 сом', vendor: 'Текстиль Хаус' },
    { id: 13, name: 'Детский велосипед', category: 'kids', price: '4200 сом', vendor: 'Детский мир' },
    { id: 14, name: 'Кухонный гарнитур', category: 'furniture', price: '55000 сом', vendor: 'Мебель Плюс' },
    { id: 15, name: 'Автомагнитола', category: 'auto', price: '7500 сом', vendor: 'АвтоГаджет' },
    { id: 16, name: 'Беговая дорожка', category: 'sports', price: '32000 сом', vendor: 'Спортмастер' },
  ];

  const marketSections = [
    {
      id: 'a',
      name: 'Сектор А (Ряд 1-10)',
      description: 'Верхняя одежда, куртки, пальто',
      position: [42.842, 74.592],
      shops: [1, 2, 6, 9, 10]
    },
    {
      id: 'b',
      name: 'Сектор Б (Ряд 11-20)',
      description: 'Электроника и бытовая техника',
      position: [42.844, 74.595],
      shops: [3, 7, 11]
    },
    {
      id: 'c',
      name: 'Сектор В (Ряд 21-30)',
      description: 'Товары для дома, текстиль, ковры',
      position: [42.841, 74.598],
      shops: [4, 5, 8, 12]
    },
    {
      id: 'd',
      name: 'Сектор Г (Ряд 31-40)',
      description: 'Детские товары, игрушки',
      position: [42.839, 74.601],
      shops: [5, 13]
    },
    {
      id: 'e',
      name: 'Сектор Д (Ряд 41-50)',
      description: 'Мебель, интерьер',
      position: [42.837, 74.599],
      shops: [8, 13]
    },
    {
      id: 'f',
      name: 'Сектор Е (Ряд 51-60)',
      description: 'Автозапчасти, аксессуары',
      position: [42.835, 74.597],
      shops: [14]
    },
    {
      id: 'g',
      name: 'Сектор Ж (Ряд 61-70)',
      description: 'Спортивные товары, инвентарь',
      position: [42.833, 74.595],
      shops: [15]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <VendorsSection setSelectedShop={setSelectedShop} vendors={vendors} />
      <MarketMapSection setSelectedShop={setSelectedShop} marketSections={marketSections} />
      <AboutSection />
      <HistorySection/>
      <Footer />
      
      <ShopPopup 
        selectedShop={selectedShop} 
        setSelectedShop={setSelectedShop}
        vendors={vendors}
        products={products}
        marketSections={marketSections}
      />
    </div>
  );
}

export default AlamedinMarket;