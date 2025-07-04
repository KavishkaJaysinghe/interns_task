import React from "react";

const Footer = () => (
  <footer className="text-center py-4 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-800 mt-8">
    <span>© {new Date().getFullYear()} Todo List App. All rights reserved.</span>
  </footer>
);

export default Footer;
