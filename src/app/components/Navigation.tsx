'use client';

import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { CartContext } from '../../context/CartContext';
import { FaShoppingCart } from "react-icons/fa";
import Badge from '@mui/material/Badge/Badge';

const Navigation = () => {
  const cartContext = useContext(CartContext);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!cartContext) {
    return null;
  }

  const { cart, totalPrice } = cartContext;

  if (!isClient) {
    return null;
  }

  return (
    <nav className="p-4 flex justify-center bg-hackclub-dark">
      <div className="container flex justify-between items-center rounded-full mt-5 mx-10 bg-gradient-radial bg-gradient-to-br from-[#ff8c37] to-[#ec3750] p-6 shadow-lg transform transition-transform duration-300 hover:scale-105">
        <Link href="/" className="text-white text-2xl font-bold">
          Hack Club Shop
        </Link>
        
        <div className='flex flex-row'>
          <Link href="/cart" className="text-white ">
            <Badge badgeContent={cart.length} showZero={true} color="info" className='mr-5'>
              <FaShoppingCart className="text-white text-3xl" />
            </Badge>
            ${totalPrice.toFixed(2)}
          </Link>
        </div>
      </div>
    </nav>

  );
};

export default Navigation;