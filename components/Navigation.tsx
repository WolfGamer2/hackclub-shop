import React from 'react';
import Link from 'next/link';

interface NavigationProps {
  cartItemCount: number;
}

const Navigation: React.FC<NavigationProps> = ({ cartItemCount }) => {
  return (
    <nav className="bg-hackclub-dark text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Hack Club Shop
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/shop" className="px-4 py-2 text-lg hover:bg-hackclub-red rounded">
            Shop
          </Link>
          <Link href="/cart" className="px-4 py-2 text-lg hover:bg-hackclub-red rounded">
            Cart ({cartItemCount})
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
