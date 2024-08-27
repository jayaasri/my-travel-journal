// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <Link to="/" className="navbar-brand">Travel Journal</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/addEntry" className="nav-link">Add Entry</Link>
          </li>
          <li className="nav-item">
            <Link to="/journal" className="nav-link">Library</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/bucket-list">
              Bucket List
            </Link>
          </li>
         
         
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
