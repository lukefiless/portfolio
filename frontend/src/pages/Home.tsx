/**
 * HOME PAGE COMPONENT
 *
 * This is the main landing page of the portfolio website.
 * It includes a hero section, skills showcase, and call-to-action.
 *
 * Features:
 * - Hero section with introduction
 * - Skills/services showcase
 * - Call-to-action section
 * - Responsive design
 *
 * Customization:
 * - Update name and title
 * - Modify skills/services
 * - Change hero message
 * - Update call-to-action text
 */

import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Code, Database, Globe } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  // Function to handle project navigation with scroll
  const handleProjectClick = (projectIndex: number) => {
    // Navigate to projects page first
    navigate(`/projects?project=${projectIndex}`, {
      state: { targetIndex: projectIndex },
      replace: false,
    });
  };

  return (
    <div>
      {/* Spotify-inspired Banner Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="/images/luke-beach-banner.jpg"
            alt="Luke Files on the beach"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative h-full flex items-end">
          <div className="w-full pb-8 pl-8 md:pl-16">
            <div className="flex items-end space-x-6">
              {/* Profile Image */}
              <div className="w-40 h-40 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/images/luke-profile.png"
                  alt="Luke Files"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Content */}
              <div className="text-white text-left">
                <h1 className="text-5xl md:text-7xl font-bold mb-3">
                  Luke Files
                </h1>
                <p className="text-xl md:text-3xl text-gray-200 mb-4">
                  Software Engineer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects List Section - Spotify Style */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-max-width">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Projects
            </h2>
          </div>

          {/* Projects List */}
          <div className="space-y-3">
            {/* Project 1 */}
            <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group cursor-pointer">
              <div className="relative w-12 h-12 flex-shrink-0">
                <img
                  src="/images/vinyl-record.svg"
                  alt="Multi-Threaded Scheduler"
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => handleProjectClick(0)}
                  className="block group-hover:text-blue-600 transition-colors text-left w-full"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    Multi-Threaded Scheduler
                  </h3>
                </button>
                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                  Multithreaded C++ scheduler that simulates CPU scheduling
                  algorithms
                </p>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                2025
              </div>
            </div>

            {/* Project 2 */}
            <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group cursor-pointer">
              <div className="relative w-12 h-12 flex-shrink-0">
                <img
                  src="/images/vinyl-record.svg"
                  alt="Virtual Memory And Page Replacement Simulator"
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => handleProjectClick(1)}
                  className="block group-hover:text-green-600 transition-colors text-left w-full"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-green-600 transition-colors">
                    Virtual Memory And Page Replacement Simulator
                  </h3>
                </button>
                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                  A C++ virtual memory simulator utilizing multi-level page
                  tables
                </p>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                2025
              </div>
            </div>

            {/* Project 3 */}
            <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group cursor-pointer">
              <div className="relative w-12 h-12 flex-shrink-0">
                <img
                  src="/images/vinyl-record.svg"
                  alt="Restaurant Scheduling Simulator"
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-500 rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => handleProjectClick(2)}
                  className="block group-hover:text-yellow-600 transition-colors text-left w-full"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-yellow-600 transition-colors">
                    Restaurant Scheduling Simulator
                  </h3>
                </button>
                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                  A multithreaded C++ simulator that schedules robot consumers
                  and producers
                </p>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                2025
              </div>
            </div>

            {/* Project 4 */}
            <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group cursor-pointer">
              <div className="relative w-12 h-12 flex-shrink-0">
                <img
                  src="/images/vinyl-record.svg"
                  alt="SDSU AI Basketball Scouting"
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => handleProjectClick(3)}
                  className="block group-hover:text-red-600 transition-colors text-left w-full"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">
                    SDSU AI Basketball Scouting
                  </h3>
                </button>
                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                  An AI-powered scouting tool
                </p>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                2023
              </div>
            </div>

            {/* Project 5 */}
            <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group cursor-pointer">
              <div className="relative w-12 h-12 flex-shrink-0">
                <img
                  src="/images/vinyl-record.svg"
                  alt="What's The Move in SD"
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => handleProjectClick(4)}
                  className="block group-hover:text-purple-600 transition-colors text-left w-full"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">
                    What's The Move in SD
                  </h3>
                </button>
                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                  A full stack Spring Boot application that scrapes and
                  visualizes local events
                </p>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                2024
              </div>
            </div>
          </div>

          {/* View More Button */}
          <div className="mt-8 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
            >
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container-max-width px-4 md:px-6 lg:px-8">
        <div className="border-t border-gray-200 dark:border-gray-700"></div>
      </div>

      {/* Skills Section - Showcase your expertise */}
      <section className="section-padding">
        <div className="container-max-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              What I Do
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              I specialize in building modern web applications with cutting-edge
              technologies
            </p>
          </div>

          {/* Skills grid - customize these to match your expertise */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Frontend Development Card */}
            <div className="music-card text-center">
              <div className="bg-gray-100 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-gray-700 dark:text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Embedded Systems
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Linux, UNIX, Docker, C++, Python
              </p>
            </div>

            {/* Backend Development Card */}
            <div className="music-card text-center">
              <div className="bg-gray-100 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="h-8 w-8 text-gray-700 dark:text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Backend Development
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Node.js, Django, MongoDB, and RESTful API design
              </p>
            </div>

            {/* Frontend Development Card */}
            <div className="music-card text-center">
              <div className="bg-gray-100 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-gray-700 dark:text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Front End Development
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                React, TypeScript, Tailwind CSS, JavaScript, HTML, CSS
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gray-50 dark:bg-gray-800 section-padding">
        <div className="container-max-width text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to work together?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and see how I can help bring your ideas
            to life
          </p>
          <Link to="/contact" className="btn-primary">
            Start a Conversation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
