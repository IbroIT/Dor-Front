import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';


const stories = [
  {
    id: 1,
    title: 'Основание компании',
    content: 'В 1992 году на окраине Бишкека началась история Дордоя как небольшой торговой площадки. Сейчас это крупнейший торговый комплекс в Центральной Азии.',
    duration: 8000,
    image: '/img/storyhome1.jpeg',
    color: 'from-purple-600/80 to-blue-600/80'
  },
  {
    id: 2,
    title: 'Расширение',
    content: 'К 2005 году Дордой превратился в огромный торговый центр с тысячами предпринимателей. Ежедневно его посещают десятки тысяч людей.',
    duration: 8000,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    color: 'from-amber-600/80 to-red-600/80'
  },
  {
    id: 3,
    title: 'Образование',
    content: 'В 2019 году открылся Университет Дордой - современное образовательное учреждение, готовящее специалистов международного уровня.',
    duration: 8000,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop',
    color: 'from-emerald-600/80 to-cyan-600/80'
  },
  {
    id: 4,
    title: 'Спорт',
    content: 'Футбольный клуб "Дордой" - многократный чемпион страны, представляющий Кыргызстан на международной арене.',
    duration: 8000,
    image: 'https://diesel.elcat.kg/uploads/monthly_03_2014/post-292147-1395219822.jpg',
    color: 'from-green-600/80 to-lime-600/80'
  },
];

const EpicStories = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const modalRef = useRef(null);
  const progressInterval = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (activeIndex === null) {
      setProgress(0);
      return;
    }

    if (!isPlaying) {
      if (progressInterval.current) clearInterval(progressInterval.current);
      return;
    }

    const storyDuration = stories[activeIndex].duration;
    const increment = 100 / (storyDuration / 100);

    progressInterval.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval.current);
          return 100;
        }
        return prev + increment;
      });
    }, 100);

    const timer = setTimeout(() => {
      if (activeIndex < stories.length - 1) {
        setActiveIndex(activeIndex + 1);
        setProgress(0);
      } else {
        setActiveIndex(null);
      }
    }, storyDuration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval.current);
    };
  }, [activeIndex, isPlaying]);

  const handleNext = () => {
    setProgress(0);
    if (activeIndex < stories.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(null);
    }
  };

  const handlePrev = () => {
    setProgress(0);
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    trackMouse: !isMobile
  });

  // Упрощенные анимации для мобильных устройств
  const modalAnimations = isMobile ? {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
  } : {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.3 }
  };

  const modalContentAnimations = isMobile ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.2 }
  } : {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
    transition: { duration: 0.3 }
  };

  return (
    <div className="relative p-4 md:p-6 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white overflow-hidden">
      {/* Упрощенный фон для мобильных */}
      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: Math.random() * 200 + 50,
                height: Math.random() * 200 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, (Math.random() - 0.5) * 50],
                y: [0, (Math.random() - 0.5) * 50],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          ))}
        </div>
      )}

      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">
          История успеха Дордой
        </h1>
      </motion.div>

      <div className="relative z-10 flex gap-4 md:gap-6 overflow-x-auto pb-4 md:pb-6 scrollbar-hide px-2 md:px-4">
        {stories.map((story, index) => (
          <motion.div
            key={story.id}
            className="w-64 md:w-72 h-80 md:h-96 rounded-xl md:rounded-2xl cursor-pointer relative flex-shrink-0 overflow-hidden group"
            onClick={() => {
              setActiveIndex(index);
              setIsPlaying(true);
            }}
            whileHover={!isMobile ? { scale: 1.03 } : {}}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <img 
              src={story.image} 
              alt="" 
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${story.color} via-black/70`} />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">{story.title}</h3>
              <p className="text-xs md:text-sm line-clamp-2">{story.content}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-2 md:p-4"
            {...modalAnimations}
          >
            <motion.div
              ref={modalRef}
              {...swipeHandlers}
              className="relative w-full max-w-2xl md:max-w-4xl h-[70vh] md:h-[80vh] rounded-xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl bg-black"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/10 z-20">
                <motion.div 
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500" 
                  style={{ width: `${progress}%` }}
                  initial={{ width: 0 }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={stories[activeIndex].image}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-b ${stories[activeIndex].color} via-black/80`} />
              </div>

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex-1 p-4 md:p-8 flex flex-col justify-center">
                  <motion.h2 
                    className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-white drop-shadow"
                    {...modalContentAnimations}
                  >
                    {stories[activeIndex].title}
                  </motion.h2>
                  <motion.p 
                    className="text-base md:text-lg text-white/90 mb-4 md:mb-8 max-w-2xl drop-shadow"
                    {...modalContentAnimations}
                    transition={{ delay: 0.1, ...modalContentAnimations.transition }}
                  >
                    {stories[activeIndex].content}
                  </motion.p>
                </div>

                <div className="p-4 md:p-6 bg-gradient-to-t from-black/90 to-transparent">
                  <div className="flex justify-between items-center gap-2">
                    <motion.button
                      onClick={handlePrev}
                      className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-full text-white transition-all flex items-center gap-1 md:gap-2 text-sm md:text-base"
                      whileTap={{ scale: 0.95 }}
                      disabled={activeIndex === 0}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Назад
                    </motion.button>

                    <motion.button 
                      onClick={togglePlayPause}
                      className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2 md:p-3 rounded-full text-white transition-all"
                      whileTap={{ scale: 0.9 }}
                    >
                      {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        </svg>
                      )}
                    </motion.button>

                    <motion.button
                      onClick={handleNext}
                      className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-full text-white transition-all flex items-center gap-1 md:gap-2 text-sm md:text-base"
                      whileTap={{ scale: 0.95 }}
                      disabled={activeIndex === stories.length - 1}
                    >
                      Далее
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </div>

              <motion.button
                onClick={() => {
                  setActiveIndex(null);
                  setIsPlaying(false);
                }}
                className="absolute top-2 right-2 md:top-4 md:right-4 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-1 md:p-2 rounded-full transition-all z-30"
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EpicStories;

