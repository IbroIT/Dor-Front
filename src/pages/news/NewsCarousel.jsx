import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NewsCarousel = () => {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Загружаем featured новости
      const featuredResponse = await axios.get(
        'https://dor-back.onrender.com/api/news/featured/'
      );
      setFeaturedNews(featuredResponse.data);
      
    } catch (error) {
      console.error('Error fetching news:', error);
      // Можно добавить уведомление пользователю об ошибке
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    fade: true,
    beforeChange: (current, next) => setCurrentSlide(next),
    appendDots: dots => (
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <ul className="flex space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: i => (
      <div className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-white w-6' : 'bg-white bg-opacity-50'}`}></div>
    )
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white text-xl font-light animate-pulse">Загрузка новостей...</p>
        </div>
      </div>
    );
  }

  if (!featuredNews.length) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="text-center p-8 max-w-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">Новости не найдены</h2>
          <p className="text-blue-200 text-xl">В данный момент нет новостей для отображения</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Анимированный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 opacity-90 z-0"></div>
      
      {/* Карусель */}
      <Slider {...settings}>
        {featuredNews.map((news, index) => (
          <div key={news.id} className="relative h-screen">
            {/* Фоновое изображение с параллакс-эффектом */}
            <div 
              className="absolute inset-0 bg-cover bg-center transform scale-110 transition-transform duration-10000 ease-out"
              style={{ 
                backgroundImage: `url(${news.image || '/default-news-image.jpg'})`,
                transform: index === currentSlide ? 'scale(1)' : 'scale(1.1)'
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            </div>
            
            {/* Контент с анимацией */}
            <div className="relative z-10 h-full flex flex-col justify-center p-8 text-white">
              <div className="container mx-auto max-w-6xl">
                <div className={`transition-all duration-1000 delay-300 ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <span className="inline-block bg-white bg-opacity-20 text-white px-4 py-1 rounded-full text-sm mb-4 backdrop-blur-sm">
                    Новость #{index + 1}
                  </span>
                  <h3 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{news.title}</h3>
                  <p className="text-xl md:text-2xl max-w-3xl mb-8 text-blue-100">{news.short_description}</p>
                  <div className="flex space-x-4">
                    <a 
                      href={`/news/${news.id}`}
                      className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full self-start hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
                    >
                      Читать далее
                    </a>
                    <button className="inline-flex items-center text-white bg-white bg-opacity-20 px-6 py-3 rounded-full hover:bg-opacity-30 transition-all duration-300 backdrop-blur-sm">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Смотреть видео
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Индикатор текущего слайда */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 hidden md:block">
        <div className="flex items-center space-x-2 text-white">
          <span className="text-xl">{currentSlide + 1}</span>
          <span className="text-blue-300">/</span>
          <span className="text-blue-300">{featuredNews.length}</span>
        </div>
      </div>

      {/* Кнопки соцсетей */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 hidden lg:flex flex-col space-y-4">
        <button className="bg-white bg-opacity-20 p-3 rounded-full hover:bg-opacity-30 transition backdrop-blur-sm">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </button>
        <button className="bg-white bg-opacity-20 p-3 rounded-full hover:bg-opacity-30 transition backdrop-blur-sm">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
        </button>
        <button className="bg-white bg-opacity-20 p-3 rounded-full hover:bg-opacity-30 transition backdrop-blur-sm">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </button>
      </div>

      {/* Кнопка прокрутки вниз */}
      <button 
        className="absolute bottom-8 right-8 z-20 text-white bg-white bg-opacity-20 p-3 rounded-full hover:bg-opacity-30 transition backdrop-blur-sm animate-bounce hidden lg:block"
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </div>
  );
};

export default NewsCarousel;