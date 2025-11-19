/**
 * MAIN APPLICATION COMPONENT
 *
 * This is the root component that sets up routing for the portfolio website.
 *
 * Key Features:
 * - Public portfolio pages (Home, About, Projects, Contact)
 * - Dark mode support
 * - Bottom navigation
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import MusicHeader from "./components/MusicHeader";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <main className="pb-20 min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <MusicHeader />
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
