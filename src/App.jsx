import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, lazy, Suspense } from 'react';
import '../src/components/Nav.css';
import ScrollToTop from "./components/Home/ScrollToTop";

// Главная страница загружается сразу
import Home from "./pages/Home";

// Остальные страницы - ленивая загрузка
const Football = lazy(() => import("./pages/Football"));
const University = lazy(() => import("./pages/University"));
const Plaza = lazy(() => import("./pages/Plaza"));
const NotFound = lazy(() => import("./NotFound"));

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", name: "Главная", iconUrl: "https://static-00.iconduck.com/assets.00/home-icon-512x512-oxfgvghl.png" },
    { path: "/football", name: "Футбол", iconUrl: "https://cdn-icons-png.flaticon.com/512/4498/4498011.png" },
    { path: "/university", name: "Университет", iconUrl: "https://images.freeimages.com/fic/images/icons/2770/ios_7_icons/512/university.png" },
    { path: "/plaza", name: "Плаза", iconUrl: "https://icon-library.com/images/shopping-icon-png/shopping-icon-png-0.jpg" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prefetch для страниц при наведении
  const prefetchPage = (path) => {
    switch(path) {
      case '/football': import("./pages/Football"); break;
      case '/university': import("./pages/University"); break;
      case '/plaza': import("./pages/Plaza"); break;
      default: break;
    }
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50' 
          : 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100/30'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" className="flex items-center">
            <motion.img
              src="/img/logo.png"
              alt="logo"
              className="w-12 h-12 rounded-full bg-black"
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring" }}
            /><span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent hidden md:inline">
              Dordoi
            </span>
          </Link>
        </motion.div>
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to={item.path} 
                className="relative px-5 py-3 font-medium flex items-center group"
                onMouseEnter={() => prefetchPage(item.path)}
              >
                <span className="w-5 h-5 bg-no-repeat bg-center bg-contain inline-block mr-[6px] mb-[3px]" style={{ backgroundImage: `url(${item.iconUrl})` }} />
   
                <span className={`transition-colors ${
                  location.pathname === item.path 
                    ? 'text-blue-600 font-semibold' 
                    : 'text-gray-600 hover:text-blue-500'
                }`}>
                  {item.name}
                </span>
                
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.button 
          className="md:hidden p-2 rounded-lg bg-gray-100 relative z-50"
          whileHover={{ backgroundColor: "#E5E7EB" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </motion.button>

        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-lg pt-20 px-6 z-40 md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <motion.div
                  key={item.path}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring" }}
                >
                  <Link 
                    to={item.path} 
                    className="flex items-center px-6 text-xl rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                    onMouseEnter={() => prefetchPage(item.path)}
                  >
                    <span className="w-5 h-5 bg-no-repeat bg-center bg-contain inline-block mr-[6px] mb-[3px]" style={{ backgroundImage: `url(${item.iconUrl})` }} />
                    <span className={`font-medium ${
                      location.pathname === item.path 
                        ? 'text-blue-600' 
                        : 'text-gray-700'
                    }`}>
                      {item.name}
                    </span>
                    {location.pathname === item.path && (
                      <motion.div
                        layoutId="mobileNavIndicator"
                        className="ml-auto w-2 h-2 bg-blue-600 rounded-full"
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

function App() {
  return (
    <main className="overflow-x-hidden min-h-screen relative">
      <Router>
        <ScrollToTop /> 
        <Navbar />
        
        {/* Hero Section */}
        <div className="pt-20">
          <Suspense fallback={
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/university" element={<University />} />
              <Route path="/football" element={<Football />} />
              <Route path="/plaza" element={<Plaza />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </Router>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          20% { transform: translate(-20px, -10px) rotate(2deg); }
          40% { transform: translate(20px, -20px) rotate(-3deg); }
          60% { transform: translate(-20px, 20px) rotate(3deg); }
          80% { transform: translate(15px, 10px) rotate(-2deg); }
        }
      `}</style>
    </main>
  );
}

export default App;