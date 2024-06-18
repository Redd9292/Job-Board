import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <Link to="/" className="text-white text-lg">Job Board</Link>
        <Link to="/bookmarked" className="text-white text-lg ml-4">Bookmarked Jobs</Link>
      </div>
    </nav>
  );
};

export default Navbar;
