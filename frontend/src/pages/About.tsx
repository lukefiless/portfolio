/**
 * ABOUT PAGE COMPONENT
 *
 * This page provides personal information, skills, and background.
 * It includes a personal story, skills showcase, and education/experience.
 *
 * Features:
 * - Personal story and background
 * - Skills and technologies grid
 * - Education and experience timeline
 * - Resume download button
 * - Personal information sidebar
 *
 * Customization:
 * - Update personal story and background
 * - Modify skills and technologies list
 * - Change education and experience details
 * - Update location and availability
 * - Connect resume download to actual file
 */

import { Download, MapPin, Calendar } from "lucide-react";

const About = () => {
  return (
    <div className="section-padding">
      <div className="container-max-width">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              About Me
            </h1>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Personal Story Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 dark:text-white">
                My Story
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  I'm a passionate full-stack developer with over 3 years of
                  experience building web applications. My journey started with
                  a curiosity about how websites work, and it has evolved into a
                  deep love for creating digital experiences that make a
                  difference.
                </p>
                <p>
                  I specialize in modern JavaScript frameworks, particularly
                  React and Node.js, and I'm always eager to learn new
                  technologies and improve my skills. I believe in writing
                  clean, maintainable code and following best practices.
                </p>
                <p>
                  If I am not coding, you can find me playing guitar,
                  surfing, or working with World Computing Organization
                  to create and design new projects.
                </p>
              </div>
            </div>

            {/* Personal Information Sidebar */}
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-6 dark:text-white">
                Personal Info
              </h3>
              <div className="space-y-4">
                {/* Location */}
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary-600 mr-3" />
                  <span className="text-gray-600 dark:text-gray-300">
                    San Diego, CA
                  </span>
                </div>
                {/* Availability */}
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-primary-600 mr-3" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Available for work
                  </span>
                </div>
              </div>

              {/* Resume Download Button */}
              <div className="mt-8">
                <a
                  href="/lfiles_resume.pdf"
                  download="Luke_Files_Resume.pdf"
                  className="btn-primary inline-flex items-center"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </a>
              </div>
            </div>
          </div>

          {/* Skills & Technologies Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-8 text-center dark:text-white">
              Skills & Technologies
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Skills array - customize with your technologies */}
              {[
                "Python",
                "Java",
                "C++",
                "React",
                "TypeScript",
                "JavaScript",
                "Tailwind CSS",
                "Git",
                "Docker",
                "AWS",
                "Django",
                "Figma",
              ].map(skill => (
                <div
                  key={skill}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center"
                >
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Experience Section */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6 dark:text-white">
              Education & Experience
            </h2>
            <div className="space-y-6">
              {/* Education Entry */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  Computer Science, B.S.
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  San Diego State University
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  2023 - 2026
                </p>
              </div>

              {/* Experience Entry */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  College Instructor / IT Intern
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Sage Oak Charter School
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  2023 - Present
                </p>
              </div>

              {/* Experience Entry */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  Secretary
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  World Computing Organization
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  2025 - Present
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
