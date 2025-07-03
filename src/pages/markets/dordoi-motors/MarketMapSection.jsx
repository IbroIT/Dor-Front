import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Фикс для иконок Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MarketMapSection = ({ setSelectedShop }) => {
  const [isMapReady, setIsMapReady] = useState(false);
  
  useEffect(() => {
    setIsMapReady(true);
  }, []);
  
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

  return (
    <section id='map' className="py-16 bg-red-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Схема рынка Дордой Моторс</h2>
          <p className="text-xl mb-8 opacity-90">
            Навигация по крупнейшему рынку автозапчастей в Бишкеке
          </p>
          
          {isMapReady ? (
            <div className="relative bg-white rounded-xl overflow-hidden shadow-xl h-96 mb-8">
              <MapContainer 
                center={[42.842, 74.595]} 
                zoom={16} 
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {marketSections.map(section => (
                  <Marker 
                    key={section.id}
                    position={section.position}
                    eventHandlers={{
                      click: () => {
                        setSelectedShop(section.shops[0]);
                      }
                    }}
                  >
                    <Popup>
                      <div className="font-bold text-red-700">{section.name}</div>
                      <p className="text-sm">{section.description}</p>
                      <button 
                        className="mt-2 bg-red-700 text-white px-3 py-1 rounded text-sm"
                        onClick={() => setSelectedShop(section.shops[0])}
                      >
                        Показать магазины
                      </button>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          ) : (
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 mb-8 mx-auto flex items-center justify-center text-gray-700">
              Загрузка карты...
            </div>
          )}
          
          {/* Секции рынка */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {marketSections.map(section => (
              <div 
                key={section.id} 
                className="bg-red-900/80 p-4 rounded-lg hover:bg-red-900 transition cursor-pointer"
                onClick={() => setSelectedShop(section.shops[0])}
              >
                <h3 className="font-bold text-lg mb-2">{section.name}</h3>
                <p>{section.description}</p>
              </div>
            ))}
          </div>
          
          <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
            Скачать схему рынка
          </button>
        </div>
      </div>
    </section>
  );
};

export default MarketMapSection;
