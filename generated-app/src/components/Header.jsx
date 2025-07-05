import React from "react";
import { Link } from "react-router-dom";

const Header = ({ darkMode, toggleDarkMode }) => (
  <header className="flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-900 shadow">
    <div className="flex items-center gap-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Todo List</h1>
      <nav className="flex gap-3">
        <Link to="/" className="text-gray-700 dark:text-gray-200 hover:underline">Home</Link>
        <Link to="/completed" className="text-gray-700 dark:text-gray-200 hover:underline">Completed</Link>
        <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:underline">About</Link>
      </nav>
    </div>
    <button
      onClick={toggleDarkMode}
      className="ml-4 px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
      aria-label="Toggle dark mode"
    >
      {darkMode ? "🌙" : "☀️"}
    </button>
  </header>
);

export default Header;
