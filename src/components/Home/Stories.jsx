import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EpicStoryPage = () => {
  const [activeYear, setActiveYear] = useState(0);
  const containerRef = useRef(null);
  const timelineRefs = useRef([]);
  const statsRefs = useRef([]);
  const contentRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const mainTitleRef = useRef(null);
  const statsTitleRef = useRef(null);
  const sectionRefs = useRef([]);

  const timelineData = [
    {
      year: "1995",
      title: "Основание компании",
      description: "Дордой начинает свою историю как небольшая торговая компания в Бишкеке.",
      image: "https://cdn-1.aki.kg/st_runews/.storage/runews3/images/Aida/81a8102b7655ee198e4d0d21463d690b.JPG",
      achievements: ["Первые торговые операции", "10 сотрудников в штате"],
      bgColor: "bg-gradient-to-br from-blue-900 to-blue-800"
    },
    {
      year: "2000",
      title: "Первый крупный проект",
      description: "Завершение строительства первого торгового комплекса площадью 5000 м².",
      image: "https://www.utrk.kg/img/thumbnail/892881739968112_big.png",
      achievements: ["Площадь 5000 м²", "50 новых рабочих мест"],
      bgColor: "bg-gradient-to-br from-yellow-600 to-yellow-500"
    },
    {
      year: "2006",
      title: "Экспансия на международные рынки",
      description: "Открытие представительств в 3 странах Центральной Азии.",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/7c/45/99/caption.jpg?w=1200&h=1200&s=1",
      achievements: ["5 филиалов", "200+ сотрудников"],
      bgColor: "bg-gradient-to-br from-blue-800 to-blue-700"
    },
    {
      year: "2018",
      title: "Современный торговый центр",
      description: "Запуск флагманского торгового центра с инновационными технологиями.",
      image: "https://cdn-1.aki.kg/st_runews/.storage/runews/images/dordoiplaza/28b0489b63e169ddbc77e560986e6e70.jpg",
      achievements: ["Площадь 25000 м²", "300 магазинов", "Кинотеатр и фудкорт"],
      bgColor: "bg-gradient-to-br from-yellow-500 to-yellow-400"
    },
    {
      year: "2023",
      title: "Лидер рынка",
      description: "Дордой признан лидером в сфере торговой недвижимости в регионе.",
      image: "https://avatars.mds.yandex.net/get-altay/6319069/2a0000017f976787c1c7068474d2aeb58660/orig",
      achievements: ["1 место в рейтинге", "5000+ сотрудников", "5 млн посетителей ежегодно"],
      bgColor: "bg-gradient-to-br from-blue-700 to-blue-600"
    }
  ];

  useEffect(() => {
    // Анимация основного заголовка
    gsap.fromTo(mainTitleRef.current, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: mainTitleRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // Анимация точек таймлайна
    timelineRefs.current.forEach((el, index) => {
      if (!el) return;
      
      gsap.fromTo(el,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    // Анимация контентного блока
    gsap.fromTo(textRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    gsap.fromTo(imageRef.current,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // Анимация заголовка статистики
    gsap.fromTo(statsTitleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsTitleRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // Анимация карточек статистики
    statsRefs.current.forEach((el, index) => {
      if (!el) return;
      
      gsap.fromTo(el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: '.stats-section',
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    // Анимация счетчиков
// Оптимизированная анимация счетчиков
const animateCounters = () => {
  const counters = [
    { id: 'years-counter', target: 28, duration: 1.5 },
    { id: 'employees-counter', target: 5000, duration: 2 },
    { id: 'area-counter', target: 25000, duration: 2.2 },
    { id: 'visitors-counter', target: 5000000, duration: 2.5 }
  ];

  counters.forEach(counter => {
    const element = document.getElementById(counter.id);
    if (!element) return;

    // Используем requestAnimationFrame для максимальной производительности
    const startTime = performance.now();
    const startValue = 0;
    const endValue = counter.target;
    const duration = counter.duration * 1000; // в миллисекундах

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentValue = Math.floor(progress * endValue);
      
      element.textContent = currentValue.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Добавляем небольшой bounce-эффект в конце
        gsap.to(element, {
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: "power1.out"
        });
      }
    };

    requestAnimationFrame(animate);
  });
};

// В триггере ScrollTrigger заменяем вызов на:
ScrollTrigger.create({
  trigger: '.stats-section',
  start: 'top 75%',
  onEnter: animateCounters,
  once: true,
  markers: false // Отключаем маркеры в продакшене
});

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Автоматическая смена лет
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveYear(prev => (prev + 1) % timelineData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800 font-sans overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4 py-16 relative">
        <div className="pattern-dots pattern-blue-500 pattern-bg-white pattern-size-6 pattern-opacity-20 w-full h-full absolute top-0 left-0 opacity-10 pointer-events-none"></div>

        <div className="my-24 relative z-10">
          <h2 ref={mainTitleRef} className="text-4xl md:text-5xl font-bold text-center mb-16 text-blue-900">
            Наш <span className="text-yellow-500">путь</span>
          </h2>

          <div className="relative flex flex-wrap justify-between items-center mb-20">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0 hidden md:block"></div>
            {timelineData.map((item, index) => (
              <div
                key={index}
                ref={el => timelineRefs.current[index] = el}
                className={`relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center font-bold text-lg cursor-pointer transition-all duration-300 ${
                  activeYear === index 
                    ? 'bg-blue-600 text-white scale-110 shadow-xl shadow-blue-500/40 ring-4 ring-yellow-400' 
                    : 'bg-gray-100 text-gray-800 hover:bg-blue-100 hover:scale-105'
                }`}
                onClick={() => setActiveYear(index)}
              >
                {item.year}
                {activeYear === index && (
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-600 rotate-45" />
                )}
              </div>
            ))}
          </div>

          <div ref={contentRef} className={`flex flex-col lg:flex-row gap-8 rounded-2xl overflow-hidden shadow-2xl ${timelineData[activeYear].bgColor} text-white`}>
            <div ref={textRef} className="lg:w-1/2 p-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{timelineData[activeYear].title}</h2>
              <p className="text-lg md:text-xl mb-8 leading-relaxed">{timelineData[activeYear].description}</p>
              <ul className="space-y-4">
                {timelineData[activeYear].achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start">
                    <span className="flex-shrink-0 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center text-sm mr-3 mt-1 text-blue-900 font-bold">✓</span>
                    <span className="text-lg">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div ref={imageRef} className="lg:w-1/2 relative">
              <img
                src={timelineData[activeYear].image}
                alt={timelineData[activeYear].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-8 border-white opacity-30 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="stats-section my-32 py-20 px-6 rounded-3xl bg-gradient-to-r from-blue-900 to-blue-700 text-white relative overflow-hidden">
          <div className="pattern-grid pattern-blue-400 pattern-bg-transparent pattern-size-20 pattern-opacity-100 absolute inset-0 opacity-20"></div>
          <div className="relative z-10">
            <h2 ref={statsTitleRef} className="text-3xl md:text-5xl font-bold mb-16 text-center">
              Дордой <span className="text-yellow-400">в цифрах</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { id: 'years-counter', value: '0', label: 'Лет на рынке', icon: '🕰️' },
                { id: 'employees-counter', value: '0', label: 'Сотрудников', icon: '👥' },
                { id: 'area-counter', value: '0', label: 'м² торговых площадей', icon: '🏢' },
                { id: 'visitors-counter', value: '0', label: 'Посетителей ежегодно', icon: '👣' }
              ].map((stat, index) => (
                <div
                  key={stat.id}
                  ref={el => statsRefs.current[index] = el}
                  className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-xl border border-white border-opacity-20 transition-all hover:bg-opacity-20 hover:shadow-lg"
                >
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div id={stat.id} className="text-5xl font-bold mb-2 text-yellow-300">{stat.value}</div>
                  <div className="text-xl">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpicStoryPage;