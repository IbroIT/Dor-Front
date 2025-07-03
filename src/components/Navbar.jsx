import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navItems = [
    { title: 'Главная', path: '/', icon: '🏠' },
    {
      title: 'О нас',
      path: '/about',
      icon: 'ℹ️',
      subItems: [
        { title: 'История ассоциации', path: '/about/history' },
        { title: 'Миссия и цели', path: '/about/mission' },
        { title: 'Руководство', path: '/about/leadership' },
        { title: 'Организационная структура', path: '/about/structure' },
      ],
    },
    {
      title: 'Рынки',
      icon: '🏪',
      subItems: [
        { title: 'Рынок «Дордой»', path: '/markets/dordoi', website: 'https://www.exportasia.ru/'},
        { title: 'Рынок "Аламедин"', path: '/markets/alamedin' },
        { title: 'Рынок "Дордой Моторс"', path: '/markets/dordoi-motors' },
        { title: 'Рынок «Мадина»', path: '/markets/madina', website: 'https://www.exportasia.ru/%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD%D1%8B/%D0%BC%D0%B0%D0%B4%D0%B8%D0%BD%D0%B0' },
        { title: 'ТЦ «Dordoi Plaza»', path: '/markets/dordoi-plaza' , website:'https://dordoiplaza.kg/'},
      ],
    },
    {
      title: 'Партнёры',
      path: '/partners',
      icon: '🤝',
      subItems: [
        { title: 'Текущие партнёры', path: '../pages/partners/CurrentPartners' },
        { title: 'Международные проекты', path: '../pages/partners/InternationalProjects' },
        { title: 'Партнёрство и сотрудничество', path: '../pages/partners/Cooperation' },
        { title: 'Благодарственные письма', path: '../pages/partners/ThankLetters' },
      ],
    },
    {
      title: 'Новости',
      path: '/news',
      icon: '📰',
      subItems: [
        { title: 'Новости рынков', path: '../pages/news/News' },
        { title: 'Пресс-релизы', path: '../pages/news/Press' },
        { title: 'Архив', path: '../pages/news/Archive' },
      ],
    },
    {
      title: 'Образование',
      path: '/education',
      icon: '🎓',
      subItems: [
        { title: 'Салымбеков университет колледж IT и Бизнеса', path: 'https://salymbekov.com' },
        { title: 'Медицина', path: 'https://salymbekov.com' },
        { title: 'Американский институт технологий', path: 'https://www.aitkg.com/' },
      ],
    },
    {
      title: 'Документы',
      icon: '📂',
      subItems: [
        { title: 'Устав и внутренние положения', path: '/documents/statute' },
        { title: 'Сертификаты и лицензии', path: '/documents/certificates' },
      ],
    },
    {
      title: 'Контакты',
      path: '/contacts',
      icon: '📞',
      subItems: [
        { title: 'Центральный офис', path: '/contacts/office' },
        { title: 'Адреса рынков и ТЦ', path: '/contacts/addresses' },
        { title: 'Телефоны и email', path: '/contacts/phones' },
        { title: 'Онлайн-форма связи', path: '/contacts/form' },
        { title: 'Карта проезда', path: '/contacts/map' },
      ],
    },
  ];

  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setActiveSubmenu(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSubmenu = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  const closeAllMenus = () => {
    setActiveSubmenu(null);
    setMobileMenuOpen(false);
  };

  return (
    <nav ref={navbarRef} className="bg-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.subItems ? (
                  <div className="relative">
                    <div className="flex items-center">
                      <Link
                        to={item.path}
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${activeSubmenu === index ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`}
                        onClick={closeAllMenus}
                      >
                        <span className="mr-2">{item.icon}</span>
                        {item.title}
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSubmenu(index);
                        }}
                        className="p-1 text-gray-500 hover:text-gray-700"
                      >
                        <svg
                          className={`h-4 w-4 transform transition-transform ${activeSubmenu === index ? 'rotate-180' : ''}`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>

                    <div
                      className={`absolute left-0 mt-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 ${activeSubmenu === index ? 'block' : 'hidden'} group-hover:block hover:block`}
                    >
                      <div className="py-1">
                          {item.subItems.map((subItem, subIndex) =>
                            subItem.website ? (
                              <a
                                key={subIndex}
                                href={subItem.website}
                                rel="noopener noreferrer"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                                onClick={closeAllMenus}
                              >
                                {subItem.title}
                              </a>
                            ) : (
                              <Link
                                key={subIndex}
                                to={subItem.path}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                                onClick={closeAllMenus}
                              >
                                {subItem.title}
                              </Link>
                            )
                          )}
                      </div>

                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${activeSubmenu === index ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`}
                    onClick={closeAllMenus}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          {navItems.map((item, index) => (
            <div key={index}>
              {item.subItems ? (
                <>
                  <div className="flex items-center">
                    <Link
                      to={item.path}
                      className={`flex-1 flex items-center px-3 py-2 rounded-md text-base font-medium ${activeSubmenu === index ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`}
                      onClick={closeAllMenus}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.title}
                    </Link>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSubmenu(index);
                      }}
                      className="p-2 text-gray-500 hover:text-gray-700"
                    >
                      <svg
                        className={`h-5 w-5 transform transition-transform ${activeSubmenu === index ? 'rotate-180' : ''}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  {activeSubmenu === index && (
                    <div className="pl-6 pt-1 space-y-1">
                      {item.subItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                          onClick={closeAllMenus}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`w-full flex items-center px-3 py-2 rounded-md text-base font-medium ${activeSubmenu === index ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`}
                  onClick={closeAllMenus}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;