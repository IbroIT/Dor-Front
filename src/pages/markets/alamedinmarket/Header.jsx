import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { FaShoppingBag, FaBars, FaTimes } from 'react-icons/fa';

const Header = ({ isMenuOpen, toggleMenu }) => {
  const headerRef = useRef(null)
  const logoRef = useRef(null)
  const navRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(logoRef.current, {
      opacity: 0,
      x: -30,
      duration: 0.7,
      ease:'power3.inOut'
    })
    tl.fromTo('.a',
      {
        opacity: 0,
        y: 15
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: "power2.out"
      },[])
  })

  return (
    <header ref={headerRef} className="bg-white shadow-md top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div  ref={logoRef} className="flex items-center">
            <div  className="bg-blue-800 text-white w-12 h-12 rounded-full flex items-center justify-center mr-3">
              <FaShoppingBag className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blue-800">Рынок Аламедин</h1>
              <p className="text-gray-600 text-sm">Крупнейший вещевой рынок в Бишкеке</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav  ref={navRef} className="hidden md:flex space-x-8">
            <a href="#" className="a text-blue-800 font-medium hover:text-blue-600 transition">Главная</a>
            <a href="#tovars" className="a text-gray-600 hover:text-blue-600 transition">Товары</a>
            <a href="#shops" className="a text-gray-600 hover:text-blue-600 transition">Магазины</a>
            <a href="#map" className="a text-gray-600 hover:text-blue-600 transition">Схема рынка</a>
            <a href="#aboutus" className="a text-gray-600 hover:text-blue-600 transition">О нас</a>
            <a href="#contacts" className="a text-gray-600 hover:text-blue-600 transition">Контакты</a>
          </nav>
          
         
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t mt-2">
            <div className="flex flex-col space-y-3">
              <a href="#" className="text-blue-800 font-medium">Главная</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition">Товары</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition">Магазины</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition">Схема рынка</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition">О нас</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition">Контакты</a>
              
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;