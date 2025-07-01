import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '/img/logo.png'; // Adjust the path as necessary

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const navItems = [
    { title: 'Главная', path: '/' },
    {
      title: 'О нас',
      path: '/about',
      subItems: [
        { title: 'История ассоциации', path: '/about/history' },
        { title: 'Миссия и цели', path: '/about/mission' },
        { title: 'Руководство', path: '/about/leadership' },
        { title: 'Организационная структура', path: '/about/structure' },
      ],
    },
    {
      title: '🏪 Рынки',
      path: '/markets',
      subItems: [
        { title: 'Рынок «Дордой»', path: '/markets/dordoi' },
        { title: 'Рынок "Аламедин"', path: '/markets/alamedin' },
        { title: 'Рынок "Дордой Моторс"', path: '/markets/dordoi-motors' },
        { title: 'Рынок «Мадина»', path: '/markets/madina' },
        { title: 'ТЦ «Dordoi Plaza»', path: '/markets/dordoi-plaza' },
        { title: 'Условия аренды', path: '/markets/rent' },
        { title: 'Интерактивная карта', path: '/markets/map' },
        { title: 'Часто задаваемые вопросы', path: '/markets/faq' },
      ],
    },
    {
      title: '🤝 Партнёры',
      path: '/partners',
      subItems: [
        { title: 'Текущие партнёры', path: '/partners/current' },
        { title: 'Международные проекты', path: '/partners/international' },
        { title: 'Партнёрство и сотрудничество', path: '/partners/cooperation' },
        { title: 'Благодарственные письма', path: '/partners/letters' },
      ],
    },
    {
      title: '📰 Новости',
      path: '/news',
      subItems: [
        { title: 'Новости рынков', path: '/news/market-news' },
        { title: 'Пресс-релизы', path: '/news/press' },
        { title: 'Архив', path: '/news/archive' },
      ],
    },
    {
      title: '🎓 Образование',
      path: '/education',
      subItems: [
        { title: 'Салымбеков университет колледж IT и Бизнеса', path: '/education/university' },
        { title: 'Медицина', path: '/education/medicine' },
        { title: 'AIT', path: '/education/ait' },
      ],
    },
    {
      title: '📂 Документы',
      path: '/documents',
      subItems: [
        { title: 'Устав и внутренние положения', path: '/documents/statute' },
        { title: 'Сертификаты и лицензии', path: '/documents/certificates' },
      ],
    },
    {
      title: '📞 Контакты',
      path: '/contacts',
      subItems: [
        { title: 'Центральный офис', path: '/contacts/office' },
        { title: 'Адреса рынков и ТЦ', path: '/contacts/addresses' },
        { title: 'Телефоны и email', path: '/contacts/phones' },
        { title: 'Онлайн-форма связи', path: '/contacts/form' },
        { title: 'Карта проезда', path: '/contacts/map' },
      ],
    },
  ];

  return (
    <nav 
      ref={navbarRef}
      className={`navbar ${isScrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}
    >
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Dordoi Logo" className="logo-image" />
        </Link>

        <div 
          className={`navbar-toggle ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-list">
            {navItems.map((item, index) => (
              <li 
                key={index}
                className={`navbar-item ${activeDropdown === index ? 'active' : ''}`}
                onMouseEnter={() => window.innerWidth > 992 && item.subItems && setActiveDropdown(index)}
                onMouseLeave={() => window.innerWidth > 992 && setActiveDropdown(null)}
              >
                <Link 
                  to={item.path}
                  className={`navbar-link ${location.pathname === item.path ? 'active-link' : ''}`}
                  onClick={() => {
                    if (item.subItems && window.innerWidth <= 992) {
                      toggleDropdown(index);
                    } else {
                      setMobileMenuOpen(false);
                    }
                  }}
                >
                  <span className="link-text">{item.title}</span>
                  {item.subItems && (
                    <span className="dropdown-arrow">
                      <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </span>
                  )}
                </Link>

                {item.subItems && (
                  <div className={`dropdown-container ${activeDropdown === index ? 'show' : ''}`}>
                    <ul className="dropdown-menu">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex} className="dropdown-item">
                          <Link 
                            to={subItem.path}
                            className={`dropdown-link ${location.pathname === subItem.path ? 'active-dropdown-link' : ''}`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;