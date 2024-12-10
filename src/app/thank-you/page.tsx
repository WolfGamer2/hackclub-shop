'use client';
import { useEffect } from 'react';

const ThankYou = () => {
  useEffect(() => {

    localStorage.removeItem('cart');
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">Thank You!</h1>
      <p className="mt-4">Your order has been successfully placed.</p>
      <p className="mt-4">Redirecting to the home page...</p>
    </div>
  );
};

export default ThankYou;
