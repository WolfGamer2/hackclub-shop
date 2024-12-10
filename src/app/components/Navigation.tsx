'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { CartContext } from '../../context/CartContext';

const Navigation = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return null;
  }

  const { cart, totalPrice } = cartContext;

  return (
    <nav className="bg-hackclub-dark p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          Hack Club Shop
        </Link>
        <Link href="/cart" className="text-white">
          Cart ({cart.length}) - ${totalPrice.toFixed(2)}
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;