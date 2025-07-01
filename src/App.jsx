import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import University from "./pages/University";
import Football from "./pages/Football";
import Plaza from "./pages/Plaza";

function App() {
  return (
    <main className="overflow-x-hidden min-h-screen relative">
      <Router>
        <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/university" element={<University />} />
              <Route path="/football" element={<Football />} />
              <Route path="/plaza" element={<Plaza />} />
            </Routes>
      </Router>
    </main>
  );
}

export default App;