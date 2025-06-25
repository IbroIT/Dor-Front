import  { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Static banner data
 const banner = [

  {
    image: 'https://cdn-1.aki.kg/cdn-st-0/qgH/1/3154690.b93c5d2ca14ad9a7f9be4972a4bbe069.jpg',
    title: 'Суперкубок Кыргызстана 2018'
  },
 
];

  useEffect(() => {
    if (banner.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banner.length);
      }, 5000);
  
      return () => clearInterval(interval);
    }
  }, [banner.length]);

  const currentSlide = banner.length > 0 ? banner[currentIndex] : null;

  return (
    <div className="">
      <section className="relative w-full max-h-[80vh] overflow-hidden">
        <div className="">
          {banner.length === 0 ? (
            <div className="flex justify-center items-center h-[80vh] text-white text-xl">
              No banners available
            </div>
          ) : (
            <>
              <motion.div
                className="absolute inset-0 z-0"
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              >
                <img
                  src={banner[currentIndex]?.image} 
                  alt={banner[currentIndex]?.title}
                  className="w-full h-full object-center "
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/40 to-yellow-500/30"></div>
              </motion.div>

              <motion.div
                className="relative z-10 flex flex-col items-center justify-center h-[80vh] text-center px-4 md:px-8"
                key={banner[currentIndex]?.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              >
               
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-0 w-full z-10 flex flex-col items-center justify-end h-full text-center pb-14 px-4 md:px-8 pb-14A"
                key={banner[currentIndex]?.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              >
                <h2 className="text-2xl md:text-4xl font-extrabold text-yellow-400 drop-shadow-lg bg-black/60 rounded-lg px-4 py-2 mb-0 max-w-3xl mx-auto">
                  {banner[currentIndex]?.title}
                </h2>
              </motion.div>
            </>
          )}
        </div>
      </section>
    </div>   
  );
};

export default Banner;