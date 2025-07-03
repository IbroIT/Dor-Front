import { FaTimes, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

const ShopPopup = ({ selectedShop, setSelectedShop, vendors, products, marketSections }) => {
  if (!selectedShop) return null;
  
  const findShop = (id) => vendors.find(v => v.id === id);
  const shop = findShop(selectedShop);
  
  if (!shop) return null;
  
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-slideIn">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-blue-800">{shop.name}</h3>
              <p className="text-gray-700">{shop.description}</p>
            </div>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedShop(null)}
            >
              <FaTimes size={24} />
            </button>
          </div>
          
          <div className="my-4 flex items-center">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.floor(shop.rating) ? "text-amber-400" : "text-gray-300"} />
              ))}
            </div>
            <span className="ml-2 text-gray-600">{shop.rating}</span>
          </div>
          
          <div className="mt-4">
            <h4 className="font-bold text-gray-800 mb-2">Товары в этом магазине:</h4>
            <ul className="space-y-2">
              {products
                .filter(p => p.vendor === shop.name)
                .map(product => (
                  <li key={product.id} className="flex justify-between border-b pb-2">
                    <span>{product.name}</span>
                    <span className="font-bold text-blue-700">{product.price}</span>
                  </li>
                ))}
            </ul>
          </div>
          
          <div className="mt-4">
            <h4 className="font-bold text-gray-800 mb-2">Расположение:</h4>
            <p className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-blue-700" />
              {marketSections.find(s => s.id === shop.section)?.name}
            </p>
          </div>
          
          <button className="w-full mt-6 bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition">
            Перейти к магазину
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopPopup;