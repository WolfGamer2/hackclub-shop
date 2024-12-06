'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string; 
}

const Cart = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);

  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  const proceedToCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-4xl font-semibold text-center mb-8 text-gray-800">Your Cart</h1>

        {/* Cart Items */}
        {cart.length === 0 ? (
          <div className="text-center text-lg text-gray-600">Your cart is empty.</div>
        ) : (
          <div className="bg-white rounded-lg shadow-xl p-6 space-y-6">
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center border-b pb-4">
                  <div className="flex items-center space-x-4">
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                    <div>
                      <span className="text-lg font-semibold text-gray-800">{item.name}</span>
                      <div className="text-sm text-gray-500">${item.price.toFixed(2)}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            {/* Cart Total */}
            <div className="flex justify-between items-center font-semibold text-xl text-gray-800">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            {/* Proceed to Checkout */}
            <div className="mt-6">
              <button
                onClick={proceedToCheckout}
                className="w-full bg-hackclub-red py-3 text-white font-semibold text-lg rounded-lg hover:bg-red-700 transition duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center text-white py-6 bg-hackclub-dark">
        © 2024 Hack Club. All rights reserved.
      </footer>
    </div>
  );
};

export default Cart;
