/**
 * BOTTOM NAVIGATION COMPONENT
 *
 * This component creates a single-line bottom navigation with knobs and music player controls.
 * Clean, minimalist design with navigation knobs and audio controls.
 *
 * Features:
 * - Bottom-positioned navigation
 * - Knob navigation with labels
 * - Music player controls
 * - Clean single-line layout
 *
 * Customization:
 * - Modify knob styling
 * - Change control buttons
 * - Update branding elements
 */

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Shuffle,
  Repeat,
  Moon,
  Sun,
} from "lucide-react";
import { useDarkMode } from "../contexts/DarkModeContext";

interface KnobProps {
  label: string;
  path: string;
  isActive: boolean;
}

const Knob = ({ label, path, isActive }: KnobProps) => {
  return (
    <Link to={path} className="flex flex-col items-center group">
      <div
        className={`
        relative w-8 h-8 rounded-full border-2 transition-all duration-300 cursor-pointer
        ${
          isActive
            ? "border-orange-400 bg-white dark:bg-gray-800 shadow-sm"
            : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
        }
        group-hover:scale-105
      `}
      >
        {/* Knob center */}
        <div className="absolute inset-1 rounded-full bg-gray-200 dark:bg-gray-600" />

        {/* Knob indicator */}
        <div
          className={`
          absolute w-0.5 h-3 top-0 left-1/2 transform -translate-x-1/2 -translate-y-0.5
          transition-all duration-300 origin-bottom
          ${isActive ? "bg-orange-400" : "bg-gray-400"}
        `}
        />
      </div>

      {/* Label */}
      <span
        className={`
        mt-1 text-xs font-medium transition-all duration-300
        ${isActive ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"}
      `}
      >
        {label}
      </span>
    </Link>
  );
};

const MusicHeader = () => {
  const location = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const navigationItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Projects", path: "/projects" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-gray-100/80 backdrop-blur-sm z-40 shadow-lg"
      style={{
        backgroundColor: isDarkMode
          ? "rgba(31, 41, 55, 0.8)" // gray-800 equivalent
          : undefined,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section - Navigation Knobs */}
          <div className="flex items-center space-x-6">
            {navigationItems.map(item => (
              <Knob
                key={item.path}
                label={item.label}
                path={item.path}
                isActive={location.pathname === item.path}
              />
            ))}
          </div>

          {/* Center Section - Music Player Controls */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <Shuffle size={16} />
            </button>
            <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <SkipBack size={18} />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 bg-gray-900 dark:bg-gray-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            >
              {isPlaying ? (
                <Pause size={14} className="text-white" />
              ) : (
                <Play size={14} className="text-white ml-0.5" />
              )}
            </button>
            <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <SkipForward size={18} />
            </button>
            <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <Repeat size={16} />
            </button>
          </div>

          {/* Right Section - Volume, Dark Mode Toggle, and Branding */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <Volume2 size={16} />
            </button>
            <div className="w-16 h-1 bg-gray-200 dark:bg-gray-600 rounded-full">
              <div className="w-3/4 h-full bg-gray-400 dark:bg-gray-400 rounded-full" />
            </div>
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110"
              title={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDarkMode ? (
                <Sun size={16} className="text-yellow-500" />
              ) : (
                <Moon size={16} className="text-gray-600" />
              )}
            </button>
            <div className="text-gray-400 dark:text-gray-500 text-xs">
              © 2025 Luke Files
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicHeader;
