import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="bg-hackclub-dark text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Hack Club Shop
        </Link>
        <div>
          <Link to="/shop" className="px-4 py-2 text-lg hover:bg-hackclub-red rounded">
            Shop
          </Link>
          <Link to="/cart" className="px-4 py-2 text-lg hover:bg-hackclub-red rounded">
            Cart
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
