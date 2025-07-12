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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
      {/* Эпичный динамичный фон */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Основной градиентный фон */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900" />
        
        {/* Анимированные световые эффекты */}
        <motion.div 
          className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-gradient-to-r from-blue-600/20 to-yellow-400/10 rounded-full"
          animate={{
            rotate: [0, 360],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div 
          className="absolute -bottom-1/4 -right-1/4 w-[150%] h-[150%] bg-gradient-to-r from-indigo-600/20 to-yellow-500/10 rounded-full"
          animate={{
            rotate: [360, 0],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Энергетические волны */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-blue-900/90 via-blue-800/50 to-transparent"
          animate={{
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        {/* Яркие частицы */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(40)].map((_, i) => {
            const size = Math.random() * 4 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 3 + 2;
            const color = Math.random() > 0.9 ? 'bg-yellow-400' : 'bg-white';
            
            return (
              <motion.div
                key={i}
                className={`absolute rounded-full ${color}`}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${posX}%`,
                  top: `${posY}%`,
                  boxShadow: color === 'bg-yellow-400' 
                    ? '0 0 15px 3px rgba(255, 204, 0, 0.8)' 
                    : '0 0 10px 2px rgba(255, 255, 255, 0.8)'
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [0.8, 1.2, 0.8],
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
        
        {/* Лазерные линии */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
              animate={{
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"
              animate={{
                opacity: [0.2, 0.5, 0.2],
                x: [0, 100, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          </>
        )}
      </div>
      
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
            Откройте для себя будущее с <span className="font-bold text-blue-400">Ассоциацией «Дордой»</span> - 
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
              className="w-full rounded-3xl border-4 border-blue-400/60 shadow-[0_0_60px_rgba(59,130,246,0.7)]"
              onLoadedData={() => setIsVideoLoaded(true)}
            >
              {isVideoInView && (
                <source src={src} type="video/mp4" />
              )}
            </video>

            <button
              onClick={toggleMute}
              className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 z-20 hover:text-yellow-400"
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

      {/* Индикатор прокрутки с желтым акцентом */}
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
            className="h-10 w-6 rounded-full border-2 border-blue-400/50 flex justify-center pt-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-2 w-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(255,204,0,0.8)]"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default React.memo(Hero);