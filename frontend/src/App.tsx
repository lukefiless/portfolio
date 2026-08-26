import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import MusicHeader from "./components/MusicHeader";
import ScrollToTop from "./components/ScrollToTop";
import { DarkModeProvider } from "./contexts/DarkModeContext";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Present from "./pages/Present";

function AppContent() {
  const location = useLocation();

  const isPresentPage =
    location.pathname === "/present" ||
    location.pathname === "/present/";

  return (
    <>
      <ScrollToTop />

      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <main
          className={
            isPresentPage
              ? "min-h-screen"
              : "pb-20 min-h-screen"
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/present" element={<Present />} />
          </Routes>
        </main>

        {!isPresentPage && <MusicHeader />}
      </div>
    </>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <AppContent />
      </Router>
    </DarkModeProvider>
  );
}

export default App;
