import { TiVolume, TiVolumeMute } from "react-icons/ti";
import { motion, useTransform, useViewportScroll } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

const Hero = ({ src, poster }) => {
  const particlesRef = useRef();
  const sectionRef = useRef();
  const videoRef = useRef();
  const { scrollYProgress } = useViewportScroll();
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoInView, setIsVideoInView] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Определение мобильных устройств и обработка ресайза
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Ленивая загрузка видео при попадании в область видимости
  useEffect(() => {
    if (!sectionRef.current || isVideoInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVideoInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Управление воспроизведением при скрытии вкладки
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (videoRef.current) {
        document.hidden ? videoRef.current.pause() : videoRef.current.play();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Оптимизированная анимация букв
  const renderAnimatedLetters = () => {
    const letters = "DORDOI".split("");
    return letters.map((letter, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 50, rotate: -15 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ 
          delay: i * 0.15, 
          duration: 0.8,
          ease: [0.25, 0.8, 0.25, 1] 
        }}
        className={i >= 3 ? 'text-blue-500' : 'text-white'}
      >
        {letter}
      </motion.span>
    ));
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative flex h-[90vh] w-full items-center justify-center overflow-hidden px-6 sm:px-10 md:px-16 lg:px-20"
      style={{ scale, opacity }}
    >
      {/* Фоновые элементы */}
      {!isMobile && (
        <>
          {/* Частицы */}
          <div 
            ref={particlesRef} 
            className="absolute inset-0 overflow-hidden pt-[-555] pointer-events-none"
          />
          
          {/* Градиентные волны */}
          <div className="absolute inset-0 overflow-hidden opacity-30">
            <motion.div 
              className="absolute -bottom-1/4 -left-1/4 w-[150%] h-[150%] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 120,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div 
              className="absolute -bottom-1/3 -right-1/3 w-[150%] h-[150%] bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-full"
              animate={{
                rotate: [360, 0],
              }}
              transition={{
                duration: 150,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
          
          {/* Мерцающие звезды */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => {
              const size = Math.random() * 3 + 1;
              const posX = Math.random() * 100;
              const posY = Math.random() * 100;
              const delay = Math.random() * 5;
              const duration = Math.random() * 3 + 2;
              
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${posX}%`,
                    top: `${posY}%`,
                    boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8)'
                  }}
                  animate={{
                    opacity: [0.2, 1, 0.2],
                  }}
                  transition={{
                    duration: duration,
                    delay: delay,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                />
              );
            })}
          </div>
        </>
      )}
      
      {/* Основное содержимое */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
        <motion.div
          className="py-10 md:py-20 lg:w-2/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.h1 className="mb-6 md:mb-10 flex flex-wrap text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight text-white [text-shadow:_0_2px_10px_rgba(0,0,0,0.5)]">
            {renderAnimatedLetters()}
          </motion.h1>

          <motion.p
            className="mb-8 md:mb-12 text-lg sm:text-xl md:text-2xl text-white [text-shadow:_0_2px_8px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            Откройте для себя будущее с <span className="font-bold text-blue-500">Ассоциацией «Дордой»</span> - 
            где образование, торговля и спорт гармонично сочетаются
          </motion.p>
        </motion.div>

        <motion.div
          className="relative -mt-0 md:mt-0 lg:w-3/5"
          initial={{ opacity: 0, x: 120 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative max-w-4xl mx-auto">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              poster={poster}
              preload="auto"
              className="w-full rounded-3xl border-4 border-blue-300/40 shadow-[0_0_60px_rgba(59,130,246,0.5)]"
              onLoadedData={() => setIsVideoLoaded(true)}
            >
              {isVideoInView && (
                <source src={src} type="video/mp4" />
              )}
            </video>

            <button
              onClick={toggleMute}
              className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 z-20"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <TiVolumeMute className="text-2xl" />
              ) : (
                <TiVolume className="text-2xl" />
              )}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Индикатор прокрутки */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-10 w-6 rounded-full border-2 border-blue-500/50 flex justify-center pt-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-2 w-1.5 rounded-full bg-blue-500"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default React.memo(Hero);