import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);

  // Навигационные элементы
  const navItems = useMemo(() => [
    { title: 'Главная', path: '/', icon: '🏠', exact: true },
    {
      title: 'О нас',
      icon: 'ℹ️',
      subItems: [
        { title: 'История ассоциации', path: '/about/history' },
        { title: 'Миссия и цели', path: '/about/mission' },
        { title: 'Руководство', path: '/about/leadership' },
        { title: 'Организационная структура', path: '/about/structure' },
        { title: 'Футбольный клуб', path: 'https://fc-dordoi.kg', external: true },
      ],
    },
    {
      title: 'Рынки',
      icon: '🏪',
      subItems: [
        { title: 'Рынок «Дордой»', path: '/markets/dordoi', external: true, website: 'https://www.exportasia.ru/'},
        { title: 'Рынок "Аламедин"', path: '/markets/alamedin' },
        { title: 'Рынок "Дордой Моторс"', path: '/markets/dordoi-motors' },
        { title: 'Рынок «Мадина»', path: '/markets/madina', external: true, website: 'https://www.exportasia.ru/%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD%D1%8B/%D0%BC%D0%B0%D0%B4%D0%B8%D0%BD%D0%B0' },
        { title: 'ТЦ «Dordoi Plaza»', path: '/markets/dordoi-plaza', external: true, website:'https://dordoiplaza.kg/'},
      ],
    },
    {
      title: 'Партнёры',
      icon: '🤝',
      subItems: [
        { title: 'Текущие партнёры', path: '/partners/current' },
        { title: 'Международные проекты', path: '/partners/international' },
        { title: 'Партнёрство и сотрудничество', path: '/partners/cooperation' },
        { title: 'Благодарственные письма', path: '/partners/letters' },
      ],
    },
    {
      title: 'Новости',
      icon: '📰',
      subItems: [
        { title: 'Новости рынков', path: '/news' },
        { title: 'Пресс-релизы', path: '/news/press' },
        { title: 'Архив', path: '/news/archive' },
      ],
    },
    {
      title: 'Образование',
      icon: '🎓',
      subItems: [
        { title: 'Университет', path: '/education', external: true },
        { title: 'Салымбеков университет', path: 'https://salymbekov.com', external: true },
        { title: 'Медицинский колледж', path: 'https://salymbekov.com', external: true },
        { title: 'Американский институт', path: 'https://www.aitkg.com/', external: true },
      ],
    },
    {
      title: 'Документы',
      icon: '📂',
      subItems: [
        { title: 'Устав и положения', path: '/documents/statute' },
        { title: 'Сертификаты', path: '/documents/certificates' },
      ],
    },
    {
      title: 'Контакты',
      icon: '📞',
      subItems: [
        { title: 'Контакты', path: '/contacts' },
        { title: 'Центральный офис', path: '/contacts/office' },
        { title: 'Адреса рынков', path: '/contacts/addresses' },
        { title: 'Телефоны', path: '/contacts/phones' }
      ],
    },
  ], []);

  // Социальные сети
  const socialLinks = useMemo(() => [
    { name: 'Facebook', icon: 'facebook', url: '#', color: 'text-blue-600 hover:text-blue-800' },
    { name: 'Instagram', icon: 'instagram', url: '#', color: 'text-pink-600 hover:text-pink-800' },
    { name: 'YouTube', icon: 'youtube', url: '#', color: 'text-red-600 hover:text-red-800' },
    { name: 'Telegram', icon: 'telegram', url: '#', color: 'text-blue-500 hover:text-blue-700' },
  ], []);

  // Проверка активного пути
  const isActiveLink = useCallback((path, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
  }, [location.pathname]);

  // Обработчики событий
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  const toggleSubmenu = useCallback((index) => {
    setActiveSubmenu(prev => prev === index ? null : index);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
    if (menuOpen) setActiveSubmenu(null);
  }, [menuOpen]);

  const handleLogoClick = useCallback(() => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  // Эффекты
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setActiveSubmenu(null);
  }, [location]);

  // Анимации
  const animations = {
    nav: {
      hidden: { y: -100, opacity: 0 },
      visible: { 
        y: 0, 
        opacity: 1,
        transition: { 
          type: 'spring', 
          stiffness: 300,
          damping: 20
        }
      }
    },
    menuButton: {
      open: { rotate: 90 },
      closed: { rotate: 0 }
    },
    menuIcon: {
      top: {
        open: { rotate: 45, y: 7 },
        closed: { rotate: 0, y: 0 }
      },
      middle: {
        open: { opacity: 0, x: -20 },
        closed: { opacity: 1, x: 0 }
      },
      bottom: {
        open: { rotate: -45, y: -7 },
        closed: { rotate: 0, y: 0 }
      }
    },
    menu: {
      open: {
        x: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 25,
          staggerChildren: 0.05,
          delayChildren: 0.1
        }
      },
      closed: {
        x: '100%',
        opacity: 0,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 30,
          when: "afterChildren"
        }
      }
    },
    menuItem: {
      open: {
        y: 0,
        opacity: 1,
        transition: {
          y: { stiffness: 500, velocity: -100 }
        }
      },
      closed: {
        y: 20,
        opacity: 0,
        transition: {
          y: { stiffness: 500 }
        }
      }
    },
    submenu: {
      open: {
        height: 'auto',
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 20,
          staggerChildren: 0.05,
          delayChildren: 0.1
        }
      },
      closed: {
        height: 0,
        opacity: 0,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 20,
          when: "afterChildren"
        }
      }
    },
    submenuItem: {
      open: {
        x: 0,
        opacity: 1,
        transition: {
          x: { stiffness: 500, velocity: -100 }
        }
      },
      closed: {
        x: 20,
        opacity: 0,
        transition: {
          x: { stiffness: 500 }
        }
      }
    },
    logo: {
      hover: { scale: 1.1, rotate: 10 },
      tap: { scale: 0.95 }
    }
  };

  // Рендер элементов меню
  const renderMenuItems = (isMobile = false) => (
    <motion.ul className={`space-y-2 ${isMobile ? '' : 'group'}`}>
      {navItems.map((item, index) => (
        <motion.li
          key={index}
          variants={animations.menuItem}
          className={`${isMobile ? 'border-b border-gray-100 last:border-0' : 'group'}`}
        >
          {item.subItems ? (
            <>
              <motion.div 
                className={`flex items-center justify-between p-3 rounded-lg ${
                  isMobile ? '' : 'hover:bg-gray-50 group-hover:bg-gray-50'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={item.path || '#'}
                  className={`flex-1 flex items-center text-base font-medium ${
                    isActiveLink(item.path)
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.title}
                </Link>
                <button
                  onClick={() => toggleSubmenu(index)}
                  className={`p-2 ${
                    isMobile ? 'text-gray-500 hover:text-gray-700' : 
                    'text-gray-500 hover:text-gray-700 group-hover:text-blue-600'
                  }`}
                  aria-label="Toggle submenu"
                >
                  <motion.svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    animate={{ rotate: activeSubmenu === index ? 180 : 0 }}
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </motion.svg>
                </button>
              </motion.div>

              <AnimatePresence>
                {activeSubmenu === index && (
                  <motion.div
                    variants={animations.submenu}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className={`${isMobile ? 'pl-12' : 'pl-4'} space-y-2`}
                  >
                    {item.subItems.map((subItem, subIndex) => (
                      <motion.div
                        key={subIndex}
                        variants={animations.submenuItem}
                        className={`${isMobile ? 'py-2' : 'py-1'}`}
                      >
                        {subItem.external ? (
                          <motion.a
                            href={subItem.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block px-3 py-2 rounded-md ${
                              isMobile ? 'text-base' : 'text-sm'
                            } font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50`}
                            whileTap={{ scale: 0.98 }}
                          >
                            {subItem.title}
                            <span className="ml-2 text-xs opacity-70">↗</span>
                          </motion.a>
                        ) : (
                          <Link
                            to={subItem.path}
                            className={`block px-3 py-2 rounded-md ${
                              isMobile ? 'text-base' : 'text-sm'
                            } font-medium ${
                              isActiveLink(subItem.path)
                                ? 'text-blue-600 bg-blue-50/80'
                                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                            }`}
                          >
                            {subItem.title}
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <motion.div 
              whileTap={{ scale: 0.98 }}
              className={`${isMobile ? '' : 'hover:bg-gray-50'} rounded-lg`}
            >
              <Link
                to={item.path}
                className={`flex items-center p-3 ${
                  isMobile ? 'text-base' : 'text-base'
                } font-medium ${
                  isActiveLink(item.path, item.exact)
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.title}
              </Link>
            </motion.div>
          )}
        </motion.li>
      ))}
    </motion.ul>
  );

  // Рендер контактов
  const renderContacts = (isMobile = false) => (
    <motion.div 
      className={`${isMobile ? 'pt-6 border-t border-gray-200' : 'pt-4 border-t border-gray-200'}`}
      variants={animations.menuItem}
    >
      <h3 className={`${
        isMobile ? 'text-sm' : 'sr-only'
      } font-semibold text-gray-500 uppercase tracking-wider mb-4`}>
        Контакты
      </h3>
      <div className={`${isMobile ? 'space-y-2' : 'flex items-center space-x-4'}`}>
        {isMobile ? (
          <>
            <a href="tel:+996312000000" className="flex items-center text-gray-600 hover:text-blue-600">
              <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +996 (312) 00-00-00
            </a>
            <a href="mailto:info@example.com" className="flex items-center text-gray-600 hover:text-blue-600">
              <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              info@example.com
            </a>
          </>
        ) : (
          <>
            <a href="tel:+996312000000" className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
            <div>
              <div className="text-xs text-gray-500">Контактный телефон</div>
              <a href="tel:+996312000000" className="text-sm font-medium text-gray-700 hover:text-blue-600">+996 (312) 00-00-00</a>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );

  // Рендер социальных сетей
  const renderSocialLinks = () => (
    <motion.div 
      className="pt-6 border-t border-gray-200"
      variants={animations.menuItem}
    >
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
        Мы в соцсетях
      </h3>
      <div className="flex space-x-4">
        {socialLinks.map((social, index) => (
          <motion.a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${social.color} transition-colors`}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            aria-label={social.name}
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              {social.icon === 'facebook' && (
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              )}
              {social.icon === 'instagram' && (
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              )}
              {social.icon === 'youtube' && (
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              )}
              {social.icon === 'telegram' && (
                <path d="M23.91 3.79L20.3 20.84c-.25 1.21-.98 1.5-2 .94l-5.5-4.07-2.66 2.57c-.3.3-.55.56-1.1.56-.72 0-.6-.27-.84-.95L6.3 13.7.85 12c-1.18-.35-1.19-1.16.26-1.75l21.26-8.2c.97-.43 1.9.24 1.53 1.73z" />
              )}
            </svg>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );

  return (
    <>
      {/* Основной Navbar */}
      <motion.nav 
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-lg py-0' : 'bg-white/95 backdrop-blur-sm py-2'
        }`}
        variants={animations.nav}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Логотип */}
            <motion.div 
              whileHover="hover"
              whileTap="tap"
              variants={animations.logo}
              className="flex-shrink-0 cursor-pointer"
              onClick={handleLogoClick}
              onMouseEnter={() => setIsHoveringLogo(true)}
              onMouseLeave={() => setIsHoveringLogo(false)}
            >
              <div className="flex items-center">
                <motion.img 
                  src="/img/logo.png" 
                  alt="Логотип" 
                  className='bg-black w-[60px] h-[60px] rounded-full'
                  animate={{
                    rotate: isHoveringLogo ? 10 : 0,
                    scale: isHoveringLogo ? 1.1 : 1
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
                {isScrolled && (
                  <motion.span 
                    className="ml-3 text-xl font-bold text-gray-800"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    Dordoi
                  </motion.span>
                )}
              </div>
            </motion.div>

            {/* Десктопные элементы (меню) */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                onClick={toggleMenu}
                className="flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Меню</span>
                <motion.span
                  animate={{ rotate: menuOpen ? 180 : 0 }}
                >
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.span>
              </motion.button>
            </div>

            {/* Мобильные элементы (бургер) */}
            <div className="flex items-center md:hidden">
              <motion.button
                onClick={toggleMenu}
                className="flex flex-col justify-center items-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
                variants={animations.menuButton}
                animate={menuOpen ? "open" : "closed"}
                aria-label="Меню"
              >
                <motion.span 
                  className="block w-6 h-[2px] bg-gray-700 mb-1.5"
                  variants={animations.menuIcon.top}
                />
                <motion.span 
                  className="block w-6 h-[2px] bg-gray-700 mb-1.5"
                  variants={animations.menuIcon.middle}
                />
                <motion.span 
                  className="block w-6 h-[2px] bg-gray-700"
                  variants={animations.menuIcon.bottom}
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Пустой div для отступа под Navbar */}
      <div className="h-20 w-full"></div>

      {/* Мобильное меню */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
          >
            <motion.div
              className="absolute top-16 right-0 w-full max-w-sm bg-white shadow-xl h-[80vh] overflow-y-auto"
              variants={animations.menu}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 py-6 space-y-6">
                {renderMenuItems(true)}
                {renderContacts(true)}
                {renderSocialLinks()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Десктопное меню */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/30 z-40 hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
          >
            <motion.div
              className="absolute top-20 right-4 w-80 bg-white rounded-xl shadow-2xl overflow-hidden"
              variants={animations.menu}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-h-[70vh] overflow-y-auto px-4 py-6 space-y-4">
                {renderMenuItems()}
                {renderContacts()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;