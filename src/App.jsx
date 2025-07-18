import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

// О нас
import History from './pages/about/History';
import Mission from './pages/about/Mission';
import Leadership from './pages/about/Leadership';
import Structure from './pages/about/Structure';

// Рынки
import AlamedinMarket from './pages/markets/AlamedinMarket';
import DordoiMotors from './pages/markets/DordoiMotors';

// Партнёры
import Partners from './pages/partners/Partners';
import CurrentPartners from './pages/partners/CurrentPartners';
import InternationalProjects from './pages/partners/InternationalProjects';
import Cooperation from './pages/partners/Cooperation';
import ThankLetters from './pages/partners/ThankLetters';

// Новости
import NewsCategory from './pages/news/NewsCategory';
import PressReleases from './pages/news/PressReleases';
import NewsArchive from './pages/news/NewsArchive';


// Образование
import Education from './pages/University';

// Документы
import Statute from './pages/documents/Statute';
import Certificates from './pages/documents/Certificates';

// Контакты
import Contacts from './pages/contacts/Contacts';
import CentralOffice from './pages/contacts/CentralOffice';
import MarketAddresses from './pages/contacts/MarketAddresses';
import PhonesAndEmail from './pages/contacts/PhonesAndEmail';

// Дополнительные страницы
import Football from './pages/Football';


function App() {
  return (
    <main className="overflow-x-hidden min-h-screen relative">
      <Router>
        <Navbar />
<Routes>
  <Route path="/" element={<Home />} />
  
  {/* О нас */}
  <Route path="/about/history" element={<History />} />
  <Route path="/about/mission" element={<Mission />} />
  <Route path="/about/leadership" element={<Leadership />} />
  <Route path="/about/structure" element={<Structure />} />
  
  {/* Рынки */}
  <Route path="/markets/alamedin" element={<AlamedinMarket />} />
  <Route path="/markets/dordoi-motors" element={<DordoiMotors />} />
  
  {/* Партнёры */}
  <Route path="/partners" element={<Partners />} />
  <Route path="/partners/current" element={<CurrentPartners />} />
  <Route path="/partners/international" element={<InternationalProjects />} />
  <Route path="/partners/cooperation" element={<Cooperation />} />
  <Route path="/partners/letters" element={<ThankLetters />} />
  
  {/* Новости */}
  <Route path="/news" element={<NewsCategory />} />
  <Route path="/news/press" element={<PressReleases />} />
  <Route path="/news/archive" element={<NewsArchive />} />
  
  {/* Образование */}
  <Route path="/education" element={<Education />} />
  
  {/* Документы */}
  <Route path="/documents/statute" element={<Statute />} />
  <Route path="/documents/certificates" element={<Certificates />} />
  
  {/* Контакты */}
  <Route path="/contacts" element={<Contacts />} />
  <Route path="/contacts/office" element={<CentralOffice />} />
  <Route path="/contacts/addresses" element={<MarketAddresses />} />
  <Route path="/contacts/phones" element={<PhonesAndEmail />} />
  
  {/* Дополнительные роуты из примера */}
  <Route path="/football" element={<Football />} />
</Routes>
      </Router>
    </main>
  );
}

export default App;