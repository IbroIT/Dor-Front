import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaShoppingBag, FaBars, FaTimes } from 'react-icons/fa';
import { useGSAP } from '@gsap/react';

const Header = ({ isMenuOpen, toggleMenu }) => {
  // Рефы для анимации
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const buttonRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Функция для плавной прокрутки
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: `#${sectionId}`,
          offsetY: 100, // Учитываем высоту хедера
          autoKill: true
        },
        ease: "power2.inOut"
      });
    }
    
    // Закрываем меню на мобильных устройствах
    if (isMenuOpen) toggleMenu();
  };

  // Анимация элементов хедера
  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(logoRef.current, {
      opacity: 0,
      x: -50,
      duration: 0.7,
      ease: "power3.out"
    });

  },[])

  // Анимация мобильного меню
  useEffect(() => {
    if (isMenuOpen && mobileMenuRef.current) {
      gsap.from(mobileMenuRef.current.children, {
        opacity: 0,
        y: 20,
        ease:'power3.inOut',
        duration: 0.3
      });
    }
  }, [isMenuOpen]);

  return (
    <header ref={headerRef} className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Логотип */}
          <div ref={logoRef} className="flex items-center cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="bg-blue-800 text-white w-12 h-12 rounded-full flex items-center justify-center mr-3">
              <FaShoppingBag className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blue-800">Рынок Аламедин</h1>
              <p className="text-gray-600 text-sm">Крупнейший вещевой рынок в Бишкеке</p>
            </div>
          </div>
          
          {/* Десктопная навигация */}
          <nav ref={navRef} className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('hero')}
              className="nav-link text-blue-800 font-medium hover:text-blue-600 transition"
            >
              Главная
            </button>
            <button 
              onClick={() => scrollToSection('products')}
              className="nav-link text-gray-600 hover:text-blue-600 transition"
            >
              Товары
            </button>
            <button 
              onClick={() => scrollToSection('shops')}
              className="nav-link text-gray-600 hover:text-blue-600 transition"
            >
              Магазины
            </button>
            <button 
              onClick={() => scrollToSection('map')}
              className="nav-link text-gray-600 hover:text-blue-600 transition"
            >
              Схема рынка
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="nav-link text-gray-600 hover:text-blue-600 transition"
            >
              О нас
            </button>
            <button 
              onClick={() => scrollToSection('contacts')}
              className="nav-link text-gray-600 hover:text-blue-600 transition"
            >
              Контакты
            </button>
          </nav>
          
          {/* Кнопка "Найти магазин" */}
         
          
          {/* Кнопка мобильного меню */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        
        {/* Мобильное меню */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t mt-2">
            <div ref={mobileMenuRef} className="flex flex-col space-y-3">
              <button 
                onClick={() => scrollToSection('#hero')}
                className="nav-mobile-link text-blue-800 font-medium py-2 px-4 text-left"
              >
                Главная
              </button>
              <button 
                onClick={() => scrollToSection('#tovars')}
                className="nav-mobile-link text-gray-600 hover:text-blue-600 transition py-2 px-4 text-left"
              >
                Товары
              </button>
              <button 
                onClick={() => scrollToSection('#shops')}
                className="nav-mobile-link text-gray-600 hover:text-blue-600 transition py-2 px-4 text-left"
              >
                Магазины
              </button>
              <button 
                onClick={() => scrollToSection('#map')}
                className="nav-mobile-link text-gray-600 hover:text-blue-600 transition py-2 px-4 text-left"
              >
                Схема рынка
              </button>
              <button 
                onClick={() => scrollToSection('#aboutus')}
                className="nav-mobile-link text-gray-600 hover:text-blue-600 transition py-2 px-4 text-left"
              >
                О нас
              </button>
              <button 
                onClick={() => scrollToSection('#contacts')}
                className="nav-mobile-link text-gray-600 hover:text-blue-600 transition py-2 px-4 text-left"
              >
                Контакты
              </button>
             
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;