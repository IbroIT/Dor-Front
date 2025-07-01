import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import {banners} from './const.js'
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';

// Define banners outside the component for static data

const Banner = ({ slideInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const intervalRef = useRef(null);

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-slide functionality with pause/resume
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
      }, slideInterval);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, slideInterval]);

  // GSAP animations with cleanup
  useEffect(() => {
    const tl = gsap.timeline();

    if (imageRef.current && titleRef.current) {
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }
      ).fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '<0.2'
      );
    }
  }, [currentIndex]);

  // Navigation handlers
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  // Pause/resume on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const currentSlide = banners[currentIndex];

  return (
    <section
      className="relative w-full h-[80vh] overflow-hidden bg-black"
      aria-label={`Banner: ${currentSlide.title}`}
      role="region"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 z-0" ref={imageRef}>
        <img
          src={isMobile ? currentSlide.imageMobile : currentSlide.imageDesktop}
          alt={currentSlide.title}
          loading={currentIndex === 0 ? 'eager' : 'lazy'}
          onError={(e) => (e.currentTarget.src = '/path/to/fallback-image.webp')}
          className="w-full h-full object-cover"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/40 to-yellow-500/30" />
      </div>

      <div
        ref={titleRef}
        className="absolute bottom-0 left-0 w-full z-10 flex flex-col items-center justify-end h-full text-center pb-14 px-4 md:px-8"
      >
        <h2 className="text-2xl md:text-4xl font-extrabold text-yellow-400 drop-shadow-lg bg-black/60 rounded-lg px-4 py-2 mb-0 max-w-3xl mx-auto">
          {currentSlide.title}
        </h2>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-4 left-4 z-20 flex gap-2">
        <button
          onClick={handlePrev}
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition"
          aria-label="Previous slide"
        >
          <FaArrowLeft/>
        </button>
        <button
          onClick={handleNext}
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition"
          aria-label="Next slide"
        >
          <FaArrowRight/>
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 right-4 z-20 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-yellow-400' : 'bg-white/50'
            } hover:bg-yellow-300 transition`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;