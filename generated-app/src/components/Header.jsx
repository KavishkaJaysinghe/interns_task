import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-900 shadow">
    <div className="flex items-center gap-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Todo List</h1>
      <nav className="flex gap-3">
        <Link to="/" className="text-gray-700 dark:text-gray-200 hover:underline">Dashboard</Link>
        <Link to="/completed" className="text-gray-700 dark:text-gray-200 hover:underline">Completed</Link>
        <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:underline">About</Link>
      </nav>
    </div>
  </header>
);

export default Header;
