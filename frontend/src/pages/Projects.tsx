/**
 * PROJECTS PAGE COMPONENT
 *
 * This page displays a single scrollable page where all projects are stacked vertically.
 * The left sidebar shows dynamic project information that changes based on scroll position.
 * The right side shows the vinyl record emerging from a square sleeve for each project.
 *
 * Features:
 * - Single page with all projects stacked vertically
 * - Scroll-based content switching
 * - Sticky left sidebar with dynamic content
 * - Vinyl record visual for each project
 * - Smooth scroll transitions
 * - Responsive design
 *
 * Customization:
 * - Replace projects array with your actual projects
 * - Modify project descriptions and details
 * - Update GitHub and live demo URLs
 * - Adjust scroll behavior and animations
 */

import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Github, ChevronDown } from "lucide-react";
import { useDarkMode } from "../contexts/DarkModeContext";

const Projects = () => {
  const location = useLocation();
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const savedScrollPosition = useRef<number>(0);
  const didInitialScroll = useRef(false);
  const { isDarkMode } = useDarkMode();

  // Projects data - replace with your actual projects
  const projects = [
    {
      id: 1,
      title: "Multi-Threaded Scheduler",
      shortDescription:
        "Multithreaded C++ scheduler that simulates CPU scheduling algorithms",
      fullDescription:
        "This project simulates SPU process scheduling using multithreaded C++ and POSIX threads. It visualizes how processes move between CPU and I/O bursts under different strategies.",
      technologies: ["C++", "POSIX Threading", "UNIX"],
      githubUrl: "https://github.com/lukefiless/multi-threaded-scheduling",
      liveUrl: "https://example.com",
      category: "Operating Systems",
      year: "2025",
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Virtual Memory And Page Replacement Simulator",
      shortDescription:
        "A C++ virtual memory simulator utilizing multi-level page tables",
      fullDescription:
        "A simulator for page replacement algorithms using C++ and multi-level page tables. It processes binary memory traces and perfors virtual-to-physical address translation.",
      technologies: ["C++", "POSIX Threading", "UNIX"],
      githubUrl: "https://github.com/lukefiless/multilevel-table-paging",
      liveUrl: "https://example.com",
      category: "Operating Systems",
      year: "2025",
      color: "bg-green-500",
    },
    {
      id: 3,
      title: "Restaurant Scheduling Simulator",
      shortDescription:
        "A multithreaded C++ simulator that schedules robot consumers and producers.",
      fullDescription:
        "This simulation models restaurant seating management using the producer-consumer paradigm, where greeter robots enqueue requests and server robots process concurrently.",
      technologies: ["C++", "POSIX Threads", "UNIX"],
      githubUrl: "https://github.com/lukefiless/producer-consumer-system",
      liveUrl: "https://example.com",
      category: "Operating Systems",
      year: "2025",
      color: "bg-yellow-500",
    },
    {
      id: 4,
      title: "SDSU AI Basketball Scouting",
      shortDescription: "An AI-powered scouting tool",
      fullDescription:
        "Working with SDSU World Computing Organization, this is an AI-powered scouting tool that analyzes SDSU basketball games and provides insights on player performance and team strategies.",
      technologies: ["Python", "HTML", "Figma"],
      githubUrl: "https://github.com/WorldComputingSDSU/AztecBBallScouting",
      liveUrl: "https://example.com",
      category: "AI and Machine Learning",
      year: "2023",
      color: "bg-red-500",
    },
    {
      id: 5,
      title: "What's The Move in SD",
      shortDescription:
        "A full stack Spring Boot application that scrapes and visualizes local events.",
      fullDescription:
        "This project combines a Spring Boot REST backend with a Google Maps-driven frontend to display real-time events scraped from multiple sources.",
      technologies: ["Spring Boot", "JavaScript", "Java", "Google Maps API"],
      githubUrl: "https://github.com/lukefiless/Whats-The-Move-in-San-Diego",
      liveUrl: "https://example.com",
      category: "Full Stack Web Application",
      year: "2024",
      color: "bg-purple-500",
    },
    {
      id: 6,
      title: "Newtonian Gravity Simulator",
      shortDescription: "A Unity-based N-body physics sandbox",
      fullDescription:
        "This project visualizes Newtonian gravitational mechanics by simulating the interaction of multiple celestial bodies in 3D space.",
      technologies: ["C#", "Unity Studio"],
      githubUrl: "https://github.com/lukefiless/NewtonianGravitySimulation",
      liveUrl: "https://example.com",
      category: "3D Simulation",
      year: "2024",
      color: "bg-indigo-500",
    },
  ];

  const currentProject = projects[currentProjectIndex];

  // Handle scroll events to detect which project is in view
  useEffect(() => {
    const state = location.state as { targetIndex?: number } | null;
    let idx = typeof state?.targetIndex === "number" ? state.targetIndex : NaN;

    if (Number.isNaN(idx)) {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("project");
      const parsed = q !== null ? parseInt(q, 10) : NaN;
      if (!Number.isNaN(parsed)) idx = parsed;
    }

    if (
      !Number.isNaN(idx) &&
      projectRefs.current[idx] &&
      !didInitialScroll.current
    ) {
      requestAnimationFrame(() => {
        projectRefs.current[idx]?.scrollIntoView({
          behavior: "auto",
          block: "center",
        });
      });
      setCurrentProjectIndex(idx);
      didInitialScroll.current = true;

      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (!didInitialScroll.current) {
      didInitialScroll.current = true;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = 0; i < projectRefs.current.length; i++) {
        const element = projectRefs.current[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setCurrentProjectIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location, projects.length]);

  // Save scroll position when component unmounts and restore when it mounts
  useEffect(() => {
    // Restore scroll position if we have a saved one
    if (savedScrollPosition.current > 0) {
      window.scrollTo(0, savedScrollPosition.current);
    }

    // Save scroll position when component unmounts
    return () => {
      savedScrollPosition.current = window.scrollY;
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Fixed Left Sidebar with Locked Elements */}
      <div
        className="fixed left-0 top-0 w-1/2 h-screen flex flex-col px-12 lg:px-16 z-10"
        style={{
          backgroundColor: isDarkMode ? "#111827" : "#f9fafb",
        }}
      >
        {/* Locked Project Counter - Always visible at top */}
        <div className="pt-16 pb-8">
          <span className="text-sm text-gray-500">
            {String(currentProjectIndex + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        {/* Locked Project Title - Always visible */}
        <div className="pb-2">
          <div className="mb-4">
            <h1 className="text-4xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              {currentProject.title}
            </h1>
          </div>

          <div className="max-w-lg">
            {/* Project Category */}
            <div className="mb-4">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white ${currentProject.color}`}
              >
                {currentProject.category}
              </span>
            </div>

            {/* Project Description */}
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {currentProject.fullDescription}
            </p>

            {/* Technology Stack */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentProject.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-8">
              <a
                href={currentProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center"
              >
                <Github className="w-5 h-5 mr-2" />
                View Code
              </a>
            </div>

            {/* Scroll Indicator */}
            <div className="flex items-center text-gray-400 dark:text-gray-500 text-sm">
              <ChevronDown className="w-4 h-4 mr-2" />
              <span>Scroll to explore more projects</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Scrollable Project Sections */}
      <div
        className="absolute right-0 top-0 w-1/2 pr-16"
        style={{
          backgroundColor: isDarkMode ? "#111827" : "#f9fafb",
        }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={el => (projectRefs.current[index] = el)}
            className="h-screen flex items-center justify-center relative"
            data-project-index={index}
          >
            {/* Container for sleeve and sliding record */}
            <div
              className="relative w-[500px] h-96 flex items-center justify-center group cursor-pointer -ml-8"
              style={{ transform: "translateX(-95px)" }}
            >
              {/* Square Sleeve Background - Slides left on hover */}
              <div
                className="relative w-96 h-96 rounded-lg shadow-2xl flex items-center justify-center overflow-hidden transition-transform duration-500 ease-out group-hover:-translate-x-6 z-10"
                style={{
                  backgroundColor:
                    index === 0 ||
                    index === 1 ||
                    index === 2 ||
                    index === 3 ||
                    index === 4 ||
                    index === 5
                      ? "transparent"
                      : isDarkMode
                        ? "#374151"
                        : "#111827",
                  backgroundImage:
                    index === 0
                      ? `url('/images/projects/clock.jpg')`
                      : index === 1
                        ? `url('/images/projects/pager.png')`
                        : index === 2
                          ? `url('/images/projects/robot.jpg')`
                          : index === 3
                            ? `url('/images/projects/sdsu.jpeg')`
                            : index === 4
                              ? `url('/images/projects/sd.png')`
                              : index === 5
                                ? `url('/images/projects/orbit.jpg')`
                                : "none",
                  backgroundSize:
                    index === 0 ||
                    index === 1 ||
                    index === 2 ||
                    index === 3 ||
                    index === 4 ||
                    index === 5
                      ? "cover"
                      : "auto",
                  backgroundPosition:
                    index === 0 ||
                    index === 1 ||
                    index === 2 ||
                    index === 3 ||
                    index === 4 ||
                    index === 5
                      ? "center"
                      : "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {/* Hover Overlay Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />

                {/* Subtle glow effect on hover */}
                <div
                  className="absolute inset-0 rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: "0 0 30px rgba(0,0,0,0.3)" }}
                />
              </div>

              {/* Vinyl Record Image - Slides out on hover */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] transition-transform duration-500 ease-out group-hover:translate-x-6 group-hover:scale-105 z-0">
                <img
                  src="/images/vinyl-record.svg"
                  alt="Vinyl Record"
                  className="w-full h-full object-contain transition-all duration-500"
                  style={{ backgroundColor: "transparent" }}
                />

                {/* Project Number Overlay */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 group-hover:shadow-xl">
                  <span className="text-lg font-bold text-gray-900">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Record Label with Project Color - Moves with vinyl */}
                <div
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 ${project.color} rounded-full shadow-lg transition-all duration-500 group-hover:shadow-xl`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 space-y-3 z-20">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const element = projectRefs.current[index];
              if (element) {
                element.scrollIntoView({ behavior: "auto" });
              }
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentProjectIndex
                ? "bg-gray-900 scale-125"
                : "bg-gray-300 hover:bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
