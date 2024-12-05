'use client';

import React from "react";
import Navigation from "../../components/Navigation";

const MainPage = () => {
  return (
    <div className="bg-hackclub-light min-h-screen flex flex-col">
      {/* Navigation  */}
      <Navigation cartItemCount={0} /> {/* Pass 0 for cart item count since it's not being used here */}

      {/* main content section */}
      <div className="flex flex-grow items-center justify-center bg-hackclub-dark text-white text-center px-6 py-16">
        <div className="max-w-3xl w-full">
          <h1 className="text-6xl font-extrabold mb-8">Welcome to the Hack Club Shop</h1>
          <p className="text-xl mb-8 max-w-xl mx-auto">
            Grab exclusive merch designed by and for Hack Clubbers. T-shirts, hoodies, stickers, and more!
          </p>
          <button className="bg-hackclub-red py-4 px-10 rounded-lg text-xl hover:bg-red-700 transition-all duration-300">
            Start Shopping
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-white py-6 bg-hackclub-dark">
        © 2024 Hack Club. All rights reserved.
      </footer>
    </div>
  );
};

export default MainPage;
