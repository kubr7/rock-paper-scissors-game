import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
     return (
          <div className="nav-container">
               <div className="nav-bar gap-2 p-1 small shadow">
                    <div className="nav-item rounded-4">
                         <Link to="/" className="nav-link rounded-4" aria-current="page">Home</Link>
                    </div>
                    <div className="nav-item rounded-4" role="presentation">
                         <Link to="/game" className="nav-link rounded-4">Game</Link>
                    </div>
               </div>
          </div>
     );
}

export default Navbar;
